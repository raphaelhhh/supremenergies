import { describe, expect, test } from "bun:test";
import consolidation from "../src/data/blog-consolidation.json";

describe("Eco-PTZ consolidation", () => {
  test("preserves the obsolete guide link with the stronger existing URL", () => {
    expect(consolidation.redirects["/blog/eco-ptz-2026-conditions-montant-duree-et-guide-complet-3"])
      .toBe("/blog/eco-ptz-2026-conditions-montant-duree-et-guide-complet-2");
  });
  test("keeps the destination among the three retained guides", () => {
    for (const target of Object.values(consolidation.redirects)) {
      expect(consolidation.guideSlugs).toContain(target.replace("/blog/", ""));
      expect(Object.keys(consolidation.redirects)).not.toContain(target);
    }
  });
});