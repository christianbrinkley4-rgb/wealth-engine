/**
 * Real plan data behind the Greensboro Medicare cost calculator.
 *
 * Sources (all public, checked October 2026):
 * - Part B premium/deductible: CMS, "2025 Medicare Parts A & B Premiums and Deductibles"
 *   (Nov 8, 2024). Standard Part B premium $185.00/month, Part B deductible $257.
 * - Medigap Plan G premiums: Blue Cross and Blue Shield of North Carolina, "Blue Medicare
 *   Supplement June 2026 - May 2027" rate outline, non-tobacco attained-age rates
 *   (nchealthplans.com). Averaged male/female below.
 * - MA plan figures: published 2025 Summaries of Benefits and the NC Department of
 *   Insurance 2025 MA landscape file, via medicareadvantage.com and q1medicare.com.
 *   Plan availability varies by county and year. Always verify on Medicare.gov.
 *
 * Nothing here is a recommendation. Every number is labeled an estimate.
 */

export const META = {
  title: "Greensboro Medicare Cost Calculator: Medigap vs Medicare Advantage",
  description:
    "Estimate your yearly Medicare costs in Greensboro, NC. Compare Medigap Plan G with $0-premium Medicare Advantage using real 2025 plan figures. Free, no signup.",
};

export const PATH = "/greensboro-medicare-cost-calculator";

/** 2025 standard Part B premium and deductible (CMS). */
export const PART_B_MONTHLY = 185;
export const PART_B_DEDUCTIBLE = 257;

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

/** Typical standalone Part D premium, labeled an estimate on the page. */
export const PART_D_MONTHLY_ESTIMATE = 35;

/** Blended average doctor copay for the MA estimate (PCP $0, specialist $35-40). */
export const MA_AVG_COPAY_PER_VISIT = 20;

/** Typical Part D deductible on $0-premium MA plans (UHC NC-26, 2025). */
export const MA_PART_D_DEDUCTIBLE = 340;

/** Rough generic drug cost per medication per month, labeled an estimate. */
export const DRUG_MONTHLY_PER_MED_ESTIMATE = 12;

export interface MaPlanRow {
  plan: string;
  carrier: string;
  premium: string;
  deductible: string;
  moop: string;
  pcp: string;
  specialist: string;
  stars: string;
  source: string;
}

/** Real published 2025 figures. Availability varies by county and plan year. */
export const MA_PLANS_2025: MaPlanRow[] = [
  {
    plan: "AARP Medicare Advantage from UHC NC-26 (HMO-POS)",
    carrier: "UnitedHealthcare",
    premium: "$0",
    deductible: "$0 health / $340 drug",
    moop: "$4,900 in-network",
    pcp: "$0 copay",
    specialist: "Varies",
    stars: "4.0",
    source: "2025 plan details via q1medicare.com",
  },
  {
    plan: "Aetna Medicare Signature (HMO)",
    carrier: "Aetna",
    premium: "$0",
    deductible: "$0",
    moop: "See plan documents",
    pcp: "$0 copay",
    specialist: "$35 copay",
    stars: "See Medicare.gov",
    source: "2025 Summary of Benefits",
  },
  {
    plan: "Aetna Medicare Value (PPO)",
    carrier: "Aetna",
    premium: "$0",
    deductible: "$0",
    moop: "$6,750",
    pcp: "$0 copay",
    specialist: "Varies",
    stars: "See Medicare.gov",
    source: "2025 Summary of Benefits",
  },
  {
    plan: "HumanaChoice Regional PPO",
    carrier: "Humana",
    premium: "$0",
    deductible: "$0",
    moop: "$7,550",
    pcp: "Varies",
    specialist: "Varies",
    stars: "See Medicare.gov",
    source: "NC DOI 2025 MA landscape",
  },
  {
    plan: "Blue Medicare Freedom+ (PPO)",
    carrier: "Blue Cross NC",
    premium: "$0",
    deductible: "$0",
    moop: "$9,350",
    pcp: "Varies",
    specialist: "Varies",
    stars: "See Medicare.gov",
    source: "NC DOI 2025 MA landscape",
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
    { label: "Part B premium (2025 standard)", amount: partBYearly },
    { label: `Medigap Plan G premium (est., age ${Math.min(74, Math.max(65, Math.round(input.age)))})`, amount: medigapYearlyPremium },
    { label: "Standalone Part D premium (est.)", amount: partDYearly },
    { label: "Part B deductible (Plan G does not cover it)", amount: PART_B_DEDUCTIBLE },
    { label: `Drugs (${input.meds}/mo, est.)`, amount: drugYearly },
  ];

  const maLines = [
    { label: "Part B premium (2025 standard)", amount: partBYearly },
    { label: "MA plan premium (typical $0 plan)", amount: 0 },
    { label: `Doctor visits (${input.visits}/yr, est. copays)`, amount: visitCost },
    { label: "Part D deductible (if you take drugs)", amount: maDrugDeductible },
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
    a: "The Medicare Advantage figures come from published 2025 Summaries of Benefits and the NC Department of Insurance 2025 plan landscape. The Medigap Plan G premiums are Blue Cross NC's filed non-tobacco rates by age. Plan availability and prices vary by county and change every year, so always verify current details on Medicare.gov before deciding anything.",
  },
  {
    q: "Does this calculator recommend a plan?",
    a: "No. It estimates yearly costs two different ways so you can see the tradeoff: Medigap costs more every month but caps surprises, while Medicare Advantage usually costs less monthly but you pay as you go. Which fits you depends on your health, doctors, drugs, and budget. Talk to a licensed agent before enrolling.",
  },
  {
    q: "Why does Medicare Advantage look cheaper here?",
    a: "Most MA plans in Guilford County have $0 monthly premiums, so the estimate starts lower. But the estimate assumes average health. A bad year with hospital stays can push MA costs toward the plan's maximum out-of-pocket, which runs $4,900 to $9,350 on 2025 NC plans. Medigap Plan G has no such ceiling risk because it covers nearly all cost sharing after the Part B deductible.",
  },
  {
    q: "What is missing from these estimates?",
    a: "Dental, vision, and hearing extras some MA plans bundle; drug costs beyond generics; any Part B late-enrollment penalty; and income-related premium surcharges (IRMAA). The Medigap premium shown is one carrier's filed rate, and your actual quote depends on the insurer, your exact age, and tobacco use.",
  },
  {
    q: "Do I still pay the Part B premium with Medicare Advantage?",
    a: "Yes. Almost everyone pays the Part B premium ($185/month in 2025) no matter which path they take. A few MA plans give part of it back, but that is the exception, not the rule.",
  },
];

export const HOW_TO_STEPS = [
  "Enter your age, ZIP code, how many prescriptions you take each month, and roughly how many doctor visits you make in a year.",
  "Read the two estimates side by side: Medigap Plan G and a typical $0-premium Medicare Advantage plan.",
  "Expand each line to see what goes into the number, and remember every figure is an estimate for education, not a quote.",
  "Bring the printout to a licensed agent to compare real plans available in Guilford County for your situation.",
];
