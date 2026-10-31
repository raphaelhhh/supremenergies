import { expect, test } from "bun:test";
import { heatPumpQuotePath, requestedQuoteWorks, isHeatPumpGuide } from "../src/lib/heat-pump-journey";

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