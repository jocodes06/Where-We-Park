import { NextResponse } from "next/server";
import { pool } from "@/app/api/lib/db"

// for auth
import bcrypt from "bcrypt";
import {z} from "zod";

const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email:z.email().toLowerCase(),
  password: z.string().min(8).max(72),
  role: z.enum(["DRIVER" , "OWNER"])
})


export async function POST(req: Request) {
  try {
      const parsed = registerSchema.safeParse( await req.json());

    if(!parsed.success){
      return NextResponse.json({
        error:"Input is invalid"
      },
    {status:400})
    }

    const {firstName, lastName, email ,password, role} = parsed.data

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        {status:409}
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users
        (first_name, last_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, first_name, last_name, email, role, created_at`,
      [firstName, lastName, email, passwordHash, role]
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: result.rows[0],
      },
      { status: 201 }
    );
  
  
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}