/**
 * Medicare words, in plain English.
 *
 * One or two sentences per term, written the way Christian would say it at a
 * kitchen table. Every dollar figure is read from the same constants the cost
 * pages and calculators use, so the glossary can't drift from them. Every
 * entry links to the official page a reader can check it against.
 *
 * Writing rules: plain English, short sentences, no em dashes, no company
 * names, no plan recommendations. See docs/CONTENT-VOICE.md.
 */

import { STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import {
  CMS_PART_D_SOURCE,
  CMS_PARTS_AB_SOURCE,
  COSTS_YEAR,
  IRMAA_LOOKBACK_YEAR,
  PART_A_2026,
  PART_B_2026,
  PART_D_2026,
  PART_D_IRMAA_2026,
} from "@/lib/medicareCosts2026";

/** The day the entries were last read against their sources. */
export const GLOSSARY_UPDATED = "2026-10-05";

const dollars = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });

type Source = { label: string; href: string };

const SOURCES = {
  compare: {
    label: "Medicare.gov: compare Original Medicare and Medicare Advantage",
    href: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/compare",
  },
  costs: {
    label: "Medicare.gov: what does Medicare cost?",
    href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/what-does-medicare-cost",
  },
  partsAB: { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
  partD: { label: CMS_PART_D_SOURCE.title, href: CMS_PART_D_SOURCE.url },
  medigapGuide: {
    label: "Medicare.gov: Choosing a Medigap Policy (official guide, PDF)",
    href: "https://www.medicare.gov/publications/02110-medigap-guide-health-insurance.pdf",
  },
  medigapWhen: {
    label: "Medicare.gov: when can I buy Medigap?",
    href: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when",
  },
  start: {
    label: "Medicare.gov: when does Medicare coverage start?",
    href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start",
  },
  joining: {
    label: "Medicare.gov: joining a plan",
    href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
  },
  penalties: {
    label: "Medicare.gov: avoid late enrollment penalties",
    href: "https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties",
  },
  anoc: {
    label: "Medicare.gov: upcoming plan changes",
    href: "https://www.medicare.gov/basics/forms-publications-mailings/mailings/costs-and-coverage/upcoming-plan-changes",
  },
  snf: {
    label: "Medicare.gov: skilled nursing facility care",
    href: "https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care",
  },
  ssaPremiums: {
    label: "Social Security: Medicare premiums and higher incomes",
    href: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html",
  },
} as const satisfies Record<string, Source>;

export type GlossaryTerm = {
  id: string;
  term: string;
  /** Other names people use for the same thing. */
  aka?: string;
  definition: string;
  source: Source;
  /** A page on this site that goes deeper. */
  more?: { label: string; href: string };
};

export type GlossaryGroup = {
  id: string;
  label: string;
  blurb: string;
  terms: GlossaryTerm[];
};

export const GLOSSARY: GlossaryGroup[] = [
  {
    id: "the-parts",
    label: "The parts of Medicare",
    blurb: "Four letters, two paths. Start here if the alphabet is the confusing part.",
    terms: [
      {
        id: "original-medicare",
        term: "Original Medicare",
        aka: "basic Medicare, traditional Medicare",
        definition:
          "Part A and Part B together, run by the federal government. You can see any doctor or hospital in the country that takes Medicare. It has no yearly limit on what you pay, and it doesn’t include prescription coverage.",
        source: SOURCES.compare,
        more: {
          label: "Original Medicare or Medicare Advantage?",
          href: "/answers/original-medicare-or-medicare-advantage",
        },
      },
      {
        id: "part-a",
        term: "Part A",
        aka: "hospital insurance",
        definition: `Covers inpatient hospital stays, skilled nursing facility care after a qualifying stay, hospice, and some home health care. Most people pay no premium for it because they or a spouse paid Medicare taxes for at least 10 years. In ${COSTS_YEAR} the hospital deductible is ${dollars(PART_A_2026.inpatientDeductible)} for each benefit period.`,
        source: SOURCES.partsAB,
        more: { label: `Every ${COSTS_YEAR} Medicare cost`, href: "/medicare-costs-2026" },
      },
      {
        id: "part-b",
        term: "Part B",
        aka: "medical insurance",
        definition: `Covers doctor visits, outpatient care, preventive care, and medical equipment. In ${COSTS_YEAR} most people pay ${dollars(STANDARD_BASE_PREMIUM_2026)} a month. After a ${dollars(PART_B_2026.annualDeductible)} yearly deductible, you usually pay 20% of the Medicare-approved amount.`,
        source: SOURCES.partsAB,
        more: { label: "Estimate your Part B premium", href: "/medicare" },
      },
      {
        id: "medicare-advantage",
        term: "Medicare Advantage",
        aka: "Part C",
        definition:
          "A plan from a private insurance company that Medicare approves. It replaces Original Medicare as the way you get your Part A and Part B benefits, and most plans include drug coverage. Plans have a yearly limit on what you pay for covered care, and most use a network of doctors and hospitals. You still pay your Part B premium.",
        source: SOURCES.compare,
        more: { label: "Medicare Advantage or a Medigap plan?", href: "/advantage-vs-medigap" },
      },
      {
        id: "part-d",
        term: "Part D",
        aka: "prescription drug coverage",
        definition: `Drug coverage from a private plan, either on its own or built into a Medicare Advantage plan. Each plan has its own list of covered drugs, called a formulary. In ${COSTS_YEAR} no plan can charge a deductible above ${dollars(PART_D_2026.maximumDeductible)}, and what you pay out of pocket for covered drugs is capped at ${dollars(PART_D_2026.outOfPocketCap)} for the year.`,
        source: SOURCES.partD,
      },
      {
        id: "medigap",
        term: "Medigap",
        aka: "Medicare Supplement",
        definition:
          "A policy from a private company that helps pay the deductibles and coinsurance Original Medicare leaves to you. It only works with Original Medicare, not with a Medicare Advantage plan. The plans are named with letters, and a given letter covers the same benefits no matter which company sells it.",
        source: SOURCES.medigapGuide,
        more: {
          label: "Are Medicare Supplement plans the same?",
          href: "/answers/are-medicare-supplement-plans-the-same",
        },
      },
    ],
  },
  {
    id: "what-you-pay",
    label: "What you pay",
    blurb: "The words on a bill, and what each one means for your wallet.",
    terms: [
      {
        id: "premium",
        term: "Premium",
        definition:
          "What you pay each month to have the coverage, whether or not you use it. Part B has one, and so do most Medigap and Part D plans.",
        source: SOURCES.costs,
      },
      {
        id: "deductible",
        term: "Deductible",
        definition:
          "What you pay for covered care before your coverage starts paying its share. Part A, Part B, and most drug plans each have their own.",
        source: SOURCES.costs,
      },
      {
        id: "copay-and-coinsurance",
        term: "Copay and coinsurance",
        definition:
          "Your share of a bill after the deductible. A copay is a set dollar amount, like a flat fee for an office visit. Coinsurance is a percentage, like the 20% you usually pay under Part B.",
        source: SOURCES.costs,
      },
      {
        id: "out-of-pocket-limit",
        term: "Out-of-pocket limit",
        aka: "maximum out-of-pocket",
        definition:
          "The most you would pay in a year for covered Part A and Part B services in a Medicare Advantage plan. Each plan sets its own, up to a ceiling Medicare allows. Original Medicare by itself has no yearly limit.",
        source: SOURCES.compare,
      },
      {
        id: "benefit-period",
        term: "Benefit period",
        definition: `How Part A counts a hospital stay. It starts the day you’re admitted and ends once you’ve been out of the hospital or skilled nursing facility for 60 days in a row. The ${dollars(PART_A_2026.inpatientDeductible)} deductible applies to each benefit period, so you can owe it more than once in a year.`,
        source: SOURCES.partsAB,
      },
      {
        id: "irmaa",
        term: "IRMAA",
        aka: "income-related monthly adjustment amount",
        definition: `An extra amount added to your Part B and Part D premiums when your income is above a set level. It’s based on your tax return from two years back. For ${COSTS_YEAR}, it starts above ${dollars(PART_D_IRMAA_2026[0].individualMax ?? 0)} for a single filer or ${dollars(PART_D_IRMAA_2026[0].jointMax ?? 0)} filing jointly, using your ${IRMAA_LOOKBACK_YEAR} return.`,
        source: SOURCES.ssaPremiums,
        more: { label: "Does income affect Medicare premiums?", href: "/answers/medicare-irmaa-income-premiums" },
      },
      {
        id: "late-enrollment-penalty",
        term: "Late enrollment penalty",
        definition: `An amount added to your premium if you sign up late without other qualifying coverage. For Part B it’s ${PART_B_2026.latePenaltyPercentPerYear}% for each full 12 months you waited, for as long as you have Part B. For Part D it’s ${PART_D_2026.latePenaltyPercentPerMonth}% of the national base premium (${dollars(PART_D_2026.baseBeneficiaryPremium)} in ${COSTS_YEAR}) for each month you went without drug coverage.`,
        source: SOURCES.penalties,
        more: { label: "Work out the Part B penalty", href: "/part-b-penalty" },
      },
      {
        id: "creditable-coverage",
        term: "Creditable drug coverage",
        definition: `Drug coverage, such as from a job, that’s expected to pay at least as much as Medicare’s standard drug coverage. If you keep it, the Part D penalty doesn’t build up. The penalty can start once you’ve gone ${PART_D_2026.creditableCoverageGapDays} days or more without it.`,
        source: SOURCES.penalties,
      },
    ],
  },
  {
    id: "when-you-can-act",
    label: "When you can sign up or change",
    blurb: "Medicare runs on windows. These are the ones with names.",
    terms: [
      {
        id: "initial-enrollment-period",
        term: "Initial Enrollment Period",
        aka: "IEP",
        definition:
          "Your first chance to sign up. It lasts seven months: the three months before the month you turn 65, your birthday month, and the three months after.",
        source: SOURCES.start,
        more: { label: "Find your own dates", href: "/turning-65#enrollment-dates" },
      },
      {
        id: "annual-enrollment-period",
        term: "Annual Enrollment Period",
        aka: "open enrollment, AEP",
        definition:
          "October 15 to December 7, every year. You can switch between Original Medicare and Medicare Advantage, change Advantage plans, or change drug plans. Changes start January 1.",
        source: SOURCES.joining,
        more: { label: "Reviewing your plan each fall", href: "/annual-enrollment" },
      },
      {
        id: "medicare-advantage-open-enrollment",
        term: "Medicare Advantage Open Enrollment",
        definition:
          "January 1 to March 31. If you’re already in a Medicare Advantage plan, you can switch to a different one or go back to Original Medicare, one time.",
        source: SOURCES.joining,
      },
      {
        id: "special-enrollment-period",
        term: "Special Enrollment Period",
        aka: "SEP",
        definition:
          "A window to sign up or change plans outside the usual dates. A life change opens it, such as moving out of your plan’s area or losing coverage from a job.",
        source: SOURCES.joining,
        more: { label: "Special Enrollment Periods", href: "/special-enrollment" },
      },
      {
        id: "medigap-open-enrollment",
        term: "Medigap Open Enrollment Period",
        definition:
          "Six months that start when you’re 65 or older and enrolled in Part B. During it, a company can’t turn you down for a Medigap policy or charge you more because of your health. After it ends, you may have to answer health questions.",
        source: SOURCES.medigapWhen,
      },
    ],
  },
  {
    id: "plan-words",
    label: "Words in your plan’s mail",
    blurb: "What the letters and booklets are actually telling you.",
    terms: [
      {
        id: "network",
        term: "Network",
        definition:
          "The doctors, hospitals, and pharmacies a Medicare Advantage plan has contracts with. An HMO generally covers care only inside its network, except in an emergency. A PPO lets you go outside it, usually for a higher cost.",
        source: SOURCES.compare,
        more: { label: "HMO or PPO?", href: "/answers/medicare-advantage-hmo-vs-ppo" },
      },
      {
        id: "prior-authorization",
        term: "Prior authorization",
        definition:
          "Approval a plan may require before it will cover certain services or drugs. Your doctor’s office usually asks for it.",
        source: SOURCES.compare,
      },
      {
        id: "annual-notice-of-change",
        term: "Annual Notice of Change",
        aka: "ANOC",
        definition:
          "The letter your Medicare Advantage or drug plan sends each fall. It lists what changes on January 1: the premium, copays, covered drugs, and the network.",
        source: SOURCES.anoc,
        more: { label: "How to read your ANOC", href: "/anoc" },
      },
      {
        id: "skilled-nursing-facility-care",
        term: "Skilled nursing facility care",
        aka: "SNF, rehab",
        definition: `Short-term skilled care after a qualifying hospital stay. Under Original Medicare in ${COSTS_YEAR}, you pay nothing for days 1 to 20 and ${dollars(PART_A_2026.skilledNursingCoinsuranceDays21To100)} a day for days 21 to 100. After day 100, Medicare stops paying. It doesn’t cover long-term care in a nursing home.`,
        source: SOURCES.snf,
        more: {
          label: "Does Medicare cover nursing homes?",
          href: "/answers/does-medicare-cover-nursing-homes",
        },
      },
    ],
  },
];

export function glossaryTerms(): GlossaryTerm[] {
  return GLOSSARY.flatMap((group) => group.terms);
}
