/**
 * The arithmetic behind the /wealth calculators. Pure functions only, so every
 * number a visitor sees can be checked in lib/__tests__/wealth-math.test.ts.
 *
 * Nothing here predicts anything. A return is whatever the visitor typed in.
 */

export type GrowthPoint = { year: number; contributed: number; balance: number };

/** Year-by-year balance with monthly compounding and end-of-month deposits. */
export function growthSeries(input: {
  start: number;
  monthly: number;
  years: number;
  annualReturn: number;
}): GrowthPoint[] {
  const rate = input.annualReturn / 100 / 12;
  const points: GrowthPoint[] = [{ year: 0, contributed: input.start, balance: input.start }];
  let balance = input.start;
  let contributed = input.start;
  for (let year = 1; year <= Math.max(0, Math.floor(input.years)); year += 1) {
    for (let month = 0; month < 12; month += 1) {
      balance = balance * (1 + rate) + input.monthly;
      contributed += input.monthly;
    }
    points.push({ year, contributed, balance });
  }
  return points;
}

export function finalPoint(points: GrowthPoint[]): GrowthPoint {
  return points[points.length - 1];
}

/**
 * Same monthly amount, same finish line, two different start ages. The gap is
 * what the wait costs, split into money not deposited and growth not earned.
 */
export function startLaterCost(input: {
  monthly: number;
  annualReturn: number;
  earlyAge: number;
  lateAge: number;
  endAge: number;
}) {
  const early = growthSeries({
    start: 0,
    monthly: input.monthly,
    years: input.endAge - input.earlyAge,
    annualReturn: input.annualReturn,
  });
  const late = growthSeries({
    start: 0,
    monthly: input.monthly,
    years: input.endAge - input.lateAge,
    annualReturn: input.annualReturn,
  });
  const a = finalPoint(early);
  const b = finalPoint(late);
  return {
    early,
    late,
    earlyBalance: a.balance,
    lateBalance: b.balance,
    gap: a.balance - b.balance,
    extraDeposited: a.contributed - b.contributed,
    growthLost: a.balance - b.balance - (a.contributed - b.contributed),
  };
}

/** Monthly deposit the late starter would need to catch the early starter. */
export function catchUpMonthly(target: number, years: number, annualReturn: number): number {
  const rate = annualReturn / 100 / 12;
  const months = years * 12;
  if (months <= 0) return 0;
  if (rate === 0) return target / months;
  return (target * rate) / (Math.pow(1 + rate, months) - 1);
}

/* ── Budget ──────────────────────────────────────────────────────────── */

export type BudgetKey = "needs" | "wants" | "savings";
export type BudgetSplit = Record<BudgetKey, number>;

export const CLASSIC_SPLIT: BudgetSplit = { needs: 50, wants: 30, savings: 20 };

/**
 * Move one slider and keep the total at 100. The other two give up or take
 * the difference in proportion to their current size.
 */
export function rebalance(split: BudgetSplit, key: BudgetKey, value: number): BudgetSplit {
  const next = Math.min(100, Math.max(0, Math.round(value)));
  const others = (Object.keys(split) as BudgetKey[]).filter((k) => k !== key);
  const remaining = 100 - next;
  const otherTotal = split[others[0]] + split[others[1]];
  const first =
    otherTotal === 0 ? Math.round(remaining / 2) : Math.round((split[others[0]] / otherTotal) * remaining);
  return { ...split, [key]: next, [others[0]]: first, [others[1]]: remaining - first } as BudgetSplit;
}

export function budgetDollars(income: number, split: BudgetSplit): BudgetSplit {
  return {
    needs: (income * split.needs) / 100,
    wants: (income * split.wants) / 100,
    savings: (income * split.savings) / 100,
  };
}

/* ── Debt payoff ─────────────────────────────────────────────────────── */

export type Debt = { id: string; name: string; balance: number; apr: number; minPayment: number };
export type PayoffStrategy = "avalanche" | "snowball";

export type PayoffResult = {
  months: number;
  totalInterest: number;
  totalPaid: number;
  /** Debt names in the order they reach zero. */
  order: string[];
  /** Total owed at the end of each month, starting with today. */
  timeline: number[];
  /** True when a balance remains at the 600-month projection limit. */
  stuck: boolean;
};

const MAX_MONTHS = 600;

/**
 * Pay every minimum, then throw everything left at one target debt. When a
 * debt is gone its minimum rolls into the next one, so the monthly total
 * never drops. Avalanche targets the highest rate, snowball the smallest
 * balance.
 */
export function simulatePayoff(debts: Debt[], extra: number, strategy: PayoffStrategy): PayoffResult {
  const live = debts
    .filter((debt) => debt.balance > 0)
    .map((debt) => ({ ...debt, apr: Math.max(0, debt.apr), minPayment: Math.max(0, debt.minPayment) }));
  const monthlyBudget = live.reduce((sum, debt) => sum + debt.minPayment, 0) + Math.max(0, extra);
  const total = () => live.reduce((sum, debt) => sum + debt.balance, 0);
  const timeline = [total()];
  const order: string[] = [];
  const paidOff = new Set<(typeof live)[number]>();
  let totalInterest = 0;
  let totalPaid = 0;
  let months = 0;

  const pickTarget = () => {
    const open = live.filter((debt) => debt.balance > 0.005);
    if (open.length === 0) return undefined;
    return open.sort((a, b) =>
      strategy === "avalanche"
        ? b.apr - a.apr || a.balance - b.balance
        : a.balance - b.balance || b.apr - a.apr,
    )[0];
  };

  while (total() > 0.005 && months < MAX_MONTHS) {
    months += 1;
    let budget = monthlyBudget;
    for (const debt of live) {
      if (debt.balance <= 0.005) continue;
      const interest = (debt.balance * debt.apr) / 100 / 12;
      debt.balance += interest;
      totalInterest += interest;
    }
    for (const debt of live) {
      if (debt.balance <= 0.005) continue;
      const pay = Math.min(debt.balance, debt.minPayment, budget);
      debt.balance -= pay;
      budget -= pay;
      totalPaid += pay;
    }
    while (budget > 0.005) {
      const target = pickTarget();
      if (!target) break;
      const pay = Math.min(target.balance, budget);
      target.balance -= pay;
      budget -= pay;
      totalPaid += pay;
    }
    for (const debt of live) {
      if (debt.balance <= 0.005 && !paidOff.has(debt)) {
        debt.balance = 0;
        paidOff.add(debt);
        order.push(debt.name);
      }
    }
    timeline.push(total());
  }

  return { months, totalInterest, totalPaid, order, timeline, stuck: total() > 0.005 };
}

/* ── Roth vs traditional ─────────────────────────────────────────────── */

/**
 * Same slice of pay goes to each account every year. Traditional invests all
 * of it and pays tax on the way out. Roth pays tax first and invests the
 * rest. With equal tax rates the two tie, which is the whole lesson.
 */
export function rothVsTraditional(input: {
  annualPreTax: number;
  years: number;
  annualReturn: number;
  taxNow: number;
  taxLater: number;
}) {
  const rate = input.annualReturn / 100;
  const years = Math.max(0, Math.floor(input.years));
  const factor = rate === 0 ? years : (Math.pow(1 + rate, years) - 1) / rate;
  const traditionalBefore = input.annualPreTax * factor;
  const traditional = traditionalBefore * (1 - input.taxLater / 100);
  const rothDeposit = input.annualPreTax * (1 - input.taxNow / 100);
  const roth = rothDeposit * factor;
  const difference = roth - traditional;
  return {
    traditional,
    traditionalBefore,
    traditionalTax: traditionalBefore - traditional,
    roth,
    rothDeposit,
    rothTaxPaidUpFront: (input.annualPreTax - rothDeposit) * years,
    difference,
    winner:
      Math.abs(difference) < 1 ? ("tie" as const) : difference > 0 ? ("roth" as const) : ("traditional" as const),
  };
}

/* ── Formatting ──────────────────────────────────────────────────────── */

const WHOLE = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function money(value: number): string {
  return WHOLE.format(Math.round(Number.isFinite(value) ? value : 0));
}

/** $1.2M, $48K: for chart axes where space is tight. */
export function moneyShort(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `$${Math.round(value / 1_000)}K`;
  return `$${Math.round(value)}`;
}

export function monthsLabel(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} mo`;
  if (rest === 0) return `${years} yr`;
  return `${years} yr ${rest} mo`;
}
