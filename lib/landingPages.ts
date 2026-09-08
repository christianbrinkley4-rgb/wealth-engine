/**
 * One landing page per ad angle.
 *
 * The single largest driver of both ad cost and conversion rate is message
 * match: the page has to say what the ad said. Somebody who clicked "what
 * happens to my 401(k) when I retire" and arrives on a general Medicare page
 * bounces, and the platform charges more for the next click because it can
 * see that happening. So each angle gets its own page rather than everything
 * pointing at the home page.
 *
 * Tag the ad URL and the rest measures itself — lib/attribution.ts already
 * stores utm_campaign and utm_content first-touch, and the lead_summary view
 * groups on them. For an A/B test put the angle in utm_campaign and the
 * creative in utm_content:
 *
 *   /lp/turning-65?utm_source=meta&utm_campaign=t65&utm_content=photo-a
 *   /lp/turning-65?utm_source=meta&utm_campaign=t65&utm_content=headline-b
 *
 * WHAT IS DELIBERATELY MISSING
 *
 * There is no "financial advisor" or "financial planning" angle here, and it
 * is not an oversight. Advertising a service is held to a higher standard than
 * writing about a subject: paid claims to be a financial advisor, by somebody
 * who is not a registered investment adviser, is the exact fact pattern state
 * securities regulators act on. The retirement-income angle below covers the
 * same searches from the side he is licensed for — the tax and Medicare timing
 * — and says plainly where his part stops.
 */

export interface LandingPage {
  slug: string;
  /** Small line above the headline. */
  eyebrow: string;
  headline: string;
  subhead: string;
  /** Heading above the four self-identification buttons. */
  chooseHeading: string;
  options: Array<{ label: string; href: string }>;
  promises: string[];
  /** Medicare pages must carry the CMS/TPMO language. */
  compliance: "medicare" | "general";
  /** Meta description for the (noindexed) page. */
  description: string;
}

const UNIVERSAL_PROMISES = [
  "Personal review from a local licensed agent.",
  "Meet in person or by phone.",
  "Free consultation. No obligation.",
];

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "medicare",
    eyebrow: "Local Medicare guidance · Piedmont Triad",
    headline: "Get a personal Medicare coverage review",
    subhead:
      "Review your enrollment timing, physicians, prescriptions, and coverage priorities with one Greensboro-based licensed agent.",
    chooseHeading: "Choose your Medicare situation",
    options: [
      { label: "I’m turning 65 soon", href: "/start?topic=medicare&stage=turning_65_soon" },
      {
        label: "I’m past 65 and still working",
        href: "/start?topic=medicare&stage=past_65_still_working",
      },
      { label: "I’m already on Medicare", href: "/start?topic=medicare&stage=already_on_medicare" },
      {
        label: "I’m helping a parent or spouse",
        href: "/start?topic=medicare&stage=helping_spouse_or_parent",
      },
    ],
    promises: [...UNIVERSAL_PROMISES, "Your inquiry is not sold to other agents."],
    compliance: "medicare",
    description:
      "Get a free personal Medicare review from a local licensed agent in Greensboro. Meet in person or by phone.",
  },
  {
    slug: "turning-65",
    eyebrow: "Turning 65 in the Piedmont Triad",
    headline: "Build your Medicare timeline before 65",
    subhead:
      "Coordinate Part B, employer coverage, HSA contributions, Medigap timing, physicians, and coverage for a younger spouse.",
    chooseHeading: "Where are you in the process?",
    options: [
      { label: "See my exact dates", href: "/remind-me" },
      { label: "I turn 65 within a year", href: "/start?topic=medicare&stage=turning_65_soon" },
      {
        label: "I’m past 65 and still working",
        href: "/start?topic=medicare&stage=past_65_still_working",
      },
      {
        label: "I’m helping a parent with theirs",
        href: "/start?topic=medicare&stage=helping_spouse_or_parent",
      },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "Your dates are free and take one click. No form in front of them.",
    ],
    compliance: "medicare",
    description:
      "Turning 65? See the exact dates your Medicare enrollment window opens and closes, plus the Medigap window most people miss. Free, from a Greensboro agent.",
  },
  {
    slug: "annual-enrollment",
    eyebrow: "October 15 – December 7 · Piedmont Triad",
    headline: "Review your Medicare coverage for next year",
    subhead:
      "Check next year’s costs, prescription coverage, and physician networks before deciding whether to keep or change your plan.",
    chooseHeading: "What would you like to review?",
    options: [
      {
        label: "I got the letter and I’m not sure",
        href: "/start?topic=medicare&stage=already_on_medicare",
      },
      {
        label: "A drug I take got more expensive",
        href: "/start?topic=medicare&stage=already_on_medicare",
      },
      { label: "I want to keep my doctor", href: "/keep-my-doctor" },
      { label: "Explain the window first", href: "/annual-enrollment" },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "If you should keep what you have, that’s what I’ll tell you.",
    ],
    compliance: "medicare",
    description:
      "Review next year’s Medicare costs, prescriptions, and physician networks with a local licensed agent. Free consultation.",
  },
  {
    slug: "life-insurance",
    eyebrow: "Personal life insurance review · Piedmont Triad",
    headline: "Protect the people who depend on you",
    subhead:
      "Review employer and personal coverage, beneficiaries, policy end dates, and how long your family may need protection.",
    chooseHeading: "What are you trying to sort out?",
    options: [
      {
        label: "I want to review a policy I have",
        href: "/start?topic=life_insurance&stage=review_existing",
      },
      {
        label: "My work coverage ends when I retire",
        href: "/start?topic=life_insurance&stage=replace_income",
      },
      {
        label: "I’m thinking about final expenses",
        href: "/start?topic=life_insurance&stage=final_expenses",
      },
      { label: "Just explain term vs whole life", href: "/life-insurance" },
    ],
    promises: [...UNIVERSAL_PROMISES, "If what you have already works, that’s what I’ll tell you."],
    compliance: "general",
    description:
      "Term or permanent depends on how long the money is needed. A licensed Greensboro agent will read your existing policy with you at no cost.",
  },
  {
    slug: "annuities",
    eyebrow: "Greensboro · Piedmont Triad",
    headline: "Understand an annuity before you decide",
    subhead:
      "Review the guarantees, surrender schedule, access to funds, and insurance features with a local licensed agent.",
    chooseHeading: "Where are you with it?",
    options: [
      {
        label: "Somebody sent me a proposal",
        href: "/start?topic=financial_planning&stage=retiring_soon",
      },
      {
        label: "I want income I can count on",
        href: "/start?topic=financial_planning&stage=recently_retired",
      },
      { label: "Explain how annuities work first", href: "/annuities" },
      {
        label: "This is really a retirement-income question",
        href: "/start?topic=financial_planning",
      },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "I don’t hold a securities license, and I’ll say so when that’s what you need.",
    ],
    compliance: "general",
    description:
      "A licensed Greensboro agent will read an annuity proposal with you at no cost, including the surrender schedule and the guaranteed column.",
  },
  {
    slug: "retirement-income",
    eyebrow: "Greensboro · Piedmont Triad",
    headline: "Coordinate retirement income with Medicare",
    subhead:
      "Understand how Social Security timing, withdrawals, Roth conversions, and the two-year IRMAA lookback may fit together.",
    chooseHeading: "What are you working out?",
    options: [
      { label: "See what my timing costs", href: "/plan" },
      {
        label: "What to do with an old 401(k)",
        href: "/start?topic=financial_planning&stage=retiring_soon",
      },
      { label: "My premium went up and I don’t know why", href: "/irmaa-appeal" },
      { label: "Just talk it through", href: "/start?topic=financial_planning" },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "I’m not a registered investment adviser. How to invest it is an adviser’s question, and I’ll say so.",
    ],
    compliance: "general",
    description:
      "A withdrawal or Roth conversion at 63 lands on your first Medicare premium at 65. See what the timing is worth, free, from a Greensboro agent.",
  },
];

export const LANDING_CONTRAST = [
  {
    them: "General online information",
    us: "A personal review with one local agent",
  },
  { them: "A broad recommendation", us: "Your dates, physicians, prescriptions, and priorities" },
  { them: "Phone-only support", us: "Meet in person or by phone" },
  {
    them: "Multiple points of contact",
    us: "Christian personally reviews every inquiry",
  },
] as const;

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
