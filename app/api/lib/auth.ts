import { cookies } from "next/headers";
import { pool } from "@/app/api/lib/db"
import crypto from "crypto"

export async function getCurrentUser() {

  const cookie = await cookies();
  const sessionId = cookie.get("session_id")?.value; 

    if (!sessionId) {
    return null;
  }

  const sessionHash = crypto.createHash("sha256").update(sessionId).digest("hex")


  const result = await pool.query(
    `SELECT u.id, u.first_name, u.last_name, u.email, u.role
     FROM sessions s
     JOIN users u ON s.user_id = u.id
     WHERE s.id = $1
     and s.expires_at > NOW()`,
    [sessionHash]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}