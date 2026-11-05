/**
 * Verified federal retirement figures used by the checker.
 *
 * Source data: growth/retirement-figures-2022-2027.json (primary sources only),
 * rechecked on ssa.gov 2026-11-05. Add a year only after SSA publishes it.
 */

export const EARNINGS_TEST_SOURCE = {
  label: "SSA: Exempt Amounts Under the Earnings Test",
  url: "https://www.ssa.gov/oact/cola/rtea.html",
} as const;

export const FRA_SOURCE = {
  label: "SSA: Retirement Age and Benefit Reduction",
  url: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html",
} as const;

/**
 * Annual exempt amounts. lower: years before the year you reach full retirement
 * age ($1 withheld per $2 over). higher: the year you reach it, counting only
 * earnings before that month ($1 withheld per $3 over).
 */
export const EARNINGS_TEST: Readonly<Record<number, { lower: number; higher: number }>> = {
  2022: { lower: 19560, higher: 51960 },
  2023: { lower: 21240, higher: 56520 },
  2024: { lower: 22320, higher: 59520 },
  2025: { lower: 23400, higher: 62160 },
  2026: { lower: 24480, higher: 65160 },
  2027: { lower: 25560, higher: 67920 },
};

/** Full retirement age in months, by birth year (SSA table). */
export function fullRetirementAgeMonths(birthYear: number): number {
  if (birthYear <= 1954) return 66 * 12;
  if (birthYear >= 1960) return 67 * 12;
  return 66 * 12 + (birthYear - 1954) * 2; // 1955: +2 months ... 1959: +10 months
}

/** The calendar month (1-12) and year someone reaches full retirement age. */
export function fullRetirementAgeDate(
  birthMonth: number,
  birthYear: number,
): { month: number; year: number } {
  const total = birthYear * 12 + (birthMonth - 1) + fullRetirementAgeMonths(birthYear);
  return { year: Math.floor(total / 12), month: (total % 12) + 1 };
}
