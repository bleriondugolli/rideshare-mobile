import "server-only";
import { getSql } from "./db";

export type Kerkesa = {
  id: string;
  emri: string;
  status: "ne pritje" | "e pranuar";
  krijuarMe: string;
};

export type GjendjaUdhetimit = {
  udhetim: {
    id: string;
    nisja: string;
    destinacioni: string;
    ora: string;
    vende: number;
    shoferi: string;
  };
  eshteShofer: boolean;
  kerkesaIme: Kerkesa | null;
  kerkesat: Kerkesa[];
};

export async function lexoGjendjen(udhetimId: string, userId: string | null): Promise<GjendjaUdhetimit | null> {
  const sql = getSql();
  const trips = await sql`
    SELECT u.id, u.nisja, u.destinacioni, u.ora, u.vende, u.shofer_id,
           COALESCE(p.emri, 'Shoferi') AS shoferi
    FROM udhetimet u
    LEFT JOIN profilet p ON p.github_id = u.shofer_id
    WHERE u.id = ${udhetimId}
  `;
  const trip = trips[0];
  if (!trip) return null;

  const eshteShofer = Boolean(userId && userId === trip.shofer_id);
  let rows: Record<string, unknown>[] = [];
  if (userId && eshteShofer) {
    rows = await sql`
      SELECT k.id::text AS id, p.emri, k.status, k.krijuar_me
      FROM kerkesat_vendet k
      JOIN profilet p ON p.github_id = k.udhetar_id
      WHERE k.udhetim_id = ${udhetimId}
      ORDER BY k.krijuar_me, k.id
    ` as Record<string, unknown>[];
  } else if (userId) {
    rows = await sql`
      SELECT k.id::text AS id, p.emri, k.status, k.krijuar_me
      FROM kerkesat_vendet k
      JOIN profilet p ON p.github_id = k.udhetar_id
      WHERE k.udhetim_id = ${udhetimId} AND k.udhetar_id = ${userId}
      ORDER BY k.krijuar_me DESC LIMIT 1
    ` as Record<string, unknown>[];
  }

  const kerkesat = rows.map((row) => ({
    id: String(row.id),
    emri: String(row.emri),
    status: row.status as Kerkesa["status"],
    krijuarMe: new Date(String(row.krijuar_me)).toISOString(),
  }));
  return {
    udhetim: {
      id: String(trip.id),
      nisja: String(trip.nisja),
      destinacioni: String(trip.destinacioni),
      ora: String(trip.ora),
      vende: Number(trip.vende),
      shoferi: String(trip.shoferi),
    },
    eshteShofer,
    kerkesaIme: eshteShofer ? null : kerkesat[0] ?? null,
    kerkesat: eshteShofer ? kerkesat : [],
  };
}
