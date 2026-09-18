import { describe, expect, it } from "vitest";

import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { monthsBetween, partBPenalty } from "@/lib/partBPenalty";

describe("months between eligibility and coverage", () => {
  it("counts whole months across a year boundary", () => {
    expect(monthsBetween({ month: 11, year: 2024 }, { month: 2, year: 2025 })).toBe(3);
    expect(monthsBetween({ month: 4, year: 2020 }, { month: 4, year: 2026 })).toBe(72);
  });

  it("is zero or negative when coverage was not late", () => {
    expect(monthsBetween({ month: 4, year: 2026 }, { month: 4, year: 2026 })).toBe(0);
    expect(monthsBetween({ month: 6, year: 2026 }, { month: 1, year: 2026 })).toBe(-5);
  });
});

describe("the penalty itself", () => {
  it("charges nothing until a full twelve months have passed", () => {
    for (const months of [0, 1, 6, 11]) {
      const result = partBPenalty(months);
      expect(result.periods, `${months} months`).toBe(0);
      expect(result.percent).toBe(0);
      expect(result.monthlyPenalty).toBe(0);
    }
  });

  it("counts only complete periods, never part of one", () => {
    expect(partBPenalty(12).percent).toBe(10);
    expect(partBPenalty(23).percent).toBe(10);
    expect(partBPenalty(24).percent).toBe(20);
    expect(partBPenalty(35).percent).toBe(20);
    expect(partBPenalty(60).percent).toBe(50);
  });

  it("applies the percentage to the standard premium, rounded as CMS rounds it", () => {
    // 2026 standard premium is $202.90, so one period is $20.29 → $20.30.
    const one = partBPenalty(12, STANDARD_BASE_PREMIUM_2026);
    expect(one.monthlyPenalty).toBe(20.3);
    expect(one.annualPenalty).toBe(243.6);

    const three = partBPenalty(36, STANDARD_BASE_PREMIUM_2026);
    expect(three.percent).toBe(30);
    expect(three.monthlyPenalty).toBe(60.9);
  });

  it("shows what carrying it for twenty years comes to", () => {
    const result = partBPenalty(24, STANDARD_BASE_PREMIUM_2026);
    expect(result.monthlyPenalty).toBe(40.6);
    expect(result.twentyYearPenalty).toBe(9744);
  });

  it("refuses to invent a penalty from nonsense input", () => {
    for (const bad of [-10, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(partBPenalty(bad).monthlyPenalty).toBe(0);
    }
    // A partial month is not a month.
    expect(partBPenalty(11.9).periods).toBe(0);
  });
});
