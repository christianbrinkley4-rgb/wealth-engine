/**
 * Official 2026 and 2027 tax, retirement, HSA, and Social Security
 * figures used by the /numbers hub. Each string below must match the
 * hub cells verbatim.
 *
 * Sources, checked November 18, 2026:
 * - IRS IR-2026-133 / Rev. Proc. 2026-35 (Nov 5, 2026): 2027 brackets,
 *   standard deductions, and the 65-or-older add-on ($1,700, or $2,100
 *   if unmarried and not a surviving spouse).
 *   https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2027-taxpayers-continue-to-benefit-from-the-working-families-tax-cuts
 *   https://www.irs.gov/pub/irs-drop/rp-26-35.pdf
 * - IRS IR-2026-136 / Notice 2026-66 (Nov 12, 2026): 2027 retirement
 *   account limits, the $75,000 415(c) combined limit, Roth IRA phase-out
 *   ranges, and the $155,000 Roth catch-up wage threshold used for 2027.
 *   https://www.irs.gov/pub/irs-drop/n-26-66.pdf
 *   https://www.irs.gov/newsroom/401k-limit-increases-to-25500-for-2027-ira-limit-remains-7500
 * - IRS Rev. Proc. 2026-24: 2027 HSA contribution limits and HDHP
 *   minimum deductibles ($1,750 self-only, $3,500 family). The $1,000
 *   catch-up for age 55 and older is set by section 223(b)(3) and is
 *   not indexed; Rev. Proc. 2026-24 does not restate it.
 *   https://www.irs.gov/pub/irs-drop/rp-26-24.pdf
 * - IRS fact sheet FS-2025-03: the $6,000 senior deduction is in
 *   effect for 2025 through 2028.
 *   https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors
 * - SSA press release, October 14, 2026: 2027 COLA of 3.6%.
 *   https://www.ssa.gov/news/en/press/releases/2026-10-14.html
 * - SSA Federal Register notice, October 26, 2026 (91 FR 67380), and
 *   https://www.ssa.gov/oact/COLA/cbb.html: 2027 wage base $192,300.
 * - 2026 tax, retirement, HSA, and Social Security strings match the
 *   figures already published on this site.
 */

/** 2026 federal income tax brackets, single, as shown on /numbers. */
export const TAX_BRACKETS_SINGLE_2026 = [
  "$0 to $12,400",
  "$12,401 to $50,400",
  "$50,401 to $105,700",
  "$105,701 to $201,775",
  "$201,776 to $256,225",
  "$256,226 to $640,600",
  "Over $640,600",
] as const;

/** 2027 federal income tax brackets, single, from IR-2026-133 / Rev. Proc. 2026-35. */
export const TAX_BRACKETS_SINGLE_2027 = [
  "$0 to $12,800",
  "$12,801 to $52,025",
  "$52,026 to $109,125",
  "$109,126 to $208,325",
  "$208,326 to $264,550",
  "$264,551 to $661,375",
  "Over $661,375",
] as const;

/** 2026 federal income tax brackets, married filing jointly. */
export const TAX_BRACKETS_MFJ_2026 = [
  "$0 to $24,800",
  "$24,801 to $100,800",
  "$100,801 to $211,400",
  "$211,401 to $403,550",
  "$403,551 to $512,450",
  "$512,451 to $768,700",
  "Over $768,700",
] as const;

/** 2027 federal income tax brackets, married filing jointly, from IR-2026-133. */
export const TAX_BRACKETS_MFJ_2027 = [
  "$0 to $25,600",
  "$25,601 to $104,050",
  "$104,051 to $218,250",
  "$218,251 to $416,650",
  "$416,651 to $529,100",
  "$529,101 to $793,650",
  "Over $793,650",
] as const;

export const STANDARD_DEDUCTION_SINGLE_2026 = "$16,100";
export const STANDARD_DEDUCTION_SINGLE_2027 = "$16,600";
export const STANDARD_DEDUCTION_MFJ_2026 = "$32,200";
export const STANDARD_DEDUCTION_MFJ_2027 = "$33,200";
export const SENIOR_BONUS_DEDUCTION = "$6,000";

export const K401_UNDER_50_2026 = "$24,500";
export const K401_UNDER_50_2027 = "$25,500";
export const K401_AGE_50_2026 = "$32,500";
export const K401_AGE_50_2027 = "$34,000";
export const K401_AGES_60_TO_63_2026 = "$35,750";
export const K401_AGES_60_TO_63_2027 = "$37,250";
export const IRA_UNDER_50 = "$7,500";
export const IRA_AGE_50 = "$8,600";

export const HSA_SELF_ONLY_2026 = "$4,400";
export const HSA_SELF_ONLY_2027 = "$4,500";
export const HSA_FAMILY_2026 = "$8,750";
export const HSA_FAMILY_2027 = "$9,000";
export const HSA_CATCH_UP_55 = "$1,000";

export const WAGE_BASE_2026 = "$184,500";
export const WAGE_BASE_2027 = "$192,300";
export const COLA_2026 = "2.8%";
export const COLA_2027 = "3.6%";

/** Combined employee plus employer 415(c) limit, from Notice 2026-66. */
export const K401_COMBINED_2026 = "$72,000";
export const K401_COMBINED_2027 = "$75,000";

/** Roth IRA MAGI phase-out ranges, from IR-2026-136 / Notice 2026-66. */
export const ROTH_IRA_PHASEOUT_SINGLE_2026 = "$153,000";
export const ROTH_IRA_PHASEOUT_SINGLE_END_2026 = "$168,000";
export const ROTH_IRA_PHASEOUT_JOINT_2026 = "$242,000";
export const ROTH_IRA_PHASEOUT_JOINT_END_2026 = "$252,000";
export const ROTH_IRA_PHASEOUT_SINGLE_2027 = "$158,000";
export const ROTH_IRA_PHASEOUT_SINGLE_END_2027 = "$173,000";
export const ROTH_IRA_PHASEOUT_JOINT_2027 = "$250,000";
export const ROTH_IRA_PHASEOUT_JOINT_END_2027 = "$260,000";

/**
 * Wage threshold used to decide whether 2027 catch-up contributions must be
 * Roth. Notice 2026-66: the 2026 threshold, used for 2027 catch-ups, is
 * $155,000 (up from $150,000).
 */
export const ROTH_CATCHUP_WAGE_THRESHOLD_FOR_2027 = "$155,000";

/** 2027 HDHP minimum deductibles, from Rev. Proc. 2026-24. */
export const HDHP_MIN_DEDUCTIBLE_SELF_2027 = "$1,750";
export const HDHP_MIN_DEDUCTIBLE_FAMILY_2027 = "$3,500";

/** Official source URLs used by the wealth explainers. */
export const IRS_IR_2026_133_URL =
  "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2027-taxpayers-continue-to-benefit-from-the-working-families-tax-cuts";
export const IRS_RP_2026_35_URL = "https://www.irs.gov/pub/irs-drop/rp-26-35.pdf";
export const IRS_IR_2026_136_URL =
  "https://www.irs.gov/newsroom/401k-limit-increases-to-25500-for-2027-ira-limit-remains-7500";
export const IRS_NOTICE_2026_66_URL = "https://www.irs.gov/pub/irs-drop/n-26-66.pdf";
export const IRS_RP_2026_24_URL = "https://www.irs.gov/pub/irs-drop/rp-26-24.pdf";
export const SSA_COLA_2027_URL = "https://www.ssa.gov/news/en/press/releases/2026-10-14.html";
export const SSA_WAGE_BASE_URL = "https://www.ssa.gov/oact/COLA/cbb.html";
export const SSA_FR_2027_URL =
  "https://www.federalregister.gov/documents/2026/10/26/2026-21796/cost-of-living-increase-and-other-determinations-for-2027";
