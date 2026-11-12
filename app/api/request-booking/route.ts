import { NextResponse } from "next/server";
import { pool } from "@/app/api/lib/db";
import { getCurrentUser } from "@/app/api/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User isn't logged in" },
        { status: 401 },
      );
    }

    const {
      id,
      booking_date,
      duration_type,
      duration_hours,
      start_time,
      end_time,
      parking_cost,
      service_fee,
      total_amount,
    } = await req.json();

    const result = await pool.query(
      `INSERT INTO booking_requests (driver_id, lot_id, booking_date, 
        duration_type, duration_hours, start_time, end_time, parking_cost, 
        service_fee, total_amount ,status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending') RETURNING *`,
      [
        user.id,
        id,
        booking_date,
        duration_type,
        duration_hours,
        start_time,
        end_time,
        parking_cost,
        service_fee,
        total_amount,
      ],
    );

    console.log("Booking request inserted:", result.rows[0]);

    return NextResponse.json(
      {
        message: "Booking request sent successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Seding a request failed: ", error);
    return NextResponse.json(
      { error: "Failed to send booking request" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "User isn't logged in" },
        { status: 401 },
      );
    }

    const result = await pool.query(
      `  SELECT
         bk.id, users.first_name AS driver_first_name, users.last_name AS driver_last_name,
         ps.name AS lot_name,
         ps.address AS address,

    COALESCE(photos.photos, '[]'::json) AS photos,

    bk.booking_date,
    bk.duration_type AS booking_type,
    bk.duration_hours,
    bk.start_time,
    bk.end_time,
    bk.parking_cost,
    bk.service_fee,
    bk.total_amount,
    bk.status

  FROM booking_requests bk

  INNER JOIN parking_spots ps
    ON bk.lot_id = ps.id

  INNER JOIN users
    ON bk.driver_id = users.id

  LEFT JOIN LATERAL (
    SELECT json_agg(ph.photo_url) AS photos
    FROM parking_spot_photos ph
    WHERE ph.parking_spot_id = ps.id
  ) photos ON true

  WHERE ps.owner_id = $1
  `,
      [user.id],
    );
    return NextResponse.json({ bookingRequests: result.rows }, { status: 200 });
  } catch (error) {
    console.log("Failed to fetch for the driver:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking requests" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User isn't logged in" },
        { status: 401 },
      );
    }

    const { id, status } = await req.json();

    const result = await pool.query(
      `UPDATE booking_requests bk
      SET status = $1
      FROM parking_spots ps
      WHERE bk.lot_id = ps.id
        AND bk.id = $2
        AND ps.owner_id = $3
      RETURNING bk.*
      `,
      [status, id, user.id],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Booking request not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Booking status updated successfully",
        booking: result.rows[0],
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Faile to update status for driver: ", error);
    return NextResponse.json(
      { error: "Failed to update booking status" },
      { status: 500 },
    );
  }
}

// CANCEL booking - driver 

export async function DELETE(req: Request) {

  try{
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "User isn't logged in",
      },
      { status: 401 },
    );
  }

  const booking_id = await req.json();

  console.log(booking_id)

  const result = await pool.query(
    `
    DELETE from booking_requests
    where id = $1
    and driver_id = $2`,
    [booking_id, user.id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json(
      {
        error: "Booking not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    { message: "Booking cancelled successfully" },
    { status: 200 },
  );
}catch(error){
  console.log(error);
  return NextResponse.json({
    error:"Failed to cancel booking!"
  },
  {
    status:500
  })
}



}
