import { CLASSIC_SPLIT, type BudgetSplit } from "@/lib/wealth/math";

export const BUDGET_DEFAULTS = { income: 3000, period: "month" as "month" | "paycheck", ...CLASSIC_SPLIT };

export function normalizeBudgetState(value: unknown): typeof BUDGET_DEFAULTS {
  const saved = typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
  const shares = [saved.needs, saved.wants, saved.savings];
  const validSplit = shares.every((share) => typeof share === "number" && Number.isInteger(share) && share >= 0 && share <= 100)
    && (saved.needs as number) + (saved.wants as number) + (saved.savings as number) === 100;
  return {
    income: typeof saved.income === "number" && Number.isFinite(saved.income)
      ? Math.round(Math.min(1_000_000, Math.max(0, saved.income)) * 100) / 100
      : BUDGET_DEFAULTS.income,
    period: saved.period === "paycheck" ? "paycheck" : "month",
    ...(validSplit ? { needs: saved.needs as number, wants: saved.wants as number, savings: saved.savings as number } : CLASSIC_SPLIT),
  };
}

/** Allocate rounding cents to the largest remainders, keeping every total exact. */
function allocatedCents(income: number, split: BudgetSplit): number[] {
  const total = Math.round(income * 100);
  const raw = [split.needs, split.wants, split.savings].map((share) => total * share / 100);
  const cents = raw.map(Math.floor);
  const priority = [0, 1, 2].sort((a, b) => (raw[b] - cents[b]) - (raw[a] - cents[a]));
  const remainder = total - cents.reduce((sum, value) => sum + value, 0);
  for (let i = 0; i < remainder; i += 1) cents[priority[i]] += 1;
  return cents;
}

export function budgetPlanCsv(value: unknown): string {
  const state = normalizeBudgetState(value);
  const annualIncome = state.income * (state.period === "paycheck" ? 26 : 12);
  const monthlyIncome = annualIncome / 12;
  const monthly = allocatedCents(monthlyIncome, state);
  const annual = allocatedCents(annualIncome, state);
  const dollars = (cents: number) => (cents / 100).toFixed(2);
  const rows = [
    ["Bucket", "Share", "Per month", "Per year"],
    ...["Needs", "Wants", "Savings and extra debt"].map((label, index) => [
      label,
      `${[state.needs, state.wants, state.savings][index]}%`,
      dollars(monthly[index]),
      dollars(annual[index]),
    ]),
    ["Total take-home", "100%", dollars(Math.round(monthlyIncome * 100)), dollars(Math.round(annualIncome * 100))],
    [],
    ["Amounts rounded to cents. Monthly income averages 26 paychecks a year when Every 2 weeks is selected."],
    ["Made with the budget builder at christianbrinkleync.com/wealth. Education only, not advice."],
  ];
  return rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\r\n");
}
