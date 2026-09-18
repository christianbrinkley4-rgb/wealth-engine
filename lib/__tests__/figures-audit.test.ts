import { describe, expect, it } from "vitest";
import { calculatePartBPremium, STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { calculateRothWindow } from "@/lib/rothWindow";

describe("audit: figures against the CMS 2026 fact sheet", () => {
  it("prices every individual boundary exactly as CMS does", () => {
    const at = (income: number) => calculatePartBPremium(income, "individual").partBPremium;
    expect(at(109000)).toBe(202.9);
    expect(at(109000.01)).toBe(284.1);
    expect(at(137000)).toBe(284.1);
    expect(at(137000.01)).toBe(405.8);
    expect(at(171000)).toBe(405.8);
    expect(at(171000.01)).toBe(527.5);
    expect(at(205000)).toBe(527.5);
    expect(at(205000.01)).toBe(649.2);
    expect(at(499999)).toBe(649.2);
    expect(at(500000)).toBe(689.9);
    expect(at(1000000)).toBe(689.9);
  });

  it("prices every joint boundary exactly as CMS does", () => {
    const at = (income: number) => calculatePartBPremium(income, "married_jointly").partBPremium;
    expect(at(218000)).toBe(202.9);
    expect(at(218000.01)).toBe(284.1);
    expect(at(274000)).toBe(284.1);
    expect(at(274000.01)).toBe(405.8);
    expect(at(342000)).toBe(405.8);
    expect(at(342000.01)).toBe(527.5);
    expect(at(410000)).toBe(527.5);
    expect(at(410000.01)).toBe(649.2);
    expect(at(749999)).toBe(649.2);
    expect(at(750000)).toBe(689.9);
  });

  it("keeps the surcharge equal to the premium above standard", () => {
    for (const income of [120000, 150000, 190000, 300000, 600000]) {
      const b = calculatePartBPremium(income, "individual");
      expect(Math.round((b.partBPremium - STANDARD_BASE_PREMIUM_2026) * 100) / 100).toBe(
        b.irmaaSurcharge,
      );
    }
  });

  it("reports Roth headroom that stops one cent short of the next bracket", () => {
    const result = calculateRothWindow(100000, "individual");
    expect(result.headroomToNextBracket).not.toBeNull();
    const ceiling = 100000 + (result.headroomToNextBracket ?? 0);
    expect(calculatePartBPremium(ceiling, "individual").partBPremium).toBe(202.9);
    expect(calculatePartBPremium(ceiling + 0.01, "individual").partBPremium).toBe(284.1);
  });

  it("prices one bracket crossing as twelve months of the difference", () => {
    const result = calculateRothWindow(100000, "individual");
    expect(result.oneBracketCrossingAnnualCost).toBeCloseTo(81.2 * 12, 2);
    expect(result.oneBracketCrossingAnnualCostMarried).toBeCloseTo(81.2 * 24, 2);
  });
});
