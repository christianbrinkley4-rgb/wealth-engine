/**
 * Official 2027 Medicare costs, in one place, with their sources.
 *
 * Do not flip COSTS_YEAR in lib/medicareCosts2026.ts. About 20 spots pair
 * that year with 2026 Part D and Part A constants. This file holds the 2027
 * amounts instead.
 *
 * Sources:
 * - CMS, "2027 Medicare Parts A & B Premiums and Deductibles" (Nov 17, 2026)
 *   https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles
 *   Part A, Part B, and the Part D IRMAA table.
 * - CMS, CY2027 Rate Announcement (April 6, 2026), Table V-2
 *   https://www.cms.gov/files/document/2027-announcement.pdf
 *   Part D maximum deductible and out-of-pocket cap.
 * - CMS, "Medicare Part D 2027 National Average Monthly Bid Amount
 *   Information" (July 28, 2026)
 *   https://www.cms.gov/newsroom/fact-sheets/medicare-part-d-2027-national-average-monthly-bid-amount-information
 *   National base beneficiary premium $41.33; NAMBA $296.05.
 * - CMS press release, September 28, 2026
 *   https://www.cms.gov/newsroom/press-releases/medicare-advantage-medicare-prescription-drug-programs-expected-remain-stable-2027
 *   Projected average standalone Part D premium about $36.
 *
 * The standard Part B premium and IRMAA brackets live in lib/irmaa.ts.
 */

import {
  IRMAA_LOOKBACK_YEAR_2027,
  PART_A_2027 as PART_A_2027_CMS,
  PART_B_2027 as PART_B_2027_CMS,
  PART_D_IRMAA_2027,
} from "@/lib/medicareCosts2026";

// PR #53 put the core 2027 Part A, Part B and Part D IRMAA figures in
// lib/medicareCosts2026.ts. They are reused here so there is one source.
export { IRMAA_LOOKBACK_YEAR_2027, PART_D_IRMAA_2027 };

export const COSTS_YEAR_2027 = 2027;

export const CMS_PARTS_AB_SOURCE_2027 = {
  title: "CMS, 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026",
  url: "https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles",
} as const;

export const CMS_2027_RATE_ANNOUNCEMENT = {
  title: "CMS: Announcement of Calendar Year 2027 Medicare Advantage Capitation Rates and Part C and Part D Payment Policies (April 6, 2026)",
  url: "https://www.cms.gov/files/document/2027-announcement.pdf",
} as const;

export const CMS_PART_D_BID_SOURCE_2027 = {
  title: "CMS, Medicare Part D 2027 National Average Monthly Bid Amount Information, July 28, 2026",
  url: "https://www.cms.gov/newsroom/fact-sheets/medicare-part-d-2027-national-average-monthly-bid-amount-information",
} as const;

export const PART_A_2027 = {
  ...PART_A_2027_CMS,
  /** Voluntary premium, 30 to 39 quarters of Medicare-covered employment. */
  premiumReduced: 328,
  /** Voluntary premium, fewer than 30 quarters. */
  premiumFull: 597,
} as const;

export const PART_B_2027 = {
  ...PART_B_2027_CMS,
  immunosuppressiveDrugPremium: 125.7,
  latePenaltyPercentPerYear: 10,
} as const;

export const PART_D_2027 = {
  maximumDeductible: 700,
  outOfPocketCap: 2400,
  /** National base beneficiary premium, from CMS_PART_D_BID_SOURCE_2027. */
  baseBeneficiaryPremium: 41.33,
  latePenaltyPercentPerMonth: 1,
  creditableCoverageGapDays: 63,
} as const;

/**
 * The 2027 Part D surcharge for a MAGI.
 * A band covers everything up to and including its cap.
 */
export function partDIrmaaFor2027(
  magi: number,
  filingStatus: "individual" | "married_jointly",
): number {
  const income = Math.max(0, Math.round(magi * 100) / 100);
  const band = PART_D_IRMAA_2027.find((entry) => {
    const cap = filingStatus === "married_jointly" ? entry.jointMax : entry.individualMax;
    return cap === null || income <= cap;
  });
  return band ? band.surcharge : 0;
}
