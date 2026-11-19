import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { getSql } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId || !/^\d+$/.test(userId)) {
    return Response.json({ error: "Hyr për të ruajtur udhëtimin." }, { status: 401 });
  }

  let body: { udhetimId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Kërkesa nuk është e vlefshme." }, { status: 400 });
  }
  const id = typeof body.udhetimId === "string" ? body.udhetimId : "";
  if (!/^[\w-]+$/.test(id)) {
    return Response.json({ error: "Udhëtimi nuk është i vlefshëm." }, { status: 400 });
  }

  // Simulimi i zhvillimit verifikon gjendjen e gabimit pa prekur databazën.
  if (process.env.NODE_ENV !== "production" && request.headers.get("x-demo-failure") === "1") {
    return Response.json({ error: "Nuk u ruajt. Provo përsëri." }, { status: 503 });
  }

  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO udhetimet_e_ruajtura (github_id, udhetim_id)
      SELECT ${userId}, id FROM udhetimet WHERE id = ${id}
      ON CONFLICT (github_id, udhetim_id) DO NOTHING
      RETURNING udhetim_id
    `;
    const trip = await sql`SELECT id FROM udhetimet WHERE id = ${id}`;
    if (trip.length === 0) return Response.json({ error: "Udhëtimi nuk u gjet." }, { status: 404 });
    const count = await sql`SELECT COUNT(*)::int AS numer FROM udhetimet_e_ruajtura WHERE github_id = ${userId}`;
    return Response.json({ saved: true, created: rows.length === 1, count: count[0].numer }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Nuk u ruajt. Provo përsëri." }, { status: 503 });
  }
}
