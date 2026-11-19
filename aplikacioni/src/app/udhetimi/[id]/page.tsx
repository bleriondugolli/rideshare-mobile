import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejShoferin, gjejUdhetimin, lexoPreferimin } from "../../../lib/udhetimet";
import { Vendtakimi } from "../../../components/Vendtakimi";
import { profiliIm } from "../../../lib/lejet";
import { Preferimi } from "../../../components/Preferimi";
import { GjendjaUdhetimitLive } from "../../../components/GjendjaUdhetimit";
import { lexoGjendjen, type GjendjaUdhetimit } from "../../../lib/kerkesat";

export const dynamic = "force-dynamic";

export default async function Detajet({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ m?: string }>;
}) {
  const { id } = await params;
  const { m } = await searchParams;
  let udhetim;
  let shoferi: string | undefined;
  let profili: Awaited<ReturnType<typeof profiliIm>>;
  let preferimi: { ruajtur: boolean; numer: number } | undefined;
  let gjendja: GjendjaUdhetimit | null = null;
  try {
    udhetim = await gjejUdhetimin(id);
    if (udhetim) {
      [shoferi, profili] = await Promise.all([gjejShoferin(id), profiliIm()]);
      if (profili) preferimi = await lexoPreferimin(profili.id, id);
      gjendja = await lexoGjendjen(id, profili?.id ?? null);
    }
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }
  if (!udhetim) notFound();

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <p>RideShare{profili ? ` · ${profili.emri} · ${profili.roli === "udhetar" ? "Udhëtare" : "Shofer"}` : ""}</p>
      <p>UDHËTIMET DREJT AAB</p>
      <p>UDHËTIMI {udhetim.id}</p>
      <h2>{shoferi ?? "Shoferi"}</h2>
      <p>{udhetim.nisja} → {udhetim.destinacioni}</p>
      <p>Nisja <strong>{udhetim.ora}</strong> · Vende <strong>{udhetim.vende}</strong></p>
      {gjendja && <GjendjaUdhetimitLive fillimi={gjendja} emriPerdoruesit={profili?.emri ?? null} />}
      <Vendtakimi vendtakimi={udhetim.vendtakimi} editable />
      {m === "fushe" && <p role="alert">Veprimi nuk është i vlefshëm.</p>}
      {profili ? (
        <Preferimi udhetimId={udhetim.id} ruajtur={preferimi?.ruajtur ?? false} numer={preferimi?.numer ?? 0} />
      ) : (
        <p><Link href="/panel">Hyr për ta ruajtur te të preferuarat.</Link></p>
      )}
    </main>
  );
}
