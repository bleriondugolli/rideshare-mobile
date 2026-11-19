import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { getSql } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId || !/^\d+$/.test(userId)) return Response.json({ error: "Hyr si shofer." }, { status: 401 });
  if (!/^\d+$/.test(id)) return Response.json({ error: "Kërkesa nuk është e vlefshme." }, { status: 400 });

  try {
    const sql = getSql();
    const accepted = await sql`
      WITH target AS MATERIALIZED (
        SELECT k.id, k.udhetim_id
        FROM kerkesat_vendet k
        JOIN udhetimet u ON u.id = k.udhetim_id
        WHERE k.id = ${id} AND u.shofer_id = ${userId}
          AND k.status = 'ne pritje' AND u.vende > 0
        FOR UPDATE OF k, u
      ), seat AS (
        UPDATE udhetimet u SET vende = u.vende - 1
        FROM target t WHERE u.id = t.udhetim_id AND u.vende > 0
        RETURNING u.id
      )
      UPDATE kerkesat_vendet k SET status = 'e pranuar', perditesuar_me = now()
      FROM seat s WHERE k.id = ${id} AND k.udhetim_id = s.id AND k.status = 'ne pritje'
      RETURNING k.id::text AS id, k.status
    `;
    if (accepted.length) return Response.json({ kerkesa: accepted[0] });
    const ownRequest = await sql`
      SELECT k.status, u.shofer_id, u.vende
      FROM kerkesat_vendet k JOIN udhetimet u ON u.id = k.udhetim_id
      WHERE k.id = ${id}
    `;
    if (!ownRequest.length) return Response.json({ error: "Kërkesa nuk u gjet." }, { status: 404 });
    if (ownRequest[0].shofer_id !== userId) return Response.json({ error: "Nuk ke leje për këtë kërkesë." }, { status: 403 });
    return Response.json({ error: "Kërkesa është trajtuar ose nuk ka vende të lira." }, { status: 409 });
  } catch {
    return Response.json({ error: "Kërkesa nuk u përditësua. Provo përsëri." }, { status: 503 });
  }
}
