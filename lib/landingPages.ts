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
  "One person calls you. Not six numbers, not a call center.",
  "Your information is never sold or passed to another agent.",
  "No fee, ever — the insurance company pays me if you enroll.",
];

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "medicare",
    eyebrow: "Greensboro · Piedmont Triad",
    headline: "Medicare questions, answered by one licensed agent in Greensboro.",
    subhead:
      "I’ll answer what you actually want to know before I ask you for anything, and whether or not we ever work together. No cost, and your information isn’t sold.",
    chooseHeading: "Or start online — which one is you?",
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
    promises: [...UNIVERSAL_PROMISES, "If your current coverage is fine, I’ll tell you that."],
    compliance: "medicare",
    description:
      "A licensed agent in Greensboro answers your Medicare question before asking you for anything. No cost, and your information is never sold.",
  },
  {
    slug: "turning-65",
    eyebrow: "Turning 65 in the Triad",
    headline: "Your Medicare window is seven months long, and it’s already running.",
    subhead:
      "It opens three months before the month you turn 65 and closes three months after. Miss it without other coverage and the Part B penalty is permanent. Tell me the month you turn 65 and I’ll tell you your exact dates — no email needed.",
    chooseHeading: "Where are you in it?",
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
    slug: "life-insurance",
    eyebrow: "Greensboro · Piedmont Triad",
    headline: "Life insurance comes down to one question, and it isn’t which product.",
    subhead:
      "How many more years does the money need to be there? Answer that and the product mostly picks itself. I’ll read what you already have with you, for free, and a good share of these end with me saying you’re already fine.",
    chooseHeading: "What are you trying to sort out?",
    options: [
      { label: "I want to review a policy I have", href: "/start?topic=life_insurance" },
      { label: "My work coverage ends when I retire", href: "/start?topic=life_insurance" },
      { label: "I’m thinking about final expenses", href: "/start?topic=life_insurance" },
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
    headline: "Have an annuity proposal in front of you? Let me read it with you.",
    subhead:
      "I’ll show you the guaranteed column, tell you what the surrender schedule actually says, and tell you if I think it’s wrong for you — including when the honest answer is to do nothing at all.",
    chooseHeading: "Where are you with it?",
    options: [
      { label: "Somebody sent me a proposal", href: "/start?topic=financial_planning" },
      { label: "I want income I can count on", href: "/start?topic=financial_planning" },
      { label: "Explain how annuities work first", href: "/annuities" },
      { label: "I’m not sure it’s right for me", href: "/annuities" },
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
    headline: "A big withdrawal at 63 shows up on your Medicare premium at 65.",
    subhead:
      "Medicare sets premiums from a tax return two years old, so the timing of a Roth conversion or a large withdrawal can cost a couple thousand a year for both spouses. I’ll show you what your timing is worth. That part is arithmetic, and it’s free.",
    chooseHeading: "What are you working out?",
    options: [
      { label: "See what my timing costs", href: "/plan" },
      { label: "What to do with an old 401(k)", href: "/retirement-income" },
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

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
