/**
 * Every published 2026 Medicare cost, in one place, with its source.
 *
 * Sources, both checked on 2026-09-18:
 * - CMS, “2026 Medicare Parts A & B Premiums and Deductibles” (Nov 14, 2025)
 *   https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles
 *   — Part A and Part B figures, and the Part D IRMAA table.
 * - CMS, “Final CY 2026 Part D Redesign Program Instructions”
 *   https://www.cms.gov/newsroom/fact-sheets/final-cy-2026-part-d-redesign-program-instructions
 *   — Part D deductible, out-of-pocket cap, and base beneficiary premium.
 *
 * The Part B premium and IRMAA brackets live in lib/irmaa.ts, which the
 * calculators already use. Re-stating them here would let the two drift, so
 * the reference page reads them from there instead.
 *
 * When the 2027 figures are published these all change together. Update this
 * file, lib/irmaa.ts, and CONTENT_LAST_REVIEWED in app/sitemap.ts in the same
 * commit, and the tests in lib/__tests__ will tell you what you missed.
 */

export const COSTS_YEAR = 2026;

/** The tax year whose MAGI decides the 2026 income-related surcharges. */
export const IRMAA_LOOKBACK_YEAR = 2024;

export const CMS_PARTS_AB_SOURCE = {
  title: "CMS: 2026 Medicare Parts A & B Premiums and Deductibles",
  url: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
} as const;

export const CMS_PART_D_SOURCE = {
  title: "CMS: Final CY 2026 Part D Redesign Program Instructions",
  url: "https://www.cms.gov/newsroom/fact-sheets/final-cy-2026-part-d-redesign-program-instructions",
} as const;

// ─── PART A ───────────────────────────────────────────────────────────────────
// Roughly 99% of people pay no Part A premium, so the premiums below are the
// exception, not the headline. The deductible is per benefit period, not per
// year — the single most commonly misread figure on this list.
export const PART_A_2026 = {
  inpatientDeductible: 1736,
  coinsuranceDays61To90: 434,
  lifetimeReserveCoinsurance: 868,
  skilledNursingCoinsuranceDays21To100: 217,
  /** Voluntary premium, 30–39 quarters of Medicare-covered employment. */
  premiumReduced: 311,
  /** Voluntary premium, fewer than 30 quarters. */
  premiumFull: 565,
} as const;

// ─── PART B ───────────────────────────────────────────────────────────────────
// The standard premium itself is STANDARD_BASE_PREMIUM_2026 in lib/irmaa.ts.
export const PART_B_2026 = {
  annualDeductible: 283,
  immunosuppressiveDrugPremium: 121.6,
  /** 10% of the standard premium per full 12 months late, for life. */
  latePenaltyPercentPerYear: 10,
} as const;

// ─── PART D ───────────────────────────────────────────────────────────────────
// Plan premiums vary by plan; only the deductible ceiling, the out-of-pocket
// cap and the penalty base are set nationally.
export const PART_D_2026 = {
  /** No plan may charge more than this. Many charge less, or nothing. */
  maximumDeductible: 615,
  /** What a person can be asked to pay out of pocket in a year, at most. */
  outOfPocketCap: 2100,
  /** The figure the late enrollment penalty is calculated from. */
  baseBeneficiaryPremium: 38.99,
  /** 1% of the base premium per month without creditable coverage. */
  latePenaltyPercentPerMonth: 1,
  /** How long a gap in creditable drug coverage may run before it counts. */
  creditableCoverageGapDays: 63,
} as const;

// ─── PART D IRMAA ─────────────────────────────────────────────────────────────
// Added to whatever the plan charges, and paid to Medicare rather than to the
// plan. The MAGI bands match the Part B bands in lib/irmaa.ts exactly, which
// is what partDIrmaaFor relies on.
export interface PartDIrmaaBand {
  /** Upper MAGI limit for a single filer; null is the top band. */
  individualMax: number | null;
  /** Upper MAGI limit for a joint return; null is the top band. */
  jointMax: number | null;
  surcharge: number;
}

export const PART_D_IRMAA_2026: readonly PartDIrmaaBand[] = [
  { individualMax: 109000, jointMax: 218000, surcharge: 0 },
  { individualMax: 137000, jointMax: 274000, surcharge: 14.5 },
  { individualMax: 171000, jointMax: 342000, surcharge: 37.5 },
  { individualMax: 205000, jointMax: 410000, surcharge: 60.4 },
  // CMS words this band as “less than $500,000” / “less than $750,000”, so the
  // cap is the last cent below the top band rather than the round number.
  { individualMax: 499999.99, jointMax: 749999.99, surcharge: 83.3 },
  { individualMax: null, jointMax: null, surcharge: 91 },
] as const;

/**
 * The Part D surcharge for a MAGI, matched the same way the Part B brackets
 * are: a band covers everything up to and including its cap.
 */
export function partDIrmaaFor(magi: number, filingStatus: "individual" | "married_jointly") {
  const income = Math.max(0, Math.round(magi * 100) / 100);
  const band = PART_D_IRMAA_2026.find((entry) => {
    const cap = filingStatus === "married_jointly" ? entry.jointMax : entry.individualMax;
    return cap === null || income <= cap;
  });
  return band ? band.surcharge : 0;
}
