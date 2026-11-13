// Chargement de la balise Google Ads et envoi de la conversion « demande de devis ».
// La balise ne se charge qu'avec le consentement du visiteur (ou hors régions
// à consentement obligatoire). Voir src/lib/consent.ts.

import { updateGoogleAdConsent } from "./ad-consent";
import { permitsTracking } from "./tracking-permission";

const ADS_ID = "AW-18537020534";
const CONVERSION_SEND_TO = "AW-18537020534/BW8zCJSjxakdEPb4kYdF";

export async function loadGoogleAds(): Promise<void> {
  const allowed = await permitsTracking("advertising");
  if (!allowed) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer.push(args);
    };
  updateGoogleAdConsent("granted");
  if (document.querySelector("script[data-google-ads]")) return;
  window.gtag("set", "developer_id.dZjgwMW", true);
  window.gtag("js", new Date());
  window.gtag("config", ADS_ID, { send_page_view: false, page_location: location.origin + location.pathname });
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
  script.async = true;
  script.dataset.googleAds = "";
  document.head.appendChild(script);
}

/** Envoie la conversion « Demande de devis (site) » à Google Ads. */
export async function fireAdsConversion(): Promise<void> {
  if (!(await permitsTracking("advertising"))) return;
  await loadGoogleAds();
  if (!(await permitsTracking("advertising"))) return;
  window.gtag?.("event", "conversion", {
    send_to: CONVERSION_SEND_TO,
    page_location: location.origin + location.pathname,
  });
}
