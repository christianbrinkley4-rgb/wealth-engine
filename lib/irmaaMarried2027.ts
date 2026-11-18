/**
 * 2027 IRMAA amounts for people who are married, lived with their spouse at
 * any time during the tax year, and file a separate return.
 *
 * Source: CMS fact sheet "2027 Medicare Parts A & B Premiums and Deductibles",
 * November 17, 2026. Read and checked against the page on November 18, 2026.
 * https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles
 *
 * The joint and single amounts are not repeated here. They live in
 * lib/irmaa.ts and lib/medicareCosts2027.ts. The premiums below are the same
 * amounts as the fourth and fifth tiers in those files, which is how CMS
 * built this table.
 */

import type { SeparateReturnRow } from "@/lib/irmaaMarried2026";

/** Where the higher amounts start on a separate return. */
export const SEPARATE_RETURN_FIRST_LINE_2027 = 112_000;
/** Where the highest amount starts on a separate return. */
export const SEPARATE_RETURN_TOP_LINE_2027 = 388_000;

export const SEPARATE_RETURN_IRMAA_2027: readonly SeparateReturnRow[] = [
  { income: "$112,000 or less", partBPremium: 209.4, partBSurcharge: 0, partDSurcharge: 0 },
  {
    income: "More than $112,000, less than $388,000",
    partBPremium: 670.0,
    partBSurcharge: 460.6,
    partDSurcharge: 88.3,
  },
  { income: "$388,000 or more", partBPremium: 711.8, partBSurcharge: 502.4, partDSurcharge: 96.4 },
] as const;

/** CMS says the income adjustment reaches roughly this share of people with Part B in 2027. */
export const IRMAA_SHARE_OF_PART_B_PERCENT_2027 = 9;
