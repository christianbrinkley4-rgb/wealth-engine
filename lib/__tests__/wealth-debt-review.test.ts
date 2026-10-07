import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { DebtPayoff } from "@/app/wealth/calculators/debt-payoff/DebtPayoff";
import { type Debt, simulatePayoff } from "@/lib/wealth/math";

const stored = vi.hoisted(() => ({ state: { extra: 0, debts: [] as Debt[] } }));
vi.mock("@/app/wealth/ui/hooks", () => ({
  useMarkExplored: () => undefined,
  usePersistentState: () => [stored.state, () => undefined],
  useTween: (value: number) => value,
}));
// Vitest's standalone TSX transform uses the classic React runtime.
vi.stubGlobal("React", React);

const loan = (patch: Partial<Debt> = {}): Debt => ({
  id: "one", name: "Loan", balance: 1000, apr: 12, minPayment: 600, ...patch,
});

describe("debt payoff review", () => {
  it("matches two hand-worked months and charges interest before each payment", () => {
    // $1,000 + $10 - $600 = $410, then $410 + $4.10 = $414.10.
    const result = simulatePayoff([loan()], 0, "avalanche");
    expect(result.months).toBe(2);
    expect(result.timeline).toEqual([1000, 410, 0]);
    expect(result.totalInterest).toBeCloseTo(14.1, 8);
    expect(result.totalPaid).toBeCloseTo(1014.1, 8);
  });

  it("rolls unused minimums into another debt within the same month", () => {
    const result = simulatePayoff([
      loan({ balance: 50, apr: 0, minPayment: 100 }),
      loan({ id: "two", name: "Second", balance: 200, apr: 0, minPayment: 100 }),
    ], 0, "snowball");
    expect(result.timeline).toEqual([250, 50, 0]);
    expect(result.totalPaid).toBe(250);
    expect(result.order).toEqual(["Loan", "Second"]);
  });

  it("includes separate debts with the same name in the payoff order", () => {
    const result = simulatePayoff([
      loan({ balance: 50, apr: 0, minPayment: 50 }),
      loan({ id: "two", balance: 100, apr: 0, minPayment: 50 }),
    ], 0, "snowball");
    expect(result.order).toEqual(["Loan", "Loan"]);
    expect(result.timeline.at(-1)).toBe(0);
  });

  it("handles empty debts, zero balances, and zero payments", () => {
    expect(simulatePayoff([], 100, "avalanche")).toMatchObject({ months: 0, stuck: false, timeline: [0] });
    expect(simulatePayoff([loan({ balance: 0 })], 0, "snowball")).toMatchObject({ months: 0, totalPaid: 0 });
    expect(simulatePayoff([loan({ apr: 0, minPayment: 0 })], 0, "avalanche")).toMatchObject({ stuck: true, totalPaid: 0, totalInterest: 0 });
  });

  it("keeps interest-only payments from claiming a payoff", () => {
    const result = simulatePayoff([loan({ minPayment: 10 })], 0, "avalanche");
    expect(result.stuck).toBe(true);
    expect(result.timeline.at(-1)).toBe(1000);
    expect(result.totalPaid).toBe(6000);
    expect(result.totalInterest).toBe(6000);
  });

  it("labels the 50-year cap honestly when a 0% debt would finish in month 601", () => {
    stored.state = { extra: 0, debts: [loan({ balance: 601, apr: 0, minPayment: 1 })] };
    const result = simulatePayoff(stored.state.debts, 0, "avalanche");
    expect(result.timeline.at(-1)).toBe(1);
    const html = renderToStaticMarkup(React.createElement(DebtPayoff));
    expect(html).toContain("Over 50 yr");
    expect(html).toContain("still has $1 owed after 50 years");
    expect(html).not.toContain("Never");
    expect(html).not.toContain("pays off in 600 months");
    expect(html).not.toContain("never get ahead of the interest");
  });
});
