/**
 * Data behind the Greensboro Medicare cost calculator.
 *
 * FIGURES REVIEW, November 19, 2026. Every 2027 figure was checked against
 * CMS. The result for each figure is in FIGURE_LABELS below, with its year,
 * its status, and its source. The page prints that table.
 *
 * - Part B premium ($209.40) and deductible ($292): FINAL for 2027. CMS,
 *   2027 Medicare Parts A & B Premiums and Deductibles, announced
 *   November 17, 2026:
 *   https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles
 * - Part D maximum deductible ($700) and out-of-pocket cap ($2,400): FINAL for
 *   2027. CMS, Announcement of Calendar Year 2027 Medicare Advantage
 *   Capitation Rates and Part C and Part D Payment Policies, April 6, 2026,
 *   Table V-2: https://www.cms.gov/files/document/2027-announcement.pdf
 * - Average standalone Part D premium (about $36) and national average
 *   Medicare Advantage premium ($12.00): CMS PROJECTIONS for 2027, press
 *   release of September 28, 2026:
 *   https://www.cms.gov/newsroom/press-releases/medicare-advantage-medicare-prescription-drug-programs-expected-remain-stable-2027
 * - Guilford County plan count (55), average premium ($4.13) and average
 *   maximum out-of-pocket ($7,055.45): a THIRD-PARTY SUMMARY published by
 *   MedicareAdvantage.com. These are not CMS announcements and were not
 *   verified against the CMS landscape file in this review. Note: the CMS
 *   landscape data already in this repo (lib/ncLandscape2027.ts) counts 57
 *   Guilford County plans for 2027 under its own counting rules.
 * - Medigap Plan G premiums: one insurer's filed non-tobacco attained-age
 *   rates for June 2026 to May 2027 (rate outline at nchealthplans.com).
 *   Averaged male and female below. FILED RATE, not an estimate of any quote.
 * - Copay per doctor visit ($20) and drug cost per prescription ($12 a month):
 *   PLANNING ESTIMATES. They have no source. They are not CMS figures.
 *
 * Nothing here is a recommendation. Every result is an estimate.
 */

/** The day the figures above were last checked against their sources. */
export const FIGURES_REVIEWED = "2026-11-19";

export const META = {
  title: "Greensboro Medicare Cost Calculator: Medigap vs Medicare Advantage",
  description:
    "Estimate yearly Medicare costs in Greensboro, NC. Compare Medigap Plan G with $0-premium Medicare Advantage (you still pay your Part B premium). No signup.",
};

export const PATH = "/greensboro-medicare-cost-calculator";

/**
 * 2027 FINAL standard Part B premium and deductible.
 * Source: CMS, 2027 Medicare Parts A & B Premiums and Deductibles,
 * announced November 17, 2026.
 */
export const PART_B_MONTHLY = 209.4;
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
 * 2027 PROJECTED average standalone Part D premium (about $36 a month).
 * Source: CMS press release, September 28, 2026 ("from $35.09 in 2026 to $36
 * in 2027"). A CMS projection, not a final figure.
 */
export const PART_D_MONTHLY_ESTIMATE = 36;

/**
 * PLANNING ESTIMATE, no source. A blended copay per doctor visit for the
 * Medicare Advantage path. Not a CMS figure and not any plan's copay.
 */
export const MA_AVG_COPAY_PER_VISIT = 20;

/**
 * 2027 FINAL Part D maximum deductible ($700). Source: CMS 2027 Rate
 * Announcement, April 6, 2026, Table V-2. Used as the highest a plan may
 * charge. A plan may set a lower drug deductible.
 */
export const MA_PART_D_DEDUCTIBLE = 700;

/**
 * PLANNING ESTIMATE, no source. A rough monthly cost for one generic
 * prescription. Not a CMS figure and not any plan's price.
 */
export const DRUG_MONTHLY_PER_MED_ESTIMATE = 12;

export interface MaLandscapeRow {
  metric: string;
  value: string;
  source: string;
}

/**
 * 2027 Medicare Advantage landscape for Guilford County, NC.
 * The three county rows are a third-party summary (MedicareAdvantage.com),
 * not a CMS announcement. The last three rows are CMS figures.
 * Individual plan premiums, deductibles, and copays vary; verify any specific
 * plan on Medicare.gov before deciding.
 */
const THIRD_PARTY_COUNTY_SOURCE =
  "MedicareAdvantage.com county summary (third party, not a CMS announcement)";

export const MA_LANDSCAPE_2027: MaLandscapeRow[] = [
  {
    metric: "Medicare Advantage plans available in Guilford County",
    value: "55",
    source: THIRD_PARTY_COUNTY_SOURCE,
  },
  {
    metric: "Average monthly premium",
    value: "$4.13",
    source: THIRD_PARTY_COUNTY_SOURCE,
  },
  {
    metric: "Average maximum out-of-pocket",
    value: "$7,055.45",
    source: THIRD_PARTY_COUNTY_SOURCE,
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

export type FigureStatus =
  | "Final"
  | "Projection"
  | "Planning estimate"
  | "Filed rate"
  | "Third-party summary";

export interface FigureLabel {
  figure: string;
  value: string;
  /** The year, or the period, the figure applies to. */
  year: string;
  status: FigureStatus;
  /** Who published it. "None" for a planning estimate. */
  source: string;
  /** Present only when the source is an official page that was opened and read. */
  sourceUrl?: string;
}

const CMS_2027_ANNOUNCEMENT_URL = "https://www.cms.gov/files/document/2027-announcement.pdf";
const CMS_2027_STABLE_RELEASE_URL =
  "https://www.cms.gov/newsroom/press-releases/medicare-advantage-medicare-prescription-drug-programs-expected-remain-stable-2027";

const usd = (value: number, cents = false) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  });

/**
 * Every figure the calculator uses in its math, with year, status and source.
 * The values come from the constants above, so the table cannot drift from
 * the math. The page prints this table.
 */
export const FIGURE_LABELS: FigureLabel[] = [
  {
    figure: "Part B premium, per month",
    value: usd(PART_B_MONTHLY, true),
    year: "2027",
    status: "Final",
    source: "CMS, 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026",
    sourceUrl: "https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles",
  },
  {
    figure: "Part B deductible, per year",
    value: usd(PART_B_DEDUCTIBLE),
    year: "2027",
    status: "Final",
    source: "CMS, 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026",
    sourceUrl: "https://www.cms.gov/newsroom/fact-sheets/2027-medicare-parts-b-premiums-deductibles",
  },
  {
    figure: "Part D maximum deductible",
    value: usd(MA_PART_D_DEDUCTIBLE),
    year: "2027",
    status: "Final",
    source: "CMS, 2027 Rate Announcement, April 6, 2026, Table V-2",
    sourceUrl: CMS_2027_ANNOUNCEMENT_URL,
  },
  {
    figure: "Average standalone Part D premium, per month",
    value: `About ${usd(PART_D_MONTHLY_ESTIMATE)}`,
    year: "2027",
    status: "Projection",
    source: "CMS press release, September 28, 2026",
    sourceUrl: CMS_2027_STABLE_RELEASE_URL,
  },
  {
    figure: "Medigap Plan G premium, per month, by age",
    value: `${usd(MEDIGAP_G_MONTHLY_BY_AGE[65])} at 65 to ${usd(MEDIGAP_G_MONTHLY_BY_AGE[74])} at 74`,
    year: "June 2026 to May 2027",
    status: "Filed rate",
    source: "One insurer's filed non-tobacco rates, male and female averaged. See the table on this page.",
  },
  {
    figure: "Copay for one doctor visit, Medicare Advantage path",
    value: usd(MA_AVG_COPAY_PER_VISIT),
    year: "No year",
    status: "Planning estimate",
    source: "None. A planning number, not an official figure.",
  },
  {
    figure: "Cost of one prescription, per month",
    value: usd(DRUG_MONTHLY_PER_MED_ESTIMATE),
    year: "No year",
    status: "Planning estimate",
    source: "None. A planning number, not an official figure.",
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
    { label: "Part B premium (2027)", amount: partBYearly },
    { label: `Medigap Plan G premium (est., age ${Math.min(74, Math.max(65, Math.round(input.age)))})`, amount: medigapYearlyPremium },
    { label: "Standalone Part D premium (2027 projected avg)", amount: partDYearly },
    { label: "Part B deductible, 2027 (Plan G does not cover it)", amount: PART_B_DEDUCTIBLE },
    { label: `Drugs (${input.meds}/mo, est.)`, amount: drugYearly },
  ];

  const maLines = [
    { label: "Part B premium (2027)", amount: partBYearly },
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

/**
 * The short label stored with a lead from this calculator.
 *
 * The capture API keeps the first 100 characters. The label starts with the
 * tool name so the attribution report can count leads by tool. It carries
 * the two yearly estimates only. It never carries the prescription count or
 * the visit count.
 */
export function calculatorLeadLabel(result: CalcResult): string {
  const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  return `Cost calculator, 2027 Part B: Medigap est. ${usd(result.medigapYearly)}/yr, Advantage est. ${usd(result.maYearly)}/yr`.slice(
    0,
    100,
  );
}

export const FAQS = [
  {
    q: "Are these real Greensboro plan prices?",
    a: "The Guilford County figures (55 plans, $4.13 average monthly premium, $7,055.45 average max out-of-pocket) come from a county summary published by MedicareAdvantage.com. They are not official CMS announcements. The Medigap Plan G premiums are Blue Cross NC's filed non-tobacco rates by age. The Part B premium and deductible shown are the final 2027 amounts, announced by CMS on November 17, 2026. Plan availability and prices vary by county and change every year, so always verify current details on Medicare.gov before deciding anything.",
  },
  {
    q: "Does this calculator recommend a plan?",
    a: "No. It estimates yearly costs two different ways so you can see the tradeoff: Medigap costs more every month but caps surprises, while Medicare Advantage usually costs less monthly but you pay as you go. Which fits you depends on your health, doctors, drugs, and budget. Talk to a licensed agent before enrolling.",
  },
  {
    q: "Why does Medicare Advantage look cheaper here?",
    a: "Most MA plans in Guilford County have $0 monthly premiums, so the estimate starts lower. But the estimate assumes average health. A bad year with hospital stays can push MA costs toward the plan's maximum out-of-pocket, which averages $7,055.45 across Guilford County plans for 2027. Medigap Plan G has no such ceiling risk because it covers nearly all cost sharing after the Part B deductible.",
  },
  {
    q: "What is missing from these estimates?",
    a: "Dental, vision, and hearing extras some MA plans bundle; drug costs beyond generics; any Part B late-enrollment penalty; and income-related premium surcharges (IRMAA). The Medigap premium shown is one carrier's filed rate, and your actual quote depends on the insurer, your exact age, and tobacco use. The Part B figures are final. The $20 copay for a doctor visit and the $12 monthly cost for a prescription are planning estimates with no official source.",
  },
  {
    q: "Do I still pay the Part B premium with Medicare Advantage?",
    a: "Yes. Almost everyone pays the Part B premium ($209.40/month for 2027) no matter which path they take. A few MA plans give part of it back, but that is the exception, not the rule.",
  },
];

export const HOW_TO_STEPS = [
  "Enter your age, ZIP code, how many prescriptions you take each month, and roughly how many doctor visits you make in a year.",
  "Read the two estimates side by side: Medigap Plan G and a typical $0-premium Medicare Advantage plan.",
  "Expand each line to see what goes into the number, and remember every figure is an estimate for education, not a quote.",
  "Bring the printout to a licensed agent to compare real plans available in Guilford County for your situation.",
];
