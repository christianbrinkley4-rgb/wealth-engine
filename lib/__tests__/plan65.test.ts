import { describe, expect, it } from "vitest";

import { calculatePlan65, partBLatePenalty } from "@/lib/plan65";

const base = {
  age: 60,
  filingStatus: "married_jointly" as const,
  magi: 180_000,
  traditionalBalance: 300_000,
};

describe("calculatePlan65", () => {
  it("puts a joint filer under $224,000 in the standard tier with real headroom", () => {
    const r = calculatePlan65(base);
    expect(r.currentBracket.bracketName).toBe("Standard (No Surcharge)");
    // The standard tier's ceiling is inclusive, $224,000 exactly is still
    // standard, so $180,000 leaves precisely $44,000 of room.
    expect(r.headroom).toBe(44_000);
    expect(r.atTopBracket).toBe(false);
  });

  it("prices converting the whole balance in one year against the CMS schedule", () => {
    const r = calculatePlan65(base);
    // $180k + $300k = $480k, which is Tier 4 for a joint filer.
    expect(r.allAtOnce.magi).toBe(480_000);
    expect(r.allAtOnce.bracket.bracketName).toBe("Tier 4 IRMAA");
    // ($670.00 - $209.40) * 12 = $5,527.20 per person.
    expect(r.allAtOnce.annualSurchargePerPerson).toBeCloseTo(5_527.2, 2);
    // Both spouses pay it.
    expect(r.allAtOnce.annualSurchargeHousehold).toBeCloseTo(11_054.4, 2);
    expect(r.allAtOnce.tiersCrossed).toBe(4);
  });

  it("charges a single filer once rather than twice", () => {
    const r = calculatePlan65({ ...base, filingStatus: "individual", magi: 90_000 });
    expect(r.allAtOnce.annualSurchargeHousehold).toBe(r.allAtOnce.annualSurchargePerPerson);
  });

  it("spreads the conversion into the headroom and reports the years needed", () => {
    const r = calculatePlan65(base);
    expect(r.spread.perYear).toBe(44_000);
    // 300,000 / 44,000 = 6.82, so 7 years.
    expect(r.spread.yearsNeeded).toBe(7);
    expect(r.spread.annualSurchargeHousehold).toBe(0);
    expect(r.spread.impossible).toBe(false);
  });

  it("reports the avoidable surcharge as the difference the timing makes", () => {
    const r = calculatePlan65(base);
    expect(r.avoidableSurcharge).toBeCloseTo(r.allAtOnce.annualSurchargeHousehold, 2);
  });

  it("claims nothing is avoidable when there is no headroom to spread into", () => {
    // Already inside the top tier: spreading changes nothing.
    const r = calculatePlan65({ ...base, magi: 800_000 });
    expect(r.atTopBracket).toBe(true);
    expect(r.spread.impossible).toBe(true);
    expect(r.avoidableSurcharge).toBe(0);
  });

  it("counts the runway to the year Medicare starts looking at income", () => {
    expect(calculatePlan65({ ...base, age: 58 }).yearsOfClearRunway).toBe(5);
    expect(calculatePlan65({ ...base, age: 62 }).yearsOfClearRunway).toBe(1);
    expect(calculatePlan65({ ...base, age: 63 }).yearsOfClearRunway).toBe(0);
    expect(calculatePlan65({ ...base, age: 63 }).lookbackHasStarted).toBe(true);
    expect(calculatePlan65({ ...base, age: 62 }).lookbackHasStarted).toBe(false);
  });

  it("tracks the Medigap window by age", () => {
    expect(calculatePlan65({ ...base, age: 64 }).medigap).toBe("before");
    expect(calculatePlan65({ ...base, age: 65 }).medigap).toBe("open");
    expect(calculatePlan65({ ...base, age: 67 }).medigap).toBe("closed");
  });

  it("never reports a negative surcharge or negative headroom", () => {
    for (const magi of [0, 50_000, 218_000, 500_000, 2_000_000]) {
      const r = calculatePlan65({ ...base, magi, traditionalBalance: 0 });
      expect(r.headroom).toBeGreaterThanOrEqual(0);
      expect(r.allAtOnce.annualSurchargeHousehold).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("partBLatePenalty", () => {
  it("charges nothing for a partial year", () => {
    expect(partBLatePenalty(11).monthlyPenalty).toBe(0);
    expect(partBLatePenalty(11).fullYearsLate).toBe(0);
  });

  it("charges 10% of the standard premium per full year, for life", () => {
    const two = partBLatePenalty(24);
    expect(two.fullYearsLate).toBe(2);
    // $202.90 * 10% * 2 = $40.58 a month.
    expect(two.monthlyPenalty).toBeCloseTo(40.58, 2);
    expect(two.annualPenalty).toBeCloseTo(486.96, 2);
  });
});
