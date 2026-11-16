/**
 * Logic for the standalone IRMAA checker at /irmaa-checker.
 *
 * This file holds no bracket data and no bracket math of its own.
 * - Part B premium and tier: calculatePartBPremium and getBrackets in lib/irmaa.ts.
 * - Part D surcharge: partDIrmaaFor in lib/medicareCosts2026.ts.
 * Both read the official 2026 CMS amounts:
 * https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
 *
 * Year status, checked November 15, 2026: CMS has not published the 2027
 * Part B premium or the 2027 IRMAA brackets. The CMS newsroom listed no
 * 2027 Parts A and B fact sheet through November 13, 2026. This checker
 * therefore shows 2026 amounts and labels them 2026. When CMS publishes the
 * 2027 amounts, update lib/irmaa.ts and lib/medicareCosts2026.ts. This file
 * and the page follow those two files.
 */

import {
  calculatePartBPremium,
  getBrackets,
  STANDARD_BASE_PREMIUM_2026,
  type FilingStatus,
} from "@/lib/irmaa";
import {
  COSTS_YEAR,
  IRMAA_LOOKBACK_YEAR,
  PART_D_IRMAA_2026,
  partDIrmaaFor,
} from "@/lib/medicareCosts2026";

/** The premium year the checker reports. */
export const IRMAA_CHECKER_YEAR = COSTS_YEAR;

/** The tax return year that Social Security uses for that premium year. */
export const IRMAA_CHECKER_TAX_YEAR = IRMAA_LOOKBACK_YEAR;

/** The day the year status above was checked against the CMS newsroom. */
export const IRMAA_CHECKER_CHECKED = "2026-11-15";
export const IRMAA_CHECKER_CHECKED_LABEL = "November 15, 2026";

/** The capture API rejects any number above this, so the input stops here. */
export const IRMAA_CHECKER_MAX_INCOME = 1_000_000_000;

export interface IrmaaCheckResult {
  year: number;
  taxYear: number;
  filingStatus: FilingStatus;
  income: number;
  /** 0 is the standard premium with no surcharge. 1 to 5 are the IRMAA tiers. */
  tier: number;
  /** How many IRMAA tiers exist above the standard premium. */
  tierCount: number;
  /** The bracket name from lib/irmaa.ts, unchanged. */
  bracketName: string;
  standardPartBPremium: number;
  /** Total monthly Part B premium for one person, surcharge included. */
  partBPremium: number;
  /** Monthly amount added to Part B for one person. */
  partBSurcharge: number;
  /** Monthly amount added to the Part D premium for one person. */
  partDSurcharge: number;
  /** Part B surcharge plus Part D surcharge, per month, for one person. */
  monthlySurcharge: number;
  /** The same total for 12 months, for one person. */
  annualSurcharge: number;
  /**
   * The income line where the next tier starts, in whole dollars.
   * Null in the top tier.
   */
  nextTierLine: number | null;
  /** True when the next tier starts at the line itself, not one cent above it. */
  nextTierStartsAtLine: boolean;
  /** Whole dollars of income left before the next tier. Null in the top tier. */
  roomBeforeNextTier: number | null;
}

function toCents(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Turns typed text such as "$150,000" into a number.
 * Returns null when the text has no digits, so the page shows no result.
 */
export function parseIncome(text: string): number | null {
  const cleaned = text.replace(/[^0-9.]/g, "");
  if (!/\d/.test(cleaned)) return null;
  const value = Number.parseFloat(cleaned);
  if (!Number.isFinite(value)) return null;
  return Math.min(Math.max(0, value), IRMAA_CHECKER_MAX_INCOME);
}

/** Looks up the 2026 tier and both surcharges for one person. */
export function checkIrmaa(income: number, filingStatus: FilingStatus): IrmaaCheckResult {
  const safeIncome = Number.isFinite(income)
    ? Math.min(Math.max(0, income), IRMAA_CHECKER_MAX_INCOME)
    : 0;
  const brackets = getBrackets(filingStatus);
  const bracket = calculatePartBPremium(safeIncome, filingStatus);
  const tier = Math.max(0, brackets.indexOf(bracket));
  const next = brackets[tier + 1] ?? null;

  const partBSurcharge = toCents(bracket.irmaaSurcharge);
  const partDSurcharge = toCents(partDIrmaaFor(safeIncome, filingStatus));
  const monthlySurcharge = toCents(partBSurcharge + partDSurcharge);

  // Most tiers start one cent above a round line ("more than $109,000").
  // The top tier starts at the line itself ("$500,000 or more").
  const nextTierLine = next ? Math.floor(next.minIncome) : null;
  const nextTierStartsAtLine = next ? Number.isInteger(next.minIncome) : false;
  const roomBeforeNextTier =
    nextTierLine === null ? null : Math.max(0, Math.floor(nextTierLine - safeIncome));

  return {
    year: IRMAA_CHECKER_YEAR,
    taxYear: IRMAA_CHECKER_TAX_YEAR,
    filingStatus,
    income: safeIncome,
    tier,
    tierCount: brackets.length - 1,
    bracketName: bracket.bracketName,
    standardPartBPremium: STANDARD_BASE_PREMIUM_2026,
    partBPremium: bracket.partBPremium,
    partBSurcharge,
    partDSurcharge,
    monthlySurcharge,
    annualSurcharge: toCents(monthlySurcharge * 12),
    nextTierLine,
    nextTierStartsAtLine,
    roomBeforeNextTier,
  };
}

/**
 * The short label stored with a lead from the checker.
 *
 * The capture API keeps the first 100 characters of irmaa_bracket. Other
 * tools already start this field with the tool name ("Plan 65, ...",
 * "Roth window, ..."), and the attribution report reads that prefix.
 */
export function irmaaLeadLabel(result: IrmaaCheckResult): string {
  return `IRMAA checker ${result.year}: ${result.bracketName}, Part D +$${result.partDSurcharge.toFixed(2)}/mo`.slice(
    0,
    100,
  );
}

export interface IrmaaTableRow {
  /** 0 is the standard premium. 1 to 5 are the IRMAA tiers. */
  tier: number;
  /** Income range for a single filer, in words. */
  individual: string;
  /** Income range for a joint return, in words. */
  joint: string;
  partBPremium: number;
  partBSurcharge: number;
  partDSurcharge: number;
}

function wholeDollars(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function rangeInWords(index: number, brackets: ReturnType<typeof getBrackets>): string {
  const bracket = brackets[index];
  const line = Math.floor(bracket.minIncome);
  if (bracket.maxIncome === null) return `${wholeDollars(line)} or more`;
  if (index === 0) return `${wholeDollars(bracket.maxIncome)} or less`;
  // CMS words the fourth tier as "less than", not "up to".
  if (!Number.isInteger(bracket.maxIncome)) {
    return `More than ${wholeDollars(line)}, less than ${wholeDollars(Math.ceil(bracket.maxIncome))}`;
  }
  return `More than ${wholeDollars(line)}, up to ${wholeDollars(bracket.maxIncome)}`;
}

/**
 * The full 2026 table for display, built from the two existing data files.
 * Pages read this, so no page keeps its own copy of the amounts.
 */
export function irmaaTableRows(): IrmaaTableRow[] {
  const individual = getBrackets("individual");
  const joint = getBrackets("married_jointly");
  return individual.map((bracket, index) => ({
    tier: index,
    individual: rangeInWords(index, individual),
    joint: rangeInWords(index, joint),
    partBPremium: bracket.partBPremium,
    partBSurcharge: bracket.irmaaSurcharge,
    partDSurcharge: PART_D_IRMAA_2026[index]?.surcharge ?? 0,
  }));
}
