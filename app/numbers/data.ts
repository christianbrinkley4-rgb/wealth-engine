/**
 * The /numbers hub dataset. Every figure here is already verified on this
 * site; each row names the source file where the figure appears verbatim.
 * The fall update procedure lives in docs/NUMBERS-UPDATE-PLAYBOOK.md.
 */

export const LAST_UPDATED_LABEL = "November 18, 2026";
export const LAST_UPDATED_ISO = "2026-11-18";

/** Cell values that are status notes, not figures, and are exempt from the source-file cross-check. */
export const NON_FIGURE_CELLS = new Set(["Not yet announced", "See note"]);

export type FigureRow = {
  label: string;
  y2026: string;
  y2027: string;
  note?: string;
  /** Repo-relative path of the site-verified source file carrying this figure. */
  sourceFile: string;
};

export type NumbersSection = {
  id: string;
  heading: string;
  intro: string;
  sourceLabel: string;
  sourceUrl: string;
  rows: FigureRow[];
};

const TAX_SRC = "lib/irsSsaFigures.ts";

const TAX_BRACKETS: FigureRow[] = [
  { label: "10%", y2026: "$0 to $12,400", y2027: "$0 to $12,800", sourceFile: TAX_SRC },
  { label: "12%", y2026: "$12,401 to $50,400", y2027: "$12,801 to $52,025", sourceFile: TAX_SRC },
  { label: "22%", y2026: "$50,401 to $105,700", y2027: "$52,026 to $109,125", sourceFile: TAX_SRC },
  { label: "24%", y2026: "$105,701 to $201,775", y2027: "$109,126 to $208,325", sourceFile: TAX_SRC },
  { label: "32%", y2026: "$201,776 to $256,225", y2027: "$208,326 to $264,550", sourceFile: TAX_SRC },
  { label: "35%", y2026: "$256,226 to $640,600", y2027: "$264,551 to $661,375", sourceFile: TAX_SRC },
  { label: "37%", y2026: "Over $640,600", y2027: "Over $661,375", sourceFile: TAX_SRC },
];

const TAX_BRACKETS_MFJ: FigureRow[] = [
  { label: "10%", y2026: "$0 to $24,800", y2027: "$0 to $25,600", sourceFile: TAX_SRC },
  { label: "12%", y2026: "$24,801 to $100,800", y2027: "$25,601 to $104,050", sourceFile: TAX_SRC },
  { label: "22%", y2026: "$100,801 to $211,400", y2027: "$104,051 to $218,250", sourceFile: TAX_SRC },
  { label: "24%", y2026: "$211,401 to $403,550", y2027: "$218,251 to $416,650", sourceFile: TAX_SRC },
  { label: "32%", y2026: "$403,551 to $512,450", y2027: "$416,651 to $529,100", sourceFile: TAX_SRC },
  { label: "35%", y2026: "$512,451 to $768,700", y2027: "$529,101 to $793,650", sourceFile: TAX_SRC },
  { label: "37%", y2026: "Over $768,700", y2027: "Over $793,650", sourceFile: TAX_SRC },
];

export const SECTIONS: NumbersSection[] = [
  {
    id: "tax",
    heading: "Federal income tax",
    intro:
      "The brackets slice your income into layers, each taxed at its own rate. The standard deduction comes off before any bracket math.",
    sourceLabel: "IRS Revenue Procedure 2026-35 (tax year 2027) and 2025-70 (tax year 2026)",
    sourceUrl:
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2027-taxpayers-continue-to-benefit-from-the-working-families-tax-cuts",
    rows: [
      {
        label: "Standard deduction, single",
        y2026: "$16,100",
        y2027: "$16,600",
        note: "65 or older: $18,150 in 2026, $18,700 in 2027",
        sourceFile: TAX_SRC,
      },
      {
        label: "Standard deduction, married filing jointly",
        y2026: "$32,200",
        y2027: "$33,200",
        note: "Both spouses 65 or older: $35,500 in 2026, $36,600 in 2027",
        sourceFile: TAX_SRC,
      },
      {
        label: "Senior bonus deduction (65+, 2025-2028)",
        y2026: "$6,000",
        y2027: "$6,000",
        note: "Per person 65 or older, 2025 through 2028. It phases out at higher incomes.",
        sourceFile: TAX_SRC,
      },
    ],
  },
  {
    id: "tax-brackets",
    heading: "2026 and 2027 federal tax brackets",
    intro:
      "Find your filing status and read down. Only the dollars inside each layer face that layer's rate. The IRS released the 2027 brackets on November 5, 2026.",
    sourceLabel: "IRS Revenue Procedure 2026-35 (tax year 2027) and 2025-70 (tax year 2026)",
    sourceUrl:
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2027-taxpayers-continue-to-benefit-from-the-working-families-tax-cuts",
    rows: TAX_BRACKETS,
  },
  {
    id: "tax-brackets-mfj",
    heading: "2026 and 2027 federal tax brackets, married filing jointly",
    intro: "Same layers, wider. These apply to taxable income for tax years 2026 and 2027.",
    sourceLabel: "IRS Revenue Procedure 2026-35 (tax year 2027) and 2025-70 (tax year 2026)",
    sourceUrl:
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2027-taxpayers-continue-to-benefit-from-the-working-families-tax-cuts",
    rows: TAX_BRACKETS_MFJ,
  },
  {
    id: "retirement",
    heading: "Retirement accounts",
    intro:
      "Employee limits cover 401(k), 403(b), and governmental 457(b) plans. The IRA limit covers traditional and Roth IRAs combined: one bucket, not one per account.",
    sourceLabel: "IRS IR-2026-136, 2027 limits, and IRS 2026 retirement plan and IRA contribution limits",
    sourceUrl:
      "https://www.irs.gov/newsroom/401k-limit-increases-to-25500-for-2027-ira-limit-remains-7500",
    rows: [
      {
        label: "401(k) / 403(b) / 457(b), under 50",
        y2026: "$24,500",
        y2027: "$25,500",
        sourceFile: TAX_SRC,
      },
      {
        label: "401(k) / 403(b) / 457(b), age 50+",
        y2026: "$32,500",
        y2027: "$34,000",
        note: "Includes the $8,000 catch-up in 2026, $8,500 in 2027",
        sourceFile: TAX_SRC,
      },
      {
        label: "401(k), ages 60 to 63",
        y2026: "$35,750",
        y2027: "$37,250",
        note: "Includes the $11,250 super catch-up in 2026, $11,750 in 2027",
        sourceFile: TAX_SRC,
      },
      {
        label: "IRA (traditional + Roth combined), under 50",
        y2026: "$7,500",
        y2027: "$7,500",
        sourceFile: TAX_SRC,
      },
      {
        label: "IRA (traditional + Roth combined), age 50+",
        y2026: "$8,600",
        y2027: "$8,600",
        note: "Includes the $1,100 catch-up",
        sourceFile: TAX_SRC,
      },
    ],
  },
  {
    id: "hsa",
    heading: "Health savings accounts",
    intro:
      "HSA money gets three tax breaks: tax-free in, tax-free growth, tax-free out for medical costs. You must be in a qualifying high-deductible health plan to contribute.",
    sourceLabel: "IRS Rev. Proc. 2026-24 and IRS Publication 969",
    sourceUrl: "https://www.irs.gov/pub/irs-drop/rp-26-24.pdf",
    rows: [
      {
        label: "HSA, self-only coverage",
        y2026: "$4,400",
        y2027: "$4,500",
        sourceFile: TAX_SRC,
      },
      {
        label: "HSA, family coverage",
        y2026: "$8,750",
        y2027: "$9,000",
        sourceFile: TAX_SRC,
      },
      {
        label: "HSA catch-up, age 55+",
        y2026: "$1,000",
        y2027: "$1,000",
        note: "Adds to your coverage limit. Set by law, not indexed.",
        sourceFile: TAX_SRC,
      },
    ],
  },
  {
    id: "social-security",
    heading: "Social Security",
    intro:
      "The wage base is the most earnings Social Security taxes in a year. The cost-of-living adjustment moves benefits each January.",
    sourceLabel: "SSA 2027 COLA announcement, October 14, 2026",
    sourceUrl: "https://www.ssa.gov/news/en/press/releases/2026-10-14.html",
    rows: [
      {
        label: "Taxable earnings cap (wage base)",
        y2026: "$184,500",
        y2027: "$192,300",
        note: "6.2% each from worker and employer up to the cap. 2027 figure: SSA Federal Register notice, October 26, 2026.",
        sourceFile: TAX_SRC,
      },
      {
        label: "Cost-of-living adjustment",
        y2026: "2.8%",
        y2027: "3.6%",
        note: "Announced October 14, 2026. Higher payments start in January 2027.",
        sourceFile: TAX_SRC,
      },
    ],
  },
  {
    id: "medicare",
    heading: "Medicare",
    intro:
      "Part A, Part B, and Part D figures for 2027 are final. CMS announced the Part A and Part B amounts on November 17, 2026.",
    sourceLabel: "CMS fact sheets and CY2027 Rate Announcement",
    sourceUrl: "https://www.cms.gov/newsroom/fact-sheets",
    rows: [
      {
        label: "Part B standard premium",
        y2026: "$202.90 / month",
        y2027: "$209.40 / month",
        note: "Final, CMS 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
      {
        label: "Part B annual deductible",
        y2026: "$283",
        y2027: "$292",
        note: "Final, CMS 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
      {
        label: "Part D standard deductible (max)",
        y2026: "$615",
        y2027: "$700",
        note: "Final, CMS CY2027 Rate Announcement, April 6, 2026",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
      {
        label: "Part D out-of-pocket cap",
        y2026: "$2,100",
        y2027: "$2,400",
        note: "Final. Once you hit the cap, covered drugs cost $0 the rest of the year",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
      {
        label: "Part A hospital deductible",
        y2026: "$1,736",
        y2027: "$1,776",
        note: "Final, CMS 2027 Medicare Parts A & B Premiums and Deductibles, November 17, 2026. Most people pay no Part A premium",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
      {
        label: "Medicare Advantage average premium",
        y2026: "See note",
        y2027: "~$12 / month",
        note: "CMS projection, September 28, 2026. National average; your plan's actual premium is what matters",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
    ],
  },
];

export const IRMAA_NOTE = {
  heading: "IRMAA: higher income means higher Medicare premiums",
  body: "The income-related surcharge starts above $112,000 single or $224,000 filing jointly in 2027. It uses your 2025 tax return. A big Roth conversion or property sale can raise premiums two years later.",
  linkHref: "/medicare-costs-2027",
  linkLabel: "See the full 2027 IRMAA table",
  sourceFile: "app/medicare-costs-2027/page.tsx",
};
