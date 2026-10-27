import { expect, test } from "bun:test";
import { leadDetailCells, leadDetailHeaders } from "../supabase/functions/_shared/lead-sheet-details";
test("all four declared income profiles reach the sheet", () => {
  for (const [profile, label] of [["bleu", "Bleu"], ["jaune", "Jaune"], ["violet", "Violet"], ["rose", "Rose"]]) {
    expect(leadDetailCells({ income_category: profile })[0]).toBe(label);
  }
});
test("quote without income information does not invent a profile", () => {
  expect(leadDetailCells({ housing_type: "Maison individuelle", surface: "120" })[0]).toBe("Non renseigné");
});
test("all submitted simulation choices and amounts reach separate columns", () => {
  expect(leadDetailCells({ income_category: "violet", housing_type: "maison", housing_age: ">15", owner_status: "occupant", current_heating: "gaz", household_size: 2, rfr: 44362, region: "autres", estimated_aid: 8500, total_mpr: 3400, total_cee: 5100, work_details: [{ label: "Pompe à chaleur air/eau", surface: 80 }, { label: "Fenêtres", count: 4 }] })).toEqual(["Violet", "Maison", "Plus de 15 ans", "Propriétaire occupant", "Gaz", 2, 44362, "", "Pompe à chaleur air/eau — 80 m² ; Fenêtres — Quantité : 4", 8500, 3400, 5100, "Hors Île-de-France"]);
  expect(leadDetailHeaders).toHaveLength(13);
});