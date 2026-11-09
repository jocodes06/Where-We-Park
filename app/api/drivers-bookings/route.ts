import { NextResponse } from "next/server";
import { pool } from "@/app/api/lib/db";
import { getCurrentUser } from "@/app/api/lib/auth";

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
      ` 
        SELECT bk.id, users.first_name AS driver_first_name, users.last_name AS driver_last_name,
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
         SELECT json_agg(ph.photo_url) AS photos FROM parking_spot_photos ph
         WHERE ph.parking_spot_id = ps.id) photos ON true
         WHERE bk.driver_id = $1`,
      [user.id],
    );

    return NextResponse.json(
      {
        bookingRequests: result.rows,
      },
      { status: 200 },
    );
  } catch (error) {

    console.log("Getting drivers booking failed:", error);

    return NextResponse.json(
      {
        error: "Coulnd't get drivers bookings",
      },
      { status: 500 },
    );
  }
}
