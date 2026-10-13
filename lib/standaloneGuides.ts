/** The standalone /guides pages, with their card-grid descriptions. */
export const STANDALONE_GUIDES: Array<{
  slug: string;
  title: string;
  description: string;
  related: Array<{ title: string; href: string }>;
}> = [
  {
    slug: "what-medicare-does-not-cover",
    title: "What Medicare doesn't cover",
    description:
      "Original Medicare leaves real gaps: dental, vision, hearing aids, long-term care, and more. The full list, plus how people fill each gap. Read the guide.",
    related: [
      { title: "Medicare while traveling", href: "/guides/medicare-travel" },
      { title: "2026 IRMAA brackets", href: "/guides/irmaa-brackets-2026" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Questions about Medigap or Advantage", href: "/tools/medigap-or-advantage-quiz" },
    ],
  },
  {
    slug: "medicare-hsa-contributions",
    title: "Medicare and HSA contributions",
    description:
      "You cannot contribute to an HSA once you enroll in any part of Medicare. The 6-month retroactive Part A trap, what stays yours, and what to do.",
    related: [
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
      { title: "Part B and employer coverage", href: "/guides/medicare-part-b-employer-coverage" },
      { title: "HSA, explained", href: "/wealth/hsa-explained" },
    ],
  },
  {
    slug: "working-while-collecting-social-security",
    title: "Working while collecting Social Security",
    description:
      "How much you can earn in 2026 while collecting Social Security: the exact limits before full retirement age and in the year you reach it.",
    related: [
      { title: "Is Social Security taxed?", href: "/guides/is-social-security-taxed" },
      { title: "Social Security: claim at 62 or 70?", href: "/guides/social-security-62-vs-70" },
      { title: "2026 standard deduction for seniors", href: "/guides/standard-deduction-seniors-2026" },
    ],
  },
  {
    slug: "is-social-security-taxed",
    title: "Is Social Security taxed?",
    description:
      "Up to 85% of Social Security can be taxed federally, based on combined income. The 2026 thresholds and the math.",
    related: [
      { title: "Working while collecting Social Security", href: "/guides/working-while-collecting-social-security" },
      { title: "2026 standard deduction for seniors", href: "/guides/standard-deduction-seniors-2026" },
      { title: "Social Security, explained", href: "/wealth/social-security-explained" },
    ],
  },
  {
    slug: "missed-medicare-enrollment",
    title: "Missed Medicare enrollment",
    description:
      "Missed a Medicare enrollment deadline? Renewal notices, special enrollment rights, and when coverage can start after you sign up.",
    related: [
      { title: "Medicare automatic renewal", href: "/guides/medicare-automatic-renewal" },
      { title: "Part B and employer coverage", href: "/guides/medicare-part-b-employer-coverage" },
      { title: "Special enrollment periods", href: "/special-enrollment" },
    ],
  },
  {
    slug: "medicare-automatic-renewal",
    title: "Medicare automatic renewal",
    description:
      "Medicare renews automatically each year. No forms, no re-enrollment. When you actually need to act, and why your card has no expiration date.",
    related: [
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
      { title: "Annual enrollment", href: "/aep" },
      { title: "What Medicare doesn't cover", href: "/guides/what-medicare-does-not-cover" },
    ],
  },
  {
    slug: "medicare-part-b-employer-coverage",
    title: "Part B and employer coverage",
    description:
      "Working past 65? Whether you need Part B depends on your employer's size. The 20-employee rule and the 8-month special enrollment period.",
    related: [
      { title: "Medicare and HSA contributions", href: "/guides/medicare-hsa-contributions" },
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
      { title: "Special enrollment periods", href: "/special-enrollment" },
    ],
  },
  {
    slug: "medicare-travel",
    title: "Medicare while traveling",
    description:
      "Original Medicare works in every state. Medicare Advantage depends on your plan type. Emergency care is covered nationwide.",
    related: [
      { title: "What Medicare doesn't cover", href: "/guides/what-medicare-does-not-cover" },
      { title: "Medicare Advantage doctor networks", href: "/medicare-advantage-doctor-networks" },
      { title: "Turning 65 checklist", href: "/turning-65" },
    ],
  },
  {
    slug: "irmaa-brackets-2026",
    title: "2026 IRMAA brackets",
    description:
      "The full 2026 IRMAA table: income thresholds, Part B premiums, and Part D surcharges by bracket, plus the 2-year lookback.",
    related: [
      { title: "Is Social Security taxed?", href: "/guides/is-social-security-taxed" },
      { title: "Medicare costs in 2026", href: "/medicare-costs-2026" },
      { title: "Appealing IRMAA", href: "/irmaa-appeal" },
    ],
  },
  {
    slug: "standard-deduction-seniors-2026",
    title: "2026 standard deduction for seniors",
    description:
      "The 2026 standard deduction plus the extra amount at 65 and older, with the numbers for single and joint filers.",
    related: [
      { title: "Is Social Security taxed?", href: "/guides/is-social-security-taxed" },
      { title: "Working while collecting Social Security", href: "/guides/working-while-collecting-social-security" },
      { title: "Tax brackets, explained plainly", href: "/wealth/tax-brackets-explained-plainly" },
    ],
  },
  {
    slug: "cone-health-medicare-doctors",
    title: "Cone Health doctors and Medicare",
    description:
      "Which Medicare plans work with Cone Health doctors? Networks change every fall. The two-step check that makes sure your doctors are in your plan.",
    related: [
      { title: "Medicare Advantage doctor networks", href: "/medicare-advantage-doctor-networks" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "nc-state-health-plan-medicare",
    title: "NC State Health Plan retirees and Medicare",
    description:
      "Turning 65 as an NC state retiree? The Part A and B requirement, your three retiree options, and the deadlines that matter.",
    related: [
      { title: "Turning 65 checklist", href: "/turning-65" },
      { title: "Annual Enrollment review", href: "/aep" },
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
    ],
  },
  {
    slug: "moving-to-north-carolina-medicare",
    title: "Moving to North Carolina on Medicare",
    description:
      "Retiring to the Triad? Your move opens a special enrollment period. What follows you, what needs checking, and the before-and-after checklist.",
    related: [
      { title: "Special enrollment periods", href: "/special-enrollment" },
      { title: "Medicare while traveling", href: "/guides/medicare-travel" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
    ],
  },
  {
    slug: "medicare-advantage-plans-leaving-nc-2027",
    title: "Medicare Advantage plans leaving NC in 2027",
    description:
      "Verified 2027 plan exits, how to read your ANOC or non-renewal letter, and what to do before December 7.",
    related: [
      { title: "Annual Enrollment review", href: "/aep" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
    ],
  },
  {
    slug: "medigap-plan-g-vs-plan-n-nc",
    title: "Medigap Plan G vs Plan N",
    description:
      "The real differences between the two most popular Medigap plans: excess charges, copays, and the cost tradeoff.",
    related: [
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Medicare and HSA contributions", href: "/guides/medicare-hsa-contributions" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "turning-65-aca-marketplace-plan",
    title: "Turning 65 on a Marketplace plan",
    description:
      "Your subsidies end at 65. The enrollment timing, the cancellation step people forget, and the HSA trap.",
    related: [
      { title: "Turning 65 checklist", href: "/turning-65" },
      { title: "Medicare and HSA contributions", href: "/guides/medicare-hsa-contributions" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "zero-premium-medicare-advantage-free",
    title: "Is a $0 premium plan really free?",
    description:
      "The premium is only one line item. Deductibles, copays, networks, and drug costs are where the real bill lives.",
    related: [
      { title: "Annual Enrollment review", href: "/aep" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
    ],
  },
  {
    slug: "cobra-vs-medicare-at-65",
    title: "COBRA vs. Medicare at 65",
    description:
      "COBRA does not count as creditable coverage for Part B. The 8-month rule that trips people up, and the permanent penalty.",
    related: [
      { title: "Turning 65 checklist", href: "/turning-65" },
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medicare-in-home-care",
    title: "Does Medicare pay for in-home care?",
    description:
      "Medicare covers skilled, short-term home health. It does not cover long-term custodial care. Where the line falls.",
    related: [
      { title: "Free Medicare help in the Triad", href: "/medicare-help-directory" },
      { title: "Medicare scams to watch for", href: "/medicare-scam-alert" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "extra-help-medicare-savings-programs-nc",
    title: "Extra Help and Medicare Savings Programs in NC",
    description:
      "Two programs that lower Medicare costs for people with limited income. Who qualifies and how to apply in North Carolina.",
    related: [
      { title: "Free Medicare help in the Triad", href: "/medicare-help-directory" },
      { title: "Annual Enrollment review", href: "/aep" },
      { title: "Turning 65 checklist", href: "/turning-65" },
    ],
  },
  {
    slug: "medicare-flex-card",
    title: "Is the Medicare flex card real?",
    description:
      "Some private plans include a prepaid card. Medicare doesn't issue one. What's a real benefit, what's marketing, and what's a scam.",
    related: [
      { title: "Medicare scams to watch for", href: "/medicare-scam-alert" },
      { title: "Is a $0 premium plan really free?", href: "/guides/zero-premium-medicare-advantage-free" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medicare-spouse-younger-than-65",
    title: "Medicare when your spouse is under 65",
    description:
      "Medicare doesn't cover spouses. How a younger spouse stays insured, and what to check before you leave your employer plan.",
    related: [
      { title: "Part B and employer coverage", href: "/guides/medicare-part-b-employer-coverage" },
      { title: "COBRA vs. Medicare at 65", href: "/guides/cobra-vs-medicare-at-65" },
      { title: "Turning 65 checklist", href: "/turning-65" },
    ],
  },
  {
    slug: "observation-status-three-day-rule",
    title: "Observation status and the 3-day rule",
    description:
      "Nights in a hospital bed don't always count as inpatient days. How that affects your bill and skilled nursing coverage.",
    related: [
      { title: "Does Medicare pay for in-home care?", href: "/guides/medicare-in-home-care" },
      { title: "What Medicare doesn't cover", href: "/guides/what-medicare-does-not-cover" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medigap-premium-increase",
    title: "Why did my Medigap premium go up?",
    description:
      "Age-based pricing, rising costs, and ending discounts. What you can do in North Carolina, and why you never cancel first.",
    related: [
      { title: "Medigap Plan G vs Plan N", href: "/guides/medigap-plan-g-vs-plan-n-nc" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medicare-prescription-payment-plan",
    title: "The Medicare Prescription Payment Plan",
    description:
      "Pay Part D drug costs in monthly bills instead of at the pharmacy. It doesn't lower costs. Who it helps and who it doesn't.",
    related: [
      { title: "Medicare costs 2027", href: "/medicare-costs-2027" },
      { title: "Extra Help and Medicare Savings Programs in NC", href: "/guides/extra-help-medicare-savings-programs-nc" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medicare-and-va-benefits",
    title: "Medicare and VA benefits",
    description:
      "VA care and Medicare don't pay each other's bills. What Medicare adds, and why VA coverage doesn't protect you from the Part B penalty.",
    related: [
      { title: "Estimate a Part B late penalty", href: "/part-b-penalty" },
      { title: "Turning 65 checklist", href: "/turning-65" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "chronic-condition-special-needs-plans",
    title: "C-SNPs: who qualifies",
    description:
      "Medicare Advantage plans built around one chronic condition. Who qualifies, when you can join, and what to check first.",
    related: [
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Special enrollment periods", href: "/special-enrollment" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medicare-advantage-prior-authorization",
    title: "Prior authorization in Medicare Advantage",
    description:
      "What needs approval, how to avoid surprises, and the appeal steps and deadlines if your plan says no.",
    related: [
      { title: "Medicare Advantage doctor networks", href: "/medicare-advantage-doctor-networks" },
      { title: "AEP checklist", href: "/aep-checklist" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "switching-medicare-advantage-to-medigap-nc",
    title: "Switching from Advantage to Medigap in NC",
    description:
      "Leaving Medicare Advantage is guaranteed. Getting a Medigap policy in North Carolina usually isn't. When you have a guaranteed right, and the safe order of steps.",
    related: [
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { title: "Medigap Plan G vs Plan N", href: "/guides/medigap-plan-g-vs-plan-n-nc" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
  {
    slug: "medicare-under-65-disability-nc",
    title: "Medicare under 65 on disability in NC",
    description:
      "Medicare usually starts 24 months into SSDI. North Carolina gives you six months to buy a Medigap Plan A, D, or G, and a fresh window at 65.",
    related: [
      { title: "Extra Help and Medicare Savings Programs in NC", href: "/guides/extra-help-medicare-savings-programs-nc" },
      { title: "Switching from Advantage to Medigap in NC", href: "/guides/switching-medicare-advantage-to-medigap-nc" },
      { title: "Annual Enrollment review", href: "/aep" },
    ],
  },
];

