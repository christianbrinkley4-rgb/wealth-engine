/**
 * Logic for the standalone IRMAA checker at /irmaa-checker.
 *
 * This file holds no bracket data and no bracket math of its own.
 * - Part B premium and tier: calculatePartBPremium and getBrackets in lib/irmaa.ts.
 * - Part D surcharge: partDIrmaaFor2027 in lib/medicareCosts2027.ts.
 * Both read the official 2027 CMS amounts:
 * https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles
 *
 * The premium year is IRMAA_YEAR, kept separate from COSTS_YEAR on purpose.
 * Social Security is mailing 2027 IRMAA notices now, and those use the 2025
 * tax return. A visitor holding a notice needs the 2027 table.
 */

import {
  calculatePartBPremium,
  getBrackets,
  STANDARD_BASE_PREMIUM_2027,
  type FilingStatus,
  type IrmaaYear,
} from "@/lib/irmaa";
import { IRMAA_LOOKBACK_YEAR_2027, PART_D_IRMAA_2027, partDIrmaaFor2027 } from "@/lib/medicareCosts2027";

/**
 * Premium year for IRMAA tools. Kept separate from COSTS_YEAR, which stays
 * 2026 because many cost pages still pair that year with 2026 Part D and
 * Part A constants.
 */
export const IRMAA_YEAR: IrmaaYear = 2027;

/** The premium year the checker reports. */
export const IRMAA_CHECKER_YEAR = IRMAA_YEAR;

/** The tax return year that Social Security uses for that premium year. */
export const IRMAA_CHECKER_TAX_YEAR = IRMAA_LOOKBACK_YEAR_2027;

/** The day the year status above was checked against the CMS newsroom. */
export const IRMAA_CHECKER_CHECKED = "2026-11-18";
export const IRMAA_CHECKER_CHECKED_LABEL = "November 18, 2026";

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

/**
 * Formats a typed or pasted income for the checker input.
 * parseIncome already keeps a decimal point. This rounds the value to whole
 * dollars so a paste such as 150,000.00 is not turned into 15,000,000.
 */
export function normalizeIncomeInput(text: string): string {
  const value = parseIncome(text);
  if (value === null) return "";
  return Math.round(value).toLocaleString("en-US");
}

/** Looks up the 2027 tier and both surcharges for one person. */
export function checkIrmaa(income: number, filingStatus: FilingStatus): IrmaaCheckResult {
  const safeIncome = Number.isFinite(income)
    ? Math.min(Math.max(0, income), IRMAA_CHECKER_MAX_INCOME)
    : 0;
  const brackets = getBrackets(filingStatus, IRMAA_YEAR);
  const bracket = calculatePartBPremium(safeIncome, filingStatus, IRMAA_YEAR);
  const tier = Math.max(0, brackets.indexOf(bracket));
  const next = brackets[tier + 1] ?? null;

  const partBSurcharge = toCents(bracket.irmaaSurcharge);
  const partDSurcharge = toCents(partDIrmaaFor2027(safeIncome, filingStatus));
  const monthlySurcharge = toCents(partBSurcharge + partDSurcharge);

  // Most tiers start one cent above a round line ("more than $112,000").
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
    standardPartBPremium: STANDARD_BASE_PREMIUM_2027,
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
 * The full 2027 table for display, built from lib/irmaa.ts and
 * lib/medicareCosts2027.ts. Pages read this, so no page keeps its own copy
 * of the amounts.
 */
export function irmaaTableRows(): IrmaaTableRow[] {
  const individual = getBrackets("individual", IRMAA_YEAR);
  const joint = getBrackets("married_jointly", IRMAA_YEAR);
  return individual.map((bracket, index) => ({
    tier: index,
    individual: rangeInWords(index, individual),
    joint: rangeInWords(index, joint),
    partBPremium: bracket.partBPremium,
    partBSurcharge: bracket.irmaaSurcharge,
    partDSurcharge: PART_D_IRMAA_2027[index]?.surcharge ?? 0,
  }));
}
