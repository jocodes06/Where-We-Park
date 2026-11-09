import { NextResponse } from "next/server";
import {pool} from "@/app/api/lib/db"

import {z} from "zod"
import bcrypt from "bcrypt";
import crypto from "crypto";
import { cookies } from "next/headers"

const loginSchema = z.object({
  email : z.email().toLowerCase(),
  password: z.string().min(1)
})

export async function POST(req: Request) {
  try {
    const parsed = loginSchema.safeParse( await req.json());

    if(!parsed.success){
      return NextResponse.json({
        error:"Invalid input!"
      },
    {status:400})
    }

    const { email, password } = parsed.data

    const result = await pool.query(
      "SELECT id, first_name, last_name, email, role, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password, user.password_hash
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400},
      );
    }

    const sessionId = crypto.randomBytes(32).toString("hex");
    const sessionHash = crypto.createHash("sha256").update(sessionId).digest("hex")

     await pool.query(
      `INSERT INTO sessions 
       (id, user_id, expires_at)
       values ($1, $2,NOW() + INTERVAL '7 days')
      `,
      [sessionHash, user.id]
    )

    const cookie = await cookies();
       cookie.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 *7
    });

 
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          role: user.role
        },
      },
    );
    return response;

  } catch (error) {
    console.log("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      {status:500}
    );
  }
}