// Chargement du Meta Pixel et envoi de l'événement « Lead ».
// Le pixel ne se charge qu'avec le consentement publicitaire du visiteur
// (ou hors régions à consentement obligatoire) — voir src/lib/consent.ts.
// Les visiteurs ayant refusé, ou n'ayant pas choisi dans une région à
// consentement, ne déclenchent aucune requête vers Meta.

import { canTrackAds } from "./consent";

const PIXEL_ID = "1465530914535005";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

/** Reproduit le stub officiel du pixel : les appels passés avant le
 * chargement de fbevents.js sont mis en file puis rejoués. */
function getFbq(): Fbq {
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  if (w.fbq) return w.fbq;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      (fbq.queue = fbq.queue ?? []).push(args);
    }
  };
  w.fbq = fbq;
  w._fbq = fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  return fbq;
}

/** Initialise et charge fbevents.js (idempotent). */
function initMetaPixel(): void {
  const fbq = getFbq();
  if (document.querySelector("script[data-meta-pixel]")) return;
  fbq("init", PIXEL_ID, {}, { agent: "lovable" });
  fbq("track", "PageView");
  const script = document.createElement("script");
  script.async = true;
  script.dataset.metaPixel = "";
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

export async function loadMetaPixel(): Promise<void> {
  if (await canTrackAds()) initMetaPixel();
}

/** Événement Meta « Lead » à chaque formulaire réussi (devis, contact…). */
export async function trackMetaLead(params: {
  content_name?: string;
  value?: number;
  currency?: string;
}): Promise<void> {
  if (!(await canTrackAds())) return;
  initMetaPixel();
  const fbq = getFbq();
  fbq("track", "Lead", {
    content_name: params.content_name ?? null,
    value: params.value ?? 1,
    currency: params.currency ?? "EUR",
  });
}
