"use client";

import { useState } from "react";

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
  const [gjendjaVendndodhjes, setGjendjaVendndodhjes] = useState(
    "Vendndodhja nuk është kërkuar.",
  );
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
    error: Pick<
      GeolocationPositionError,
      "code" | "PERMISSION_DENIED" | "POSITION_UNAVAILABLE" | "TIMEOUT"
    >,
  ) {
    if (error.code === error.PERMISSION_DENIED) {
      setGjendjaVendndodhjes(
        "Leja u refuzua. Shkruaj vendtakimin vetë.",
      );
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      setGjendjaVendndodhjes("Vendndodhja nuk është e disponueshme.");
    } else if (error.code === error.TIMEOUT) {
      setGjendjaVendndodhjes(
        "Kërkesa për vendndodhje skadoi. Provo përsëri.",
      );
    } else {
      setGjendjaVendndodhjes("Vendndodhja nuk mund të lexohej.");
    }
    setDukeKerkuarVendndodhjen(false);
  }

  function lexoVendndodhjen() {
    setSaktesia(null);
    if (!navigator.geolocation) {
      setDukeKerkuarVendndodhjen(false);
      setGjendjaVendndodhjes("Shfletuesi nuk e mbështet vendndodhjen.");
      return;
    }

    setDukeKerkuarVendndodhjen(true);
    setGjendjaVendndodhjes("Po kërkojmë vendndodhjen…");

    function kurMerretPozicioni(position: GeolocationPosition) {
      setSaktesia(Math.round(position.coords.accuracy));
      setGjendjaVendndodhjes("Pozicioni u mor.");
      setDukeKerkuarVendndodhjen(false);
    }

    try {
      navigator.geolocation.getCurrentPosition(
        kurMerretPozicioni,
        kurDeshtonLeximi,
        { timeout: 10000 },
      );
    } catch {
      setGjendjaVendndodhjes("Vendndodhja nuk mund të lexohej.");
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
      {gabim && (
        <p role="alert" data-testid="meeting-error">
          {gabim}
        </p>
      )}
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
      <p role="status" data-testid="location-status">
        {gjendjaVendndodhjes}
      </p>
      {saktesia !== null && (
        <p data-testid="location-accuracy">Saktësia: {saktesia} m</p>
      )}
    </section>
  );
}
