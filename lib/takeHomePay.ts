export type FilingStatus = "single" | "joint";
export type Frequency = "weekly" | "biweekly" | "semimonthly" | "monthly";

/**
 * 2026 federal brackets, copied from the verified figures doc (IRS Rev.
 * Proc. 2025-32). Each row is [top of bracket, rate].
 */
const BRACKETS: Record<FilingStatus, Array<[number, number]>> = {
  single: [
    [12400, 0.1],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  joint: [
    [24800, 0.1],
    [100800, 0.12],
    [211400, 0.22],
    [403550, 0.24],
    [512450, 0.32],
    [768700, 0.35],
    [Infinity, 0.37],
  ],
};

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 16100, joint: 32200 };
export const NC_STANDARD_DEDUCTION: Record<FilingStatus, number> = { single: 12750, joint: 25500 };
const NC_RATE = 0.0399;
const SS_RATE = 0.062;
const SS_WAGE_BASE = 184500;
const MEDICARE_RATE = 0.0145;
const ADDL_MEDICARE_RATE = 0.009;
const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = { single: 200000, joint: 250000 };

const PERIODS: Record<Frequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

function federalTax(taxable: number, status: FilingStatus): number {
  let tax = 0;
  let floor = 0;
  for (const [cap, rate] of BRACKETS[status]) {
    if (taxable <= floor) break;
    tax += (Math.min(taxable, cap) - floor) * rate;
    floor = cap;
  }
  return tax;
}

/** One wage earner, under 65, no dependents, credits, or pretax deductions. */
export function estimateTakeHome(gross: number, status: FilingStatus) {
  const annual = Number.isFinite(gross) ? Math.max(0, gross) : 0;
  const taxable = Math.max(0, annual - STANDARD_DEDUCTION[status]);
  const fed = federalTax(taxable, status);
  const nc = Math.max(0, annual - NC_STANDARD_DEDUCTION[status]) * NC_RATE;
  const ss = Math.min(annual, SS_WAGE_BASE) * SS_RATE;
  const medicare = annual * MEDICARE_RATE;
  const addlMedicare = Math.max(0, annual - ADDL_MEDICARE_THRESHOLD[status]) * ADDL_MEDICARE_RATE;
  const totalTax = fed + nc + ss + medicare + addlMedicare;
  return { annual, fed, nc, ss, medicare, addlMedicare, totalTax, net: annual - totalTax };
}
export { PERIODS };
