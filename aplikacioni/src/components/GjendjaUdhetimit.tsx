"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GjendjaUdhetimit } from "../lib/kerkesat";

export function GjendjaUdhetimitLive({
  fillimi,
  emriPerdoruesit,
}: {
  fillimi: GjendjaUdhetimit;
  emriPerdoruesit: string | null;
}) {
  const [gjendja, setGjendja] = useState(fillimi);
  const [statusLeximi, setStatusLeximi] = useState<"lidhur" | "rilidhje">("lidhur");
  const [online, setOnline] = useState(true);
  const [dukeRuajtur, setDukeRuajtur] = useState(false);
  const [kerkesaNeVeprim, setKerkesaNeVeprim] = useState<string | null>(null);
  const [gabim, setGabim] = useState("");
  const [sukses, setSukses] = useState("");
  const readBusy = useRef(false);
  const readVersion = useRef(0);
  const readController = useRef<AbortController | null>(null);
  const mounted = useRef(false);

  const anuloLeximin = useCallback(() => {
    readVersion.current += 1;
    readController.current?.abort();
    readController.current = null;
    readBusy.current = false;
  }, []);

  const lexoTani = useCallback(async (force = false) => {
    if (readBusy.current && !force) return;
    if (force) anuloLeximin();
    readBusy.current = true;
    const version = ++readVersion.current;
    const controller = new AbortController();
    readController.current = controller;
    try {
      const response = await fetch(`/api/udhetimet/${encodeURIComponent(fillimi.udhetim.id)}/gjendja`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Leximi dështoi");
      const data = await response.json() as GjendjaUdhetimit;
      if (mounted.current && version === readVersion.current) {
        setGjendja(data);
        setStatusLeximi("lidhur");
      }
    } catch {
      if (mounted.current && version === readVersion.current && !controller.signal.aborted) {
        setStatusLeximi("rilidhje");
      }
    } finally {
      if (version === readVersion.current) {
        readBusy.current = false;
        readController.current = null;
      }
    }
  }, [anuloLeximin, fillimi.udhetim.id]);

  useEffect(() => {
    mounted.current = true;
    setOnline(navigator.onLine);
    const uLidh = () => { setOnline(true); void lexoTani(true); };
    const uShkeput = () => {
      setOnline(false);
      setStatusLeximi("rilidhje");
      anuloLeximin();
    };
    const timer = window.setInterval(() => void lexoTani(), 5000);
    window.addEventListener("online", uLidh);
    window.addEventListener("offline", uShkeput);
    return () => {
      mounted.current = false;
      window.clearInterval(timer);
      window.removeEventListener("online", uLidh);
      window.removeEventListener("offline", uShkeput);
      anuloLeximin();
    };
  }, [anuloLeximin, lexoTani]);

  async function krijoKerkesen() {
    if (dukeRuajtur) return;
    anuloLeximin();
    setDukeRuajtur(true);
    setGabim("");
    setSukses("");
    try {
      const response = await fetch(`/api/udhetimet/${encodeURIComponent(gjendja.udhetim.id)}/kerkesa`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Kërkesa nuk u ruajt.");
      setSukses("Kërkesa u dërgua.");
      await lexoTani(true);
    } catch (error) {
      setGabim(error instanceof Error ? error.message : "Kërkesa nuk u ruajt.");
      await lexoTani(true);
    } finally {
      setDukeRuajtur(false);
    }
  }

  async function pranoKerkesen(kerkesaId: string) {
    if (kerkesaNeVeprim) return;
    anuloLeximin();
    setKerkesaNeVeprim(kerkesaId);
    setGabim("");
    setSukses("");
    try {
      const response = await fetch(`/api/kerkesat/${encodeURIComponent(kerkesaId)}`, { method: "PATCH" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Kërkesa nuk u pranua.");
      setSukses("Pranimi u ruajt.");
      await lexoTani(true);
    } catch (error) {
      setGabim(error instanceof Error ? error.message : "Kërkesa nuk u pranua.");
      await lexoTani(true);
    } finally {
      setKerkesaNeVeprim(null);
    }
  }

  const { udhetim, eshteShofer, kerkesaIme, kerkesat } = gjendja;
  return <section id="kerkesa" className="live-trip" aria-live="polite">
    <p>RideShare{emriPerdoruesit ? ` · ${emriPerdoruesit} · ${eshteShofer ? "Shofer" : "Udhëtare"}` : " · Vizitor"}</p>
    <h2>UDHËTIMI {udhetim.id}</h2>
    <p className="live-route">{udhetim.nisja.toUpperCase()} → {udhetim.destinacioni.toUpperCase()}</p>
    <h3>Nisja {udhetim.ora}</h3>
    <p>{udhetim.shoferi}</p>
    <p>Vende të lira <strong>{udhetim.vende}</strong> · Statusi <strong>{udhetim.vende > 0 ? "Aktiv" : "Plot"}</strong></p>

    {!emriPerdoruesit ? (
      <p><Link href="/panel">Hyr me GitHub për të parë ose dërguar kërkesë.</Link></p>
    ) : eshteShofer ? (
      <>
        <h3>KËRKESAT E UDHËTARËVE</h3>
        {kerkesat.length === 0 ? <p><strong>Ende pa kërkesë</strong></p> : <ul className="request-list">
          {kerkesat.map((kerkesa) => <li key={kerkesa.id}>
            <strong>{kerkesa.emri}</strong> · {kerkesa.status === "ne pritje" ? "Në pritje" : "U pranua"}
            {kerkesa.status === "ne pritje" && udhetim.vende > 0 && <button className="action" type="button" disabled={!online || statusLeximi === "rilidhje" || Boolean(kerkesaNeVeprim)} onClick={() => void pranoKerkesen(kerkesa.id)}>
              {kerkesaNeVeprim === kerkesa.id ? "Po pranohet…" : "Prano kërkesën"}
            </button>}
          </li>)}
        </ul>}
      </>
    ) : (
      <>
        <h3>KËRKESA IME</h3>
        {kerkesaIme ? <p><strong>{kerkesaIme.status === "ne pritje" ? "Në pritje" : "U pranua"}</strong></p> : udhetim.vende > 0 ? <button className="action" type="button" disabled={!online || statusLeximi === "rilidhje" || dukeRuajtur} onClick={() => void krijoKerkesen()}>
          {dukeRuajtur ? "Po dërgohet…" : "Kërko një vend"}
        </button> : <p>Nuk ka vende të lira.</p>}
      </>
    )}

    {gabim && <p role="alert">{gabim}</p>}
    {!eshteShofer && kerkesaIme?.status === "e pranuar" && <p role="status"><strong>Vendi u konfirmua.</strong></p>}
    {sukses && (eshteShofer || kerkesaIme?.status !== "e pranuar") && <p role="status"><strong>{sukses}</strong></p>}
    <p role="status">{statusLeximi === "rilidhje" ? "Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet që kërkojnë rrjet janë të bllokuara." : "Gjendja u lexua nga serveri · Përditësim automatik çdo 5 sekonda"}</p>
  </section>;
}
