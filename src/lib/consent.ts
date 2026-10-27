// Gestion du consentement cookies (publicité + mesure d'audience).
// Régions avec consentement obligatoire : EEE, Royaume-Uni, Suisse, Québec.
// Le choix du visiteur est stocké dans localStorage (cookie_consent) avec
// un horodatage et la version de la notice (cookie_consent_meta).

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const STORAGE_KEY = "cookie_consent";
export const STORAGE_META_KEY = "cookie_consent_meta";
export const CONSENT_NOTICE_VERSION = "2026-10-27";

const CONSENT_COUNTRIES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH", "CA",
];

let consentRegion: Promise<boolean> | undefined;

export function isConsentRequiredRegion(): Promise<boolean> {
  return (consentRegion ??= lookupConsentRegion());
}

async function lookupConsentRegion(): Promise<boolean> {
  try {
    const res = await fetch("/cdn-cgi/trace", { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return true;
    const country = (await res.text()).match(/^loc=([A-Z0-9]{2})$/m)?.[1];
    if (!country || country === "XX" || country === "T1") return true;
    return CONSENT_COUNTRIES.includes(country);
  } catch {
    return true;
  }
}

export async function hasAdConsent(): Promise<boolean> {
  return localStorage.getItem(STORAGE_KEY) === "granted";
}

export async function canTrackAds(): Promise<boolean> {
  const choice = localStorage.getItem(STORAGE_KEY);
  if (choice !== null) return choice === "granted";
  const required = await isConsentRequiredRegion();
  const latest = localStorage.getItem(STORAGE_KEY);
  return latest !== null ? latest === "granted" : !required;
}

export function updateConsent(decision: "granted" | "denied") {
  if (decision === "denied") window.gtag?.("set", "user_data", null);
  window.gtag?.("consent", "update", {
    ad_storage: decision,
    ad_user_data: decision,
    ad_personalization: decision,
    analytics_storage: decision,
  });
}

/** Enregistre le choix du visiteur avec horodatage et version de la notice. */
export function persistConsentChoice(decision: "granted" | "denied") {
  localStorage.setItem(STORAGE_KEY, decision);
  try {
    localStorage.setItem(
      STORAGE_META_KEY,
      JSON.stringify({
        choice: decision,
        at: new Date().toISOString(),
        notice_version: CONSENT_NOTICE_VERSION,
        purposes: ["advertising", "analytics"],
        recipients: ["Google", "Meta"],
      })
    );
  } catch {
    // stockage indisponible : le choix principal suffit
  }
  updateConsent(decision);
  window.dispatchEvent(new Event("site-consent-change"));
}
