/** Primary references checked during the October audit. */
export const SOURCES = {
  ira: {
    label: "IRS: retirement contribution limits",
    href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
  },
  distributions: {
    label: "IRS Publication 590-B: IRA withdrawals and tables",
    href: "https://www.irs.gov/publications/p590b",
  },
  catchup: {
    label: "IRS: catch-up contribution rules",
    href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions",
  },
  tax: {
    label: "IRS: federal brackets and standard deductions",
    href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf",
  },
  senior: {
    label: "IRS: additional deduction for seniors",
    href: "https://www.irs.gov/newsroom/check-your-eligibility-for-the-new-enhanced-deduction-for-seniors",
  },
  earnings: {
    label: "SSA: retirement earnings test",
    href: "https://www.ssa.gov/oact/cola/rtea.html",
  },
  payroll: {
    label: "SSA: payroll tax rates and wage base",
    href: "https://www.ssa.gov/oact/cola/cbb.html",
  },
  additional: {
    label: "IRS: Additional Medicare Tax",
    href: "https://www.irs.gov/taxtopics/tc560",
  },
  ncDeduction: {
    label: "NCDOR: state standard deductions",
    href: "https://www.ncdor.gov/taxes-forms/individual-income-tax/filing-topics/north-carolina-standard-deduction-or-north-carolina-itemized-deductions",
  },
  ncRate: {
    label: "NCDOR: state tax rates",
    href: "https://www.ncdor.gov/documents/reports/north-carolina-biennial-tax-expenditure-report-2025pdf/open",
  },
  cms: {
    label: "CMS: Medicare premiums and income brackets",
    href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
  },
  hsa: { label: "IRS: HSA inflation adjustments", href: "https://www.irs.gov/irb/2025-21_IRB" },
  hsaRules: {
    label: "IRS Publication 969: HSA eligibility and withdrawals",
    href: "https://www.irs.gov/publications/p969",
  },
  hsaChanges: {
    label: "IRS: bronze and catastrophic plan eligibility",
    href: "https://www.irs.gov/irb/2026-02_IRB",
  },
  rmd: {
    label: "IRS: required minimum distributions",
    href: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
  },
} as const;

export type Source = { label: string; href: string };

export const ROTH_DEFINITION = {
  name: "Roth IRA",
  text: "A Roth IRA is an individual retirement account funded with after-tax money. Contributions are not deductible. Qualified withdrawals, including earnings, are tax-free. Investments can lose value.",
  sources: [SOURCES.ira, SOURCES.distributions],
};
