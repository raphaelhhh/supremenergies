import { expect, test } from "bun:test";
import { heatPumpQuotePath, requestedQuoteWorks, isHeatPumpGuide, heatPumpSimulationPath, guidePathFromSearch, journeyMetadata, simulationTransferSchema } from "../src/lib/heat-pump-journey";

test("PAC links use the internal quote and preselect the correct work", () => {
  const url = new URL(heatPumpQuotePath("blog_aides"), "https://supremenergies.com");
  expect(url.pathname).toBe("/devis-gratuit");
  expect(url.searchParams.get("from")).toBe("blog_aides");
  expect(requestedQuoteWorks(url.search)).toEqual(["Pompe à chaleur"]);
});
test("unrecognized and generic links do not invent a project", () => {
  expect(requestedQuoteWorks("?project=autre")).toEqual([]);
  expect(requestedQuoteWorks("")).toEqual([]);
});
test("PAC and funding guides are relevant but unrelated solar articles are not", () => {
  expect(isHeatPumpGuide("pompe-a-chaleur", "Choisir son chauffage")).toBe(true);
  expect(isHeatPumpGuide("aides-financieres", "Financer ses travaux")).toBe(true);
  expect(isHeatPumpGuide("renovation-globale", "Audit énergétique : étapes")).toBe(true);
  expect(isHeatPumpGuide("panneaux-solaires", "Autoconsommation solaire")).toBe(false);
});

test("guide → simulator → PAC quote preserves the originating guide", () => {
  const simulator = new URL(heatPumpSimulationPath("blog_audit-energetique_final"), "https://supremenergies.com");
  expect(simulator.pathname).toBe("/simulateur-aides");
  expect(requestedQuoteWorks(simulator.search)).toEqual(["Pompe à chaleur"]);
  const guide = guidePathFromSearch(simulator.search);
  expect(guide).toBe("/blog/audit-energetique");
  expect(journeyMetadata(simulator.search, "simulation").journey_stage).toBe("guide_simulation");
  const quote = new URL(heatPumpQuotePath("simulateur_resultat", guide), simulator);
  expect(quote.pathname).toBe("/devis-gratuit");
  expect(journeyMetadata(quote.search, "quote")).toEqual({ guide_path: "/blog/audit-energetique", journey_stage: "guide_simulation_quote" });
});

test("untrusted guide URLs and incomplete simulation data are rejected", () => {
  expect(guidePathFromSearch("?guide=https://evil.example/user")).toBeUndefined();
  expect(guidePathFromSearch("?guide=/blog/test?email=someone")).toBeUndefined();
  expect(simulationTransferSchema.safeParse({ income_category: "vert" }).success).toBe(false);
});