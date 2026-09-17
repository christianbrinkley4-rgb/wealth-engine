/**
 * Match each ad to its subject and offer a direct consultation request.
 * Start with a turning-65 pilot; AEP is a separate seasonal campaign.
 * Campaign and creative labels identify submitted inquiries. Held appointment
 * outcomes still need to be connected before reporting an appointment winner.
 * See docs/APPOINTMENT-CAMPAIGNS.md for the testing plan and draft messages.
 */

export interface LandingPage {
  slug: string;
  /** Small line above the headline. */
  eyebrow: string;
  headline: string;
  subhead: string;
  /** Topic-specific consultation entry point. */
  primaryHref: string;
  /** One related educational next step for visitors who want to read first. */
  guideHref: string;
  /** Concrete topics for the consultation; these are not promises of a particular result. */
  consultationTopics: [string, string, string];
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
  "Meet in person, by phone, or by video.",
  "Free consultation. No obligation.",
];

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "medicare",
    eyebrow: "Local Medicare guidance · Piedmont Triad",
    headline: "Get a personal Medicare coverage review",
    subhead:
      "Let’s review when to enroll, the doctors and prescriptions you want covered, and what matters to you. You’ll work directly with Christian, a licensed agent in Greensboro.",
    primaryHref: "/start?topic=medicare",
    guideHref: "/turning-65",
    consultationTopics: [
      "Your current coverage and when you may be able to enroll.",
      "What to check for your doctors, prescriptions, and pharmacy.",
      "The costs and coverage differences among the plans I represent.",
    ],
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
      "Get a free personal Medicare review from Christian Brinkley, a local licensed agent in Greensboro. Meet in person, by phone, or by video.",
  },
  {
    slug: "turning-65",
    eyebrow: "Turning 65 in the Piedmont Triad",
    headline: "Turning 65? Let’s talk about Medicare.",
    subhead:
      "Find out when to enroll, how Medicare works with your current coverage, and which options may fit your needs.",
    primaryHref: "/start?topic=medicare&stage=turning_65_soon",
    guideHref: "/turning-65",
    consultationTopics: [
      "Your enrollment dates and how Medicare works with coverage through work.",
      "The differences between Medicare Advantage and Original Medicare with a supplement.",
      "What to review for your doctors, prescriptions, and monthly budget.",
    ],
    chooseHeading: "Where are you in the process?",
    options: [
      { label: "Find my enrollment dates", href: "/remind-me" },
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
      "Use the free date tool without sharing contact information.",
    ],
    compliance: "medicare",
    description:
      "Turning 65? Find your estimated Medicare enrollment dates and learn when to review Medigap options. Free help from a local Greensboro agent.",
  },
  {
    slug: "annual-enrollment",
    eyebrow: "October 15 – December 7 · Piedmont Triad",
    headline: "Review your Medicare coverage for next year",
    subhead:
      "Review next year’s costs, prescriptions, and doctors before deciding whether your current plan still fits.",
    primaryHref: "/start?topic=medicare&stage=already_on_medicare",
    guideHref: "/annual-enrollment",
    consultationTopics: [
      "Changes in your plan’s premiums, copays, and other costs for next year.",
      "Whether your doctors, prescriptions, and pharmacy are covered by the plans you’re considering.",
      "Whether to keep your current plan or consider a change during an enrollment period.",
    ],
    chooseHeading: "What would you like to review?",
    options: [
      {
        label: "Help me understand my plan’s changes",
        href: "/start?topic=medicare&stage=already_on_medicare",
      },
      {
        label: "A drug I take got more expensive",
        href: "/start?topic=medicare&stage=already_on_medicare",
      },
      { label: "I want to keep my doctor", href: "/keep-my-doctor" },
      { label: "Explain annual enrollment", href: "/annual-enrollment" },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "If you should keep what you have, that’s what I’ll tell you.",
    ],
    compliance: "medicare",
    description:
      "Review next year’s Medicare costs, prescriptions, and doctors with a local licensed agent. No-cost consultation.",
  },
  {
    slug: "life-insurance",
    eyebrow: "Personal life insurance review · Piedmont Triad",
    headline: "Protect the people who depend on you",
    subhead:
      "Review employer and personal coverage, beneficiaries, policy end dates, and how long your family may need protection.",
    primaryHref: "/start?topic=life_insurance",
    guideHref: "/life-insurance",
    consultationTopics: [
      "Who depends on you and the expenses you want your coverage to help with.",
      "What your current policy provides, when it ends, and what happens when you leave work.",
      "Coverage amounts, policy types, and premiums that make sense to consider for your budget.",
    ],
    chooseHeading: "What would you like help with?",
    options: [
      {
        label: "I want to review a policy I have",
        href: "/start?topic=life_insurance&stage=review_existing",
      },
      {
        label: "My work coverage ends when I retire",
        href: "/start?topic=life_insurance",
      },
      {
        label: "I’m thinking about final expenses",
        href: "/start?topic=life_insurance&stage=final_expenses",
      },
      { label: "Explain the types of life insurance", href: "/life-insurance" },
    ],
    promises: [...UNIVERSAL_PROMISES, "If what you have already works, that’s what I’ll tell you."],
    compliance: "general",
    description:
      "Review your current life insurance, family needs, and budget with a local licensed agent. Your consultation is no cost, with no obligation.",
  },
  {
    slug: "annuities",
    eyebrow: "Greensboro · Piedmont Triad",
    headline: "Understand an annuity before you decide",
    subhead:
      "Understand the guarantees, costs, and rules for taking money out before deciding whether an annuity fits your needs.",
    primaryHref: "/start?topic=financial_planning",
    guideHref: "/annuities",
    consultationTopics: [
      "The income an annuity is designed to provide and the conditions behind its guarantees.",
      "Fees, surrender charges, and how much access you would have to your money.",
      "How the insurance options I offer relate to questions for your financial advisor.",
    ],
    chooseHeading: "Where are you with it?",
    options: [
      {
        label: "Somebody sent me a proposal",
        href: "/start?topic=financial_planning",
      },
      {
        label: "I want income I can count on",
        href: "/start?topic=financial_planning",
      },
      { label: "Explain how annuities work first", href: "/annuities" },
      {
        label: "This is really a retirement-income question",
        href: "/start?topic=financial_planning",
      },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "I can explain the insurance options I offer and work with an advisor for financial planning.",
    ],
    compliance: "general",
    description:
      "Bring an annuity proposal or current contract to a no-cost review with a local licensed agent. We can discuss its guarantees, fees, and access to your money.",
  },
  {
    slug: "retirement-income",
    eyebrow: "Greensboro · Piedmont Triad",
    headline: "Let’s talk about your retirement questions.",
    subhead:
      "We can start with your Medicare and insurance needs, your family’s priorities, and the questions on your mind. For financial planning, I work with an advisor so you have the right support.",
    primaryHref: "/start?topic=financial_planning",
    guideHref: "/retirement-income",
    consultationTopics: [
      "Your insurance needs as work ends and your household’s income changes.",
      "Questions about Medicare, family protection, and possible future care expenses.",
      "Which financial planning questions to discuss with an advisor I work with, and whether you’d like an introduction.",
    ],
    chooseHeading: "What would you like to discuss?",
    options: [
      { label: "Planning for retirement income", href: "/start?topic=financial_planning" },
      {
        label: "What to do with an old 401(k)",
        href: "/start?topic=financial_planning",
      },
      { label: "My premium went up and I don’t know why", href: "/irmaa-appeal" },
      { label: "Read about retirement and Medicare", href: "/retirement-income" },
    ],
    promises: [
      ...UNIVERSAL_PROMISES,
      "I help with Medicare and insurance questions and work with an advisor for financial planning.",
    ],
    compliance: "general",
    description:
      "Understand how retirement income can affect Medicare premiums. Local guidance from a Greensboro insurance agent, with financial planning coordinated through an advisor.",
  },
];

export const LANDING_SUPPORT = [
  {
    title: "Someone you can get to know",
    body: "You’ll work directly with Christian. Your request is never sold to other agents.",
  },
  {
    title: "A conversation about your needs",
    body: "We’ll start with your questions and the coverage you already have. You don’t need to have everything figured out.",
  },
  {
    title: "A comfortable way to meet",
    body: "Meet at home, at a convenient public location, by phone, or by video. A spouse or family member is welcome.",
  },
  {
    title: "Help as your needs change",
    body: "You can come back with questions throughout retirement, whether you need to review coverage or understand a letter.",
  },
] as const;

export function getLandingPage(slug: string): LandingPage | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
