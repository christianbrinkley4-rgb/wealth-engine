import { describe, expect, it } from "vitest";

import {
  COMPOUND_DEFAULTS,
  END_AGE,
  normalizeCompoundState,
  readCompoundQuery,
} from "@/app/wealth/calculators/compound-interest/settings";
import { catchUpMonthly, finalPoint, growthSeries, startLaterCost } from "@/lib/wealth/math";

describe("compound calculator shared and saved inputs", () => {
  it("reproduces a starting amount above $1 million in a shared result", () => {
    const shared = readCompoundQuery(new URLSearchParams("m=250&y=40&r=7&s=2500000"))!;
    expect(shared.start).toBe(2_500_000);
    const result = finalPoint(growthSeries({ ...shared, annualReturn: shared.rate }));
    const original = finalPoint(growthSeries({ start: 2_500_000, monthly: 250, years: 40, annualReturn: 7 }));
    expect(result).toEqual(original);
  });

  it("keeps the shared year label and calculated timeline in agreement", () => {
    const shared = readCompoundQuery(new URLSearchParams("m=100&y=1.7&r=0"))!;
    const result = finalPoint(growthSeries({ ...shared, annualReturn: shared.rate }));
    expect(result.year).toBe(shared.years);
    expect(result.balance).toBe(100 * 12 * shared.years);
  });

  it("rejects nonfinite, blank and text query values and bounds large finite values", () => {
    expect(readCompoundQuery(new URLSearchParams("m=NaN&y=Infinity&r=%3Cscript%3E&s="))).toEqual(COMPOUND_DEFAULTS);
    const shared = readCompoundQuery(new URLSearchParams("m=-500&y=1e200&r=99&s=1e200"))!;
    expect(shared).toMatchObject({ monthly: 0, years: 50, rate: 12, start: 10_000_000 });
    expect(finalPoint(growthSeries({ ...shared, annualReturn: shared.rate })).balance).toBeGreaterThan(0);
  });

  it("ignores an unrelated query so it does not replace a saved scenario", () => {
    expect(readCompoundQuery(new URLSearchParams("utm_source=example"))).toBeNull();
  });

  it("recovers malformed saved ages before creating or indexing the age chart", () => {
    const saved = normalizeCompoundState({ age: 1e200, wait: "twenty", years: null, start: -100 });
    const lateAge = saved.age + saved.wait;
    const result = startLaterCost({ monthly: saved.monthly, annualReturn: saved.rate, earlyAge: saved.age, lateAge, endAge: END_AGE });
    expect(saved.age).toBe(50);
    expect(lateAge).toBeLessThan(END_AGE);
    expect(result.late).toHaveLength(END_AGE - lateAge + 1);
    expect(normalizeCompoundState(null)).toEqual(COMPOUND_DEFAULTS);
  });

  it("shows the actual wait when age 50 leaves only 14 years before the final saving year", () => {
    const state = normalizeCompoundState({ ...COMPOUND_DEFAULTS, age: 50, wait: 20, rate: 0 });
    const result = startLaterCost({ monthly: state.monthly, annualReturn: state.rate, earlyAge: state.age, lateAge: state.age + state.wait, endAge: END_AGE });
    expect(state.wait).toBe(14);
    expect(result.extraDeposited).toBe(state.wait * 12 * state.monthly);
  });
});

describe("compound zero-return comparison", () => {
  it("attributes the complete age-22 versus age-32 gap to 120 missed deposits", () => {
    const result = startLaterCost({ monthly: 250, annualReturn: 0, earlyAge: 22, lateAge: 32, endAge: 65 });
    expect(result.earlyBalance).toBe(129_000);
    expect(result.lateBalance).toBe(99_000);
    expect(result.gap).toBe(30_000);
    expect(result.growthLost).toBe(0);
    expect(catchUpMonthly(result.earlyBalance, 33, 0)).toBeCloseTo(325.7575757576, 6);
  });
});
