import { describe, expect, it } from "vitest";

import { normalizeRothState, ROTH_DEFAULTS } from "@/app/wealth/calculators/roth-vs-traditional/state";
import { rothVsTraditional } from "@/lib/wealth/math";

describe("Roth comparison review", () => {
  it("matches three hand-worked year-end deposits at equal pre-tax cost", () => {
    // Traditional: year 1 $1,000; year 2 $2,100; year 3 $3,310.
    // Roth: year 1 $900; year 2 $1,890; year 3 $2,979.
    const result = rothVsTraditional({ annualPreTax: 1000, years: 3, annualReturn: 10, taxNow: 10, taxLater: 20 });
    expect(result.traditionalBefore).toBeCloseTo(3310, 8);
    expect(result.traditionalTax).toBeCloseTo(662, 8);
    expect(result.traditional).toBeCloseTo(2648, 8);
    expect(result.roth).toBeCloseTo(2979, 8);
    expect(result.rothTaxPaidUpFront).toBe(300);
    expect(result.difference).toBeCloseTo(331, 8);
  });

  it("taxes contributions once when growth is zero", () => {
    const result = rothVsTraditional({ annualPreTax: 1000, years: 3, annualReturn: 0, taxNow: 20, taxLater: 10 });
    expect(result.roth).toBe(2400);
    expect(result.traditional).toBe(2700);
    expect(result.difference).toBe(-300);
    expect(result.winner).toBe("traditional");
  });

  it("has no balance or tax without a contribution period", () => {
    const result = rothVsTraditional({ annualPreTax: 1000, years: 0, annualReturn: 7, taxNow: 10, taxLater: 20 });
    expect(result.roth).toBe(0);
    expect(result.traditional).toBe(0);
    expect(result.rothTaxPaidUpFront).toBe(0);
    expect(result.winner).toBe("tie");
  });

  it("keeps equal tax rates equal across both slider extremes", () => {
    for (const tax of [0, 45]) {
      for (const annualReturn of [0, 12]) {
        const result = rothVsTraditional({ annualPreTax: 24500, years: 50, annualReturn, taxNow: tax, taxLater: tax });
        expect(result.roth).toBeCloseTo(result.traditional, 6);
        expect(result.winner).toBe("tie");
      }
    }
  });

  it("recovers corrupted saved inputs before calculating or drawing sliders", () => {
    const state = normalizeRothState({ amount: "3000", years: 1e100, rate: null, taxNow: -100, taxLater: 200 });
    const result = rothVsTraditional({ annualPreTax: state.amount, years: state.years, annualReturn: state.rate, taxNow: state.taxNow, taxLater: state.taxLater });
    expect(state.amount).toBe(ROTH_DEFAULTS.amount);
    expect(state.rate).toBe(ROTH_DEFAULTS.rate);
    expect(state.years).toBe(50);
    expect(state.taxNow).toBe(0);
    expect(state.taxLater).toBe(45);
    expect(Number.isFinite(result.roth)).toBe(true);
    expect(result.roth).toBeGreaterThan(result.traditional);
    expect(normalizeRothState(null)).toEqual(ROTH_DEFAULTS);
  });
});
