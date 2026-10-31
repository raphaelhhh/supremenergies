import { expect, test } from "bun:test";
import { leadSheetAppendRequest } from "../supabase/functions/_shared/lead-sheet-append";

test("new leads append at column A without changing existing notes or statuses", () => {
  const request = leadSheetAppendRequest(623765645, ["Date", "Devis", "Test", "", "", "", "", "", "Nouveau", "", "Violet", 44362]);
  expect(request.requests).toHaveLength(1);
  const append = request.requests[0].appendCells;
  expect(append.sheetId).toBe(623765645);
  expect(append.fields).toBe("userEnteredValue");
  expect(append.rows[0].values[0]).toEqual({ userEnteredValue: { stringValue: "Date" } });
  expect(append.rows[0].values[8]).toEqual({ userEnteredValue: { stringValue: "Nouveau" } });
  expect(append.rows[0].values[9]).toEqual({ userEnteredValue: { stringValue: "" } });
  expect(append.rows[0].values[10]).toEqual({ userEnteredValue: { stringValue: "Violet" } });
  expect(append.rows[0].values[11]).toEqual({ userEnteredValue: { numberValue: 44362 } });
});