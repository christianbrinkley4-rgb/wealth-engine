import { describe, expect, it } from "vitest";

import {
  bracketTop,
  computeLadder,
  rmdAge,
  type LadderInput,
} from "./math";

/**
 * Hand-computed scenario used across these tests.
 *
 * Born 1966 (age 60), so RMD age is 75 and there are 15 conversion years.
 * Single, current bracket 22% (top $105,700), other taxable income $80,000,
 * so yearly headroom is $105,700 - $80,000 = $25,700.
 * Pre-tax balance $100,000, growth 7%.
 *
 * Year 0: 100,000 x 1.07 = 107,000; convert min(107,000, 25,700) = 25,700;
 *   tax = 25,700 x 0.22 = 5,654; left 81,300.
 * Year 1: 81,300 x 1.07 = 86,991; convert 25,700; tax 5,654; left 61,291.
 * Year 2: 61,291 x 1.07 = 65,581.37; convert 25,700; tax 5,654; left 39,881.37.
 */
const BASE_INPUT: LadderInput = {
  birthYear: 1966,
  filingStatus: "single",
  baselineIncome: 80000,
  preTaxBalance: 100000,
  currentRate: 0.22,
  retirementRate: 0.22,
  growthRate: 0.07,
};

describe("rmdAge", () => {
  it("is 73 for 1951-1959 births (SECURE 2.0)", () => {
    expect(rmdAge(1951)).toBe(73);
    expect(rmdAge(1955)).toBe(73);
    expect(rmdAge(1959)).toBe(73);
  });

  it("is 75 for 1960+ births (SECURE 2.0)", () => {
    expect(rmdAge(1960)).toBe(75);
    expect(rmdAge(1965)).toBe(75);
    expect(rmdAge(2004)).toBe(75);
  });
});

describe("bracketTop", () => {
  it("returns the 2026 bracket top for the rate and filing status", () => {
    expect(bracketTop("single", 0.22)).toBe(105700);
    expect(bracketTop("single", 0.12)).toBe(50400);
    expect(bracketTop("joint", 0.24)).toBe(403550);
    expect(bracketTop("joint", 0.1)).toBe(24800);
  });

  it("is unbounded for the 37% top bracket", () => {
    expect(bracketTop("single", 0.37)).toBe(Infinity);
  });
});

describe("computeLadder", () => {
  it("fills the bracket without crossing into the next one", () => {
    const result = computeLadder(BASE_INPUT);
    expect(result.yearsUntilRmd).toBe(15);
    expect(result.rmdAgeValue).toBe(75);

    const y0 = result.years[0];
    expect(y0.age).toBe(60);
    expect(y0.conversion).toBeCloseTo(25700, 2);
    expect(y0.taxOnConversion).toBeCloseTo(5654, 2);
    expect(y0.balanceBefore).toBeCloseTo(107000, 2);
    expect(y0.balanceAfter).toBeCloseTo(81300, 2);
    expect(y0.cumulativeConverted).toBeCloseTo(25700, 2);

    const y1 = result.years[1];
    expect(y1.conversion).toBeCloseTo(25700, 2);
    expect(y1.balanceBefore).toBeCloseTo(86991, 2);
    expect(y1.balanceAfter).toBeCloseTo(61291, 2);

    const y2 = result.years[2];
    expect(y2.conversion).toBeCloseTo(25700, 2);
    expect(y2.balanceBefore).toBeCloseTo(65581.37, 2);
    expect(y2.balanceAfter).toBeCloseTo(39881.37, 2);

    // Conversions never exceed the $25,700 headroom in any year.
    for (const y of result.years) {
      expect(y.conversion).toBeLessThanOrEqual(25700.001);
    }
  });

  it("matches the hand-computed no-conversion baseline", () => {
    const result = computeLadder(BASE_INPUT);
    // 100,000 x 1.07^15 = 275,903.15; tax at the 22% retirement rate.
    const expectedBalance = 100000 * Math.pow(1.07, 15);
    expect(result.noConversionBalanceSeries[14]).toBeCloseTo(expectedBalance, 2);
    expect(result.taxWithoutConversions).toBeCloseTo(expectedBalance * 0.22, 2);
    // Lifetime savings is the simple difference of the two tax totals.
    expect(result.lifetimeSavings).toBeCloseTo(
      result.taxWithoutConversions - result.taxWithConversions,
      2,
    );
  });

  it("shows positive savings when the retirement bracket is lower", () => {
    const result = computeLadder({ ...BASE_INPUT, retirementRate: 0.12 });
    expect(result.notBeneficial).toBe(false);
    expect(result.lifetimeSavings).toBeGreaterThan(0);
    expect(result.taxWithConversions).toBeLessThan(result.taxWithoutConversions);
  });

  it("flags conversions as likely not beneficial when the retirement rate is higher", () => {
    const higher = computeLadder({ ...BASE_INPUT, retirementRate: 0.32 });
    expect(higher.notBeneficial).toBe(true);
    const equal = computeLadder({ ...BASE_INPUT, retirementRate: 0.22 });
    expect(equal.notBeneficial).toBe(true);
  });

  it("exhausts a small balance early and converts nothing after", () => {
    const result = computeLadder({ ...BASE_INPUT, preTaxBalance: 10000 });
    // 10,000 x 1.07 = 10,700 < 25,700 headroom: the whole thing converts in year 0.
    expect(result.years[0].conversion).toBeCloseTo(10700, 2);
    expect(result.years[0].balanceAfter).toBeCloseTo(0, 2);
    expect(result.exhaustedAtAge).toBe(60);
    expect(result.years[1].conversion).toBe(0);
    expect(result.totalConverted).toBeCloseTo(10700, 2);
    expect(result.remainingAtRmd).toBeCloseTo(0, 2);
  });

  it("converts nothing when other income already fills the bracket", () => {
    const result = computeLadder({ ...BASE_INPUT, baselineIncome: 200000 });
    for (const y of result.years) {
      expect(y.conversion).toBe(0);
    }
    expect(result.totalConverted).toBe(0);
    expect(result.lifetimeSavings).toBeCloseTo(0, 2);
  });

  it("shows a notice and no ladder when already past RMD age", () => {
    const result = computeLadder({ ...BASE_INPUT, birthYear: 1945 });
    expect(result.pastRmd).toBe(true);
    expect(result.years).toHaveLength(0);
    expect(result.yearsUntilRmd).toBe(0);
  });

  it("uses joint bracket tops for joint filers", () => {
    // Joint 22% top is $211,400; baseline $180,000 leaves $31,400 of headroom.
    const result = computeLadder({
      ...BASE_INPUT,
      filingStatus: "joint",
      baselineIncome: 180000,
    });
    expect(result.years[0].conversion).toBeCloseTo(31400, 2);
    expect(result.years[0].taxOnConversion).toBeCloseTo(6908, 2);
  });

  it("handles a zero balance without breaking", () => {
    const result = computeLadder({ ...BASE_INPUT, preTaxBalance: 0 });
    expect(result.totalConverted).toBe(0);
    expect(result.taxWithConversions).toBe(0);
    expect(result.taxWithoutConversions).toBe(0);
    expect(result.lifetimeSavings).toBe(0);
  });
});
