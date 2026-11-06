/**
 * The 2027 Part D cap check on the plan-check results screen.
 *
 * Plain arithmetic on one number the visitor types (what they pay at the
 * pharmacy in a typical month now). Nothing is sent anywhere. It never
 * estimates savings or names a plan: 2027 copays are set by each plan, so
 * this only says whether the cap is likely to matter. Figures must match
 * lib/medicareNumbers2027.ts (a test enforces it).
 */

/** Final, CMS CY2027 Rate Announcement (April 6, 2026). */
export const PART_D_CAP_2027 = 2400;
/** Final, same source: the most a plan's drug deductible can be in 2027. */
export const PART_D_MAX_DEDUCTIBLE_2027 = 700;

export type DrugCapResult =
  | { kind: "invalid" }
  | { kind: "below"; yearly: number }
  | { kind: "reaches"; yearly: number; month: number };

export function checkDrugCap(monthlyInput: string): DrugCapResult {
  const monthly = Number(monthlyInput.replace(/[$,\s]/g, ""));
  if (!Number.isFinite(monthly) || monthly <= 0 || monthly > 50_000) return { kind: "invalid" };
  const yearly = Math.round(monthly * 12);
  if (yearly < PART_D_CAP_2027) return { kind: "below", yearly };
  return { kind: "reaches", yearly, month: Math.min(12, Math.ceil(PART_D_CAP_2027 / monthly)) };
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function monthName(month: number): string {
  return MONTHS[Math.min(12, Math.max(1, month)) - 1];
}

export function dollars(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}
