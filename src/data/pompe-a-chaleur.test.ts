import { describe, expect, test } from "bun:test";
import { heatPumpCoverage } from "./pompe-a-chaleur";

describe("Heat pump installation offer", () => {
  test("covers all of France", () => {
    expect(heatPumpCoverage.areaServed).toEqual({ "@type": "Country", name: "France" });
  });
  test("uses the company's own installation teams", () => {
    expect(heatPumpCoverage.installationTeam).toBe("internal");
  });
  test("sends quote requests to the internal quote form", () => {
    expect(heatPumpCoverage.quotePath).toBe("/devis-gratuit");
  });
});