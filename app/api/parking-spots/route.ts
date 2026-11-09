import { NextResponse } from "next/server";
import { pool } from "@/app/api/lib/db";
import { getCurrentUser } from "@/app/api/lib/auth";
import { v2 as cloudinary } from "cloudinary"


// Set up for adding the photos 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadPhoto(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<{ url: string; publicId: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "wherewepark/parking-spots" },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("Upload failed"));

            resolve({
              url: result.secure_url,
              publicId: result.public_id,
            });
          }
        )
        .end(buffer);
    }
  );
}

// Fetch the parking spots for the user

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const result = await pool.query(
      `SELECT
    ps.*,
    COALESCE((
      SELECT json_agg(json_build_object(
        'id', psp.id,
        'photo_url', psp.photo_url
      ))
      FROM parking_spot_photos psp
      WHERE psp.parking_spot_id = ps.id
    ), '[]'::json) AS photos,
    COALESCE((
      SELECT json_agg(json_build_object(
        'type', psa.amenity,
        'icon', psa.icon
      ))
      FROM parking_spot_amenities psa
      WHERE psa.parking_spot_id = ps.id
    ), '[]'::json) AS amenities
  FROM parking_spots ps
  WHERE ps.owner_id = $1`,
      [user.id]
    );

    return NextResponse.json({
      parkingSpots: result.rows,
    });
  } catch (error) {
    console.error("Getting the users parking spots failed: ",error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Add a parking spot

export async function POST(req: Request) {
  const client = await pool.connect();
  const uploadedPublicIds: string[] = [];

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not logged in" },
        { status: 401 }
      );
    }

    const requestData = await req.formData();
    const fieldsString = requestData.get("fields");

    if (typeof fieldsString !== "string") {
      return NextResponse.json(
        { error: "Missing form fields" },
        { status: 400 }
      );
    }

    const fields = JSON.parse(fieldsString);
    const photos = requestData.getAll("photos").filter(
      (item): item is File => item instanceof File && item.size > 0);

    const {
      name,
      address,
      city,
      spotType,
      pricePerHour,
      pricePerDay,
      availability,
      amenities,
      description,
    } = fields;

    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO parking_spots
        (owner_id, name, address, city, spot_type, price_per_hours,
         price_per_day, description, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [user.id,name,address,city,spotType,pricePerHour,pricePerDay,description,true,]
    );

    const parkingSpot = result.rows[0];

    for (const day of availability) {
      await client.query(
        `INSERT INTO parking_spot_availability
          (parking_spot_id, day_of_week, is_open, open_time, close_time)
         VALUES ($1, $2, $3, $4, $5)`,
        [parkingSpot.id, [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",].indexOf(day.day),
          day.isOpen,
          day.openTime || null,
          day.closeTime || null,
        ]
      );
    }

    for (const amenity of amenities) {
      await client.query(
        `INSERT INTO parking_spot_amenities
          (parking_spot_id, amenity, icon)
         VALUES ($1, $2,$3)`,
        [parkingSpot.id, amenity.type, amenity.icon]
      );
    }

    for (const photo of photos) {
      const uploaded = await uploadPhoto(photo);
      uploadedPublicIds.push(uploaded.publicId);

      await client.query(
        `INSERT INTO parking_spot_photos
          (parking_spot_id, photo_url, public_id)
         VALUES ($1, $2, $3)`,
        [parkingSpot.id, uploaded.url, uploaded.publicId]
      );
    }

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "Parking spot created successfully",
        parkingSpot,
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query("ROLLBACK");

    await Promise.allSettled(
      uploadedPublicIds.map((id) =>
        cloudinary.uploader.destroy(id)
      )
    );

    console.error("Adding a parking spot failed:",error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}


// update is_acitve

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, is_active } = await req.json();

    const result = await pool.query(
      `UPDATE parking_spots SET is_active = $1 WHERE id = $2 AND owner_id = $3 RETURNING id`,
      [is_active, id, user.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Parking spot not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Updating status failed:", error);
    return NextResponse.json(
      { error: "Failed to update parking spot" },
      { status: 500 }
    );
  }
}