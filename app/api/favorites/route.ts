import { pool } from "@/app/api/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "../lib/auth";

// Add favorite spot

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "User isn't logged in",
        },
        { status: 401 },
      );
    }

    const { lot_id } = await req.json();

    const result = await pool.query(
      `
        INSERT INTO favorites (driver_id, lot_id)
        values($1,$2)
        `,
      [user.id, lot_id],
    );

    return NextResponse.json(
      {
        message: "Added to favorites",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Couln't add favorite spot:", error);
    return NextResponse.json(
      {
        error: error ?? "Couldn't add favorite spot",
      },
      { status: 500 },
    );
  }
}

// Get favorite spots

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "User isn't logged in",
        },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `SELECT
    ps.id::text AS id,
    ps.name,
    ps.address,
    ps.city,
    ps.spot_type,
    ps.price_per_hours,
    ps.is_active,

    COALESCE(
        (
            SELECT json_agg(
                json_build_object(
                    'id', psp.id::text,
                    'photo_url', psp.photo_url
                )
            )
            FROM parking_spot_photos psp
            WHERE psp.parking_spot_id = ps.id
        ), '[]'::json
    ) AS photos,

    COALESCE(
        (
            SELECT json_agg(
                json_build_object(
                    'type', psa.amenity,
                    'icon', psa.icon
                )
            )
            FROM parking_spot_amenities psa
            WHERE psa.parking_spot_id = ps.id
        ), '[]'::json
    ) AS amenities

FROM parking_spots ps

INNER JOIN favorites f
    ON f.lot_id = ps.id

LEFT JOIN users u
    ON u.id = ps.owner_id

WHERE f.driver_id = $1
ORDER BY ps.id DESC;
    `,
      [user.id],
    );

    return NextResponse.json({
      favoriteSpots: result.rows,
    });
  } catch (error) {
    console.log("Couldn't get drivers favorites spots:", error);
    return NextResponse.json(
      {
        error: "Couldn't get favorites spots!",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          error: "User isn't logged in",
        },
        { status: 401 },
      );
    }

    const { lot_id } = await req.json();

    if (!lot_id) {
      return NextResponse.json(
        { error: "This lot doesn't exist" },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `DELETE FROM favorites 
      where driver_id = $1
      and lot_id = $2
      RETURNING *
      `,
      [user.id, lot_id],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        {
          error: "Favorite spot was not found!",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Favorite removed!",
    });
  } catch (error) {
    console.log("There has been an error with removing favorite spot: ", error);
    return NextResponse.json(
      {
        error: "Couldn't remove favorite spot",
      },
      { status: 500 },
    );
  }
}
