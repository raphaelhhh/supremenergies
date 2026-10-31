// Append explicit cells instead of values:append's inferred table, which can
// start in another column when the team adds standalone notes.
export function leadSheetAppendRequest(sheetId: number, row: (string | number)[]) {
  return {
    requests: [{
      appendCells: {
        sheetId,
        rows: [{ values: row.map(value => ({
          userEnteredValue: typeof value === "number"
            ? { numberValue: value }
            : { stringValue: value },
        })) }],
        fields: "userEnteredValue",
      },
    }],
  };
}