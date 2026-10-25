// Chargement de la balise Google Ads et envoi de la conversion « demande de devis ».
// La balise ne se charge qu'avec le consentement du visiteur (ou hors régions
// à consentement obligatoire). Voir src/lib/consent.ts.

import { canTrackAds, updateConsent } from "./consent";

const ADS_ID = "AW-18537020534";
const CONVERSION_SEND_TO = "AW-18537020534/BW8zCJSjxakdEPb4kYdF";

export async function loadGoogleAds(): Promise<void> {
  const allowed = await canTrackAds();
  if (!allowed) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  updateConsent("granted");
  if (document.querySelector("script[data-google-ads]")) return;
  window.gtag("js", new Date());
  window.gtag("config", ADS_ID);
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  script.async = true;
  script.dataset.googleAds = "";
  document.head.appendChild(script);
}

/** Envoie la conversion « Demande de devis (site) » à Google Ads. */
export async function fireAdsConversion(): Promise<void> {
  if (!(await canTrackAds())) return;
  window.gtag?.("event", "conversion", {
    send_to: CONVERSION_SEND_TO,
    value: 1.0,
    currency: "EUR",
  });
}
