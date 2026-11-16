/**
 * 2026 IRMAA amounts for people who are married, lived with their spouse at
 * any time during the tax year, and file a separate return.
 *
 * Source: CMS fact sheet "2026 Medicare Parts A & B Premiums and Deductibles",
 * November 14, 2025. Read and checked against the page on November 15, 2026.
 * https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
 *
 * The joint and single amounts are not repeated here. They live in
 * lib/irmaa.ts and lib/medicareCosts2026.ts. The test in
 * lib/__tests__/irmaaMarried2026.test.ts checks that the two premiums below
 * are the same amounts as the fourth and fifth tiers in those files, which is
 * how CMS built this table.
 */

export interface SeparateReturnRow {
  /** Income range in words, as CMS states it. */
  income: string;
  /** Total monthly Part B premium for one person. */
  partBPremium: number;
  /** Monthly amount added to Part B. */
  partBSurcharge: number;
  /** Monthly amount added to the Part D premium. */
  partDSurcharge: number;
}

/** Where the higher amounts start on a separate return. */
export const SEPARATE_RETURN_FIRST_LINE_2026 = 109_000;
/** Where the highest amount starts on a separate return. */
export const SEPARATE_RETURN_TOP_LINE_2026 = 391_000;

export const SEPARATE_RETURN_IRMAA_2026: readonly SeparateReturnRow[] = [
  { income: "$109,000 or less", partBPremium: 202.9, partBSurcharge: 0, partDSurcharge: 0 },
  {
    income: "More than $109,000, less than $391,000",
    partBPremium: 649.2,
    partBSurcharge: 446.3,
    partDSurcharge: 83.3,
  },
  { income: "$391,000 or more", partBPremium: 689.9, partBSurcharge: 487, partDSurcharge: 91 },
] as const;

/** CMS says the income adjustment reaches about this share of people with Part B. */
export const IRMAA_SHARE_OF_PART_B_PERCENT = 8;
