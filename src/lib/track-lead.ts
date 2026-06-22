// Helper unique pour pousser un événement GA4 'generate_lead' dans le dataLayer GTM.
// Documentation officielle : https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
//
// Côté GA4 : marquer 'generate_lead' comme conversion (Admin → Évènements → Marquer comme conversion).
// Ensuite la conversion sera dispo dans Acquisition → Acquisition trafic → onglet Conversions, et
// segmentable par 'lead_source' (origine du formulaire) et 'page_path'.

type LeadSource =
  | "contact_form"
  | "devis_multistep"
  | "lead_magnet"
  | "simulateur_aides"
  | "exit_intent"
  | "sticky_mobile"
  | "scroll_cta";

export interface LeadEventPayload {
  source: LeadSource;
  /** Identifiant libre du projet (pompe-a-chaleur, isolation, etc.) */
  project_type?: string;
  /** Valeur estimée du lead pour le scoring (par défaut 1) */
  value?: number;
  /** Devise ISO (par défaut EUR) */
  currency?: string;
  /** Champs additionnels stockés en custom dimensions */
  extra?: Record<string, unknown>;
}

interface DataLayerWindow {
  dataLayer?: unknown[];
}

export function trackLead({
  source,
  project_type,
  value = 1,
  currency = "EUR",
  extra,
}: LeadEventPayload): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as DataLayerWindow;
  if (!w.dataLayer) w.dataLayer = [];
  w.dataLayer.push({
    event: "generate_lead",
    lead_source: source,
    project_type: project_type ?? null,
    value,
    currency,
    page_path: typeof location !== "undefined" ? location.pathname : null,
    ...extra,
  });
}

/** Lit le paramètre ?from=... de l'URL pour tagger l'origine d'un formulaire. */
export function getLeadSourceFromQuery(fallback: LeadSource): LeadSource {
  if (typeof window === "undefined") return fallback;
  const params = new URLSearchParams(window.location.search);
  const from = params.get("from");
  const allowed: LeadSource[] = [
    "contact_form",
    "devis_multistep",
    "lead_magnet",
    "simulateur_aides",
    "exit_intent",
    "sticky_mobile",
    "scroll_cta",
  ];
  return (allowed as string[]).includes(from ?? "") ? (from as LeadSource) : fallback;
}
