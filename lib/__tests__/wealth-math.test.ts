import { describe, expect, it } from "vitest";

import {
  budgetDollars,
  catchUpMonthly,
  CLASSIC_SPLIT,
  finalPoint,
  growthSeries,
  money,
  moneyShort,
  monthsLabel,
  rebalance,
  rothVsTraditional,
  simulatePayoff,
  startLaterCost,
} from "@/lib/wealth/math";

describe("growthSeries", () => {
  it("is just the deposits at a 0% return", () => {
    const end = finalPoint(growthSeries({ start: 500, monthly: 100, years: 10, annualReturn: 0 }));
    expect(end.balance).toBe(500 + 100 * 120);
    expect(end.contributed).toBe(end.balance);
  });

  it("matches the future value of an annuity formula", () => {
    const rate = 0.07 / 12;
    const months = 40 * 12;
    const expected = (250 * (Math.pow(1 + rate, months) - 1)) / rate;
    const end = finalPoint(growthSeries({ start: 0, monthly: 250, years: 40, annualReturn: 7 }));
    expect(end.balance).toBeCloseTo(expected, 4);
    expect(end.contributed).toBe(250 * months);
  });

  it("grows a lump sum with monthly compounding", () => {
    const end = finalPoint(growthSeries({ start: 1000, monthly: 0, years: 1, annualReturn: 12 }));
    expect(end.balance).toBeCloseTo(1000 * Math.pow(1.01, 12), 6);
  });

  it("returns one point per year plus the start", () => {
    expect(growthSeries({ start: 0, monthly: 1, years: 30, annualReturn: 5 })).toHaveLength(31);
  });
});

describe("startLaterCost", () => {
  const result = startLaterCost({ monthly: 200, annualReturn: 7, earlyAge: 22, lateAge: 32, endAge: 65 });

  it("splits the gap into deposits not made and growth not earned", () => {
    expect(result.extraDeposited).toBe(200 * 12 * 10);
    expect(result.gap).toBeCloseTo(result.extraDeposited + result.growthLost, 6);
    expect(result.growthLost).toBeGreaterThan(result.extraDeposited);
  });

  it("gives a catch-up amount that actually catches up", () => {
    const monthly = catchUpMonthly(result.earlyBalance, 33, 7);
    const end = finalPoint(growthSeries({ start: 0, monthly, years: 33, annualReturn: 7 }));
    expect(end.balance).toBeCloseTo(result.earlyBalance, 2);
    expect(monthly).toBeGreaterThan(200);
  });
});

describe("budget split", () => {
  it("always adds up to 100", () => {
    for (const key of ["needs", "wants", "savings"] as const) {
      for (let value = 0; value <= 100; value += 7) {
        const next = rebalance(CLASSIC_SPLIT, key, value);
        expect(next.needs + next.wants + next.savings).toBe(100);
        expect(Math.min(next.needs, next.wants, next.savings)).toBeGreaterThanOrEqual(0);
        expect(next[key]).toBe(value);
      }
    }
  });

  it("splits what is left evenly when the other two are at zero", () => {
    expect(rebalance({ needs: 100, wants: 0, savings: 0 }, "needs", 60)).toEqual({
      needs: 60,
      wants: 20,
      savings: 20,
    });
  });

  it("turns shares into dollars", () => {
    expect(budgetDollars(3000, CLASSIC_SPLIT)).toEqual({ needs: 1500, wants: 900, savings: 600 });
  });
});

describe("simulatePayoff", () => {
  const debts = [
    { id: "a", name: "Card", balance: 2400, apr: 24, minPayment: 60 },
    { id: "b", name: "Car", balance: 9000, apr: 7.5, minPayment: 220 },
    { id: "c", name: "Store", balance: 600, apr: 28, minPayment: 30 },
  ];

  it("pays a 0% debt in balance divided by payment months", () => {
    const result = simulatePayoff([{ id: "x", name: "Loan", balance: 1200, apr: 0, minPayment: 100 }], 0, "avalanche");
    expect(result.months).toBe(12);
    expect(result.totalInterest).toBe(0);
    expect(result.totalPaid).toBeCloseTo(1200, 6);
  });

  it("never costs more interest with avalanche than snowball", () => {
    const avalanche = simulatePayoff(debts, 100, "avalanche");
    const snowball = simulatePayoff(debts, 100, "snowball");
    expect(avalanche.totalInterest).toBeLessThanOrEqual(snowball.totalInterest + 0.01);
    expect(avalanche.stuck).toBe(false);
    expect(snowball.stuck).toBe(false);
  });

  it("targets the highest rate or the smallest balance first", () => {
    const two = [
      { id: "a", name: "Big high rate", balance: 5000, apr: 25, minPayment: 100 },
      { id: "b", name: "Small low rate", balance: 500, apr: 5, minPayment: 25 },
    ];
    expect(simulatePayoff(two, 300, "snowball").order[0]).toBe("Small low rate");
    const avalanche = simulatePayoff(two, 300, "avalanche");
    const snowball = simulatePayoff(two, 300, "snowball");
    expect(avalanche.totalInterest).toBeLessThan(snowball.totalInterest);
  });

  it("pays what was owed plus interest, and ends at zero", () => {
    const result = simulatePayoff(debts, 100, "avalanche");
    expect(result.totalPaid).toBeCloseTo(12000 + result.totalInterest, 2);
    expect(result.timeline[0]).toBe(12000);
    expect(result.timeline[result.timeline.length - 1]).toBeCloseTo(0, 2);
    expect(result.order).toHaveLength(3);
  });

  it("finishes sooner with extra money", () => {
    expect(simulatePayoff(debts, 200, "avalanche").months).toBeLessThan(simulatePayoff(debts, 0, "avalanche").months);
  });

  it("flags payments that never beat the interest", () => {
    const result = simulatePayoff([{ id: "x", name: "Card", balance: 10000, apr: 30, minPayment: 50 }], 0, "avalanche");
    expect(result.stuck).toBe(true);
  });

  it("handles an empty list", () => {
    const result = simulatePayoff([], 100, "snowball");
    expect(result.months).toBe(0);
    expect(result.timeline).toEqual([0]);
  });
});

describe("rothVsTraditional", () => {
  const base = { annualPreTax: 3000, years: 40, annualReturn: 7 };

  it("ties when the tax rate is the same now and later", () => {
    const result = rothVsTraditional({ ...base, taxNow: 22, taxLater: 22 });
    expect(result.roth).toBeCloseTo(result.traditional, 6);
    expect(result.winner).toBe("tie");
  });

  it("favors Roth when the rate is lower now", () => {
    expect(rothVsTraditional({ ...base, taxNow: 12, taxLater: 22 }).winner).toBe("roth");
  });

  it("favors traditional when the rate is higher now", () => {
    expect(rothVsTraditional({ ...base, taxNow: 24, taxLater: 12 }).winner).toBe("traditional");
  });

  it("handles a 0% return", () => {
    const result = rothVsTraditional({ ...base, annualReturn: 0, taxNow: 10, taxLater: 10 });
    expect(result.traditionalBefore).toBe(3000 * 40);
    expect(result.roth).toBeCloseTo(3000 * 40 * 0.9, 6);
  });
});

describe("formatting", () => {
  it("formats money for readouts and axes", () => {
    expect(money(1234.56)).toBe("$1,235");
    expect(money(Number.NaN)).toBe("$0");
    expect(moneyShort(1_250_000)).toBe("$1.3M");
    expect(moneyShort(48_200)).toBe("$48K");
    expect(moneyShort(900)).toBe("$900");
  });

  it("labels months", () => {
    expect(monthsLabel(7)).toBe("7 mo");
    expect(monthsLabel(24)).toBe("2 yr");
    expect(monthsLabel(29)).toBe("2 yr 5 mo");
  });
});
