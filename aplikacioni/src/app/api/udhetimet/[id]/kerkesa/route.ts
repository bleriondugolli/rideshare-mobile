import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { getSql } from "../../../../../lib/db";
import { profiliIm } from "../../../../../lib/lejet";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !/^\d+$/.test(session.user.id)) {
    return Response.json({ error: "Hyr për të kërkuar një vend." }, { status: 401 });
  }
  try {
    const profile = await profiliIm();
    if (!profile) return Response.json({ error: "Hyr për të kërkuar një vend." }, { status: 401 });
    const userId = profile.id;
    const sql = getSql();
    const rows = await sql`
      WITH available AS MATERIALIZED (
        SELECT id FROM udhetimet
        WHERE id = ${id} AND vende > 0 AND shofer_id <> ${userId}
        FOR UPDATE
      ), added AS (
        INSERT INTO kerkesat_vendet (udhetim_id, udhetar_id)
        SELECT id, ${userId} FROM available
        ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
        RETURNING id
      )
      SELECT k.id::text AS id, k.status FROM kerkesat_vendet k
      WHERE k.udhetim_id = ${id} AND k.udhetar_id = ${userId}
    `;
    if (rows.length) return Response.json({ kerkesa: rows[0] }, { headers: { "Cache-Control": "private, no-store" } });
    const trip = await sql`SELECT id, vende, shofer_id FROM udhetimet WHERE id = ${id}`;
    if (!trip.length) return Response.json({ error: "Udhëtimi nuk u gjet." }, { status: 404 });
    if (trip[0].shofer_id === userId) return Response.json({ error: "Nuk mund të kërkosh vend në udhëtimin tënd." }, { status: 403 });
    return Response.json({ error: "Nuk ka vende të lira." }, { status: 409 });
  } catch {
    return Response.json({ error: "Kërkesa nuk u ruajt. Provo përsëri." }, { status: 503 });
  }
}
