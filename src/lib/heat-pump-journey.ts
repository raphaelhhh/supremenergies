import { heatPumpCoverage } from "@/data/pompe-a-chaleur";
import { z } from "zod";

// Passed in navigation state only: no personal information in URLs or audience counters.
export const simulationTransferSchema = z.object({
  first_name: z.string().max(80), email: z.string().email().max(255), phone: z.string().max(32),
  postal_code: z.string().max(5), housing_type: z.enum(["maison", "appartement"]),
  income_category: z.enum(["bleu", "jaune", "violet", "rose"]), housing_age: z.enum([">15", "<15"]),
  owner_status: z.enum(["occupant", "bailleur", "copro"]), current_heating: z.string().max(40),
  household_size: z.number().int().min(1).max(100), rfr: z.number().finite().nonnegative(),
  region: z.enum(["idf", "autres"]), estimated_aid: z.number().finite().nonnegative(),
  total_mpr: z.number().finite().nonnegative(), total_cee: z.number().finite().nonnegative(),
});

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