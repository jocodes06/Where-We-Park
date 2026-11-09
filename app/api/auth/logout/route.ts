import {pool} from "@/app/api/lib/db"
import { NextResponse } from "next/server";
import { cookies } from "next/headers"
import crypto from "crypto"

export async function POST(req: Request){

    const cookie = await cookies();
    const sessionId = cookie.get("session_id")?.value

    if(!sessionId){
        return NextResponse.json(
            {error:"User not logged in"},
            {status: 401}
        )
    }

    const sessionHash = crypto.createHash("sha256").update(sessionId).digest("hex")

    await pool.query(
        `delete from sessions
        where id = $1`,
        [sessionHash]
    )

    cookie.delete("session_id")

    return NextResponse.json({
        message:"Logged out succesfully"
    })



}