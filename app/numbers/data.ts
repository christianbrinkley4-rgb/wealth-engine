/**
 * The /numbers hub dataset. Every figure here is already verified on this
 * site; each row names the source file where the figure appears verbatim.
 * The fall update procedure lives in docs/NUMBERS-UPDATE-PLAYBOOK.md.
 */

export const LAST_UPDATED_LABEL = "October 8, 2026";
export const LAST_UPDATED_ISO = "2026-10-08";

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

const TAX_BRACKETS: FigureRow[] = [
  { label: "10%", y2026: "$0 to $12,400", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "12%", y2026: "$12,401 to $50,400", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "22%", y2026: "$50,401 to $105,700", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "24%", y2026: "$105,701 to $201,775", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "32%", y2026: "$201,776 to $256,225", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "35%", y2026: "$256,226 to $640,600", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "37%", y2026: "Over $640,600", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
];

const TAX_BRACKETS_MFJ: FigureRow[] = [
  { label: "10%", y2026: "$0 to $24,800", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "12%", y2026: "$24,801 to $100,800", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "22%", y2026: "$100,801 to $211,400", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "24%", y2026: "$211,401 to $403,550", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "32%", y2026: "$403,551 to $512,450", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "35%", y2026: "$512,451 to $768,700", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
  { label: "37%", y2026: "Over $768,700", y2027: "Not yet announced", sourceFile: "app/wealth/tax-brackets-explained-plainly/page.tsx" },
];

export const SECTIONS: NumbersSection[] = [
  {
    id: "tax",
    heading: "Federal income tax",
    intro:
      "The brackets slice your income into layers, each taxed at its own rate. The standard deduction comes off before any bracket math.",
    sourceLabel: "IRS Revenue Procedure 2025-70 (tax year 2026 inflation adjustments)",
    sourceUrl:
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
    rows: [
      {
        label: "Standard deduction, single",
        y2026: "$16,100",
        y2027: "Not yet announced",
        note: "65 or older: $18,150",
        sourceFile: "app/guides/standard-deduction-seniors-2026/page.tsx",
      },
      {
        label: "Standard deduction, married filing jointly",
        y2026: "$32,200",
        y2027: "Not yet announced",
        note: "Both spouses 65 or older: $35,500",
        sourceFile: "app/guides/standard-deduction-seniors-2026/page.tsx",
      },
      {
        label: "Senior bonus deduction (65+, 2025-2028)",
        y2026: "$6,000",
        y2027: "Not yet announced",
        note: "Separate from the 65+ standard deduction add-on",
        sourceFile: "app/guides/standard-deduction-seniors-2026/page.tsx",
      },
    ],
  },
  {
    id: "tax-brackets",
    heading: "2026 federal tax brackets",
    intro:
      "Find your filing status and read down. Only the dollars inside each layer face that layer's rate. 2027 brackets land in October.",
    sourceLabel: "IRS tax year 2026 inflation adjustments",
    sourceUrl:
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
    rows: TAX_BRACKETS,
  },
  {
    id: "tax-brackets-mfj",
    heading: "2026 federal tax brackets, married filing jointly",
    intro: "Same layers, wider. These apply to taxable income for tax year 2026.",
    sourceLabel: "IRS tax year 2026 inflation adjustments",
    sourceUrl:
      "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
    rows: TAX_BRACKETS_MFJ,
  },
  {
    id: "retirement",
    heading: "Retirement accounts",
    intro:
      "Employee limits cover 401(k), 403(b), and governmental 457(b) plans. The IRA limit covers traditional and Roth IRAs combined: one bucket, not one per account.",
    sourceLabel: "IRS 2026 retirement plan and IRA contribution limits",
    sourceUrl:
      "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
    rows: [
      {
        label: "401(k) / 403(b) / 457(b), under 50",
        y2026: "$24,500",
        y2027: "Not yet announced",
        sourceFile: "app/wealth/401k-explained/page.tsx",
      },
      {
        label: "401(k) / 403(b) / 457(b), age 50+",
        y2026: "$32,500",
        y2027: "Not yet announced",
        note: "Includes the $8,000 catch-up",
        sourceFile: "app/wealth/catch-up-contributions-after-50/page.tsx",
      },
      {
        label: "401(k), ages 60 to 63",
        y2026: "$35,750",
        y2027: "Not yet announced",
        note: "Includes the $11,250 super catch-up",
        sourceFile: "app/wealth/catch-up-contributions-after-50/page.tsx",
      },
      {
        label: "IRA (traditional + Roth combined), under 50",
        y2026: "$7,500",
        y2027: "Not yet announced",
        sourceFile: "app/wealth/roth-ira-explained/page.tsx",
      },
      {
        label: "IRA (traditional + Roth combined), age 50+",
        y2026: "$8,600",
        y2027: "Not yet announced",
        note: "Includes the $1,100 catch-up",
        sourceFile: "app/wealth/catch-up-contributions-after-50/page.tsx",
      },
    ],
  },
  {
    id: "hsa",
    heading: "Health savings accounts",
    intro:
      "HSA money gets three tax breaks: tax-free in, tax-free growth, tax-free out for medical costs. You must be in a qualifying high-deductible health plan to contribute.",
    sourceLabel: "IRS Publication 969",
    sourceUrl: "https://www.irs.gov/publications/p969/",
    rows: [
      {
        label: "HSA, self-only coverage",
        y2026: "$4,400",
        y2027: "Not yet announced",
        sourceFile: "app/wealth/hsa-explained/page.tsx",
      },
      {
        label: "HSA, family coverage",
        y2026: "$8,750",
        y2027: "Not yet announced",
        sourceFile: "app/wealth/hsa-explained/page.tsx",
      },
      {
        label: "HSA catch-up, age 55+",
        y2026: "$1,000",
        y2027: "Not yet announced",
        note: "Adds to your coverage limit",
        sourceFile: "app/wealth/hsa-explained/page.tsx",
      },
    ],
  },
  {
    id: "social-security",
    heading: "Social Security",
    intro:
      "The wage base is the most earnings Social Security taxes in a year. The cost-of-living adjustment moves benefits each January.",
    sourceLabel: "SSA 2026 COLA fact sheet",
    sourceUrl: "https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf",
    rows: [
      {
        label: "Taxable earnings cap (wage base)",
        y2026: "$184,500",
        y2027: "Not yet announced",
        note: "6.2% each from worker and employer up to the cap",
        sourceFile: "app/wealth/social-security-explained/page.tsx",
      },
      {
        label: "Cost-of-living adjustment",
        y2026: "2.8%",
        y2027: "Not yet announced",
        note: "SSA announces the next adjustment each October",
        sourceFile: "app/wealth/social-security-explained/page.tsx",
      },
    ],
  },
  {
    id: "medicare",
    heading: "Medicare",
    intro:
      "Part D figures for 2027 are final. Part B numbers stay projected until CMS announces the real ones in November.",
    sourceLabel: "CMS fact sheets and CY2027 Rate Announcement",
    sourceUrl: "https://www.cms.gov/newsroom/fact-sheets",
    rows: [
      {
        label: "Part B standard premium",
        y2026: "$202.90 / month",
        y2027: "~$209.50 / month",
        note: "Projection, 2026 Medicare Trustees Report",
        sourceFile: "lib/medicareNumbers2027.ts",
      },
      {
        label: "Part B annual deductible",
        y2026: "$283",
        y2027: "~$292",
        note: "Projection, 2026 Medicare Trustees Report",
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
        y2027: "Not yet announced",
        note: "Most people pay no Part A premium",
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
  body: "The income-related surcharge starts at $109,000 single or $218,000 filing jointly (2026 surcharge year). It looks at your return from two years back, so a big Roth conversion or property sale can raise premiums two years later. If your income dropped since then, you can appeal with Form SSA-44.",
  linkHref: "/guides/irmaa-brackets-2026",
  linkLabel: "See the full 2026 IRMAA table",
  sourceFile: "app/guides/irmaa-brackets-2026/page.tsx",
};
