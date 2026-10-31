import { heatPumpCoverage } from "@/data/pompe-a-chaleur";

export function guidePathFromSearch(search: string): string | undefined {
  const guide = new URLSearchParams(search).get("guide");
  return guide && /^\/blog\/[a-z0-9-]{1,180}$/.test(guide) ? guide : undefined;
}

export function heatPumpSimulationPath(from: string) {
  const guide = from.replace(/^blog_/, "").replace(/_final$/, "");
  const params = new URLSearchParams({ project: "pompe-a-chaleur" });
  if (/^[a-z0-9-]{1,180}$/.test(guide)) params.set("guide", `/blog/${guide}`);
  return `/simulateur-aides?${params}`;
}

export function journeyMetadata(search: string, stage: "simulation" | "quote") {
  const guide = guidePathFromSearch(search);
  const simulated = stage === "simulation" || new URLSearchParams(search).get("from") === "simulateur_resultat";
  return {
    ...(guide ? { guide_path: guide } : {}),
    journey_stage: stage === "simulation"
      ? (guide ? "guide_simulation" : "simulation")
      : (simulated ? (guide ? "guide_simulation_quote" : "simulation_quote") : "quote"),
  };
}

export function heatPumpQuotePath(from: string, guide?: string) {
  const params = new URLSearchParams({ project: "pompe-a-chaleur", from });
  if (guide && /^\/blog\/[a-z0-9-]{1,180}$/.test(guide)) params.set("guide", guide);
  return `${heatPumpCoverage.quotePath}?${params}`;
}

export function requestedQuoteWorks(search: string): string[] {
  return new URLSearchParams(search).get("project") === "pompe-a-chaleur"
    ? ["Pompe à chaleur"] : [];
}

export function isHeatPumpGuide(category: string | null | undefined, title: string) {
  return category === "pompe-a-chaleur" || category === "aides-financieres"
    || /pompe à chaleur|audit énergétique|éco[-‑ ]?ptz|maprimerénov/i.test(title);
}