/**
 * The Part B late enrollment penalty.
 *
 * Medicare adds 10% to the standard Part B premium for each FULL 12-month
 * period someone could have had Part B and didn't, and it stays for as long as
 * they have Part B. Two details decide whether a number here is right or
 * misleading:
 *
 *   1. Only complete 12-month periods count. Eleven months late is no penalty
 *      at all; thirteen months is one period, not 1.08.
 *   2. The percentage applies to the STANDARD premium, not to an income-
 *      adjusted (IRMAA) one. Someone paying a surcharge does not also pay a
 *      surcharged penalty.
 *
 * Coverage from a current job — theirs or a spouse's — usually means no
 * penalty at all, because a Special Enrollment Period applies. That is a fact
 * about a household, not arithmetic, so it is stated on the page rather than
 * guessed at here.
 *
 * Source: Medicare.gov, "Part B late enrollment penalty".
 * https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties
 */

import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";

export interface PartBPenalty {
  /** Whole months between eligibility and coverage starting. */
  monthsLate: number;
  /** Complete 12-month periods; the only thing that counts. */
  periods: number;
  /** 10 percentage points per period. */
  percent: number;
  /** Added to the monthly premium, rounded to the nearest 10 cents as CMS does. */
  monthlyPenalty: number;
  /** What the penalty adds in a year. */
  annualPenalty: number;
  /** Illustration only: the same penalty carried for twenty years of Part B. */
  twentyYearPenalty: number;
}

/** Whole months from one year/month to another. Negative means not late. */
export function monthsBetween(
  from: { month: number; year: number },
  to: { month: number; year: number },
): number {
  return (to.year - from.year) * 12 + (to.month - from.month);
}

export function partBPenalty(
  monthsLate: number,
  standardPremium: number = STANDARD_BASE_PREMIUM_2026,
): PartBPenalty {
  const months = Number.isFinite(monthsLate) ? Math.max(0, Math.floor(monthsLate)) : 0;
  const periods = Math.floor(months / 12);
  const percent = periods * 10;
  // CMS rounds the monthly penalty to the nearest $0.10.
  const monthlyPenalty = Math.round(standardPremium * (percent / 100) * 10) / 10;

  return {
    monthsLate: months,
    periods,
    percent,
    monthlyPenalty,
    annualPenalty: Math.round(monthlyPenalty * 12 * 100) / 100,
    twentyYearPenalty: Math.round(monthlyPenalty * 12 * 20 * 100) / 100,
  };
}

export function formatMoney(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
