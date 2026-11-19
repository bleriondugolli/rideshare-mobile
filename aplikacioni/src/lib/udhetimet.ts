import "server-only";
import { getSql } from "./db";

export type Udhetim = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
};

export async function lexoUdhetimet(): Promise<Udhetim[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, vende
    FROM udhetimet ORDER BY id
  `;
  return rows as Udhetim[];
}

export async function gjejUdhetimin(id: string): Promise<Udhetim | undefined> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, nisja, destinacioni, ora, vendtakimi, vende
    FROM udhetimet WHERE id = ${id}
  `;
  return rows[0] as Udhetim | undefined;
}

export async function gjejShoferin(udhetimId: string): Promise<string | undefined> {
  const sql = getSql();
  const rows = await sql`
    SELECT p.emri
    FROM udhetimet u
    JOIN profilet p ON p.github_id = u.shofer_id
    WHERE u.id = ${udhetimId}
  `;
  return rows[0]?.emri as string | undefined;
}

export async function lexoPreferimin(userId: string, udhetimId: string) {
  const sql = getSql();
  const rows = await sql`
    SELECT
      EXISTS (
        SELECT 1 FROM udhetimet_e_ruajtura
        WHERE github_id = ${userId} AND udhetim_id = ${udhetimId}
      ) AS ruajtur,
      (SELECT COUNT(*)::int FROM udhetimet_e_ruajtura
       WHERE github_id = ${userId}) AS numer
  `;
  return rows[0] as { ruajtur: boolean; numer: number };
}
