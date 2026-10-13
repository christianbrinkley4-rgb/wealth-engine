/** The thirteen standalone /guides pages, with their card-grid descriptions. */
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
];

