import { pool } from "../lib/db";
import { getCurrentUser } from "../lib/auth";
import { NextResponse } from "next/server";
import { get } from "http";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "User isn't logged in!",
        },
        { status: 401 },
      );
    }

    const { lot_id, description, stars, tags } = await req.json();

    const result = await pool.query(
      `
            INSERT INTO reviews (driver_id, lot_id, description,stars)
            values($1,$2,$3,$4)
            returning id
            `,
      [user.id, lot_id, description, stars],
    );

    const reviewId = result.rows[0].id;

    for (const tag of tags) {
      await pool.query(
        `INSERT INTO review_tags (review_id, review_tag)
                values($1,$2)`,
        [reviewId, tag],
      );
    }

    return NextResponse.json(
      {
        message: "Review added succesfully!",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add review!" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "User isn't logged in!",
        },
        { status: 401 },
      );
    }

    const result = await pool.query(
      `
      SELECT r.*, rt.review_tag
      FROM reviews r
      LEFT JOIN review_tags rt ON r.id = rt.review_id
      WHERE r.driver_id = $1
    `,
      [user.id],
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 200 },
    );
  }
}
