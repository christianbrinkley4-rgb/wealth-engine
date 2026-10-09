/**
 * Tests for the Honestly Calculator risk math (lib/wealth/risk).
 *
 * The historical constants are pinned to NYU Stern's public returns table
 * (Damodaran, "Historical Returns on Stocks, Bonds and Bills: 1928-2024",
 * updated January 5, 2026). If the source table ever revises, these pins
 * fail loudly instead of drifting silently. The copy lint enforces the
 * house rules on every visitor-facing sentence: 25 words or fewer, no em
 * or en dashes, human voice.
 */

import { describe, expect, it } from "vitest";

import { finalPoint, growthSeries, money, simulatePayoff } from "../wealth/math";
import {
  debtRiskScenarios,
  retirementRiskLine,
  retirementRiskScenarios,
  shockYearBalance,
  SP_2008_RETURN_PCT,
  SP_DATA_SOURCE,
  SP_NEGATIVE_YEARS,
  SP_WORST_DECADE_ANNUAL_PCT,
  SP_WORST_DECADE_LABEL,
  SP_YEAR_COUNT,
  type RiskScenario,
} from "../wealth/risk";

/** Split on sentence-ending punctuation followed by whitespace. */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function lintCopy(scenarios: RiskScenario[], extra: string[] = []) {
  const texts = [...scenarios.flatMap((s) => [s.title, s.body]), ...extra];
  for (const text of texts) {
    expect(text, `em/en dash in: ${text}`).not.toMatch(/[—–]/);
    for (const sentence of sentences(text)) {
      const words = sentence.split(/\s+/).length;
      expect(words, `over 25 words: ${sentence}`).toBeLessThanOrEqual(25);
    }
  }
}

describe("verified historical constants", () => {
  it("pins the NYU Stern figures", () => {
    expect(SP_NEGATIVE_YEARS).toBe(26);
    expect(SP_YEAR_COUNT).toBe(98);
    expect(SP_2008_RETURN_PCT).toBe(-36.55);
    expect(SP_WORST_DECADE_LABEL).toBe("1929-1938");
    expect(SP_WORST_DECADE_ANNUAL_PCT).toBe(-1.67);
    expect(SP_DATA_SOURCE.url).toContain("stern.nyu.edu");
  });

  it("applies a single shock year to a balance", () => {
    expect(shockYearBalance(100000, SP_2008_RETURN_PCT)).toBeCloseTo(63450, 0);
    expect(shockYearBalance(0, SP_2008_RETURN_PCT)).toBe(0);
  });
});

describe("retirementRiskScenarios", () => {
  const input = { start: 5000, monthly: 500, years: 44, annualReturn: 7 };
  const base = finalPoint(growthSeries(input)).balance;

  it("returns the three downside scenarios with sources", () => {
    const scenarios = retirementRiskScenarios(input);
    expect(scenarios).toHaveLength(3);
    expect(scenarios.map((s) => s.title)).toEqual([
      "A bad decade",
      "A 2008 in your last year",
      "How often the market loses",
    ]);
    for (const s of scenarios) {
      expect(s.sourceLabel).toBe(SP_DATA_SOURCE.label);
      expect(s.sourceUrl).toBe(SP_DATA_SOURCE.url);
    }
  });

  it("shows the bad decade below the base case", () => {
    const [badDecade] = retirementRiskScenarios(input);
    const badBalance = finalPoint(
      growthSeries({ ...input, annualReturn: SP_WORST_DECADE_ANNUAL_PCT }),
    ).balance;
    expect(badBalance).toBeLessThan(base);
    expect(badDecade.body).toContain(money(badBalance));
    expect(badDecade.body).toContain(money(base));
  });

  it("shows the 2008 shock as a single-year hit to the base number", () => {
    const [, shock] = retirementRiskScenarios(input);
    const shocked = shockYearBalance(base, SP_2008_RETURN_PCT);
    expect(shock.body).toContain(money(shocked));
    expect(shock.body).toContain("36.55%");
  });

  it("passes the copy lint", () => {
    lintCopy(retirementRiskScenarios(input), [retirementRiskLine()]);
  });
});

describe("retirementRiskLine", () => {
  it("uses the verified count, not the brief's guess", () => {
    expect(retirementRiskLine()).toBe("But in 26 of the last 98 years, the market lost money.");
  });
});

describe("debtRiskScenarios", () => {
  const debts = [
    { id: "1", name: "Credit card", balance: 4500, apr: 24.99, minPayment: 90 },
    { id: "2", name: "Auto loan", balance: 12000, apr: 7.5, minPayment: 260 },
  ];

  it("builds scenarios from the visitor's own simulation", () => {
    const { scenarios, riskLine } = debtRiskScenarios({ debts, extra: 200, strategy: "avalanche" });
    expect(scenarios).toHaveLength(3);
    const plan = simulatePayoff(debts, 200, "avalanche");
    const minOnly = simulatePayoff(debts, 0, "avalanche");
    expect(minOnly.months).toBeGreaterThanOrEqual(plan.months);
    expect(scenarios[0].body).toContain(money(minOnly.totalInterest));
    expect(riskLine).toContain("Minimums only:");
    expect(riskLine).toContain(money(minOnly.totalInterest));
  });

  it("shows halving the extra payment pushing the date out", () => {
    const { scenarios } = debtRiskScenarios({ debts, extra: 200, strategy: "avalanche" });
    const half = simulatePayoff(debts, 100, "avalanche");
    const plan = simulatePayoff(debts, 200, "avalanche");
    expect(half.totalInterest).toBeGreaterThanOrEqual(plan.totalInterest);
    expect(scenarios[1].body).toContain(money(half.totalInterest));
  });

  it("drops the halving scenario when there is no extra payment", () => {
    const { scenarios } = debtRiskScenarios({ debts, extra: 0, strategy: "avalanche" });
    expect(scenarios).toHaveLength(2);
    expect(scenarios.map((s) => s.title)).not.toContain("Money gets tight");
  });

  it("never invents behavior statistics", () => {
    const { scenarios, riskLine } = debtRiskScenarios({ debts, extra: 200, strategy: "snowball" });
    const all = scenarios.map((s) => s.body).join(" ") + " " + riskLine;
    expect(all).not.toMatch(/\d+\s*%/);
    expect(all.toLowerCase()).not.toContain("studies show");
  });

  it("passes the copy lint", () => {
    const { scenarios, riskLine } = debtRiskScenarios({ debts, extra: 200, strategy: "avalanche" });
    lintCopy(scenarios, [riskLine]);
  });
});
