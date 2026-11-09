import { NextResponse } from "next/server";
import { pool } from "@/app/api/lib/db";
import { getCurrentUser } from "@/app/api/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "User not logged in" },
        { status: 401 },
      );
    }

    const result = await pool.query(`
        SELECT
            ps.*,
            ( SELECT CONCAT(u.first_name,' ' , u.last_name)
            FROM users u
            where u.id = ps.owner_id)
            as host_name,
            COALESCE(
                (SELECT json_agg(
                        json_build_object(
                            'id', psp.id,
                            'photo_url', psp.photo_url))
                    FROM parking_spot_photos psp
                    WHERE psp.parking_spot_id = ps.id),'[]'::json
            ) AS photos,
            COALESCE(
                (SELECT json_agg(
                json_build_object(
                            'type', psa.amenity,
                            'icon', psa.icon
                        ))
                    FROM parking_spot_amenities psa
                    WHERE psa.parking_spot_id = ps.id
                ),
                '[]'::json
            ) AS amenities,
           COALESCE(
    (
        SELECT json_agg(
        json_build_object(
        'day',
        CASE psa.day_of_week
            WHEN 0 THEN 'Monday'
            WHEN 1 THEN 'Tuesday'
            WHEN 2 THEN 'Wednesday'
            WHEN 3 THEN 'Thursday'
            WHEN 4 THEN 'Friday'
            WHEN 5 THEN 'Saturday'
            WHEN 6 THEN 'Sunday'
        END,
        'isOpen', psa.is_open,
        'openTime', psa.open_time,
        'closeTime', psa.close_time
    )
    ORDER BY psa.day_of_week
)
FROM parking_spot_availability psa
WHERE psa.parking_spot_id = ps.id
    ),
    '[]'::json
) AS availability

        FROM parking_spots ps
        WHERE ps.is_active = TRUE
        ORDER BY ps.id DESC
    `);

    return NextResponse.json({
      parkingSpots: result.rows.map((spot) => ({
        ...spot,
        price_per_hours: Number(spot.price_per_hours),
        price_per_day: Number(spot.price_per_days),
      })),
    });
  } catch (error) {
    console.error("Error fetching parking spots:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
