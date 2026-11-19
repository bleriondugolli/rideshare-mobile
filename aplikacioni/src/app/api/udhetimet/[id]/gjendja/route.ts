import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { lexoGjendjen } from "../../../../../lib/kerkesat";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id && /^\d+$/.test(session.user.id) ? session.user.id : null;
    const state = await lexoGjendjen(id, userId);
    if (!state) return Response.json({ error: "Udhëtimi nuk u gjet." }, { status: 404 });
    return Response.json(state, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return Response.json({ error: "Gjendja nuk mund të lexohet tani." }, { status: 503 });
  }
}
