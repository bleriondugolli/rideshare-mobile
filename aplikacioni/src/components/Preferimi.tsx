"use client";

import { useRef, useState } from "react";

type Props = { udhetimId: string; ruajtur: boolean; numer: number };

export function Preferimi({ udhetimId, ruajtur: fillimishtRuajtur, numer: fillimishtNumer }: Props) {
  const [ruajtur, setRuajtur] = useState(fillimishtRuajtur);
  const [numer, setNumer] = useState(fillimishtNumer);
  const [nePritje, setNePritje] = useState(false);
  const [gabim, setGabim] = useState(false);
  const [konfirmuar, setKonfirmuar] = useState(false);
  const failNext = useRef(false);

  async function ruaj() {
    if (nePritje || ruajtur) return;
    setRuajtur(true);
    setNumer((v) => v + 1);
    setNePritje(true);
    setGabim(false);
    setKonfirmuar(false);
    try {
      const response = await fetch("/api/preferimet", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(failNext.current ? { "x-demo-failure": "1" } : {}) },
        body: JSON.stringify({ udhetimId }),
      });
      if (!response.ok) throw new Error("Ruajtja dështoi");
      const data = await response.json();
      failNext.current = false;
      setNumer(data.count);
      setKonfirmuar(true);
    } catch {
      setRuajtur(false);
      setNumer((v) => Math.max(0, v - 1));
      failNext.current = false;
      setGabim(true);
    } finally {
      setNePritje(false);
    }
  }

  return <section aria-label="Të preferuarat">
    <button className="action" type="button" disabled={nePritje || ruajtur} onClick={ruaj}>
      {nePritje ? "★ Po ruhet…" : ruajtur ? "★ I ruajtur" : gabim ? "☆ Provo përsëri" : "☆ Ruaj udhëtimin"}
    </button>
    <p role="status" aria-live="polite">
      {nePritje ? "Po presim konfirmimin e serverit." : gabim ? "Nuk u ruajt. Provo përsëri." : konfirmuar ? "U ruajt te të preferuarat." : ruajtur ? "Preferimet u lexuan nga serveri." : "Nuk është te të preferuarat."}
    </p>
    <h2>Të preferuarat {numer}</h2>
    <p>Preferim personal · jo rezervim</p>
    {process.env.NODE_ENV !== "production" && !ruajtur && !nePritje && !gabim && (
      <button type="button" className="demo-failure" onClick={() => { failNext.current = true; void ruaj(); }}>Simulo refuzimin në server</button>
    )}
  </section>;
}
