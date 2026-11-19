"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ndryshoOren, profiliIm } from "../../lib/lejet";
import { getSql } from "../../lib/db";

export async function ruajOren(formData: FormData) {
  let mesazh: string;
  try {
    mesazh = await ndryshoOren(String(formData.get("id") ?? ""), String(formData.get("ora") ?? ""));
  } catch {
    mesazh = "databaza";
  }
  if (mesazh === "ruajtur") {
    revalidatePath("/");
    revalidatePath("/udhetimi/2");
  }
  // redirect qëndron jashtë try/catch: Next.js e përdor si kontroll rrjedhe.
  redirect("/panel?m=" + mesazh);
}

export async function ndryshoPreferimin(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const veprimi = String(formData.get("veprimi") ?? "");
  const profili = await profiliIm();
  if (!profili) redirect("/panel?m=hyr");
  if (!/^[\w-]+$/.test(id) || !["ruaj", "hiq"].includes(veprimi)) {
    redirect(`/udhetimi/${encodeURIComponent(id)}?m=fushe`);
  }

  const sql = getSql();
  if (veprimi === "ruaj") {
    const rows = await sql`
      INSERT INTO udhetimet_e_ruajtura (github_id, udhetim_id)
      SELECT ${profili.id}, id FROM udhetimet WHERE id = ${id}
      ON CONFLICT (github_id, udhetim_id) DO NOTHING
      RETURNING udhetim_id
    `;
    if (rows.length === 0) {
      const existing = await sql`SELECT id FROM udhetimet WHERE id = ${id}`;
      if (existing.length === 0) redirect("/?m=udhetim");
    }
    revalidatePath(`/udhetimi/${id}`);
    redirect(`/udhetimi/${id}?m=ruajtur`);
  }

  await sql`
    DELETE FROM udhetimet_e_ruajtura
    WHERE github_id = ${profili.id} AND udhetim_id = ${id}
  `;
  revalidatePath(`/udhetimi/${id}`);
  redirect(`/udhetimi/${id}?m=hequr`);
}
