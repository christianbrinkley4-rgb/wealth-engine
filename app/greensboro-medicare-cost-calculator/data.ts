/**
 * Real plan data behind the Greensboro Medicare cost calculator.
 *
 * Sources (all public, checked October 2026):
 * - Part B premium/deductible: 2026 Medicare Trustees Report projections for 2027
 *   ($209.50/month premium, $292 deductible). These are PROJECTIONS, not final;
 *   CMS announces final 2027 Parts A & B figures in November 2026.
 * - Medigap Plan G premiums: Blue Cross and Blue Shield of North Carolina, "Blue Medicare
 *   Supplement June 2026 - May 2027" rate outline, non-tobacco attained-age rates
 *   (nchealthplans.com). Averaged male/female below. This filing is current.
 * - MA plan figures: CMS 2027 landscape file for Guilford County, via
 *   medicareadvantage.com (55 plans, $4.13 avg monthly premium, $6,697.27 avg
 *   max out-of-pocket). National average MA premium ~$12/month from the CMS
 *   press release of Sept 28, 2026 (projection). Part D $700 max deductible
 *   and $2,400 out-of-pocket cap from the CMS CY 2027 Rate Announcement (final).
 * - MA average copay per visit and per-drug monthly cost: unchanged planning
 *   estimates with no 2027 source; labeled as estimates on the page.
 *
 * Nothing here is a recommendation. Every number is labeled an estimate.
 */

export const META = {
  title: "Greensboro Medicare Cost Calculator: Medigap vs Medicare Advantage",
  description:
    "Estimate your yearly Medicare costs in Greensboro, NC. Compare Medigap Plan G with $0-premium Medicare Advantage using real 2027 plan figures. Free, no signup.",
};

export const PATH = "/greensboro-medicare-cost-calculator";

/**
 * 2027 projected standard Part B premium and deductible.
 * Source: 2026 Medicare Trustees Report. PROJECTIONS; CMS finalizes Nov 2026.
 */
export const PART_B_MONTHLY = 209.5;
export const PART_B_DEDUCTIBLE = 292;

/**
 * BCBS NC Medigap Plan G monthly premium, non-tobacco, averaged male/female,
 * by attained age (2026-27 rate filing). Ages outside 65-74 clamp to the nearest end.
 */
export const MEDIGAP_G_MONTHLY_BY_AGE: Record<number, number> = {
  65: 211, // (196.50 + 224.75) / 2
  66: 218, // (203.25 + 232.50) / 2
  67: 225, // (210.00 + 240.25) / 2
  68: 233, // (216.75 + 248.25) / 2
  69: 240, // (223.75 + 256.00) / 2
  70: 245, // (228.50 + 261.50) / 2
  71: 251, // (233.75 + 267.75) / 2
  72: 256, // (239.00 + 273.50) / 2
  73: 261, // (243.75 + 279.00) / 2
  74: 267, // (249.25 + 285.25) / 2
};

export function medigapGMonthly(age: number): number {
  const a = Math.min(74, Math.max(65, Math.round(age)));
  return MEDIGAP_G_MONTHLY_BY_AGE[a] ?? 211;
}

/**
 * Projected average standalone Part D premium for 2027 (~$36/month).
 * Source: CMS press release, Sept 28, 2026 ($35.09 in 2026, projected ~$36).
 * Labeled an estimate on the page.
 */
export const PART_D_MONTHLY_ESTIMATE = 36;

/** Blended average doctor copay for the MA estimate (PCP $0, specialist $35-40). */
export const MA_AVG_COPAY_PER_VISIT = 20;

/**
 * Part D maximum deductible for 2027 ($700, finalized in the CMS CY 2027
 * Rate Announcement). Used as a conservative planning figure for the MA
 * estimate; individual plans may set a lower drug deductible.
 */
export const MA_PART_D_DEDUCTIBLE = 700;

/** Rough generic drug cost per medication per month, labeled an estimate. */
export const DRUG_MONTHLY_PER_MED_ESTIMATE = 12;

export interface MaLandscapeRow {
  metric: string;
  value: string;
  source: string;
}

/**
 * 2027 Medicare Advantage landscape for Guilford County, NC.
 * County figures from the CMS 2027 landscape file via medicareadvantage.com.
 * Individual plan premiums, deductibles, and copays vary; verify any specific
 * plan on Medicare.gov before deciding.
 */
export const MA_LANDSCAPE_2027: MaLandscapeRow[] = [
  {
    metric: "Medicare Advantage plans available in Guilford County",
    value: "55",
    source: "CMS 2027 landscape file, via medicareadvantage.com",
  },
  {
    metric: "Average monthly premium",
    value: "$4.13",
    source: "CMS 2027 landscape file, via medicareadvantage.com",
  },
  {
    metric: "Average maximum out-of-pocket",
    value: "$6,697.27",
    source: "CMS 2027 landscape file, via medicareadvantage.com",
  },
  {
    metric: "National average MA premium (2027)",
    value: "About $12/month",
    source: "CMS press release, Sept 28, 2026 (projection)",
  },
  {
    metric: "Part D maximum deductible (2027)",
    value: "$700",
    source: "CMS CY 2027 Rate Announcement (final)",
  },
  {
    metric: "Part D out-of-pocket cap (2027)",
    value: "$2,400",
    source: "CMS CY 2027 Rate Announcement (final)",
  },
];

export interface MedigapRow {
  age: string;
  female: string;
  male: string;
}

export const MEDIGAP_G_TABLE: MedigapRow[] = [
  { age: "65", female: "$196.50", male: "$224.75" },
  { age: "67", female: "$210.00", male: "$240.25" },
  { age: "70", female: "$228.50", male: "$261.50" },
  { age: "72", female: "$239.00", male: "$273.50" },
  { age: "74", female: "$249.25", male: "$285.25" },
];

/** Guilford County ZIP codes for the calculator's service-area check. */
export const GUILFORD_ZIPS = new Set([
  "27401", "27402", "27403", "27405", "27406", "27407", "27408", "27409",
  "27410", "27411", "27412", "27413", "27415", "27416", "27417", "27419",
  "27420", "27425", "27427", "27429", "27435", "27438", "27455", "27495",
  "27497", "27498", "27499", "27214", "27235", "27263", "27265", "27268",
  "27282", "27284", "27301", "27313", "27358",
]);

export interface CalcResult {
  medigapYearly: number;
  medigapLines: Array<{ label: string; amount: number }>;
  maYearly: number;
  maLines: Array<{ label: string; amount: number }>;
  difference: number;
  lowerPath: "Medigap Plan G" | "Medicare Advantage";
}

export function calculate(input: {
  age: number;
  meds: number;
  visits: number;
}): CalcResult {
  const partBYearly = PART_B_MONTHLY * 12;
  const medigapMonthly = medigapGMonthly(input.age);
  const medigapYearlyPremium = medigapMonthly * 12;
  const partDYearly = PART_D_MONTHLY_ESTIMATE * 12;
  const drugYearly = input.meds * DRUG_MONTHLY_PER_MED_ESTIMATE * 12;

  const medigapYearly = partBYearly + medigapYearlyPremium + partDYearly + PART_B_DEDUCTIBLE + drugYearly;

  const visitCost = input.visits * MA_AVG_COPAY_PER_VISIT;
  const maDrugDeductible = input.meds > 0 ? MA_PART_D_DEDUCTIBLE : 0;

  const maYearly = partBYearly + visitCost + maDrugDeductible + drugYearly;

  const medigapLines = [
    { label: "Part B premium (2027 projected)", amount: partBYearly },
    { label: `Medigap Plan G premium (est., age ${Math.min(74, Math.max(65, Math.round(input.age)))})`, amount: medigapYearlyPremium },
    { label: "Standalone Part D premium (2027 projected avg)", amount: partDYearly },
    { label: "Part B deductible, 2027 projected (Plan G does not cover it)", amount: PART_B_DEDUCTIBLE },
    { label: `Drugs (${input.meds}/mo, est.)`, amount: drugYearly },
  ];

  const maLines = [
    { label: "Part B premium (2027 projected)", amount: partBYearly },
    { label: "MA plan premium (typical $0 plan)", amount: 0 },
    { label: `Doctor visits (${input.visits}/yr, est. copays)`, amount: visitCost },
    { label: "Part D deductible, 2027 max (if you take drugs)", amount: maDrugDeductible },
    { label: `Drugs (${input.meds}/mo, est.)`, amount: drugYearly },
  ];

  const difference = Math.abs(medigapYearly - maYearly);

  return {
    medigapYearly: Math.round(medigapYearly),
    medigapLines,
    maYearly: Math.round(maYearly),
    maLines,
    difference: Math.round(difference),
    lowerPath: medigapYearly <= maYearly ? "Medigap Plan G" : "Medicare Advantage",
  };
}

export const FAQS = [
  {
    q: "Are these real Greensboro plan prices?",
    a: "The Medicare Advantage figures come from the CMS 2027 landscape file for Guilford County (55 plans, $4.13 average monthly premium, $6,697.27 average max out-of-pocket). The Medigap Plan G premiums are Blue Cross NC's filed non-tobacco rates by age. The Part B premium and deductible shown are 2027 projections from the Medicare Trustees Report; CMS finalizes those in November 2026. Plan availability and prices vary by county and change every year, so always verify current details on Medicare.gov before deciding anything.",
  },
  {
    q: "Does this calculator recommend a plan?",
    a: "No. It estimates yearly costs two different ways so you can see the tradeoff: Medigap costs more every month but caps surprises, while Medicare Advantage usually costs less monthly but you pay as you go. Which fits you depends on your health, doctors, drugs, and budget. Talk to a licensed agent before enrolling.",
  },
  {
    q: "Why does Medicare Advantage look cheaper here?",
    a: "Most MA plans in Guilford County have $0 monthly premiums, so the estimate starts lower. But the estimate assumes average health. A bad year with hospital stays can push MA costs toward the plan's maximum out-of-pocket, which averages $6,697.27 across Guilford County plans for 2027. Medigap Plan G has no such ceiling risk because it covers nearly all cost sharing after the Part B deductible.",
  },
  {
    q: "What is missing from these estimates?",
    a: "Dental, vision, and hearing extras some MA plans bundle; drug costs beyond generics; any Part B late-enrollment penalty; and income-related premium surcharges (IRMAA). The Medigap premium shown is one carrier's filed rate, and your actual quote depends on the insurer, your exact age, and tobacco use. The Part B figures are projections until CMS finalizes them.",
  },
  {
    q: "Do I still pay the Part B premium with Medicare Advantage?",
    a: "Yes. Almost everyone pays the Part B premium ($209.50/month projected for 2027) no matter which path they take. A few MA plans give part of it back, but that is the exception, not the rule.",
  },
];

export const HOW_TO_STEPS = [
  "Enter your age, ZIP code, how many prescriptions you take each month, and roughly how many doctor visits you make in a year.",
  "Read the two estimates side by side: Medigap Plan G and a typical $0-premium Medicare Advantage plan.",
  "Expand each line to see what goes into the number, and remember every figure is an estimate for education, not a quote.",
  "Bring the printout to a licensed agent to compare real plans available in Guilford County for your situation.",
];
