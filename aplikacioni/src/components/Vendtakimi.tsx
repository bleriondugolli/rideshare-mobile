"use client";

import { useState } from "react";

type GjendjaVendndodhjes =
  | "idle"
  | "loading"
  | "success"
  | "denied"
  | "timeout"
  | "unavailable";

const mesazhetVendndodhjes: Record<GjendjaVendndodhjes, string> = {
  idle: "Vendndodhja nuk është kërkuar.",
  loading: "Po kërkojmë vendndodhjen…",
  success: "Pozicioni u mor.",
  denied: "Leja u refuzua. Shkruaj vendtakimin vetë.",
  timeout: "Kërkesa për vendndodhje skadoi. Provo përsëri.",
  unavailable: "Vendndodhja nuk është e disponueshme.",
};

export function Vendtakimi({
  vendtakimi: vendtakimiFillestar,
  testId,
  editable = false,
}: {
  vendtakimi: string;
  testId?: string;
  editable?: boolean;
}) {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gabim, setGabim] = useState("");
  const [gjendjaVendndodhjes, setGjendjaVendndodhjes] =
    useState<GjendjaVendndodhjes>("idle");
  const [dukeKerkuarVendndodhjen, setDukeKerkuarVendndodhjen] = useState(false);
  const [saktesia, setSaktesia] = useState<number | null>(null);

  function konfirmo() {
    const tekst = teksti.trim();
    if (!tekst) {
      setGabim("Shkruaj vendtakimin para se ta konfirmosh.");
      return;
    }

    setGabim("");
    setVendtakimi(tekst);
  }

  function kurDeshtonLeximi(
    error: Pick<GeolocationPositionError, "code">,
  ) {
    if (error.code === 1) {
      setGjendjaVendndodhjes("denied");
    } else if (error.code === 2) {
      setGjendjaVendndodhjes("unavailable");
    } else if (error.code === 3) {
      setGjendjaVendndodhjes("timeout");
    } else {
      setGjendjaVendndodhjes("unavailable");
    }
    setDukeKerkuarVendndodhjen(false);
  }

  function lexoVendndodhjen() {
    setSaktesia(null);
    if (!navigator.geolocation) {
      setDukeKerkuarVendndodhjen(false);
      setGjendjaVendndodhjes("unavailable");
      return;
    }

    setDukeKerkuarVendndodhjen(true);
    setGjendjaVendndodhjes("loading");

    function kurMerretPozicioni(position: GeolocationPosition) {
      setSaktesia(Math.round(position.coords.accuracy));
      setGjendjaVendndodhjes("success");
      setDukeKerkuarVendndodhjen(false);
    }

    try {
      navigator.geolocation.getCurrentPosition(
        kurMerretPozicioni,
        kurDeshtonLeximi,
        { timeout: 10000 },
      );
    } catch {
      setGjendjaVendndodhjes("unavailable");
      setDukeKerkuarVendndodhjen(false);
    }
  }

  if (!editable) {
    return <p data-testid={testId}>Vendtakimi: {vendtakimiFillestar}</p>;
  }

  return (
    <section>
      <label htmlFor="meeting-input">Shkruaj vendtakimin</label>
      <input
        id="meeting-input"
        data-testid="meeting-input"
        value={teksti}
        onChange={(event) => setTeksti(event.target.value)}
      />
      <button
        className="action"
        type="button"
        data-testid="confirm-meeting"
        onClick={konfirmo}
      >
        Konfirmo në telefon
      </button>
      <p role="alert" data-testid="meeting-error">
        {gabim}
      </p>
      <p data-testid="confirmed-meeting">
        Vendtakimi i konfirmuar: {vendtakimi}
      </p>
      <p>Vendtakimi i publikuar: {vendtakimiFillestar}</p>
      <button
        className="action"
        type="button"
        data-testid="locate-me"
        onClick={lexoVendndodhjen}
        disabled={dukeKerkuarVendndodhjen}
      >
        Përdor vendndodhjen time
      </button>
      <p
        role="status"
        data-testid="location-status"
        data-state={gjendjaVendndodhjes}
      >
        {mesazhetVendndodhjes[gjendjaVendndodhjes]}
      </p>
      <p data-testid="location-accuracy">
        {saktesia !== null ? `Saktësia: ${saktesia} m` : ""}
      </p>
    </section>
  );
}
