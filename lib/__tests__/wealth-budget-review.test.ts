import { describe, expect, it } from "vitest";

import { BUDGET_DEFAULTS, budgetPlanCsv, normalizeBudgetState } from "@/app/wealth/calculators/budget/plan";
import { budgetDollars } from "@/lib/wealth/math";

function amounts(csv: string, column: number) {
  return csv.split("\r\n").slice(1, 5).map((row) => Number(row.split(",")[column].replaceAll('"', "")));
}

describe("budget review", () => {
  it("exports $3 without rounding the buckets up to $4", () => {
    const csv = budgetPlanCsv({ ...BUDGET_DEFAULTS, income: 3 });
    expect(amounts(csv, 2)).toEqual([1.5, 0.9, 0.6, 3]);
    expect(amounts(csv, 3)).toEqual([18, 10.8, 7.2, 36]);
  });

  it("keeps rounded cents reconciled for biweekly and very small pay", () => {
    for (const income of [0.01, 1.01, 1234.56]) {
      const csv = budgetPlanCsv({ ...BUDGET_DEFAULTS, income, period: "paycheck", needs: 33, wants: 33, savings: 34 });
      for (const column of [2, 3]) {
        const [needs, wants, savings, total] = amounts(csv, column);
        expect(needs + wants + savings).toBeCloseTo(total, 8);
      }
      expect(amounts(csv, 3)[3]).toBeCloseTo(income * 26, 8);
    }
  });

  it("keeps zero income at zero through the chart and download", () => {
    const state = normalizeBudgetState({ ...BUDGET_DEFAULTS, income: 0 });
    expect(budgetDollars(state.income, state)).toEqual({ needs: 0, wants: 0, savings: 0 });
    expect(amounts(budgetPlanCsv(state), 2)).toEqual([0, 0, 0, 0]);
  });

  it("rejects formula text and broken shares in saved budgets", () => {
    const broken = { income: 3000, period: "paycheck", needs: '=HYPERLINK("https://example.com")', wants: 500, savings: -400 };
    expect(normalizeBudgetState(broken)).toEqual({ ...BUDGET_DEFAULTS, period: "paycheck" });
    expect(budgetPlanCsv(broken)).not.toContain("HYPERLINK");
    expect(normalizeBudgetState({ ...BUDGET_DEFAULTS, needs: 20 }).needs).toBe(50);
    expect(normalizeBudgetState(null)).toEqual(BUDGET_DEFAULTS);
  });
});
