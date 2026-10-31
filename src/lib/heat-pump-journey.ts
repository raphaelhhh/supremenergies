import { heatPumpCoverage } from "@/data/pompe-a-chaleur";

export function heatPumpQuotePath(from: string) {
  const params = new URLSearchParams({ project: "pompe-a-chaleur", from });
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