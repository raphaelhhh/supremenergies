import { describe, expect, test } from "bun:test";
import consolidation from "../src/data/blog-consolidation.json";

describe("Blog guide consolidation", () => {
  test("preserves the obsolete guide link with the stronger existing URL", () => {
    expect(consolidation.redirects["/blog/eco-ptz-2026-conditions-montant-duree-et-guide-complet-3"])
      .toBe("/blog/eco-ptz-2026-conditions-montant-duree-et-guide-complet-2");
  });
  for (const slug of [
    "cumul-maprimerenov-cee-2026-le-guide-complet-plafonds",
    "cumul-maprimerenov-cee-2026-le-guide-pour-payer-moins-cher",
    "cumul-maprimerenov-cee-2026-guide-et-plafonds-d-ecretement",
    "cumul-maprimerenov-cee-2026-guide-complet-des-aides",
    "cumul-maprimerenov-cee-2026-guide-complet-et-plafonds",
  ]) {
    test(`preserves the old CEE guide address: ${slug}`, () => {
      expect((consolidation.redirects as Record<string, string>)[`/blog/${slug}`])
        .toBe("/blog/cumul-maprimerenov-cee-2026-le-guide-complet-des-aides");
    });
  }
  test("keeps the destination among the three retained guides", () => {
    for (const target of Object.values(consolidation.redirects)) {
      expect(consolidation.guideSlugs).toContain(target.replace("/blog/", ""));
      expect(Object.keys(consolidation.redirects)).not.toContain(target);
    }
  });
});