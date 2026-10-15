import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const result = await sql`SELECT 1`;
    return Response.json({ ok: true, result });
  } catch (err) {
    console.error("Database error:", err);
    return Response.json({ ok: false, error: String(err) });
  }
}
