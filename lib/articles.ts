/**
 * Question-led articles.
 *
 * Each one answers a question a Triad neighbor actually asked, in the order
 * they would ask it. Facts that change every year (2026 deductibles, the SNF
 * daily amount, the Part D base premium) were checked against medicare.gov and
 * cms.gov on 2026-10-01. When a figure changes, update it here and bump
 * `updated`.
 *
 * Writing rules for this file: plain English, short sentences, no em dashes,
 * no plan recommendations, no savings promises, no carrier names, no advice on
 * qualifying for Medicaid. See docs/CONTENT-VOICE.md.
 */

import { RELEASE_ARTICLES } from "./releaseArticles";

import {
  CMS_PARTS_AB_SOURCE,
  CMS_PART_D_SOURCE,
  COSTS_YEAR,
  PART_B_2026,
  PART_D_2026,
  PART_D_IRMAA_2026,
} from "@/lib/medicareCosts2026";

/** Whole dollars when the figure is whole, otherwise dollars and cents. */
const money = (amount: number): string =>
  Number.isInteger(amount) ? `$${amount.toLocaleString("en-US")}` : `$${amount.toFixed(2)}`;

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

export type ArticleSection = {
  h2: string;
  blocks: ArticleBlock[];
};

export type Article = {
  slug: string;
  /** The H1, written as the question a person would type. */
  title: string;
  /** <title> text, kept near 60 characters. */
  metaTitle: string;
  /** Kept under the ~160 character cutoff. */
  description: string;
  keyword: string;
  eyebrow: string;
  lede: string;
  published: string;
  updated: string;
  intro: string;
  sections: ArticleSection[];
  faq: Array<{ q: string; a: string }>;
  sources: Array<{ label: string; href: string }>;
  related: Array<{ label: string; href: string }>;
  /** Passed to /start so the request form knows what the visitor read. */
  startHref: string;
};

const p = (text: string): ArticleBlock => ({ kind: "p", text });
const ul = (...items: string[]): ArticleBlock => ({ kind: "ul", items });
const table = (headers: string[], rows: string[][]): ArticleBlock => ({
  kind: "table",
  headers,
  rows,
});

export const ARTICLES: Article[] = [
  ...RELEASE_ARTICLES,
  {
    slug: "original-medicare-or-medicare-advantage",
    title: "Should I stay on Original Medicare or switch to Medicare Advantage?",
    metaTitle: "Original Medicare or Medicare Advantage? Compare Options",
    description:
      "Thinking about switching from Original Medicare to Medicare Advantage? What each covers, what to check first, and when you can change. From a Greensboro agent.",
    keyword: "should I switch from Original Medicare to Medicare Advantage",
    eyebrow: "Medicare questions, answered",
    lede: "What each path covers, what it leaves to you, and the three things to check before you change anything.",
    published: "2026-10-01",
    updated: "2026-10-01",
    intro:
      "Neighbors ask me some version of this every fall: is there any reason not to switch to basic Medicare, or to Medicare Advantage? Both are real choices, and neither one is right for everybody. Here is how they work, so you can check them against your own life.",
    sections: [
      {
        h2: "What Original Medicare covers, and what it leaves to you",
        blocks: [
          p(
            "People call Original Medicare “basic Medicare.” It has two parts. Part A covers hospital stays. Part B covers doctor visits, outpatient care, and preventive care.",
          ),
          p("It also leaves some costs with you:"),
          ul(
            "Part A has a deductible of $1,736 for each benefit period in 2026.",
            "Part B has a $283 deductible in 2026. After that, you usually pay 20% of the Medicare-approved amount for most services.",
            "There is no yearly cap on what you can pay for Part A and Part B services.",
            "It does not include prescription drug coverage. That comes from a separate Part D plan.",
          ),
          p(
            "On top of those costs, you pay the Part B premium, which is $202.90 a month for most people in 2026.",
          ),
        ],
      },
      {
        h2: "Why some people stay on Original Medicare",
        blocks: [
          p(
            "With Original Medicare, you can see any doctor or hospital in the country that accepts Medicare. There is no network to stay inside, and you generally do not need a referral to see a specialist.",
          ),
          p(
            "Many people who stay add two things: a [Medicare Supplement (Medigap) policy](/advantage-vs-medigap), which helps pay deductibles and coinsurance, and a Part D drug plan. Those come with their own monthly premiums. The tradeoff is a more predictable bill when you get care, in exchange for paying for three separate pieces.",
          ),
        ],
      },
      {
        h2: "Why some people switch to Medicare Advantage",
        blocks: [
          p(
            "A Medicare Advantage plan is sold by a private insurance company. It replaces Original Medicare for your Part A and Part B benefits, and most plans include drug coverage in the same package.",
          ),
          p(
            "Many plans have a low or even $0 plan premium, though you still pay your Part B premium. Plans must have a yearly limit on what you pay for covered services. Some add extras like dental, vision, or hearing, and those vary a lot from plan to plan.",
          ),
          p(
            "The tradeoffs are networks and approvals. Most plans work with a set list of doctors and hospitals. Some services need the plan’s approval before you get them, which is called prior authorization. Copays differ by service and by plan.",
          ),
        ],
      },
      {
        h2: "Three things to check before you change anything",
        blocks: [
          ul(
            "Your doctors. Look up each doctor, specialist, and hospital you use. Check them plan by plan, not just the insurance company’s name.",
            "Your prescriptions. Check that each medicine is covered, what tier it is on, and what it costs at your pharmacy.",
            "What you pay now versus next year. Add up premiums and likely copays for a normal year, then picture a year with a hospital stay.",
          ),
          p(
            "One more thing to know. If you leave a Medicare Advantage plan later and want a Medigap policy, the company may ask health questions and can say no in most situations. Read [Medicare.gov’s guidance on when you can buy Medigap](https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when) before you drop anything.",
          ),
        ],
      },
      {
        h2: "When you can change",
        blocks: [
          p(
            "The Annual Enrollment Period runs October 15 to December 7 every year. Changes you make then start January 1. You can switch between Original Medicare and Medicare Advantage, or from one Advantage plan to another.",
          ),
          p(
            "If you are already in a Medicare Advantage plan, there is a second window from January 1 to March 31. You can switch to a different Advantage plan or go back to Original Medicare. Moves, loss of other coverage, and a few other life changes can open a special window too.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Any reason not to switch to basic Medicare?",
        a: "Yes, a few. Original Medicare has no yearly cap on what you pay and no drug coverage, so most people add a Medigap policy and a Part D plan. Those cost extra each month. Whether that fits depends on your doctors, your medicines, and your budget.",
      },
      {
        q: "Does Original Medicare cover prescriptions?",
        a: "No. Prescription coverage comes from a separate Part D plan, or from a Medicare Advantage plan that includes drug coverage.",
      },
      {
        q: "Is there an out-of-pocket maximum with Original Medicare?",
        a: "No. After the deductibles, you usually pay 20% of the approved amount for most Part B services, with no yearly limit. A Medigap policy can help cover that. Medicare Advantage plans do have a yearly limit.",
      },
    ],
    sources: [
      {
        label: "CMS: 2026 Medicare Parts A and B premiums and deductibles",
        href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
      },
      {
        label: "Medicare.gov: When you can join, switch, or drop a Medicare Advantage plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
      {
        label: "Medicare.gov: What does Medicare cost?",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/what-does-medicare-cost",
      },
    ],
    related: [
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Your Medicare checklist for turning 65 in North Carolina", href: "/answers/turning-65-medicare-checklist-north-carolina" },
      { label: "Does Medicare cover nursing homes or in-home care?", href: "/answers/does-medicare-cover-nursing-homes" },
      { label: "Medicare Advantage vs Medigap in the Triad", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { label: "Check your doctors before you choose a plan", href: "/keep-my-doctor" },
      { label: "Annual Enrollment, step by step", href: "/aep" },
    ],
    startHref: "/start?topic=medicare&stage=already_on_medicare",
  },

  {
    slug: "are-medicare-supplement-plans-the-same",
    title: "Are Medicare Supplement plans the same no matter the company?",
    // Retitled Oct 29, 2026: page 1 (position 7.3) with 130 impressions and
    // no clicks. The title now gives the answer and the reason to click.
    metaTitle: "Medigap Plans Are the Same at Every Company. Prices Aren't.",
    description:
      "Same letter, same coverage, whichever company sells it. What changes is the price, how fast it rises, and the extras. Here's how to compare before you switch.",
    keyword: "are Medigap plans standardized by letter",
    eyebrow: "Medicare questions, answered",
    lede: "The letter tells you what is covered. The company decides the price and the extras.",
    published: "2026-10-01",
    updated: "2026-10-01",
    intro:
      "If you have a Medicare Supplement plan, you may have noticed that a neighbor’s plan looks different from yours. Or a benefit you liked has been dropped. Here is what is standard, what is not, and what to do when your plan changes.",
    sections: [
      {
        h2: "Medigap plans are standardized by letter",
        blocks: [
          p(
            "Medicare Supplement plans are also called Medigap. In North Carolina, and in most states, each plan letter covers the same core benefits no matter which company sells it. A Plan G from one company covers the same things as a Plan G from another.",
          ),
          p(
            "Medicare.gov says that for same-letter plans, price is the main difference. Massachusetts, Minnesota, and Wisconsin set up their plans differently, but that does not apply here.",
          ),
          p(
            "The common letters are A, B, D, G, K, L, M, and N. Plans C and F are not sold to people who became eligible for Medicare on or after January 1, 2020. If you have one already, you can usually keep it. Medicare.gov has a chart that shows exactly what each letter covers, and it is worth reading before you compare anything.",
          ),
        ],
      },
      {
        h2: "What does differ between companies",
        blocks: [
          p("Even with the same letter, two things can be very different:"),
          ul(
            "The monthly premium. Companies price the same plan differently, and they raise prices at different rates over the years.",
            "How the price is set. Some companies price by the age you were when you bought it, some by your current age, and some charge the same rate at every age. That changes how the premium behaves over time, so it is worth asking.",
            "Extras. Some companies add things outside the standard benefits, like fitness programs or discounts. Those extras are the company’s choice.",
          ),
          p(
            "One thing Medigap can help with: the daily coinsurance for skilled nursing facility stays. [Does Medicare cover nursing homes](/answers/does-medicare-cover-nursing-homes) explains the 100-day rule and where Medigap fits in.",
          ),
        ],
      },
      {
        h2: "Why a perk can disappear",
        blocks: [
          p(
            "Extras are not part of the standard plan, so a company can change or drop them. That is a company decision. It is not a Medicare rule.",
          ),
          p(
            "Here is something that confuses a lot of people. The Annual Notice of Change is for Medicare Advantage and Part D plans. Those plans must send it by September 30, and it lists what changes on January 1. Medigap policies do not use that notice. Your Medigap company sends its own letters about premium changes and other updates.",
          ),
          p(
            "If you are not sure which kind of plan you have, check your paperwork. A Medigap policy names a plan letter, such as Plan G, and you keep using your red, white, and blue Medicare card. A Medicare Advantage plan has its own plan name and its own member card.",
          ),
        ],
      },
      {
        h2: "What to do when a notice arrives",
        blocks: [
          ul(
            "Read it all the way through, and note exactly what changed.",
            "If it is a price increase, check what other companies charge for the same letter.",
            "Do not cancel your current plan until a new one is approved. Outside your Medigap open enrollment window, a new company may ask health questions and can say no.",
            "Ask someone you trust to read it with you. A second set of eyes catches things.",
          ),
          p(
            "The October 15 to December 7 Annual Enrollment Period does not apply to Medigap the way it does to Advantage and Part D. If you have a Medicare Advantage or Part D plan as well, that is the window to review your Annual Notice of Change.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "What perks have been removed from Medicare Supplement plans?",
        a: "It depends on the company. Extras like fitness programs and discounts are not part of the standard Medigap benefits, so each company can change them. Your plan’s letters and notices list what changed for your policy.",
      },
      {
        q: "Is Plan G the same with every company?",
        a: "The core benefits are the same. Premiums, how the price is set, and any extras can differ from one company to the next.",
      },
      {
        q: "Why did my plan remove a benefit?",
        a: "If the benefit was one of the extras a company adds, it is the company’s decision to keep or drop it. Standard Medigap benefits are set by the plan letter and do not change by company.",
      },
      {
        q: "Does Medigap get an Annual Notice of Change?",
        a: "No. That notice goes to Medicare Advantage and Part D members. Medigap companies send their own notices about premiums and policy changes.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Medigap in Massachusetts, Minnesota, and Wisconsin",
        href: "https://www.medicare.gov/health-drug-plans/medigap/basics/compare-plan-benefits/minnesota",
      },
      {
        label: "Medicare.gov: Plan Annual Notice of Change (ANOC)",
        href: "https://www.medicare.gov/basics/forms-publications-mailings/mailings/costs-and-coverage/upcoming-plan-changes",
      },
      {
        label: "Medicare.gov: Choosing a Medigap policy (PDF)",
        href: "https://www.medicare.gov/publications/02110-medigap-guide-health-insurance.pdf",
      },
    ],
    related: [
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Does Medicare cover nursing homes or in-home care?", href: "/answers/does-medicare-cover-nursing-homes" },
      { label: "Turning 65 in North Carolina: your Medicare checklist", href: "/answers/turning-65-medicare-checklist-north-carolina" },
      { label: "Medicare Advantage vs Medigap in the Triad", href: "/medicare-advantage-vs-medigap-greensboro-nc" },
      { label: "Your Annual Notice of Change, explained", href: "/anoc" },
      { label: "What Medicare costs in 2026", href: "/medicare-costs-2026" },
    ],
    startHref: "/start?topic=medicare&stage=already_on_medicare",
  },

{
    slug: "does-medicare-cover-nursing-homes",
    title: "Does Medicare Cover Nursing Homes?",
    metaTitle: "Does Medicare Cover Nursing Homes? 2026 Guide",
    description:
      "Does Medicare cover nursing homes? Mostly no. Up to 100 days of skilled nursing after a hospital stay, but not long-term care. Read the plain-English guide.",
    keyword: "does medicare cover nursing homes",
    eyebrow: "Medicare questions, answered",
    lede: "The short answer is mostly no. Medicare covers up to 100 days of skilled nursing after a qualifying hospital stay. It does not pay for long-term custodial care.",
    published: "2026-10-01",
    updated: "2026-10-09",
    intro:
      "If a parent is in the hospital right now, here is the short answer: mostly no. Medicare can pay for up to 100 days of skilled nursing after a qualifying 3-day inpatient stay, but only while daily skilled care is needed. Once the need becomes long-term custodial care (help with bathing, dressing, eating), Medicare stops paying. This page explains each piece. It is general education, not advice.",
    sections: [
      {
        h2: "The 100-day rule, explained",
        blocks: [
          p(
            "It is not 100 free days. Here is how the 2026 costs break down per benefit period:",
          ),
          ul(
            "Days 1 to 20: $0 after the $1,736 Part A deductible. Already paid it for the hospital stay? You do not pay it again.",
            "Days 21 to 100: $217 per day.",
            "Day 101 and beyond: Medicare pays nothing.",
          ),
          p(
            "Medicare Advantage plans set their own skilled nursing costs and rules. Check with the plan before a move.",
          ),
        ],
      },
      {
        h2: "What has to be true to qualify",
        blocks: [
          p(
            "Medicare Part A does not cover a nursing home stay just because someone needs help. All three of these have to be true:",
          ),
          ul(
            "A medically necessary inpatient hospital stay of at least 3 days in a row. Time in the emergency room or under observation status does not count toward the 3 days.",
            "Admission to the skilled nursing facility within a short window after leaving the hospital, generally 30 days.",
            "A need for daily skilled care, meaning nursing or therapy that has to be done by trained professionals. A doctor has to order it.",
          ),
          p(
            "Miss any one and Medicare does not cover the stay. Ask the hospital whether the stay counts as inpatient before discharge day. Observation status does not count.",
          ),
        ],
      },
      {
        h2: "Skilled care versus custodial care",
        blocks: [
          p(
            "This distinction decides everything. Skilled care is nursing or therapy that requires trained professionals, like wound care, IV medication, or physical therapy after surgery. Medicare can pay for skilled care for a limited time.",
          ),
          p(
            "Custodial care is help with daily living: bathing, dressing, eating, using the bathroom, and getting in and out of bed. Most long stays in a nursing home are for custodial care. Medicare does not pay for custodial care when it is the only care needed.",
          ),
          p(
            "Coverage ends when the need becomes custodial only, even if 100 days are not used up.",
          ),
        ],
      },
      {
        h2: "Medicare versus Medicaid for nursing homes",
        blocks: [
          p(
            "People mix these two up, and the difference matters here. Medicare is federal health insurance, mostly for people 65 and older. It follows the rules above: limited skilled care, no long-term custodial coverage.",
          ),
          p(
            "Medicaid is a joint federal and state program for people with limited income and assets. Unlike Medicare, Medicaid can pay for long-term nursing home care, including custodial care. Each state sets its own income and asset limits and its own application process.",
          ),
          p(
            "[NC Medicaid](https://medicaid.nc.gov) explains who qualifies. I do not give advice on qualifying; an elder law attorney is the right person for that.",
          ),
        ],
      },
      {
        h2: "What does pay for long-term care",
        blocks: [
          p("When Medicare does not cover a long stay, families usually rely on a mix of these:"),
          ul(
            "Personal savings and income. This is the most common way long nursing home stays get paid.",
            "Long-term care insurance, if someone bought a policy before the need arose. [Here is how that works.](/long-term-care-insurance)",
            "Medicaid, for those who meet their state's income and asset limits.",
            "Veterans benefits, for those who qualify through VA programs.",
          ),
          p(
            "The right mix depends on savings, timing, and family situation. Understand the options before a crisis forces fast decisions.",
          ),
        ],
      },
      {
        h2: "If a parent needs long-term care",
        blocks: [
          p(
            "Plan while everyone is healthy. Once a parent is hospitalized, the 3-day and 30-day rules start counting fast. Ask the discharge planner whether the stay counts as inpatient, get the facility's daily rate after day 100, and talk to an elder law attorney early if long-term care looks likely. [Helping a parent with Medicare](/helping-a-parent) has more on this.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does Medicare cover nursing homes?",
        a: "Mostly no. Medicare Part A can pay for up to 100 days in a skilled nursing facility after a qualifying 3-day inpatient hospital stay, but only while daily skilled nursing or therapy is needed. It does not pay for long-term custodial care.",
      },
      {
        q: "How many days will Medicare pay for in a nursing home?",
        a: "Up to 100 days per benefit period. In 2026, you pay $0 for days 1 to 20 after the $1,736 Part A deductible, then $217 per day for days 21 to 100. After day 100, Medicare pays nothing.",
      },
      {
        q: "What is the 100-day Medicare rule for skilled nursing?",
        a: "After a qualifying 3-day inpatient hospital stay, Medicare covers up to 100 days of skilled nursing facility care per benefit period. Days 1 to 20 cost $0 after the Part A deductible, days 21 to 100 cost $217 per day in 2026, and coverage ends at day 101.",
      },
      {
        q: "Does Medicare pay for long-term care in a nursing home?",
        a: "No. Medicare does not cover long-term custodial care, which is help with daily living like bathing, dressing, and eating. Long-term nursing home stays are usually paid from savings, long-term care insurance, or Medicaid for those who qualify.",
      },
      {
        q: "What is the difference between Medicare and Medicaid for nursing home care?",
        a: "Medicare is federal health insurance for people 65 and older. It covers limited skilled nursing after a hospital stay but not long-term custodial care. Medicaid is a federal-state program for people with limited income that can pay for long-term nursing home care, including custodial care.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Skilled nursing facility (SNF) care",
        href: "https://www.medicare.gov/coverage/skilled-nursing-facility-snf-care",
      },
      {
        label: "Medicare.gov: Home health services",
        href: "https://www.medicare.gov/coverage/home-health-services",
      },
      {
        label: "CMS: 2026 Medicare Parts A and B premiums and deductibles",
        href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
      },
    ],
    related: [
      { label: "Helping a parent with Medicare", href: "/helping-a-parent" },
      { label: "Care and critical illness coverage", href: "/care-coverage" },
      { label: "Long-term care insurance", href: "/long-term-care-insurance" },
      { label: "What Medicare costs in 2026", href: "/medicare-costs-2026" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Turning 65 in North Carolina: your Medicare checklist", href: "/answers/turning-65-medicare-checklist-north-carolina" },
    ],
    startHref: "/start?topic=care_coverage",
  },

  {
    slug: "turning-65-medicare-checklist-north-carolina",
    title: "Turning 65 in North Carolina: your Medicare checklist",
    metaTitle: "Turning 65 Medicare Checklist for North Carolina",
    description:
      "A simple checklist for turning 65 in North Carolina: your 7-month enrollment window, how to sign up, the three decisions, and what late penalties mean.",
    keyword: "turning 65 Medicare checklist North Carolina",
    eyebrow: "Turning 65",
    lede: "Your enrollment window, how to sign up, and what to do at 3 months out, 1 month out, and after.",
    published: "2026-10-01",
    updated: "2026-10-01",
    intro:
      "Most people find out about Medicare timing from a letter, a neighbor, or a birthday that is closer than they thought. This checklist walks through it in order. I wrote it for North Carolina, and I meet people in person around the Triad or by phone.",
    sections: [
      {
        h2: "Your 7-month enrollment window",
        blocks: [
          p(
            "Your Initial Enrollment Period lasts 7 months. It starts 3 months before the month you turn 65, includes your birthday month, and ends 3 months after.",
          ),
          p(
            "For example, if you turn 65 in April, your window runs January through July. If you turn 65 in August, it runs May through November.",
          ),
          p(
            "When you sign up affects when coverage starts. If you enroll in Part B before your birthday month, coverage starts the first of your birthday month. If you enroll during or after your birthday month, it starts the next month. If your birthday is on the first of the month, coverage starts the month before.",
          ),
        ],
      },
      {
        h2: "How to sign up for Parts A and B",
        blocks: [
          p(
            "If you already get Social Security or Railroad Retirement benefits, you are usually enrolled in Part A and Part B automatically. If you do not, you sign up through Social Security. You can do it online, by phone, or at a local office.",
          ),
          p(
            "If you are still working and have coverage through your employer, you may be able to wait on Part B without a penalty. Whether you can depends on the employer’s size and the kind of coverage, so ask your benefits office before you decide. If you contribute to a health savings account, ask about that too, because enrolling in Medicare affects contributions.",
          ),
          p(
            "When job coverage ends, you get a Special Enrollment Period of up to 8 months to sign up for Part B without a penalty. That window does not apply while you are still in your Initial Enrollment Period.",
          ),
        ],
      },
      {
        h2: "The three decisions everyone faces",
        blocks: [
          ul(
            "Original Medicare with a Medigap policy, or Medicare Advantage. [Here is how they compare.](/answers/original-medicare-or-medicare-advantage)",
            "Prescription drug coverage. You need it either through a Part D plan or an Advantage plan that includes it.",
            "Timing. When you sign up, and whether you have other coverage that lets you wait.",
          ),
        ],
      },
      {
        h2: "Late penalties, in plain English",
        blocks: [
          p(
            "If you go without Part B when you should have signed up, you pay an extra 10% of the standard premium for each full 12-month period you waited. The standard Part B premium is $202.90 in 2026. You keep paying that extra amount for as long as you have Part B. You can [estimate yours with my penalty calculator](/part-b-penalty).",
          ),
          p(
            "If you go without Part D or other creditable drug coverage, you pay 1% of the national base premium for each full month you waited. That base premium is $38.99 in 2026. You pay it for as long as you have drug coverage. You can avoid both by signing up on time or by having coverage that counts.",
          ),
        ],
      },
      {
        h2: "A simple timeline",
        blocks: [
          p("Three months out:"),
          ul(
            "Find your Medicare enrollment window dates.",
            "Ask your employer, if you have one, how your coverage works with Medicare.",
            "List your doctors and your prescriptions.",
          ),
          p("One month out:"),
          ul(
            "Sign up for Part A and Part B, or confirm that you are already enrolled.",
            "Compare Advantage plans or Medigap and Part D options for your address.",
          ),
          p("After you enroll:"),
          ul(
            "Check that your Medicare card arrived and your coverage start date is right.",
            "Confirm your plan choice is in place before the first month of coverage.",
            "Mark your calendar for October 15 to December 7, the yearly window to review your plan.",
          ),
          p(
            "If you want to see your own dates laid out, my [timeline tool](/turning-65) builds them from your birthday.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I get Medicare automatically at 65?",
        a: "Only if you already get Social Security or Railroad Retirement benefits. In that case you are usually enrolled in Part A and Part B automatically. Otherwise you sign up yourself through Social Security.",
      },
      {
        q: "What if I’m still working?",
        a: "You may be able to wait on Part B without a penalty if you have coverage through your own or your spouse’s current job. Ask your benefits office how your plan works with Medicare, because it depends on the employer’s size and the kind of coverage.",
      },
      {
        q: "What happens if I miss my enrollment window?",
        a: "You may owe a late penalty for Part B, Part D, or both, and you may have to wait for the next general enrollment period. The penalties last for as long as you have the coverage. Check the rules for your situation before assuming you missed it.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: When does Medicare coverage start?",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start",
      },
      {
        label: "Medicare.gov: Avoid late enrollment penalties",
        href: "https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties",
      },
      {
        label: "CMS: 2026 Medicare Parts A and B premiums and deductibles",
        href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
      },
    ],
    related: [
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Does Medicare cover nursing homes or in-home care?", href: "/answers/does-medicare-cover-nursing-homes" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Part B late-enrollment penalty calculator", href: "/part-b-penalty" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "medicare-advantage-dental-coverage",
    title: "Does Medicare Advantage cover dental?",
    metaTitle: "Does Medicare Advantage Cover Dental? What to Check",
    description:
      "Original Medicare skips routine dental. Many Medicare Advantage plans add some dental, but the details vary. What to check before you count on it. Read on.",
    keyword: "does Medicare Advantage cover dental",
    eyebrow: "Medicare questions, answered",
    lede: "Original Medicare does not cover routine dental. Many Advantage plans add some. Here is what the benefit usually includes, and where people get surprised.",
    published: "2026-10-02",
    updated: "2026-10-02",
    intro:
      "This one comes up in almost every kitchen-table conversation I have: does Medicare cover dental, and if not, does a Medicare Advantage plan? The short answer is that Original Medicare skips routine dental entirely, and many Advantage plans add some dental back in. The long answer is where the money is, because no two plans define dental the same way.",
    sections: [
      {
        h2: "What Original Medicare covers (almost nothing dental)",
        blocks: [
          p(
            "Original Medicare does not cover routine dental care. That means no cleanings, no fillings, no tooth extractions, no dentures, and no root canals. If you need a crown, you pay for the crown.",
          ),
          p(
            "There is one narrow exception. Medicare can pay for dental services that are part of a covered medical procedure, such as dental work before a heart valve replacement, an organ transplant, or some cancer treatments. These are exceptions tied to medical care, not a dental benefit.",
          ),
          p(
            "If you stay on Original Medicare and want routine dental, you pay out of pocket or you buy a separate dental plan. A Medicare Supplement plan does not fix this. It helps with Medicare cost sharing, but it does not add dental coverage.",
          ),
        ],
      },
      {
        h2: "What Medicare Advantage dental benefits usually look like",
        blocks: [
          p(
            "Medicare Advantage plans must cover everything Original Medicare covers, and they may add extra benefits on top. Dental is one of the most common extras. Medicare notes that most Advantage plans offer some dental, vision, or hearing benefits.",
          ),
          p("In practice, dental benefits tend to fall into two layers:"),
          ul(
            "Preventive dental: exams, cleanings, and X-rays. This is the layer most plans with a dental benefit include.",
            "Comprehensive dental: fillings, extractions, crowns, root canals, dentures, and sometimes implants. This layer varies the most from plan to plan.",
          ),
          p(
            "Many plans set an annual maximum on what they will pay for dental, and some require you to use dentists in their network. A benefit that covers two cleanings a year is a very different thing from one that helps with a $2,000 crown, so the details matter more than the brochure headline.",
          ),
        ],
      },
      {
        h2: "The three things to check before you count on it",
        blocks: [
          p(
            "First, check the network. Ask your dentist which plans they accept, and confirm with the plan itself. A dental benefit does you no good if your dentist is not in the network and you do not want to switch.",
          ),
          p(
            "Second, read the Evidence of Coverage, not just the summary. Look for the annual maximum, any waiting periods, and which procedures count as preventive versus comprehensive. Ask the plan for a written cost estimate before major work starts.",
          ),
          p(
            "Third, recheck every fall. Dental benefits can shrink from one year to the next, and the change shows up in the Annual Notice of Change your plan mails each fall. I have seen neighbors learn at the dentist's front desk that their plan now covers preventive care only. Ten minutes with the ANOC avoids that.",
          ),
        ],
      },
      {
        h2: "If your plan's dental is thin, your options",
        blocks: [
          p(
            "A separate dental plan is one option. Compare its monthly cost and annual maximum against the dental work you actually expect, not the work you hope to avoid. For some people, paying cash for two cleanings a year costs less than a premium.",
          ),
          p(
            "If you are comparing Medicare Advantage plans during open enrollment, dental is a fair tiebreaker between two plans that are otherwise even on doctors and prescriptions. It should not be the reason you pick a plan. Doctors, hospitals, and drug coverage come first.",
          ),
          p(
            "Bring your dentist into the decision. Their office deals with these plans every day and can tell you which ones pay smoothly and which ones fight every claim.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does Original Medicare cover dental cleanings?",
        a: "No. Original Medicare does not cover routine cleanings, fillings, extractions, or dentures. It only covers dental work that is part of a covered medical procedure.",
      },
      {
        q: "Do all Medicare Advantage plans include dental?",
        a: "No. Many include some dental, but it is an extra benefit each plan chooses to offer. Some plans offer none, some offer preventive only, and some offer preventive plus comprehensive care.",
      },
      {
        q: "Does a Medicare Supplement plan add dental coverage?",
        a: "No. Medicare Supplement plans help pay Medicare cost sharing. They do not add routine dental, vision, or hearing benefits.",
      },
      {
        q: "Can my plan's dental benefit change next year?",
        a: "Yes. Plans can change their extra benefits each year. The changes are listed in the Annual Notice of Change, which plans mail each fall before open enrollment.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Dental services",
        href: "https://www.medicare.gov/coverage/dental-services",
      },
      {
        label: "Medicare.gov: Plan Annual Notice of Change (ANOC)",
        href: "https://www.medicare.gov/basics/forms-publications-mailings/mailings/costs-and-coverage/upcoming-plan-changes",
      },
    ],
    related: [
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Does Medicare cover nursing homes or in-home care?", href: "/answers/does-medicare-cover-nursing-homes" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "medicare-advantage-hmo-vs-ppo",
    title: "What is the difference between HMO and PPO Medicare Advantage plans?",
    metaTitle: "HMO vs PPO: Which Medicare Plan Keeps Your Doctor?",
    description:
      "HMO or PPO? The real differences are your doctors, referrals, and what out-of-network care costs. A plain-English comparison for Triad neighbors. Read on.",
    keyword: "what is the difference between HMO and PPO Medicare Advantage plans",
    eyebrow: "Medicare questions, answered",
    lede: "HMOs keep costs tight with a network and referrals. PPOs give you more freedom, and you pay for it. Here is how to think about the tradeoff.",
    published: "2026-10-02",
    updated: "2026-10-02",
    intro:
      "HMO and PPO are the two most common kinds of Medicare Advantage plans. Both must cover everything Original Medicare covers. The difference is how they handle your doctors: who you can see, whether you need a referral, and what happens outside the network.",
    sections: [
      {
        h2: "HMO vs PPO at a glance",
        blocks: [
          table(
            ["", "HMO", "PPO"],
            [
              ["Primary care doctor", "Usually required, your first call", "Not required"],
              ["Specialist referrals", "Usually needed", "Not needed, book directly"],
              ["Out-of-network care", "Generally not covered (emergencies excepted)", "Covered at a higher cost"],
              ["Typical premiums", "Often lower", "Often higher"],
              ["Best for", "People who want coordinated care and lower costs", "People who want freedom to see any doctor"],
            ],
          ),
          p(
            "Both types must cover everything Original Medicare covers. The difference is how they handle your doctors, and that is what the rest of this page walks through.",
          ),
        ],
      },
      {
        h2: "How an HMO works: one network, one quarterback",
        blocks: [
          p(
            "An HMO, short for Health Maintenance Organization, works like a team with a home field. You get your care from the doctors and hospitals in the plan’s network. You usually pick a primary care doctor, and that doctor is your first call for most things.",
          ),
          p(
            "When you need a specialist, your primary care doctor usually sends a referral first. That is the plan’s way of keeping care coordinated. It also helps keep HMO premiums and copays lower.",
          ),
          p(
            "The tradeoff is the network boundary. Outside of emergencies, urgent care, and dialysis when you travel, the plan generally does not pay for out-of-network care. If your doctor leaves the network, you switch doctors or pay the bill yourself.",
          ),
          p(
            "One variation to know: some HMOs offer a point-of-service option, called HMO-POS. It works like an HMO for most care but lets you use certain out-of-network services at a higher cost.",
          ),
        ],
      },
      {
        h2: "How a PPO works: more doors open, higher price of admission",
        blocks: [
          p(
            "A PPO, a Preferred Provider Organization, keeps a network too, but the door is not locked. You can see doctors outside the network. You just pay more when you do.",
          ),
          p(
            "You do not need to choose a primary care doctor, and you do not need a referral to see a specialist. For a lot of people, that is the whole point. You book the specialist directly and skip the extra appointment.",
          ),
          p(
            "The freedom has a price. Out-of-network care comes with higher cost sharing, and PPO premiums can run higher than HMO premiums, since the plan is paying for care outside its network too. Most PPOs include drug coverage, and if yours does, you cannot buy a separate Part D plan on top of it.",
          ),
          p(
            "Every Medicare Advantage plan has a yearly limit on what you pay for covered services. With a PPO, ask how out-of-network care counts toward that limit before you need it.",
          ),
        ],
      },
      {
        h2: "Three questions that decide it for most people",
        blocks: [
          p("Three questions settle this for almost everybody."),
          ul(
            "Are your doctors in the network? Look up every doctor and specialist by name, in each plan you are considering. This one question decides more HMO-versus-PPO choices than anything else.",
            "Do you travel or split time between places? An HMO covers emergencies anywhere, but routine care out of network is on you. If you spend months with family in another state, a PPO’s out-of-network coverage matters.",
            "How often do you see specialists? If you are managing a condition with regular specialist visits, skipping referrals and choosing your own doctors is real convenience. If you rarely go beyond your primary care doctor, the HMO’s structure costs you nothing.",
          ),
          p("Answer those three honestly and the plan type usually picks itself."),
        ],
      },
      {
        h2: "What to check before open enrollment",
        blocks: [
          p(
            "Open enrollment runs October 15 to December 7, and plans can change their networks and costs every year. Check the provider directory for the coming year, not this year’s. Doctors join and leave networks.",
          ),
          p(
            "Read the Evidence of Coverage for the plan, not just the summary of benefits. That is where the referral rules, the out-of-network cost sharing, and the drug formulary actually live. If the brochure says one thing and the Evidence of Coverage says another, the Evidence of Coverage wins.",
          ),
          p(
            "Recheck every fall. Your plan mails an Annual Notice of Change listing what is different next year. A network that fit you this year may not fit next year. Ten minutes with that letter beats a surprise bill in February.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need a referral to see a specialist with a PPO?",
        a: "No. PPOs do not require referrals. You can book a specialist directly, in or out of the network. HMOs usually do require a referral from your primary care doctor.",
      },
      {
        q: "Can I see an out-of-network doctor with an HMO?",
        a: "Generally no. HMOs pay for in-network care, with exceptions for emergencies, urgent care, and dialysis when you travel. An HMO with a point-of-service option allows some out-of-network services at a higher cost.",
      },
      {
        q: "Is a PPO always more expensive than an HMO?",
        a: "Not always. A PPO gives you out-of-network coverage, and that flexibility usually shows up in the monthly premium. But plans vary by county, so compare a full year of costs, premium plus the care you actually get, not just the monthly number.",
      },
      {
        q: "Can I switch from an HMO to a PPO later?",
        a: "Yes, during open enrollment, October 15 to December 7, for a January 1 start. If you are already in a Medicare Advantage plan, you can also switch between January 1 and March 31.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Compare types of Medicare Advantage Plans",
        href: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/compare",
      },
      {
        label: "Medicare.gov: When you can join, switch, or drop a Medicare Advantage plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
    ],
    related: [
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Does Medicare Advantage cover dental?", href: "/answers/medicare-advantage-dental-coverage" },
      { label: "Does Medicare cover nursing homes or in-home care?", href: "/answers/does-medicare-cover-nursing-homes" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "switching-medicare-advantage-plans-aep",
    title: "What should I check before switching Medicare Advantage plans?",
    metaTitle: "Switching Medicare Advantage Plans? Check These First",
    description:
      "Switching Medicare Advantage plans during open enrollment? The six checks that matter: timing, doctors, drugs, costs, pharmacy, and ratings. Learn more.",
    keyword: "what should I check before switching medicare advantage plans",
    eyebrow: "Medicare questions, answered",
    lede: "October 15 to December 7 is your yearly window to switch. Six checks, in order, so January never surprises you.",
    published: "2026-10-05",
    updated: "2026-10-05",
    intro:
      "Every fall the same envelopes land in Triad mailboxes: the plan you have is changing, and so is everything around it. Your doctors, your prescriptions, your costs all get re-shuffled for January 1. The Annual Enrollment Period, October 15 to December 7, is when you get to respond. Networks change, drugs move tiers, premiums move, and sometimes a plan leaves an area entirely. Switching is allowed, but check a few things first. The order that works: the timing, the letter your plan already sent, your doctors, your drugs, your real cost, and the switch itself.",
    sections: [
      {
        h2: "Know your two windows",
        blocks: [
          p(
            "The Annual Enrollment Period runs October 15 to December 7. Your plan must get your request by December 7, and the new coverage starts January 1. Your 2026 plan covers you through December 31, so there is no gap as long as you act inside the window.",
          ),
          p(
            "Already in a Medicare Advantage plan? You get a second window, January 1 to March 31. You can switch to another Medicare Advantage plan, or drop your plan and return to Original Medicare and join a separate drug plan.",
          ),
          p(
            "Outside those windows you generally cannot switch without a life event: moving, losing or changing coverage, getting Medicaid, or getting Extra Help. For most people, fall is the one sure chance all year.",
          ),
        ],
      },
      {
        h2: "Start with the letter your plan already sent",
        blocks: [
          p(
            "Each fall your plan mails an Annual Notice of Change, due in your hands by September 30. It lists exactly what changes next year: premium, deductible, copays, covered drugs, and the network. It is the single most useful document in the process.",
          ),
          p(
            "Read the summary table first, then the parts that touch your life: your drugs, your doctors, your costs. One hierarchy to know: the Evidence of Coverage, the plan's full rulebook, beats the brochure every time.",
          ),
          p("Never got the letter? Call your plan and ask for it, and keep it where you can find it."),
        ],
      },
      {
        h2: "Check one: your doctors, by name",
        blocks: [
          p(
            "Look up every doctor and specialist you see, by name, in next year's provider directory. Not this year's. Doctors join and leave networks every year.",
          ),
          p(
            "Check the hospitals you would actually use too, in an emergency or for a planned surgery. If a hospital you count on is out of network, that outweighs a small premium difference.",
          ),
          p(
            "If your plan is leaving your area or ending its Medicare contract, the letter tells you. Losing coverage that way gives you a Special Enrollment Period. If anything in the letter is unclear, call 1-800-MEDICARE.",
          ),
        ],
      },
      {
        h2: "Check two: your prescriptions, by tier",
        blocks: [
          p(
            "Drug lists change every year. A drug can be dropped, moved to a higher tier, or given new rules like prior authorization. Go through your prescriptions one by one against next year's drug list.",
          ),
          p(
            "Check the pharmacy side too: your regular pharmacy needs to be in the network at the preferred level, and confirm mail order still works the same way. Prices can jump at a non-preferred pharmacy.",
          ),
          p(
            "One expensive brand-name drug can make this check worth more than everything else. Ten minutes with the formulary beats a January surprise at the counter.",
          ),
        ],
      },
      {
        h2: "Check three: the full-year cost, not the premium",
        blocks: [
          p(
            "A low premium with high copays can cost more over a year than a higher premium with low copays. Add the whole year: monthly premium times twelve, deductible, copays for the care you actually get, and the plan's out-of-pocket maximum, which caps what you pay for covered services.",
          ),
          p(
            "Compare that full-year number, not the monthly number on the brochure. Two plans with the same premium can be far apart once you add your drugs and specialist visits.",
          ),
          p(
            "Medicare publishes star ratings for plans. Use them as a tiebreaker when two plans look close, not as the decision itself. A five-star plan that drops your doctor is still the wrong plan.",
          ),
        ],
      },
      {
        h2: "Then make the switch cleanly",
        blocks: [
          p(
            "Decide by December 7 so the new plan starts January 1. Miss the deadline and you generally stay put until the January-to-March window, which only exists if you are already in a Medicare Advantage plan.",
          ),
          p(
            "Keep your paperwork together: the Annual Notice of Change, the new plan's summary of benefits, and the enrollment confirmation. If a claim gets confused in January, those settle it.",
          ),
          p(
            "Skim your new plan's Evidence of Coverage when it arrives: referrals, prior authorization, out-of-network rules. Before you need care, not after.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can I switch Medicare Advantage plans after December 7?",
        a: "Generally no. If you are already in a Medicare Advantage plan, you get the January 1 to March 31 window to switch or return to Original Medicare. Otherwise you need a Special Enrollment Period from a life event, like moving or losing your current coverage.",
      },
      {
        q: "What if my plan is leaving Medicare next year?",
        a: "Your Annual Notice of Change tells you. Losing your coverage that way gives you a Special Enrollment Period to pick a new plan. If the letter is unclear, call 1-800-MEDICARE.",
      },
      {
        q: "Do Medicare star ratings actually matter?",
        a: "They are a real quality signal, but do not let them drive the decision. Doctors, drugs, and full-year cost come first. Then let the higher rating break a tie.",
      },
      {
        q: "Should I just pick the cheapest premium?",
        a: "Not alone. Add up the full year: premium, deductible, copays, and the out-of-pocket maximum. A cheap premium with expensive copays often costs more over twelve months.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: When you can join, switch, or drop a Medicare Advantage plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
      {
        label: "Medicare.gov: Compare types of Medicare Advantage Plans",
        href: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/compare",
      },
    ],
    related: [
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "HMO vs PPO Medicare Advantage: which fits your doctors?", href: "/answers/medicare-advantage-hmo-vs-ppo" },
      { label: "Does Medicare Advantage cover dental?", href: "/answers/medicare-advantage-dental-coverage" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "medicare-irmaa-income-premiums",
    title: "Will Medicare cost me more because of my income?",
    metaTitle: "IRMAA Explained: When Income Raises Medicare Costs",
    description:
      "Earn over $109K single or $218K joint? IRMAA adds surcharges to Medicare Part B and Part D. How the two-year lookback works, and how to appeal. Read on.",
    keyword: "what is irmaa medicare income related monthly adjustment amount",
    eyebrow: "Medicare questions, answered",
    lede: "Your 2024 tax return sets your 2026 Medicare premiums. Here is how the income surcharge works, and what to do if your income has dropped since.",
    published: "2026-10-05",
    updated: "2026-10-05",
    intro:
      "Most people pay the standard Medicare Part B premium. But if your income is above a set limit, Medicare adds a surcharge called IRMAA, short for Income-Related Monthly Adjustment Amount. It applies to Part B and to Part D drug coverage. The surprise is the timing: the number comes from your tax return two years back, so a high-income year can raise your premiums long after the money is gone.",
    sections: [
      {
        h2: "What IRMAA actually is",
        blocks: [
          p(
            "IRMAA is an extra monthly charge added to your Part B premium and your Part D premium when your income crosses set thresholds. It is tiered, not gradual: cross a threshold by one dollar and you pay the full surcharge for that tier.",
          ),
          p(
            "The income measure is called MAGI, modified adjusted gross income. For IRMAA that means your adjusted gross income plus any tax-exempt interest. It is not the same MAGI formula used for other programs, which trips people up.",
          ),
          p(
            "Social Security sends a letter when IRMAA applies, showing the income year they used and the new premium. If your income has dropped since, do not just accept it. There is an appeal path.",
          ),
        ],
      },
      {
        h2: "The two-year lookback",
        blocks: [
          p(
            "Your 2026 premiums come from your 2024 MAGI; 2027 will come from 2025. That two-year lag is a timing trap: a single high-income year follows you.",
          ),
          p(
            "The usual triggers are a large Roth conversion, selling property or investments at a gain, a big retirement account withdrawal, required minimum distributions kicking in, or a payout from an inherited IRA. Any of these can push one tax year over a threshold, and the surcharge shows up two years later.",
          ),
          p(
            "Even if your income falls back to normal the next year, you pay the higher premium until the lookback catches up. That is why the timing of big income events matters as much as the amount.",
          ),
        ],
      },
      {
        h2: "The 2026 brackets",
        blocks: [
          p(
            "Below the first threshold you pay the standard Part B premium, $202.90 a month for 2026, with no Part D surcharge. Above it, five tiers step up. These are the official CMS figures for 2026, based on 2024 income.",
          ),
          ul(
            "Single $109,001 to $137,000 (joint $218,001 to $274,000): Part B $284.10, Part D adds $14.50",
            "Single $137,001 to $171,000 (joint $274,001 to $342,000): Part B $405.80, Part D adds $37.50",
            "Single $171,001 to $205,000 (joint $342,001 to $410,000): Part B $527.50, Part D adds $60.40",
            "Single $205,001 to $499,999 (joint $410,001 to $749,999): Part B $649.20, Part D adds $83.30",
            "Single $500,000 or more (joint $750,000 or more): Part B $689.90, Part D adds $91.00",
          ),
          p(
            "Married filing separately has its own tighter thresholds. And these numbers move most years, so check the current table rather than trusting last year's.",
          ),
        ],
      },
      {
        h2: "If your income dropped, appeal it",
        blocks: [
          p(
            "A life-changing event can get your IRMAA lowered. The qualifying events include stopping work or cutting hours, marriage, divorce, or the death of a spouse. If one of those cut your income after the tax year Medicare used, you can ask Social Security to use your current income instead.",
          ),
          p(
            "The request goes on Form SSA-44, filed with your local Social Security office, with proof of the event and your lower income. It is a standard process, not a loophole, and it exists exactly for this situation.",
          ),
          p(
            "One thing people miss: IRMAA is recalculated every year. If this year's surcharge came from an old high-income year, next year's letter may already fix itself. Still appeal when you qualify. Do not wait on the calendar.",
          ),
        ],
      },
      {
        h2: "Planning around it",
        blocks: [
          p(
            "You cannot change the lookback, but you can plan inside it. Spreading a large Roth conversion across low-income years, timing property sales, and using qualified charitable distributions from an IRA after age 70 and a half can keep a single year from spiking over a threshold.",
          ),
          p(
            "This is tax planning, not just Medicare planning. Run the timing past a tax professional before you move money. A conversion that saves on lifetime taxes can still cost you two years of IRMAA, and you want both sides of that math.",
          ),
          p(
            "If you are helping a parent with Medicare and their premiums look wrong, check the IRMAA letter first. It names the income year. Half the time the mystery is just the two-year lag.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "What income triggers IRMAA in 2026?",
        a: "For 2026, IRMAA starts when your 2024 MAGI is more than $109,000 filing single or more than $218,000 filing jointly. Below that you pay the standard Part B premium of $202.90 a month with no Part D surcharge.",
      },
      {
        q: "Can I appeal IRMAA if I retired?",
        a: "Yes. Stopping work or reducing hours is a qualifying life-changing event. File Form SSA-44 with Social Security, with proof of the event and your current lower income, and ask them to base your premium on this year instead of the old tax year.",
      },
      {
        q: "Does a Roth conversion trigger IRMAA?",
        a: "It can. A Roth conversion counts as income in the year you do it, and that year's MAGI sets your premiums two years later. Large conversions in a single year are one of the most common IRMAA triggers.",
      },
      {
        q: "Does IRMAA go away on its own?",
        a: "It recalculates yearly from the newest tax return. Once the high-income year ages out of the window, the surcharge drops off. Still appeal right away when you qualify.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: What Medicare Costs",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/what-does-medicare-cost",
      },
      {
        label: "Medicare Advocates: 2026 IRMAA Brackets and Income Limits",
        href: "https://medicareadvocates.com/blog/irmaa-brackets-2026",
      },
      {
        label: "RC Planning: What is IRMAA?",
        href: "http://rcsplanning.com/what-is-irmaa/",
      },
      {
        label: "Mariner Wealth Advisors: How Income Affects Medicare Premiums",
        href: "https://www.marinerwealthadvisors.com/insights/how-income-affects-medicare-premiums/",
      },
    ],
    related: [
      { label: "What should I check before switching Medicare Advantage plans?", href: "/answers/switching-medicare-advantage-plans-aep" },
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "do-i-need-medicare-drug-coverage",
    title: "Do I need Medicare drug coverage if I don't take many prescriptions?",
    metaTitle: "Do I Need Medicare Part D If I Take Few Prescriptions?",
    description:
      "Taking few or no prescriptions at 65? What Medicare Part D costs, how the late penalty works, and what to check before you skip drug coverage. Read on.",
    keyword: "do I need Part D if I don't take prescriptions",
    eyebrow: "Medicare questions, answered",
    lede: "Part D is optional, but skipping it can cost you for years. Here is how the penalty works, and the one thing to check first.",
    published: "2026-10-06",
    updated: "2026-10-06",
    intro:
      "A neighbor told me last month, \"I'm healthy, I take one pill a day, why would I pay for drug coverage?\" It's a fair question, and the honest answer is that Part D is optional. You can skip it. What you should know before you do is how the late penalty works, because it follows you for as long as you have Medicare.",
    sections: [
      {
        h2: "What Part D is, and who already has it",
        blocks: [
          p(
            "Part D is Medicare's prescription drug coverage. Original Medicare, Parts A and B, covers very little of what you pick up at the pharmacy. Drug coverage comes from a private plan you add on, or from a Medicare Advantage plan that includes it.",
          ),
          p(
            "If you are in a Medicare Advantage plan, check whether it already includes drug coverage. Many do. In most Advantage HMOs and PPOs, joining a separate drug plan can get you dropped from the Advantage plan, so don't add one without checking first.",
          ),
        ],
      },
      {
        h2: "How the late penalty works",
        blocks: [
          p(
            `You get a seven month window around your 65th birthday to join a drug plan without a penalty. If you go 63 days or more without drug coverage that counts as "creditable," and then join later, Medicare adds a penalty to your monthly premium. It is ${PART_D_2026.latePenaltyPercentPerMonth}% of the national base premium (${money(PART_D_2026.baseBeneficiaryPremium)} in ${COSTS_YEAR}) for each full month you went without.`,
          ),
          p(
            `Here is what that looks like. Say you wait 12 months. That is ${12 * PART_D_2026.latePenaltyPercentPerMonth}% of ${money(PART_D_2026.baseBeneficiaryPremium)}, rounded to the nearest dime, so about ${money(Math.round((12 * PART_D_2026.latePenaltyPercentPerMonth * PART_D_2026.baseBeneficiaryPremium) / 10) / 10)} a month added to whatever your plan charges. It has no end date. It is not a lot in year one, and it is still there in year fifteen.`,
          ),
        ],
      },
      {
        h2: "Creditable coverage: the one thing to check",
        blocks: [
          p(
            "You can skip Part D with no penalty if you already have drug coverage that Medicare calls creditable. That means it is expected to pay at least as much as a standard Part D plan. Coverage from a current employer, a retiree plan, the VA, or TRICARE is often creditable, but not always.",
          ),
          p(
            "Your plan has to send you a notice each fall saying whether its drug coverage is creditable. Keep it. If you ever need to prove you had coverage, that letter is your proof. If you can't find it, call the plan and ask for it in writing.",
          ),
        ],
      },
      {
        h2: "What a plan can cost you in 2026",
        blocks: [
          p(
            `Premiums vary by plan, and some are low. Two limits are set for everyone. A plan can't charge a deductible above ${money(PART_D_2026.maximumDeductible)}, and your out-of-pocket drug costs are capped at ${money(PART_D_2026.outOfPocketCap)} for the year.`,
          ),
          p(
            `Higher earners pay an extra monthly amount on top of the plan's premium, from ${money(PART_D_IRMAA_2026[1].surcharge)} up to ${money(PART_D_IRMAA_2026[PART_D_IRMAA_2026.length - 1].surcharge)} a month depending on income. That surcharge goes to Medicare, not to the plan. If your income is limited, ask about Extra Help, a Social Security program that lowers drug costs and waives the late penalty.`,
          ),
        ],
      },
      {
        h2: "A way to think it through",
        blocks: [
          p(
            "Few prescriptions today doesn't mean few prescriptions at 72. Look at it two ways: what a low-cost plan would cost you this year, and what the penalty would add if you needed coverage later. Then decide with both numbers in front of you.",
          ),
          p(
            "If you're not sure whether you have creditable coverage, or what a plan would cost with your actual prescriptions, bring the list and I’ll check it with you. No cost, and no pressure to enroll.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can I sign up for Part D later without a penalty?",
        a: "Only if you had creditable drug coverage the whole time, or you qualify for a Special Enrollment Period or Extra Help. Otherwise the late penalty applies for as long as you have Part D.",
      },
      {
        q: "When can I join a drug plan if I missed my first window?",
        a: "During the Annual Enrollment Period, October 15 to December 7. Coverage starts January 1 of the following year.",
      },
      {
        q: "Does the Part D penalty ever go away?",
        a: "No. It is added to your monthly premium for as long as you have Part D. It can be reconsidered if you disagree about whether you had creditable coverage.",
      },
      {
        q: "Do I need Part D if I have a Medicare Advantage plan?",
        a: "Check your plan first. Many Advantage plans include drug coverage. If yours does, you don't add a separate one.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Drug coverage (Part D)",
        href: "https://www.medicare.gov/drug-coverage-part-d",
      },
      {
        label: "Medicare.gov: Drug costs",
        href: "https://www.medicare.gov/basics/costs/help/drug-costs",
      },
      { label: CMS_PART_D_SOURCE.title, href: CMS_PART_D_SOURCE.url },
    ],
    related: [
      { label: "What should I check before switching Medicare Advantage plans?", href: "/answers/switching-medicare-advantage-plans-aep" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Medicare terms, explained simply", href: "/medicare-glossary" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "does-medicare-cover-hearing-aids-and-glasses",
    title: "Does Medicare cover hearing aids, eye exams, and glasses?",
    metaTitle: "Does Medicare Cover Hearing Aids and Glasses? What to Know",
    description:
      "Original Medicare skips hearing aids, routine eye exams, and glasses, with a few exceptions. What is covered, what Advantage plans add, and what to ask.",
    keyword: "does Medicare cover hearing aids and glasses",
    eyebrow: "Medicare questions, answered",
    lede: "Original Medicare covers some of the medical side of hearing and vision, and almost none of the everyday side. Here is where the line is.",
    published: "2026-10-06",
    updated: "2026-10-06",
    intro:
      "People are usually surprised by this one, often at the audiologist's front desk. Medicare pays for a lot of medical care, and hearing aids and glasses feel like medical care. They mostly aren't, as far as Original Medicare is concerned. There are a few exceptions, and some Advantage plans add an allowance. Here's how it sorts out.",
    sections: [
      {
        h2: "Hearing: what Medicare pays for and what it doesn't",
        blocks: [
          p(
            "Original Medicare does not cover hearing aids. It also doesn't cover the exam to fit them. You pay the full cost of both.",
          ),
          p(
            `It does cover diagnostic hearing and balance exams when your doctor orders them to find out if you need medical treatment. After the Part B deductible (${money(PART_B_2026.annualDeductible)} in ${COSTS_YEAR}), you pay 20% of the Medicare-approved amount. In a hospital outpatient setting, there is a copayment on top.`,
          ),
          p(
            "Hearing aids that you buy over the counter, without a prescription, are sold for mild to moderate hearing loss. Medicare doesn't pay for those either, but they usually cost less than prescription aids.",
          ),
        ],
      },
      {
        h2: "Vision: the exceptions that matter",
        blocks: [
          p(
            "Original Medicare doesn't cover routine eye exams, eyeglasses, or contact lenses. A few things are covered, and they all have a medical reason behind them:",
          ),
          ul(
            "A yearly eye exam for diabetic eye disease, if you have diabetes.",
            "A yearly glaucoma test, if you're at high risk.",
            "Tests and some treatments for age-related macular degeneration.",
            "One pair of glasses or contact lenses after cataract surgery that implants an intraocular lens.",
          ),
          p(
            "Cataract surgery itself is covered when it is medically needed. The 20% coinsurance applies, and so does the Part B deductible.",
          ),
        ],
      },
      {
        h2: "What Medicare Advantage plans add",
        blocks: [
          p(
            "Many Advantage plans include some hearing and vision benefits. Medicare says most do. It is an extra the plan chooses to offer, so each one is different.",
          ),
          p(
            "Look for an annual dollar limit on hearing aids and on eyewear, which is often an allowance rather than full coverage. Also look for a network. Some plans only pay if you use their audiologists or their glasses supplier. And ask whether the exam is covered separately from the device.",
          ),
          p(
            "A Medicare Supplement plan, or Medigap, doesn't help here. It pays Medicare cost sharing and doesn't add hearing, vision, or dental.",
          ),
        ],
      },
      {
        h2: "What to ask before you buy",
        blocks: [
          p(
            "If you have an Advantage plan, call and ask three things before you schedule anything. What is the yearly limit? Do I have to use a certain provider? Do I need an approval first? Get the answers in writing, or write down the name of the person you talked to.",
          ),
          p(
            "If you're on Original Medicare, ask the provider for the full price in writing, including the exam and any follow-up visits. Prices vary a lot, and a written quote lets you compare. And check each fall's plan changes if you're on Advantage. These benefits can shrink from one year to the next.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does Original Medicare cover hearing aids?",
        a: "No. Original Medicare doesn't cover hearing aids or the exams to fit them. It covers diagnostic hearing exams when a doctor orders them for a medical reason.",
      },
      {
        q: "Does Medicare cover glasses after cataract surgery?",
        a: "Yes, one pair of glasses or contact lenses after cataract surgery that implants an intraocular lens. You pay the 20% coinsurance, and the Part B deductible applies.",
      },
      {
        q: "Do Medicare Advantage plans cover hearing and vision?",
        a: "Many do, but it varies by plan. Look at the yearly limit, the provider network, and whether the exam is covered apart from the device.",
      },
      {
        q: "Can a Medicare Supplement plan pay for hearing aids?",
        a: "No. Medicare Supplement plans pay Medicare's cost sharing. They don't add hearing, vision, or dental coverage.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Hearing aids",
        href: "https://www.medicare.gov/coverage/hearing-aids",
      },
      {
        label: "Medicare.gov: Hearing and balance exams",
        href: "https://www.medicare.gov/coverage/hearing-balance-exams",
      },
      {
        label: "Medicare.gov: Eyeglasses and contact lenses",
        href: "https://www.medicare.gov/coverage/eyeglasses-contact-lenses",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Does Medicare Advantage cover dental?", href: "/answers/medicare-advantage-dental-coverage" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "missed-iep-penalties",
    title: "What happens if I miss my Medicare Initial Enrollment Period?",
    metaTitle: "Missed Your Medicare Initial Enrollment Period? Next Steps",
    description:
      "Missing your Medicare Initial Enrollment Period can mean lifetime penalties and a wait for coverage. How the penalties work and what to do next. Read on.",
    keyword: "what happens if I miss my Medicare initial enrollment period",
    eyebrow: "Medicare questions, answered",
    lede: "Two things happen when you miss it: a penalty that follows you for life, and a wait for your next chance to sign up. Here is the full picture.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "Your Initial Enrollment Period runs seven months: the three months before your 65th birthday month, your birthday month, and the three months after. Miss it, and two things happen. First, you pay a late penalty on Part B, and possibly on Part D, and both penalties follow you for as long as you have Medicare. Second, you wait. You generally cannot sign up until the next General Enrollment Period, which runs January 1 to March 31 each year. There is one big exception, and it saves a lot of people: if you had health coverage through active employment, you may qualify for a Special Enrollment Period instead.",
    sections: [
      {
        h2: "The Part B penalty: 10 percent per year, for life",
        blocks: [
          p(
            "Part B charges a late enrollment penalty of 10 percent of the standard premium for each full 12-month period you were eligible but did not sign up. The standard premium is $202.90 a month in 2026. Wait one full year and you add about $20.30 a month to your premium. Wait three years and that is about $60.90 a month extra.",
          ),
          p(
            "It never goes away. It is not a fine you pay once. It is baked into your monthly premium for as long as you have Part B, which for most people means the rest of their life. A short delay of a month or two adds nothing, because the penalty only counts full 12-month periods, but a long delay compounds into real money.",
          ),
        ],
      },
      {
        h2: "The Part D penalty: 1 percent per month, for life",
        blocks: [
          p(
            `Drug coverage has its own penalty with different math. If you go 63 days or more without creditable drug coverage after you become eligible, Medicare adds 1 percent of the national base beneficiary premium to your monthly Part D premium for every month you went without. The base premium is ${money(PART_D_2026.baseBeneficiaryPremium)} in ${COSTS_YEAR}, so each month of delay adds about 39 cents.`,
          ),
          p(
            "Twelve months late adds about $4.70 a month to whatever your plan charges. Like the Part B penalty, it has no end date. And because the base premium changes each year, the dollar amount of your penalty can drift upward over time even though the percentage stays fixed.",
          ),
        ],
      },
      {
        h2: "When you can actually sign up",
        blocks: [
          p(
            "If you missed your Initial Enrollment Period and do not qualify for a Special Enrollment Period, your next chance is the General Enrollment Period, January 1 to March 31 each year. Since 2023, coverage starts the first day of the month after you enroll, so signing up in February means March 1 coverage. Before that change, everyone waited until July 1.",
          ),
          p(
            "You also get a two-month Special Enrollment Period to join a Part D drug plan once you sign up during the General Enrollment Period. Use it. Going without drug coverage while you wait just grows the Part D penalty.",
          ),
        ],
      },
      {
        h2: "The exception: creditable employer coverage",
        blocks: [
          p(
            "This is the part that saves a lot of people. If you were covered by a group health plan through your own or your spouse's current employment, and the employer has 20 or more employees, you get an 8-month Special Enrollment Period when that coverage ends. Enroll during it and there is no penalty at all.",
          ),
          p(
            "But two kinds of coverage do not count: COBRA and marketplace plans. People on COBRA often assume they are protected, and they are not. If your only coverage was COBRA, you owe the penalty and you wait for the General Enrollment Period like everyone else.",
          ),
        ],
      },
      {
        h2: "What to do right now",
        blocks: [
          p(
            "First, figure out whether you qualify for a Special Enrollment Period. If you or your spouse worked past 65 with group coverage from an employer with 20 or more employees, call Social Security and ask. If not, mark January 1 on your calendar and use the General Enrollment Period.",
          ),
          p(
            "Second, do not skip Part D while you wait. A low-cost drug plan during the gap keeps the Part D penalty from growing. Third, keep every letter about past coverage. If Medicare questions whether your old coverage was creditable, the proof is on you.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does the Part B late penalty ever go away?",
        a: "No. It stays in your monthly premium for as long as you have Part B. The only way to avoid it is to enroll on time or qualify for a Special Enrollment Period.",
      },
      {
        q: "What if I only missed it by a month or two?",
        a: "The Part B penalty only applies per full 12-month period, so a short delay adds nothing. The Part D penalty counts month by month after a 63-day gap, so even a few months can add a small permanent amount.",
      },
      {
        q: "Can I get Part A late without a penalty?",
        a: "Most people get premium-free Part A based on their work history, and there is no late penalty for it. If you have to buy Part A because of limited work history, a separate penalty can apply.",
      },
      {
        q: "Does COBRA count as creditable coverage for Medicare?",
        a: "No. COBRA and marketplace plans do not qualify you for a Special Enrollment Period, and they do not protect you from the Part B penalty. Only group coverage from current employment counts.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: When do Medicare Part A and Part B sign-up periods happen?",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "What is the Part D late enrollment penalty?", href: "/answers/medicare-part-d-late-penalty" },
      { label: "Do I have to enroll at 65 if I am still working?", href: "/answers/working-past-65-medicare" },
      { label: "How do I apply for Medicare?", href: "/answers/how-to-apply-for-medicare" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "working-past-65-medicare",
    title: "Do I have to enroll in Medicare at 65 if I am still working?",
    metaTitle: "Working Past 65? When to Enroll in Medicare",
    description:
      "Still working at 65? You may be able to delay Medicare Part B without a penalty. The 20-employee rule, the 8-month Special Enrollment Period, and the HSA trap.",
    keyword: "do I have to enroll in Medicare at 65 if still working",
    eyebrow: "Medicare questions, answered",
    lede: "You do not always have to enroll at 65. If your employer coverage is creditable, you can wait. Here is how the rules work.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "Turning 65 while you are still working is one of the most common situations I hear about, and the answer surprises people. You do not always have to enroll in Medicare at 65. If you have health coverage through your or your spouse's current job, and the employer has 20 or more employees, you can usually delay Part B with no penalty. When that job coverage ends, you get an 8-month Special Enrollment Period. But the details matter, and one mistake, contributing to a Health Savings Account while on Medicare, costs people real money every year.",
    sections: [
      {
        h2: "The 20-employee rule",
        blocks: [
          p(
            "Everything turns on the size of the employer. If the company has 20 or more employees, its group health plan pays first and Medicare pays second. That arrangement counts as creditable coverage, and it lets you delay Part B without a penalty. If the employer has fewer than 20 employees, Medicare pays first, which means you should enroll in Parts A and B at 65 even while working.",
          ),
          p(
            "Check with your benefits office if you are not sure how many employees count. Large employers sometimes have small subsidiaries, so confirm the number for the actual employing entity, not the parent company.",
          ),
        ],
      },
      {
        h2: "Part A: usually take it, with one exception",
        blocks: [
          p(
            "Part A is premium-free for almost everyone based on work history, so most people sign up at 65 even while working. It costs nothing and sits in the background as secondary coverage. The exception: if you are contributing to a Health Savings Account. You cannot contribute to an HSA once you are enrolled in any part of Medicare, including premium-free Part A.",
          ),
          p(
            "People get caught by this every year. If you want to keep funding your HSA, delay all of Medicare, including Part A, until you retire. You can still spend what is already in the HSA, you just cannot add to it.",
          ),
        ],
      },
      {
        h2: "The 8-month Special Enrollment Period",
        blocks: [
          p(
            "When your job-based coverage ends, whether you retire or switch jobs, you get an 8-month Special Enrollment Period to sign up for Part B with no late penalty. The clock starts the month after employment or coverage ends, whichever comes first.",
          ),
          p(
            "Eight months sounds generous until life gets busy. Mark the date the day your coverage ends. Miss the window and you wait for the General Enrollment Period like everyone else, penalty included.",
          ),
        ],
      },
      {
        h2: "What does not count: COBRA and marketplace plans",
        blocks: [
          p(
            "This is where people get hurt. COBRA continuation coverage does not qualify you for a Special Enrollment Period, even though it feels like employer coverage. Marketplace plans do not count either. If you retire at 66, take COBRA for 18 months, and then try to sign up for Part B, Medicare treats you as if you had no coverage.",
          ),
          p(
            "You owe the penalty and you wait for January. If you are leaving a job, sign up for Medicare during your Special Enrollment Period instead of riding out COBRA.",
          ),
        ],
      },
      {
        h2: "Drug coverage while you work",
        blocks: [
          p(
            "Your employer's drug coverage needs to be creditable too, or you face the Part D late penalty later. Each fall your plan must send a notice saying whether its drug coverage counts. Keep that letter. If you ever need to prove you had coverage, it is your proof.",
          ),
          p(
            "If you are unsure, ask your benefits office directly: is my prescription drug coverage creditable for Medicare Part D purposes? Get the answer in writing.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can I keep contributing to my HSA if I enroll in Medicare Part A?",
        a: "No. Once you enroll in any part of Medicare, including premium-free Part A, you must stop contributing to your HSA. You can still spend what is already in it.",
      },
      {
        q: "Does my spouse's small employer plan let me delay Medicare?",
        a: "Only if the employer has 20 or more employees. With a smaller employer, Medicare pays first and you should enroll in Parts A and B at 65.",
      },
      {
        q: "What happens to my employer coverage when I turn 65?",
        a: "Nothing automatic. Your employer plan continues as normal. You choose whether to add Medicare based on the 20-employee rule and your costs.",
      },
      {
        q: "I retired but my spouse still works. Can I use their plan?",
        a: "Yes, if it comes from your spouse's current employment with 20 or more employees. The same payer-order rules apply as if it were your own job.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: I am turning 65 and still working",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Can I stay on my spouse's employer plan at 65?", href: "/answers/spouse-employer-plan-medicare" },
      { label: "What if I miss my Initial Enrollment Period?", href: "/answers/missed-iep-penalties" },
      { label: "How do I apply for Medicare?", href: "/answers/how-to-apply-for-medicare" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "does-medicare-cover-chiropractic",
    title: "Does Medicare cover chiropractic care?",
    metaTitle: "Does Medicare Cover Chiropractic Care? 2026 Rules",
    description:
      "Medicare covers one chiropractic service and nothing else. What Part B pays for, what it excludes, and what you will owe at the chiropractor's office.",
    keyword: "does Medicare cover chiropractic care",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare covers one chiropractic service and nothing else. Here is exactly what Part B pays for, and what comes out of your pocket.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "The short answer is yes, but narrowly. Medicare Part B covers manual manipulation of the spine by a chiropractor to correct a vertebral subluxation. That is the entire list. It does not cover X-rays the chiropractor orders, massage therapy, electrical stimulation, or maintenance visits. After the Part B deductible, which is $283 in 2026, you pay 20 percent of the Medicare-approved amount for each covered visit. There is no annual cap on covered visits as long as the treatment stays medically necessary.",
    sections: [
      {
        h2: "The one covered service",
        blocks: [
          p(
            "Medicare covers adjustments of the spine, done by hand or with a device called an activator, to correct a subluxation. Medicare defines that as spinal joints that fail to move properly while the contact between the joints stays intact. Your chiropractor must document the subluxation and show the treatment is active and corrective.",
          ),
          p(
            "Once you reach maximum therapeutic benefit, further visits count as maintenance and Medicare stops paying. The line between active treatment and maintenance is where most coverage disputes happen, so ask your chiropractor how they document it.",
          ),
        ],
      },
      {
        h2: "What Medicare does not cover at the chiropractor",
        blocks: [
          p(
            "Everything else on the typical chiropractic menu is on you. The initial evaluation, X-rays ordered at the chiropractic office, massage therapy, acupuncture delivered by the chiropractor, ultrasound, electrical stimulation, ice and heat, exercise instruction, orthotics, and maintenance or wellness adjustments.",
          ),
          p(
            "If your chiropractor thinks Medicare will not cover a service, they must give you an Advance Beneficiary Notice before the visit, so you know the cost is yours. If they do not give you one and Medicare denies the claim, you may not have to pay.",
          ),
        ],
      },
      {
        h2: "What you will actually pay",
        blocks: [
          p(
            "After the $283 annual Part B deductible, Medicare pays 80 percent of the approved amount for each covered manipulation and you pay 20 percent. Ask the office whether they accept Medicare assignment before your first visit. If they do, they agree to the Medicare-approved amount. If not, your share can be higher.",
          ),
          p(
            "A Medigap plan pays the 20 percent coinsurance for Medicare-approved manipulation but does not expand what is covered. It will not pay for the excluded services either. Some offices offer a discount for paying at the time of service, so it never hurts to ask.",
          ),
        ],
      },
      {
        h2: "Medicare Advantage and chiropractic",
        blocks: [
          p(
            "Advantage plans must cover at least what Original Medicare covers, so the same spinal manipulation benefit applies. Some plans add supplemental chiropractic benefits, like a set number of routine visits or coverage for services Original Medicare excludes.",
          ),
          p(
            "Check your plan's Evidence of Coverage before you book, because these extras vary widely by plan. What one plan covers as a supplemental benefit, another may not cover at all.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "How many chiropractic visits does Medicare cover per year?",
        a: "There is no annual limit on medically necessary manipulation to correct a subluxation. Medicare stops covering when treatment becomes maintenance rather than active correction.",
      },
      {
        q: "Does Medicare cover chiropractic X-rays?",
        a: "No. X-rays ordered by a chiropractor are not covered under the chiropractic benefit. X-rays ordered by your doctor for a medical reason are covered separately under Part B.",
      },
      {
        q: "Does Medicare cover massage therapy at the chiropractor?",
        a: "No. Massage therapy is excluded from Medicare coverage when delivered by a chiropractor, even on the same visit as a covered adjustment.",
      },
      {
        q: "Do I need a referral to see a chiropractor on Medicare?",
        a: "Original Medicare does not require a referral. Some Medicare Advantage plans do, so check your plan first.",
      },
      {
        q: "Does Medicare cover chiropractic maintenance care?",
        a: "No. Once you reach maximum therapeutic benefit, Medicare considers further adjustments maintenance and stops paying. Your chiropractor should tell you when you cross that line and give you an Advance Beneficiary Notice before any non-covered visit.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Chiropractic services",
        href: "https://www.medicare.gov/coverage/chiropractic-services",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Original Medicare or Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "does-medicare-cover-shingles-vaccine",
    title: "Does Medicare cover the shingles vaccine?",
    metaTitle: "Does Medicare Cover the Shingles Vaccine? Shingrix Costs",
    description:
      "Shingrix costs $0 with Medicare Part D since 2023. How the Inflation Reduction Act changed vaccine coverage, and what you need to get both doses free.",
    keyword: "does Medicare cover shingles vaccine Shingrix",
    eyebrow: "Medicare questions, answered",
    lede: "Shingrix is $0 with Part D drug coverage, both doses. Here is why it is Part D and not Part B, and what to do if you have no drug coverage.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "Yes, and since January 2023 it costs you nothing. The Inflation Reduction Act requires every Medicare Part D plan to cover adult vaccines recommended by the CDC's vaccine advisory committee with no deductible, no copay, and no coinsurance. Shingrix is on that list. Both doses are $0 at an in-network pharmacy, even if you are in your plan's deductible phase. The catch: you need Part D coverage. Without it, Shingrix runs about $200 a dose, and you need two.",
    sections: [
      {
        h2: "Why it is Part D, not Part B",
        blocks: [
          p(
            "Medicare splits vaccines between its two parts, and the shingles shot landed in Part D. Flu, pneumonia, and COVID shots are Part B and have always been free. Shingles, Tdap, and most travel vaccines are Part D. That is why the $0 rule only helps if you have drug coverage, either a standalone Part D plan or a Medicare Advantage plan that includes drugs.",
          ),
          p(
            "If your Advantage plan has no drug coverage, the free-vaccine rule does not reach you. This surprises people who assume all vaccines are treated the same. They are not.",
          ),
        ],
      },
      {
        h2: "How to get both doses at $0",
        blocks: [
          p(
            "Go to an in-network pharmacy that can bill Part D vaccine claims. Most national chains can. The pharmacy bills your Part D plan directly and you pay nothing. You do not need a prescription in most states, and you do not need to meet your plan deductible first.",
          ),
          p(
            "The two doses are given two to six months apart. If you switch Part D plans between doses, that is fine. The second dose is still $0 under the new plan. Bring your Medicare card or have your Medicare number ready so the pharmacy can bill Part D directly.",
          ),
        ],
      },
      {
        h2: "Who should get Shingrix",
        blocks: [
          p(
            "The CDC recommends Shingrix for adults 50 and older, and for adults 19 and older with weakened immune systems. It is more than 90 percent effective at preventing shingles and the long-term nerve pain that can follow, which is the most common complication.",
          ),
          p(
            "If you got the older Zostavax shot years ago, get Shingrix anyway. Zostavax is no longer used in the US and Shingrix protects better. Having had shingles before does not exempt you either. Shingles can come back.",
          ),
        ],
      },
      {
        h2: "If you do not have Part D",
        blocks: [
          p(
            "About one in four Medicare beneficiaries has no drug coverage, and the free-vaccine rule does not help them. Your options: enroll in a Part D plan during the Annual Enrollment Period, October 15 to December 7. Check whether you qualify for Extra Help, which lowers drug costs and can waive penalties. Or ask your State Health Insurance Assistance Program about local options.",
          ),
          p(
            "Paying cash, around $200 a dose, is the most expensive way to get protected. A basic Part D plan often costs less per year than two cash doses of Shingrix.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Is Shingrix really free with Medicare?",
        a: "Yes, if you have Part D or a Medicare Advantage plan with drug coverage. Both doses are $0 at in-network pharmacies with no deductible.",
      },
      {
        q: "Do I need a prescription for the shingles vaccine?",
        a: "In most states, no. Pharmacies can administer it under standing protocols. Call ahead to confirm your pharmacy stocks it.",
      },
      {
        q: "What if I already had shingles?",
        a: "Get vaccinated anyway. Shingles can come back, and the CDC recommends Shingrix for adults 50 and older regardless of past shingles.",
      },
      {
        q: "Does Medicare Advantage cover Shingrix?",
        a: "Only if your Advantage plan includes Part D drug coverage. Advantage plans without drug coverage do not get the $0 vaccine benefit.",
      },
      {
        q: "How effective is Shingrix?",
        a: "Shingrix is more than 90 percent effective at preventing shingles and postherpetic neuralgia in adults 50 and older with healthy immune systems. Protection stays strong for years after the two-dose series.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Shots and vaccines",
        href: "https://www.medicare.gov/coverage/shots",
      },
      { label: CMS_PART_D_SOURCE.title, href: CMS_PART_D_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Do I need Medicare drug coverage?", href: "/answers/do-i-need-medicare-drug-coverage" },
      { label: "What is the Part D late enrollment penalty?", href: "/answers/medicare-part-d-late-penalty" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "medicare-part-d-late-penalty",
    title: "What is the Medicare Part D late enrollment penalty?",
    metaTitle: "Medicare Part D Late Enrollment Penalty: How It Works",
    description:
      "The Part D late penalty adds 1% of the base premium for every month you went without drug coverage. How it is calculated, when it applies, and how to avoid it.",
    keyword: "Medicare Part D late enrollment penalty how calculated",
    eyebrow: "Medicare questions, answered",
    lede: "The Part D penalty is small per month and permanent. Here is the math, what counts as creditable coverage, and how to avoid it entirely.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "The Part D late enrollment penalty is small per month and permanent. If you go 63 days or more without creditable drug coverage after becoming eligible for Medicare, Medicare adds 1 percent of the national base beneficiary premium to your monthly Part D premium for every month you went without. It has no end date. In 2026 the base premium is $38.99, so each month of delay adds about 39 cents. Twelve months adds about $4.70 a month, and that amount stays in your premium for as long as you have Part D.",
    sections: [
      {
        h2: "The math, step by step",
        blocks: [
          p(
            "Count the full months you went without creditable drug coverage after your Initial Enrollment Period ended. Multiply by 1 percent of the base beneficiary premium. Round to the nearest dime. In 2026, 12 months late is 12 percent of $38.99, which is $4.68, rounded to $4.70 a month.",
          ),
          p(
            "Thirty months late is about $11.70 a month. The base premium changes each year, and your penalty is recalculated against the new base, so the dollar amount can drift upward over time even though the percentage is fixed.",
          ),
        ],
      },
      {
        h2: "What counts as creditable coverage",
        blocks: [
          p(
            "Creditable means your drug coverage is expected to pay at least as much as a standard Part D plan. Coverage from a current employer, a retiree plan, the VA, and TRICARE is often creditable, but not always. Your plan must send you a notice each fall saying whether its drug coverage is creditable.",
          ),
          p(
            "Keep every one of those letters. If Medicare ever questions your gap, that letter is your proof, and without it you are arguing from memory. If you cannot find it, call the plan and ask for it in writing.",
          ),
        ],
      },
      {
        h2: "The 63-day grace period",
        blocks: [
          p(
            "Short gaps do not trigger the penalty. You get 63 continuous days without creditable coverage before the clock starts. This covers most transitions between jobs or plans without any consequence.",
          ),
          p(
            "But the months still count once you pass 63 days, so a four-month gap means four months of penalty, not four minus two. The grace period delays the start, it does not subtract from the total.",
          ),
        ],
      },
      {
        h2: "How to avoid it entirely",
        blocks: [
          p(
            "Enroll in a Part D plan during your Initial Enrollment Period, even a low-cost one, and the penalty never starts. If you have employer or VA drug coverage, confirm in writing that it is creditable. If your income is limited, Extra Help from Social Security lowers drug costs and wipes out the late penalty.",
          ),
          p(
            "And if you disagree with a penalty Medicare assigned, you can ask for reconsideration, especially if you believe your old coverage was creditable. Bring the creditable-coverage letter if you kept it.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does the Part D penalty ever go away?",
        a: "No. It is added to your monthly premium for as long as you have Part D. It can be reconsidered if you show your prior coverage was creditable.",
      },
      {
        q: "I have VA drug coverage. Do I need Part D?",
        a: "VA coverage is creditable, so no penalty applies while you have it. Many veterans still add Part D for pharmacy convenience, which is allowed.",
      },
      {
        q: "What is the base beneficiary premium?",
        a: "It is the national average Part D premium set by Medicare each year, $38.99 in 2026. The penalty is calculated from it, not from your plan's actual premium.",
      },
      {
        q: "Can Extra Help remove the penalty?",
        a: "Yes. If you qualify for Extra Help, the late penalty is waived along with reduced premiums and drug costs.",
      },
      {
        q: "I missed my Initial Enrollment Period. What should I do now?",
        a: "Enroll in a Part D plan during the Annual Enrollment Period, October 15 to December 7. The penalty is based on the months you went without creditable coverage, so enrolling sooner keeps it smaller.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Drug coverage (Part D)",
        href: "https://www.medicare.gov/drug-coverage-part-d",
      },
      { label: CMS_PART_D_SOURCE.title, href: CMS_PART_D_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Do I need Medicare drug coverage?", href: "/answers/do-i-need-medicare-drug-coverage" },
      { label: "What if I miss my Initial Enrollment Period?", href: "/answers/missed-iep-penalties" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Does Medicare cover the shingles vaccine?", href: "/answers/does-medicare-cover-shingles-vaccine" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "does-medicare-cover-cataract-surgery",
    title: "Does Medicare cover cataract surgery?",
    metaTitle: "Does Medicare Cover Cataract Surgery? 2026 Costs",
    description:
      "Medicare Part B covers medically necessary cataract surgery, the standard lens, and one pair of glasses after. What you pay and what costs extra. Read on.",
    keyword: "does Medicare cover cataract surgery",
    eyebrow: "Medicare questions, answered",
    lede: "Cataract surgery is one of the most common procedures Medicare covers. Here is what Part B pays for, what you owe, and what costs extra.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "Yes. Cataract surgery is one of the most common procedures Medicare covers, with millions performed each year. Part B covers medically necessary cataract surgery: the surgeon, the facility, anesthesia, and a conventional intraocular lens to replace your cloudy natural lens. After the Part B deductible of $283 in 2026, you pay 20 percent of the Medicare-approved amount. Medicare also covers one pair of prescription glasses or contact lenses after each cataract surgery, the one time Original Medicare pays for eyewear.",
    sections: [
      {
        h2: "What is covered, piece by piece",
        blocks: [
          p(
            "The surgeon's fee covers the evaluation, the operation, and the standard post-operative visits. The facility fee covers the outpatient surgery center or hospital department where it happens. Anesthesia during the procedure is covered. The conventional lens implant is covered. Follow-up care for complications is covered.",
          ),
          p(
            "What is not covered: premium lenses that correct astigmatism or presbyopia, and laser upgrades done purely to reduce dependence on glasses. Medicare pays its standard rate and you pay the difference for those extras. The procedure itself usually takes 15 to 30 minutes on an outpatient basis, so most people go home the same day.",
          ),
        ],
      },
      {
        h2: "What you will pay",
        blocks: [
          p(
            "After the $283 deductible, Medicare pays 80 percent and you pay 20 percent of the approved amount for the surgery itself. A Medigap plan like Plan G covers that 20 percent, often bringing your cost for the standard procedure close to zero after the deductible.",
          ),
          p(
            "With a Medicare Advantage plan, you pay whatever your plan sets, usually a copay or coinsurance per surgery. Premium lens upgrades typically cost $1,500 to $4,000 per eye out of pocket, and those are never covered by Medigap.",
          ),
        ],
      },
      {
        h2: "The glasses benefit after surgery",
        blocks: [
          p(
            "This is the exception people miss. Original Medicare almost never covers glasses, but after each cataract surgery with a lens implant, Part B covers one pair of prescription eyeglasses with standard frames or one set of contact lenses. You pay 20 percent of the cost plus any frame upgrade.",
          ),
          p(
            "The supplier must be enrolled in Medicare. If you have surgery on both eyes, you get the glasses benefit after each one.",
          ),
        ],
      },
      {
        h2: "Questions to ask before you schedule",
        blocks: [
          p(
            "Ask your surgeon whether the surgery is coded as medically necessary, because elective or purely refractive procedures are not covered. Ask which lens is the conventional one and what the premium upgrade would cost you out of pocket.",
          ),
          p(
            "Ask the surgery center whether it accepts Medicare assignment. And if you have a Medicare Advantage plan, get the prior authorization in writing before the procedure date. If your surgeon recommends a premium lens, ask for the price difference in writing before surgery day so you can decide without pressure.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does Medicare cover laser cataract surgery?",
        a: "Medicare covers the cataract removal whether a laser is used for it. If the laser is an add-on for refractive correction, that portion is not covered.",
      },
      {
        q: "Does Medicare cover premium lens implants?",
        a: "No. Medicare pays the standard monofocal rate. You pay the difference for multifocal or toric lenses, typically $1,500 to $4,000 per eye.",
      },
      {
        q: "How soon can I have surgery on the second eye?",
        a: "Medicare has no required waiting period between eyes. Your surgeon decides the timing based on healing, often a few weeks apart.",
      },
      {
        q: "Does Medigap cover cataract surgery costs?",
        a: "Medigap covers the 20 percent coinsurance on the Medicare-approved portion. It does not cover premium lens upgrades or refractive extras.",
      },
      {
        q: "Does Medicare cover a second cataract surgery?",
        a: "Yes. Each eye is covered separately when medically necessary, and the glasses benefit applies after each surgery. There is no lifetime limit on the number of covered cataract surgeries.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Cataract surgery",
        href: "https://www.medicare.gov/coverage/cataract-surgery",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Does Medicare cover hearing aids and glasses?", href: "/answers/does-medicare-cover-hearing-aids-and-glasses" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Original Medicare or Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "spouse-employer-plan-medicare",
    title: "Can I stay on my spouse's employer plan after I turn 65?",
    metaTitle: "Turning 65 on a Spouse's Employer Plan: Medicare Rules",
    description:
      "You can usually stay on your spouse's employer plan at 65 and delay Medicare. The 20-employee rule, Part D creditability, and when to sign up. Read on.",
    keyword: "can I stay on spouse employer plan after turning 65 Medicare",
    eyebrow: "Medicare questions, answered",
    lede: "In most cases, yes. The same 20-employee rule applies as if it were your own job. Here is how it works for spouses.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "Yes, in most cases. If your spouse is still working and you are covered under their employer's group health plan, you can usually stay on that plan at 65 and delay Medicare Part B without a penalty. The same 20-employee rule applies as if it were your own job: the employer needs 20 or more employees for the plan to pay first and count as creditable. When your spouse's employment or the coverage ends, you get an 8-month Special Enrollment Period to sign up for Part B.",
    sections: [
      {
        h2: "How the 20-employee rule works for spouses",
        blocks: [
          p(
            "Medicare looks at the size of the employer, not whose job it is. Twenty or more employees: the group plan pays first, Medicare second, and you can delay Part B penalty-free. Fewer than 20: Medicare pays first, and you should enroll in Parts A and B at 65.",
          ),
          p(
            "Ask your spouse's benefits office for the employee count. Large employers sometimes have small subsidiaries, so confirm the number for the actual employing entity. If the employer is close to the 20-employee line, ask every year, because growing past 20 changes which plan pays first.",
          ),
        ],
      },
      {
        h2: "Part A now or later",
        blocks: [
          p(
            "Premium-free Part A costs nothing for most people, so many spouses enroll at 65 even while on the employer plan. It becomes secondary coverage behind the group plan. The one reason to wait: Health Savings Accounts.",
          ),
          p(
            "If either of you contributes to an HSA, enrolling in any part of Medicare ends eligibility to contribute. If the HSA matters to you, delay all of Medicare until the employer coverage ends.",
          ),
        ],
      },
      {
        h2: "Do not forget Part D",
        blocks: [
          p(
            "The employer plan's drug coverage must be creditable or you face the Part D late penalty when you eventually enroll. Each fall the plan must send a notice stating whether its drug coverage counts. Keep it.",
          ),
          p(
            "Before your spouse retires, ask the benefits office directly whether the prescription coverage is creditable for Medicare Part D purposes, and get the answer in writing.",
          ),
        ],
      },
      {
        h2: "When the job ends: your 8-month window",
        blocks: [
          p(
            "When your spouse retires, changes jobs, or loses the coverage, your 8-month Special Enrollment Period starts. It begins the month after employment or coverage ends, whichever comes first. Use it to enroll in Part B with no penalty.",
          ),
          p(
            "This is also when many couples compare the employer plan against Medicare plus Medigap or Advantage, because retiree coverage is rarely as generous as active-employee coverage. Run the numbers before you default to anything. Compare premiums, deductibles, and drug costs side by side. Sometimes the employer plan wins even after 65, sometimes Medicare plus a supplement wins by a lot.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does my spouse's employer size really decide this?",
        a: "Yes. The 20-employee threshold determines whether the group plan or Medicare pays first, and only the larger-employer arrangement lets you delay Part B without penalty.",
      },
      {
        q: "What if my spouse and I are on COBRA from my spouse's old job?",
        a: "COBRA does not count. It does not qualify you for a Special Enrollment Period and does not protect you from the Part B penalty.",
      },
      {
        q: "Can both spouses delay Medicare on one spouse's plan?",
        a: "Yes, as long as the working spouse has current employment with 20 or more employees and both are covered under the plan.",
      },
      {
        q: "Should I take Part A at 65 if I am on my spouse's plan?",
        a: "Usually yes, since it is free and becomes secondary coverage. Wait only if HSA contributions are in play.",
      },
      {
        q: "What happens to my spouse's plan when they turn 65?",
        a: "Nothing changes for the working spouse. Their employer coverage continues normally. Only the spouse turning 65 needs to make a Medicare decision, using the same 20-employee rule.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: When do Medicare Part A and Part B sign-up periods happen?",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Do I have to enroll at 65 if I am still working?", href: "/answers/working-past-65-medicare" },
      { label: "What if I miss my Initial Enrollment Period?", href: "/answers/missed-iep-penalties" },
      { label: "What is the Part D late enrollment penalty?", href: "/answers/medicare-part-d-late-penalty" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "how-to-apply-for-medicare",
    title: "How do I apply for Medicare?",
    metaTitle: "How to Apply for Medicare: Online, Phone, or In Person",
    description:
      "Apply for Medicare online at ssa.gov, by phone, or at your local Social Security office. What you need, when to apply, and what happens next. Read on.",
    keyword: "how do I apply for Medicare",
    eyebrow: "Medicare questions, answered",
    lede: "Online at ssa.gov takes about ten minutes. Here is what you need, when to apply, and what happens after you submit.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "The fastest way to apply for Medicare is online at ssa.gov, and it takes about ten minutes. You can also call Social Security at 1-800-772-1213 or visit your local office in person. If you already receive Social Security benefits when you turn 65, you do not need to apply at all. Enrollment in Parts A and B is automatic, and your card arrives in the mail. Everyone else should apply during the seven-month Initial Enrollment Period around their 65th birthday.",
    sections: [
      {
        h2: "Applying online: what you need",
        blocks: [
          p(
            "Go to ssa.gov and find the Medicare application. You will need your Social Security number, your birth certificate or proof of citizenship, and information about any current health coverage. You do not need to visit an office or mail anything in most cases. If you are applying for Social Security retirement at the same time, the systems connect and one application can start both.",
          ),
          p(
            "After you submit, Social Security mails your Medicare card with your Medicare number. Keep an eye out for it and store the card somewhere safe. Never laminate it. Use a protective sleeve instead.",
          ),
        ],
      },
      {
        h2: "Applying by phone or in person",
        blocks: [
          p(
            "Call 1-800-772-1213, Monday through Friday. An agent takes the same application over the phone. If you prefer face to face, your local Social Security office takes walk-ins and appointments.",
          ),
          p(
            "In Greensboro the office is at 6005 Landmark Center Boulevard, open Monday through Friday 9 to 4. Appointments are required for most visits now, so call the local number, 1-877-319-3075, before you go.",
          ),
        ],
      },
      {
        h2: "When to apply",
        blocks: [
          p(
            "Apply during your Initial Enrollment Period: the three months before your 65th birthday month, your birthday month, and the three months after. Applying early means your coverage starts on time. Since 2023, if you apply in the last three months of the window, coverage starts the first of the next month instead of making you wait.",
          ),
          p(
            "If you are delaying Part B because of employer coverage, you apply later during your Special Enrollment Period instead. The online application handles that path too.",
          ),
        ],
      },
      {
        h2: "After you apply: the card and the next steps",
        blocks: [
          p(
            "Your red, white, and blue Medicare card arrives by mail with your Medicare number, which replaced Social Security numbers on cards years ago. Guard that number like you guarded your Social Security number. It is the key to your medical identity.",
          ),
          p(
            "Once you have Parts A and B, you can add drug coverage, compare Medigap or Advantage options, and set up how you pay the Part B premium. If you take Social Security, the premium comes out of your check automatically. While you wait for the card, you can already compare drug plans and Medigap or Advantage options so you are ready to decide the day it arrives.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I need to apply if I already get Social Security?",
        a: "No. If you receive Social Security or Railroad Retirement benefits before 65, Parts A and B start automatically and your card arrives by mail.",
      },
      {
        q: "Can someone apply for me?",
        a: "A trusted person can help you complete the application, and you can designate a representative to deal with Social Security on your behalf with the proper authorization.",
      },
      {
        q: "How long does the online application take?",
        a: "About ten minutes for most people. You get a confirmation number, and your card arrives by mail in a few weeks.",
      },
      {
        q: "What if I lose my Medicare card?",
        a: "Request a free replacement by calling 1-800-MEDICARE or logging into your ssa.gov account. Do not laminate the card; use a protective sleeve.",
      },
      {
        q: "Can I apply for Medicare before I turn 65?",
        a: "Yes. Your Initial Enrollment Period opens three months before your 65th birthday month, and applying early means your coverage starts right on time.",
      },
    ],
    sources: [
      {
        label: "Social Security: Apply for Medicare",
        href: "https://www.ssa.gov/medicare",
      },
      {
        label: "Medicare.gov: Get started with Medicare",
        href: "https://www.medicare.gov/basics/get-started-with-medicare",
      },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "What if I miss my Initial Enrollment Period?", href: "/answers/missed-iep-penalties" },
      { label: "Do I have to enroll at 65 if I am still working?", href: "/answers/working-past-65-medicare" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=turning_65_soon",
  },
  {
    slug: "does-medicare-cover-ambulance",
    title: "Does Medicare cover ambulance rides?",
    metaTitle: "Does Medicare Cover Ambulance Rides? Rules and Costs",
    description:
      "Medicare covers ambulance rides only when medically necessary. What counts, what you pay, and why non-emergency rides get denied. Read the details here.",
    keyword: "does Medicare cover ambulance rides",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare covers ambulance rides when other transportation would endanger your health. Here is what counts as medically necessary, and what you pay.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "Yes, but only when it is medically necessary. Medicare Part B covers ground ambulance transportation when other transportation would endanger your health, like emergencies or transfers between hospitals and skilled nursing facilities. After the Part B deductible of $283 in 2026, you pay 20 percent of the Medicare-approved amount. Rides that do not meet the medical-necessity rules are denied, and ambulance bills are large enough that a denial hurts.",
    sections: [
      {
        h2: "What medically necessary means",
        blocks: [
          p(
            "Medicare's test is practical: could you have gotten there any other way without risking your health? A heart attack, stroke, serious injury, or a transfer between facilities when you need monitoring all qualify. A ride to a routine doctor appointment because you do not drive usually does not.",
          ),
          p(
            "For scheduled non-emergency rides, your doctor must certify in writing that ambulance transport is medically required, and even then Medicare reviews the claim. Without that certification, the claim is usually denied. Hospital-to-hospital transfers and discharges to skilled nursing facilities are the most common covered non-emergency scenarios, always with a doctor's order.",
          ),
        ],
      },
      {
        h2: "What you will pay",
        blocks: [
          p(
            "After the $283 annual Part B deductible, Medicare pays 80 percent of the approved amount and you pay 20 percent. Ambulance charges vary by distance and level of care, and the approved amount is set by Medicare's fee schedule, not by what the company bills.",
          ),
          p(
            "A Medigap plan covers the 20 percent coinsurance. Medicare Advantage plans must cover ambulance the same way, though your copay structure may differ by plan. If the ambulance company does not accept assignment, you could owe the difference between the billed charge and the Medicare-approved amount, so always ask first.",
          ),
        ],
      },
      {
        h2: "Why claims get denied",
        blocks: [
          p(
            "The most common denial is a non-emergency ride without proper certification. Medicare also denies when the destination is not appropriate, like a ride to a facility that could not provide the needed care, or when a closer facility could have handled it.",
          ),
          p(
            "Air ambulance follows the same medical-necessity test with stricter review. If your claim is denied, you have appeal rights, and the denial letter explains each level. Medicare publishes local coverage rules that list exactly which diagnoses and situations qualify, and ambulance companies are supposed to check them before they bill you.",
          ),
        ],
      },
      {
        h2: "How to protect yourself",
        blocks: [
          p(
            "In a true emergency, call 911 and do not think about coverage. For anything scheduled, get the doctor's written order first and confirm the ambulance company accepts Medicare assignment. Ask whether the company will bill Medicare directly.",
          ),
          p(
            "Keep every document from the trip. For recurring non-emergency trips like dialysis, a doctor's written order can be set up to cover a series of rides instead of getting one per trip. And know that Medicare never covers ambulance rides outside the United States except in rare border situations.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does Medicare cover air ambulance?",
        a: "Yes, when medically necessary and ground transport would endanger you, such as remote locations or time-critical emergencies. The same 20 percent coinsurance applies after the deductible.",
      },
      {
        q: "Does Medicare cover non-emergency ambulance rides?",
        a: "Only with a doctor's written certification that ambulance transport is medically required. Without it, the claim is usually denied.",
      },
      {
        q: "What if my ambulance claim is denied?",
        a: "You can appeal. Start with redetermination by the Medicare contractor, and the denial notice lists every appeal level and deadline.",
      },
      {
        q: "Does Medicare Advantage cover ambulance differently?",
        a: "Advantage plans must cover what Original Medicare covers. Your cost sharing may be a flat copay instead of 20 percent, so check your plan.",
      },
      {
        q: "Does Medicare cover wheelchair van or stretcher van rides?",
        a: "No. Non-ambulance medical transport is not a Medicare benefit. If you need help getting to appointments, ask your State Health Insurance Assistance Program or local Area Agency on Aging about community transportation options.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Ambulance services",
        href: "https://www.medicare.gov/coverage/ambulance-services",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Does Medicare cover cataract surgery?", href: "/answers/does-medicare-cover-cataract-surgery" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
      { label: "Original Medicare or Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "medicare-advantage-plan-cancelled",
    title: "What happens if my Medicare Advantage plan gets canceled?",
    metaTitle: "Medicare Advantage Plan Canceled? Your Options",
    description:
      "If your Medicare Advantage plan is discontinued, coverage ends December 31. Your enrollment options, guaranteed-issue rights, and the December 7 deadline.",
    keyword: "what happens if my Medicare Advantage plan is canceled discontinued",
    eyebrow: "Medicare questions, answered",
    lede: "Your coverage ends December 31 and you must pick a new plan by December 7. The good news: cancellation gives you guaranteed-issue rights most people never get.",
    published: "2026-10-10",
    updated: "2026-10-10",
    intro:
      "If your insurer discontinues your Medicare Advantage plan, your coverage ends December 31 and you must pick a new plan during the Annual Enrollment Period, which closes December 7. Do nothing and you can land in Original Medicare with no drug coverage and no cap on your costs. The silver lining: an involuntary plan cancellation gives you a Special Enrollment Period and guaranteed-issue rights to buy a Medigap policy without medical underwriting, an option that is normally hard to get.",
    sections: [
      {
        h2: "Why plans get canceled",
        blocks: [
          p(
            "Insurers exit counties, merge plans, or discontinue underperforming ones every year. You will get an Annual Notice of Change each fall and a separate non-renewal notice if your plan is ending. Read both. The non-renewal notice explains your options and deadlines.",
          ),
          p(
            "Plan exits have been a live story in recent years as insurers adjust their county footprints, so this is not rare. It is a business decision, not a reflection on you.",
          ),
        ],
      },
      {
        h2: "Your timeline: act before December 7",
        blocks: [
          p(
            "The Annual Enrollment Period runs October 15 to December 7. That is your main window to choose a new Advantage plan or return to Original Medicare with a drug plan. Coverage starts January 1.",
          ),
          p(
            "Because your cancellation is involuntary, you also get a Special Enrollment Period that runs longer, but do not rely on it as your plan A. Choosing early gives you time to check that your doctors and drugs are covered under the new plan. Your new plan's drug formulary matters as much as the premium, so bring your prescription list when you compare.",
          ),
        ],
      },
      {
        h2: "The Medigap guaranteed-issue right",
        blocks: [
          p(
            "This is the part most people miss. When your Advantage plan ends through no fault of yours, federal rules give you guaranteed-issue rights for certain Medigap policies. That means insurers cannot deny you or charge more because of your health. No medical underwriting.",
          ),
          p(
            "Outside this situation, buying Medigap after your initial open enrollment usually means underwriting, and insurers can turn you down. If you have wanted Medigap but worried about qualifying, a plan cancellation opens that door. The exact plans available depend on your state and situation.",
          ),
        ],
      },
      {
        h2: "What happens if you do nothing",
        blocks: [
          p(
            "If December 7 passes with no new plan chosen, you default to Original Medicare starting January 1, Parts A and B only. No drug coverage, no out-of-pocket cap, and the Part D late penalty clock can start if you go 63 days without creditable drug coverage.",
          ),
          p(
            "You still have your Special Enrollment Period to fix it, but January without drug coverage is a bad month to have a prescription to fill. Pick something before the deadline, even if you refine the choice later.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can my Medicare Advantage plan just cancel on me?",
        a: "Yes. Insurers can discontinue plans or exit counties each year. They must notify you in advance, and you get special enrollment rights.",
      },
      {
        q: "What is guaranteed issue for Medigap?",
        a: "It means an insurer must sell you the policy regardless of your health, with no medical underwriting and no higher premium based on health. Plan cancellations trigger this right.",
      },
      {
        q: "Does the Annual Notice of Change mean my plan is canceled?",
        a: "Not necessarily. It lists changes to your current plan for next year. A separate non-renewal notice means the plan is ending.",
      },
      {
        q: "Can I switch to Original Medicare if my plan is canceled?",
        a: "Yes. You can return to Original Medicare and add a standalone Part D plan, or use your guaranteed-issue right to add Medigap too.",
      },
      {
        q: "Will I lose my doctors if my plan is canceled?",
        a: "Not necessarily. If you join a new Advantage plan, check its provider network before enrolling. If you move to Original Medicare, you can see any doctor nationwide who accepts Medicare.",
      },
    ],
    sources: [
      {
        label: "Medicare.gov: Joining a health or drug plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage",
      },
      { label: CMS_PARTS_AB_SOURCE.title, href: CMS_PARTS_AB_SOURCE.url },
    ],
    related: [
      { label: "Build your turning-65 timeline", href: "/turning-65" },
      { label: "Switching Medicare Advantage plans during AEP", href: "/answers/switching-medicare-advantage-plans-aep" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Original Medicare or Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Every 2026 Medicare cost, with its source", href: "/medicare-costs-2026" },
    ],
    startHref: "/start?topic=medicare&stage=comparing_plans",
  },
  {
    slug: "what-changes-during-medicare-annual-enrollment-2026",
    title: "What changes during Medicare Annual Enrollment 2026?",
    metaTitle: "What changes during Medicare Annual Enrollment 2026?",
    description: "Annual Enrollment runs October 15 to December 7. Learn what can change, what to check in your plan, and how to compare options.",
    keyword: "medicare annual enrollment",
    eyebrow: "Medicare questions, answered",
    lede: "Annual Enrollment is here. From October 15 to December 7, you can change your Medicare coverage for 2027.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Annual Enrollment is here. From October 15 to December 7, you can change your Medicare coverage for 2027. This is the one time each year when most people can switch Medicare Advantage plans, switch Part D drug plans, or move between Original Medicare and Medicare Advantage. Your plan can change every year. Premiums go up or down. Deductibles shift. Copays change. Drug formularies get updated. Doctor networks get revised. That is why you get an Annual Notice of Change letter every fall. Read it.",
    sections: [
      {
        h2: "Here is what to check in your ANOC letter",
        blocks: [
          p("Your premium. Is it going up? By how much?"),
          p("Your deductible. For Part D, the deductible resets every January 1."),
          p("Your copays and coinsurance. Check the drugs you actually take, not just the ones on the first page."),
          p("Your drug formulary. Is your medication still covered? What tier is it on? Tier changes affect what you pay."),
        ],
      },
      {
        h2: "Your pharmacy network",
        blocks: [
          p("Is your pharmacy still in network? Preferred pharmacies cost less."),
          p("Your doctor network. If you are in a Medicare Advantage plan, check that your doctors are still in network."),
          p("Your max out of pocket. This is the most you would pay in a year for covered services."),
          p("Your extra benefits. Dental, vision, hearing, gym membership, transportation. These can change too."),
          p("If your plan is leaving your area or ending, you get a Special Enrollment Period. You can also get a guaranteed issue right for certain Medigap plans. That is a rare second chance to get Medigap without medical underwriting."),
        ],
      },
      {
        h2: "What can you actually change during Annual Enrollment?",
        blocks: [
          p("Here is the full list."),
          p("You can switch from one Medicare Advantage plan to another. Maybe your current plan dropped your doctor, or another plan covers your drugs better, or the premium went up and a competitor is cheaper. AEP is when you make that move."),
          p("You can switch from Medicare Advantage back to Original Medicare. Some people try Advantage for a year and decide they want the flexibility of Original Medicare plus a Medigap plan. You can do that during AEP. Just know that Medigap may require medical underwriting unless you have a guaranteed issue right."),
          p("You can switch from Original Medicare to a Medicare Advantage plan. If you have been on Original Medicare and want the extra benefits some Advantage plans offer, like dental or gym memberships, AEP is the window."),
        ],
      },
      {
        h2: "What can you not do during AEP?",
        blocks: [
          p("You cannot switch Medigap plans freely. Medigap is not tied to Annual Enrollment. In most states, switching Medigap outside your initial open enrollment period means going through medical underwriting. The company can turn you down or charge more based on your health. AEP does not change that rule."),
          p("A common mistake is doing nothing. Your plan auto-renews if you take no action. That sounds easy, but it can cost you. If your premium jumped, if your drug moved to a higher tier, if your doctor left the network, you will not know until you need care. Reading the ANOC letter takes twenty minutes. It can save you real money."),
        ],
      },
      {
        h2: "To compare plans, use the Medicare Plan Finder at medicare.gov",
        blocks: [
          p("Enter your exact medications, dosages, and pharmacy. The tool shows your total yearly cost on each plan, not just the premium. A cheap premium with your drug off formulary can cost more than a higher premium plan that covers it."),
          p("Your state SHIP counselors help with this for free. In North Carolina, it is called SHIIP. They walk through the Plan Finder with you and answer questions."),
          p("Do not wait until December. The deadline is December 7. Changes take effect January 1."),
          p("If you need help understanding your options, call a local licensed agent. You can also call 1-800-MEDICARE."),
          p("This is general information only, not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "What can you actually change during annual enrollment?",
        a: "Here is the full list. You can switch from one Medicare Advantage plan to another. Maybe your current plan dropped your doctor, or another plan covers your drugs better, or the premium went up and a competitor is cheaper. AEP is when you make that move. You can switch from Medicare Advantage back to Original Medicare.",
      },
      {
        q: "What can you not do during AEP?",
        a: "You cannot switch Medigap plans freely. Medigap is not tied to Annual Enrollment. In most states, switching Medigap outside your initial open enrollment period means going through medical underwriting. The company can turn you down or charge more based on your health. AEP does not change that rule. A common mistake is doing nothing.",
      },
      {
        q: "What should I know about medicare annual enrollment?",
        a: "Your premium. Is it going up? By how much? Your deductible. For Part D, the deductible resets every January 1. Your copays and coinsurance. Check the drugs you actually take, not just the ones on the first page. Your drug formulary. Is your medication still covered? What tier is it on? Tier changes affect what you pay.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
      { label: "How does Medicare Part D drug coverage work?", href: "/answers/how-does-medicare-part-d-drug-coverage-work" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "what-should-i-do-before-during-and-after-my-65th-birthday",
    title: "What should I do before, during, and after my 65th birthday?",
    metaTitle: "What should I do before, during, and after my 65th birthday?",
    description: "Turning 65 soon? This checklist covers what to do 3 months before, during, and after your 65th birthday to get Medicare set up without missing deadlines.",
    keyword: "turning 65 checklist",
    eyebrow: "Medicare questions, answered",
    lede: "Turning 65 is when most people become eligible for Medicare. The timing matters.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Turning 65 is when most people become eligible for Medicare. The timing matters. Miss your enrollment window and you can face late penalties and gaps in coverage. Plan ahead and the whole thing is much less stressful. Here is what to do three months before, during, and after your 65th birthday.",
    sections: [
      {
        h2: "3 Months Before Your 65th Birthday",
        blocks: [
          p("Your Initial Enrollment Period starts three months before the month you turn 65. It runs through your birthday month and ends three months after it. That is seven months total. This is your main window to sign up for Part A and Part B."),
          p("First, check whether you are already getting Social Security benefits. If you are, you will usually be enrolled in Part A and Part B automatically. Your Medicare card should arrive in the mail. If you are not getting Social Security yet, you need to sign up yourself at ssa.gov, by phone, or at a local Social Security office."),
        ],
      },
      {
        h2: "During Your Birthday Month",
        blocks: [
          p("Your birthday month is the middle of your Initial Enrollment Period. If you signed up three months early, your coverage usually starts on the first day of your birthday month. If you sign up during your birthday month or later, your start date may be pushed back, which can leave a gap. Enrolling early avoids that."),
          p("If you chose Original Medicare, pick a Part D drug plan now. You need drug coverage to avoid the Part D late enrollment penalty, even if you take no prescriptions today. Also look at Medigap. Your Medigap Open Enrollment Period starts the month you turn 65 and are enrolled in Part B, and it lasts six months. During that window, you can buy any Medigap plan sold in your state regardless of health. After it closes, insurers in most states can use medical underwriting."),
        ],
      },
      {
        h2: "After Your 65th Birthday",
        blocks: [
          p("You still have three months after your birthday month in your Initial Enrollment Period. If you have not enrolled yet, do it now. Waiting past this window can mean late enrollment penalties for Part B and Part D, and you may have to wait for a General Enrollment Period."),
          p("Once your coverage starts, confirm it is active. Check at medicare.gov or call 1-800-MEDICARE. Make sure your Part D or Medicare Advantage plan shows as active. Keep your enrollment confirmation letters."),
          p("Schedule a Welcome to Medicare preventive visit. This one time visit is covered in the first 12 months after your Part B coverage starts. It includes a review of your medical history, screenings, and a plan for preventive care."),
        ],
      },
      {
        h2: "Common Mistakes to Avoid",
        blocks: [
          p("Waiting too long to enroll is the biggest one. Even if you feel healthy, penalties are real and some last as long as you have Medicare."),
          p("Assuming COBRA or retiree coverage lets you delay Part B is another. In most cases, it does not. Only active employer coverage from a current job usually counts."),
          p("Skipping Part D because you take no drugs is a third. The penalty is calculated for every month you go without creditable drug coverage. A low cost Part D plan now protects you from that penalty later."),
          p("Forgetting the Medigap window is a fourth. That six month guaranteed issue window only comes once. If you miss it, getting Medigap later can be harder and more expensive."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("You do not have to figure this out alone. Your state Health Insurance Assistance Program, called SHIP, offers free, unbiased counseling. In North Carolina, it is called SHIIP. You can also call 1-800-MEDICARE or talk to a local licensed insurance agent."),
          p("Start early, check your deadlines, and compare options based on your own doctors and prescriptions. A little planning now saves a lot of trouble later."),
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about turning 65 checklist?",
        a: "Your Initial Enrollment Period starts three months before the month you turn 65. It runs through your birthday month and ends three months after it. That is seven months total. This is your main window to sign up for Part A and Part B. First, check whether you are already getting Social Security benefits.",
      },
      {
        q: "What happens during your birthday month?",
        a: "Your birthday month is the middle of your Initial Enrollment Period. If you signed up three months early, your coverage usually starts on the first day of your birthday month. If you sign up during your birthday month or later, your start date may be pushed back, which can leave a gap. Enrolling early avoids that.",
      },
      {
        q: "What should I know about after your 65th birthday?",
        a: "You still have three months after your birthday month in your Initial Enrollment Period. If you have not enrolled yet, do it now. Waiting past this window can mean late enrollment penalties for Part B and Part D, and you may have to wait for a General Enrollment Period. Once your coverage starts, confirm it is active.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
      { label: "How does Medicare Part D drug coverage work?", href: "/answers/how-does-medicare-part-d-drug-coverage-work" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "medigap-or-medicare-advantage-which-one-fits-me",
    title: "Medigap or Medicare Advantage: which one fits me?",
    metaTitle: "Medigap or Medicare Advantage: which one fits me?",
    description: "Medigap vs Medicare Advantage explained in plain English. Learn how each works, what they cost, how networks differ, and who each option fits best.",
    keyword: "medigap vs medicare advantage",
    eyebrow: "Medicare questions, answered",
    lede: "One of the first big choices in Medicare is Medigap versus Medicare Advantage. They both work with Medicare, but in very different ways.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "One of the first big choices in Medicare is Medigap versus Medicare Advantage. They both work with Medicare, but in very different ways. You cannot have both for the same coverage. Understanding the difference helps you pick the path that fits your health, your doctors, and your budget.",
    sections: [
      {
        h2: "Original Medicare Plus Medigap",
        blocks: [
          p("Original Medicare is Part A, hospital insurance, plus Part B, medical insurance. It is run by the federal government. You can see any doctor or hospital in the country that accepts Medicare. No referrals. No network."),
          p("Original Medicare has cost sharing. You pay a Part A deductible for hospital stays, a yearly Part B deductible, then generally 20 percent coinsurance for Part B services. There is no yearly cap on what you pay out of pocket. That is where Medigap comes in."),
        ],
      },
      {
        h2: "Medicare Advantage",
        blocks: [
          p("Medicare Advantage, also called Part C, is an alternative to Original Medicare. Private insurers approved by Medicare provide your Part A and Part B coverage, and usually Part D drug coverage, all in one plan."),
          p("Most Medicare Advantage plans have a network. HMO plans usually require you to stay in network except for emergencies, and often require referrals to see specialists. PPO plans let you go out of network, but you pay more when you do. Many plans require prior authorization for certain services."),
        ],
      },
      {
        h2: "Key Differences",
        blocks: [
          p("Doctor choice: Original Medicare plus Medigap lets you see any doctor who accepts Medicare, anywhere, with no referrals. Medicare Advantage usually limits you to the plan network, and you may need referrals."),
          p("Drug coverage: with Medigap, you buy a separate Part D plan. With Medicare Advantage, drug coverage is usually built in."),
          p("Monthly cost: Medigap plus Part D means higher monthly premiums but lower costs at the point of care. Medicare Advantage means lower premiums but copays as you go, up to the out of pocket maximum."),
        ],
      },
      {
        h2: "Who Might Medigap Fit?",
        blocks: [
          p("Medigap often fits people who want freedom and predictable costs. If you see specialists often, travel a lot, split time between states, or want no referrals, take a close look at Medigap."),
          p("It also fits people comfortable paying a higher monthly premium for lower costs when they need care. If you would rather pay more each month and worry less about a big hospital bill, Medigap may fit."),
        ],
      },
      {
        h2: "Who Might Medicare Advantage Fit?",
        blocks: [
          p("Medicare Advantage often fits people who want lower monthly premiums and one all in one plan. If you are comfortable with a local network, referrals when needed, and copays as you go, it can be a good fit."),
          p("It also fits people who value the extra benefits, such as dental, vision, and hearing, if the network works for them. For people who do not travel much and like the simplicity of one card, Medicare Advantage can be easier to manage."),
        ],
      },
      {
        h2: "How to Decide",
        blocks: [
          p("Start with your doctors. List them, then check which local Medicare Advantage plans include them. If keeping your doctors is non negotiable and they are not in any local network, Original Medicare plus Medigap may be safer."),
          p("Next, list your prescriptions. Use the Medicare Plan Finder at medicare.gov to compare total yearly costs on each option, including premiums, drug costs, and cost sharing."),
          p("Then think about how you use care. Do you see specialists often? Do you travel? Do you prefer the lowest monthly premium or the lowest cost when you get sick? Your answers point in one direction."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("You do not have to decide alone. Your state SHIP program offers free, unbiased help. In North Carolina, it is called SHIIP. You can also call 1-800-MEDICARE or talk to a local licensed insurance agent who can check your doctors and prescriptions."),
          p("There is no one right answer for everyone. The right choice fits your doctors, your drugs, your budget, and how you want to get care."),
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "Who might Medigap fit?",
        a: "Medigap often fits people who want freedom and predictable costs. If you see specialists often, travel a lot, split time between states, or want no referrals, take a close look at Medigap. It also fits people comfortable paying a higher monthly premium for lower costs when they need care.",
      },
      {
        q: "Who might Medicare advantage fit?",
        a: "Medicare Advantage often fits people who want lower monthly premiums and one all in one plan. If you are comfortable with a local network, referrals when needed, and copays as you go, it can be a good fit. It also fits people who value the extra benefits, such as dental, vision, and hearing, if the network works for them.",
      },
      {
        q: "How do I decide?",
        a: "Start with your doctors. List them, then check which local Medicare Advantage plans include them. If keeping your doctors is non negotiable and they are not in any local network, Original Medicare plus Medigap may be safer. Next, list your prescriptions.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "How does Medicare Part D drug coverage work?", href: "/answers/how-does-medicare-part-d-drug-coverage-work" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "how-does-medicare-part-d-drug-coverage-work",
    title: "How does Medicare Part D drug coverage work?",
    metaTitle: "How does Medicare Part D drug coverage work?",
    description: "Medicare Part D explained in plain English. Learn how drug coverage works, what tiers mean, how the coverage gap works, and how to avoid the late enrollment",
    keyword: "medicare part d explained",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare Part D is the part of Medicare that covers prescription drugs. It is optional, but it matters.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Medicare Part D is the part of Medicare that covers prescription drugs. It is optional, but it matters. Even if you take no prescriptions today, having Part D protects you from high drug costs later and from a penalty that sticks around. Part D plans are sold by private insurers approved by Medicare. You can get Part D as a stand alone plan with Original Medicare, or as part of most Medicare Advantage plans. Details vary by plan, but the structure is the same.",
    sections: [
      {
        h2: "How Part D Works",
        blocks: [
          p("Every Part D plan has a formulary, the list of covered drugs. The formulary says which drugs are covered, what tier each drug is on, and what rules apply, such as prior authorization or step therapy. If your drug is not on the formulary, the plan will not cover it unless you get an exception."),
        ],
      },
      {
        h2: "What Tiers Mean",
        blocks: [
          p("Tiers group drugs by cost. Lower tiers are cheaper. Higher tiers cost more."),
          p("Tier 1 is usually preferred generics, the lowest cost. Tier 2 is usually generics, still low cost. Tier 3 is usually preferred brand drugs, which cost more. Tier 4 is usually non preferred drugs, costing more than Tier 3. Tier 5 is usually specialty drugs for complex conditions like cancer or rheumatoid arthritis, often with coinsurance where you pay a percentage rather than a flat copay."),
        ],
      },
      {
        h2: "The Coverage Phases",
        blocks: [
          p("Part D moves through phases each year, resetting every January 1."),
          p("First is the deductible phase, if your plan has one. You pay full cost until you meet the deductible. Some plans have no deductible or none for lower tiers."),
          p("Next is the initial coverage phase. After the deductible, you pay copays or coinsurance and the plan pays its share, until total drug costs reach a set limit."),
        ],
      },
      {
        h2: "The Part D Late Enrollment Penalty",
        blocks: [
          p("If you go 63 days or more without Part D or other creditable drug coverage after you are first eligible, you may owe a late enrollment penalty. Creditable coverage means drug coverage at least as good as standard Part D, such as from a current employer or the VA."),
          p("The penalty is 1 percent of the national base beneficiary premium for each month you went without creditable coverage. It is added to your Part D premium every month, for as long as you have Part D. It is not a one time fee."),
        ],
      },
      {
        h2: "How to Pick a Part D Plan",
        blocks: [
          p("Use the Medicare Plan Finder at medicare.gov. Enter your exact drugs, dosages, and pharmacy. It shows your estimated total yearly cost per plan, including premium, deductible, copays, and gap costs."),
        ],
      },
      {
        h2: "If Your Drug Is Not Covered",
        blocks: [
          p("You have options. Ask your doctor if a covered drug would work. Ask the plan for a formulary exception. Appeal if the exception is denied. Or switch plans during Annual Enrollment to one that covers your drug. If you get a denial, read the letter. It tells you how to appeal and the deadline."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Your state SHIP program offers free, unbiased help. In North Carolina, it is called SHIIP. You can also call 1-800-MEDICARE or talk to a local licensed insurance agent who can run a Plan Finder comparison with your actual prescriptions."),
          p("Remember: get Part D when first eligible or keep other creditable coverage, compare plans on your own drugs and pharmacy, and recheck every fall. Your drugs change and plans change. A quick check each year can save real money."),
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "How does Part D work?",
        a: "Every Part D plan has a formulary, the list of covered drugs. The formulary says which drugs are covered, what tier each drug is on, and what rules apply, such as prior authorization or step therapy. If your drug is not on the formulary, the plan will not cover it unless you get an exception.",
      },
      {
        q: "What do tiers mean?",
        a: "Tiers group drugs by cost. Lower tiers are cheaper. Higher tiers cost more. Tier 1 is usually preferred generics, the lowest cost. Tier 2 is usually generics, still low cost. Tier 3 is usually preferred brand drugs, which cost more. Tier 4 is usually non preferred drugs, costing more than Tier 3.",
      },
      {
        q: "What are the coverage phases?",
        a: "Part D moves through phases each year, resetting every January 1. First is the deductible phase, if your plan has one. You pay full cost until you meet the deductible. Some plans have no deductible or none for lower tiers. Next is the initial coverage phase.",
      },
      {
        q: "What is the Part D late enrollment penalty?",
        a: "If you go 63 days or more without Part D or other creditable drug coverage after you are first eligible, you may owe a late enrollment penalty. Creditable coverage means drug coverage at least as good as standard Part D, such as from a current employer or the VA.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "what-is-irmaa-and-how-do-i-appeal-it",
    title: "What is IRMAA and how do I appeal it?",
    metaTitle: "What is IRMAA and how do I appeal it?",
    description: "What is IRMAA? Learn how income related monthly adjustment amounts are calculated, who pays them, and how to appeal if your income has changed.",
    keyword: "irmaa explained",
    eyebrow: "Medicare questions, answered",
    lede: "If you have a higher income, you may pay more for Medicare Part B and Part D than the standard amounts.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you have a higher income, you may pay more for Medicare Part B and Part D than the standard amounts. That extra charge is called IRMAA, the Income Related Monthly Adjustment Amount. It is not a penalty. It is a surcharge based on your income from two years ago. IRMAA surprises a lot of people. A letter arrives from Social Security saying your Part B premium is higher than expected, and you are not sure why. Here is how it works, how it is calculated, and what to do if your income has dropped.",
    sections: [
      {
        h2: "What Is IRMAA?",
        blocks: [
          p("IRMAA is an extra amount added to your monthly Part B premium and your monthly Part D premium when your income is above a set threshold. Most people pay the standard Part B premium and their plan premium for Part D. People with higher incomes pay the standard amounts plus IRMAA."),
        ],
      },
      {
        h2: "How IRMAA Is Calculated",
        blocks: [
          p("Social Security decides whether you owe IRMAA based on your Modified Adjusted Gross Income, or MAGI, from two years ago. Your 2026 IRMAA is based on your 2024 tax return. MAGI is your adjusted gross income plus any tax exempt interest you reported."),
          p("Social Security gets your income from the IRS. You do not report it yourself. If your income is above the threshold for your filing status, you owe IRMAA."),
        ],
      },
      {
        h2: "What Counts as Income?",
        blocks: [
          p("MAGI includes wages, taxable Social Security benefits, pension income, withdrawals from traditional retirement accounts, capital gains, rental income, and other taxable income, plus tax exempt interest such as municipal bond interest. Qualified Roth IRA withdrawals generally do not count as taxable income. This is not tax advice. Talk to a tax professional about your situation."),
        ],
      },
      {
        h2: "How Much Is IRMAA?",
        blocks: [
          p("Exact IRMAA amounts change every year. Medicare publishes new Part B and Part D IRMAA tables each fall for the coming year, and your Social Security notice shows your exact amount."),
          p("In general, the lowest tier adds a modest amount to Part B and a small amount to Part D. The highest tier adds much more. The gap between tiers can be hundreds of dollars per month for Part B alone."),
        ],
      },
      {
        h2: "Appealing After a Life Changing Event",
        blocks: [
          p("If your income has fallen since the tax year Social Security used, you may be able to appeal based on a life changing event. Social Security defines specific qualifying events."),
        ],
      },
      {
        h2: "When Income Goes Up and Down",
        blocks: [
          p("Because of the two year lag, timing matters. Before a large withdrawal, property sale, or Roth conversion, talk to a tax professional about the IRMAA effect two years later."),
        ],
      },
      {
        h2: "Tips for Managing IRMAA",
        blocks: [
          p("Keep your tax returns and Social Security notices. When an IRMAA notice arrives, compare the income year and amount to your actual return. Mistakes are rare but happen."),
          p("If you are married, remember IRMAA uses joint income when you file jointly. Filing separately has its own thresholds and is not always better. Talk to a tax professional before changing filing status."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Start with Social Security at 1-800-772-1213 or your local office, or check your notice at ssa.gov. For how IRMAA affects Medicare premiums, call 1-800-MEDICARE. Your state SHIP program offers free help with IRMAA and appeals. In North Carolina, it is called SHIIP."),
          p("This article is general information only. It is not tax advice or personal advice. Check your own notice and talk to a tax professional about your situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What is IRMAA?",
        a: "IRMAA is an extra amount added to your monthly Part B premium and your monthly Part D premium when your income is above a set threshold. Most people pay the standard Part B premium and their plan premium for Part D. People with higher incomes pay the standard amounts plus IRMAA. IRMAA applies to Part B and Part D separately.",
      },
      {
        q: "How is IRMAA calculated?",
        a: "Social Security decides whether you owe IRMAA based on your Modified Adjusted Gross Income, or MAGI, from two years ago. Your 2026 IRMAA is based on your 2024 tax return. MAGI is your adjusted gross income plus any tax exempt interest you reported. Social Security gets your income from the IRS. You do not report it yourself.",
      },
      {
        q: "What counts as income?",
        a: "MAGI includes wages, taxable Social Security benefits, pension income, withdrawals from traditional retirement accounts, capital gains, rental income, and other taxable income, plus tax exempt interest such as municipal bond interest. Qualified Roth IRA withdrawals generally do not count as taxable income. This is not tax advice.",
      },
      {
        q: "How much is IRMAA?",
        a: "Exact IRMAA amounts change every year. Medicare publishes new Part B and Part D IRMAA tables each fall for the coming year, and your Social Security notice shows your exact amount. In general, the lowest tier adds a modest amount to Part B and a small amount to Part D. The highest tier adds much more.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "what-are-medicares-late-enrollment-penalties-and-how-do-i-avoid-them",
    title: "What are Medicare's late enrollment penalties and how do I avoid them?",
    metaTitle: "What are Medicare's late enrollment penalties and how do I",
    description: "Medicare late enrollment penalties can last for years. Learn how Part A, Part B, and Part D penalties work, how they are calculated, and how to avoid them.",
    keyword: "medicare late enrollment penalty",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare has deadlines. Miss them and you can owe a late enrollment penalty. Some penalties last a year. Others last as long as you have Medicare.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Medicare has deadlines. Miss them and you can owe a late enrollment penalty. Some penalties last a year. Others last as long as you have Medicare. Know the deadlines before you turn 65 or before you leave employer coverage.",
    sections: [
      {
        h2: "Why Penalties Exist",
        blocks: [
          p("Penalties encourage people to enroll when first eligible. The key idea is creditable coverage. If you have other coverage at least as good as Medicare, you can delay without a penalty. If not, and you wait, the penalty applies."),
        ],
      },
      {
        h2: "Part A Penalty",
        blocks: [
          p("Part A is hospital insurance. Most people get Part A premium free because they or their spouse paid Medicare taxes for at least 10 years. If you qualify for premium free Part A, there is no late enrollment penalty. You can enroll late and owe nothing extra."),
          p("If you pay a premium for Part A, the penalty is 10 percent of the Part A premium, and you pay it for twice the number of years you delayed. Most people never face a Part A penalty because they qualify for premium free Part A."),
        ],
      },
      {
        h2: "Part B Penalty",
        blocks: [
          p("Part B is medical insurance for doctor visits, outpatient care, and preventive services. Almost everyone pays a monthly premium for Part B."),
          p("The Part B late enrollment penalty is 10 percent of the standard Part B premium for each full 12 month period you went without Part B or creditable coverage. It is added to your Part B premium every month, for as long as you have Part B. It does not go away."),
        ],
      },
      {
        h2: "Part D Penalty",
        blocks: [
          p("Part D is drug coverage. The penalty applies if you go 63 days or more without Part D or other creditable drug coverage after you are first eligible."),
          p("The penalty is 1 percent of the national base beneficiary premium for each month without creditable coverage. It is added to your Part D premium every month, for as long as you have Part D."),
        ],
      },
      {
        h2: "How Penalties Interact",
        blocks: [
          p("You can owe more than one penalty at once. Delay both Part B and Part D without creditable coverage and you can owe both. Each is added to the relevant premium."),
          p("Penalties are separate from IRMAA, the income surcharge for higher earners. IRMAA is income based. Penalties are coverage based. You can owe both at the same time."),
          p("Penalties do not replace coverage. If you delay and get sick, you face medical bills without Medicare to help, plus the penalty on top."),
        ],
      },
      {
        h2: "How to Avoid Penalties",
        blocks: [
          p("Know your Initial Enrollment Period: three months before the month you turn 65, your birthday month, and three months after. Seven months total. Enroll in Part A and Part B in that window unless you have confirmed creditable coverage that lets you delay."),
          p("If you are working at 65, ask your benefits office whether your coverage is creditable for Part B and Part D. Get it in writing. Rules differ for large and small employers."),
        ],
      },
      {
        h2: "What If You Already Owe a Penalty?",
        blocks: [
          p("A penalty generally follows you as long as you have that part of Medicare. Switching plans does not remove it."),
          p("In limited cases it can be reconsidered. If you can show you had creditable coverage and an error was made, you can ask for a review. If you qualify for Extra Help, the Part D penalty may be removed."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Your state SHIP program offers free, unbiased counseling. In North Carolina, it is called SHIIP. You can also call 1-800-MEDICARE or talk to a local licensed insurance agent."),
          p("The message is simple: enroll when first eligible, or confirm in writing that your other coverage lets you delay. A few minutes of checking now can save extra premiums for years."),
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "Why penalties exist?",
        a: "Penalties encourage people to enroll when first eligible. The key idea is creditable coverage. If you have other coverage at least as good as Medicare, you can delay without a penalty. If not, and you wait, the penalty applies. What counts as creditable depends on the part.",
      },
      {
        q: "How do I avoid penalties?",
        a: "Know your Initial Enrollment Period: three months before the month you turn 65, your birthday month, and three months after. Seven months total. Enroll in Part A and Part B in that window unless you have confirmed creditable coverage that lets you delay.",
      },
      {
        q: "What if you already owe a penalty?",
        a: "A penalty generally follows you as long as you have that part of Medicare. Switching plans does not remove it. In limited cases it can be reconsidered. If you can show you had creditable coverage and an error was made, you can ask for a review. If you qualify for Extra Help, the Part D penalty may be removed.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "when-can-i-buy-a-medigap-plan-without-medical-questions",
    title: "When can I buy a Medigap plan without medical questions?",
    metaTitle: "When can I buy a Medigap plan without medical questions?",
    description: "Your Medigap Open Enrollment Period lasts 6 months and only comes once. Learn what guaranteed issue means, how underwriting works, and why timing matters.",
    keyword: "medigap open enrollment period",
    eyebrow: "Medicare questions, answered",
    lede: "Medigap, also called Medicare Supplement, helps pay costs Original Medicare does not cover.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Medigap, also called Medicare Supplement, helps pay costs Original Medicare does not cover. But you cannot buy Medigap on the same terms whenever you want. There is a one time six month window when you have a guaranteed right to buy any Medigap plan sold in your state, no matter your health. Miss it, and buying Medigap gets harder and more expensive.",
    sections: [
      {
        h2: "What Is the Medigap Open Enrollment Period?",
        blocks: [
          p("Your Medigap Open Enrollment Period starts the first day of the month you turn 65 and are enrolled in Part B. It lasts six months. During this time, insurers must sell you any Medigap plan they offer in your state, even if you have health problems. They cannot charge more because of your health or turn you down."),
        ],
      },
      {
        h2: "What Does Guaranteed Issue Mean?",
        blocks: [
          p("Guaranteed issue means the insurer must sell you the plan."),
          p("That limited exception: if you had no prior creditable coverage, the insurer can impose up to a six month waiting period for a pre existing condition. Even then, it must sell you the plan and cover other conditions right away."),
          p("Guaranteed issue is the strongest protection you get buying Medigap. It is why the six month window matters so much."),
        ],
      },
      {
        h2: "What Is Underwriting?",
        blocks: [
          p("After your Medigap Open Enrollment Period ends, insurers in most states can use medical underwriting. They can ask about your health, review your medical history, and decide whether to sell you a plan and what to charge."),
        ],
      },
      {
        h2: "Guaranteed Issue Rights Outside Open Enrollment",
        blocks: [
          p("Some situations give you a guaranteed issue right to buy Medigap even after your window ends. Common ones include your Medicare Advantage plan leaving your area, your employer coverage that supplemented Medicare ending, your Medigap insurer going out of business, or using your trial right: joining Medicare Advantage when first eligible and switching back to Original Medicare within the first year."),
        ],
      },
      {
        h2: "Standardized Plans",
        blocks: [
          p("Medigap plans are standardized in most states and labeled by letter: A, B, D, G, K, L, M, and N. Plans C and F are no longer available to people who became eligible for Medicare on or after January 1, 2020."),
        ],
      },
      {
        h2: "How Premiums Work",
        blocks: [
          p("Premiums vary by plan, company, age, and location. Companies use different pricing methods. Community rated plans charge everyone the same regardless of age. Issue age rated plans base the premium on your age when you buy, and it does not rise as you age, though it can rise with inflation. Attained age rated plans start lower when young and rise as you get older."),
        ],
      },
      {
        h2: "Common Mistakes",
        blocks: [
          p("The biggest mistake is waiting too long. People assume they can buy Medigap anytime. They try Medicare Advantage for a few years, then try to switch back and cannot pass underwriting, or the premium is far higher than at 65."),
          p("Another mistake is assuming you can switch Medigap plans freely. In most states, switching after the window requires underwriting, even to change companies for the same letter plan."),
        ],
      },
      {
        h2: "What to Do During Your Window",
        blocks: [
          p("If you want Medigap, enroll in Part B to start the clock, then shop. Compare Plan G and Plan N from several companies."),
          p("Pick a Part D drug plan at the same time using the Medicare Plan Finder at medicare.gov, based on your actual prescriptions and pharmacy."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Your state SHIP program offers free, unbiased help. In North Carolina, it is called SHIIP. Counselors can explain Medigap plans, compare premiums, and clarify your state rules. You can also call 1-800-MEDICARE or talk to a local licensed insurance agent for quotes from multiple companies."),
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the Medigap open enrollment period?",
        a: "Your Medigap Open Enrollment Period starts the first day of the month you turn 65 and are enrolled in Part B. It lasts six months. During this time, insurers must sell you any Medigap plan they offer in your state, even if you have health problems. They cannot charge more because of your health or turn you down. This window is automatic.",
      },
      {
        q: "What does guaranteed issue mean?",
        a: "Guaranteed issue means the insurer must sell you the plan. That limited exception: if you had no prior creditable coverage, the insurer can impose up to a six month waiting period for a pre existing condition. Even then, it must sell you the plan and cover other conditions right away.",
      },
      {
        q: "What is underwriting?",
        a: "After your Medigap Open Enrollment Period ends, insurers in most states can use medical underwriting. They can ask about your health, review your medical history, and decide whether to sell you a plan and what to charge.",
      },
      {
        q: "How does premiums work?",
        a: "Premiums vary by plan, company, age, and location. Companies use different pricing methods. Community rated plans charge everyone the same regardless of age. Issue age rated plans base the premium on your age when you buy, and it does not rise as you age, though it can rise with inflation.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "should-i-enroll-in-medicare-if-i-am-still-working",
    title: "Should I enroll in Medicare if I am still working?",
    metaTitle: "Should I enroll in Medicare if I am still working?",
    description: "Working past 65? Learn how Medicare works with employer coverage, when to enroll in Part A and Part B, and how HSA rules affect your decision.",
    keyword: "medicare while working",
    eyebrow: "Medicare questions, answered",
    lede: "More people are working past 65 than ever. If you are one of them, you face a choice about Medicare: enroll at 65 or delay?",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "More people are working past 65 than ever. If you are one of them, you face a choice about Medicare: enroll at 65 or delay? The answer depends on your employer coverage, your employer size, and whether you have a Health Savings Account. Get it wrong and you can face penalties, gaps in coverage, or lose HSA contributions. Get it right and you keep the coverage that fits best while avoiding extra costs.",
    sections: [
      {
        h2: "Employer Coverage Basics",
        blocks: [
          p("If you are still working at 65 with health coverage from a current job, you may be able to delay Medicare without a penalty. But rules differ for Part A and Part B, and employer size matters."),
        ],
      },
      {
        h2: "Part A While Still Working",
        blocks: [
          p("Part A is hospital insurance. Most people get it premium free after 10 years of Medicare taxes. If you qualify for premium free Part A, enrolling at 65 usually makes sense even while working. It can act as secondary coverage at no premium cost."),
        ],
      },
      {
        h2: "Part B While Still Working",
        blocks: [
          p("Part B is medical insurance with a monthly premium. With active employer coverage from a current job with 20 or more employees, you can usually delay Part B without a penalty. Many people do, to avoid paying for coverage they do not need yet."),
          p("With fewer than 20 employees, Medicare is usually primary even while you work. Enroll in Part B when first eligible. If you do not, your employer plan may pay as secondary, leaving you with bigger bills, plus a possible late penalty."),
        ],
      },
      {
        h2: "Who Pays First?",
        blocks: [
          p("When you have both employer coverage and Medicare, one payer is primary. With 20 or more employees, the employer plan is primary and Medicare is secondary. With fewer than 20, Medicare is primary."),
          p("This matters. If Medicare is primary and you do not enroll, your employer plan may pay less than you expect because it assumes Medicare paid first. Confirm with your benefits office who is primary in your situation."),
        ],
      },
      {
        h2: "HSA Rules in Detail",
        blocks: [
          p("This deserves attention because it is easy to get wrong. To contribute to an HSA, you must have a qualifying high deductible health plan and not be enrolled in Medicare."),
          p("If you are turning 65 with an HSA, talk to a tax professional and your benefits office before enrolling in Medicare."),
        ],
      },
      {
        h2: "Part D While Still Working",
        blocks: [
          p("If your employer drug coverage is creditable, at least as good as standard Part D, you can delay Part D without a penalty. Your employer sends a yearly notice saying whether drug coverage is creditable. Keep it."),
          p("When employer coverage ends, you get a Special Enrollment Period, usually two months, to join Part D. Enroll promptly. A gap of 63 days or more without creditable drug coverage can trigger the Part D late penalty."),
        ],
      },
      {
        h2: "When You Retire: A Checklist",
        blocks: [
          p("First, confirm the date your employer coverage ends, and whether COBRA or retiree coverage after that counts as creditable."),
          p("Second, enroll in Part A if you have not. If you delayed for HSA reasons, stop HSA contributions first, keeping the six month retroactive rule in mind."),
          p("Third, enroll in Part B during your Special Enrollment Period. Your employer must complete a form confirming your coverage dates."),
        ],
      },
      {
        h2: "Common Mistakes",
        blocks: [
          p("Delaying Part B with a small employer is the most common. With fewer than 20 employees, Medicare is usually primary. Delaying can mean big bills plus a penalty."),
          p("Enrolling in Part A while contributing to an HSA is another. It ends contributions, and retroactive Part A can create excess contribution problems."),
          p("Assuming COBRA lets you delay Part B is a third. It generally does not."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Talk to your employer benefits office first. Ask about employer size, whether coverage is creditable, and when coverage ends. Your state SHIP program offers free, unbiased counseling. In North Carolina, it is called SHIIP. You can also call 1-800-MEDICARE or a local licensed insurance agent."),
          p("This article is general information only. It is not personal advice, tax advice, or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "Who pays first?",
        a: "When you have both employer coverage and Medicare, one payer is primary. With 20 or more employees, the employer plan is primary and Medicare is secondary. With fewer than 20, Medicare is primary. This matters.",
      },
      {
        q: "What should I know about employer coverage basics?",
        a: "If you are still working at 65 with health coverage from a current job, you may be able to delay Medicare without a penalty. But rules differ for Part A and Part B, and employer size matters. The key question is whether your coverage is creditable.",
      },
      {
        q: "What should I know about medicare while working?",
        a: "Part A is hospital insurance. Most people get it premium free after 10 years of Medicare taxes. If you qualify for premium free Part A, enrolling at 65 usually makes sense even while working. It can act as secondary coverage at no premium cost. One major exception: the HSA rule.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "how-do-i-spot-a-medicare-scam-call",
    title: "How do I spot a Medicare scam call?",
    metaTitle: "How do I spot a Medicare scam call?",
    description: "Medicare scam calls are common and getting harder to spot. Learn the red flags, what Medicare will never ask for, and how to protect yourself and your family.",
    keyword: "medicare scam calls",
    eyebrow: "Medicare questions, answered",
    lede: "If you are on Medicare, you will get scam calls. It is not a matter of if, but when.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you are on Medicare, you will get scam calls. It is not a matter of if, but when. Scammers target Medicare beneficiaries because Medicare numbers are valuable and health care topics feel urgent and confusing. The good news: scam calls follow patterns. Once you know the red flags, they are easier to spot.",
    sections: [
      {
        h2: "Why Scams Work",
        blocks: [
          p("Scammers create urgency and fear. They say your Medicare card will be cancelled, you owe money, or you will lose coverage unless you act now. Rushed people are more likely to share personal information or say yes to something they do not understand."),
        ],
      },
      {
        h2: "What Medicare Will Never Do",
        blocks: [
          p("Medicare will never call out of the blue to ask for your Medicare number. It already has it. It will never ask for your Social Security number, bank account, or credit card by phone."),
          p("Medicare will never call to sell you a plan. It does not make sales calls. Insurers and licensed agents can call about plans, but Medicare itself does not."),
        ],
      },
      {
        h2: "Common Scams",
        blocks: [
          p("The new Medicare card scam: the caller says you need a new card and asks for your Medicare or Social Security number to send it. Medicare cards are mailed automatically. No phone request is needed."),
          p("The free equipment scam: free braces, diabetic supplies, or genetic testing, with Medicare footing the bill. They want your Medicare number to bill. Never give your Medicare number to a cold caller offering free equipment."),
        ],
      },
      {
        h2: "Red Flags",
        blocks: [
          p("Urgency: act now or lose coverage. Real Medicare communications give you time and deadlines in writing."),
          p("Requests for personal information: full Medicare number, Social Security number, bank or credit card details by phone."),
          p("Unusual payment methods: gift cards, wire transfers, cryptocurrency, prepaid cards."),
          p("Unsolicited offers of free equipment, free testing, or a new plan."),
          p("Pressure to enroll without letting you hang up or review written information."),
        ],
      },
      {
        h2: "What to Do If You Get a Scam Call",
        blocks: [
          p("Do not engage. Do not confirm personal information. Do not answer yes to questions that could be recorded as agreement. Hang up without giving anything."),
          p("Do not call back the number that called you. Call the official number instead: 1-800-MEDICARE for Medicare, 1-800-772-1213 for Social Security, or the number on the back of your plan card."),
          p("If you shared your Medicare number, call 1-800-MEDICARE right away. Check your Medicare Summary Notices and Explanation of Benefits for services you did not receive."),
        ],
      },
      {
        h2: "How to Protect Yourself",
        blocks: [
          p("Guard your Medicare number like your Social Security number. Share it only with your doctors, pharmacy, plan, and Medicare. Do not carry the card in your wallet unless you need it for an appointment."),
          p("Be skeptical of unsolicited calls, texts, and emails about Medicare. Medicare will not text you asking for personal information."),
          p("Register on the National Do Not Call Registry at donotcall.gov. It will not stop scammers, but it cuts legitimate telemarketing and makes scams easier to spot."),
        ],
      },
      {
        h2: "What About Legitimate Calls?",
        blocks: [
          p("Your plan or a licensed agent you asked to contact you may call. A legitimate caller will not ask for your full Medicare number if they already have you as a customer. They will let you hang up and call back on a published number."),
          p("When in doubt, hang up and call back using the number on your plan card or medicare.gov."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Call 1-800-MEDICARE if you are worried you shared information or see a suspicious charge. Contact your state Senior Medicare Patrol. In North Carolina, the Senior Medicare Patrol offers free help to spot and report fraud. Your state SHIP program, called SHIIP in North Carolina, offers free counseling too."),
          p("This article is general information only. If you think you are a victim of fraud, contact Medicare, your bank, and local law enforcement promptly."),
        ],
      },
    ],
    faq: [
      {
        q: "Why do scams work?",
        a: "Scammers create urgency and fear. They say your Medicare card will be cancelled, you owe money, or you will lose coverage unless you act now. Rushed people are more likely to share personal information or say yes to something they do not understand. Scammers spoof caller ID.",
      },
      {
        q: "What Medicare will never do?",
        a: "Medicare will never call out of the blue to ask for your Medicare number. It already has it. It will never ask for your Social Security number, bank account, or credit card by phone. Medicare will never call to sell you a plan. It does not make sales calls. Insurers and licensed agents can call about plans, but Medicare itself does not.",
      },
      {
        q: "What to do if you get a scam call?",
        a: "Do not engage. Do not confirm personal information. Do not answer yes to questions that could be recorded as agreement. Hang up without giving anything. Do not call back the number that called you.",
      },
      {
        q: "How do I protect yourself?",
        a: "Guard your Medicare number like your Social Security number. Share it only with your doctors, pharmacy, plan, and Medicare. Do not carry the card in your wallet unless you need it for an appointment. Be skeptical of unsolicited calls, texts, and emails about Medicare. Medicare will not text you asking for personal information.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "how-do-i-read-my-medicare-annual-notice-of-change-letter",
    title: "How do I read my Medicare Annual Notice of Change letter?",
    metaTitle: "How do I read my Medicare Annual Notice of Change letter?",
    description: "Your Annual Notice of Change letter arrives each fall. Learn how to read it, what each section means, and what to check before Annual Enrollment ends.",
    keyword: "anoc letter",
    eyebrow: "Medicare questions, answered",
    lede: "Every fall, your Medicare Advantage or Part D plan sends you an Annual Notice of Change, or ANOC. It arrives by September 30.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Every fall, your Medicare Advantage or Part D plan sends you an Annual Notice of Change, or ANOC. It arrives by September 30. It tells you what is changing in your plan for next year. It is not junk mail. It is one of the most important letters you will get all year. Plans change yearly. Premiums, deductibles, copays, drug formularies, doctor networks, and extra benefits can all shift. Your ANOC tells you exactly what is changing so you can decide whether to stay or switch during Annual Enrollment, October 15 to December 7.",
    sections: [
      {
        h2: "When You Get It",
        blocks: [
          p("Your plan must send the ANOC by September 30, by mail or electronically if you chose paperless. If you have a Medicare Advantage plan with drug coverage, one ANOC covers both. If you have separate Part D, you get one for each."),
        ],
      },
      {
        h2: "Summary of Changes",
        blocks: [
          p("The first page or two is a summary of the biggest changes. Read this first. It usually shows a table: this year, next year, and what changed, covering premium, deductible, maximum out of pocket, and key copays."),
        ],
      },
      {
        h2: "Monthly Premium",
        blocks: [
          p("Your ANOC shows this year premium and next year premium. This is what you pay monthly on top of your Part B premium. A low premium plan can still be expensive if copays, drug costs, or the out of pocket maximum are high."),
        ],
      },
      {
        h2: "Deductible",
        blocks: [
          p("The deductible is what you pay before the plan starts paying. The Part D deductible resets every January 1. If it is rising, you pay more early in the year."),
        ],
      },
      {
        h2: "Copays and Coinsurance",
        blocks: [
          p("Copays are flat amounts per service, like 20 dollars for a primary care visit. Coinsurance is a percentage, like 20 percent. Your ANOC lists changes for common services."),
        ],
      },
      {
        h2: "Maximum Out of Pocket",
        blocks: [
          p("The maximum out of pocket, or MOOP, is the most you pay in a year for covered medical services. After you hit it, the plan pays 100 percent of covered services the rest of the year. It does not include premiums or drug costs, which are tracked separately."),
        ],
      },
      {
        h2: "Drug Formulary Changes",
        blocks: [
          p("This section is critical if you take prescriptions. The formulary is your plan covered drug list. Your ANOC notes drugs added or removed, drugs moving tiers, and new rules like prior authorization or step therapy."),
        ],
      },
      {
        h2: "Pharmacy Network Changes",
        blocks: [
          p("Plans have preferred pharmacies where you pay less, standard pharmacies where you pay more, and out of network pharmacies where you pay the most. Check that your pharmacy is still in network and still preferred. A pharmacy moving from preferred to standard raises your costs even if the formulary did not change. Also check mail order terms for 90 day supplies."),
        ],
      },
      {
        h2: "Doctor and Hospital Network Changes",
        blocks: [
          p("For Medicare Advantage HMO or PPO plans, the ANOC may note that networks can change during the year. It may not list every doctor joining or leaving, but it tells you where to find the current provider directory."),
        ],
      },
      {
        h2: "Extra Benefits Changes",
        blocks: [
          p("Medicare Advantage plans often include dental, vision, hearing, gym membership, transportation, or an over the counter allowance. These can change a lot year to year. A dental allowance might drop from 1,000 to 500 dollars. A gym program might be replaced."),
        ],
      },
      {
        h2: "Service Area Changes",
        blocks: [
          p("Your ANOC notes service area changes. If your plan stops serving your county or ends entirely, you may qualify for a Special Enrollment Period. If your plan is ending, you will get more notices. If you do nothing, you may be returned to Original Medicare. Read any non renewal letter carefully."),
        ],
      },
      {
        h2: "What to Do After Reading",
        blocks: [
          p("Get help if you need it. Your state SHIP program offers free, unbiased counseling. In North Carolina, it is called SHIIP. Counselors can walk through your ANOC and run a Plan Finder comparison. You can also call 1-800-MEDICARE or a local licensed insurance agent."),
        ],
      },
      {
        h2: "Common Mistakes",
        blocks: [
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "What to do after reading?",
        a: "Decide whether the changes are acceptable. A small premium increase with stable doctors, drugs, and copays may be fine. A drug tier jump, a doctor leaving the network, or a MOOP spike is worth comparing against other plans. Compare during Annual Enrollment, October 15 to December 7, using the Medicare Plan Finder.",
      },
      {
        q: "When you get it?",
        a: "Your plan must send the ANOC by September 30, by mail or electronically if you chose paperless. If you have a Medicare Advantage plan with drug coverage, one ANOC covers both. If you have separate Part D, you get one for each. If yours has not arrived by early October, call your plan. You need it before Annual Enrollment starts.",
      },
      {
        q: "What should I know about summary of changes?",
        a: "The first page or two is a summary of the biggest changes. Read this first. It usually shows a table: this year, next year, and what changed, covering premium, deductible, maximum out of pocket, and key copays. Watch the direction of changes. A 10 dollar monthly premium increase is 120 dollars a year.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "how-do-i-check-if-my-doctor-takes-my-medicare-plan",
    title: "How do I check if my doctor takes my Medicare plan?",
    metaTitle: "How do I check if my doctor takes my Medicare plan?",
    description: "Do you need to check if your doctor takes your Medicare plan? Learn how networks work in Medicare Advantage vs Original Medicare and how to confirm your doctor",
    keyword: "medicare doctor networks",
    eyebrow: "Medicare questions, answered",
    lede: "Can I keep my doctor? It is one of the most common Medicare questions. The answer depends on your coverage type.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Can I keep my doctor? It is one of the most common Medicare questions. The answer depends on your coverage type. Original Medicare and Medicare Advantage handle networks very differently.",
    sections: [
      {
        h2: "Original Medicare: No Network",
        blocks: [
          p("Original Medicare, Part A plus Part B, has no network. You can see any doctor, specialist, or hospital in the country that accepts Medicare. No referrals. No prior plan approval."),
          p("Most doctors accept Medicare, but a small number have opted out. If your doctor opted out, Medicare will not pay and you pay full cost. Always confirm your doctor accepts Medicare."),
        ],
      },
      {
        h2: "Medicare Advantage: Networks Matter",
        blocks: [
          p("Medicare Advantage, or Part C, comes from private insurers. Most plans have a network of contracted doctors, hospitals, and providers."),
          p("HMO plans usually require you to stay in network except for emergencies, often require a primary care doctor, and usually need referrals for specialists. Prior authorization is common, meaning the plan approves certain services before you get them."),
          p("PPO plans offer more flexibility. You can go out of network but pay more. Referrals are not always needed. The trade off is often higher premiums and cost sharing than HMO plans."),
        ],
      },
      {
        h2: "How to Check If Your Doctor Is Covered",
        blocks: [
          p("Do not rely only on the doctor office saying they take your insurance. Verify the details."),
          p("First, use the plan provider directory. Search by doctor name, specialty, or location. Confirm your specific doctor is listed, not just the practice. Doctors in one practice can have different network status."),
          p("Second, call the plan. Directories can be out of date. Call member services on the back of your plan card. Give the doctor full name and your plan name and ID. Ask them to confirm in the system."),
        ],
      },
      {
        h2: "If Your Doctor Is Not in Network",
        blocks: [
          p("You can switch to an in network doctor. Ask your current doctor for a recommendation or ask the plan for a list in the same specialty."),
          p("You can check out of network coverage. PPO plans often cover it at higher cost. HMO plans usually do not, except emergencies. Read your plan Evidence of Coverage."),
          p("You can ask for a continuity of care exception. If you are mid treatment, such as chemotherapy, some plans let you keep your doctor for a limited time while you transition. You must request it and get approval."),
        ],
      },
      {
        h2: "Referrals and Prior Authorization",
        blocks: [
          p("HMO plans usually need referrals from your primary care doctor to see specialists, and prior authorization from the plan for services like MRIs, surgeries, or certain drugs. Original Medicare needs neither for most services."),
          p("Make sure prior authorization is approved before you get the service. Without it, the plan may deny the claim and you may owe full cost. Your doctor office usually handles the request, but follow up to confirm approval before your appointment."),
          p("If authorization is denied, you can appeal. The denial letter explains why and how. Ask your doctor to help by providing records showing medical need."),
        ],
      },
      {
        h2: "Tips for Keeping Your Doctors",
        blocks: [
          p("List every doctor you see: primary care, specialists, dentist, eye doctor, therapists. Include practice names and phone numbers. Update it when things change."),
          p("Check the list against your plan every fall before December 7. If a doctor is leaving, you have time to switch plans."),
          p("Before any procedure, confirm network status for everyone involved, especially for surgery where the surgeon, anesthesiologist, hospital, and lab may bill separately."),
        ],
      },
      {
        h2: "Getting Help",
        blocks: [
          p("Your state SHIP program offers free, unbiased help. In North Carolina, it is called SHIIP. Counselors can help you check networks and compare plans. You can also call 1-800-MEDICARE or a local licensed insurance agent to check your doctors against plan networks."),
          p("The key point: with Original Medicare, you can see any doctor who accepts Medicare. With Medicare Advantage, the network decides who you can see and what you pay. Check before you enroll, and check again every fall."),
          p("This article is general information only. It is not personal advice or a recommendation about any specific plan."),
        ],
      },
    ],
    faq: [
      {
        q: "How do I check if your doctor is covered?",
        a: "Do not rely only on the doctor office saying they take your insurance. Verify the details. First, use the plan provider directory. Search by doctor name, specialty, or location. Confirm your specific doctor is listed, not just the practice. Doctors in one practice can have different network status. Second, call the plan.",
      },
      {
        q: "What should I know about original Medicare?",
        a: "Original Medicare, Part A plus Part B, has no network. You can see any doctor, specialist, or hospital in the country that accepts Medicare. No referrals. No prior plan approval. Most doctors accept Medicare, but a small number have opted out. If your doctor opted out, Medicare will not pay and you pay full cost.",
      },
      {
        q: "What should I know about Medicare advantage?",
        a: "Medicare Advantage, or Part C, comes from private insurers. Most plans have a network of contracted doctors, hospitals, and providers. HMO plans usually require you to stay in network except for emergencies, often require a primary care doctor, and usually need referrals for specialists.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "which-student-loan-repayment-plan-is-right-for-me",
    title: "Which student loan repayment plan is right for me?",
    metaTitle: "Which student loan repayment plan is right for me?",
    description: "Learn how federal student loan repayment plans work, including standard, graduated, and income-driven options, so you can pick the one that fits your budget.",
    keyword: "student loan repayment plans",
    eyebrow: "Student loans, explained",
    lede: "If you have federal student loans, you get to choose how you pay them back.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you have federal student loans, you get to choose how you pay them back. That choice affects your monthly payment, how much interest you pay, and how long you stay in debt. Many borrowers accept the default plan and never revisit it. That can work, but it is not always the best fit. Your income changes, your expenses change, and the right plan at graduation may not be the right plan three years later.",
    sections: [
      {
        h2: "Standard Repayment",
        blocks: [
          p("Here is how the main federal repayment plans work."),
          p("Standard repayment is the default for most federal loans. You pay a fixed amount every month for up to 10 years. For consolidation loans, the term can run longer depending on the balance."),
          p("The upside is clear. You pay off the loans fast and pay less interest overall than on longer plans. The short term keeps your total cost lower."),
        ],
      },
      {
        h2: "Graduated Repayment",
        blocks: [
          p("Graduated repayment also runs up to 10 years for most loans, longer for consolidation loans. Payments start lower and increase, usually every two years. The idea is that your income will grow over time, so your payment grows with it."),
          p("This helps if you are starting in an entry level job and expect raises. The early payments are more manageable, and you get breathing room while you settle in."),
        ],
      },
      {
        h2: "Income-Driven Repayment",
        blocks: [
          p("After 20 or 25 years of payments, depending on the plan, any remaining balance may be forgiven. That forgiveness is not automatic. You must stay in the plan, recertify your income every year, and follow the plan rules. Any amount forgiven may be treated as taxable income under current tax rules, unless an exception applies. Talk to a tax professional before counting on forgiveness."),
        ],
      },
      {
        h2: "How to Compare the Plans",
        blocks: [
          p("Do not pick based on the monthly payment alone. Look at three numbers together."),
          p("First, your monthly payment now. Can you pay it without falling behind on rent, food, and other basics? If not, you need a lower payment option."),
          p("Second, your total cost. How much will you pay in principal plus interest over the full life of the plan? A lower payment almost always means a higher total cost."),
          p("Third, your timeline. Ten years versus 20 or 25 years is a big difference in how long debt follows you."),
        ],
      },
      {
        h2: "Can You Change Plans Later?",
        blocks: [
          p("Yes. For federal loans, you can switch repayment plans as your situation changes. To switch, contact your servicer and apply for the new plan. For IDR, you will provide income documentation and recertify every year. Miss that recertification and your payment can jump, so put the deadline on your calendar."),
          p("You can also pay extra at any time, on any plan. Extra payments go toward principal and shorten your timeline. Tell your servicer to apply extra money to principal, not to a future payment."),
        ],
      },
      {
        h2: "A Simple Way to Choose",
        blocks: [
          p("Can you afford the standard payment comfortably? If yes, that is often the cleanest path. You pay less interest and finish in 10 years."),
          p("Is the standard payment too high now, but you expect steady income growth? Graduated repayment may give you the runway you need."),
          p("Is your income low compared to your balance, or does it change a lot? IDR may fit better, keeping payments tied to what you can actually pay."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("Pull up your loan details on your servicer site. Write down each loan, its balance, its interest rate, and its current plan. Then compare standard, graduated, and IDR."),
          p("Keep autopay on if you use it. Many servicers offer a small interest rate reduction for autopay on federal loans."),
          p("If you are having trouble making payments, do not just stop paying. Contact your servicer before you miss a payment and ask about deferment, forbearance, and IDR."),
        ],
      },
    ],
    faq: [
      {
        q: "How do I compare the plans?",
        a: "Do not pick based on the monthly payment alone. Look at three numbers together. First, your monthly payment now. Can you pay it without falling behind on rent, food, and other basics? If not, you need a lower payment option. Second, your total cost. How much will you pay in principal plus interest over the full life of the plan?",
      },
      {
        q: "Can you change plans later?",
        a: "Yes. For federal loans, you can switch repayment plans as your situation changes. To switch, contact your servicer and apply for the new plan. For IDR, you will provide income documentation and recertify every year. Miss that recertification and your payment can jump, so put the deadline on your calendar.",
      },
      {
        q: "What should I know about standard repayment?",
        a: "Here is how the main federal repayment plans work. Standard repayment is the default for most federal loans. You pay a fixed amount every month for up to 10 years. For consolidation loans, the term can run longer depending on the balance. The upside is clear. You pay off the loans fast and pay less interest overall than on longer plans.",
      },
    ],
    sources: [
      { label: "Federal Student Aid", href: "https://studentaid.gov/" },
    ],
    related: [
      { label: "How does student loan forgiveness work?", href: "/answers/how-does-student-loan-forgiveness-work" },
      { label: "Should I refinance my student loans?", href: "/answers/should-i-refinance-my-student-loans" },
      { label: "Should I pay off student loans or invest?", href: "/answers/should-i-pay-off-student-loans-or-invest" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-does-student-loan-forgiveness-work",
    title: "How does student loan forgiveness work?",
    metaTitle: "How does student loan forgiveness work?",
    description: "A plain English guide to student loan forgiveness programs, including PSLF, Teacher Loan Forgiveness, and income-driven repayment forgiveness, and who",
    keyword: "student loan forgiveness",
    eyebrow: "Student loans, explained",
    lede: "Student loan forgiveness sounds simple. Work a certain job for a certain number of years, and the rest of your loans disappear.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Student loan forgiveness sounds simple. Work a certain job for a certain number of years, and the rest of your loans disappear. In real life, each program has detailed rules about which loans count, which employers count, how many payments you need, and what paperwork to file. Getting it wrong can cost you years. Getting it right can erase a large balance. Here is how the three main federal programs work.",
    sections: [
      {
        h2: "Public Service Loan Forgiveness, or PSLF",
        blocks: [
          p("PSLF forgives the remaining balance on your Direct Loans after you make 120 qualifying monthly payments while working full time for a qualifying employer."),
          p("Qualifying employers include federal, state, local, or tribal government agencies, and many nonprofit organizations. Private for profit employers do not qualify, even if the work feels like public service."),
        ],
      },
      {
        h2: "Teacher Loan Forgiveness",
        blocks: [
          p("Teacher Loan Forgiveness is a separate program for teachers who work in low income schools. If you teach full time for five complete and consecutive academic years in a low income school or educational service agency, you may qualify for forgiveness on your Direct Loans or FFEL loans."),
          p("The amount depends on what and where you teach. Highly qualified teachers of math, science, and special education may qualify for up to 17,500 dollars. Other eligible teachers may qualify for up to 5,000 dollars."),
        ],
      },
      {
        h2: "Income-Driven Repayment Forgiveness",
        blocks: [
          p("Even without public service or teaching, your loans may be forgiven after a long time on an income-driven plan. You enroll in IDR, make payments based on your income and family size, and recertify your income every year. After 20 or 25 years, depending on the plan, any remaining balance may be forgiven."),
          p("The timeline depends on the plan and, in some cases, whether your loans were for undergraduate or graduate study."),
        ],
      },
      {
        h2: "What Does Not Count",
        blocks: [
          p("Deferment and forbearance pause payments for a time. They do not erase debt, and interest may keep building depending on the loan type."),
          p("Discharge is different from forgiveness. It can apply in specific situations like total and permanent disability or school closure, each with strict requirements."),
          p("Refinancing a federal loan into a private loan does not forgive anything. It removes your access to federal forgiveness programs. Once refinanced into a private loan, you cannot get PSLF, Teacher Loan Forgiveness, or IDR forgiveness on that loan. Think carefully before refinancing federal loans."),
        ],
      },
      {
        h2: "How to Keep Track",
        blocks: [
          p("Forgiveness programs reward good records. Keep a folder with your loan details, employment certification forms, payment history, and servicer letters. Save copies of everything you submit."),
          p("Check your qualifying payment count at least once a year. If a payment you expected to count does not count, ask why right away. Fixing it early is much easier than fixing it after years."),
          p("If you change jobs, confirm the new employer qualifies before assuming your PSLF clock keeps running. If you change repayment plans, confirm the new plan qualifies for the forgiveness program you are pursuing."),
        ],
      },
      {
        h2: "Which Program Might Fit You?",
        blocks: [
          p("Do you plan to work full time for a government agency or qualifying nonprofit for 10 years? Look closely at PSLF."),
          p("Do you teach full time in a low income school? Look at Teacher Loan Forgiveness, and think about how it fits with PSLF over time if you stay in public service."),
          p("Is your income low compared to your balance, and are you on an IDR plan? Then IDR forgiveness may apply after the full term, even if the other programs do not."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("If you think you might qualify, do not wait. Check your loan types on the official federal student aid site. Confirm your employer qualifies. Confirm your repayment plan qualifies. Submit your employment certification."),
          p("Forgiveness is not quick and not automatic. But for borrowers who meet the rules and keep good records, it can erase a meaningful amount of debt. The work is in the details, and the details are worth getting right."),
        ],
      },
    ],
    faq: [
      {
        q: "What does not count?",
        a: "Deferment and forbearance pause payments for a time. They do not erase debt, and interest may keep building depending on the loan type. Discharge is different from forgiveness. It can apply in specific situations like total and permanent disability or school closure, each with strict requirements.",
      },
      {
        q: "How do I keep track?",
        a: "Forgiveness programs reward good records. Keep a folder with your loan details, employment certification forms, payment history, and servicer letters. Save copies of everything you submit. Check your qualifying payment count at least once a year. If a payment you expected to count does not count, ask why right away.",
      },
      {
        q: "Which program might fit you?",
        a: "Do you plan to work full time for a government agency or qualifying nonprofit for 10 years? Look closely at PSLF. Do you teach full time in a low income school? Look at Teacher Loan Forgiveness, and think about how it fits with PSLF over time if you stay in public service.",
      },
    ],
    sources: [
      { label: "Federal Student Aid", href: "https://studentaid.gov/" },
    ],
    related: [
      { label: "Which student loan repayment plan is right for me?", href: "/answers/which-student-loan-repayment-plan-is-right-for-me" },
      { label: "Should I refinance my student loans?", href: "/answers/should-i-refinance-my-student-loans" },
      { label: "Should I pay off student loans or invest?", href: "/answers/should-i-pay-off-student-loans-or-invest" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "should-i-refinance-my-student-loans",
    title: "Should I refinance my student loans?",
    metaTitle: "Should I refinance my student loans?",
    description: "Student loan refinancing can lower your rate or payment, but it can also cost you federal protections. Learn when refinancing helps and when to skip it.",
    keyword: "student loan refinancing",
    eyebrow: "Student loans, explained",
    lede: "Refinancing means taking out a new loan to pay off your old loans, ideally at a lower rate or with a better payment. Sometimes that is smart.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Refinancing means taking out a new loan to pay off your old loans, ideally at a lower rate or with a better payment. Sometimes that is smart. Sometimes it is a costly mistake. The difference comes down to what kind of loans you have, what protections you would give up, and whether the new terms actually improve your situation.",
    sections: [
      {
        h2: "What Refinancing Means",
        blocks: [
          p("When you refinance, a private lender pays off your existing loans and issues you a new loan with new terms. That is different from federal consolidation, which combines federal loans into one federal loan and keeps federal protections."),
          p("Once you refinance a federal loan into a private loan, you cannot move it back. The federal options are gone for that loan. That one fact should drive the whole decision."),
        ],
      },
      {
        h2: "When Refinancing Can Make Sense",
        blocks: [
          p("Refinancing fits a narrow set of situations."),
          p("You have private student loans. Private loans do not come with federal protections like income-driven repayment or Public Service Loan Forgiveness. If you can get a lower rate, you are not giving up benefits you never had."),
          p("You have federal loans but are confident you will not need federal protections. That could mean stable, high income, a solid emergency fund, no public service plans, and no need for income-driven repayment. A lower rate could save interest over time."),
        ],
      },
      {
        h2: "When Refinancing Does Not Make Sense",
        blocks: [
          p("Refinancing is often a bad fit if any of these apply."),
          p("You are working toward Public Service Loan Forgiveness, or might in the future. Refinanced federal loans do not qualify."),
          p("You are on, or may need, an income-driven repayment plan. Private loans do not offer IDR. If your income drops, a private lender may not lower your payment the way IDR would."),
        ],
      },
      {
        h2: "Fixed Versus Variable Rates",
        blocks: [
          p("A fixed rate stays the same for the life of the loan, so your payment is predictable. A variable rate can start lower but can go up or down with a benchmark rate, so your payment can change."),
          p("Variable rates can make sense if you plan to pay the loan off quickly and can handle an increase. For most borrowers who want stability, a fixed rate is easier to plan around. Ask how often a variable rate can adjust and whether there is a cap."),
        ],
      },
      {
        h2: "What Lenders Look At",
        blocks: [
          p("Private refinance lenders typically review your credit score, income, employment history, existing debt, and payment history. A higher score and stable income usually lead to better offers. A cosigner with strong credit can help some borrowers qualify, but the cosigner is fully responsible if you cannot pay."),
        ],
      },
      {
        h2: "Fees and Fine Print",
        blocks: [
          p("Many refinance lenders do not charge an origination fee, but some do. Ask directly. Check for prepayment penalties and confirm you can pay extra or pay off early without a fee. Ask about autopay discounts and whether they last for the life of the loan."),
          p("Ask what happens if you miss a payment: late fees, grace periods, and hardship options. Get the answers in writing."),
          p("Check whether the lender offers any death or disability discharge. Federal loans have clear discharge rules. Private loans vary."),
        ],
      },
      {
        h2: "How to Compare Offers",
        blocks: [
          p("Do not compare by rate alone. For each offer, write down the rate, whether it is fixed or variable, the term, the monthly payment, the total amount you will pay over the life of the loan, and all fees."),
        ],
      },
      {
        h2: "What to Do Before You Decide",
        blocks: [
          p("List every loan with its type, balance, rate, servicer, and payment. Mark which are federal and which are private. Write down which federal benefits you use now or might need later. If that list is not empty, be cautious about refinancing those federal loans."),
        ],
      },
    ],
    faq: [
      {
        q: "What do refinancing mean?",
        a: "When you refinance, a private lender pays off your existing loans and issues you a new loan with new terms. That is different from federal consolidation, which combines federal loans into one federal loan and keeps federal protections. Once you refinance a federal loan into a private loan, you cannot move it back.",
      },
      {
        q: "When refinancing can make sense?",
        a: "Refinancing fits a narrow set of situations. You have private student loans. Private loans do not come with federal protections like income-driven repayment or Public Service Loan Forgiveness. If you can get a lower rate, you are not giving up benefits you never had.",
      },
      {
        q: "When does refinancing not make sense?",
        a: "Refinancing is often a bad fit if any of these apply. You are working toward Public Service Loan Forgiveness, or might in the future. Refinanced federal loans do not qualify. You are on, or may need, an income-driven repayment plan. Private loans do not offer IDR.",
      },
      {
        q: "What lenders look at?",
        a: "Private refinance lenders typically review your credit score, income, employment history, existing debt, and payment history. A higher score and stable income usually lead to better offers. A cosigner with strong credit can help some borrowers qualify, but the cosigner is fully responsible if you cannot pay.",
      },
    ],
    sources: [
      { label: "Federal Student Aid", href: "https://studentaid.gov/" },
    ],
    related: [
      { label: "Which student loan repayment plan is right for me?", href: "/answers/which-student-loan-repayment-plan-is-right-for-me" },
      { label: "How does student loan forgiveness work?", href: "/answers/how-does-student-loan-forgiveness-work" },
      { label: "Should I pay off student loans or invest?", href: "/answers/should-i-pay-off-student-loans-or-invest" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "should-i-pay-off-student-loans-or-invest",
    title: "Should I pay off student loans or invest?",
    metaTitle: "Should I pay off student loans or invest?",
    description: "Should you pay off student loans or invest? Learn how to compare interest rates, employer match, risk, and flexibility so you can make a clear decision.",
    keyword: "pay off student loans or invest",
    eyebrow: "Student loans, explained",
    lede: "Pay off student loans or invest? Both moves can be smart. Paying off debt gives you a guaranteed return in the form of interest you no longer pay.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Pay off student loans or invest? Both moves can be smart. Paying off debt gives you a guaranteed return in the form of interest you no longer pay. Investing gives you a chance at growth, but with risk and no guarantee. The best choice depends on your interest rate, your cash flow, your employer match, and how much risk you can handle.",
    sections: [
      {
        h2: "Start With the Basics",
        blocks: [
          p("Before choosing between extra loan payments and investing, cover the basics."),
          p("Build a small emergency fund. If you have no cash cushion, an unexpected bill can push you back into high interest debt. Many financial educators suggest starting with one month of essential expenses, then building toward three to six months over time."),
        ],
      },
      {
        h2: "Compare the Interest Rate to Expected Returns",
        blocks: [
          p("Your loan rate is a known cost. If your loan charges 5 percent, paying it off early saves you from paying that 5 percent. That saving is certain."),
          p("Investing returns are not guaranteed. The stock market has historically averaged in the high single digits over long periods before inflation, but averages hide wide variation. Some years are up, some are down. Your actual return depends on what you invest in and how long you stay invested."),
        ],
      },
      {
        h2: "Consider Your Loan Type",
        blocks: [
          p("Federal and private loans are different. Federal loans offer income-driven repayment, deferment, forbearance, and forgiveness programs. Private loans offer fewer protections, so paying them off can feel more urgent, especially at higher rates."),
          p("If you are on an income-driven plan expecting forgiveness after 20 or 25 years, extra payments may reduce the amount forgiven while tying up cash. Talk to a financial professional before paying ahead in that situation."),
        ],
      },
      {
        h2: "Think About Risk and Psychology",
        blocks: [
          p("Money is not only math. Some people sleep better with no debt, even if investing might earn more on paper. That peace of mind is real."),
          p("Others are comfortable carrying low rate debt while investing for the long term. They accept market swings because they have a long horizon and stable income."),
        ],
      },
      {
        h2: "Think About Time Horizon",
        blocks: [
          p("If you need the money in the next year or two, investing in stocks is riskier. Short term drops can hurt. Paying down debt or keeping cash in a safe account may fit short term goals better."),
          p("If you are investing for retirement decades away, you have more time to ride out swings. That longer horizon makes investing more reasonable, even while carrying low rate student loans."),
        ],
      },
      {
        h2: "A Balanced Approach",
        blocks: [
          p("You do not have to pick one completely. Many people split the difference."),
          p("One common approach: make minimum loan payments, get the full employer match, build your emergency fund, then split extra money between loan payments and investing. You make progress on both fronts."),
          p("Another: pay off the highest rate loan first while investing a smaller amount consistently. Once that loan is gone, redirect its payment to investing or the next loan."),
        ],
      },
      {
        h2: "What About Retirement Accounts?",
        blocks: [
          p("Workplace plans like a 401k, and IRAs, have tax advantages that extra loan payments do not. Traditional contributions may reduce your taxable income in the year you contribute. Roth contributions grow tax free, and withdrawals in retirement are generally tax free if you meet the rules."),
        ],
      },
      {
        h2: "A Simple Decision Checklist",
        blocks: [
          p("What is your student loan interest rate? Higher rate loans lean toward payoff. Lower rate loans lean toward investing."),
          p("Do you get an employer match? Get the full match before extra loan payments."),
          p("Do you have an emergency fund? Build one before putting large extra amounts toward either loans or investing."),
          p("Are you pursuing forgiveness? If yes, do not pay extra without understanding how it affects forgiveness."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("List your loans, rates, and payments. List your savings and investment accounts. Write down your employer match, if any."),
          p("Pick a split that feels sustainable. Set up automatic payments and automatic contributions so the plan runs without willpower. Review once a year, or when your income, loan rate, or goals change."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the basics?",
        a: "Before choosing between extra loan payments and investing, cover the basics. Build a small emergency fund. If you have no cash cushion, an unexpected bill can push you back into high interest debt. Many financial educators suggest starting with one month of essential expenses, then building toward three to six months over time.",
      },
      {
        q: "What should I know about the interest rate to expected?",
        a: "Your loan rate is a known cost. If your loan charges 5 percent, paying it off early saves you from paying that 5 percent. That saving is certain. Investing returns are not guaranteed. The stock market has historically averaged in the high single digits over long periods before inflation, but averages hide wide variation.",
      },
      {
        q: "What about retirement accounts?",
        a: "Workplace plans like a 401k, and IRAs, have tax advantages that extra loan payments do not. Traditional contributions may reduce your taxable income in the year you contribute. Roth contributions grow tax free, and withdrawals in retirement are generally tax free if you meet the rules.",
      },
    ],
    sources: [
      { label: "Federal Student Aid", href: "https://studentaid.gov/" },
    ],
    related: [
      { label: "Which student loan repayment plan is right for me?", href: "/answers/which-student-loan-repayment-plan-is-right-for-me" },
      { label: "How does student loan forgiveness work?", href: "/answers/how-does-student-loan-forgiveness-work" },
      { label: "Should I refinance my student loans?", href: "/answers/should-i-refinance-my-student-loans" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "should-i-buy-or-lease-a-car",
    title: "Should I buy or lease a car?",
    metaTitle: "Should I buy or lease a car?",
    description: "Buy vs lease a car? Learn how leasing works, how buying works, and how to compare total cost so you can choose what fits your budget and driving habits.",
    keyword: "buy vs lease a car",
    eyebrow: "Car money, explained",
    lede: "Buy or lease? It is one of the first questions at the dealership, and the answer depends on how you drive, how long you keep cars, and what you value.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Buy or lease? It is one of the first questions at the dealership, and the answer depends on how you drive, how long you keep cars, and what you value. Leasing can mean a lower monthly payment and a new car every few years. Buying can mean higher payments at first, but you end up owning something with value. Neither is always better.",
    sections: [
      {
        h2: "How Buying Works",
        blocks: [
          p("When you buy, you pay for the full price of the vehicle, whether with cash or a loan. If you finance, you make monthly payments until the loan is paid off. Then you own the car outright. You can keep driving it with no payment, sell it, or trade it in."),
        ],
      },
      {
        h2: "How Leasing Works",
        blocks: [
          p("When you lease, you pay to use the car for a set period, usually 24 to 36 months. Your payment covers depreciation during the lease term, plus interest, taxes, and fees. Depreciation is the difference between what the car is worth now and its expected value at lease end, called the residual value."),
          p("At the end, you return the car. You can often buy it for the residual value, start a new lease, or walk away."),
        ],
      },
      {
        h2: "Total Cost Comparison",
        blocks: [
          p("Monthly payment is not the full story. For buying, add up your down payment, monthly payments, maintenance, repairs, insurance, taxes, and fees, then subtract what the car is worth if you sell or trade it. That is your net cost."),
          p("For leasing, add up upfront costs, monthly payments, maintenance, insurance, taxes, fees, and any end of lease charges. You subtract no sale value, because you return the car."),
        ],
      },
      {
        h2: "Mileage Matters a Lot",
        blocks: [
          p("If you drive 15,000 to 20,000 miles a year or more, leasing gets expensive fast through excess mileage charges. Buying gives you no mileage penalty."),
          p("If you drive 8,000 to 10,000 miles a year and keep the car in good shape, leasing is easier to manage. Be honest about your driving. Check your actual miles from last year rather than guessing low."),
        ],
      },
      {
        h2: "Lifestyle and Flexibility",
        blocks: [
          p("Leasing locks you in. Ending a lease early can be expensive. If you might move, change jobs, need a bigger car, or start commuting farther, a lease can limit you."),
          p("Buying gives you more flexibility to sell or trade when needs change, though you may owe more than the car is worth early on. The longer you keep a purchased car, the more that flexibility grows."),
        ],
      },
      {
        h2: "Insurance and Maintenance",
        blocks: [
          p("Leased cars often require higher liability limits plus collision and comprehensive coverage, which can mean higher premiums than an owned older car with lower coverage."),
          p("Maintenance on a lease is simpler because the car is new and under warranty, but you still must handle routine service and keep records. A purchased car after warranty can bring higher repair costs, so budget for that and favor reliable models."),
        ],
      },
      {
        h2: "When Each Makes More Sense",
        blocks: [
          p("Buying usually wins if you drive a lot, keep cars five years or more, want to modify the car, want no payment after the loan ends, or want to build equity. Buying a reliable used car and keeping it long term often has the lowest total cost."),
        ],
      },
      {
        h2: "Questions to Ask Before You Decide",
        blocks: [
          p("Ask the dealer to show both options in writing for the same car: monthly payment, total paid over the term, mileage limit, residual value, and end of term charges."),
          p("On a lease, ask about the money factor, which is the lease equivalent of an interest rate, and what it translates to annually. Ask about all fees: acquisition, disposition, early termination, excess mileage, and wear standards. Get them in writing. Ask what happens if the car is totaled, and whether gap insurance is included."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("Decide your budget for total monthly transportation cost, not just the payment. Include insurance, fuel, and maintenance. Track your real annual mileage, since that number alone tells you a lot about whether a lease fits."),
        ],
      },
    ],
    faq: [
      {
        q: "How does buying work?",
        a: "When you buy, you pay for the full price of the vehicle, whether with cash or a loan. If you finance, you make monthly payments until the loan is paid off. Then you own the car outright. You can keep driving it with no payment, sell it, or trade it in. Buying gives you freedom.",
      },
      {
        q: "How does leasing work?",
        a: "When you lease, you pay to use the car for a set period, usually 24 to 36 months. Your payment covers depreciation during the lease term, plus interest, taxes, and fees. Depreciation is the difference between what the car is worth now and its expected value at lease end, called the residual value. At the end, you return the car.",
      },
      {
        q: "When each makes more sense?",
        a: "Buying usually wins if you drive a lot, keep cars five years or more, want to modify the car, want no payment after the loan ends, or want to build equity. Buying a reliable used car and keeping it long term often has the lowest total cost.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Should I refinance my car loan?", href: "/answers/should-i-refinance-my-car-loan" },
      { label: "How can I pay off my car loan faster?", href: "/answers/how-can-i-pay-off-my-car-loan-faster" },
      { label: "What car insurance coverage do I actually need?", href: "/answers/what-car-insurance-coverage-do-i-actually-need" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "should-i-refinance-my-car-loan",
    title: "Should I refinance my car loan?",
    metaTitle: "Should I refinance my car loan?",
    description: "Car loan refinancing can lower your payment or interest. Learn when it helps, how to qualify for a better rate, and what fees to check before you refinance.",
    keyword: "car loan refinancing",
    eyebrow: "Car money, explained",
    lede: "If your car payment feels high, or your credit has improved since you bought your car, refinancing might help.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If your car payment feels high, or your credit has improved since you bought your car, refinancing might help. Refinancing means taking out a new auto loan to pay off your current one. The new loan has its own rate, term, and payment. It does not work for everyone. Sometimes the savings are small. Sometimes a longer term makes the total cost higher even as the payment drops.",
    sections: [
      {
        h2: "How It Works",
        blocks: [
          p("You apply for a new auto loan with a bank, credit union, or online lender. If approved, the new lender pays off your old loan, and you make payments to the new lender under the new terms. Your car stays as collateral. The title transfer is handled between lenders."),
        ],
      },
      {
        h2: "When Refinancing Can Help",
        blocks: [
          p("Your credit score has gone up. A higher score often qualifies you for a lower rate. If you had thin credit when you bought the car and have since paid on time, you may now qualify for better terms."),
          p("Rates have fallen. If general auto loan rates are lower now than when you borrowed, you may lock in a lower rate even with similar credit."),
        ],
      },
      {
        h2: "When It May Not Help",
        blocks: [
          p("Your car is worth less than you owe. Many lenders will not refinance with significant negative equity, or they will require you to pay down the difference."),
          p("Your car is older or has high mileage. Lenders often limit vehicle age and mileage for refinancing. An older car may not qualify or may only qualify for a short term."),
        ],
      },
      {
        h2: "How to Get a Better Rate",
        blocks: [
          p("Check your credit reports for errors and dispute anything wrong. Pay down credit card balances if you can, and avoid opening new accounts right before applying."),
          p("Make on time payments on your current car loan. Lenders want to see a clean history on the loan being refinanced."),
          p("Know your car's value through a reputable valuation tool. If your balance is near or below the car's value, you are in a stronger position."),
        ],
      },
      {
        h2: "What It Costs",
        blocks: [
          p("Refinancing an auto loan is usually low cost, but not always free. Some lenders charge an application or processing fee, plus title transfer or state DMV fees to update the lienholder. Ask for all fees in writing."),
          p("Check whether the new loan requires add ons like gap insurance. You can usually decline extras. Ask about the late fee, grace period, and whether you can pay extra without penalty."),
        ],
      },
      {
        h2: "Shorter Term Versus Longer Term",
        blocks: [
          p("A shorter term usually means a higher payment, less total interest, and a faster payoff. It builds equity faster, which helps if you sell or trade in."),
          p("A longer term usually means a lower payment, more total interest, and slower equity growth. You stay in debt longer and may stay upside down longer."),
        ],
      },
      {
        h2: "Steps to Refinance",
        blocks: [
          p("Gather your current loan details: lender, balance, rate, remaining term, payoff amount, and monthly payment. Check your credit and estimate your car's value."),
          p("Shop for offers. Apply to two or three lenders within a short window. Multiple auto loan inquiries in a short period are often treated as one inquiry for scoring purposes, but keep the window tight."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("If your rate is high, your credit has improved, or your payment is tight, refinancing is worth a look. Pull your payoff amount and get two quotes. Run the total cost math."),
        ],
      },
    ],
    faq: [
      {
        q: "How does it work?",
        a: "You apply for a new auto loan with a bank, credit union, or online lender. If approved, the new lender pays off your old loan, and you make payments to the new lender under the new terms. Your car stays as collateral. The title transfer is handled between lenders. The process is usually faster than buying a car.",
      },
      {
        q: "When refinancing can help?",
        a: "Your credit score has gone up. A higher score often qualifies you for a lower rate. If you had thin credit when you bought the car and have since paid on time, you may now qualify for better terms. Rates have fallen. If general auto loan rates are lower now than when you borrowed, you may lock in a lower rate even with similar credit.",
      },
      {
        q: "When it may not help?",
        a: "Your car is worth less than you owe. Many lenders will not refinance with significant negative equity, or they will require you to pay down the difference. Your car is older or has high mileage. Lenders often limit vehicle age and mileage for refinancing. An older car may not qualify or may only qualify for a short term.",
      },
      {
        q: "How do I get a better rate?",
        a: "Check your credit reports for errors and dispute anything wrong. Pay down credit card balances if you can, and avoid opening new accounts right before applying. Make on time payments on your current car loan. Lenders want to see a clean history on the loan being refinanced. Know your car's value through a reputable valuation tool.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Should I buy or lease a car?", href: "/answers/should-i-buy-or-lease-a-car" },
      { label: "How can I pay off my car loan faster?", href: "/answers/how-can-i-pay-off-my-car-loan-faster" },
      { label: "What car insurance coverage do I actually need?", href: "/answers/what-car-insurance-coverage-do-i-actually-need" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-can-i-pay-off-my-car-loan-faster",
    title: "How can I pay off my car loan faster?",
    metaTitle: "How can I pay off my car loan faster?",
    description: "Want to pay off your car faster? Learn how extra payments, biweekly payments, and snowball vs avalanche strategies can cut interest and shorten your loan.",
    keyword: "pay off car faster",
    eyebrow: "Car money, explained",
    lede: "A car payment can feel like it will never end. The good news is you do not have to wait for the original payoff date.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "A car payment can feel like it will never end. The good news is you do not have to wait for the original payoff date. Small, consistent extra payments can shorten your loan and reduce total interest. You do not need a windfall. You need a plan you can stick with.",
    sections: [
      {
        h2: "Why Paying Off Early Helps",
        blocks: [
          p("Each month, part of your payment goes to interest and part goes to principal. When you pay extra toward principal, your balance drops faster, so less interest builds up in the following months."),
          p("Paying off early also builds equity faster. Equity is the difference between what your car is worth and what you owe. More equity means you are less likely to be upside down, and it helps if you sell or trade in later. Once the loan is gone, that monthly payment is freed up for savings, investing, or other debt."),
        ],
      },
      {
        h2: "Strategy 1: Extra Payments When You Can",
        blocks: [
          p("The simplest strategy is to pay a little extra whenever you have room. If your payment is 350 dollars, pay 400 when you can. That extra 50 goes to principal. It does not sound like much, but over many months it shortens the loan."),
          p("You can also make one time extra payments from a tax refund, a bonus, or side gig income."),
        ],
      },
      {
        h2: "Strategy 2: Biweekly Payments",
        blocks: [
          p("Instead of one monthly payment, pay half your payment every two weeks. That totals 26 half payments a year, which equals 13 full monthly payments instead of 12. The extra payment goes toward principal and shortens the loan."),
          p("If your payment is 400 dollars, you pay 200 every two weeks. Over a year that is 5,200 dollars instead of 4,800. This works well if you are paid every two weeks, since the payment lines up with your paycheck."),
        ],
      },
      {
        h2: "Strategy 3: Round Up Your Payment",
        blocks: [
          p("If your payment is 387 dollars, round it to 400. If it is 412, round to 450. The extra is small, but it hits principal every month. Combine rounding up with one extra payment a year and your payoff date moves noticeably earlier."),
        ],
      },
      {
        h2: "Snowball vs Avalanche",
        blocks: [
          p("If you have more than one debt, decide which to attack first."),
          p("The snowball method targets the smallest balance first. You make minimums on everything, then put extra toward the smallest debt. Once it is gone, you roll its payment into the next smallest. The quick wins keep you motivated."),
        ],
      },
      {
        h2: "What Not to Do",
        blocks: [
          p("Do not pay extra if it leaves you with no emergency fund. A breakdown or income loss with zero savings can force you back into high interest debt."),
          p("Do not skip other bills to pay the car faster. Late payments hurt your credit and add fees that outweigh the interest you save."),
          p("Do not use a high interest credit card to pay down the car loan. That just moves debt somewhere more expensive."),
        ],
      },
      {
        h2: "A Simple Payoff Plan",
        blocks: [
          p("List your debts with balances, rates, and minimums. Pick the one to attack first using snowball or avalanche. Confirm your car lender applies extra payments to principal and ask how to label them."),
          p("Pick your extra payment strategy. Start with rounding up plus one extra payment per year, or biweekly if you are paid every two weeks. Set a monthly extra amount you can sustain, even 25 or 50 dollars, and automate it."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("Pull up your loan statement. Write down your balance, rate, payment, and payoff date. Call your lender about prepayment and principal only payments. Pick one strategy from this post and start this month."),
          p("Keep your emergency fund intact and your other minimums current. Paying off your car faster is not about being perfect. It is about being consistent. A little extra every month adds up to a car you own free and clear, sooner than scheduled."),
        ],
      },
    ],
    faq: [
      {
        q: "Why do paying off early help?",
        a: "Each month, part of your payment goes to interest and part goes to principal. When you pay extra toward principal, your balance drops faster, so less interest builds up in the following months. Paying off early also builds equity faster. Equity is the difference between what your car is worth and what you owe.",
      },
      {
        q: "What not to do?",
        a: "Do not pay extra if it leaves you with no emergency fund. A breakdown or income loss with zero savings can force you back into high interest debt. Do not skip other bills to pay the car faster. Late payments hurt your credit and add fees that outweigh the interest you save. Do not use a high interest credit card to pay down the car loan.",
      },
      {
        q: "What should I know about strategy 1?",
        a: "The simplest strategy is to pay a little extra whenever you have room. If your payment is 350 dollars, pay 400 when you can. That extra 50 goes to principal. It does not sound like much, but over many months it shortens the loan. You can also make one time extra payments from a tax refund, a bonus, or side gig income.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Should I buy or lease a car?", href: "/answers/should-i-buy-or-lease-a-car" },
      { label: "Should I refinance my car loan?", href: "/answers/should-i-refinance-my-car-loan" },
      { label: "What car insurance coverage do I actually need?", href: "/answers/what-car-insurance-coverage-do-i-actually-need" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "what-car-insurance-coverage-do-i-actually-need",
    title: "What car insurance coverage do I actually need?",
    metaTitle: "What car insurance coverage do I actually need?",
    description: "Car insurance basics explained in plain English: liability, collision, comprehensive, uninsured motorist, deductibles, and how to choose coverage that fits",
    keyword: "car insurance basics",
    eyebrow: "Car money, explained",
    lede: "Car insurance can feel confusing. At its core, it is about managing risk.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Car insurance can feel confusing. At its core, it is about managing risk. You pay a premium, and the insurer agrees to help cover certain costs if you have an accident, your car is damaged, or someone is injured. Here are the main coverages, explained simply, and how to think about what you need.",
    sections: [
      {
        h2: "Liability Coverage",
        blocks: [
          p("Liability is the core of most policies and is required in most states. It has two parts. Bodily injury liability helps cover costs if you injure someone in an accident you cause, like medical bills and lost wages. Property damage liability helps cover damage you cause to someone else's property, like their car or a fence."),
        ],
      },
      {
        h2: "Collision Coverage",
        blocks: [
          p("Collision helps pay to repair or replace your car if it is damaged in a crash with another vehicle or object, regardless of fault. That includes hitting another car, a pole, or rolling over."),
          p("Collision usually has a deductible, the amount you pay before insurance pays the rest. If repairs cost 3,000 dollars and your deductible is 500, you pay 500 and insurance covers 2,500, up to the car's value."),
        ],
      },
      {
        h2: "Comprehensive Coverage",
        blocks: [
          p("Comprehensive helps pay to repair or replace your car for damage other than a collision: theft, vandalism, fire, hail, flood, falling objects, or hitting an animal."),
          p("Like collision, it usually has a deductible. The two are often bought together, and people sometimes call that combination full coverage. Full coverage is not an official term. It usually means liability plus collision and comprehensive, plus anything your state requires."),
        ],
      },
      {
        h2: "Uninsured and Underinsured Motorist Coverage",
        blocks: [
          p("Uninsured motorist coverage helps if you are hit by a driver with no insurance. Underinsured motorist coverage helps if the at fault driver has insurance but not enough to cover your costs."),
        ],
      },
      {
        h2: "Medical Payments and Personal Injury Protection",
        blocks: [
          p("Medical payments coverage, or MedPay, helps cover medical bills for you and your passengers after an accident, regardless of fault. Personal Injury Protection, or PIP, is similar but broader in some states and can help with medical bills and lost wages. Some states require PIP."),
        ],
      },
      {
        h2: "Deductibles",
        blocks: [
          p("A lower deductible means you pay less after a claim but your premium is usually higher. A higher deductible means you pay more after a claim but your premium is usually lower."),
          p("Choose a deductible you could actually pay if you filed a claim tomorrow. Raising your deductible is one way to lower your premium, but only if you have the savings to cover it."),
        ],
      },
      {
        h2: "What Affects Your Premium",
        blocks: [
          p("Your driving record matters. Accidents and tickets usually raise premiums. A clean record helps. Your car matters too: cars that cost more to repair or are stolen more often can cost more to insure."),
          p("Where you live matters. Rates vary by state and area based on accident rates, theft, repair costs, and weather. Your coverage choices matter: higher limits and lower deductibles cost more."),
        ],
      },
      {
        h2: "What You Actually Need",
        blocks: [
          p("If you have a loan or lease, your lender will require collision and comprehensive plus liability limits that meet their rules."),
          p("If you own your car outright and it is worth a lot, keeping collision and comprehensive usually makes sense. If it is worth very little, ask yourself: if it were totaled tomorrow, could I afford to replace it without insurance? If yes, dropping those coverages could save premium. If no, keep them."),
        ],
      },
      {
        h2: "Ways to Save Without Losing Protection",
        blocks: [
          p("Ask about discounts: good driving, good student, defensive driving course, bundling auto with renters or homeowners, paying in full, autopay, and paperless billing."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("Ask yourself: if I caused a serious accident tomorrow, would my liability limits be enough? If my car were totaled, could I handle my deductible and replace the car? If you are unsure, talk to a licensed agent and bring your current policy. Car insurance is not about buying the cheapest policy. It is about buying the protection you need at a price you can afford, so one accident does not become a financial crisis."),
        ],
      },
    ],
    faq: [
      {
        q: "What affects your premium?",
        a: "Your driving record matters. Accidents and tickets usually raise premiums. A clean record helps. Your car matters too: cars that cost more to repair or are stolen more often can cost more to insure. Where you live matters. Rates vary by state and area based on accident rates, theft, repair costs, and weather.",
      },
      {
        q: "What you actually need?",
        a: "If you have a loan or lease, your lender will require collision and comprehensive plus liability limits that meet their rules. If you own your car outright and it is worth a lot, keeping collision and comprehensive usually makes sense.",
      },
      {
        q: "What should I know about liability coverage?",
        a: "Liability is the core of most policies and is required in most states. It has two parts. Bodily injury liability helps cover costs if you injure someone in an accident you cause, like medical bills and lost wages. Property damage liability helps cover damage you cause to someone else's property, like their car or a fence.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Should I buy or lease a car?", href: "/answers/should-i-buy-or-lease-a-car" },
      { label: "Should I refinance my car loan?", href: "/answers/should-i-refinance-my-car-loan" },
      { label: "How can I pay off my car loan faster?", href: "/answers/how-can-i-pay-off-my-car-loan-faster" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-i-buy-a-used-car-without-getting-burned",
    title: "How do I buy a used car without getting burned?",
    metaTitle: "How do I buy a used car without getting burned?",
    description: "Buying a used car? Learn what to check before you buy, how to avoid lemons, what to look for on a test drive, and how to finance wisely.",
    keyword: "buying a used car",
    eyebrow: "Car money, explained",
    lede: "A used car can be a smart buy. Someone else already paid for the early depreciation, and you can get a reliable car for far less than new.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "A used car can be a smart buy. Someone else already paid for the early depreciation, and you can get a reliable car for far less than new. It can also be a costly mistake if you skip the checks. A clean looking car can hide accident damage, flood damage, or mechanical problems. The goal is a solid car at a fair price, with no surprises.",
    sections: [
      {
        h2: "Set Your Total Budget First",
        blocks: [
          p("Before you shop, set a total budget, not just a monthly payment. Total cost includes the price, sales tax, title and registration fees, insurance, and immediate repairs. A car that fits the payment but leaves nothing for insurance or repairs is not a good fit."),
        ],
      },
      {
        h2: "Research Models Before You Visit",
        blocks: [
          p("Make a short list of models that fit your needs: size, fuel costs, reliability, safety, and insurance costs. Look up common problems for the model years you are considering. Some years have known transmission or engine issues while other years of the same model are more reliable."),
        ],
      },
      {
        h2: "Dealer vs Private Seller",
        blocks: [
          p("A franchised dealer often offers more selection, financing help, and sometimes a limited warranty or return period. You may pay more and face add on fees, so read every fee line."),
          p("An independent lot can be cheaper, but quality varies widely. Check reviews and be extra careful about inspections."),
          p("A private seller can offer the lowest price, but you get little to no warranty and handle the paperwork yourself, including title transfer. Meet in a public place and verify the seller actually owns the car."),
        ],
      },
      {
        h2: "Check the Vehicle History Report",
        blocks: [
          p("Get the VIN and run a history report through a reputable provider. It can show reported accidents, title issues like salvage or flood titles, odometer readings, service history, and owner count."),
        ],
      },
      {
        h2: "Get a Pre-Purchase Inspection",
        blocks: [
          p("This is the most important step. Have the car inspected by an independent mechanic you trust, not the seller's mechanic. It usually costs about as much as a routine service visit."),
          p("The mechanic checks the engine, transmission, brakes, suspension, tires, fluids, and electrical system, and looks for accident repair, rust, or flood damage. Ask them to put the car on a lift to see the underside."),
        ],
      },
      {
        h2: "Check It Yourself and Test Drive",
        blocks: [
          p("Walk around in daylight. Look for mismatched paint, uneven panel gaps, and rust. Check that lights, wipers, and windows work. Check tire wear, since uneven wear can signal alignment problems. Under the hood, check oil level and color. Milky oil can signal serious engine trouble. Inside, test the heat and AC, and check for warning lights or a musty smell that can signal water damage. Check that the name on the title matches the seller's ID, and that there is no lien you do not understand."),
        ],
      },
      {
        h2: "How to Avoid Lemons",
        blocks: [
          p("Stick to models with solid reliability records. Avoid salvage titles, flood history, and major accident damage unless you truly understand the risk."),
          p("Be wary of pressure. A seller who demands a decision today or blocks an inspection is a red flag. Be wary of prices far below market value. Check for recalls by VIN on the National Highway Traffic Safety Administration site, and make sure safety recall work is done."),
          p("Keep all paperwork: bill of sale, title, inspection report, and warranty documents."),
        ],
      },
      {
        h2: "Financing a Used Car",
        blocks: [
          p("Used car rates are often higher than new car rates, and terms are often shorter. Lenders may limit the age and mileage they will finance."),
        ],
      },
      {
        h2: "After You Buy",
        blocks: [
          p("Transfer the title and register the car in your name before your state's deadline. Get insurance before you drive it home. Change the oil and check fluids unless the seller has recent records. Keep a maintenance log. Regular service helps the car last longer and protects resale value."),
          p("Buying a used car takes patience. Walk away from a bad deal even if you have spent time on it. There is always another car, and the money you save by avoiding a lemon is money you keep."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the vehicle history report?",
        a: "Get the VIN and run a history report through a reputable provider. It can show reported accidents, title issues like salvage or flood titles, odometer readings, service history, and owner count. A clean report is a good sign but not a guarantee. Not every accident is reported.",
      },
      {
        q: "How do I avoid lemons?",
        a: "Stick to models with solid reliability records. Avoid salvage titles, flood history, and major accident damage unless you truly understand the risk. Be wary of pressure. A seller who demands a decision today or blocks an inspection is a red flag. Be wary of prices far below market value.",
      },
      {
        q: "What should I know about buying a used car?",
        a: "Before you shop, set a total budget, not just a monthly payment. Total cost includes the price, sales tax, title and registration fees, insurance, and immediate repairs. A car that fits the payment but leaves nothing for insurance or repairs is not a good fit. If you plan to finance, get preapproved before you shop.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Should I buy or lease a car?", href: "/answers/should-i-buy-or-lease-a-car" },
      { label: "Should I refinance my car loan?", href: "/answers/should-i-refinance-my-car-loan" },
      { label: "How can I pay off my car loan faster?", href: "/answers/how-can-i-pay-off-my-car-loan-faster" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-i-afford-a-car-in-college",
    title: "How do I afford a car in college?",
    metaTitle: "How do I afford a car in college?",
    description: "Getting your first car in college? Learn how to budget for the real cost, handle insurance as a young driver, and avoid debt traps that follow you after",
    keyword: "first car in college",
    eyebrow: "Car money, explained",
    lede: "Getting your first car in college feels like freedom. It can also become a financial trap if you only look at the monthly payment.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Getting your first car in college feels like freedom. It can also become a financial trap if you only look at the monthly payment. A car costs much more than the payment: insurance, fuel, maintenance, and repairs add up fast on a student budget. The goal is a car that helps your life, not one that eats your paycheck.",
    sections: [
      {
        h2: "Do You Actually Need a Car?",
        blocks: [
          p("Start here. If you live on campus, walk to class, and work nearby, you might not need one. Buses, bikes, and rides can cover a lot."),
          p("A car makes more sense if you commute, work off campus, have an internship, or need to get home regularly with no other way."),
        ],
      },
      {
        h2: "The Real Cost",
        blocks: [
          p("The payment is only part of it. Write down all of it: the loan payment, insurance, fuel, maintenance and repairs, registration and taxes, and parking. Some campuses and apartments charge for parking."),
          p("Add those up for a full year and divide by 12. That is your true monthly cost, and that is the number you need to afford. If it does not fit your income, the car does not fit yet."),
        ],
      },
      {
        h2: "Budgeting on a Student Income",
        blocks: [
          p("Student income is often limited and uneven. You might work more in summer and less during exams. Use your actual average monthly income, not what you hope to earn."),
          p("Subtract fixed costs like rent, utilities, phone, and food. What is left covers the car and everything else. Do not spend all of it on the payment. Leave room for insurance, fuel, repairs, and savings. If one emergency would break you, the budget is too tight."),
        ],
      },
      {
        h2: "Insurance for Young Drivers",
        blocks: [
          p("Rates for drivers under 25 are generally higher, because insurers see higher accident risk in that group. You cannot change your age, but you can lower the cost."),
          p("Stay on a family policy if you can. It is often cheaper than buying your own, and ask about student away discounts if you attend school far from home. Ask about good student discounts for full time students who maintain a certain GPA, and about defensive driving course discounts."),
        ],
      },
      {
        h2: "Avoiding Debt Traps",
        blocks: [
          p("Trap 1: focusing only on the monthly payment. A dealer can lower it by stretching the loan to six or seven years. You pay far more interest and stay in debt after graduation. Look at total cost, term, and rate, not just the payment."),
          p("Trap 2: buying too much car. Approval is not the same as affordability. Buy the reliable car you need."),
        ],
      },
      {
        h2: "Smart Ways to Buy",
        blocks: [
          p("Consider a reliable used car instead of new. A well maintained used car from a reliable model line can last through college at a fraction of the cost."),
          p("Get preapproved from a bank or credit union before you shop, so you have a rate and term to compare against dealer financing. Keep the loan term short, ideally with the car paid off near graduation. Put down as much as you can."),
        ],
      },
      {
        h2: "After You Buy",
        blocks: [
          p("Keep up with maintenance. Oil changes and basic inspections are cheaper than major repairs. Drive gently, since hard braking and speeding wear the car faster and use more fuel."),
          p("Review your insurance once a year. Make every payment on time, since a strong history builds your credit and a missed payment does the opposite. If money gets tight, talk to your lender before you miss a payment."),
        ],
      },
      {
        h2: "What to Do Next",
        blocks: [
          p("Before you shop, write down your true monthly car budget including insurance, fuel, and repairs. Get insurance quotes for the models you are considering. Get preapproved."),
          p("If the numbers work, shop carefully, inspect the car, and buy within your budget. If they do not, wait. Waiting is not falling behind. The right first car in college is the one you can afford to own, not just afford to buy."),
        ],
      },
    ],
    faq: [
      {
        q: "Do you actually need a car?",
        a: "Start here. If you live on campus, walk to class, and work nearby, you might not need one. Buses, bikes, and rides can cover a lot. A car makes more sense if you commute, work off campus, have an internship, or need to get home regularly with no other way. Add up the real cost before you decide, using the breakdown below.",
      },
      {
        q: "What is the real cost?",
        a: "The payment is only part of it. Write down all of it: the loan payment, insurance, fuel, maintenance and repairs, registration and taxes, and parking. Some campuses and apartments charge for parking. Add those up for a full year and divide by 12. That is your true monthly cost, and that is the number you need to afford.",
      },
      {
        q: "What should I know about first car in college?",
        a: "Student income is often limited and uneven. You might work more in summer and less during exams. Use your actual average monthly income, not what you hope to earn. Subtract fixed costs like rent, utilities, phone, and food. What is left covers the car and everything else. Do not spend all of it on the payment.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Should I buy or lease a car?", href: "/answers/should-i-buy-or-lease-a-car" },
      { label: "Should I refinance my car loan?", href: "/answers/should-i-refinance-my-car-loan" },
      { label: "How can I pay off my car loan faster?", href: "/answers/how-can-i-pay-off-my-car-loan-faster" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-tax-deductions-work",
    title: "How do tax deductions work?",
    metaTitle: "How do tax deductions work?",
    description: "Learn how tax deductions work, the difference between standard and itemized deductions, and how deductions reduce your taxable income.",
    keyword: "tax deductions",
    eyebrow: "Taxes, explained",
    lede: "Taxes can feel confusing. Deductions are one of the parts that confuse people the most. Once you understand the basic idea, they get a lot simpler.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Taxes can feel confusing. Deductions are one of the parts that confuse people the most. Once you understand the basic idea, they get a lot simpler. A tax deduction lowers your taxable income. It does not lower your tax bill dollar for dollar. It lowers the amount of income the IRS taxes. That is an important difference.",
    sections: [
      {
        h2: "Here is a simple example",
        blocks: [
          p("Say you earned 50,000 dollars in a year. If you have 10,000 dollars in deductions, the IRS taxes you on 40,000 dollars instead of the full 50,000 dollars. You still pay tax. You just pay tax on a smaller number. Your tax savings depend on your tax bracket. If you are in the 12 percent bracket, a 1,000 dollar deduction saves you about 120 dollars in tax. It does not save you 1,000 dollars."),
          p("This is where many people get mixed up. Deductions are helpful. They are not the same as credits. Credits lower your tax bill directly. Deductions lower the income that gets taxed. Both help. They just work in different ways."),
        ],
      },
      {
        h2: "Most people take the standard deduction",
        blocks: [
          p("It is simple. It requires no extra tracking. For a lot of taxpayers, it is also the larger amount. The IRS adjusts it for inflation most years, so it tends to go up over time."),
          p("Itemized deductions are different. With itemizing, you add up specific expenses the tax code allows you to deduct. If that total is more than the standard deduction, itemizing saves you more. If it is less, you should take the standard deduction."),
          p("So what can you itemize? The list is shorter than it used to be. The main categories are still there, though."),
        ],
      },
      {
        h2: "Charitable donations also count",
        blocks: [
          p("If you give money or goods to a qualified charity, you may be able to deduct the value. You need records. A bank statement or a written note from the charity usually works. Cash gifts are straightforward. Donated goods need a reasonable value. Keep the receipt."),
          p("Medical expenses can count too, but only the part above a certain share of your income. The IRS sets a threshold as a percentage of adjusted gross income. Only medical costs above that threshold are deductible. For most people, this means medical costs only help if they are very large in one year."),
          p("There are a few other itemized deductions, but they are less common. Things like casualty losses from a federally declared disaster can qualify in some cases. Most personal expenses do not qualify."),
        ],
      },
      {
        h2: "Keep in mind that you need records if you itemize",
        blocks: [
          p("The IRS can ask for proof. Save your mortgage interest statement, your property tax bills, and your charity receipts. You do not send them in with your return in most cases, but you should keep them for at least a few years after you file."),
          p("There are also deductions that work differently. These are called adjustments to income, or above the line deductions. They lower your adjusted gross income before you even get to the standard or itemized choice. Common examples include contributions to a traditional IRA, student loan interest, and contributions to a Health Savings Account if you qualify. Educator expenses for teachers can also fall here. These are valuable because they lower your adjusted gross income, which can affect other parts of your return."),
        ],
      },
      {
        h2: "Another common question is whether paying more interest or giving",
        blocks: [
          p("It does not always help. If you already take the standard deduction, small extra gifts may not change your tax at all. You only benefit from itemized deductions to the extent that your itemized total is above the standard deduction. This is sometimes called the bunching idea. Some people time their charitable gifts to bunch two years of giving into one year, so they clear the standard deduction in that year and itemize. Then they take the standard deduction the next year. That strategy does not work for everyone, but it shows how the comparison matters."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about tax deductions?",
        a: "Say you earned 50,000 dollars in a year. If you have 10,000 dollars in deductions, the IRS taxes you on 40,000 dollars instead of the full 50,000 dollars. You still pay tax. You just pay tax on a smaller number. Your tax savings depend on your tax bracket.",
      },
      {
        q: "What should I know about the standard deduction?",
        a: "It is simple. It requires no extra tracking. For a lot of taxpayers, it is also the larger amount. The IRS adjusts it for inflation most years, so it tends to go up over time. Itemized deductions are different. With itemizing, you add up specific expenses the tax code allows you to deduct.",
      },
      {
        q: "What should I know about charitable donations?",
        a: "If you give money or goods to a qualified charity, you may be able to deduct the value. You need records. A bank statement or a written note from the charity usually works. Cash gifts are straightforward. Donated goods need a reasonable value. Keep the receipt.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
      { label: "1099 or W-2: how do taxes differ?", href: "/answers/1099-or-w-2-how-do-taxes-differ" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-do-tax-credits-work",
    title: "How do tax credits work?",
    metaTitle: "How do tax credits work?",
    description: "Learn how tax credits work, the difference between refundable and nonrefundable credits, and why credits are often worth more than deductions.",
    keyword: "tax credits",
    eyebrow: "Taxes, explained",
    lede: "Tax credits are one of the most valuable parts of the tax system. They can lower your tax bill directly.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Tax credits are one of the most valuable parts of the tax system. They can lower your tax bill directly. In some cases, they can even put money back in your pocket. That is why it helps to know how they work. A tax credit reduces the tax you owe, dollar for dollar. If you owe 2,000 dollars in tax and you have a 500 dollar credit, you now owe 1,500 dollars. That is a direct cut.",
    sections: [
      {
        h2: "This is different from a deduction",
        blocks: [
          p("A deduction lowers your taxable income. A credit lowers your tax itself. Because of that, a credit is usually worth more than the same amount as a deduction."),
          p("Here is a quick comparison. A 1,000 dollar deduction in the 12 percent bracket saves you about 120 dollars. A 1,000 dollar credit saves you 1,000 dollars. Same number on paper, very different result. That is why credits get so much attention at tax time."),
          p("There are two main types of credits. They are called nonrefundable and refundable. The difference matters a lot."),
        ],
      },
      {
        h2: "A refundable credit works differently",
        blocks: [
          p("It can lower your tax to zero, and then the rest can come back to you as a refund. Say you owe 800 dollars and you have a 1,000 dollar refundable credit. The first 800 dollars wipes out your tax. The remaining 200 dollars comes back to you as a refund. That is why refundable credits are so powerful, especially for lower income households."),
          p("Some credits are partly refundable. That means part of the credit can come back as a refund, and part cannot. The rules are in the tax law for each credit. You have to check the specific credit to know how it works."),
        ],
      },
      {
        h2: "The Child and Dependent Care Credit is another common one",
        blocks: [
          p("If you pay for child care so you can work or look for work, you may qualify. It can also apply to care for a disabled spouse or dependent. This credit is generally nonrefundable. It helps offset the cost of care, but it will not create a refund on its own."),
          p("The Earned Income Tax Credit, often called the EITC, is a refundable credit for workers with lower to moderate income. It is one of the largest credits for working families. The amount depends on your income, your filing status, and how many qualifying children you have. Workers without children can also qualify, but the amount is much smaller. The EITC is refundable, so it can lead to a refund even if you owe no tax."),
        ],
      },
      {
        h2: "The Saver's Credit, also called the Retirement Savings Contributions",
        blocks: [
          p("If you contribute to an IRA, a 401k, or a similar account, you may qualify. The credit is nonrefundable. It is a nice bonus for saving, but it will not create a refund."),
          p("There are also credits for foreign taxes paid, adoption costs, and other specific situations. Most people will not need those. If you do, tax software or a tax professional can help you sort it out."),
        ],
      },
      {
        h2: "It also helps to know about phaseouts",
        blocks: [
          p("Many credits shrink as your income goes up. They disappear completely above a certain income level. That is called a phaseout. Two people with the same credit can get different amounts if their incomes are different. Check the phaseout range for any credit you plan to claim."),
          p("Timing matters too. Most credits apply to the year you paid the expense or met the requirement. For example, child care costs count in the year you paid them, not the year you were billed. College tuition counts in the year you paid it. Keep receipts and statements that show the date and amount."),
        ],
      },
    ],
    faq: [
      {
        q: "What are the saver's credit, also called the retirement savings contributions?",
        a: "If you contribute to an IRA, a 401k, or a similar account, you may qualify. The credit is nonrefundable. It is a nice bonus for saving, but it will not create a refund. There are also credits for foreign taxes paid, adoption costs, and other specific situations. Most people will not need those.",
      },
      {
        q: "What should I know about tax credits?",
        a: "A deduction lowers your taxable income. A credit lowers your tax itself. Because of that, a credit is usually worth more than the same amount as a deduction. Here is a quick comparison. A 1,000 dollar deduction in the 12 percent bracket saves you about 120 dollars. A 1,000 dollar credit saves you 1,000 dollars.",
      },
      {
        q: "What should I know about the child and dependent care credit?",
        a: "If you pay for child care so you can work or look for work, you may qualify. It can also apply to care for a disabled spouse or dependent. This credit is generally nonrefundable. It helps offset the cost of care, but it will not create a refund on its own.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
      { label: "1099 or W-2: how do taxes differ?", href: "/answers/1099-or-w-2-how-do-taxes-differ" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-do-i-file-taxes-for-the-first-time",
    title: "How do I file taxes for the first time?",
    metaTitle: "How do I file taxes for the first time?",
    description: "Filing taxes for the first time? Learn what documents you need, how to file step by step, and the mistakes first time filers should avoid.",
    keyword: "filing taxes first time",
    eyebrow: "Taxes, explained",
    lede: "Filing taxes for the first time can feel stressful. The forms look confusing. The words sound formal. The stakes feel high.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Filing taxes for the first time can feel stressful. The forms look confusing. The words sound formal. The stakes feel high. In reality, most first time returns are simple. If you have one job, no kids, and no side income, your return may take less than an hour. This guide walks through what you need, how to file, and the mistakes to avoid. It is written for someone filing for the very first time.",
    sections: [
      {
        h2: "First, let us answer a basic question",
        blocks: [
          p("Do you have to file? The answer depends on your income, your filing status, and your age. In general, if your income is above a certain level set by the IRS each year, you need to file. If your income is below that level, you may not be required to file. There are exceptions."),
          p("Even if you are not required to file, you may want to file anyway. If your employer withheld tax from your paychecks, filing is how you get a refund if you overpaid. If you qualify for a refundable credit, filing is how you claim it. Many students and part time workers get a refund by filing even when they were not required to. Filing also creates a record with the IRS, which can help later if you apply for a loan or need proof of income."),
        ],
      },
      {
        h2: "Before you file, gather everything in one place",
        blocks: [
          p("Check that the numbers on your W-2 match your final pay stub for the year. If your name, address, or Social Security number is wrong on any form, contact the issuer to fix it before you file. Small errors can delay your refund."),
          p("The first option is tax software. Most first time filers use this. The software asks you questions in plain language and fills in the forms for you. It checks your math. It helps you find deductions and credits. Many software programs offer a free version for simple returns. If your return is simple, free software is often enough."),
        ],
      },
      {
        h2: "You will be asked about credits",
        blocks: [
          p("Answer those questions carefully. Students should look at education credits. Workers with lower income should look at the Earned Income Tax Credit. Parents should look at the Child Tax Credit. Do not skip these sections. They can change your refund."),
          p("Once you finish your return, you will either owe tax or get a refund. If you get a refund, direct deposit is the fastest way to receive it. Paper checks take longer. If you owe tax, you can pay by bank transfer, debit card, or check. You can also set up a payment plan with the IRS if you cannot pay in full. Do not ignore a balance due. The IRS charges interest and penalties on unpaid tax."),
        ],
      },
      {
        h2: "The second mistake is entering the wrong Social Security number",
        blocks: [
          p("Your return must match your Social Security card. Double check these fields."),
          p("The third mistake is forgetting income. If you had a side job, freelance work, or bank interest, you need to report it. The IRS gets copies of those forms too. If you leave out income, the IRS may send you a notice later."),
          p("The fourth mistake is choosing the wrong filing status or getting the dependent question wrong. If your parents claim you, you need to say so. If you are not sure, ask your parents before you file."),
          p("The fifth mistake is not keeping copies. Save a copy of your return and all your forms for at least three years. You may need them for a loan, a rental application, or an IRS question."),
        ],
      },
      {
        h2: "Filing for the first time does not have to be scary",
        blocks: [
          p("Gather your forms. Use reliable software. Read each question. Double check your numbers. File on time. Keep copies. If you get stuck, the IRS website has free guides, and many communities offer free tax help programs for simple returns."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the first time does not?",
        a: "Gather your forms. Use reliable software. Read each question. Double check your numbers. File on time. Keep copies. If you get stuck, the IRS website has free guides, and many communities offer free tax help programs for simple returns.",
      },
      {
        q: "What should I know about filing taxes first time?",
        a: "Do you have to file? The answer depends on your income, your filing status, and your age. In general, if your income is above a certain level set by the IRS each year, you need to file. If your income is below that level, you may not be required to file. There are exceptions.",
      },
      {
        q: "What does “first, let us answer a basic question” mean?",
        a: "Do you have to file? The answer depends on your income, your filing status, and your age. In general, if your income is above a certain level set by the IRS each year, you need to file. If your income is below that level, you may not be required to file. There are exceptions.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "1099 or W-2: how do taxes differ?", href: "/answers/1099-or-w-2-how-do-taxes-differ" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "1099-or-w-2-how-do-taxes-differ",
    title: "1099 or W-2: how do taxes differ?",
    metaTitle: "1099 or W-2: how do taxes differ?",
    description: "Learn the difference between 1099 and W-2 work, how taxes differ for employees and contractors, and what self employment tax means for you.",
    keyword: "1099 vs w-2",
    eyebrow: "Taxes, explained",
    lede: "If you have ever had both a regular job and a side gig, you have probably seen both a W-2 and a 1099. They look like similar tax forms.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you have ever had both a regular job and a side gig, you have probably seen both a W-2 and a 1099. They look like similar tax forms. They represent two very different work arrangements. The tax rules are different too. Understanding the difference can save you from a surprise tax bill. It can also help you decide which type of work fits your life.",
    sections: [
      {
        h2: "A W-2 worker is an employee",
        blocks: [
          p("You work for an employer. The employer controls when, where, and how you work. The employer withholds taxes from your paycheck. The employer also pays part of your Social Security and Medicare taxes. You get benefits in many cases, like health insurance, paid time off, and access to a retirement plan."),
          p("A 1099 worker is an independent contractor. You work for yourself. Clients pay you for work you do. You control how and when you do the work. No one withholds taxes for you. You are responsible for paying your own taxes. You do not get employee benefits from your clients."),
        ],
      },
      {
        h2: "As an employee, your employer takes federal income tax, state income",
        blocks: [
          p("You see your net pay, not your gross pay. At tax time, you file a return and settle up. You may get a refund if too much was withheld. You may owe a small amount if too little was withheld. Either way, most of the work is already done."),
          p("As a contractor, you get the full payment. No tax is taken out. That can feel like you are earning more. You are not. You just have not paid tax yet. You still owe income tax on that money. You also owe self employment tax. Many new contractors are surprised by this. They spend the full payment, then get a big tax bill in April."),
        ],
      },
      {
        h2: "Contractors also have to think about quarterly estimated taxes",
        blocks: [
          p("The IRS expects you to pay taxes as you earn income, not all at once in April. If you expect to owe more than a certain amount, you generally need to make quarterly estimated payments. The due dates are in April, June, September, and January. If you skip these payments, you may owe a penalty for underpayment, even if you pay in full in April."),
          p("Health insurance is another gap. Many employees get health insurance through work, and the employer pays part of the premium. Contractors buy their own insurance. If you are self employed, you may be able to deduct your health insurance premiums as an adjustment to income. That can help offset the cost. The rules are specific, so check the current guidance or talk to a tax professional."),
        ],
      },
      {
        h2: "W-2 work offers stability",
        blocks: [
          p("Steady pay. Withholding done for you. Benefits. Legal protections like minimum wage and overtime rules. Less paperwork. For many people, that stability is worth a lot."),
          p("One common mistake is misclassification. Sometimes an employer calls a worker a contractor when the worker is really an employee. The IRS looks at control, not just the label. If a company controls your schedule, your tools, and your methods, you may be an employee under the law, even if they gave you a 1099. Misclassification matters because it affects your taxes, your benefits, and your rights. If you think you are misclassified, you can ask the IRS for a determination. This is a serious step, so get advice first."),
        ],
      },
      {
        h2: "If you are starting contract work, take these steps",
        blocks: [
          p("First, set aside money for taxes from every payment. Many contractors set aside 25 to 30 percent of each payment in a separate savings account. The exact amount depends on your income and your state. The point is to not spend money that belongs to taxes. Second, track your income and expenses all year. Use a spreadsheet or accounting software. Third, make quarterly estimated payments if needed. Fourth, keep records for at least three years after you file."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about 1099 vs w-2?",
        a: "You work for an employer. The employer controls when, where, and how you work. The employer withholds taxes from your paycheck. The employer also pays part of your Social Security and Medicare taxes. You get benefits in many cases, like health insurance, paid time off, and access to a retirement plan.",
      },
      {
        q: "What should I know about W-2 work offers stability?",
        a: "Steady pay. Withholding done for you. Benefits. Legal protections like minimum wage and overtime rules. Less paperwork. For many people, that stability is worth a lot. 1099 work offers flexibility. You set your schedule. You choose your clients. You can often earn a higher hourly rate. You can deduct business expenses.",
      },
      {
        q: "What if you are starting contract work, take these steps?",
        a: "First, set aside money for taxes from every payment. Many contractors set aside 25 to 30 percent of each payment in a separate savings account. The exact amount depends on your income and your state. The point is to not spend money that belongs to taxes. Second, track your income and expenses all year.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-does-the-503020-budget-rule-work",
    title: "How does the 50/30/20 budget rule work?",
    metaTitle: "How does the 50/30/20 budget rule work?",
    description: "Learn the 50/30/20 budget rule, how to split your after tax income between needs, wants, and savings, and when to adjust the percentages.",
    keyword: "50/30/20 budget",
    eyebrow: "Budgeting, explained",
    lede: "Budgeting does not have to be complicated. Many budgets fail because they have too many categories and too many rules.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Budgeting does not have to be complicated. Many budgets fail because they have too many categories and too many rules. The 50/30/20 rule works because it is simple. It gives you three buckets. You put your money in those buckets. That is it. The rule was popularized by Senator Elizabeth Warren in her book All Your Worth. It has stayed popular because it is easy to remember and easy to use. It is not a law. It is a guideline. It gives you a starting point.",
    sections: [
      {
        h2: "Here is how it works",
        blocks: [
          p("Take your after tax income. That is the money that actually lands in your bank account after taxes, health insurance, and retirement contributions that come out of your paycheck. Then split it like this."),
          p("50 percent goes to needs. 30 percent goes to wants. 20 percent goes to savings and debt payoff."),
        ],
      },
      {
        h2: "Savings and debt payoff is the third bucket",
        blocks: [
          p("This includes building an emergency fund, contributing to retirement accounts beyond what already comes out of your paycheck, and saving for goals like a house down payment or a car. It also includes extra payments on debt above the minimum. Paying off a credit card faster belongs here. So does paying extra on a student loan. The point is to use this bucket to improve your future, not just to cover today."),
          p("Here is an example. Say your after tax income is 3,000 dollars per month. Under the rule, you would aim for 1,500 dollars for needs, 900 dollars for wants, and 600 dollars for savings and extra debt payoff. That is the target. Real life is rarely that clean. Your rent may push needs over 50 percent. Your income may be low. Your debt may be high. That is normal. The rule is a target, not a test."),
        ],
      },
      {
        h2: "A few practical tips help",
        blocks: [
          p("First, automate the savings bucket. Set up an automatic transfer to savings on payday. If the money moves before you can spend it, you are more likely to stick to the plan. Second, use one checking account for bills and one for spending. That makes it harder to accidentally spend rent money on wants. Third, review your subscriptions once every few months. Cancel what you do not use. Fourth, track your spending for at least one month. You do not have to track forever, but one month of tracking shows you where the money goes."),
          p("Now, when should you adjust the rule? Often. The 50/30/20 split is a starting point, not a perfect fit for everyone."),
        ],
      },
      {
        h2: "If your income is low, 50 percent for needs may be impossible",
        blocks: [
          p("Rent, food, and transport may take 70 percent or more. In that case, focus on covering needs and saving something, even if it is small. Saving 5 percent is better than saving nothing. As income grows, you can increase the savings share."),
          p("If your income is high, you may not need 30 percent for wants. You can save more. Many higher earners use a 50/20/30 or 40/20/40 split. The more you can save without feeling deprived, the faster you build a cushion."),
          p("Life changes also call for adjustments. A new baby, a job loss, a move, or a medical bill will change your numbers. Revisit the budget when life changes. A budget that never changes is a budget that stops working."),
        ],
      },
      {
        h2: "Start simple",
        blocks: [
          p("Find your after tax income. Sort last month into the three buckets. Compare to the target. Pick one change for this month. Maybe you cut one subscription. Maybe you automate a savings transfer. Maybe you cook at home two more nights a week. One change is enough to start. Next month, pick another."),
          p("A budget is not about punishment. It is about choices. The 50/30/20 rule helps you make those choices clearly. Needs first. Wants in check. Future funded. If you can do that most months, you are in good shape."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the third bucket?",
        a: "This includes building an emergency fund, contributing to retirement accounts beyond what already comes out of your paycheck, and saving for goals like a house down payment or a car. It also includes extra payments on debt above the minimum. Paying off a credit card faster belongs here. So does paying extra on a student loan.",
      },
      {
        q: "What should I know about 50/30/20 budget?",
        a: "Take your after tax income. That is the money that actually lands in your bank account after taxes, health insurance, and retirement contributions that come out of your paycheck. Then split it like this. 50 percent goes to needs. 30 percent goes to wants. 20 percent goes to savings and debt payoff.",
      },
      {
        q: "What if your income is low, 50 percent for needs may be impossible?",
        a: "Rent, food, and transport may take 70 percent or more. In that case, focus on covering needs and saving something, even if it is small. Saving 5 percent is better than saving nothing. As income grows, you can increase the savings share. If your income is high, you may not need 30 percent for wants. You can save more.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How much should I have in an emergency fund?", href: "/answers/how-much-should-i-have-in-an-emergency-fund" },
      { label: "Snowball or avalanche: which debt payoff method is better?", href: "/answers/snowball-or-avalanche-which-debt-payoff-method-is-better" },
      { label: "How do I budget on a low income?", href: "/answers/how-do-i-budget-on-a-low-income" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-much-should-i-have-in-an-emergency-fund",
    title: "How much should I have in an emergency fund?",
    metaTitle: "How much should I have in an emergency fund?",
    description: "Learn how much to save in an emergency fund, where to keep it, and a step by step plan to build it from zero.",
    keyword: "emergency fund",
    eyebrow: "Budgeting, explained",
    lede: "An emergency fund is money you set aside for the unexpected. A car repair. A medical bill. A job loss. A broken water heater.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "An emergency fund is money you set aside for the unexpected. A car repair. A medical bill. A job loss. A broken water heater. Life does not warn you before these costs show up. An emergency fund means you can handle them without going into debt. It is not exciting. It does not grow fast. It is still one of the most important things you can do with your money. Many people say their emergency fund is what helped them sleep at night. That is the point. It buys peace of mind.",
    sections: [
      {
        h2: "How much do you need?",
        blocks: [
          p("The common guideline is three to six months of essential expenses. Essential expenses are the costs you must pay to live. Rent or mortgage. Utilities. Groceries. Insurance. Transportation. Minimum debt payments. Not eating out. Not subscriptions. Not vacations. Just the basics."),
          p("If you have a stable job, a second income in the household, or low fixed costs, three months may be enough. If you are the only earner, if your income varies, if you have kids, or if you work in a field with frequent layoffs, six months is safer. Some people with very unstable income aim for more. The right number depends on your situation."),
        ],
      },
      {
        h2: "Some people keep their emergency fund at a different bank",
        blocks: [
          p("That adds a small barrier. It takes an extra day to transfer. That barrier helps you avoid impulse use. It is still fast enough for a real emergency."),
          p("How do you build it from zero? Step by step."),
          p("Step one is to set a first target. Pick 500 dollars. That is your first milestone. Write it down. A clear target is easier to hit than a vague goal like save more."),
          p("Step two is to open a separate savings account if you do not have one. Name it Emergency Fund. Naming it makes it feel real. It also reminds you what it is for."),
        ],
      },
      {
        h2: "Step four is to find one time boosts",
        blocks: [
          p("Tax refunds, work bonuses, cash gifts, or money from selling things you do not need can go straight to the fund. If you get a raise, send part of the raise to the fund until it is full. You will not miss money you never saw in your checking account."),
          p("Step five is to cut one expense temporarily and redirect it. Cancel one subscription for a few months. Cook at home one extra night a week. Put that saved money into the fund. You do not have to live on rice and beans. One or two small cuts can speed things up a lot."),
        ],
      },
      {
        h2: "Should I pay off debt or build an emergency fund first?",
        blocks: [
          p("In most cases, do both, but start with a small emergency fund first. If you put every dollar toward debt and then have an emergency, you will go right back into debt. A small cushion of 500 to 1,000 dollars breaks that cycle. Once you have that, you can focus more on high interest debt while still adding a little to savings each month. Once high interest debt is gone, finish building the full fund."),
          p("Should I keep saving after the fund is full? No. Once your emergency fund hits your target, redirect that automatic transfer to other goals. Retirement, a house down payment, or paying off debt are all good next steps. The emergency fund is a safety net, not an investment account. It should stay at its target, not keep growing forever."),
          p("What if my expenses change? Recalculate your target once a year, or after a big life change. If you move, have a child, or change jobs, your essential expenses will change. Adjust the target to match."),
        ],
      },
      {
        h2: "Start today",
        blocks: [
          p("Open the account. Set the transfer. Pick your first target. A small fund today is better than a perfect fund you never start. Future you will be glad you did."),
        ],
      },
    ],
    faq: [
      {
        q: "How much do you need?",
        a: "The common guideline is three to six months of essential expenses. Essential expenses are the costs you must pay to live. Rent or mortgage. Utilities. Groceries. Insurance. Transportation. Minimum debt payments. Not eating out. Not subscriptions. Not vacations. Just the basics.",
      },
      {
        q: "Should I pay off debt or build an emergency fund first?",
        a: "In most cases, do both, but start with a small emergency fund first. If you put every dollar toward debt and then have an emergency, you will go right back into debt. A small cushion of 500 to 1,000 dollars breaks that cycle. Once you have that, you can focus more on high interest debt while still adding a little to savings each month.",
      },
      {
        q: "What should I know about emergency fund?",
        a: "That adds a small barrier. It takes an extra day to transfer. That barrier helps you avoid impulse use. It is still fast enough for a real emergency. How do you build it from zero? Step by step. Step one is to set a first target. Pick 500 dollars. That is your first milestone. Write it down.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does the 50/30/20 budget rule work?", href: "/answers/how-does-the-503020-budget-rule-work" },
      { label: "Snowball or avalanche: which debt payoff method is better?", href: "/answers/snowball-or-avalanche-which-debt-payoff-method-is-better" },
      { label: "How do I budget on a low income?", href: "/answers/how-do-i-budget-on-a-low-income" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "snowball-or-avalanche-which-debt-payoff-method-is-better",
    title: "Snowball or avalanche: which debt payoff method is better?",
    metaTitle: "Snowball or avalanche: which debt payoff method is better?",
    description: "Compare debt snowball vs debt avalanche, learn how to choose the right strategy, and follow a step by step plan to pay off debt.",
    keyword: "debt payoff",
    eyebrow: "Budgeting, explained",
    lede: "Debt can feel heavy. Credit cards, student loans, car loans, medical bills. The balances add up. The interest adds up faster.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Debt can feel heavy. Credit cards, student loans, car loans, medical bills. The balances add up. The interest adds up faster. The good news is that a clear plan makes debt payoff much more manageable. Two of the most popular strategies are called the snowball method and the avalanche method. Both work. They work in different ways. The right one for you depends on what keeps you motivated and what saves you the most in interest.",
    sections: [
      {
        h2: "Let us look at each one",
        blocks: [
          p("The debt snowball method focuses on the smallest balance first. You list all your debts from smallest balance to largest balance. You pay the minimum on all of them. You put any extra money toward the smallest debt. When that debt is gone, you roll the money you were paying on it into the next smallest debt. The payment grows like a snowball rolling downhill. That is where the name comes from."),
          p("The advantage of the snowball is motivation. You get a quick win. Paying off a small debt feels good. It proves you can do it. That early win helps many people stay on track. For people who have struggled to stick with a plan, that feeling matters a lot."),
        ],
      },
      {
        h2: "Which one should you choose?",
        blocks: [
          p("Ask yourself one honest question. What will keep you going?"),
          p("If you need quick wins to stay motivated, pick the snowball. The math may cost a bit more in interest, but a plan you stick with beats a perfect plan you quit. If you are motivated by numbers and you can stay disciplined even without an early win, pick the avalanche. You will save more in interest."),
          p("Before you pick a method, get a clear picture of your debt. Make a list. For each debt, write down the creditor, the total balance, the minimum payment, the interest rate, and the due date. Include credit cards, personal loans, auto loans, student loans, and medical debt. Do not leave anything out. You cannot make a plan for debt you ignore."),
        ],
      },
      {
        h2: "Now, here is a step by step plan you can follow with either method",
        blocks: [
          p("Step one is to list your debts in order. For snowball, smallest balance to largest. For avalanche, highest interest rate to lowest. Keep the list where you can see it."),
          p("Step two is to pay minimums on everything, on time, every month. Late fees and penalty interest make debt worse. Set up autopay for at least the minimum if you can."),
          p("Step three is to pick your target debt. This is the first debt on your list. Put all extra money toward it. If you get a tax refund, a bonus, or money from selling something, put it toward this debt."),
        ],
      },
      {
        h2: "Step five is to repeat until all debts are gone",
        blocks: [
          p("One by one, the list gets shorter."),
          p("Step six is to redirect the freed up money. Once you are debt free, or once high interest debt is gone, send that monthly payment to savings or retirement. You already proved you can live without that money. Keep the habit going."),
          p("Call your creditors if you are struggling. If you lost a job or had a medical emergency, many creditors will work with you on a temporary hardship plan. It never hurts to ask. The worst they can do is say no."),
        ],
      },
      {
        h2: "Watch out for debt payoff scams",
        blocks: [
          p("No company can make your debt disappear for a small fee. If someone promises to settle your debt for pennies, be cautious. Real help comes from nonprofit credit counselors, not from companies that charge high upfront fees."),
          p("Track your progress. Update your list every month. Watch the total balance go down. If you use snowball, enjoy crossing off small debts. If you use avalanche, watch the total interest you are paying shrink. Seeing progress keeps you going."),
        ],
      },
    ],
    faq: [
      {
        q: "Which one should you choose?",
        a: "Ask yourself one honest question. What will keep you going? If you need quick wins to stay motivated, pick the snowball. The math may cost a bit more in interest, but a plan you stick with beats a perfect plan you quit. If you are motivated by numbers and you can stay disciplined even without an early win, pick the avalanche.",
      },
      {
        q: "What should I know about debt payoff?",
        a: "The debt snowball method focuses on the smallest balance first. You list all your debts from smallest balance to largest balance. You pay the minimum on all of them. You put any extra money toward the smallest debt. When that debt is gone, you roll the money you were paying on it into the next smallest debt.",
      },
      {
        q: "What does “let us look at each one” mean?",
        a: "The debt snowball method focuses on the smallest balance first. You list all your debts from smallest balance to largest balance. You pay the minimum on all of them. You put any extra money toward the smallest debt. When that debt is gone, you roll the money you were paying on it into the next smallest debt.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does the 50/30/20 budget rule work?", href: "/answers/how-does-the-503020-budget-rule-work" },
      { label: "How much should I have in an emergency fund?", href: "/answers/how-much-should-i-have-in-an-emergency-fund" },
      { label: "How do I budget on a low income?", href: "/answers/how-do-i-budget-on-a-low-income" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-i-budget-on-a-low-income",
    title: "How do I budget on a low income?",
    metaTitle: "How do I budget on a low income?",
    description: "Budgeting on a low income is hard but possible. Learn practical steps to prioritize essentials, cut costs, and find room to save.",
    keyword: "budgeting on low income",
    eyebrow: "Budgeting, explained",
    lede: "Budgeting on a low income is different. Most budgeting advice assumes you have extra money to move around. When income is tight, there is no extra.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Budgeting on a low income is different. Most budgeting advice assumes you have extra money to move around. When income is tight, there is no extra. Every dollar already has a job. That does not mean budgeting is pointless. It means budgeting matters even more. A budget on a low income is not about getting rich fast. It is about making sure rent is paid, food is on the table, and you do not run out of money before payday. It is about finding a little breathing room, even if it is small. Small room can prevent a small problem from turning into debt.",
    sections: [
      {
        h2: "Start with what is real",
        blocks: [
          p("Write down your actual take home pay for the month. Not your hourly rate. Not your salary before tax. The amount that lands in your account. If your income varies, use your lowest recent month as your base. It is better to plan for a low month and have extra than to plan for a high month and come up short."),
          p("Next, list your essentials. These are the costs you must pay to live and work. Housing comes first. Then utilities. Then food. Then transportation to work. Then insurance. Then minimum payments on any debt. Then phone, if you need it for work or safety. Then child care if you need it to work. Everything else is not an essential, even if it feels important."),
        ],
      },
      {
        h2: "First, pay essentials in order of consequence",
        blocks: [
          p("Rent or mortgage is first, because losing housing is the most serious consequence. Utilities are next, because losing power or water affects everything. Food is next. Transportation to work is next, because you need it to keep earning. Minimum debt payments are next, to avoid late fees and credit damage. This order helps when you have to choose what to pay first in a tight week."),
        ],
      },
      {
        h2: "Fifth, lower transportation costs",
        blocks: [
          p("If you can use public transit, a bus pass is often cheaper than owning a car. If you must drive, keep up with basic maintenance. An oil change is cheaper than an engine repair. Carpool when you can. Plan errands into one trip to save gas."),
          p("Sixth, avoid high cost debt. Payday loans, title loans, and high fee cash advances can trap you. The fees and interest make a small shortfall much bigger. If you are facing a gap, look for other options first. Ask about a payment plan. Ask a local nonprofit or community agency about emergency help. Ask your employer about a pay advance if that is available. A late fee is usually cheaper than a payday loan fee."),
        ],
      },
      {
        h2: "Ninth, use free resources in your community",
        blocks: [
          p("Libraries offer free internet, classes, and job help. Community centers offer free programs. Nonprofits offer help with rent, utilities, and food in a crisis. Schools offer free or reduced price meals for kids. Your employer may offer an Employee Assistance Program with free counseling or financial help. These resources exist for times when income is tight. Using them is smart, not weak."),
          p("A common question is whether you should save or pay off debt first on a low income. The honest answer is both, but in small amounts. Save a tiny cushion first, so you do not go back into debt at the next surprise. Then focus on high interest debt while still saving a little. Once high interest debt is gone, grow the cushion."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about budgeting on low income?",
        a: "Write down your actual take home pay for the month. Not your hourly rate. Not your salary before tax. The amount that lands in your account. If your income varies, use your lowest recent month as your base. It is better to plan for a low month and have extra than to plan for a high month and come up short. Next, list your essentials.",
      },
      {
        q: "What should I know about lower transportation costs?",
        a: "If you can use public transit, a bus pass is often cheaper than owning a car. If you must drive, keep up with basic maintenance. An oil change is cheaper than an engine repair. Carpool when you can. Plan errands into one trip to save gas. Sixth, avoid high cost debt. Payday loans, title loans, and high fee cash advances can trap you.",
      },
      {
        q: "What does “start with what is real” mean?",
        a: "Write down your actual take home pay for the month. Not your hourly rate. Not your salary before tax. The amount that lands in your account. If your income varies, use your lowest recent month as your base. It is better to plan for a low month and have extra than to plan for a high month and come up short. Next, list your essentials.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does the 50/30/20 budget rule work?", href: "/answers/how-does-the-503020-budget-rule-work" },
      { label: "How much should I have in an emergency fund?", href: "/answers/how-much-should-i-have-in-an-emergency-fund" },
      { label: "Snowball or avalanche: which debt payoff method is better?", href: "/answers/snowball-or-avalanche-which-debt-payoff-method-is-better" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-i-build-a-monthly-budget-that-works",
    title: "How do I build a monthly budget that works?",
    metaTitle: "How do I build a monthly budget that works?",
    description: "Learn how to build a monthly budget that actually works, track your spending without burnout, and adjust when life changes.",
    keyword: "monthly budget",
    eyebrow: "Budgeting, explained",
    lede: "Most budgets fail for a simple reason. They are too complicated to keep up. A good budget is not a perfect spreadsheet.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Most budgets fail for a simple reason. They are too complicated to keep up. A good budget is not a perfect spreadsheet. It is a plan you can actually follow month after month. This guide shows you how to build a monthly budget that works in real life. No guilt. No 30 categories. Just a clear plan, a simple way to track, and a habit of adjusting.",
    sections: [
      {
        h2: "Start with your income",
        blocks: [
          p("Write down your take home pay. That is the money that hits your bank account after taxes, health insurance, and retirement contributions that come out of your paycheck. If you are paid twice a month, add both paychecks. If you are paid weekly, add all the paychecks for the month. If your income varies, use an average of the last three months, or use your lowest month to be safe."),
          p("Next, list your fixed expenses. These are the bills that stay about the same each month. Rent or mortgage. Insurance premiums. Car payment. Phone bill. Internet. Subscriptions. Minimum debt payments. Student loan payments. Child care. Write down the amount and the due date for each one."),
        ],
      },
      {
        h2: "The 50/30/20 method splits after tax income into needs, wants",
        blocks: [
          p("It is good if you want a high level guide without many categories."),
          p("The zero based method gives every dollar a job. Income minus all planned spending and savings equals zero. It is good if you want tight control and you are willing to plan each month."),
          p("The pay yourself first method focuses on savings. You automate savings on payday, then spend the rest on bills and life. It is good if you hate tracking and just want to make sure savings happens."),
          p("The envelope method uses cash or separate accounts for variable categories like groceries and eating out. When the envelope is empty, you stop spending in that category. It is good if you overspend with cards."),
        ],
      },
      {
        h2: "Option two is to use a budgeting app that links to your account",
        blocks: [
          p("This can save time, but you still need to check it. Apps can miscategorize spending. A quick weekly review fixes that."),
          p("Option four is to use cash for problem categories. If eating out is your leak, use cash for eating out. When the cash is gone, you are done for the month. This is old fashioned, but it works."),
          p("Set up your bills to make the budget easier. Automate fixed bills where you can. Automate savings transfers on payday. Put due dates on a calendar. Late fees are wasted money. Automation reduces the chance of missing a payment."),
        ],
      },
      {
        h2: "Adjust for life changes",
        blocks: [
          p("A new job, a move, a baby, a medical bill, a raise, or a job loss all change your budget. Update your numbers when life changes. A budget that never changes stops being useful."),
          p("Handle irregular expenses by planning for them. Car insurance paid every six months, holiday gifts, annual subscriptions, and car maintenance are not surprises if you plan for them. Divide the yearly cost by 12 and save that amount each month in a separate savings bucket. When the bill comes, the money is there."),
          p("The first mistake is making the budget too detailed. If you have 30 categories, you will quit. Keep it to 10 or fewer categories if you can."),
        ],
      },
      {
        h2: "The fifth mistake is giving up after one bad month",
        blocks: [
          p("Everyone overspends sometimes. One bad month does not mean you are bad with money. It means you had a bad month. Look at what happened, adjust, and keep going."),
          p("Building a budget that works is not about restriction. It is about clarity. You know what is coming in. You know what is going out. You know what you are saving for. That clarity reduces stress, even when money is tight."),
          p("Start this month. Write down your income. List your bills. Pick a method. Automate savings. Check in once a week. Adjust at month end. That is the whole system. Simple enough to keep. Strong enough to change your finances over time."),
        ],
      },
    ],
    faq: [
      {
        q: "What are the 50/30/20 method splits after tax income into needs, wants?",
        a: "It is good if you want a high level guide without many categories. The zero based method gives every dollar a job. Income minus all planned spending and savings equals zero. It is good if you want tight control and you are willing to plan each month. The pay yourself first method focuses on savings.",
      },
      {
        q: "What should I know about monthly budget?",
        a: "Write down your take home pay. That is the money that hits your bank account after taxes, health insurance, and retirement contributions that come out of your paycheck. If you are paid twice a month, add both paychecks. If you are paid weekly, add all the paychecks for the month.",
      },
      {
        q: "What should I know about adjust for life changes?",
        a: "A new job, a move, a baby, a medical bill, a raise, or a job loss all change your budget. Update your numbers when life changes. A budget that never changes stops being useful. Handle irregular expenses by planning for them.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does the 50/30/20 budget rule work?", href: "/answers/how-does-the-503020-budget-rule-work" },
      { label: "How much should I have in an emergency fund?", href: "/answers/how-much-should-i-have-in-an-emergency-fund" },
      { label: "Snowball or avalanche: which debt payoff method is better?", href: "/answers/snowball-or-avalanche-which-debt-payoff-method-is-better" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "which-money-habits-actually-build-wealth",
    title: "Which money habits actually build wealth?",
    metaTitle: "Which money habits actually build wealth?",
    description: "Learn the money habits that build wealth over time, including automating savings, tracking spending, and avoiding lifestyle creep.",
    keyword: "money habits",
    eyebrow: "Budgeting, explained",
    lede: "Wealth is rarely built in one big moment. It is built in small habits, repeated month after month, year after year.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Wealth is rarely built in one big moment. It is built in small habits, repeated month after month, year after year. People who build wealth do not always earn the most. They often just have better habits. They save first. They spend with intention. They avoid the traps that keep money from growing. The good news is that habits can be learned. You do not need a finance degree. You need a few consistent behaviors and the patience to let them work.",
    sections: [
      {
        h2: "Habit one is to automate savings",
        blocks: [
          p("This is the single most powerful habit on the list. If you wait to save what is left over at the end of the month, there is rarely anything left. If you save first, automatically, you do not have to rely on willpower."),
          p("Set up an automatic transfer from checking to savings on payday. Start with an amount you can handle, even if it is 25 dollars per paycheck. If you get a raise, increase the transfer. If you have a workplace retirement plan, contribute at least enough to get the full employer match if one is offered. That match is part of your pay. Missing it is like turning down a raise."),
        ],
      },
      {
        h2: "Habit three is to live below your means",
        blocks: [
          p("This sounds simple. It is hard in practice. Living below your means means spending less than you earn, every month, and saving the difference. It does not mean living in poverty. It means leaving a gap between income and spending."),
          p("A practical way to keep the gap is to use a simple rule. When income goes up, save at least half of the increase. If you get a 200 dollar monthly raise, save 100 dollars and spend 100 dollars. You still get to enjoy the raise. You also grow your savings. This habit fights lifestyle creep."),
        ],
      },
      {
        h2: "Habit five is to pay off high interest debt and stay out of it",
        blocks: [
          p("Credit card debt with a high interest rate is one of the biggest obstacles to building wealth. The interest grows faster than most investments. Paying it off is often the smartest move you can make with spare cash, because every dollar of principal you pay down is a dollar that stops racking up interest."),
          p("If you have high interest debt, make a plan to pay it off. Use the snowball or avalanche method. Stop adding new debt while you pay it down. Once it is gone, redirect that payment to savings. Do not close every card, which can affect your credit score, but do stop using cards for spending you cannot pay off in full each month."),
        ],
      },
      {
        h2: "Habit eight is to keep learning about money",
        blocks: [
          p("You do not need to become an expert. You need to know the basics. How taxes work. How interest works. How retirement accounts work. How insurance works. Read one book on personal finance. Follow a few reliable sources. Ask questions. The more you know, the fewer costly mistakes you will make."),
          p("Habit nine is to review your finances regularly. Once a month, check your budget, your savings, and your debt. Once a year, check your insurance, your retirement contributions, your tax withholding, and your credit report. Annual reviews catch problems early. They also show you how far you have come. Progress is motivating. Seeing your net worth grow, even slowly, keeps you going."),
        ],
      },
      {
        h2: "Start with one habit this week",
        blocks: [
          p("Automate a savings transfer, even a small one. Or check your spending for the last month. Or cancel one subscription you do not use. One habit is enough to start. Next month, add another. Over time, these habits compound, just like money does."),
          p("Wealth is not about being perfect. It is about being consistent. Save first. Spend with intention. Avoid debt that drags you down. Protect what you build. Do those things most months, for many years, and you will be in a stronger place than you are today."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about money habits?",
        a: "This is the single most powerful habit on the list. If you wait to save what is left over at the end of the month, there is rarely anything left. If you save first, automatically, you do not have to rely on willpower. Set up an automatic transfer from checking to savings on payday.",
      },
      {
        q: "What does “habit one is to automate savings” mean?",
        a: "This is the single most powerful habit on the list. If you wait to save what is left over at the end of the month, there is rarely anything left. If you save first, automatically, you do not have to rely on willpower. Set up an automatic transfer from checking to savings on payday.",
      },
      {
        q: "What does “habit three is to live below your means” mean?",
        a: "This sounds simple. It is hard in practice. Living below your means means spending less than you earn, every month, and saving the difference. It does not mean living in poverty. It means leaving a gap between income and spending. A practical way to keep the gap is to use a simple rule.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does the 50/30/20 budget rule work?", href: "/answers/how-does-the-503020-budget-rule-work" },
      { label: "How much should I have in an emergency fund?", href: "/answers/how-much-should-i-have-in-an-emergency-fund" },
      { label: "Snowball or avalanche: which debt payoff method is better?", href: "/answers/snowball-or-avalanche-which-debt-payoff-method-is-better" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-i-build-credit-from-scratch",
    title: "How do I build credit from scratch?",
    metaTitle: "How do I build credit from scratch?",
    description: "No credit history yet? Learn how secured cards, authorized user status, and credit builder loans work, plus the habits that build a solid score over time.",
    keyword: "building credit from scratch",
    eyebrow: "Credit, explained",
    lede: "Starting from zero with credit feels like a catch-22. You need credit to get credit.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Starting from zero with credit feels like a catch-22. You need credit to get credit. Lenders want to see a track record, but you cannot build one until someone gives you a chance. The good news is that there are a few proven ways to get that first track record started. None of them work overnight. All of them work if you stay consistent. First, it helps to understand what credit actually is. When you borrow money and pay it back, lenders keep track of how you did. That track record becomes your credit history. Your credit report is the file that holds that history. Your credit score is a number that summarizes it. With no history, you have no file to summarize. That is called having a thin file or no file. It does not mean you did anything wrong. It just means you have not started yet.",
    sections: [
      {
        h2: "Most people start building credit in one of three ways",
        blocks: [
          p("A secured card, becoming an authorized user, or a credit builder loan. You can use one of them or combine them. What matters most is that you use whichever you pick in a careful, steady way."),
          p("A secured credit card is often the best first step. It works a lot like a regular credit card, with one big difference. You put down a deposit first. That deposit usually becomes your credit limit. So if you put down 200 dollars, your limit is usually 200 dollars. You use the card for small purchases, then you pay it off. The card company reports your payments to the credit bureaus. Over time, those on-time payments build your history."),
        ],
      },
      {
        h2: "How you use a secured card matters more than which one you pick",
        blocks: [
          p("Keep it simple. Use it for one small, regular expense, like gas or groceries. Pay the full balance every month. Pay on time, every time. Do not max it out. Lenders like to see that you use a small part of your limit and pay it back. If your limit is 200 dollars, try to keep your balance well below that when your statement closes. And never carry a balance just to build credit. You do not need to pay interest to build a score. Paying in full is better for your wallet and your score."),
        ],
      },
      {
        h2: "The third path is a credit builder loan",
        blocks: [
          p("This one sounds odd at first, because it works backward from a normal loan. With a normal loan, you get money up front and pay it back. With a credit builder loan, you make payments first, and you get the money at the end. Here is how it usually works. A bank or credit union approves you for a small loan, often a few hundred to a thousand dollars. They hold that money in a savings account for you. You make monthly payments for 6 to 24 months. Each payment gets reported to the credit bureaus. At the end, you get the money, sometimes minus interest and fees."),
        ],
      },
      {
        h2: "Keep your balances low",
        blocks: [
          p("This is called credit utilization. It is how much of your available credit you are using. Lower is better. If you have a 500 dollar limit and you owe 50 dollars when your statement closes, that is low. If you owe 450 dollars, that is high, even if you pay it off later. Try to keep your reported balances low. Paying early in the month, before your statement closes, can help."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about building credit from scratch?",
        a: "A secured card, becoming an authorized user, or a credit builder loan. You can use one of them or combine them. What matters most is that you use whichever you pick in a careful, steady way. A secured credit card is often the best first step. It works a lot like a regular credit card, with one big difference. You put down a deposit first.",
      },
      {
        q: "What does “most people start building credit in one of three ways” mean?",
        a: "A secured card, becoming an authorized user, or a credit builder loan. You can use one of them or combine them. What matters most is that you use whichever you pick in a careful, steady way. A secured credit card is often the best first step. It works a lot like a regular credit card, with one big difference. You put down a deposit first.",
      },
      {
        q: "What does “how you use a secured card matters more than which one you pick” mean?",
        a: "Keep it simple. Use it for one small, regular expense, like gas or groceries. Pay the full balance every month. Pay on time, every time. Do not max it out. Lenders like to see that you use a small part of your limit and pay it back. If your limit is 200 dollars, try to keep your balance well below that when your statement closes.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How can I improve my credit score?", href: "/answers/how-can-i-improve-my-credit-score" },
      { label: "How do credit cards actually work?", href: "/answers/how-do-credit-cards-actually-work" },
      { label: "What is the difference between a credit report and a credit score?", href: "/answers/what-is-the-difference-between-a-credit-report-and-a-credit-score" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-can-i-improve-my-credit-score",
    title: "How can I improve my credit score?",
    metaTitle: "How can I improve my credit score?",
    description: "Want a higher credit score? Learn which habits matter most, from payment history and utilization to what to avoid, and how long improvement takes.",
    keyword: "how to improve credit score",
    eyebrow: "Credit, explained",
    lede: "Everyone wants a higher credit score, but not every tip you hear actually helps. Some advice is solid. Some is noise.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Everyone wants a higher credit score, but not every tip you hear actually helps. Some advice is solid. Some is noise. Some can even hurt you if you follow it at the wrong time. The good news is that improving your score is not mysterious. It comes down to a few habits, repeated over time. Your credit score is a snapshot of how you handle borrowed money. The most common scores are FICO scores and VantageScore. Both look at similar things, but they weigh them a little differently. The biggest factors are the same in both. How you pay, how much you owe relative to your limits, how long you have had credit, and how you handle new credit.",
    sections: [
      {
        h2: "Payment history is the biggest factor",
        blocks: [
          p("It is the record of whether you paid on time. For FICO scores, it is about 35 percent of your score. That is more than any other single factor. One late payment can hurt, especially if your history is short or your score was already high. A pattern of on-time payments helps a lot."),
          p("If you take one thing from this post, make it this. Pay on time, every time. Set up autopay for at least the minimum payment on every account. That way a busy week or a forgotten due date does not turn into a late mark. Then, when you can, pay the full balance. Paying in full saves you interest and keeps your balances low. But even if you cannot pay in full, paying on time is what protects your score most."),
        ],
      },
      {
        h2: "You do not need to hit zero to have good utilization",
        blocks: [
          p("But lower is generally better. Many people aim to keep reported balances well under 30 percent of their limits, and lower still if they can. The trick is timing. Your card company usually reports your balance once a month, around your statement closing date. If you charge a lot during the month but pay it off before that date, your reported balance will be low. If you wait until after the statement closes, your reported balance will be high, even if you pay in full by the due date. Paying early or paying twice a month can help keep reported balances down."),
        ],
      },
      {
        h2: "Now let us talk about what actually moves the needle fastest",
        blocks: [
          p("If you have late payments, getting current and staying current is step one. Bring any past-due accounts up to date. Then keep them current. Over time, the impact of old late payments fades, especially as you build new on-time history."),
          p("If your utilization is high, paying down balances is often the fastest win. Focus on the cards with the highest utilization first. Even paying a card from 90 percent used down to under 50 percent can help. Paying it down further helps more. You do not have to pay everything off at once to see progress, though paying off high-interest debt saves you real money too."),
        ],
      },
      {
        h2: "There are a few habits that hurt scores and are worth avoiding",
        blocks: [
          p("Missing payments is the big one. Maxing out cards is another. Applying for several store cards in one shopping trip is another. And co-signing a loan for someone who may not pay is risky. If they miss, your score takes the hit too."),
        ],
      },
      {
        h2: "Improving your credit score is not about tricks",
        blocks: [
          p("It is about showing, month after month, that you borrow small, pay on time, and do not overextend. Do that, and the score follows. Keep it boring. Keep it steady. That is what moves the needle."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the biggest factor?",
        a: "It is the record of whether you paid on time. For FICO scores, it is about 35 percent of your score. That is more than any other single factor. One late payment can hurt, especially if your history is short or your score was already high. A pattern of on-time payments helps a lot. If you take one thing from this post, make it this.",
      },
      {
        q: "What should I know about how to improve credit score?",
        a: "But lower is generally better. Many people aim to keep reported balances well under 30 percent of their limits, and lower still if they can. The trick is timing. Your card company usually reports your balance once a month, around your statement closing date.",
      },
      {
        q: "What should I know about the needle fastest?",
        a: "If you have late payments, getting current and staying current is step one. Bring any past-due accounts up to date. Then keep them current. Over time, the impact of old late payments fades, especially as you build new on-time history. If your utilization is high, paying down balances is often the fastest win.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How do I build credit from scratch?", href: "/answers/how-do-i-build-credit-from-scratch" },
      { label: "How do credit cards actually work?", href: "/answers/how-do-credit-cards-actually-work" },
      { label: "What is the difference between a credit report and a credit score?", href: "/answers/what-is-the-difference-between-a-credit-report-and-a-credit-score" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-credit-cards-actually-work",
    title: "How do credit cards actually work?",
    metaTitle: "How do credit cards actually work?",
    description: "Confused by credit card terms? Learn how APR, minimum payments, grace periods, and interest work in plain English, and how to use a card without getting stuck",
    keyword: "credit cards explained",
    eyebrow: "Credit, explained",
    lede: "Credit cards can be useful tools. They can also be expensive traps. The difference usually comes down to whether you understand how they work.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Credit cards can be useful tools. They can also be expensive traps. The difference usually comes down to whether you understand how they work. APR, minimum payments, grace periods, and interest sound technical. They are not. Once you see them in plain English, credit cards get a lot less confusing. A credit card is a line of credit. A bank gives you a limit, which is the most you can borrow at one time. When you swipe the card, you are borrowing that money. You do not pay the store. The bank pays the store, and you owe the bank. Each month, the bank sends you a statement. It shows what you spent, what you owe, your minimum payment, and your due date.",
    sections: [
      {
        h2: "APR stands for annual percentage rate",
        blocks: [
          p("It is the cost of borrowing, expressed as a yearly rate. If your APR is 24 percent, that does not mean you pay 24 percent on every purchase right away. It means if you carry a balance for a full year, the interest adds up to about that rate. Credit card APRs are often higher than other loans, like auto loans or mortgages. That is because credit cards are unsecured. There is no car or house the bank can take if you do not pay. The bank charges more to cover that risk."),
        ],
      },
      {
        h2: "Here is a simple example",
        blocks: [
          p("Say you have a 1,000 dollar balance and a 24 percent APR. Your daily rate is about 0.066 percent. On a 1,000 dollar balance, that is about 66 cents of interest per day. Over a 30-day month, that is about 20 dollars. That may not sound terrible. But if you keep carrying that balance and keep adding purchases, the interest stacks up. And if you only pay the minimum, it takes a long time to clear."),
        ],
      },
      {
        h2: "Now let us talk about minimum payments",
        blocks: [
          p("Your statement shows a minimum amount you must pay by the due date. It is usually a small percentage of your balance, plus interest and fees. Paying the minimum keeps your account in good standing. It keeps you from getting a late fee. But it barely dents your debt. Most of your payment goes to interest, and a little goes to the balance. The rest stays and keeps charging interest."),
        ],
      },
      {
        h2: "Keep your utilization low",
        blocks: [
          p("That means do not use most of your limit. If your limit is 1,000 dollars, try to keep your statement balance well below that. Lower utilization is better for your credit score, and it is easier to pay off in full."),
          p("Watch out for fees. Late fees, over-limit fees, foreign transaction fees, and annual fees can add up. Set up autopay for at least the minimum so you never miss a due date by accident. If you travel, check if your card charges a foreign transaction fee. If your card has an annual fee, make sure the benefits are worth it. Many good cards have no annual fee."),
        ],
      },
      {
        h2: "Credit cards are not good or bad on their own",
        blocks: [
          p("They are tools. Used well, they build credit, protect purchases, and make life easier. Used badly, they create debt that is hard to escape. The difference is understanding APR, grace periods, and minimum payments, and making the simple choice to pay in full, on time, every month."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about credit cards explained?",
        a: "It is the cost of borrowing, expressed as a yearly rate. If your APR is 24 percent, that does not mean you pay 24 percent on every purchase right away. It means if you carry a balance for a full year, the interest adds up to about that rate. Credit card APRs are often higher than other loans, like auto loans or mortgages.",
      },
      {
        q: "What does “aPR stands for annual percentage rate” mean?",
        a: "It is the cost of borrowing, expressed as a yearly rate. If your APR is 24 percent, that does not mean you pay 24 percent on every purchase right away. It means if you carry a balance for a full year, the interest adds up to about that rate. Credit card APRs are often higher than other loans, like auto loans or mortgages.",
      },
      {
        q: "What does “here is a simple example” mean?",
        a: "Say you have a 1,000 dollar balance and a 24 percent APR. Your daily rate is about 0.066 percent. On a 1,000 dollar balance, that is about 66 cents of interest per day. Over a 30-day month, that is about 20 dollars. That may not sound terrible. But if you keep carrying that balance and keep adding purchases, the interest stacks up.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How do I build credit from scratch?", href: "/answers/how-do-i-build-credit-from-scratch" },
      { label: "How can I improve my credit score?", href: "/answers/how-can-i-improve-my-credit-score" },
      { label: "What is the difference between a credit report and a credit score?", href: "/answers/what-is-the-difference-between-a-credit-report-and-a-credit-score" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "what-is-the-difference-between-a-credit-report-and-a-credit-score",
    title: "What is the difference between a credit report and a credit score?",
    metaTitle: "What is the difference between a credit report and a credit",
    description: "A credit report and a credit score are not the same thing. Learn what each one contains, how they relate, and how to check both for free.",
    keyword: "credit report vs credit score",
    eyebrow: "Credit, explained",
    lede: "People mix up credit reports and credit scores all the time. They sound similar. They are related. But they are not the same thing.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "People mix up credit reports and credit scores all the time. They sound similar. They are related. But they are not the same thing. Knowing the difference helps you protect yourself, fix errors, and understand why lenders see you the way they do. Think of it like this. Your credit report is the full story. Your credit score is the summary number. The report is the detailed file. The score is a quick grade based on that file. Lenders may look at both. The report tells them what happened. The score gives them a fast way to compare you to other borrowers.",
    sections: [
      {
        h2: "Let us start with the credit report",
        blocks: [
          p("A credit report is a record of your borrowing history. It is kept by credit bureaus, also called credit reporting agencies. The three major ones in the United States are Equifax, Experian, and TransUnion. Each one keeps its own report on you. They are usually similar, but not identical. A lender might report to one bureau and not another, or report at slightly different times. That is why your reports can differ a bit."),
        ],
      },
      {
        h2: "Your report also includes public records and collections",
        blocks: [
          p("Bankruptcies, foreclosures, and accounts sent to collections can show up here. They stay on your report for a set number of years, often up to seven years for most negative items, and up to ten years for some bankruptcies. Your report does not include your income, your bank balances, your race, your religion, or your medical history beyond medical debts that went to collections. It is about borrowing, not about who you are."),
        ],
      },
      {
        h2: "Here is a simple way to remember the relationship",
        blocks: [
          p("If your report is your transcript, your score is your GPA. The transcript shows every class and grade. The GPA boils it down to one number. A lender who wants detail reads the transcript. A lender who wants a quick read looks at the GPA. Both matter."),
          p("How do you check your credit report for free? By law, you are entitled to a free copy of your report from each of the three bureaus at AnnualCreditReport.com. That is the only official site authorized by federal law for free reports. You can get all three at once, or spread them out through the year. Many people check one every few months so they can spot problems early. When you request your report there, you will need to answer some identity questions. That is normal. It is how they verify it is you."),
        ],
      },
      {
        h2: "How often should you check?",
        blocks: [
          p("At least once a year for your full reports, and more often if you are actively building or repairing credit, or if you think there could be fraud. If you are about to apply for a big loan, like a mortgage, check your reports a few months early. That gives you time to fix errors before a lender sees them."),
          p("What should you look for when you read your report? Start with the basics. Is your name spelled right? Are your addresses right? Do you recognize every account? Look at each account's payment history. Are there any late marks you do not think are right? Are balances correct? Are there any accounts you closed that still show as open, or the other way around? Look at inquiries. Do you recognize them? An inquiry you do not recognize could be a sign of identity theft."),
        ],
      },
      {
        h2: "If you have never checked your reports, start today",
        blocks: [
          p("Go to AnnualCreditReport.com. Pull one report. Read it slowly. Then set a reminder to check the next one in a few months. It takes a little time, but it is one of the best habits you can build for your money. Your credit report is your financial reputation on paper. Your score is the headline. Know both, check both, and fix what is wrong. That is how you stay in control."),
        ],
      },
    ],
    faq: [
      {
        q: "How often should you check?",
        a: "At least once a year for your full reports, and more often if you are actively building or repairing credit, or if you think there could be fraud. If you are about to apply for a big loan, like a mortgage, check your reports a few months early. That gives you time to fix errors before a lender sees them.",
      },
      {
        q: "What should I know about the credit report?",
        a: "A credit report is a record of your borrowing history. It is kept by credit bureaus, also called credit reporting agencies. The three major ones in the United States are Equifax, Experian, and TransUnion. Each one keeps its own report on you. They are usually similar, but not identical.",
      },
      {
        q: "What should I know about credit report vs credit score?",
        a: "Bankruptcies, foreclosures, and accounts sent to collections can show up here. They stay on your report for a set number of years, often up to seven years for most negative items, and up to ten years for some bankruptcies.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How do I build credit from scratch?", href: "/answers/how-do-i-build-credit-from-scratch" },
      { label: "How can I improve my credit score?", href: "/answers/how-can-i-improve-my-credit-score" },
      { label: "How do credit cards actually work?", href: "/answers/how-do-credit-cards-actually-work" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-much-life-insurance-do-i-need",
    title: "How much life insurance do I need?",
    metaTitle: "How much life insurance do I need?",
    description: "New to life insurance? Learn the difference between term and whole life, how to think about how much coverage you need, and who should consider it.",
    keyword: "life insurance basics",
    eyebrow: "Insurance, explained",
    lede: "Life insurance is one of those topics people avoid. It is about death, and nobody likes to think about that.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Life insurance is one of those topics people avoid. It is about death, and nobody likes to think about that. But at its core, life insurance is simple. It is a contract that pays money to people you choose if you pass away while the policy is in force. That money is called a death benefit. It can help your family pay bills, keep their home, and stay on their feet during a hard time. Why do people buy it? The main reason is to replace income. If people depend on your paycheck, life insurance can replace some of that paycheck if you are gone. It can also pay for final expenses, like a funeral. It can pay off debts, like a mortgage. It can fund a child's education. It can leave money to a charity or a cause you care about. It is not about you. It is about the people you would leave behind.",
    sections: [
      {
        h2: "There are two broad types of life insurance",
        blocks: [
          p("Term life and permanent life. Term is the simpler one. Permanent includes whole life and universal life. Let us walk through each."),
          p("Term life insurance covers you for a set period, or term. Common terms are 10, 20, or 30 years. If you pass away during that term, the policy pays the death benefit to your beneficiaries. If you outlive the term, the policy ends and pays nothing. You can often renew it, but the premium usually goes up a lot as you get older. Some term policies let you convert to permanent coverage later. Term is usually the most affordable type, especially when you are young and healthy. That is why it is a common choice for families who need a lot of coverage on a budget."),
        ],
      },
      {
        h2: "Universal life is another type of permanent insurance",
        blocks: [
          p("It also has a death benefit and cash value, but it is more flexible. You can often adjust your premiums and your death benefit within limits. That flexibility can be useful, but it also makes the policy more complex. If you do not pay enough, the cash value can run low and the policy can lapse. Universal life comes in several variations, including indexed and variable types that tie cash value growth to market performance. Those add risk and complexity. For most people who just need straightforward protection, term is easier to understand and compare."),
        ],
      },
      {
        h2: "The best way to think about it is to add up the pieces",
        blocks: [
          p("Start with debts you want covered. Add income replacement for the years your family would need it. Add future costs like college. Then subtract what you already have, like savings, existing insurance, and any benefits from work. What is left is a rough sense of the gap. An insurance agent or financial professional can walk through this with you. You do not have to guess alone."),
        ],
      },
      {
        h2: "Here is a practical checklist if you are thinking about buying",
        blocks: [
          p("First, figure out who depends on you and what they would need. Second, decide how long you need coverage. Third, compare term quotes from more than one company. Fourth, read the policy. Check the term length, the death benefit, the premium, and whether the premium can change. Fifth, name your beneficiaries carefully and review them after big life events like marriage, divorce, or a new child."),
          p("Life insurance is not exciting. It is not supposed to be. It is a safety net. You hope your family never needs it. You buy it so that if the worst happens, they have one less thing to worry about. Start with your needs, keep it simple, and get coverage that fits your life and your budget. That is the whole point."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about life insurance basics?",
        a: "Term life and permanent life. Term is the simpler one. Permanent includes whole life and universal life. Let us walk through each. Term life insurance covers you for a set period, or term. Common terms are 10, 20, or 30 years. If you pass away during that term, the policy pays the death benefit to your beneficiaries.",
      },
      {
        q: "What should I know about the best way to think about?",
        a: "Start with debts you want covered. Add income replacement for the years your family would need it. Add future costs like college. Then subtract what you already have, like savings, existing insurance, and any benefits from work. What is left is a rough sense of the gap.",
      },
      {
        q: "What does “there are two broad types of life insurance” mean?",
        a: "Term life and permanent life. Term is the simpler one. Permanent includes whole life and universal life. Let us walk through each. Term life insurance covers you for a set period, or term. Common terms are 10, 20, or 30 years. If you pass away during that term, the policy pays the death benefit to your beneficiaries.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
      { label: "Do I need renters insurance?", href: "/answers/do-i-need-renters-insurance" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "how-do-i-choose-a-health-insurance-plan",
    title: "How do I choose a health insurance plan?",
    metaTitle: "How do I choose a health insurance plan?",
    description: "Health insurance terms can feel like a foreign language. Learn what premiums, deductibles, copays, and networks mean, and how to pick a plan that fits",
    keyword: "health insurance basics",
    eyebrow: "Insurance, explained",
    lede: "Health insurance is one of the most important purchases you will make. It is also one of the most confusing.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Health insurance is one of the most important purchases you will make. It is also one of the most confusing. Premiums, deductibles, copays, coinsurance, networks, out-of-pocket maximums. The words pile up fast. Once you understand what each one means, comparing plans gets a lot easier. Let us start with the basic idea. Health insurance is a contract. You pay a monthly premium. In return, the insurance company helps pay for your medical care. Without insurance, a hospital stay or a serious illness could cost more than most people can pay out of pocket. Insurance spreads that risk. You pay a steady amount each month so that a big medical bill does not wipe you out.",
    sections: [
      {
        h2: "Your premium is what you pay every month to keep your coverage",
        blocks: [
          p("Think of it like a subscription. If you stop paying, your coverage ends. Premiums vary a lot. They depend on the plan, your age, where you live, and whether you get coverage through work or buy it on your own. In general, plans with lower premiums tend to have higher costs when you get care. Plans with higher premiums tend to have lower costs when you get care. That trade-off is at the heart of choosing a plan."),
        ],
      },
      {
        h2: "Coinsurance is a percentage you pay, rather than a flat fee",
        blocks: [
          p("For example, after you meet your deductible, you might pay 20 percent coinsurance for a hospital stay, and insurance pays 80 percent. If the covered cost is 10,000 dollars, you pay 2,000 dollars and insurance pays 8,000 dollars. Coinsurance can be harder to predict than a copay, because it depends on the total cost of care."),
        ],
      },
      {
        h2: "There are a few common plan types",
        blocks: [
          p("An HMO, or Health Maintenance Organization, usually requires you to use in-network providers and pick a primary care doctor. You often need a referral to see a specialist. HMOs tend to have lower premiums and lower out-of-pocket costs, but less flexibility. A PPO, or Preferred Provider Organization, lets you see providers in or out of network without a referral, though you pay more out of network. PPOs tend to have higher premiums but more choice. An EPO, or Exclusive Provider Organization, is in between. You do not need referrals, but you usually must stay in network except for emergencies. An HDHP, or High Deductible Health Plan, has a higher deductible and lower premium. It can be paired with an HSA, a Health Savings Account, that lets you save pre-tax money for medical costs."),
        ],
      },
      {
        h2: "Do the math",
        blocks: [
          p("Do not just look at the premium. Add up the premium for the year, plus what you would likely pay in deductibles, copays, and coinsurance based on your usual care. That total is a better way to compare plans than premium alone. And check the out-of-pocket maximum. That tells you your worst-case cost for covered care."),
          p("Check the network before you enroll. Look up your doctors, your preferred hospital, and your pharmacy. If they are out of network, you could pay a lot more, or you could have to switch providers. If you are choosing between two similar plans, the one that includes your current doctors often wins."),
        ],
      },
      {
        h2: "Health insurance will never be simple",
        blocks: [
          p("But it does not have to be a mystery. Premium is what you pay to keep the plan. Deductible is what you pay first. Copay is a flat fee. Coinsurance is a percentage. Out-of-pocket maximum is your cap. Network is where you get the best price. Start with your health, your doctors, and your budget, then pick the plan that fits those three. That is how you choose well."),
        ],
      },
    ],
    faq: [
      {
        q: "Do the math?",
        a: "Do not just look at the premium. Add up the premium for the year, plus what you would likely pay in deductibles, copays, and coinsurance based on your usual care. That total is a better way to compare plans than premium alone. And check the out-of-pocket maximum. That tells you your worst-case cost for covered care.",
      },
      {
        q: "What should I know about health insurance basics?",
        a: "Think of it like a subscription. If you stop paying, your coverage ends. Premiums vary a lot. They depend on the plan, your age, where you live, and whether you get coverage through work or buy it on your own. In general, plans with lower premiums tend to have higher costs when you get care.",
      },
      {
        q: "What does “your premium is what you pay every month to keep your coverage” mean?",
        a: "Think of it like a subscription. If you stop paying, your coverage ends. Premiums vary a lot. They depend on the plan, your age, where you live, and whether you get coverage through work or buy it on your own. In general, plans with lower premiums tend to have higher costs when you get care.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
      { label: "Do I need renters insurance?", href: "/answers/do-i-need-renters-insurance" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "what-does-homeowners-insurance-cover",
    title: "What does homeowners insurance cover?",
    metaTitle: "What does homeowners insurance cover?",
    description: "Buying a home? Learn what homeowners insurance covers, what it excludes, and how to pick coverage that actually protects you.",
    keyword: "home insurance basics",
    eyebrow: "Insurance, explained",
    lede: "If you own a home, you need homeowners insurance. If you have a mortgage, your lender will require it.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you own a home, you need homeowners insurance. If you have a mortgage, your lender will require it. But even if you own your home outright, going without it is risky. A house is usually the biggest asset most people own. One fire, storm, or lawsuit could cost more than most families can pay. Home insurance is how you protect that asset. At its simplest, homeowners insurance is a contract. You pay a premium. In return, the insurance company agrees to pay for certain losses to your home and property, and for certain liabilities, up to your policy limits. It does not cover everything. It covers what is listed in the policy. That is why reading the policy matters.",
    sections: [
      {
        h2: "A standard homeowners policy has several parts",
        blocks: [
          p("Let us walk through them."),
          p("Dwelling coverage pays to repair or rebuild your house if it is damaged by a covered event, like fire, wind, hail, or a fallen tree. This is the core of the policy. Your dwelling limit should be enough to rebuild your home at current construction costs, not just what you paid for it. Construction costs can be higher than market value, especially after a big storm when everyone needs repairs at once."),
          p("Other structures coverage pays for things that are not attached to your house, like a detached garage, a shed, or a fence. It is usually a percentage of your dwelling limit."),
        ],
      },
      {
        h2: "Loss of use coverage pays for extra living costs if you cannot live",
        blocks: [
          p("That can include hotel bills, rent for a temporary place, and extra food costs. It has a limit, so check it."),
          p("Liability coverage pays if someone is injured on your property, or if you accidentally cause damage to someone else's property, and you are found responsible. It can pay for medical bills, legal costs, and settlements, up to your limit. This is a part people overlook. A dog bite, a slip on your steps, or a kid breaking a neighbor's window can all become liability claims."),
          p("Medical payments coverage pays small medical bills if a guest is hurt on your property, regardless of who was at fault. It is usually a small limit, like a few thousand dollars. It is meant to handle minor injuries quickly without a lawsuit."),
        ],
      },
      {
        h2: "Most policies also do not cover earthquakes, unless you add",
        blocks: [
          p("They do not cover normal wear and tear, like a roof that wears out with age, or a pipe that slowly leaks over months. They do not cover maintenance problems, pest damage, or mold that comes from neglect. They also do not cover intentional damage. And they have limits on certain valuables. Jewelry, art, cash, and firearms often have special sublimits. If you own high-value items, you may need a separate rider or endorsement to cover them fully."),
        ],
      },
      {
        h2: "Think about liability",
        blocks: [
          p("The standard limit is often 100,000 dollars, but many people choose 300,000 dollars or more. The cost difference is often small, and the protection is much bigger. If you have significant assets to protect, ask about an umbrella policy. That is extra liability coverage that kicks in after your home and auto limits run out."),
          p("Consider endorsements. These are add-ons that expand coverage. Common ones include water backup coverage, which pays if a sump pump fails or a drain backs up. Scheduled personal property, which covers high-value jewelry or art. And ordinance or law coverage, which pays the extra cost to rebuild to current building codes. Ask what endorsements make sense for your home and area."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about home insurance basics?",
        a: "Let us walk through them. Dwelling coverage pays to repair or rebuild your house if it is damaged by a covered event, like fire, wind, hail, or a fallen tree. This is the core of the policy. Your dwelling limit should be enough to rebuild your home at current construction costs, not just what you paid for it.",
      },
      {
        q: "What should I know about think about liability?",
        a: "The standard limit is often 100,000 dollars, but many people choose 300,000 dollars or more. The cost difference is often small, and the protection is much bigger. If you have significant assets to protect, ask about an umbrella policy. That is extra liability coverage that kicks in after your home and auto limits run out.",
      },
      {
        q: "What does “a standard homeowners policy has several parts” mean?",
        a: "Let us walk through them. Dwelling coverage pays to repair or rebuild your house if it is damaged by a covered event, like fire, wind, hail, or a fallen tree. This is the core of the policy. Your dwelling limit should be enough to rebuild your home at current construction costs, not just what you paid for it.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "Do I need renters insurance?", href: "/answers/do-i-need-renters-insurance" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "do-i-need-renters-insurance",
    title: "Do I need renters insurance?",
    metaTitle: "Do I need renters insurance?",
    description: "Think your landlord's insurance covers your stuff? It does not. Learn what renters insurance covers, why it matters, and how affordable it usually is.",
    keyword: "renters insurance",
    eyebrow: "Insurance, explained",
    lede: "If you rent, you might think you do not need insurance. Your landlord has insurance, right?",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you rent, you might think you do not need insurance. Your landlord has insurance, right? That is true, but your landlord's policy covers the building, not your stuff. It covers the walls, the roof, and the landlord's property. It does not cover your furniture, your clothes, your laptop, or your liability if someone gets hurt in your place. That is what renters insurance is for. Renters insurance is a policy that protects you as a renter. It is one of the most affordable types of insurance, and one of the most overlooked. Many people skip it because they think they do not own enough to insure. But add up what it would cost to replace everything you own. Furniture, electronics, clothes, kitchen gear, bedding. For most people, it adds up fast. Could you replace all of it out of pocket tomorrow? If not, renters insurance is worth a look.",
    sections: [
      {
        h2: "What does renters insurance cover?",
        blocks: [
          p("It usually has three main parts."),
          p("Personal property coverage pays to repair or replace your belongings if they are damaged or destroyed by a covered event. Covered events usually include fire, smoke, theft, vandalism, and certain types of water damage, like a burst pipe. It does not cover every possible cause. Floods and earthquakes are usually excluded unless you add coverage. Normal wear and tear is not covered. But for the common risks renters face, like a kitchen fire or a break-in, this coverage is the core."),
        ],
      },
      {
        h2: "Loss of use, also called additional living expenses, pays for extra",
        blocks: [
          p("If a fire forces you out for a few weeks, this coverage can help pay for a hotel, a temporary rental, and extra food costs, up to your limit. Without it, you would be paying rent on a place you cannot live in, plus paying for somewhere else to stay."),
          p("Some policies also cover medical payments to others. This pays small medical bills if a guest is hurt in your apartment, regardless of fault. It is a small limit, but it can resolve minor injuries quickly."),
        ],
      },
      {
        h2: "There are two ways your belongings can be valued",
        blocks: [
          p("Actual cash value pays what the item is worth now, after depreciation. If your five-year-old couch is destroyed, actual cash value pays what a five-year-old couch is worth, not what a new one costs. Replacement cost pays what it costs to buy a new item like it. Replacement cost costs a little more in premium, but it pays more when you file a claim. For most renters, replacement cost is the better choice if the price difference is small."),
        ],
      },
      {
        h2: "For liability, many policies start at 100,000 dollars",
        blocks: [
          p("Some renters choose 300,000 dollars. The cost difference is often small, and the extra protection is real. If someone is seriously hurt in your place, 100,000 dollars can go fast. Ask your agent what the price difference is. Often it is just a few dollars a month."),
          p("Your deductible is what you pay before insurance pays. A common deductible is 500 dollars. If you have a covered loss of 2,000 dollars, you pay 500 dollars and insurance pays 1,500 dollars. A higher deductible lowers your premium. A lower deductible raises it. Pick a deductible you could afford to pay if you had a claim tomorrow."),
        ],
      },
      {
        h2: "Filing a claim is straightforward",
        blocks: [
          p("Document the loss with photos. Make a list of what was damaged or stolen. File a police report if there was theft. Contact your insurer as soon as you can. Keep receipts. The more documentation you have, the smoother the claim goes."),
          p("Here is a quick checklist if you are shopping for renters insurance. First, do your inventory. Second, decide on personal property and liability limits. Third, choose replacement cost if you can. Fourth, pick a deductible you can afford. Fifth, compare quotes from at least two or three companies. Sixth, check what is excluded. Seventh, ask about discounts."),
        ],
      },
    ],
    faq: [
      {
        q: "What does renters insurance cover?",
        a: "It usually has three main parts. Personal property coverage pays to repair or replace your belongings if they are damaged or destroyed by a covered event. Covered events usually include fire, smoke, theft, vandalism, and certain types of water damage, like a burst pipe. It does not cover every possible cause.",
      },
      {
        q: "What should I know about renters insurance?",
        a: "If a fire forces you out for a few weeks, this coverage can help pay for a hotel, a temporary rental, and extra food costs, up to your limit. Without it, you would be paying rent on a place you cannot live in, plus paying for somewhere else to stay. Some policies also cover medical payments to others.",
      },
      {
        q: "What does “what does renters insurance cover?” mean?",
        a: "It usually has three main parts. Personal property coverage pays to repair or replace your belongings if they are damaged or destroyed by a covered event. Covered events usually include fire, smoke, theft, vandalism, and certain types of water damage, like a burst pipe. It does not cover every possible cause.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "how-does-disability-insurance-work",
    title: "How does disability insurance work?",
    metaTitle: "How does disability insurance work?",
    description: "Your ability to earn a paycheck is your biggest asset. Learn what disability insurance is, why it matters, and how short-term and long-term coverage work.",
    keyword: "disability insurance",
    eyebrow: "Insurance, explained",
    lede: "When people think about insurance, they think about their car, their home, or their health. They rarely think about their paycheck.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "When people think about insurance, they think about their car, their home, or their health. They rarely think about their paycheck. But your ability to work and earn is often your biggest financial asset. If you could not work for months because of an illness or injury, how would you pay rent, buy food, or cover bills? That is the gap disability insurance fills. Disability insurance pays you a portion of your income if you cannot work because of a covered illness or injury. It does not pay your full salary. It is designed to replace part of it, so you can keep paying for essentials while you recover. Without it, a long time away from work can drain savings fast and push people into debt.",
    sections: [
      {
        h2: "Many people assume disability will not happen to them",
        blocks: [
          p("They picture disability as a car accident or a major injury. Those do happen. But many disability claims come from illnesses, not accidents. Back problems, cancer, heart conditions, mental health conditions, and complications from pregnancy can all keep people out of work. It can happen to anyone, at any age. And it does not have to be permanent. Even a few months without income can be a serious financial hit."),
          p("There are two main types. Short-term disability and long-term disability. They work together, but they cover different timeframes."),
        ],
      },
      {
        h2: "Long-term disability, often called LTD, covers longer periods",
        blocks: [
          p("It usually starts after STD ends, or after a longer elimination period, often 90 days. Then it can pay for years, or until retirement age, depending on the policy. LTD is the coverage that protects you from a long absence. If a serious illness kept you out of work for two years, LTD is what would help you keep paying bills through that stretch."),
          p("Disability insurance can come from a few places. Many employers offer it as part of a benefits package. Some pay the full premium. Some share the cost with employees. Some offer it as a voluntary benefit you can buy through payroll. If your employer offers it, look at the details. What is the benefit amount? What is the elimination period? How long does it pay? What counts as disabled under the policy? Those details matter more than the name on the brochure."),
        ],
      },
      {
        h2: "There are also government programs",
        blocks: [
          p("Social Security Disability Insurance, or SSDI, pays benefits to people who have worked and paid into Social Security and who meet a strict definition of disability. It is hard to qualify for, and there is often a long wait. It is not a replacement for private disability insurance. It is a backstop for severe, long-term cases. Workers compensation covers injuries that happen at work. It does not cover illnesses or injuries that happen off the job. So do not count on either one to cover a typical disability."),
        ],
      },
      {
        h2: "Premiums depend on your age, health, occupation, income",
        blocks: [
          p("People in physically risky jobs usually pay more. Smokers usually pay more. Younger, healthier people usually pay less. The longer the benefit period and the shorter the elimination period, the higher the premium."),
          p("How much coverage do you need? Start with your monthly essentials. Rent or mortgage, utilities, food, transportation, insurance premiums, loan payments, and any other must-pay bills. Your disability benefit should cover as much of that as possible. If your employer policy replaces 60 percent of your salary, ask if that is enough to cover your essentials. If not, you may want to supplement it with an individual policy. Also think about your savings. If you have a large emergency fund, you can handle a longer elimination period and a lower premium. If your savings are thin, a shorter elimination period may be worth the extra cost."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about disability insurance?",
        a: "They picture disability as a car accident or a major injury. Those do happen. But many disability claims come from illnesses, not accidents. Back problems, cancer, heart conditions, mental health conditions, and complications from pregnancy can all keep people out of work. It can happen to anyone, at any age.",
      },
      {
        q: "What does “many people assume disability will not happen to them” mean?",
        a: "They picture disability as a car accident or a major injury. Those do happen. But many disability claims come from illnesses, not accidents. Back problems, cancer, heart conditions, mental health conditions, and complications from pregnancy can all keep people out of work. It can happen to anyone, at any age.",
      },
      {
        q: "What does “long-term disability, often called LTD, covers longer periods” mean?",
        a: "It usually starts after STD ends, or after a longer elimination period, often 90 days. Then it can pay for years, or until retirement age, depending on the policy. LTD is the coverage that protects you from a long absence.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "how-do-i-pick-the-right-insurance-deductible",
    title: "How do I pick the right insurance deductible?",
    metaTitle: "How do I pick the right insurance deductible?",
    description: "What is an insurance deductible? Learn how deductibles work across auto, home, and health insurance, and how to choose one that fits your budget.",
    keyword: "insurance deductible explained",
    eyebrow: "Insurance, explained",
    lede: "Every insurance policy has a deductible. It is one of the most important numbers in your coverage, and one of the most misunderstood.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Every insurance policy has a deductible. It is one of the most important numbers in your coverage, and one of the most misunderstood. Pick it too high, and a claim can hurt your budget. Pick it too low, and you pay more in premiums every month. Understanding how deductibles work helps you pick the right balance. A deductible is the amount you pay out of pocket before your insurance starts to pay for a covered loss. It is your share of the cost. Insurance pays the rest, up to your policy limits. Say you have a 1,000 dollar deductible on your auto insurance. You get into a covered accident and repairs cost 4,000 dollars. You pay 1,000 dollars. Insurance pays 3,000 dollars. If repairs cost 800 dollars, which is less than your deductible, insurance pays nothing. You pay the full 800 dollars.",
    sections: [
      {
        h2: "That simple idea works across almost all types of insurance",
        blocks: [
          p("Auto, home, renters, health. The details vary, but the core is the same. You pay first, up to the deductible. Then insurance shares or takes over the cost."),
          p("Deductibles exist for a reason. They keep premiums lower. If insurance paid every small claim from the first dollar, premiums would be much higher. Deductibles also discourage small claims. Filing a claim for every tiny scratch or minor repair would raise costs for everyone. By sharing the first part of a loss, you have a reason to handle small stuff yourself and save insurance for bigger losses."),
        ],
      },
      {
        h2: "Let us look at how deductibles work in different types of insurance",
        blocks: [
          p("In auto insurance, you usually have separate deductibles for collision and comprehensive coverage. Collision covers damage to your car from a crash. Comprehensive covers damage from things like theft, fire, hail, or hitting an animal. You pick a deductible for each. Common choices are 500 dollars or 1,000 dollars. If you have a loan or lease, your lender may require you to keep your deductibles below a certain amount. Check your loan agreement."),
        ],
      },
      {
        h2: "In renters insurance, the deductible works the same way, but",
        blocks: [
          p("A common deductible is 500 dollars. If your laptop is stolen and it costs 1,200 dollars to replace, you pay 500 dollars and insurance pays 700 dollars, up to your limits."),
        ],
      },
      {
        h2: "So how do you pick the right deductible?",
        blocks: [
          p("Start with your savings. The golden rule is simple. Pick a deductible you could actually pay tomorrow if you had a claim. If you have 500 dollars in savings, a 2,500 dollar deductible is risky. If you have a solid emergency fund, a higher deductible can save you money on premiums. Be honest about what you could pay without going into debt."),
          p("Next, think about your risk. Do you drive a lot? Do you live in an area with frequent hail or hurricanes? Do you have a long commute? Do you have kids who play sports? Higher risk can mean a lower deductible makes sense, because you are more likely to file a claim. Lower risk can mean a higher deductible is fine."),
        ],
      },
      {
        h2: "Here is a simple way to choose",
        blocks: [
          p("First, look at your emergency fund. What could you pay today? Second, get quotes at two or three deductible levels. Compare the annual premium savings. Third, divide the extra deductible by the annual savings. That tells you how many claim-free years it takes to break even. If you think you can go that long without a claim, the higher deductible may be worth it. If not, keep the lower one."),
        ],
      },
    ],
    faq: [
      {
        q: "So how do you pick the right deductible?",
        a: "Start with your savings. The golden rule is simple. Pick a deductible you could actually pay tomorrow if you had a claim. If you have 500 dollars in savings, a 2,500 dollar deductible is risky. If you have a solid emergency fund, a higher deductible can save you money on premiums.",
      },
      {
        q: "What should I know about insurance deductible explained?",
        a: "Auto, home, renters, health. The details vary, but the core is the same. You pay first, up to the deductible. Then insurance shares or takes over the cost. Deductibles exist for a reason. They keep premiums lower. If insurance paid every small claim from the first dollar, premiums would be much higher.",
      },
      {
        q: "What should I know about the deductible works the same?",
        a: "A common deductible is 500 dollars. If your laptop is stolen and it costs 1,200 dollars to replace, you pay 500 dollars and insurance pays 700 dollars, up to your limits. In health insurance, the deductible is the amount you pay for covered medical services before insurance starts to pay. It works a little differently than auto or home.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "how-does-a-401k-work",
    title: "How does a 401(k) work?",
    metaTitle: "How does a 401(k) work?",
    description: "Learn how a 401(k) works, why the employer match matters, 2026 contribution limits, and how to choose between Roth and traditional.",
    keyword: "401k basics",
    eyebrow: "Retirement, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Is a 401(k)?",
        blocks: [
          p("A 401(k) is a retirement account you get through work. It lets you set aside part of your paycheck before you spend it. The money goes into investments you choose from your plan's menu. You do not pay tax on the growth while it stays in the account."),
        ],
      },
      {
        h2: "How It Works in Real Life",
        blocks: [
          p("Say you earn 50,000 dollars a year and save 6 percent. That is 3,000 dollars a year, or about 115 dollars per biweekly paycheck. Your employer sends it to your 401(k). You pick investments inside the account, usually stock and bond funds."),
          p("Your account grows two ways. You keep adding money. Your investments may earn returns, and those returns earn returns of their own. That is compound growth. It starts slow and gets more powerful the longer you leave the money alone."),
        ],
      },
      {
        h2: "The Employer Match: Do Not Leave It on the Table",
        blocks: [
          p("Many employers add money when you contribute. A common formula is 50 cents for every dollar you save, up to 6 percent of your pay. Some match dollar for dollar up to a limit. Check your plan documents or ask HR for the exact formula."),
          p("The match is part of your pay. If you skip it, you are turning down money you already earned. If your employer matches up to 6 percent, contribute at least 6 percent. That is step one for almost everyone."),
        ],
      },
      {
        h2: "Traditional vs Roth 401(k)",
        blocks: [
          p("Many plans offer two types. The difference is when you pay tax."),
          p("With a traditional 401(k), you contribute pre-tax dollars. That lowers your taxable income this year. You pay income tax later, when you withdraw in retirement."),
          p("With a Roth 401(k), you contribute after-tax dollars. You pay tax now and get no break this year. In retirement, qualified withdrawals are tax free, including the growth."),
        ],
      },
      {
        h2: "2026 Contribution Limits",
        blocks: [
          p("The IRS sets yearly limits. For 2026, employees can contribute up to 24,500 dollars to a 401(k). The employer match does not count toward that limit. The limit covers all your 401(k) plans combined if you have two jobs."),
        ],
      },
      {
        h2: "What Do You Invest In?",
        blocks: [
          p("A 401(k) is an account, not an investment. Most plans offer a menu of mutual funds, usually stock funds, bond funds, and target date funds."),
          p("A target date fund is the simplest choice. Pick the fund with the year closest to your planned retirement. It starts with more stocks when you are young and shifts toward bonds as you age."),
        ],
      },
      {
        h2: "When You Leave Your Job",
        blocks: [
          p("When you leave a job, you can leave the money in the old plan, roll it into the new employer's plan, or roll it into an IRA. Cashing out is usually the worst choice: you pay income tax plus generally a 10 percent penalty if under 59 and a half, and you lose years of growth. A direct rollover moves the money straight between accounts with no tax due on the move."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Not getting the full match is the biggest one. Fix that first."),
          p("Setting your rate once and never reviewing it is next. Check it yearly."),
          p("Taking loans or early withdrawals for nonemergencies costs you growth. If you leave your job with a loan outstanding, you may have to repay it fast or face taxes and penalties."),
        ],
      },
      {
        h2: "How to Get Started",
        blocks: [
          p("If you have not enrolled, do it today. Log in to your plan site or talk to HR. Set your rate to at least the full match. Pick a target date fund or a simple mix of low cost funds. Set a reminder to raise your rate by one percent each year or with each raise."),
          p("Already enrolled? Check three things. Are you getting the full match? Is your rate still right? Does your investment mix still make sense?"),
        ],
      },
    ],
    faq: [
      {
        q: "What is a 401(k)?",
        a: "A 401(k) is a retirement account you get through work. It lets you set aside part of your paycheck before you spend it. The money goes into investments you choose from your plan's menu. You do not pay tax on the growth while it stays in the account. Saving is automatic. You pick a percentage of your pay.",
      },
      {
        q: "What is the employer match: do not leave it on the table?",
        a: "Many employers add money when you contribute. A common formula is 50 cents for every dollar you save, up to 6 percent of your pay. Some match dollar for dollar up to a limit. Check your plan documents or ask HR for the exact formula. The match is part of your pay. If you skip it, you are turning down money you already earned.",
      },
      {
        q: "What do you invest in?",
        a: "A 401(k) is an account, not an investment. Most plans offer a menu of mutual funds, usually stock funds, bond funds, and target date funds. A target date fund is the simplest choice. Pick the fund with the year closest to your planned retirement. It starts with more stocks when you are young and shifts toward bonds as you age.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
      { label: "How should I save for retirement in my 20s?", href: "/answers/how-should-i-save-for-retirement-in-my-20s" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "ira-or-roth-ira-which-one-fits-me",
    title: "IRA or Roth IRA: which one fits me?",
    metaTitle: "IRA or Roth IRA: which one fits me?",
    description: "Learn the difference between a traditional IRA and a Roth IRA, how taxes work for each, 2026 limits, and who each account fits best.",
    keyword: "ira vs roth ira",
    eyebrow: "Retirement, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Is an IRA?",
        blocks: [
          p("An IRA is an Individual Retirement Arrangement. It is a retirement account you open on your own, not through an employer. You open one at a bank or brokerage, decide how much to contribute each year within IRS limits, and choose how to invest."),
        ],
      },
      {
        h2: "Traditional IRA: Tax Break Now, Pay Later",
        blocks: [
          p("With a traditional IRA, you may deduct contributions on your tax return. That depends on your income and whether you or your spouse has a workplace plan. If you qualify, the contribution lowers your taxable income this year."),
        ],
      },
      {
        h2: "Roth IRA: Pay Tax Now, Withdraw Tax Free Later",
        blocks: [
          p("With a Roth IRA, you contribute after-tax dollars. There is no deduction. You already paid tax on the money."),
        ],
      },
      {
        h2: "The Difference in One Sentence",
        blocks: [
          p("Traditional: tax break now, pay tax later. Roth: pay tax now, tax free later."),
        ],
      },
      {
        h2: "2026 Contribution Limits",
        blocks: [
          p("For 2026, the IRA limit is 7,500 dollars if you are under 50. That is your total across all IRAs combined. Split it between traditional and Roth if you want, but the total cannot exceed 7,500 dollars."),
        ],
      },
      {
        h2: "Who Can Use Each Type?",
        blocks: [
          p("If your income is too high for a direct Roth, some people use a backdoor Roth: contribute to a traditional IRA, then convert. That can create a tax bill if you hold pre-tax IRA balances, so talk to a tax professional first."),
        ],
      },
      {
        h2: "Withdrawal Rules",
        blocks: [
          p("With a traditional IRA, withdrawals are generally taxable, and before 59 and a half you generally pay tax plus a 10 percent penalty unless an exception applies. With a Roth IRA, you can withdraw contributions anytime tax and penalty free, but withdrawing earnings before 59 and a half and before the five year rule is met can trigger tax and penalty on the earnings. That flexibility helps in a true emergency, not as a savings account habit."),
        ],
      },
      {
        h2: "A Simple Example",
        blocks: [
          p("Maya and Jordan are both 30. Maya picks traditional and may get a deduction; in the 22 percent bracket, contributing 7,500 dollars saves about 1,650 dollars in tax this year, but she pays tax on withdrawals later. Jordan picks Roth, gets no deduction, and pays tax now for tax free withdrawals later. Who wins depends on their tax rates now versus in retirement. Neither choice is wrong. Make it on purpose, not by accident."),
        ],
      },
      {
        h2: "Which Fits You?",
        blocks: [
          p("Early career with lower income now? Roth often fits: pay a lower rate today, get decades of tax free growth. High bracket now with lower income expected later? Traditional often fits, if you can deduct it. Want tax free income in retirement? Roth fits. Want to lower this year's taxable income? Traditional fits, if you qualify. Not sure? Use both over time."),
        ],
      },
      {
        h2: "Opening and Funding an IRA",
        blocks: [
          p("Choose a low cost brokerage and apply online with your Social Security number, date of birth, address, and bank info. Link your bank account and set automatic monthly transfers; for 2026, 625 dollars a month reaches 7,500 dollars. Then invest the money, since an IRA is an account, not an investment. Many people use low cost index funds plus a bond fund."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Do not contribute to a Roth without checking the income limits. Do not exceed the combined 7,500 dollar limit across all IRAs. Do not take money out early and trigger taxes and penalties. Do not leave the money sitting in cash inside the IRA. The account does not grow on its own. The investments do."),
        ],
      },
    ],
    faq: [
      {
        q: "What is an IRA?",
        a: "An IRA is an Individual Retirement Arrangement. It is a retirement account you open on your own, not through an employer. You open one at a bank or brokerage, decide how much to contribute each year within IRS limits, and choose how to invest. An IRA gives you tax benefits for retirement saving. The exact benefit depends on the type.",
      },
      {
        q: "What is the difference in one sentence?",
        a: "Traditional: tax break now, pay tax later. Roth: pay tax now, tax free later. If your tax rate is lower now than in retirement, Roth often wins. If your rate is higher now than in retirement, traditional often wins if you can deduct the contribution. You cannot know future rates for sure, so many people use both over their lifetime.",
      },
      {
        q: "Who can use each type?",
        a: "Anyone with earned income can contribute to a traditional IRA. There is no age limit and no income limit to contribute, though income limits affect deductibility if you have a workplace plan. Roth IRAs have income limits for direct contributions.",
      },
      {
        q: "Which fits you?",
        a: "Early career with lower income now? Roth often fits: pay a lower rate today, get decades of tax free growth. High bracket now with lower income expected later? Traditional often fits, if you can deduct it. Want tax free income in retirement? Roth fits. Want to lower this year's taxable income? Traditional fits, if you qualify. Not sure?",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
      { label: "How should I save for retirement in my 20s?", href: "/answers/how-should-i-save-for-retirement-in-my-20s" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "when-should-i-claim-social-security",
    title: "When should I claim Social Security?",
    metaTitle: "When should I claim Social Security?",
    description: "Learn how Social Security benefits are calculated, when to claim, what full retirement age means, and how spousal benefits work.",
    keyword: "social security basics",
    eyebrow: "Retirement, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Is Social Security?",
        blocks: [
          p("Social Security is a federal program that pays monthly benefits to retired and disabled workers and to survivors of deceased workers. Most workers pay in through payroll taxes. Your employer withholds your share and pays a matching share. If you are self-employed, you pay both."),
        ],
      },
      {
        h2: "How Benefits Are Calculated",
        blocks: [
          p("Social Security adjusts your past earnings for inflation, then picks your 35 highest earning years. Fewer than 35 years of work means some zeros in the average, which lowers it."),
        ],
      },
      {
        h2: "What Is Full Retirement Age?",
        blocks: [
          p("Full retirement age, or FRA, is when you receive your full, unreduced benefit. It depends on birth year. For anyone born in 1960 or later, FRA is 67. For earlier birth years it ranges from 66 to 67. Born on January 1 of any year? Use the prior year."),
          p("Claim before FRA and your benefit is permanently reduced. Claim after FRA and it grows until age 70. The change is permanent."),
        ],
      },
      {
        h2: "When Can You Claim?",
        blocks: [
          p("You can claim from age 62 to age 70. After 70, waiting adds nothing."),
          p("Assuming FRA of 67, here is roughly what you get: at 62, about 70 percent of your full benefit. At 63, about 75 percent. At 64, about 80 percent. At 65, about 86.7 percent. At 66, about 93.3 percent. At 67, 100 percent. At 68, about 108 percent. At 69, about 116 percent. At 70, about 124 percent."),
        ],
      },
      {
        h2: "When Should You Claim?",
        blocks: [
          p("There is no one right age. It depends on health, other income, need for money now, and family."),
          p("Claiming early fits if you need income now, are in poor health, or have nothing else to cover bills. A smaller check now beats no check at all."),
        ],
      },
      {
        h2: "Spousal Benefits",
        blocks: [
          p("If you are married, your spouse may qualify for benefits on your record. At their FRA, a spousal benefit can be up to 50 percent of your PIA."),
        ],
      },
      {
        h2: "Divorced Spouses",
        blocks: [
          p("Divorce does not always end spousal benefits. You may qualify on an ex-spouse's record if you were married at least 10 years, are at least 62, are currently unmarried, and your own benefit is less than the spousal amount. If you have been divorced at least two years, you can claim even if your ex has not filed yet, as long as your ex is at least 62. Your claim does not affect your ex's benefit."),
        ],
      },
      {
        h2: "Survivor Benefits",
        blocks: [
          p("When a worker dies, a surviving spouse may claim as early as age 60, or 50 if disabled. At their FRA, the survivor can receive 100 percent of the deceased worker's benefit. Survivor benefits reflect delayed credits, so waiting helped the couple, not just the worker."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Do not claim at 62 by default without running the numbers. For some it is right. For others it leaves lifetime income behind."),
          p("Do not ignore spousal benefits. A spouse with lower earnings may get more on your record. Check both amounts before filing."),
          p("Do not skip checking your earnings record. An error can lower your benefit for life."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Social Security is a foundation, not a full plan. Know your FRA. Know your benefit at 62, at FRA, and at 70. Check your earnings record. Consider spousal and survivor benefits if married. Weigh health, work, and other income before you choose. Run your numbers at ssa.gov. A few hours of homework now can change your monthly income for the rest of your life."),
        ],
      },
    ],
    faq: [
      {
        q: "What is Social Security?",
        a: "Social Security is a federal program that pays monthly benefits to retired and disabled workers and to survivors of deceased workers. Most workers pay in through payroll taxes. Your employer withholds your share and pays a matching share. If you are self-employed, you pay both.",
      },
      {
        q: "How are benefits calculated?",
        a: "Social Security adjusts your past earnings for inflation, then picks your 35 highest earning years. Fewer than 35 years of work means some zeros in the average, which lowers it. It averages those 35 years into a monthly figure called Average Indexed Monthly Earnings, or AIME.",
      },
      {
        q: "What is full retirement age?",
        a: "Full retirement age, or FRA, is when you receive your full, unreduced benefit. It depends on birth year. For anyone born in 1960 or later, FRA is 67. For earlier birth years it ranges from 66 to 67. Born on January 1 of any year? Use the prior year. Claim before FRA and your benefit is permanently reduced.",
      },
      {
        q: "When can you claim?",
        a: "You can claim from age 62 to age 70. After 70, waiting adds nothing. Assuming FRA of 67, here is roughly what you get: at 62, about 70 percent of your full benefit. At 63, about 75 percent. At 64, about 80 percent. At 65, about 86.7 percent. At 66, about 93.3 percent. At 67, 100 percent. At 68, about 108 percent. At 69, about 116 percent.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "How should I save for retirement in my 20s?", href: "/answers/how-should-i-save-for-retirement-in-my-20s" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "how-should-i-save-for-retirement-in-my-20s",
    title: "How should I save for retirement in my 20s?",
    metaTitle: "How should I save for retirement in my 20s?",
    description: "Learn why saving for retirement in your 20s matters, how much to save, where to start, and how small consistent contributions grow over time.",
    keyword: "retirement savings in your 20s",
    eyebrow: "Retirement, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Retirement Feels Far Away. That Is the Point.",
        blocks: [
          p("In your 20s, retirement is 40 years off. You are paying rent, handling student loans, and building a career. Saving for retirement does not feel urgent."),
          p("That distance is the advantage. A dollar saved at 25 has 40 years to grow. A dollar saved at 45 has 20. The early dollar does more work, even if you never add to it."),
        ],
      },
      {
        h2: "Why Time Beats Amount",
        blocks: [
          p("Compound growth is the reason. Returns earn returns. Early growth looks slow. Later growth accelerates because the balance is larger."),
        ],
      },
      {
        h2: "How Much Should You Save?",
        blocks: [
          p("A common guideline is 15 percent of pre-tax income, including the employer match. That is a target, not a starting line. If 15 percent feels impossible, start smaller."),
          p("Start with the match. If your employer matches up to 6 percent, contribute at least 6 percent. That is an instant return you cannot get elsewhere."),
        ],
      },
      {
        h2: "Where to Start: A Sensible Order",
        blocks: [
          p("First, contribute to your 401(k) up to the full match. Highest immediate return."),
          p("Second, build an emergency fund of three to six months of essential expenses in a savings account. This keeps you from raiding retirement when the car breaks down. Early withdrawals can trigger taxes and penalties."),
        ],
      },
      {
        h2: "What Should You Invest In?",
        blocks: [
          p("An account is not an investment. You choose investments inside it. Keep it simple."),
          p("A broad stock index fund plus a broad international stock fund plus a small bond portion covers most needs. Or use a target date fund matched to your retirement year. It starts stock heavy and shifts toward bonds as you age. It is a fine default if you do not want to pick funds."),
        ],
      },
      {
        h2: "Automate Everything",
        blocks: [
          p("Willpower is unreliable. Automation is not. Pull 401(k) money from every paycheck. Transfer IRA money on payday. Treat saving like a bill, not a monthly decision."),
          p("Decide in advance to save half of every bonus and enjoy half. Check accounts once or twice a year, not daily, since daily checking leads to emotional moves."),
        ],
      },
      {
        h2: "Do Not Forget Other Goals",
        blocks: [
          p("Retirement is not your only goal. A house, a car, travel, and starting a business matter too. Give each goal its own bucket. Retirement gets automatic contributions. A house fund gets its own savings account. An emergency fund sits in high yield savings. Separate buckets keep you from raiding retirement for short term wants."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Waiting for higher income is the biggest. Life gets more expensive. The perfect time never comes. Start now, even small."),
          p("Skipping the match is leaving pay on the table."),
          p("Cashing out a 401(k) when changing jobs feels like found money. You pay taxes and possibly penalties, and you lose years of growth. Roll it to the new plan or an IRA instead."),
        ],
      },
      {
        h2: "A Simple Plan for This Month",
        blocks: [
          p("Get the full employer match, or raise your rate one percent if you already do. Open an IRA if you lack one and automate a monthly transfer, even 50 dollars. Build an emergency fund toward 500 dollars, then one month of expenses. Set a six month reminder to review and raise your rate again."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Your 20s are about habit and time, not huge amounts. Get the match. Automate. Keep fees low. Keep it simple. Raise your rate as income grows. You will not feel rich now. Future you will be glad you started."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the point?",
        a: "In your 20s, retirement is 40 years off. You are paying rent, handling student loans, and building a career. Saving for retirement does not feel urgent. That distance is the advantage. A dollar saved at 25 has 40 years to grow. A dollar saved at 45 has 20. The early dollar does more work, even if you never add to it.",
      },
      {
        q: "Why time beats amount?",
        a: "Compound growth is the reason. Returns earn returns. Early growth looks slow. Later growth accelerates because the balance is larger. An illustration, not a prediction: Alex starts at 25 saving 200 dollars a month. Jordan starts at 35 saving 400 dollars a month, twice as much. Both save until 65 and earn the same hypothetical return.",
      },
      {
        q: "How much should you save?",
        a: "A common guideline is 15 percent of pre-tax income, including the employer match. That is a target, not a starting line. If 15 percent feels impossible, start smaller. Start with the match. If your employer matches up to 6 percent, contribute at least 6 percent. That is an instant return you cannot get elsewhere. Then raise it slowly.",
      },
      {
        q: "Where to start: A sensible order?",
        a: "First, contribute to your 401(k) up to the full match. Highest immediate return. Second, build an emergency fund of three to six months of essential expenses in a savings account. This keeps you from raiding retirement when the car breaks down. Early withdrawals can trigger taxes and penalties. Third, open an IRA if you can.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-are-the-basics-of-accounting",
    title: "What are the basics of accounting?",
    metaTitle: "What are the basics of accounting?",
    description: "Learn accounting basics for students: debits and credits, the accounting equation, financial statements, and what accountants do in real jobs.",
    keyword: "accounting basics for students",
    eyebrow: "Accounting, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Is Accounting?",
        blocks: [
          p("Accounting is the language of business. It tracks money in, money out, what a business owns, and what it owes. It turns daily transactions into reports that guide decisions."),
          p("Every organization needs it. A coffee shop needs to know if it is profitable. A public company reports to investors. A nonprofit shows donors how money was used. A city shows taxpayers where funds went."),
        ],
      },
      {
        h2: "The Accounting Equation",
        blocks: [
          p("Everything starts with one equation:"),
          p("Assets = Liabilities + Equity"),
          p("Assets are what the business owns: cash, inventory, equipment, buildings, and accounts receivable, money customers owe you."),
          p("Liabilities are what the business owes: loans, accounts payable, money owed to suppliers, and unpaid wages."),
          p("Equity is the owner's stake: invested money plus profits kept over time, called retained earnings."),
        ],
      },
      {
        h2: "Debits and Credits",
        blocks: [
          p("In accounting, debit means left side and credit means right side. That is all the words mean."),
          p("Every transaction has at least one debit and one credit. Total debits must equal total credits. That keeps the equation balanced."),
          p("How they affect each account type:"),
        ],
      },
      {
        h2: "The Accounting Cycle",
        blocks: [
          p("Each period, accountants follow a cycle: identify transactions, record journal entries, post to the general ledger, prepare a trial balance, make adjusting entries, prepare an adjusted trial balance, prepare financial statements, then close temporary accounts."),
          p("Adjusting entries deserve attention. They apply accrual accounting: record revenue when earned, not just when cash arrives, and expenses when incurred, not just when paid. That gives a truer picture than cash basis accounting."),
        ],
      },
      {
        h2: "The Four Financial Statements",
        blocks: [
          p("Shows revenue and expenses over a period, a month, quarter, or year. Revenue minus expenses equals net income or net loss. It answers: did we make money? It covers a period, like a video of performance."),
        ],
      },
      {
        h2: "How They Connect",
        blocks: [
          p("Net income from the income statement flows into the statement of equity. Ending equity flows into the balance sheet. The cash change on the balance sheet matches the cash flow statement. If you can trace those links, you understand financial statements."),
        ],
      },
      {
        h2: "What Do Accountants Actually Do?",
        blocks: [
          p("Public accountants work for firms. They audit statements, prepare tax returns, and advise clients. Many start in audit or tax, then move to industry or climb to manager and partner."),
          p("Corporate accountants work inside a company on month end close, reporting, budgeting, and controls. They help leaders understand costs, profits, and cash flow."),
          p("Tax accountants handle compliance, planning, and returns. Tax law changes often, so learning never stops."),
          p("Government accountants track public funds and audit programs."),
        ],
      },
      {
        h2: "Skills That Matter",
        blocks: [
          p("Technical knowledge is the base: debits and credits, GAAP, reporting. These set you apart."),
          p("Communication comes first among soft skills. You will write memos and explain issues to non-accountants. Plain English explanations stand out."),
          p("Excel is second. Learn pivot tables, lookups, and basic modeling. It saves hours."),
          p("Attention to detail is third. A wrong account or decimal changes the report. Reconcile and double check."),
          p("Ethics is fourth. You handle sensitive financial information. The profession runs on trust."),
        ],
      },
      {
        h2: "How to Study Effectively",
        blocks: [
          p("Accounting builds on itself. Miss the foundation and later chapters get harder."),
          p("Do problems by hand before using software. Writing entries forces you to think through debits and credits."),
          p("Run every transaction through the equation. What rose, what fell, does it balance?"),
          p("Learn the why. Do not just memorize depreciation entries. Understand that depreciation spreads a long term asset's cost over its useful life."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Accounting feels mechanical at first. The purpose is human: helping people see if a business is healthy, where money goes, and what to do next. Master the equation. Get comfortable with debits and credits. Learn to read the four statements and trace their links. Build Excel and communication skills too. That foundation works in any accounting path you choose."),
        ],
      },
    ],
    faq: [
      {
        q: "What is accounting?",
        a: "Accounting is the language of business. It tracks money in, money out, what a business owns, and what it owes. It turns daily transactions into reports that guide decisions. Every organization needs it. A coffee shop needs to know if it is profitable. A public company reports to investors. A nonprofit shows donors how money was used.",
      },
      {
        q: "What is the accounting equation?",
        a: "Everything starts with one equation: Assets = Liabilities + Equity Assets are what the business owns: cash, inventory, equipment, buildings, and accounts receivable, money customers owe you. Liabilities are what the business owes: loans, accounts payable, money owed to suppliers, and unpaid wages.",
      },
      {
        q: "What is the accounting cycle?",
        a: "Each period, accountants follow a cycle: identify transactions, record journal entries, post to the general ledger, prepare a trial balance, make adjusting entries, prepare an adjusted trial balance, prepare financial statements, then close temporary accounts. Adjusting entries deserve attention.",
      },
      {
        q: "What are the four financial statements?",
        a: "Shows revenue and expenses over a period, a month, quarter, or year. Revenue minus expenses equals net income or net loss. It answers: did we make money? It covers a period, like a video of performance. Shows what the business owns and owes at one point in time, built on Assets = Liabilities + Equity.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How does small business accounting work?", href: "/answers/how-does-small-business-accounting-work" },
      { label: "How should I save for retirement in my 20s?", href: "/answers/how-should-i-save-for-retirement-in-my-20s" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-does-small-business-accounting-work",
    title: "How does small business accounting work?",
    metaTitle: "How does small business accounting work?",
    description: "Learn small business accounting basics: simple bookkeeping, why to separate personal and business money, and how to prepare for tax time without stress.",
    keyword: "small business accounting",
    eyebrow: "Accounting, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Why Accounting Matters",
        blocks: [
          p("When you run a small business, sales get the attention and numbers get delayed. That is a mistake."),
          p("Accounting tells you if you are actually making money. High sales with higher costs is a loss. Accounting shows the full picture. It also keeps you out of trouble: right tax payments, proof of income for loans, early warning on unpaid invoices or creeping costs."),
        ],
      },
      {
        h2: "Separate Business and Personal Money",
        blocks: [
          p("This is the most important rule. Keep them apart."),
          p("Open a separate business bank account. Run all business income and expenses through it. Do not buy groceries from it. Do not deposit client checks into your personal account."),
          p("Get a separate business card and use it only for business. At tax time you will not have to dig personal transactions out of the pile."),
        ],
      },
      {
        h2: "Bookkeeping Basics",
        blocks: [
          p("Bookkeeping is the daily record of money in and out. Record every sale and every expense. Keep the receipt or invoice. Reconcile to bank statements monthly."),
          p("A simple system: for income, log date, customer, amount, and what it was for. For expenses, log date, vendor, amount, and category, such as rent, supplies, software, advertising, travel, or contractors. Keep receipts; a clear photo is usually fine."),
        ],
      },
      {
        h2: "Pick a System You Will Use",
        blocks: [
          p("A spreadsheet is free and works for very small transaction counts, but manual work makes it easy to fall behind. Accounting software like QuickBooks, Xero, Wave, or FreshBooks connects to your bank, categorizes transactions, sends invoices, and builds reports. It costs money but saves time and cuts errors. A bookkeeper handles it all while you run the business, and often pays for itself once volume grows. Whichever you pick, block 30 minutes weekly for the books. Weekly beats a yearly marathon."),
        ],
      },
      {
        h2: "The Three Reports You Need",
        blocks: [
          p("The profit and loss statement shows revenue minus expenses for a period. It tells you if you profited. Review monthly. Are sales growing? Are expenses growing faster? What is your biggest cost?"),
          p("The balance sheet shows what the business owns and owes at a point in time: cash, receivables, equipment, loans, payables, and equity. It is your financial position snapshot."),
        ],
      },
      {
        h2: "Pay Yourself on Purpose",
        blocks: [
          p("Do not just grab money whenever. Set a system."),
          p("Sole proprietors and single member LLCs usually take an owner's draw on a schedule, recorded as a draw, not a business expense. S corporations generally require a reasonable salary through payroll, with stricter rules, so talk to a tax professional first. Regular, intentional transfers keep your budget stable and your books clean."),
        ],
      },
      {
        h2: "Keep Records All Year",
        blocks: [
          p("Tax season is easy with year round records and painful without them."),
        ],
      },
      {
        h2: "Tax Prep Basics",
        blocks: [
          p("Your business structure decides how you are taxed. Sole proprietorship, LLC, partnership, S corp, and C corp all differ. If you are choosing or changing a structure, talk to a CPA or tax attorney first."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Mixing money is number one. Fix it first."),
          p("Not setting aside tax money is number two. Part of every payment belongs to the IRS. Move it to a separate savings account immediately."),
          p("Not invoicing promptly is number three. Send invoices the day work is done. Follow up on late ones. Consider deposits for big projects."),
          p("Ignoring cash flow is number four. Profitable on paper means nothing if rent is due before clients pay. Check cash weekly."),
        ],
      },
      {
        h2: "Monthly Checklist",
        blocks: [
          p("Reconcile bank and card accounts. Categorize income and expenses. Send all invoices. Follow up on anything over 30 days late. Review profit and loss. Check cash and upcoming bills. Set aside estimated taxes. Back up records."),
          p("Do that monthly and tax time becomes a review."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Separate your money. Track every dollar. Reconcile monthly. Read your three reports. Set aside tax money. Keep records all year. Start simple, stay consistent, and get help when you need it. Good accounting gives you the clarity to keep doing the work you care about."),
        ],
      },
    ],
    faq: [
      {
        q: "Why do accounting matter?",
        a: "When you run a small business, sales get the attention and numbers get delayed. That is a mistake. Accounting tells you if you are actually making money. High sales with higher costs is a loss. Accounting shows the full picture.",
      },
      {
        q: "What is the three reports you need?",
        a: "The profit and loss statement shows revenue minus expenses for a period. It tells you if you profited. Review monthly. Are sales growing? Are expenses growing faster? What is your biggest cost? The balance sheet shows what the business owns and owes at a point in time: cash, receivables, equipment, loans, payables, and equity.",
      },
      {
        q: "What should I know about small business accounting?",
        a: "This is the most important rule. Keep them apart. Open a separate business bank account. Run all business income and expenses through it. Do not buy groceries from it. Do not deposit client checks into your personal account. Get a separate business card and use it only for business.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "What are the basics of accounting?", href: "/answers/what-are-the-basics-of-accounting" },
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "How should I save for retirement in my 20s?", href: "/answers/how-should-i-save-for-retirement-in-my-20s" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-i-start-investing",
    title: "How do I start investing?",
    metaTitle: "How do I start investing?",
    description: "Learn investing basics: what stocks and bonds are, how index funds work, and how to start investing with small amounts of money.",
    keyword: "investing basics",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Does It Mean to Invest?",
        blocks: [
          p("Investing puts your money to work so it can grow. Saving keeps money safe, usually in a bank account. Investing buys assets you expect to grow or produce income, like stocks, bonds, or funds."),
          p("Saving covers emergencies and short term goals. Investing covers long term goals like retirement."),
        ],
      },
      {
        h2: "Stocks: Owning a Piece of a Company",
        blocks: [
          p("A stock is a share of ownership in a company. If the company grows and profits rise, the price may rise. If it struggles, the price may fall."),
          p("You can make money two ways: price growth, buying low and selling higher, and dividends, cash some companies pay shareholders from profits. Not all companies pay dividends. Many growing firms reinvest instead."),
        ],
      },
      {
        h2: "Bonds: Lending Money for Interest",
        blocks: [
          p("A bond is a loan to a government or company. They pay you interest and return your principal on a set date called maturity."),
          p("Example: a 1,000 dollar bond paying 4 percent for 10 years sends you 40 dollars a year, then returns the 1,000 dollars at the end, assuming no default."),
        ],
      },
      {
        h2: "Index Funds: Own a Lot at Once",
        blocks: [
          p("An index fund holds many stocks or bonds to track a market index. An index is a group representing a market. The S and P 500 holds about 500 large U.S. companies. A total market index holds thousands."),
          p("One share buys a small piece of every company in the index. Instant diversification. One bad company barely dents you."),
        ],
      },
      {
        h2: "Risk and Return",
        blocks: [
          p("Higher potential return means higher risk. That trade never goes away."),
          p("Stocks bring higher growth potential and higher volatility. Bonds bring lower growth and lower volatility. Cash brings the lowest growth, and inflation can erode it over time."),
        ],
      },
      {
        h2: "How Much Do You Need to Start?",
        blocks: [
          p("Less than you think. Many brokerages have no minimum and offer fractional shares, so 50 dollars can buy into a fund whose full share costs more."),
          p("You need a plan and a habit, not thousands. Start with 50 or 100 dollars a month."),
        ],
      },
      {
        h2: "Which Account to Use",
        blocks: [
          p("The account affects your taxes. For retirement, tax advantaged accounts come first."),
        ],
      },
      {
        h2: "A Simple Starter Portfolio",
        blocks: [
          p("Option one: a target date fund picked for your retirement year. It sets the mix and adjusts over time. Option two: three funds, U.S. stocks, international stocks, and bonds, with percentages you set and rebalance yearly. Option three: a single total world stock fund for maximum simplicity, adding bonds later. Whatever you pick, keep fees low."),
        ],
      },
      {
        h2: "Buying Your First Investment",
        blocks: [
          p("Choose a brokerage with no minimum and low cost options. Open the account online with your Social Security number, date of birth, address, and bank info. Link your bank, transfer money, and buy the fund. Then automate monthly transfers and purchases. Automation turns investing from a decision into a habit."),
        ],
      },
      {
        h2: "Dollar Cost Averaging",
        blocks: [
          p("Investing a fixed amount regularly buys more shares when prices are low and fewer when high. That is dollar cost averaging, and it happens automatically with steady contributions."),
          p("You do not need to time the market. Automatic investing removes the emotion of buying high and selling low. Drops are normal, and for a decades-long investor they mean regular contributions buy more shares, as long as you keep investing instead of panic selling."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Waiting for the perfect time is first. There is none. Start today."),
          p("Picking stocks and timing the market is second. Most pros fail to beat a simple index fund over long periods. Beginners rarely do better."),
          p("Checking daily is third. Daily moves are noise that triggers emotional changes. Check a few times a year."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Investing is simple, not easy. Learn stocks, bonds, and index funds. Build a diversified, low cost portfolio. Invest regularly in good markets and bad. Keep fees low. Give it time."),
          p("Start small if needed. A hundred dollars a month invested consistently beats a thousand invested once and forgotten. Raise contributions as income grows. Let time and compounding do the heavy work. This is about building wealth slowly, month by month, year by year."),
        ],
      },
    ],
    faq: [
      {
        q: "What does it mean to invest?",
        a: "Investing puts your money to work so it can grow. Saving keeps money safe, usually in a bank account. Investing buys assets you expect to grow or produce income, like stocks, bonds, or funds. Saving covers emergencies and short term goals. Investing covers long term goals like retirement. Investing involves risk. Values go up and down.",
      },
      {
        q: "How much do you need to start?",
        a: "Less than you think. Many brokerages have no minimum and offer fractional shares, so 50 dollars can buy into a fund whose full share costs more. You need a plan and a habit, not thousands. Start with 50 or 100 dollars a month.",
      },
      {
        q: "Which account to use?",
        a: "The account affects your taxes. For retirement, tax advantaged accounts come first. A 401(k) is a workplace account, and many employers match contributions, which is part of your pay. Get the full match before investing elsewhere. An IRA is an account you open yourself; for 2026 you can contribute up to 7,500 dollars if under 50.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
      { label: "What is a target date fund?", href: "/answers/what-is-a-target-date-fund" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "what-is-an-index-fund",
    title: "What is an index fund?",
    metaTitle: "What is an index fund?",
    description: "Learn what index funds are, why they work for long term investors, how they compare to actively managed funds, and how to pick the right one.",
    keyword: "index funds explained",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Is an Index Fund?",
        blocks: [
          p("An index fund holds a basket of stocks or bonds designed to track a market index. An index is a group representing a market or part of it. The S and P 500 covers about 500 large U.S. companies. A total stock market index covers thousands of U.S. companies of all sizes."),
        ],
      },
      {
        h2: "How They Work",
        blocks: [
          p("An index fund follows a simple rule: hold the index's investments in roughly the same proportions. It does not pick winners or dodge losers. It tracks."),
          p("When a company grows into a bigger index weight, the fund holds more of it. When one shrinks or leaves, the fund adjusts. New additions get bought. All automatic, per index rules."),
        ],
      },
      {
        h2: "Why They Work",
        blocks: [
          p("Three reasons: diversification, low costs, and discipline."),
          p("Diversification means owning many investments at once. A total market fund can hold thousands of companies. One failure barely registers. You bet on the overall market, not one firm."),
        ],
      },
      {
        h2: "Index vs Actively Managed Funds",
        blocks: [
          p("Active funds pay managers to pick stocks and time trades. They charge higher fees for research and trading. More trading can also mean more taxable gains."),
          p("The question is whether the manager earns enough extra to cover the higher fees. Short term, some do. Long term, most do not. That is why many planners recommend index funds as the portfolio core."),
        ],
      },
      {
        h2: "Indexes Worth Knowing",
        blocks: [
          p("The S and P 500 tracks about 500 large U.S. companies, roughly 80 percent of the U.S. market by value. A total U.S. stock market index tracks nearly all U.S. stocks and is broader. A total international index adds companies outside the U.S. A total bond market index tracks U.S. investment grade bonds for stability and income. A target date index fund bundles stock and bond index funds and glides from stocks toward bonds as the date nears."),
        ],
      },
      {
        h2: "How to Pick One",
        blocks: [
          p("First, decide coverage. Most beginners start with a total U.S. stock market index fund as the core, add an international stock index fund for global balance, and add a bond index fund for stability, with more bonds as they age."),
        ],
      },
      {
        h2: "How Much to Hold",
        blocks: [
          p("That depends on goals, horizon, and risk comfort. Index funds are a tool, not a plan."),
        ],
      },
      {
        h2: "How to Buy",
        blocks: [
          p("Open a brokerage account or use your workplace 401(k). For retirement, use the 401(k) or IRA first for tax benefits. Choose the fund, search by name or ticker, enter the dollar amount, confirm. Then set automatic monthly investments. That step matters most. It builds wealth and removes emotion."),
        ],
      },
      {
        h2: "What They Cannot Do",
        blocks: [
          p("They do not protect you from drops. When the market falls, the fund falls with it. Diversification spreads risk, not erase it."),
          p("They do not beat the market. By design they match it minus a small fee."),
          p("They do not know your life. The fund does not know your retirement date or risk tolerance. You still need a savings plan and a mix that fits."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("Chasing performance is first. Buying last year's winner then selling when it lags is the opposite of discipline. Pick a broad fund and hold."),
          p("Owning overlapping funds is second. Three S and P 500 funds is the same stocks three times, not more diversification. Keep it simple."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("An index fund gives you diversification, low costs, and discipline in one purchase. It does not try to beat the market. It tries to be the market, cheaply."),
        ],
      },
    ],
    faq: [
      {
        q: "What is an index fund?",
        a: "An index fund holds a basket of stocks or bonds designed to track a market index. An index is a group representing a market or part of it. The S and P 500 covers about 500 large U.S. companies. A total stock market index covers thousands of U.S. companies of all sizes. One share buys a small piece of every investment in the index.",
      },
      {
        q: "How do they work?",
        a: "An index fund follows a simple rule: hold the index's investments in roughly the same proportions. It does not pick winners or dodge losers. It tracks. When a company grows into a bigger index weight, the fund holds more of it. When one shrinks or leaves, the fund adjusts. New additions get bought. All automatic, per index rules.",
      },
      {
        q: "Why do they work?",
        a: "Three reasons: diversification, low costs, and discipline. Diversification means owning many investments at once. A total market fund can hold thousands of companies. One failure barely registers. You bet on the overall market, not one firm. Low costs mean you keep more return. No analyst teams, little trading, fewer taxable events.",
      },
      {
        q: "How do I pick one?",
        a: "First, decide coverage. Most beginners start with a total U.S. stock market index fund as the core, add an international stock index fund for global balance, and add a bond index fund for stability, with more bonds as they age. Second, check the expense ratio, the yearly fee as a percentage. Lower is better.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
      { label: "What is a target date fund?", href: "/answers/what-is-a-target-date-fund" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "how-does-compound-interest-work",
    title: "How does compound interest work?",
    metaTitle: "How does compound interest work?",
    description: "Learn how compound interest works, why time matters more than the amount you save, and see real examples of compounding in action.",
    keyword: "compound interest explained",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "What Is Compound Interest?",
        blocks: [
          p("Compound interest is interest earned on your original money plus the interest already earned. Your money earns returns. Then those returns earn returns too."),
          p("Simple interest only pays on the original amount. At 5 percent simple interest, 1,000 dollars earns 50 dollars a year. After 10 years you have 1,500 dollars."),
        ],
      },
      {
        h2: "How It Works, Step by Step",
        blocks: [
          p("Take 1,000 dollars earning a hypothetical 6 percent per year, compounded yearly. This is an illustration, not a prediction. Real returns vary and are never guaranteed."),
          p("Year 1: balance 1,060. Year 2: 1,123.60. Year 3: about 1,191. Year 10: about 1,791. Year 20: about 3,207. Year 30: about 5,743."),
          p("The original 1,000 became about 5,743 over 30 years with no added dollars. Growth was slow early and faster late. That acceleration is compounding. Early on, contributions drive growth. Later, returns on returns drive it."),
        ],
      },
      {
        h2: "Why Time Matters More Than Amount",
        blocks: [
          p("Time is the strongest input in compounding. Stronger than monthly amount. Stronger than a slightly higher return."),
          p("An illustration, not a promise: Anna starts at 25, saves 200 dollars a month for 10 years, then stops. Total saved: 24,000 dollars. She leaves it invested until 65."),
          p("Ben starts at 35, saves 200 dollars a month for 30 years until 65. Total saved: 72,000 dollars, three times Anna's."),
        ],
      },
      {
        h2: "Real Examples: Small Habits, Long Time",
        blocks: [
          p("You do not need big amounts. Regular small contributions work because each one gets its own compounding timeline."),
          p("The monthly saver: 100 dollars a month from age 25 is 1,200 a year. Over 40 years you contribute 48,000 out of pocket. At a hypothetical 7 percent average annual return, compounded monthly, that could grow to roughly 260,000 dollars. Contributions were 48,000. The rest is compounding. Hypothetical illustration. Real results differ."),
        ],
      },
      {
        h2: "What Interrupts Compounding",
        blocks: [
          p("Withdrawals are the biggest. Every dollar removed stops compounding. Early retirement account withdrawals can also trigger taxes and penalties. Double hit: lose the money and its future growth."),
          p("Fees are the quiet one. One percent a year sounds small. Over 30 years it takes a large share of returns. Same investments, different fees, different endings. Check the expense ratio."),
        ],
      },
      {
        h2: "Putting Compounding to Work",
        blocks: [
          p("Start now. The best day was years ago. The second best is today. Even small amounts start the clock."),
          p("Save regularly. Automate monthly contributions. Each dollar gets its own timeline. Regular buys also smooth market ups and downs."),
          p("Reinvest earnings. Turn on automatic dividend and interest reinvestment. Reinvesting is what makes compounding happen."),
          p("Keep fees low. Favor low cost index funds when they fit. Trade rarely. Every fee is a small leak."),
        ],
      },
      {
        h2: "Compounding and Debt: The Flip Side",
        blocks: [
          p("Compounding works against you in debt. Credit card balances are the clearest case. Interest compounds on what you owe. Minimum payments barely cover it. The balance sticks or grows."),
          p("Paying down high interest debt is often your best “investment.” Clearing a card at 20 percent is like a guaranteed 20 percent return. No investment offers that with certainty."),
        ],
      },
      {
        h2: "A Simple Plan for This Week",
        blocks: [
          p("Open a retirement account if you lack one: a workplace 401(k) or an IRA on your own. Both give tax advantaged compounding."),
          p("Automate a contribution, even 50 or 100 dollars a month, timed right after payday."),
          p("Pick a simple investment: a low cost target date fund or broad stock index fund. Turn on reinvestment."),
          p("Set a reminder for six months out. Raise the contribution by one percent or 25 dollars. Repeat yearly."),
          p("No market timing, no stock picking. Just what compounding needs: regular contributions, low costs, and time."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Compound interest is simple math with a powerful result. Returns earn returns. Growth accelerates. Starting early lets time do the heavy lifting."),
          p("You cannot control returns. You control when you start, how regularly you save, what you pay in fees, and whether you leave it alone. Those four choices decide how much compounding can do. Start small if needed. Start now. Stay consistent. Let time work."),
        ],
      },
    ],
    faq: [
      {
        q: "What is compound interest?",
        a: "Compound interest is interest earned on your original money plus the interest already earned. Your money earns returns. Then those returns earn returns too. Simple interest only pays on the original amount. At 5 percent simple interest, 1,000 dollars earns 50 dollars a year. After 10 years you have 1,500 dollars.",
      },
      {
        q: "Why time matters more than amount?",
        a: "Time is the strongest input in compounding. Stronger than monthly amount. Stronger than a slightly higher return. An illustration, not a promise: Anna starts at 25, saves 200 dollars a month for 10 years, then stops. Total saved: 24,000 dollars. She leaves it invested until 65.",
      },
      {
        q: "What interrupts compounding?",
        a: "Withdrawals are the biggest. Every dollar removed stops compounding. Early retirement account withdrawals can also trigger taxes and penalties. Double hit: lose the money and its future growth. Fees are the quiet one. One percent a year sounds small. Over 30 years it takes a large share of returns.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "What is a target date fund?", href: "/answers/what-is-a-target-date-fund" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "what-are-medicare-part-b-excess-charges",
    title: "What are Medicare Part B excess charges?",
    // Retitled 2026-10-29: the page sat around position 23 for "part b excess
    // charges" while skipping the two things searchers ask next (does NC allow
    // them, which Medigap letters cover them).
    metaTitle: "Part B Excess Charges: The 15% Rule, NC, and How to Avoid Them",
    description: "Part B excess charges explained: who can bill them, the 15 percent limit, whether North Carolina allows them, and which Medigap plans pay them for you.",
    keyword: "medicare part b excess charges",
    eyebrow: "Medicare questions, answered",
    lede: "A Part B excess charge is the extra a doctor who doesn't take Medicare's approved amount can bill you, up to 15 percent more. North Carolina allows them.",
    published: "2026-10-14",
    updated: "2026-10-29",
    intro: "A Part B excess charge is the extra amount a doctor can bill you when they don't accept Medicare's approved amount as payment in full. Federal law caps it at 15 percent above that approved amount. North Carolina doesn't ban them, so they can show up here. You'll only see one with Original Medicare, from a doctor who doesn't accept assignment. Pick doctors who do, and you'll almost never get one.",
    sections: [
      {
        h2: "What Excess Charges Actually Are",
        blocks: [
          p("Medicare sets an approved amount for every covered service. Think of it as the price Medicare thinks the service is worth. Normally, you pay 20 percent of that approved amount as coinsurance, and Medicare pays the other 80 percent. That is the standard split for Part B services after you meet your deductible."),
          p("An excess charge is anything a provider bills above that approved amount. Only non-participating providers can do it."),
        ],
      },
      {
        h2: "The 15 Percent Limit",
        blocks: [
          p("The 15 percent limiting charge is set by federal law, and it's the most a provider can add anywhere in the country. A few states go further and ban or tighten it. North Carolina isn't one of them, so the federal 15 percent cap is the rule here. A provider can charge less than the limit if they want. Many don't."),
          p("It helps to know the math. If the approved amount is 200 dollars, the most the provider can bill is 230 dollars. Your coinsurance is still based on the approved amount, so you would owe 40 dollars in coinsurance plus up to 30 dollars in excess charges."),
        ],
      },
      {
        h2: "Participating vs Non-Participating vs Opt-Out Providers",
        blocks: [
          p("Participating providers agree to accept Medicare's approved amount as payment in full. They accept assignment. You pay your 20 percent coinsurance and your deductible share. No excess charges, ever. This is the group you want."),
          p("Non-participating providers still take Medicare patients, but they decide visit by visit whether to accept assignment. When they don't, they can bill you up to the 15 percent limit. You may also have to pay the whole bill up front and wait for Medicare to pay you back its share."),
          p("Opt-out providers have left Medicare entirely. Excess charge limits don't apply, because Medicare doesn't pay them at all. You'd sign a private contract and pay the full price yourself. Neither Medicare nor a Medigap plan will chip in."),
        ],
      },
      {
        h2: "Which Medigap Plans Cover Excess Charges",
        blocks: [
          p("Medigap Plan G covers Part B excess charges in full. So does Plan F, but only people who were eligible for Medicare before January 1, 2020 can buy it. Plan N and the other letters don't cover them."),
          p("So if you're comparing Plan G and Plan N, this is one of the real differences. It matters most if you see specialists who don't accept assignment. If all your doctors do, it may never come up."),
          p("If you're on a Medicare Advantage plan, excess charges work differently. Your plan's network and its own cost sharing decide what you pay, so check with the plan before you see a doctor outside it."),
        ],
      },
      {
        h2: "How to Avoid Excess Charges",
        blocks: [
          p("The easiest way to avoid excess charges is to use participating providers. Most doctors are participating. Medicare's provider finder on medicare.gov lets you filter for providers who accept assignment."),
          p("If you see a non-participating specialist because they are the best option for your condition, ask up front whether they will accept assignment for your visit. Some non-participating providers accept assignment on a case by case basis. Asking costs you nothing."),
        ],
      },
      {
        h2: "What to Do If You Get Billed Too Much",
        blocks: [
          p("Check the bill against your Medicare Summary Notice, which shows the approved amount. If the bill is higher than that plus 15 percent, call the billing office first. It's often a mistake. If they won't fix it, you can report it to 1-800-MEDICARE, because billing above the limit breaks the rule."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Confirm the provider accepts assignment before the visit. And if you have Medigap, check whether your plan letter covers excess charges."),
          p("This article is for general information only and is not legal, tax, or insurance advice. Medicare rules change and vary by state. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What is a Medicare Part B excess charge?",
        a: "It's the extra amount a doctor who doesn't accept Medicare's approved amount can bill you, on top of your normal coinsurance. Federal law caps it at 15 percent above the approved amount. It only applies to Original Medicare.",
      },
      {
        q: "Does North Carolina allow Part B excess charges?",
        a: "Yes. A few states ban or limit excess charges further, but North Carolina isn't one of them. Here the federal 15 percent cap is the limit.",
      },
      {
        q: "Does Medigap Plan G cover excess charges?",
        a: "Yes. Plan G covers Part B excess charges in full. Plan F does too, but only people eligible for Medicare before January 1, 2020 can buy it. Plan N doesn't cover them.",
      },
      {
        q: "How do I avoid excess charges?",
        a: "Use doctors who accept assignment. Most do, and the provider finder on medicare.gov lets you check.",
      },
      {
        q: "What if I'm billed more than the limit?",
        a: "Compare the bill with your Medicare Summary Notice. If it's more than the approved amount plus 15 percent, call the billing office. It's often a mistake.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "when-can-i-buy-medigap-without-answering-medical-questions",
    title: "When can I buy Medigap without answering medical questions?",
    metaTitle: "When can I buy Medigap without answering medical questions?",
    description: "Learn when you have a guaranteed issue right for Medigap, which states have birthday rules, how trial rights work, and what triggers a special enrollment",
    keyword: "medigap guaranteed issue rights",
    eyebrow: "Medicare questions, answered",
    lede: "Most of the time, insurance companies can ask you health questions before selling you a Medigap policy. They can look at your medical history.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Most of the time, insurance companies can ask you health questions before selling you a Medigap policy. They can look at your medical history. They can charge you more or refuse you based on your health. That process is called medical underwriting. But there are specific windows when they cannot do any of that. During those windows, the company must sell you the policy, must cover your pre-existing conditions (with limited exceptions), and cannot charge you more because of your health. Those windows are called guaranteed issue rights. Knowing them can save you thousands of dollars a year.",
    sections: [
      {
        h2: "The Medigap Open Enrollment Period",
        blocks: [
          p("Your biggest guaranteed issue right comes when you first turn 65. If you enroll in Medicare Part B at 65, you get a six-month Medigap open enrollment period that starts the first day of the month you turn 65 and are enrolled in Part B."),
          p("During this window, you can buy any Medigap policy sold in your state. No health questions. No medical exam. The company cannot deny you or charge you extra because of your health. This is the one time the choice is fully yours."),
        ],
      },
      {
        h2: "Guaranteed Issue Rights: What Triggers Them",
        blocks: [
          p("Beyond the initial open enrollment, federal law gives you guaranteed issue rights in specific situations. These are sometimes called Medigap protections. The main ones:"),
          p("Your Medicare Advantage plan leaves Medicare or stops serving your area. If your plan exits the market or you move out of its service area, you get a guaranteed issue right to buy a Medigap policy."),
        ],
      },
      {
        h2: "The Birthday Rule: Which States Have It",
        blocks: [
          p("Federal guaranteed issue rights are narrow. They only help in specific events. But some states give you a yearly opportunity to switch Medigap plans without underwriting. The most common version is called the birthday rule."),
          p("Under a birthday rule, you get a window around your birthday each year, usually 30 to 60 days, when you can switch to an equal or lesser Medigap plan without medical underwriting. You cannot upgrade to a richer plan, but you can switch companies or move to a plan with fewer benefits, often at a lower price."),
        ],
      },
      {
        h2: "What Guaranteed Issue Does Not Do",
        blocks: [
          p("Guaranteed issue rights have limits. Know them before you count on one."),
          p("They do not apply in every situation. Wanting a cheaper plan because yours got expensive is not a guaranteed issue trigger under federal law. That is exactly why the state birthday rules matter so much. They cover the everyday situation the federal rules ignore."),
          p("They may not give you every plan. In some guaranteed issue situations, the company only has to offer you certain plan letters, not the full menu. During your initial open enrollment at 65, you get the full menu. In later guaranteed issue situations, the options may be narrower."),
        ],
      },
      {
        h2: "Practical Steps",
        blocks: [
          p("If you are turning 65, your job is simple. Use your open enrollment period. Shop every plan letter available in your state. Pick the plan you can live with for years, because switching later may require underwriting."),
          p("If you are past 65 and on a Medigap plan, find out whether your state has a birthday rule, an anniversary rule, or year-round guaranteed issue. Write down your window. When it opens, compare prices. A 10-minute comparison could cut your premium."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Guaranteed issue rights are narrow federal windows plus a patchwork of state rules like the birthday rule. The strongest protection you get is your initial six-month open enrollment at 65. After that, your state rules and the federal triggers are what stand between you and medical underwriting."),
          p("This article is for general information only and is not legal, tax, or insurance advice. Medicare and Medigap rules vary by state and change over time. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the Medigap open enrollment period?",
        a: "Your biggest guaranteed issue right comes when you first turn 65. If you enroll in Medicare Part B at 65, you get a six-month Medigap open enrollment period that starts the first day of the month you turn 65 and are enrolled in Part B. During this window, you can buy any Medigap policy sold in your state. No health questions.",
      },
      {
        q: "What guaranteed issue does not do?",
        a: "Guaranteed issue rights have limits. Know them before you count on one. They do not apply in every situation. Wanting a cheaper plan because yours got expensive is not a guaranteed issue trigger under federal law. That is exactly why the state birthday rules matter so much. They cover the everyday situation the federal rules ignore.",
      },
      {
        q: "What should I know about guaranteed issue rights?",
        a: "Beyond the initial open enrollment, federal law gives you guaranteed issue rights in specific situations. These are sometimes called Medigap protections. The main ones: Your Medicare Advantage plan leaves Medicare or stops serving your area.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "medicare-advantage-ppo-or-hmo-which-is-right-for-me",
    title: "Medicare Advantage PPO or HMO: which is right for me?",
    metaTitle: "Medicare Advantage PPO or HMO: which is right for me?",
    description: "Compare Medicare Advantage HMO and PPO plans: networks, referral rules, out-of-network coverage, prior authorization, and how costs really differ.",
    keyword: "medicare advantage ppo vs hmo",
    eyebrow: "Medicare questions, answered",
    lede: "HMO or PPO? If you are choosing a Medicare Advantage plan, this is probably the first decision you face. The letters matter.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "HMO or PPO? If you are choosing a Medicare Advantage plan, this is probably the first decision you face. The letters matter. They decide which doctors you can see, whether you need permission slips to see specialists, and what you pay when you travel. Both plan types cover everything Original Medicare covers. Both must cover emergency and urgent care anywhere. The differences are in the rules around everything else.",
    sections: [
      {
        h2: "Networks: The Core Difference",
        blocks: [
          p("An HMO has a defined network of doctors, hospitals, and other providers. You are expected to use network providers for your care. If you go out of network for non-emergency care, the HMO generally does not pay. You pay the full bill."),
          p("A PPO also has a network, but it covers out-of-network care too. You can see any provider who accepts Medicare, in or out of network. You will pay more when you go out of network, but you have coverage. That flexibility is the main reason people choose PPOs."),
        ],
      },
      {
        h2: "Referrals: Who Needs Permission",
        blocks: [
          p("HMO plans typically require you to pick a primary care doctor, and that doctor acts as your gatekeeper. To see a specialist, you usually need a referral from your primary care doctor first. No referral, no coverage."),
          p("PPO plans typically do not require referrals. You can book a specialist directly. If you value moving fast and managing your own care, this is a meaningful difference."),
        ],
      },
      {
        h2: "Costs: Premiums, Copays, and the Trade-off",
        blocks: [
          p("HMO plans often have lower premiums than PPO plans in the same area. Sometimes the HMO premium is zero dollars on top of your Part B premium. PPOs tend to cost more per month."),
          p("But the premium is only part of the math. Look at the copays. A specialist visit copay, a hospital stay copay, the maximum out-of-pocket limit. HMO plans sometimes have lower copays for in-network care. PPO plans sometimes have higher copays across the board."),
        ],
      },
      {
        h2: "Prior Authorization: Both Do It",
        blocks: [
          p("Prior authorization is when your plan requires approval before it covers certain services, tests, or drugs. Both HMO and PPO plans use it. It is not an HMO-only thing."),
          p("That said, HMO plans tend to use prior authorization more heavily, because the gatekeeper model is built around managing care. PPO plans use it too, especially for expensive procedures, imaging, and certain drugs."),
        ],
      },
      {
        h2: "Travel and Snowbirds",
        blocks: [
          p("If you spend part of the year in another state, the HMO vs PPO choice gets sharper. HMO coverage outside your home area is generally limited to emergency and urgent care. Routine care, like seeing your regular specialist, is not covered out of area."),
          p("PPO plans cover out-of-network care, so you have coverage when you travel. You pay more than you would in network, but you are covered. Some PPO plans have national networks that make this even easier."),
        ],
      },
      {
        h2: "Which One Fits You",
        blocks: [
          p("Choose an HMO if your doctors are in the network, you are comfortable with a primary care gatekeeper, you want the lowest premium, and you mostly get care close to home."),
          p("Choose a PPO if you want the freedom to see specialists without referrals, your doctors span multiple networks, you travel regularly, or you want out-of-network coverage as a safety net."),
          p("Either way, verify before you enroll. Check that your specific doctors are in the network. Confirm your drugs are on the formulary. Read the maximum out-of-pocket limit. Plans change networks every year, so recheck during Annual Enrollment even if you stay put."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("HMO means lower premiums and tighter rules: in-network care, referrals, and limited out-of-area coverage. PPO means more freedom and higher costs: no referrals, out-of-network coverage, and bigger monthly premiums. The right choice is the one that fits your doctors, your travel, and your budget."),
          p("This article is for general information only and is not legal, tax, or insurance advice. Plan rules vary by plan and by area, and details change every year. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the trade?",
        a: "HMO plans often have lower premiums than PPO plans in the same area. Sometimes the HMO premium is zero dollars on top of your Part B premium. PPOs tend to cost more per month. But the premium is only part of the math. Look at the copays. A specialist visit copay, a hospital stay copay, the maximum out-of-pocket limit.",
      },
      {
        q: "Which one fits you?",
        a: "Choose an HMO if your doctors are in the network, you are comfortable with a primary care gatekeeper, you want the lowest premium, and you mostly get care close to home.",
      },
      {
        q: "What should I know about networks?",
        a: "An HMO has a defined network of doctors, hospitals, and other providers. You are expected to use network providers for your care. If you go out of network for non-emergency care, the HMO generally does not pay. You pay the full bill. A PPO also has a network, but it covers out-of-network care too.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "how-do-medicare-part-d-coverage-phases-work",
    title: "How do Medicare Part D coverage phases work?",
    metaTitle: "How do Medicare Part D coverage phases work?",
    description: "Understand the three Medicare Part D coverage phases: the deductible, initial coverage, and catastrophic coverage, and how your costs change in each one.",
    keyword: "medicare part d phases",
    eyebrow: "Medicare questions, answered",
    lede: "Your Part D drug plan does not charge you the same amount all year. Your costs move through phases as your spending adds up.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Your Part D drug plan does not charge you the same amount all year. Your costs move through phases as your spending adds up. The phase you are in decides what you pay at the pharmacy counter. There are three main phases. The dollar figures that define each phase change every year, so check medicare.gov for the current year numbers. The concepts below stay the same year to year.",
    sections: [
      {
        h2: "Phase 1: The Deductible",
        blocks: [
          p("At the start of each year, you are in the deductible phase. During this phase, you pay the full cost of your covered drugs until you have spent enough to satisfy the plan's deductible."),
          p("Some plans have no deductible, or they waive the deductible for certain drug tiers. Many plans charge no deductible for generic drugs on the lowest tiers. Check your plan's details to see how your deductible works."),
          p("The deductible resets every January 1. Whatever you paid toward it in December does not carry over. January starts fresh."),
        ],
      },
      {
        h2: "Phase 2: Initial Coverage",
        blocks: [
          p("Once you meet the deductible, you move into initial coverage. This is the phase most people spend most of the year in. During initial coverage, you pay a copay or coinsurance for each prescription, and your plan pays the rest."),
          p("Your costs in this phase depend on your plan's formulary. Drugs are grouped into tiers. Tier 1 generics might cost you a small copay. Tier 3 brand names cost more. Tier 5 specialty drugs usually come with coinsurance, meaning you pay a percentage of the drug's cost."),
        ],
      },
      {
        h2: "Phase 3: Catastrophic Coverage",
        blocks: [
          p("Once your total drug costs cross the threshold, you enter catastrophic coverage. This is the final phase, and it lasts for the rest of the year."),
          p("In catastrophic coverage, your costs drop to a small amount. Medicare sets the rules for what you pay in this phase. For the current year, check medicare.gov, because the structure of catastrophic coverage has been changing under recent law."),
          p("The point of this phase is protection. It caps what you pay for drugs in a year. Without it, someone on a 10,000 dollar a month specialty drug would face ruinous costs. Catastrophic coverage is the backstop."),
        ],
      },
      {
        h2: "How the Phases Affect Real People",
        blocks: [
          p("Most people on a few generics live in initial coverage all year. They pay their copays, the year ends, the cycle resets. The phases are background noise."),
          p("People on expensive brand or specialty drugs move through the phases quickly. Their early-year costs are high. Then catastrophic coverage kicks in and their costs drop. The yearly pattern looks like a hill: expensive at the start, cheap at the end."),
          p("If your costs spike early in the year and then fall, that is the phases working as designed. It is not a billing error."),
        ],
      },
      {
        h2: "What to Watch Each Year",
        blocks: [
          p("Formularies change every fall. Your drug might move to a higher tier. A drug might leave the formulary entirely. The phase thresholds change too. That is why your Annual Notice of Change matters. Read it before Annual Enrollment ends."),
          p("If you take expensive drugs, ask your doctor about alternatives on lower tiers. A therapeutically similar drug on a lower tier can keep you in initial coverage longer and cut your yearly costs. Your doctor and pharmacist can help with this conversation."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Part D moves through three phases: the deductible, initial coverage, and catastrophic coverage. Your costs are highest early in the year and drop as your spending crosses each threshold. The dollar figures change yearly, so always check medicare.gov for the current year numbers before making decisions."),
          p("This article is for general information only and is not legal, tax, or insurance advice. Part D rules, thresholds, and dollar figures change every year. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the phases affect real people?",
        a: "Most people on a few generics live in initial coverage all year. They pay their copays, the year ends, the cycle resets. The phases are background noise. People on expensive brand or specialty drugs move through the phases quickly. Their early-year costs are high. Then catastrophic coverage kicks in and their costs drop.",
      },
      {
        q: "What to watch each year?",
        a: "Formularies change every fall. Your drug might move to a higher tier. A drug might leave the formulary entirely. The phase thresholds change too. That is why your Annual Notice of Change matters. Read it before Annual Enrollment ends. If you take expensive drugs, ask your doctor about alternatives on lower tiers.",
      },
      {
        q: "What should I know about phase 1?",
        a: "At the start of each year, you are in the deductible phase. During this phase, you pay the full cost of your covered drugs until you have spent enough to satisfy the plan's deductible. Some plans have no deductible, or they waive the deductible for certain drug tiers. Many plans charge no deductible for generic drugs on the lowest tiers.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "how-do-i-appeal-a-medicare-advantage-denial",
    title: "How do I appeal a Medicare Advantage denial?",
    metaTitle: "How do I appeal a Medicare Advantage denial?",
    description: "Denied by your Medicare Advantage plan? Learn the five levels of appeal, the deadlines for each, where to file, and how to strengthen your case.",
    keyword: "medicare advantage appeal",
    eyebrow: "Medicare questions, answered",
    lede: "Your Medicare Advantage plan denied a service, a test, or a drug your doctor ordered. That denial is not the final word.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Your Medicare Advantage plan denied a service, a test, or a drug your doctor ordered. That denial is not the final word. Medicare gives you a formal appeals process with multiple levels. Many denials get reversed on appeal, especially when the medical record supports the request. The key is acting fast and following the process exactly. Miss a deadline and you lose the level. Here is how it works.",
    sections: [
      {
        h2: "Step 0: Understand What You Got",
        blocks: [
          p("When your plan denies coverage, it must send you a written notice explaining the denial and your appeal rights. Read it. It tells you what was denied, why, and how to appeal. Keep this notice. It is the foundation of everything that follows."),
        ],
      },
      {
        h2: "Level 1: Reconsideration by the Plan",
        blocks: [
          p("Your first appeal goes back to your plan. This is called a request for reconsideration. You are asking the plan to take another look."),
          p("You generally have 60 days from the date on the denial notice to file. You can file by following the instructions on the denial notice. Most plans accept appeals by mail, fax, and sometimes through an online portal."),
        ],
      },
      {
        h2: "Level 2: Independent Review Entity",
        blocks: [
          p("If the plan upholds its denial, your case automatically goes to an independent review entity. You do not have to file this yourself. The plan forwards it."),
          p("The independent reviewer looks at your case fresh. They are not part of your plan. This level reverses a meaningful share of denials, because the reviewer applies Medicare coverage rules without the plan's cost incentives."),
          p("The reviewer must decide within the timeframes Medicare sets. For standard cases, that is generally 30 days for pre-service and 60 days for post-service. You will get a written decision."),
        ],
      },
      {
        h2: "Level 3: Administrative Law Judge Hearing",
        blocks: [
          p("If the independent reviewer upholds the denial and the amount in dispute meets a minimum dollar threshold, you can request a hearing before an administrative law judge. The threshold changes yearly, so check medicare.gov for the current figure."),
          p("You have 60 days from the independent review decision to request the hearing. The hearing can be by phone, video, or in person. You can represent yourself, bring a representative, or have your doctor testify."),
          p("This level takes longer. Backlogs are real. But the judge applies the law to your facts, and this is where well-documented cases often win."),
        ],
      },
      {
        h2: "Level 4: Medicare Appeals Council",
        blocks: [
          p("If the judge rules against you, you can ask the Medicare Appeals Council to review the decision. You have 60 days to request this review. The Council looks at whether the judge applied the law correctly."),
          p("You do not get a new hearing at this level. The Council reviews the record. New evidence is generally not accepted unless you show good cause for not submitting it earlier. That is why building your record early matters."),
        ],
      },
      {
        h2: "Level 5: Federal District Court",
        blocks: [
          p("The final level is federal district court. This is available if the amount in dispute meets a higher threshold, which changes yearly. You have 60 days from the Council's decision to file."),
          p("Very few cases reach this level. But the option exists, and it matters for high-cost denials like major surgeries or expensive ongoing treatments."),
        ],
      },
      {
        h2: "How to Strengthen Any Appeal",
        blocks: [
          p("Start with the denial letter. Understand the exact reason. Plans deny for specific reasons: not medically necessary, experimental, not covered under your plan's rules. Your appeal must answer the specific reason."),
          p("Get your doctor involved early. A letter that says “this is medically necessary” helps. A letter that explains why, citing your diagnosis, failed alternatives, and clinical guidelines, wins cases. Ask your doctor to reference the specific Medicare coverage criteria if they know them."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("This article is for general information only and is not legal, tax, or insurance advice. Appeal timeframes and thresholds change, so verify current rules on medicare.gov. For free, unbiased help with an appeal, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the plan?",
        a: "Your first appeal goes back to your plan. This is called a request for reconsideration. You are asking the plan to take another look. You generally have 60 days from the date on the denial notice to file. You can file by following the instructions on the denial notice.",
      },
      {
        q: "How do I strengthen any appeal?",
        a: "Start with the denial letter. Understand the exact reason. Plans deny for specific reasons: not medically necessary, experimental, not covered under your plan's rules. Your appeal must answer the specific reason. Get your doctor involved early. A letter that says “this is medically necessary” helps.",
      },
      {
        q: "What should I know about step 0?",
        a: "When your plan denies coverage, it must send you a written notice explaining the denial and your appeal rights. Read it. It tells you what was denied, why, and how to appeal. Keep this notice. It is the foundation of everything that follows. There are two kinds of denials.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "can-i-contribute-to-an-hsa-while-on-medicare",
    title: "Can I contribute to an HSA while on Medicare?",
    metaTitle: "Can I contribute to an HSA while on Medicare?",
    description: "You cannot contribute to an HSA once enrolled in Medicare. Learn about the 6-month lookback rule, tax penalties, and what to do before you turn 65.",
    keyword: "medicare hsa contributions",
    eyebrow: "Medicare questions, answered",
    lede: "If you have a Health Savings Account and you are approaching 65, there is a rule that catches people off guard.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you have a Health Savings Account and you are approaching 65, there is a rule that catches people off guard. Once you enroll in Medicare, you can no longer contribute to your HSA. Not even a dollar. Contributing after Medicare enrollment triggers tax penalties. This trips up a lot of working 65-year-olds. They delay Medicare because they are still employed, then enroll later, and discover the HSA rule has a retroactive bite. Here is what you need to know before it costs you.",
    sections: [
      {
        h2: "Why Medicare Ends HSA Eligibility",
        blocks: [
          p("To contribute to an HSA, you must be enrolled in a qualifying high-deductible health plan and have no other disqualifying coverage. Medicare counts as disqualifying coverage."),
          p("The moment you enroll in Medicare Part A or Part B, you are no longer HSA-eligible. It does not matter that you still have your high-deductible plan through work. It does not matter that you are still employed. Medicare enrollment ends your ability to make new HSA contributions."),
          p("Your existing HSA balance is fine. The money stays yours. You can still use it tax-free for qualified medical expenses, including Medicare premiums, deductibles, and copays. You just cannot add new money."),
        ],
      },
      {
        h2: "The 6-Month Lookback: The Part That Surprises People",
        blocks: [
          p("Here is the trap. When you enroll in Medicare Part A after age 65, your Part A coverage is backdated up to 6 months. If you apply at 65 and 6 months, your Part A is backdated to when you turned 65."),
          p("Why does that matter? Because HSA eligibility is determined month by month. If Part A backdates 6 months, you were technically enrolled in Medicare for those 6 months. Any HSA contributions you made during those months become excess contributions."),
        ],
      },
      {
        h2: "What to Do Before 65",
        blocks: [
          p("If you are still working at 65 and want to keep your HSA, you have a decision to make. You can delay Medicare enrollment while you have qualifying employer coverage, and keep contributing to your HSA. Many people do this. It is allowed."),
          p("But if you do, plan your exit. When you are ready to enroll in Medicare, stop your HSA contributions at least 6 months before you apply for Part A. This avoids the lookback problem entirely. Tell your employer's benefits team. Stop the payroll deductions. Make it clean."),
        ],
      },
      {
        h2: "If You Already Made Excess Contributions",
        blocks: [
          p("First, do not panic. This is fixable. Calculate the contributions made during the months you are now considered enrolled in Medicare. Withdraw the excess amount plus any earnings attributable to it before your tax filing deadline."),
          p("Report it correctly on your tax return. HSA excess contributions go on Form 5329. If you withdraw the excess in time, you avoid the 6 percent excise tax. The earnings are taxable as income in the year you withdraw them."),
        ],
      },
      {
        h2: "Using Your HSA After Medicare",
        blocks: [
          p("Stopping contributions does not mean the account is dead. Your HSA becomes a powerful retirement healthcare fund. You can use it tax-free for:"),
          p("Medicare Part B, Part D, and Medicare Advantage premiums. Note that Medigap premiums are generally not a qualified expense, with limited exceptions."),
          p("Deductibles, copays, and coinsurance under Medicare."),
          p("Dental, vision, and hearing costs that Medicare does not cover."),
          p("Long-term care expenses, up to annual limits set by the IRS."),
          p("Many people let their HSA grow invested after 65 and use it as a dedicated medical expense fund in retirement. The triple tax advantage you built up does not disappear. You just stop adding to it."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("This article is for general information only and is not legal, tax, or insurance advice. Tax rules are complex and change over time. For free, unbiased Medicare help, contact your State Health Insurance Assistance Program (SHIP) or call 1-800-MEDICARE. For the tax side, talk with a qualified tax professional or a local licensed insurance agent who understands the Medicare rules."),
        ],
      },
    ],
    faq: [
      {
        q: "Why Medicare ends HSA eligibility?",
        a: "To contribute to an HSA, you must be enrolled in a qualifying high-deductible health plan and have no other disqualifying coverage. Medicare counts as disqualifying coverage. The moment you enroll in Medicare Part A or Part B, you are no longer HSA-eligible. It does not matter that you still have your high-deductible plan through work.",
      },
      {
        q: "What is the 6-Month lookback: the part that surprises people?",
        a: "Here is the trap. When you enroll in Medicare Part A after age 65, your Part A coverage is backdated up to 6 months. If you apply at 65 and 6 months, your Part A is backdated to when you turned 65. Why does that matter? Because HSA eligibility is determined month by month.",
      },
      {
        q: "What to do before 65?",
        a: "If you are still working at 65 and want to keep your HSA, you have a decision to make. You can delay Medicare enrollment while you have qualifying employer coverage, and keep contributing to your HSA. Many people do this. It is allowed. But if you do, plan your exit.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "what-does-it-mean-to-be-dual-eligible-for-medicare-and-medicaid",
    title: "What does it mean to be dual eligible for Medicare and Medicaid?",
    metaTitle: "What does it mean to be dual eligible for Medicare",
    description: "Learn what dual eligibility means, how D-SNPs coordinate Medicare and Medicaid, and the extra help dual eligibles get with Part D drug costs.",
    keyword: "dual eligible medicare medicaid",
    eyebrow: "Medicare questions, answered",
    lede: "Some people qualify for both Medicare and Medicaid at the same time. This is called dual eligibility.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Some people qualify for both Medicare and Medicaid at the same time. This is called dual eligibility. If that is you, you have more help available than most Medicare beneficiaries realize. Your costs can be close to zero. But the system is confusing, and many dual eligibles never use all the benefits they qualify for. Here is how it works.",
    sections: [
      {
        h2: "What Dual Eligibility Means",
        blocks: [
          p("Medicare is the federal health program for people 65 and older and for certain younger people with disabilities. Medicaid is the joint federal and state program for people with limited income and resources. They are separate programs with separate rules."),
          p("Dual eligible means you qualify for both. Medicare is your primary coverage. Medicaid wraps around it, paying costs that Medicare leaves behind. Depending on your level of eligibility, Medicaid can pay your Medicare premiums, deductibles, copays, and coinsurance."),
        ],
      },
      {
        h2: "D-SNPs: Plans Built for Dual Eligibles",
        blocks: [
          p("A D-SNP is a Dual Eligible Special Needs Plan. It is a type of Medicare Advantage plan designed specifically for people with both Medicare and Medicaid. D-SNPs coordinate the two programs so you are not juggling them yourself."),
          p("Here is what D-SNPs typically offer:"),
          p("Care coordination. You get a care team that manages your doctors, your medications, and your services across both programs. For people with complex health needs, this alone is worth a lot."),
          p("Low or zero cost sharing. D-SNPs are built around minimal out-of-pocket costs. Many have zero dollar premiums and very low copays."),
          p("Extra benefits. D-SNPs often include dental, vision, hearing, transportation to medical appointments, and over-the-counter allowances. The specific extras vary by plan and area."),
        ],
      },
      {
        h2: "Extra Help With Part D",
        blocks: [
          p("Dual eligibles automatically qualify for Extra Help, the federal program that pays for most of your prescription drug costs under Part D. You do not have to apply separately. If Medicaid shows you as eligible, the help is automatic."),
          p("Extra Help covers your Part D premium up to a benchmark amount, your deductible, and most of your copays. Your drug copays drop to a few dollars per prescription. For many dual eligibles, this is the single biggest financial benefit of the whole system."),
        ],
      },
      {
        h2: "Common Mistakes Dual Eligibles Make",
        blocks: [
          p("Not telling providers about both coverages. Show both your Medicare card and your Medicaid card. If a provider only bills Medicare, you might get a bill for cost sharing that Medicaid would have paid. Both cards, every visit."),
          p("Paying bills without checking. If you get a medical bill and you are dual eligible, do not pay it reflexively. Medicaid may cover it. Call the provider's billing office and confirm they billed both programs."),
          p("Skipping Annual Enrollment. Your needs change. Plans change. D-SNP benefits change. Even with great coverage, a yearly check makes sense. Your dual eligible special enrollment period gives you flexibility, but an annual review keeps you from drifting."),
        ],
      },
      {
        h2: "How to Get Help",
        blocks: [
          p("This system has a lot of moving parts. You do not have to figure it out alone."),
          p("Your State Health Insurance Assistance Program offers free, unbiased counseling. They can check your dual eligibility level, compare D-SNPs, and screen you for Extra Help."),
          p("Your state Medicaid office handles eligibility questions. If you think you qualify for Medicaid but are not enrolled, start there."),
          p("Medicare's plan finder on medicare.gov lets you compare D-SNPs in your area. Filter for Special Needs Plans to see your options."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Dual eligibility means Medicare and Medicaid work together, with Medicaid covering much of what Medicare leaves behind. D-SNPs coordinate the two programs into one plan with care coordination and extra benefits. Extra Help slashes your drug costs automatically. If you qualify for both programs, make sure you are using everything available to you."),
          p("This article is for general information only and is not legal, tax, or insurance advice. Medicaid rules vary by state and change over time. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What do dual eligibility mean?",
        a: "Medicare is the federal health program for people 65 and older and for certain younger people with disabilities. Medicaid is the joint federal and state program for people with limited income and resources. They are separate programs with separate rules. Dual eligible means you qualify for both. Medicare is your primary coverage.",
      },
      {
        q: "How do I get help?",
        a: "This system has a lot of moving parts. You do not have to figure it out alone. Your State Health Insurance Assistance Program offers free, unbiased counseling. They can check your dual eligibility level, compare D-SNPs, and screen you for Extra Help. Your state Medicaid office handles eligibility questions.",
      },
      {
        q: "What should I know about D-SNPs?",
        a: "A D-SNP is a Dual Eligible Special Needs Plan. It is a type of Medicare Advantage plan designed specifically for people with both Medicare and Medicaid. D-SNPs coordinate the two programs so you are not juggling them yourself. Here is what D-SNPs typically offer: Care coordination.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "can-i-get-medicare-before-age-65",
    title: "Can I get Medicare before age 65?",
    metaTitle: "Can I get Medicare before age 65?",
    description: "You can get Medicare before 65 through disability, end-stage renal disease, or ALS. Learn the waiting periods, the exceptions, and how enrollment works.",
    keyword: "medicare under 65",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare is not only for people 65 and older.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Medicare is not only for people 65 and older. If you are under 65, you can still qualify through three paths: long-term disability, end-stage renal disease, or ALS. Each path has its own rules, its own waiting period, and its own exceptions. If any of these apply to you or someone you love, the details below matter. Timing mistakes can leave gaps in coverage.",
    sections: [
      {
        h2: "The Disability Path: SSDI and the 24-Month Wait",
        blocks: [
          p("The most common way to get Medicare under 65 is through Social Security Disability Insurance, known as SSDI. If the Social Security Administration approves you for SSDI, you become eligible for Medicare. But not right away."),
          p("There is a 24-month waiting period. The clock starts with your first month of SSDI entitlement, not the month you applied or the month you were approved. After 24 months of SSDI entitlement, Medicare kicks in automatically. You will be enrolled in Part A and Part B without having to apply separately."),
          p("This waiting period is one of the hardest parts of the disability system. You are approved as disabled, you are receiving SSDI, and you still wait two years for health coverage. Many people bridge the gap with Medicaid, COBRA from a former employer, or a spouse's plan."),
          p("A few things to know about the disability path:"),
        ],
      },
      {
        h2: "ESRD: End-Stage Renal Disease",
        blocks: [
          p("End-stage renal disease, which is permanent kidney failure requiring dialysis or a transplant, qualifies you for Medicare at any age. This includes children. There is no 24-month waiting period like the disability path, but there is a shorter one."),
          p("Medicare coverage generally begins on the first day of the third month after the month your dialysis starts. So if you start dialysis in January, coverage typically begins April 1. That leaves a gap of about two to three months."),
          p("There are two big exceptions that can eliminate the wait:"),
          p("If you start a home dialysis training program, Medicare can begin the first month your dialysis starts. Home dialysis patients get faster coverage."),
        ],
      },
      {
        h2: "ALS: The Exception With No Wait",
        blocks: [
          p("ALS, amyotrophic lateral sclerosis, also called Lou Gehrig's disease, is the exception to the waiting period. If you are approved for SSDI based on ALS, Medicare begins the first month you are entitled to SSDI. No 24-month wait."),
          p("Congress removed the waiting period for ALS because the disease moves fast. Making someone with ALS wait two years for health coverage made no sense. The change reflects that reality."),
          p("You still have to be approved for SSDI first. The SSDI application and approval process takes time on its own. But once entitlement begins, Medicare follows immediately."),
        ],
      },
      {
        h2: "Enrollment: What Happens Automatically and What Does Not",
        blocks: [
          p("If you qualify through SSDI, including ALS, enrollment in Part A and Part B is automatic when your waiting period ends. You will get your Medicare card in the mail. You do not need to apply."),
          p("For ESRD, enrollment is not always automatic. You may need to apply at your local Social Security office or online. Do not assume it happened. Confirm your enrollment and your start date."),
          p("Part D prescription drug coverage is never automatic. You have to choose and enroll in a Part D plan yourself. If you do not enroll when first eligible and you lack other creditable drug coverage, late enrollment penalties can apply later."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Medicare under 65 comes through three doors: SSDI with a 24-month wait, ESRD with a short wait and major exceptions for home dialysis and transplant, and ALS with no wait at all. Know which door is yours, mind the enrollment details, and get help with the parts that are not automatic."),
          p("This article is for general information only and is not legal, tax, or insurance advice. Medicare rules for disability, ESRD, and ALS are detailed and change over time. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the disability path: SSDI and the 24-Month wait?",
        a: "The most common way to get Medicare under 65 is through Social Security Disability Insurance, known as SSDI. If the Social Security Administration approves you for SSDI, you become eligible for Medicare. But not right away. There is a 24-month waiting period.",
      },
      {
        q: "What should I know about ESRD?",
        a: "End-stage renal disease, which is permanent kidney failure requiring dialysis or a transplant, qualifies you for Medicare at any age. This includes children. There is no 24-month waiting period like the disability path, but there is a shorter one.",
      },
      {
        q: "What should I know about ALS?",
        a: "ALS, amyotrophic lateral sclerosis, also called Lou Gehrig's disease, is the exception to the waiting period. If you are approved for SSDI based on ALS, Medicare begins the first month you are entitled to SSDI. No 24-month wait. Congress removed the waiting period for ALS because the disease moves fast.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "what-happens-to-my-medicare-if-i-move-to-another-state",
    title: "What happens to my Medicare if I move to another state?",
    metaTitle: "What happens to my Medicare if I move to another state?",
    description: "Moving to another state? Learn how Original Medicare, Medicare Advantage service areas, Medigap portability, and special enrollment periods work when you",
    keyword: "medicare moving to another state",
    eyebrow: "Medicare questions, answered",
    lede: "A move across state lines shakes up a lot of things. Your Medicare coverage is one of them.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "A move across state lines shakes up a lot of things. Your Medicare coverage is one of them. What happens depends on what kind of Medicare coverage you have. Some of it follows you automatically. Some of it does not. Here is what to expect and what to do before, during, and after the move.",
    sections: [
      {
        h2: "Original Medicare: It Moves With You",
        blocks: [
          p("Original Medicare, meaning Part A and Part B, is federal. It works the same in every state. Your coverage does not change when you move. Your doctors change, but the program does not."),
          p("You do need to update your address with Social Security. That keeps your records straight and makes sure your Medicare Summary Notices and other mail reach you. You can update your address online through your Social Security account, by phone, or in person."),
        ],
      },
      {
        h2: "Medicare Advantage: Service Areas Are the Issue",
        blocks: [
          p("Medicare Advantage plans have service areas. A service area is the geographic region where the plan operates. When you move out of your plan's service area, you generally cannot keep the plan."),
          p("This is the biggest moving-related Medicare issue. People assume their plan follows them. It does not."),
          p("Here is what typically happens:"),
          p("If you move within the same service area, nothing changes. Same plan, same network."),
        ],
      },
      {
        h2: "Part D: Same Service Area Problem",
        blocks: [
          p("Standalone Part D drug plans also have service areas. Moving out of the area triggers the same kind of special enrollment period. You can switch to a Part D plan that serves your new address."),
          p("If you move but stay in the same service area, your Part D plan continues. Still worth a yearly check during Annual Enrollment, but the move itself changes nothing."),
        ],
      },
      {
        h2: "Medigap: The Portable One",
        blocks: [
          p("Medigap is the most move-friendly coverage you can have. Medigap policies are portable. You keep your policy when you move to another state. The company cannot cancel it because you moved."),
          p("Your premium may change. Medigap premiums are often based on your zip code, your age, and local pricing. Moving from a low-cost area to a high-cost area can raise your premium. Moving the other direction can lower it. Ask your company what your new premium will be."),
        ],
      },
      {
        h2: "The Special Enrollment Period for Moves",
        blocks: [
          p("Moving out of your plan's service area gives you a special enrollment period. This is your window to make changes outside the normal enrollment periods. You can:"),
          p("Enroll in a new Medicare Advantage plan in your new area."),
          p("Return to Original Medicare and add a Part D plan."),
          p("Switch from one Part D plan to another."),
        ],
      },
      {
        h2: "Your Moving Checklist",
        blocks: [
          p("Two months before the move: look up plans in your new zip code on medicare.gov. Compare Medicare Advantage options and Part D plans. Check networks and formularies."),
          p("One month before: notify your current Medicare Advantage or Part D plan of your upcoming move and your new address. Ask about your coverage end date."),
          p("Before moving day: enroll in your new plan if you are switching. Confirm the start date. Make sure there is no gap."),
        ],
      },
      {
        h2: "Snowbirds and Part-Time Moves",
        blocks: [
          p("If you split time between two states but keep one as your primary residence, you generally do not trigger a move-based special enrollment period. Your plan is tied to your permanent address."),
          p("But your coverage away from home needs attention. Original Medicare works everywhere. Medicare Advantage HMO plans generally cover only emergency and urgent care outside the service area. PPO plans cover out-of-network care at higher cost sharing. If you spend months away, make sure your plan type fits that lifestyle."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("This article is for general information only and is not legal, tax, or insurance advice. Enrollment rules and timeframes change, so verify current details on medicare.gov. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the issue?",
        a: "Medicare Advantage plans have service areas. A service area is the geographic region where the plan operates. When you move out of your plan's service area, you generally cannot keep the plan. This is the biggest moving-related Medicare issue. People assume their plan follows them. It does not.",
      },
      {
        q: "What is the special enrollment period for moves?",
        a: "Moving out of your plan's service area gives you a special enrollment period. This is your window to make changes outside the normal enrollment periods. You can: Enroll in a new Medicare Advantage plan in your new area. Return to Original Medicare and add a Part D plan. Switch from one Part D plan to another.",
      },
      {
        q: "What should I know about original Medicare?",
        a: "Original Medicare, meaning Part A and Part B, is federal. It works the same in every state. Your coverage does not change when you move. Your doctors change, but the program does not. You do need to update your address with Social Security.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "what-are-medicares-late-enrollment-penalties",
    title: "What are Medicare's late enrollment penalties?",
    metaTitle: "What are Medicare's late enrollment penalties?",
    description: "Learn how Medicare late enrollment penalties work for Part A, Part B, and Part D: how each is calculated, when they apply, and how to avoid them.",
    keyword: "medicare late enrollment penalty",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare has deadlines. Miss them without a valid reason, and you pay penalties. These are not one-time fines.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Medicare has deadlines. Miss them without a valid reason, and you pay penalties. These are not one-time fines. Most of them follow you for as long as you have Medicare. Understanding them before your deadlines hit is one of the highest-value things you can do in the Medicare world. There are three separate penalties, one for each part. They work differently. Here is each one.",
    sections: [
      {
        h2: "Part B Late Enrollment Penalty",
        blocks: [
          p("Part B covers doctor visits, outpatient care, and preventive services. Almost everyone pays a monthly premium for it. If you do not enroll in Part B when you are first eligible and you do not have a valid reason for waiting, you face a late enrollment penalty."),
          p("How it is calculated: your Part B premium goes up 10 percent for each full 12-month period you were eligible but not enrolled. The penalty is based on the standard Part B premium, and it lasts for as long as you have Part B. It is not temporary."),
        ],
      },
      {
        h2: "Part D Late Enrollment Penalty",
        blocks: [
          p("Part D covers prescription drugs. The late enrollment penalty works on a monthly formula rather than the yearly formula Part B uses."),
          p("How it is calculated: you pay 1 percent of the national base beneficiary premium for every month you were eligible for Part D but did not enroll and did not have creditable drug coverage. Creditable means drug coverage at least as good as Part D. The penalty is added to your Part D premium every month, permanently."),
          p("Because it accrues monthly, even a short gap can create a small permanent penalty. A 10-month gap means roughly a 10 percent surcharge on the base premium, added to your bill every month going forward."),
        ],
      },
      {
        h2: "Part A Late Enrollment Penalty",
        blocks: [
          p("Part A covers hospital stays. Most people get Part A premium-free because they or their spouse paid Medicare taxes for at least 40 quarters, which is about 10 years of work. If you qualify for premium-free Part A, there is no enrollment deadline pressure and no penalty. You can enroll anytime."),
          p("The penalty only matters if you have to pay a premium for Part A. That happens when you do not have enough work quarters. In that case, delaying Part A enrollment past your initial eligibility can trigger a penalty."),
        ],
      },
      {
        h2: "How to Avoid All Three",
        blocks: [
          p("Enroll on time. Your Initial Enrollment Period runs for seven months: the three months before your 65th birthday month, your birthday month, and the three months after. Mark it on a calendar a year ahead."),
          p("If you are still working with qualifying group coverage, you can delay. But know the rules. The coverage must be through current employment at an employer with 20 or more employees for Part B purposes. When that coverage ends, your special enrollment period starts. Use it promptly."),
        ],
      },
      {
        h2: "What If You Already Owe a Penalty",
        blocks: [
          p("If a penalty is already on your record, check whether it was applied correctly. Mistakes happen. If you had creditable coverage during the gap, gather your proof and appeal through Social Security for Part B or through the plan for Part D."),
          p("In limited cases, you may qualify for penalty relief. For Part D, the Extra Help program can eliminate the penalty for people with limited income. For Part B, certain equitable relief situations exist but are narrow. Your State Health Insurance Assistance Program can tell you whether any relief applies to your situation."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("This article is for general information only and is not legal, tax, or insurance advice. Premium amounts, penalty formulas, and enrollment rules change, so verify current figures on medicare.gov. For free, unbiased help, contact your State Health Insurance Assistance Program (SHIP), call 1-800-MEDICARE, or talk with a local licensed insurance agent who can review your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "How do I avoid all three?",
        a: "Enroll on time. Your Initial Enrollment Period runs for seven months: the three months before your 65th birthday month, your birthday month, and the three months after. Mark it on a calendar a year ahead. If you are still working with qualifying group coverage, you can delay. But know the rules.",
      },
      {
        q: "What if you already owe a penalty?",
        a: "If a penalty is already on your record, check whether it was applied correctly. Mistakes happen. If you had creditable coverage during the gap, gather your proof and appeal through Social Security for Part B or through the plan for Part D. In limited cases, you may qualify for penalty relief.",
      },
      {
        q: "What should I know about medicare late enrollment penalty?",
        a: "Part B covers doctor visits, outpatient care, and preventive services. Almost everyone pays a monthly premium for it. If you do not enroll in Part B when you are first eligible and you do not have a valid reason for waiting, you face a late enrollment penalty.",
      },
    ],
    sources: [
      { label: "Medicare.gov", href: "https://www.medicare.gov/" },
      { label: "Centers for Medicare & Medicaid Services", href: "https://www.cms.gov/" },
    ],
    related: [
      { label: "What changes during Medicare Annual Enrollment 2026?", href: "/answers/what-changes-during-medicare-annual-enrollment-2026" },
      { label: "What should I do before, during, and after my 65th birthday?", href: "/answers/what-should-i-do-before-during-and-after-my-65th-birthday" },
      { label: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
    ],
    startHref: "/start?topic=medicare",
  },
  {
    slug: "should-i-take-the-standard-deduction-or-itemize",
    title: "Should I take the standard deduction or itemize?",
    metaTitle: "Should I take the standard deduction or itemize?",
    description: "The standard deduction and itemized deductions explained in plain language, including how the choice works and when itemizing wins.",
    keyword: "standard deduction",
    eyebrow: "Taxes, explained",
    lede: "One of the first decisions on your tax return is a quiet one. You pick the standard deduction or you itemize. It sounds small.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "One of the first decisions on your tax return is a quiet one. You pick the standard deduction or you itemize. It sounds small. It can change your tax bill by a lot. Here is the deal. The government gives every filer a set dollar amount they can subtract from their income, no questions asked. That is the standard deduction. The amount depends on your filing status, and it changes year to year. For the current year's number, check irs.gov.",
    sections: [
      {
        h2: "Itemizing means you skip that automatic amount and instead list out",
        blocks: [
          p("You add them up, and if the total is bigger than the standard deduction, itemizing saves you money. If it is smaller, you take the standard deduction. You always get to choose whichever one gives you the lower tax. You never have to itemize just because you could."),
          p("So what actually counts when you itemize? A handful of categories, each with its own rules."),
          p("Mortgage interest is usually the biggest one. If you own a home and pay interest on your mortgage, that interest is generally deductible. In the early years of a mortgage, most of your payment goes to interest, so this one alone can be large. There are limits tied to the size of the loan, and the rules have changed over the years, so the current limits are worth a look."),
        ],
      },
      {
        h2: "Charitable donations count too",
        blocks: [
          p("Cash gifts to qualified charities are deductible. Donated goods, like clothes dropped at a thrift store, are deductible at their fair market value, which is basically what they would sell for. If you give a lot in a year, this category adds up fast. Keep receipts. For cash donations, a bank record or a written note from the charity usually does the job."),
        ],
      },
      {
        h2: "Homeowners itemize more often than renters",
        blocks: [
          p("Mortgage interest plus property taxes plus state income tax is a stack that can clear the standard deduction on its own. Renters do not have mortgage interest or property tax, so the standard deduction usually wins for them."),
          p("Big charitable givers can win by itemizing. If you give a meaningful share of your income to charity every year, those donations might push you over."),
          p("High medical years are another trigger. A year with major surgery or ongoing treatment can create deductible medical costs that, stacked with everything else, make itemizing worth it."),
        ],
      },
      {
        h2: "Another thing people get wrong: they think itemizing means keeping",
        blocks: [
          p("It does not. You only need records for the categories you are actually deducting. If you are not itemizing, your everyday spending does not matter to the IRS."),
          p("People also assume that owning a home automatically means itemizing. Not anymore. When the standard deduction is high, plenty of homeowners still come out better taking it. The mortgage interest has to be big enough, or stacked with enough other deductions, to beat it. Run the numbers each year instead of assuming."),
          p("The choice also resets every year. You might itemize one year and take the standard deduction the next. A refinance that drops your interest, paying off your mortgage, a year with no big medical bills, or a change in the standard deduction amount can all flip the answer. It is a year-by-year call."),
        ],
      },
      {
        h2: "If your situation is simple, meaning one job, no house, no big",
        blocks: [
          p("If you own a home, give a lot, or had a rough medical year, it is worth doing the math."),
          p("This is general information, not tax advice. Tax rules change, and the numbers are different every year. If you are close to the line or your situation is complicated, talk to a tax professional before you file."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about standard deduction?",
        a: "You add them up, and if the total is bigger than the standard deduction, itemizing saves you money. If it is smaller, you take the standard deduction. You always get to choose whichever one gives you the lower tax. You never have to itemize just because you could. So what actually counts when you itemize?",
      },
      {
        q: "What should I know about charitable donations count too?",
        a: "Cash gifts to qualified charities are deductible. Donated goods, like clothes dropped at a thrift store, are deductible at their fair market value, which is basically what they would sell for. If you give a lot in a year, this category adds up fast. Keep receipts.",
      },
      {
        q: "What if your situation is simple, meaning one job, no house, no big?",
        a: "If you own a home, give a lot, or had a rough medical year, it is worth doing the math. This is general information, not tax advice. Tax rules change, and the numbers are different every year. If you are close to the line or your situation is complicated, talk to a tax professional before you file.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-do-tax-brackets-actually-work",
    title: "How do tax brackets actually work?",
    metaTitle: "How do tax brackets actually work?",
    description: "Marginal tax rates explained in plain language with a simple example, plus the common myth that all your income gets taxed at your top rate.",
    keyword: "tax brackets",
    eyebrow: "Taxes, explained",
    lede: "Tax brackets confuse a lot of smart people. The confusion is understandable, because the way brackets get talked about is misleading.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Tax brackets confuse a lot of smart people. The confusion is understandable, because the way brackets get talked about is misleading. You will hear someone say “I am in the 22 percent bracket” and assume every dollar they earn gets taxed at 22 percent. That is not how it works. Not even close. Here is how it actually works. The tax system is split into chunks, and each chunk of your income gets taxed at its own rate. Only the income that falls inside a bracket gets taxed at that bracket's rate. The dollars below it get taxed at the lower rates.",
    sections: [
      {
        h2: "Think of it like filling buckets",
        blocks: [
          p("You pour your income in, and it fills the first bucket first. Every dollar in that bucket gets taxed at the lowest rate. When that bucket is full, the overflow goes into the next bucket, which has a slightly higher rate. Then the next, and the next. Your top bucket, the one your last dollar lands in, is your marginal tax rate. It is called marginal because it is the rate on the margin, on the next dollar."),
          p("Let me walk through a plain example. I am going to use made-up numbers on purpose, because real bracket cutoffs change every year. Check irs.gov for the current year's actual brackets."),
        ],
      },
      {
        h2: "That is the whole trick",
        blocks: [
          p("Your “bracket” describes your last dollar, not your first dollar. Two people can both be “in the 25 percent bracket” and pay very different effective rates depending on how much of their income sits in each bucket."),
          p("The number people actually feel is the effective tax rate. That is your total tax divided by your total income. It is always lower than your marginal rate, because most of your income was taxed in the lower buckets. If someone tells you they pay 25 percent of their income in federal tax because they are in the 25 percent bracket, they are almost certainly wrong. Their effective rate is lower."),
        ],
      },
      {
        h2: "It also matters for deductions",
        blocks: [
          p("A deduction saves you tax at your marginal rate, because it removes income from your top bucket. If your marginal rate is 22 percent, a thousand-dollar deduction saves you about two hundred and twenty dollars in tax. Same deduction, different bracket, different savings. This is why deductions are worth more to higher earners, which is a whole separate conversation about tax fairness."),
        ],
      },
      {
        h2: "A couple more things worth knowing",
        blocks: [
          p("Brackets apply to ordinary income, which is wages, salaries, business income, that kind of thing. Investment income like long-term capital gains and qualified dividends gets its own separate set of rates. Do not mix the two up."),
          p("Brackets also differ by filing status. The cutoffs for a single filer are different from the cutoffs for someone married filing jointly. Same rates, different bucket sizes. And the cutoffs get adjusted most years for inflation, which is why you should always check the current year's numbers instead of memorizing old ones."),
          p("State taxes are a separate layer. Your state has its own brackets, or maybe a flat rate, or in a few states no income tax at all. The federal buckets and the state buckets do not interact. You figure each one on its own."),
        ],
      },
      {
        h2: "The practical takeaway is simple",
        blocks: [
          p("When someone says “I am in the 22 percent bracket,” translate that in your head to “their next dollar gets taxed at 22 percent.” Most of their dollars were taxed at less. And when you are making a decision about extra income or a deduction, the marginal rate is the number that matters."),
          p("This is general information, not tax advice. Bracket cutoffs and rates change, so check irs.gov for the current year, and talk to a tax professional about your specific situation."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about tax brackets?",
        a: "You pour your income in, and it fills the first bucket first. Every dollar in that bucket gets taxed at the lowest rate. When that bucket is full, the overflow goes into the next bucket, which has a slightly higher rate. Then the next, and the next. Your top bucket, the one your last dollar lands in, is your marginal tax rate.",
      },
      {
        q: "What should I know about the whole trick?",
        a: "Your “bracket” describes your last dollar, not your first dollar. Two people can both be “in the 25 percent bracket” and pay very different effective rates depending on how much of their income sits in each bucket. The number people actually feel is the effective tax rate. That is your total tax divided by your total income.",
      },
      {
        q: "What does “think of it like filling buckets” mean?",
        a: "You pour your income in, and it fills the first bucket first. Every dollar in that bucket gets taxed at the lowest rate. When that bucket is full, the overflow goes into the next bucket, which has a slightly higher rate. Then the next, and the next. Your top bucket, the one your last dollar lands in, is your marginal tax rate.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "what-is-tax-loss-harvesting",
    title: "What is tax loss harvesting?",
    metaTitle: "What is tax loss harvesting?",
    description: "What tax loss harvesting is, how the wash sale rule works, and who this strategy actually helps.",
    keyword: "tax loss harvesting",
    eyebrow: "Taxes, explained",
    lede: "Every investor ends up holding something that went down. It feels bad.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Every investor ends up holding something that went down. It feels bad. Tax loss harvesting is the one move that turns a losing investment into something useful: a tax break. The idea is simple. If you sell an investment for less than you paid, you have a capital loss. That loss can offset capital gains you made elsewhere. Sold one stock at a profit and another at a loss? The loss cancels out some or all of the gain, and you only pay tax on the net amount. If your losses are bigger than your gains, you can generally use the extra to offset a limited amount of ordinary income each year, and carry the rest forward to future years. The exact annual limit changes, so check the current rule.",
    sections: [
      {
        h2: "Notice what is happening here",
        blocks: [
          p("You are not changing your overall investment outcome. The loss was already real. You are just choosing when to recognize it for tax purposes, and putting it to work against gains you would otherwise pay tax on."),
          p("Here is a plain example. Say you bought two stocks a while back. One is up, one is down. If you sell the winner, you owe tax on the gain. But if you also sell the loser in the same year, the loss offsets the gain. Your portfolio ends up in roughly the same place, minus the loser you did not want anyway, and your tax bill is smaller."),
          p("Who does this actually help? Mostly people with taxable investment accounts, meaning regular brokerage accounts, not retirement accounts. Inside an IRA or 401(k), gains and losses do not get taxed year to year, so harvesting does nothing for you there. It is a taxable-account strategy."),
        ],
      },
      {
        h2: "It helps most when you actually have gains to offset",
        blocks: [
          p("If you sold investments at a profit this year, or your mutual funds spit out capital gains distributions, harvested losses can soak those up. It also helps high earners more, because they face higher tax rates on gains, so each dollar of offset is worth more. And it helps people who rebalance anyway. If you were going to sell the loser to clean up your portfolio, doing it before year end turns a chore into a tax benefit."),
          p("Now the big catch: the wash sale rule. The IRS does not let you sell something at a loss, claim the tax break, and immediately buy it right back. If you buy the same or a “substantially identical” investment within 30 days before or after the sale, the loss is disallowed. The 61-day window, 30 days on each side plus the sale day, is the danger zone."),
        ],
      },
      {
        h2: "There is a common workaround",
        blocks: [
          p("You sell the losing investment and buy something similar but not substantially identical. Sell one large-company index fund and buy a different large-company index fund from another provider, for example. You stay invested in the same part of the market, but it is a different security, so the wash sale rule should not apply. “Substantially identical” is fuzzy around the edges, so this is one of those areas where a tax professional earns their keep."),
        ],
      },
      {
        h2: "And keep records",
        blocks: [
          p("Your broker will send tax forms, but wash sale tracking across multiple accounts is on you. If you harvest regularly, a simple spreadsheet with sale dates, amounts, and replacement purchases will save you a headache in April."),
          p("The bottom line: tax loss harvesting is a legitimate, mainstream strategy for taxable accounts. Sell losers you do not want, use the losses against gains, respect the 30-day wash sale window, and do not sell winners-wearing-loser-costumes just for the tax break."),
          p("This is general information, not tax advice. The annual limits and rules change, so check the current year's details at irs.gov, and talk to a tax professional before you start selling."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about tax loss harvesting?",
        a: "You are not changing your overall investment outcome. The loss was already real. You are just choosing when to recognize it for tax purposes, and putting it to work against gains you would otherwise pay tax on. Here is a plain example. Say you bought two stocks a while back. One is up, one is down.",
      },
      {
        q: "What does “notice what is happening here” mean?",
        a: "You are not changing your overall investment outcome. The loss was already real. You are just choosing when to recognize it for tax purposes, and putting it to work against gains you would otherwise pay tax on. Here is a plain example. Say you bought two stocks a while back. One is up, one is down.",
      },
      {
        q: "What does “it helps most when you actually have gains to offset” mean?",
        a: "If you sold investments at a profit this year, or your mutual funds spit out capital gains distributions, harvested losses can soak those up. It also helps high earners more, because they face higher tax rates on gains, so each dollar of offset is worth more. And it helps people who rebalance anyway.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-do-roth-conversion-ladders-work",
    title: "How do Roth conversion ladders work?",
    metaTitle: "How do Roth conversion ladders work?",
    description: "How Roth conversion ladders work for early retirement, converting traditional retirement funds to Roth in low-income years, and the 5-year rule.",
    keyword: "roth conversion ladder",
    eyebrow: "Taxes, explained",
    lede: "If you want to retire early, you run into an awkward problem.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you want to retire early, you run into an awkward problem. Most of your retirement money is locked in accounts you cannot touch until age 59 and a half without paying a penalty. Your 401(k) and traditional IRA are full of money you need, and the door has a lock on it. The Roth conversion ladder is the most popular workaround. It is not a loophole or a trick. It is just a careful reading of the rules, used in the right order.",
    sections: [
      {
        h2: "Here is the core idea",
        blocks: [
          p("You can convert money from a traditional IRA to a Roth IRA any time you want. When you convert, you pay income tax on the amount converted, because traditional IRA money has never been taxed. That sounds bad, but here is the key: you get to choose when the conversion happens. If you do it in a year when your income is low, you pay tax at a low rate."),
          p("So the ladder works like this. You retire early. In your first year of early retirement, your income drops way down, because you are not working anymore. You convert a chunk of your traditional IRA to a Roth IRA. You pay tax on that chunk, but at your new low rate instead of the high rate you paid while working. Then you wait. Then you spend it."),
        ],
      },
      {
        h2: "That is why it is called a ladder",
        blocks: [
          p("You convert in year one, and that money is available in year six. You convert in year two, available in year seven. Each year you add a new rung, and five years later a rung matures into spendable money. After the first five years, you have a steady pipeline of penalty-free withdrawals, one rung maturing every year."),
          p("During those first five years, you live on other money. Taxable brokerage accounts are the usual bridge, since you can sell from those any time. Roth IRA contributions you made over the years can also be withdrawn any time, because you already paid tax on them. Some people use cash savings. The plan only works if you have five years of spending money outside the traditional accounts."),
        ],
      },
      {
        h2: "The real magic is the rate arbitrage",
        blocks: [
          p("While you were working, your marginal tax rate might have been 22 or 24 percent or higher. Every dollar you put in the traditional 401(k) dodged tax at that rate. In early retirement, with no paycheck, you might fill up only the lowest brackets. Converting at 10 or 12 percent, or even zero if you stay under the standard deduction, means you permanently locked in a lower rate on that money. You dodged high tax going in and paid low tax coming out."),
        ],
      },
      {
        h2: "And the five-year clocks are per conversion, not per account",
        blocks: [
          p("Each year's conversion starts its own clock on January 1 of the year you converted. Miss this detail and you can withdraw too early and owe the penalty you were trying to avoid. Keep a simple log: year converted, amount, available date."),
          p("One more thing people miss: you cannot do this well without knowing your income picture each year. Interest, dividends, side income, a spouse's income, all of it fills up those low brackets before your conversion does. The ladder is a year-by-year calculation, not a set-it-and-forget-it plan."),
          p("Is it worth the complexity? For someone retiring in their 40s or 50s with most of their money in traditional accounts, often yes. It is one of the few strategies that turns the low-income years of early retirement into a genuine tax advantage instead of just a spending problem."),
        ],
      },
      {
        h2: "This is general information, not tax advice",
        blocks: [
          p("The 5-year rule has details and exceptions I did not cover here, and tax brackets change yearly. Talk to a tax professional before you start converting."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the core idea?",
        a: "You can convert money from a traditional IRA to a Roth IRA any time you want. When you convert, you pay income tax on the amount converted, because traditional IRA money has never been taxed. That sounds bad, but here is the key: you get to choose when the conversion happens.",
      },
      {
        q: "What should I know about roth conversion ladder?",
        a: "You convert in year one, and that money is available in year six. You convert in year two, available in year seven. Each year you add a new rung, and five years later a rung matures into spendable money. After the first five years, you have a steady pipeline of penalty-free withdrawals, one rung maturing every year.",
      },
      {
        q: "What should I know about the five?",
        a: "Each year's conversion starts its own clock on January 1 of the year you converted. Miss this detail and you can withdraw too early and owe the penalty you were trying to avoid. Keep a simple log: year converted, amount, available date. One more thing people miss: you cannot do this well without knowing your income picture each year.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-does-self-employment-tax-work",
    title: "How does self-employment tax work?",
    metaTitle: "How does self-employment tax work?",
    description: "What self-employment tax is, who owes it, and how it differs from regular income tax, explained for freelancers and side gig workers.",
    keyword: "self-employment tax",
    eyebrow: "Taxes, explained",
    lede: "If you have only ever been an employee, your first year of freelance or side gig income comes with a nasty surprise.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "If you have only ever been an employee, your first year of freelance or side gig income comes with a nasty surprise. You do the work, you get paid, you set aside money for income tax, and then you find out about a second tax you never paid before. That is the self-employment tax. Here is what it is. When you work a regular job, you and your employer split the cost of Social Security and Medicare taxes. You see your half come out of every paycheck. Your employer quietly pays the other half. You never think about it.",
    sections: [
      {
        h2: "When you work for yourself, there is no employer",
        blocks: [
          p("So you pay both halves. That combined bill is the self-employment tax. It is Social Security tax plus Medicare tax, both the employee half and the employer half, on your net earnings from self-employment."),
          p("Notice the key word: net. You do not pay it on every dollar that comes in. You pay it on your profit, meaning your business income minus your business expenses. If you earned some amount freelancing and spent some amount on business costs, the tax applies to what is left. This is why tracking expenses matters so much for self-employed people. Every legitimate business expense shrinks both your income tax and your self-employment tax."),
        ],
      },
      {
        h2: "How is it different from income tax?",
        blocks: [
          p("They are two separate taxes that happen to be calculated on the same return. Income tax is based on your total income from all sources, with brackets, deductions, the whole system. Self-employment tax is a flat-ish rate applied to your self-employment profit, and it funds Social Security and Medicare specifically. You can think of income tax as paying for the government in general, and self-employment tax as paying into your own future Social Security and Medicare."),
          p("The rates are set by law and apply in two pieces. Social Security tax applies up to an annual wage cap, and earnings above the cap are not subject to it. Medicare tax has no cap, and there is an additional Medicare tax on earnings above a higher threshold. I am not giving you the exact rates and caps here because they change. Check irs.gov for the current year's numbers."),
        ],
      },
      {
        h2: "The other surprise for new freelancers is how it gets paid",
        blocks: [
          p("Employees have tax withheld every paycheck. Nobody withholds anything from your freelance checks. So you generally pay self-employment tax through quarterly estimated tax payments, four times a year. Miss those and you can owe an underpayment penalty on top of the tax itself. If this is your first self-employed year, put the quarterly dates on your calendar now."),
          p("A question that comes up a lot: does forming an LLC change this? By itself, no. A single-member LLC is ignored for federal tax purposes by default, which means the IRS treats you exactly like a sole proprietor. You still owe self-employment tax on the profit. An LLC helps with legal liability, not with this tax. There are elections, like S corporation status, that can change the picture, but that is a bigger decision with its own tradeoffs, and it is worth a conversation with a tax professional before you do it."),
        ],
      },
      {
        h2: "The practical playbook for someone starting out is simple",
        blocks: [
          p("Open a separate bank account for the business, even if it is just a second checking account. Track every business expense from day one, because each one reduces this tax. Set aside a percentage of every payment you receive for taxes, in a separate savings account you do not touch. And make those quarterly payments."),
          p("Self-employment tax is not a punishment for working for yourself. It is the same Social Security and Medicare funding every worker pays. It just feels bigger because you see the whole bill instead of half of it. Knowing it is coming is most of the battle."),
          p("This is general information, not tax advice. Rates, caps, and thresholds change yearly, so check irs.gov for current figures, and talk to a tax professional about your situation."),
        ],
      },
    ],
    faq: [
      {
        q: "How is it different from income tax?",
        a: "They are two separate taxes that happen to be calculated on the same return. Income tax is based on your total income from all sources, with brackets, deductions, the whole system. Self-employment tax is a flat-ish rate applied to your self-employment profit, and it funds Social Security and Medicare specifically.",
      },
      {
        q: "When is you work for yourself, there no employer?",
        a: "So you pay both halves. That combined bill is the self-employment tax. It is Social Security tax plus Medicare tax, both the employee half and the employer half, on your net earnings from self-employment. Notice the key word: net. You do not pay it on every dollar that comes in.",
      },
      {
        q: "What should I know about the other surprise for new freelancers?",
        a: "Employees have tax withheld every paycheck. Nobody withholds anything from your freelance checks. So you generally pay self-employment tax through quarterly estimated tax payments, four times a year. Miss those and you can owe an underpayment penalty on top of the tax itself.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "do-i-qualify-for-the-home-office-deduction",
    title: "Do I qualify for the home office deduction?",
    metaTitle: "Do I qualify for the home office deduction?",
    description: "The home office deduction explained, including the simplified vs regular method and who actually qualifies to claim it.",
    keyword: "home office deduction",
    eyebrow: "Taxes, explained",
    lede: "Working from home is normal now. Deducting your home office on your taxes is still widely misunderstood.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Working from home is normal now. Deducting your home office on your taxes is still widely misunderstood. A lot of people either claim it when they should not, or skip it when they could. Let us sort out who qualifies and how the two methods work. First, the big rule that eliminates most people: employees generally cannot take this deduction. If you work from home for an employer, as a W-2 employee, the home office deduction is not available to you under current law. It does not matter how many days a week you work from your kitchen table. This deduction is for self-employed people, freelancers, and small business owners who use part of their home for business.",
    sections: [
      {
        h2: "If you are self-employed, two tests decide whether your space",
        blocks: [
          p("The first is regular and exclusive use. You have to use the space regularly for business, and exclusively for business. Exclusive means exclusive. A spare bedroom that is your office Monday through Friday and a guest room on weekends does not count. A corner of your living room where you also watch TV does not count. The space has to be used only for business. It does not have to be a whole room, a clearly defined area counts, but the exclusive part is strict."),
          p("The second test is that the space is your principal place of business, or a place where you regularly meet clients or customers. For most home-based freelancers, the home office is clearly the principal place of business, so this test is easy. If you also rent an outside office, it gets murkier."),
          p("Assuming you qualify, you pick one of two methods to calculate the deduction."),
        ],
      },
      {
        h2: "The simplified method is exactly what it sounds like",
        blocks: [
          p("You take the square footage of your home office, up to a maximum the IRS sets, and multiply it by a set rate per square foot, also set by the IRS. One multiplication and you are done. No tracking utilities, no measuring rooms, no depreciation math. The tradeoff is the cap. If your actual home office costs are high, the simplified method probably gives you a smaller deduction than doing it the long way. But for a lot of people, the simplicity is worth it."),
        ],
      },
      {
        h2: "So which method should you pick?",
        blocks: [
          p("You get to choose every year, which is nice. The honest answer is to run both numbers if you can. If you rent and your rent is high, the regular method often wins by a comfortable margin. If your home costs are low, or you just hate paperwork, the simplified method is fine. There is no prize for maximizing the deduction at the cost of hours of record keeping you will never do again."),
        ],
      },
      {
        h2: "Documentation is simple but nonnegotiable",
        blocks: [
          p("Take a photo of the office space. Keep a floor plan or a note with the square footage. Save your utility bills and rent receipts or mortgage statements. If you ever get questioned, you want to show the space, the math, and the receipts. Five minutes of filing now beats a stressful letter later."),
          p("One more myth to kill: claiming a home office does not automatically trigger an audit. This was truer decades ago. The IRS has bigger fish to fry, and the simplified method exists precisely to make this deduction routine. Claim what you are entitled to, keep your records clean, and do not let an old rumor cost you a legitimate deduction."),
        ],
      },
      {
        h2: "This is general information, not tax advice",
        blocks: [
          p("The simplified method rate and square footage cap change, so check irs.gov for the current year's numbers, and talk to a tax professional if your situation is unusual."),
        ],
      },
    ],
    faq: [
      {
        q: "So which method should you pick?",
        a: "You get to choose every year, which is nice. The honest answer is to run both numbers if you can. If you rent and your rent is high, the regular method often wins by a comfortable margin. If your home costs are low, or you just hate paperwork, the simplified method is fine.",
      },
      {
        q: "What if you are self-employed, two tests decide whether your space?",
        a: "The first is regular and exclusive use. You have to use the space regularly for business, and exclusively for business. Exclusive means exclusive. A spare bedroom that is your office Monday through Friday and a guest room on weekends does not count. A corner of your living room where you also watch TV does not count.",
      },
      {
        q: "What should I know about home office deduction?",
        a: "You take the square footage of your home office, up to a maximum the IRS sets, and multiply it by a set rate per square foot, also set by the IRS. One multiplication and you are done. No tracking utilities, no measuring rooms, no depreciation math. The tradeoff is the cap.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "child-tax-credit-or-dependent-care-credit-which-do-i-get",
    title: "Child tax credit or dependent care credit: which do I get?",
    metaTitle: "Child tax credit or dependent care credit: which do I get?",
    description: "The difference between the child tax credit and the dependent care credit, what each one covers, and the general eligibility concepts for both.",
    keyword: "child tax credit",
    eyebrow: "Taxes, explained",
    lede: "These two credits get mixed up constantly, and the names are the reason. The child tax credit and the dependent care credit sound like the same thing.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "These two credits get mixed up constantly, and the names are the reason. The child tax credit and the dependent care credit sound like the same thing. They are not. They cover different costs, work in different ways, and you can claim both in the same year if you qualify for both. Let us take them one at a time.",
    sections: [
      {
        h2: "The child tax credit is a credit you get for having qualifying",
        blocks: [
          p("That is the core of it. It is not tied to any expense. You do not have to spend money on anything specific to claim it. If you have a child who meets the rules, you get the credit. The child generally has to be under a certain age at the end of the tax year, has to be your dependent, has to have lived with you for more than half the year, and has to have a valid Social Security number. There are income limits too, and the credit shrinks as income rises above those limits."),
          p("The credit amount is set by law and changes over time, so I am not quoting a number here. Check irs.gov for the current year's amount. One thing worth knowing is that part of the credit may be refundable, which means you can get money back even if you owe no tax, and part may be nonrefundable, which means it can only reduce your tax to zero. The split between refundable and nonrefundable has changed before and could change again."),
        ],
      },
      {
        h2: "The key phrase is “so you could work.” If you paid for childcare so",
        blocks: [
          p("If you paid a sitter so you could have a date night, that does not count. Both spouses generally have to be working or looking for work, with exceptions for a spouse who is a student or disabled."),
          p("The credit is a percentage of your care expenses, up to an expense cap per child, with a limit on the number of children that count. The percentage slides based on your income: lower-income families get a higher percentage, higher-income families get a lower one. The expense caps and the percentages are set by law, so check the current year's figures."),
          p("Here is where people get tripped up: employer dependent care benefits interact with this credit. If your job offers a dependent care flexible spending account, the money you put in there is pre-tax, which is already a tax break. You cannot double-dip. Expenses you paid with FSA money cannot also be used for the credit. You have to coordinate the two, and the coordination math is annoying but worth doing, because using both well usually beats using one badly."),
        ],
      },
      {
        h2: "So how do they differ in plain terms?",
        blocks: [
          p("The child tax credit is for having kids. The dependent care credit is for paying someone to watch them while you work. One is about the child existing, the other is about the care expense. You do not need childcare costs to get the child tax credit, and you do not need young children specifically to get the dependent care credit, since it can also cover care for a disabled spouse or dependent adult in some cases."),
          p("Can you claim both? Yes, if you qualify for both. They are separate credits on separate lines. Having daycare expenses does not reduce your child tax credit, and having the child tax credit does not reduce your dependent care credit. The only overlap to watch is the FSA coordination I mentioned."),
        ],
      },
      {
        h2: "Both credits have income phaseouts, meaning they shrink as income",
        blocks: [
          p("The phaseout ranges are different for each credit and they change, so do not assume last year's numbers still apply."),
          p("The bottom line: do not leave either one on the table because the names blurred together. If you have kids, check the child tax credit. If you paid for care so you could work, check the dependent care credit. They stack."),
          p("This is general information, not tax advice. Credit amounts, age limits, and phaseout ranges change, so check irs.gov for the current year, and talk to a tax professional about your family situation."),
        ],
      },
    ],
    faq: [
      {
        q: "So how do they differ in plain terms?",
        a: "The child tax credit is for having kids. The dependent care credit is for paying someone to watch them while you work. One is about the child existing, the other is about the care expense.",
      },
      {
        q: "What should I know about child tax credit?",
        a: "That is the core of it. It is not tied to any expense. You do not have to spend money on anything specific to claim it. If you have a child who meets the rules, you get the credit.",
      },
      {
        q: "What does “the child tax credit is a credit you get for having qualifying” mean?",
        a: "That is the core of it. It is not tied to any expense. You do not have to spend money on anything specific to claim it. If you have a child who meets the rules, you get the credit.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "can-i-use-an-hsa-as-a-retirement-account",
    title: "Can I use an HSA as a retirement account?",
    metaTitle: "Can I use an HSA as a retirement account?",
    description: "How health savings accounts offer a triple tax advantage, deductible contributions, tax-free growth, and tax-free withdrawals for medical costs, and why some",
    keyword: "hsa",
    eyebrow: "Taxes, explained",
    lede: "The health savings account might be the most underrated account in the tax code.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "The health savings account might be the most underrated account in the tax code. Most people treat it as a healthcare piggy bank: put money in, spend it on doctor visits, done. But a growing number of people treat their HSA as a second retirement account, and the math behind that choice is worth understanding. It starts with the triple tax advantage. No other account gives you all three of these at once.",
    sections: [
      {
        h2: "First, contributions are tax-deductible",
        blocks: [
          p("Money you put into an HSA reduces your taxable income, just like a traditional IRA contribution. If it comes out of your paycheck through your employer, it skips income tax and payroll tax entirely, which is even better."),
          p("Second, growth is tax-free. Interest, dividends, capital gains inside the account, none of it gets taxed year to year. The money compounds without the annual tax drag that eats at a regular brokerage account."),
        ],
      },
      {
        h2: "Compare that to the usual retirement accounts",
        blocks: [
          p("A traditional 401(k) gives you the deduction and the tax-free growth, but you pay tax when you withdraw. A Roth gives you tax-free growth and tax-free withdrawals, but no deduction going in. The HSA is the only account that checks all three boxes."),
          p("Now here is the retirement strategy part. You do not have to spend HSA money on medical bills right away. There is no deadline for reimbursing yourself. If you pay a medical bill out of pocket today, you can reimburse yourself from the HSA years or even decades later, as long as you keep the receipt and the expense happened after you opened the account. The receipt is the key. No receipt, no reimbursement."),
        ],
      },
      {
        h2: "It is basically a Roth IRA with a receipt-keeping requirement",
        blocks: [
          p("That is why finance people get excited about it."),
          p("There are rules to know before you get excited. You can only contribute to an HSA if you are covered by a qualifying high-deductible health plan. Not every plan with a high deductible qualifies. The plan has to meet the IRS definition, and your employer's benefits paperwork will say whether it does. You also cannot be enrolled in Medicare, claimed as a dependent, or covered by certain other plans that disqualify you."),
          p("Contribution limits exist and change every year. There are different limits for individual coverage and family coverage, plus a catch-up contribution if you are 55 or older. I am not quoting the numbers because they move. Check irs.gov for the current year."),
        ],
      },
      {
        h2: "Qualified medical expenses are broader than people think",
        blocks: [
          p("Doctor visits and prescriptions, obviously. Dental work, orthodontics, vision exams, glasses, contacts. Mental health care. Some over-the-counter medications. But cosmetic procedures do not count, and neither does general health spending like a gym membership in most cases. The IRS publishes the full list, and it is worth a skim before you start reimbursing yourself for things."),
          p("What happens if you withdraw for non-medical reasons? Before age 65, you pay income tax plus a penalty, which makes it a bad move. After 65, the penalty goes away and non-medical withdrawals are just taxed like a traditional IRA withdrawal. So worst case, in retirement, an HSA you never used for medical costs behaves like a traditional IRA. That is a decent backstop."),
        ],
      },
      {
        h2: "Also, invest the money",
        blocks: [
          p("An HSA sitting in cash earns next to nothing, and the whole retirement strategy depends on decades of growth. Check whether your provider offers investment options and what the minimum balance is to unlock them. If your employer's HSA has terrible investment choices or high fees, you can generally roll the money to a better HSA provider while keeping the account."),
          p("This is general information, not tax advice. Eligibility rules and contribution limits change yearly, so check irs.gov for the current year, and talk to a tax professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the usual retirement accounts?",
        a: "A traditional 401(k) gives you the deduction and the tax-free growth, but you pay tax when you withdraw. A Roth gives you tax-free growth and tax-free withdrawals, but no deduction going in. The HSA is the only account that checks all three boxes. Now here is the retirement strategy part.",
      },
      {
        q: "What should I know about the money?",
        a: "An HSA sitting in cash earns next to nothing, and the whole retirement strategy depends on decades of growth. Check whether your provider offers investment options and what the minimum balance is to unlock them.",
      },
      {
        q: "What should I know about hsa?",
        a: "Money you put into an HSA reduces your taxable income, just like a traditional IRA contribution. If it comes out of your paycheck through your employer, it skips income tax and payroll tax entirely, which is even better. Second, growth is tax-free. Interest, dividends, capital gains inside the account, none of it gets taxed year to year.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "do-i-need-to-pay-estimated-quarterly-taxes",
    title: "Do I need to pay estimated quarterly taxes?",
    metaTitle: "Do I need to pay estimated quarterly taxes?",
    description: "Who owes estimated quarterly taxes, how to pay them, and how the underpayment penalty works, in plain language for freelancers and investors.",
    keyword: "estimated taxes",
    eyebrow: "Taxes, explained",
    lede: "The US tax system is pay-as-you-go. Employees pay as they go through withholding on every paycheck.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "The US tax system is pay-as-you-go. Employees pay as they go through withholding on every paycheck. But if you have income with no withholding, the system still expects its money during the year. That is what estimated quarterly taxes are for. Who owes them? Anyone who expects to owe tax above a certain threshold after accounting for withholding and credits. In practice, that means freelancers, gig workers, and the self-employed, landlords collecting rent, investors with significant dividends or capital gains, retirees with pension or investment income and no withholding, and anyone with a profitable side business. If a meaningful chunk of your income arrives with no tax taken out, you are probably in estimated-tax territory.",
    sections: [
      {
        h2: "The threshold for “expects to owe” is set by the IRS and it is not",
        blocks: [
          p("If you had a tax bill last April that surprised you, that is your sign."),
          p("How do they work? Four times a year, you send the IRS a payment toward the tax you expect to owe for the year. The due dates are roughly in the middle of January, April, June, and September. They are not evenly spaced and they are not exactly quarterly, which confuses everyone the first time. Put the actual dates on your calendar, because the IRS publishes them each year and they can shift slightly."),
          p("You can pay online through the IRS website, by phone, or by mail with a voucher. Online is the easiest and gives you a confirmation record. Each payment gets credited to your account, and when you file your return, the total of your estimated payments counts just like withholding."),
        ],
      },
      {
        h2: "How much should you pay?",
        blocks: [
          p("You are aiming to cover what you will owe. There are a couple of accepted ways to get there. One is to estimate your actual income for the year and pay tax on it as you go, quarter by quarter. That works well if your income is steady or if you are good at forecasting. The other is the safe harbor approach: pay enough that you are protected from the underpayment penalty even if your estimate is off."),
        ],
      },
      {
        h2: "A lot of people discover this penalty the first year they go",
        blocks: [
          p("They earn good money, spend it, file in April, and get hit with a tax bill plus a penalty for not paying along the way. It feels unfair until you realize employees were paying all year through withholding. The quarterly system is just the self-employed version of the same thing."),
          p("There are exceptions and ways out. If you had no tax liability last year, you generally do not owe estimated tax this year. Farmers and fishermen get special timing rules. And if your income arrives unevenly, like a big commission in December, there is a method to annualize your income so you are not penalized for quarters when you earned nothing. That method takes extra paperwork but it exists for exactly that situation."),
        ],
      },
      {
        h2: "If your income jumps midyear, a new client, a big project",
        blocks: [
          p("The quarterly system lets you adjust. Paying more in the later quarters to catch up is allowed, though it does not erase an early shortfall for penalty purposes. Still better than waiting until April."),
          p("State taxes usually have their own estimated payment system with their own dates and thresholds. Do not forget the state. A lot of people handle the federal side perfectly and get surprised by their state in April."),
          p("The bottom line: if nobody is withholding tax from your income, the IRS still wants its money four times a year. Pay as you go, use the safe harbor if you want simplicity, and put the dates on your calendar before the year starts."),
        ],
      },
      {
        h2: "This is general information, not tax advice",
        blocks: [
          p("Thresholds, percentages, and due dates change, so check irs.gov for the current year, and talk to a tax professional if your income picture is complicated."),
        ],
      },
    ],
    faq: [
      {
        q: "How much should you pay?",
        a: "You are aiming to cover what you will owe. There are a couple of accepted ways to get there. One is to estimate your actual income for the year and pay tax on it as you go, quarter by quarter. That works well if your income is steady or if you are good at forecasting.",
      },
      {
        q: "What should I know about the threshold for?",
        a: "If you had a tax bill last April that surprised you, that is your sign. How do they work? Four times a year, you send the IRS a payment toward the tax you expect to owe for the year. The due dates are roughly in the middle of January, April, June, and September.",
      },
      {
        q: "What should I know about the first year they go?",
        a: "They earn good money, spend it, file in April, and get hit with a tax bill plus a penalty for not paying along the way. It feels unfair until you realize employees were paying all year through withholding. The quarterly system is just the self-employed version of the same thing. There are exceptions and ways out.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "how-are-capital-gains-taxed",
    title: "How are capital gains taxed?",
    metaTitle: "How are capital gains taxed?",
    description: "Short-term vs long-term capital gains rates, how the holding period works, and the general concepts every investor should know.",
    keyword: "capital gains",
    eyebrow: "Taxes, explained",
    lede: "When you sell an investment for more than you paid, the profit is a capital gain. When you sell for less, it is a capital loss. Simple enough.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "When you sell an investment for more than you paid, the profit is a capital gain. When you sell for less, it is a capital loss. Simple enough. But the tax code treats those gains very differently depending on one thing: how long you held the investment. That holding period is one of the highest-leverage details in investing, and a lot of people learn about it the expensive way. Here is the split. Sell something you held for one year or less, and the gain is short-term. Short-term gains are taxed like ordinary income, meaning at the same rates as your wages. Whatever your marginal tax bracket is, that is roughly what you pay on a short-term gain.",
    sections: [
      {
        h2: "Hold it for more than one year, and the gain is long-term",
        blocks: [
          p("Long-term gains get their own separate, lower tax rates. The long-term rates are set in tiers based on your income, and they top out well below the top ordinary income rate. I am not quoting the exact rates or income cutoffs here because they change. Check irs.gov for the current year. The point is structural: the code rewards patience with a lower rate."),
          p("The difference is not small. For someone in a higher bracket, the gap between the short-term rate and the long-term rate on the same gain can be enormous. Holding an investment for a year and a day instead of eleven months can cut the tax on the profit dramatically. That is not a trick. That is just how the brackets are built."),
        ],
      },
      {
        h2: "What counts as the purchase date gets interesting with dividend",
        blocks: [
          p("If you bought shares of the same stock at different times, each lot has its own holding period. Sell some shares, and which lot you sold determines whether the gain is short or long-term. Most brokers let you choose which lots to sell, and the default method might not be the one you want. If you have been reinvesting dividends for years, you own dozens of tiny lots with dozens of holding periods. This is worth five minutes in your broker's settings."),
          p("Now, what kinds of gains get these rates? Stocks, bonds, mutual funds, ETFs, real estate beyond your primary home, crypto, collectibles, business assets. The basic framework covers most investments. But there are carve-outs. Collectibles, like art, coins, and precious metals, have their own higher long-term rate. Depreciation recapture on real estate has its own rate. Your primary home gets a big exclusion if you lived there long enough, which is a separate rule entirely. The short-versus-long framework is the starting point, not the whole map."),
        ],
      },
      {
        h2: "Net investment income can add another layer",
        blocks: [
          p("Higher earners may owe an additional tax on investment income above a threshold, on top of the capital gains rates. It is a surtax with its own rules, and it applies to both short and long-term gains. Worth knowing it exists, even if most people never hit it."),
          p("A few practical takeaways. First, before you sell a winner, check the holding period. If you are a month away from the one-year mark and there is no urgent reason to sell, waiting can save real money. Second, in taxable accounts, prefer long-term. The whole buy-and-hold philosophy is not just about market returns. It is also a tax strategy. Third, retirement accounts do not care. Inside an IRA or 401(k), gains are not taxed year to year, so the holding period is irrelevant there. This entire discussion is about taxable brokerage accounts."),
        ],
      },
      {
        h2: "The bottom line: more than one year gets you the lower long-term",
        blocks: [
          p("This is general information, not tax advice. Rates, cutoffs, and special rules change, so check irs.gov for the current year, and talk to a tax professional about your investments."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the gain?",
        a: "Long-term gains get their own separate, lower tax rates. The long-term rates are set in tiers based on your income, and they top out well below the top ordinary income rate. I am not quoting the exact rates or income cutoffs here because they change. Check irs.gov for the current year.",
      },
      {
        q: "What counts as the purchase date gets interesting with dividend?",
        a: "If you bought shares of the same stock at different times, each lot has its own holding period. Sell some shares, and which lot you sold determines whether the gain is short or long-term. Most brokers let you choose which lots to sell, and the default method might not be the one you want.",
      },
      {
        q: "What is the bottom line: more than one year gets you the lower long-term?",
        a: "This is general information, not tax advice. Rates, cutoffs, and special rules change, so check irs.gov for the current year, and talk to a tax professional about your investments.",
      },
    ],
    sources: [
      { label: "Internal Revenue Service", href: "https://www.irs.gov/" },
    ],
    related: [
      { label: "How do tax deductions work?", href: "/answers/how-do-tax-deductions-work" },
      { label: "How do tax credits work?", href: "/answers/how-do-tax-credits-work" },
      { label: "How do I file taxes for the first time?", href: "/answers/how-do-i-file-taxes-for-the-first-time" },
    ],
    startHref: "/start?topic=taxes",
  },
  {
    slug: "what-is-a-target-date-fund",
    title: "What is a target date fund?",
    metaTitle: "What is a target date fund?",
    description: "A target date fund picks your investments and adjusts them as you age, so this guide explains how the glide path works and whether one fits your retirement",
    keyword: "target date fund",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "The Fund That Picks for You",
        blocks: [
          p("Open a 401(k) enrollment packet and you will probably see a list of funds with years in their names. Target Date 2045. Target Date 2055. Target Date 2060. These are target date funds, and they are one of the most popular options in workplace retirement plans."),
        ],
      },
      {
        h2: "What the Year in the Name Means",
        blocks: [
          p("The year is the “target date,” the approximate year the investor plans to retire or start withdrawing money. If you are 25 in 2026 and plan to retire around age 65, that puts your retirement near 2066. The 2060 or 2065 fund would be the closest match."),
        ],
      },
      {
        h2: "The Glide Path: How the Mix Changes",
        blocks: [
          p("The defining feature of a target date fund is the glide path. That is the schedule the fund follows to shift from aggressive to conservative over time."),
          p("Early on, when retirement is decades away, the fund holds mostly stocks. Stocks are more volatile, but they have higher long term growth potential, and a young investor has time to ride out the rough years."),
        ],
      },
      {
        h2: "What Is Inside a Target Date Fund",
        blocks: [
          p("Most target date funds are funds of funds. They do not buy individual stocks and bonds. They buy shares of other funds, usually index funds run by the same company: a U.S. stock index fund, an international stock fund, a bond fund, and sometimes others."),
          p("That gives you instant diversification across thousands of companies and many bonds in a single holding. One fund, one contribution, and your money spreads across the market."),
        ],
      },
      {
        h2: "The Pros",
        blocks: [
          p("Simplicity is the big one. You make one choice and the fund manages your allocation for decades. For most people, that is worth a lot."),
          p("Diversification comes built in. Instead of guessing which three funds to combine, you get a professionally designed mix in one step."),
        ],
      },
      {
        h2: "The Cons",
        blocks: [
          p("A target date fund is designed for an average investor. You are not average. Your risk tolerance, other accounts, income, and debts are your own. The fund does not know about any of them."),
          p("If you also have a Roth IRA, an old 401(k), or a taxable account, the target date fund only sees itself. Your overall allocation across all accounts might end up very different from what you intend. The fund cannot coordinate with money it cannot see."),
        ],
      },
      {
        h2: "How to Pick One (If You Decide To)",
        blocks: [
          p("First, find the fund whose target year is closest to your planned retirement. Then look at two things: the expense ratio and the current mix of stocks and bonds."),
          p("Check the expense ratio on the fund company's site or your plan's fund list. Lower is generally better, since fees come straight out of your returns. If your plan offers target date funds from more than one company, compare the fees before you pick."),
        ],
      },
      {
        h2: "Who They Fit Best",
        blocks: [
          p("Target date funds fit beginners who want a reasonable default and will otherwise do nothing. A decent fund you actually contribute to beats a perfect allocation you never set up."),
          p("They also fit busy people who know they will not rebalance on their own. If the choice is between a target date fund and a random mix you picked once and forgot, the target date fund usually wins."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("A target date fund is the autopilot option for retirement investing. Pick the year, contribute regularly, and let the glide path handle the shifting mix as you age. Check the fees, know the mix, and consider your other accounts."),
          p("This is general educational information, not financial advice. Retirement choices depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What are the fund that picks for you?",
        a: "Open a 401(k) enrollment packet and you will probably see a list of funds with years in their names. Target Date 2045. Target Date 2055. Target Date 2060. These are target date funds, and they are one of the most popular options in workplace retirement plans.",
      },
      {
        q: "What do the year in the name mean?",
        a: "The year is the “target date,” the approximate year the investor plans to retire or start withdrawing money. If you are 25 in 2026 and plan to retire around age 65, that puts your retirement near 2066. The 2060 or 2065 fund would be the closest match. The year is a rough guide, not a rule.",
      },
      {
        q: "What are the glide path: how the mix changes?",
        a: "The defining feature of a target date fund is the glide path. That is the schedule the fund follows to shift from aggressive to conservative over time. Early on, when retirement is decades away, the fund holds mostly stocks.",
      },
      {
        q: "What is inside a target date fund?",
        a: "Most target date funds are funds of funds. They do not buy individual stocks and bonds. They buy shares of other funds, usually index funds run by the same company: a U.S. stock index fund, an international stock fund, a bond fund, and sometimes others.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "what-is-an-expense-ratio",
    title: "What is an expense ratio?",
    metaTitle: "What is an expense ratio?",
    description: "An expense ratio is the annual fee a fund charges, and even a small one compounds over decades, so here is what it means and how to find it.",
    keyword: "expense ratio",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "The Fee You Never See Billed",
        blocks: [
          p("Most fund fees never show up as a line on your statement. You do not get a bill. Nobody charges your card. The fee is taken silently out of the fund's returns before you ever see them."),
          p("That fee is called the expense ratio. It is the percentage of a fund's assets that goes to running the fund each year: paying the managers, the staff, the recordkeeping, the marketing. It is expressed as an annual percentage."),
        ],
      },
      {
        h2: "A Hypothetical Illustration",
        blocks: [
          p("Imagine two funds that each earn 7 percent a year before fees. One charges 0.10 percent. The other charges 1.00 percent. Same market returns, same starting amount."),
          p("After one year, the difference is less than one percentage point. Barely noticeable. After 30 years, it is not barely noticeable anymore."),
        ],
      },
      {
        h2: "Why This Matters More Than Picking Winners",
        blocks: [
          p("Here is the uncomfortable truth about fund performance: past winners often do not stay winners. A fund that beat the market for three years might trail it for the next five. Research on professional money managers consistently finds that most of them underperform simple market benchmarks over long periods."),
        ],
      },
      {
        h2: "Active Funds vs Index Funds on Cost",
        blocks: [
          p("Actively managed funds hire teams of analysts and managers to research companies and pick stocks they think will beat the market. All that research costs money, so active funds usually charge more."),
          p("Index funds skip the stock picking. They simply hold the stocks in a market index, like the S&P 500, in the same proportions. Less work means lower costs, so index funds usually charge much less."),
        ],
      },
      {
        h2: "What Counts as High or Low",
        blocks: [
          p("There is no official cutoff, but here is a rough sense of the landscape. Many broad stock index funds charge 0.10 percent or less per year. Many actively managed funds charge 0.75 percent to 1.25 percent or more. Specialty funds can charge even higher."),
          p("Context matters. An international small company fund will usually cost more than a U.S. large company index fund, because those markets are harder to operate in. Compare fees within the same category, not across completely different fund types."),
        ],
      },
      {
        h2: "How to Find a Fund's Expense Ratio",
        blocks: [
          p("It is easier than most people think. Every fund lists its expense ratio in a few standard places."),
          p("The fund company's website shows it on the fund's main page, usually near the top with the other key facts. Your 401(k) plan's fund list shows it for every option. The fund's prospectus lists it in the fee table near the front."),
          p("Search the fund name plus “expense ratio” and you will find it in seconds. If you cannot find it easily, that is a bad sign on its own."),
        ],
      },
      {
        h2: "Costs Beyond the Expense Ratio",
        blocks: [
          p("The expense ratio is the main recurring cost, but it is not the only one. Some funds charge sales loads, which are commissions taken when you buy or sell. A front end load takes a cut of every dollar you invest. A back end load takes a cut when you sell."),
          p("In a 401(k), loads are uncommon. In accounts a salesperson helped you open, they are more common. If you see share classes labeled A, B, or C, ask what the loads are."),
        ],
      },
      {
        h2: "What to Do With This",
        blocks: [
          p("You do not need to become a fee detective. You need one habit: before you buy any fund, look at the expense ratio and ask whether the fee is justified."),
          p("This is general educational information, not financial advice. Fund choices depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the fee you never see billed?",
        a: "Most fund fees never show up as a line on your statement. You do not get a bill. Nobody charges your card. The fee is taken silently out of the fund's returns before you ever see them. That fee is called the expense ratio.",
      },
      {
        q: "Why this matters more than picking winners?",
        a: "Here is the uncomfortable truth about fund performance: past winners often do not stay winners. A fund that beat the market for three years might trail it for the next five. Research on professional money managers consistently finds that most of them underperform simple market benchmarks over long periods.",
      },
      {
        q: "What counts as high or low?",
        a: "There is no official cutoff, but here is a rough sense of the landscape. Many broad stock index funds charge 0.10 percent or less per year. Many actively managed funds charge 0.75 percent to 1.25 percent or more. Specialty funds can charge even higher. Context matters. An international small company fund will usually cost more than a U.S.",
      },
      {
        q: "How do I find a fund's expense ratio?",
        a: "It is easier than most people think. Every fund lists its expense ratio in a few standard places. The fund company's website shows it on the fund's main page, usually near the top with the other key facts. Your 401(k) plan's fund list shows it for every option. The fund's prospectus lists it in the fee table near the front.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "should-i-dollar-cost-average-or-invest-a-lump-sum",
    title: "Should I dollar cost average or invest a lump sum?",
    metaTitle: "Should I dollar cost average or invest a lump sum?",
    description: "Should you invest a windfall all at once or spread it out? Here is how dollar cost averaging and lump sum investing work, plus the psychology behind the choice.",
    keyword: "dollar cost averaging vs lump sum",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "The Question Everyone Faces Eventually",
        blocks: [
          p("Sooner or later, most investors get a chunk of money all at once. A bonus. An inheritance. A tax refund. The sale of something. And then comes the question: do I invest it all right now, or do I spread it out over time?"),
        ],
      },
      {
        h2: "What Dollar Cost Averaging Means",
        blocks: [
          p("Dollar cost averaging means investing a fixed amount of money on a regular schedule, regardless of what the market is doing. Five hundred dollars on the first of every month. Two hundred from every paycheck. The amount stays the same. The schedule stays the same."),
        ],
      },
      {
        h2: "What Lump Sum Investing Means",
        blocks: [
          p("Lump sum investing means putting the entire amount to work at once. You get 10,000 dollars, you invest 10,000 dollars, today. No schedule, no installments."),
          p("The logic is simple. Markets tend to rise over long periods. Money invested earlier spends more time growing. Every month you wait is a month of potential growth you give up."),
        ],
      },
      {
        h2: "What the Research Tends to Show",
        blocks: [
          p("This is one of the rare investing questions with a fairly clear statistical answer. Long term studies tend to show that lump sum investing comes out ahead of dollar cost averaging most of the time."),
          p("The reason is not complicated. Markets go up more often than they go down. So on average, investing earlier beats investing later. Spreading purchases over twelve months means much of your money misses out on months of growth."),
        ],
      },
      {
        h2: "The Psychology: This Is Really About Regret",
        blocks: [
          p("Here is the honest version. The math favors lump sum. But investing is not just math. It is also about what you can live with."),
          p("Imagine you invest 50,000 dollars all at once and the market drops 15 percent over the next two months. You are down 7,500 dollars on paper. The math said this was the right call. Your stomach disagrees."),
        ],
      },
      {
        h2: "When Lump Sum Makes Sense",
        blocks: [
          p("Lump sum fits when you can genuinely handle the downside. If the market dropped 20 percent the month after you invested and you would shrug and keep holding, lump sum is probably right for you."),
          p("It also fits when the amount is small relative to your total savings. Investing a 2,000 dollar bonus all at once when you already have 100,000 invested is barely a decision. The new money is a drop in the bucket."),
        ],
      },
      {
        h2: "When Dollar Cost Averaging Makes Sense",
        blocks: [
          p("Dollar cost averaging fits when the amount is large relative to your net worth. A 100,000 dollar inheritance when you have 20,000 saved is a different decision than a small bonus. The stakes feel enormous because they are enormous to you."),
        ],
      },
      {
        h2: "The Hybrid Approach",
        blocks: [
          p("You do not have to pick a pure version. Plenty of investors split the difference: invest half now, spread the rest over the next several months."),
          p("This is not mathematically optimal. It is psychologically optimal for a lot of people. You get most of the time-in-market benefit while keeping the regret manageable. If the market drops, you still have dry powder and you feel clever. If it rises, most of your money participated."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Lump sum investing tends to win on the math. Dollar cost averaging tends to win on the sleep at night. The right choice is the one you can stick with through a bad stretch, because the strategy you abandon is always the worst strategy."),
          p("This is general educational information, not financial advice. Big investing decisions depend on your full situation, so talk to a qualified professional before making large moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the question everyone faces eventually?",
        a: "Sooner or later, most investors get a chunk of money all at once. A bonus. An inheritance. A tax refund. The sale of something. And then comes the question: do I invest it all right now, or do I spread it out over time? Both approaches have names. Investing it all at once is called lump sum investing.",
      },
      {
        q: "What do dollar cost averaging mean?",
        a: "Dollar cost averaging means investing a fixed amount of money on a regular schedule, regardless of what the market is doing. Five hundred dollars on the first of every month. Two hundred from every paycheck. The amount stays the same. The schedule stays the same. When prices are high, your fixed amount buys fewer shares.",
      },
      {
        q: "What do lump sum investing mean?",
        a: "Lump sum investing means putting the entire amount to work at once. You get 10,000 dollars, you invest 10,000 dollars, today. No schedule, no installments. The logic is simple. Markets tend to rise over long periods. Money invested earlier spends more time growing. Every month you wait is a month of potential growth you give up.",
      },
      {
        q: "What the research tends to show?",
        a: "This is one of the rare investing questions with a fairly clear statistical answer. Long term studies tend to show that lump sum investing comes out ahead of dollar cost averaging most of the time. The reason is not complicated. Markets go up more often than they go down. So on average, investing earlier beats investing later.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "how-do-bonds-work",
    title: "How do bonds work?",
    metaTitle: "How do bonds work?",
    description: "A bond is a loan you make to a government or company, so this guide covers how bonds work, why investors hold them, and what interest rate risk means.",
    keyword: "bonds basics",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Lending Money, Collecting Interest",
        blocks: [
          p("When you buy a stock, you buy ownership. When you buy a bond, you make a loan. A government or a company borrows your money, promises to pay you interest, and promises to return your original amount on a set date."),
          p("That is the whole idea. You are the lender. They are the borrower. The paperwork just looks fancier."),
          p("Bonds do not get the attention stocks do, because they are quieter. They do not double in a year. They also do not usually crater in a year. For many investors, that quiet is exactly the point."),
        ],
      },
      {
        h2: "The Key Terms, Plainly Explained",
        blocks: [
          p("Face value, also called par value, is the amount the borrower promises to repay you at the end. Most bonds are issued in 1,000 dollar increments. That is the number printed on the metaphorical IOU."),
          p("The coupon is the interest rate the bond pays, stated as a percentage of face value. A 1,000 dollar bond with a 4 percent coupon pays 40 dollars a year, usually split into two payments of 20 dollars every six months."),
        ],
      },
      {
        h2: "Why Investors Hold Bonds",
        blocks: [
          p("The first reason is income. Bonds pay regular interest on a schedule. Retirees and anyone who wants predictable cash flow like that steadiness."),
          p("The second reason is stability. Bond prices bounce around much less than stock prices. When stocks have a terrible year, high quality bonds often hold their value or even rise, because nervous investors move money toward safety. Not always, but often."),
        ],
      },
      {
        h2: "Interest Rate Risk: The Big One",
        blocks: [
          p("Here is the concept every bond investor needs to understand. When interest rates rise, existing bond prices fall. When interest rates fall, existing bond prices rise."),
          p("Why? Imagine you own a bond paying 3 percent. New bonds start paying 5 percent. Nobody wants your 3 percent bond at full price when they can get 5 percent elsewhere. So your bond's price drops until its yield looks competitive with the new bonds."),
        ],
      },
      {
        h2: "Credit Risk: Will They Pay You Back?",
        blocks: [
          p("The second major risk is credit risk, the chance the borrower cannot pay. Governments of stable countries almost always pay. Big healthy companies almost always pay. Struggling companies sometimes do not."),
          p("This is why bonds pay different interest rates. A U.S. Treasury bond pays less because repayment is extremely reliable. A bond from a shaky company pays more because investors demand extra return for the extra risk. Higher yield is not free money. It is compensation for risk."),
        ],
      },
      {
        h2: "Individual Bonds vs Bond Funds",
        blocks: [
          p("You can buy individual bonds or buy a bond fund that holds hundreds of them. Each has a place."),
          p("Individual bonds give you certainty of maturity. Buy a 10 year Treasury, hold ten years, get your money back. You know exactly what you will receive and when, assuming no default."),
          p("The downsides are diversification and minimums. Building a diversified bond portfolio one bond at a time takes a lot of money, and selling a single bond early can be awkward and costly."),
        ],
      },
      {
        h2: "Where Bonds Fit in a Portfolio",
        blocks: [
          p("Young investors with decades ahead often hold mostly stocks, with bonds as a small stabilizer. As retirement approaches, the bond share usually grows, because there is less time to recover from a stock crash."),
          p("A common starting framework is to hold your age in bonds as a rough guide, then adjust for your situation. This is a rule of thumb, not a rule. Your risk tolerance, job stability, and other income all matter."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("A bond is a loan that pays you interest and returns your money on a set date. Investors hold bonds for income, stability, and diversification. The main risks are interest rate risk, which moves prices when rates change, and credit risk, which is the chance the borrower does not pay."),
          p("Bonds will not make you rich quickly. That was never their job. Their job is to make the journey smoother and the income steadier, and they do it well."),
          p("This is general educational information, not financial advice. Investment choices depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "Why investors hold bonds?",
        a: "The first reason is income. Bonds pay regular interest on a schedule. Retirees and anyone who wants predictable cash flow like that steadiness. The second reason is stability. Bond prices bounce around much less than stock prices.",
      },
      {
        q: "Credit risk: will they pay you back?",
        a: "The second major risk is credit risk, the chance the borrower cannot pay. Governments of stable countries almost always pay. Big healthy companies almost always pay. Struggling companies sometimes do not. This is why bonds pay different interest rates. A U.S. Treasury bond pays less because repayment is extremely reliable.",
      },
      {
        q: "Where bonds fit in a portfolio?",
        a: "Young investors with decades ahead often hold mostly stocks, with bonds as a small stabilizer. As retirement approaches, the bond share usually grows, because there is less time to recover from a stock crash. A common starting framework is to hold your age in bonds as a rough guide, then adjust for your situation.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "how-do-i-rebalance-my-portfolio",
    title: "How do I rebalance my portfolio?",
    metaTitle: "How do I rebalance my portfolio?",
    description: "Rebalancing keeps your investments at the risk level you chose, so here is what it means, when to do it, and three simple methods that take minutes.",
    keyword: "rebalancing portfolio",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Your Portfolio Drifts Without You",
        blocks: [
          p("You set up your investments with a plan: 80 percent stocks, 20 percent bonds. Sensible for your age. Then you do not touch it for three years."),
          p("Stocks have a great run. Bonds plod along. You check your account and find you now hold 90 percent stocks and 10 percent bonds. You did not choose that. The market chose it for you."),
        ],
      },
      {
        h2: "Why It Matters",
        blocks: [
          p("The main reason is risk control. An 80/20 portfolio behaves very differently from a 90/10 portfolio. The drifted version is riskier than what you signed up for. If stocks then crash, you lose more than your plan allowed for."),
          p("Rebalancing puts a ceiling on that drift. It keeps your portfolio's risk level roughly where you decided it should be, instead of letting good years quietly turn you into a more aggressive investor than you intended."),
        ],
      },
      {
        h2: "When to Rebalance",
        blocks: [
          p("There are two main approaches, and both work."),
          p("Calendar rebalancing means you rebalance on a schedule: once a year, twice a year, whatever you pick. Annual rebalancing is the most common recommendation. It is simple, it is easy to remember, and it keeps trading to a minimum."),
          p("Threshold rebalancing, sometimes called band rebalancing, means you rebalance whenever an asset drifts too far from its target. A common band is 5 percentage points. If your stock target is 80 percent and stocks drift above 85 or below 75, you rebalance. Otherwise you leave it alone."),
        ],
      },
      {
        h2: "Three Simple Methods",
        blocks: [
          p("Method one: sell and buy. This is the direct approach. Sell enough of the overweight asset and use the proceeds to buy the underweight one until you hit your targets. In a 401(k) or IRA, this costs nothing in taxes. In a taxable account, selling can trigger capital gains taxes, so this method is best inside retirement accounts."),
          p("Method two: redirect new contributions. Instead of selling anything, point your new deposits at the lagging asset. If stocks are overweight, send your next few months of 401(k) contributions entirely to bonds until the mix is back in line."),
        ],
      },
      {
        h2: "A Hypothetical Example",
        blocks: [
          p("Say you start the year with 8,000 dollars in a stock fund and 2,000 in a bond fund. That is your 80/20 target on a 10,000 dollar portfolio."),
          p("Stocks have a great year and grow 25 percent. Bonds grow 5 percent. Now you have 10,000 in stocks and 2,100 in bonds, for a total of 12,100. Stocks are now about 83 percent of the portfolio. Close to target, but drifting."),
        ],
      },
      {
        h2: "Rebalancing and Taxes",
        blocks: [
          p("Inside retirement accounts like 401(k)s and IRAs, rebalancing is tax free. Sell and buy as much as you want. No tax forms, no consequences."),
          p("In a taxable brokerage account, selling an investment that gained value triggers capital gains tax. That does not mean you should never rebalance a taxable account. It means you should be thoughtful about it."),
        ],
      },
      {
        h2: "Common Mistakes",
        blocks: [
          p("The biggest mistake is never rebalancing at all. Set a calendar reminder. Annual is fine."),
          p("The second is rebalancing too often. Checking every week and trading on every wiggle racks up costs and taxes for no benefit. Once or twice a year is plenty."),
          p("The third is rebalancing into a panic. Rebalancing is a calm, scheduled activity. If the market is crashing and you feel sick, that is not the moment to redesign your targets. Stick to the plan you made when you were thinking clearly, or wait until you are thinking clearly again."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Rebalancing is maintenance, not excitement. Pick a target mix, check it once a year, and nudge it back in line with new contributions or a simple sell and buy. Inside retirement accounts it is easy and tax free."),
          p("This is general educational information, not financial advice. Portfolio decisions depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "Why do it matter?",
        a: "The main reason is risk control. An 80/20 portfolio behaves very differently from a 90/10 portfolio. The drifted version is riskier than what you signed up for. If stocks then crash, you lose more than your plan allowed for. Rebalancing puts a ceiling on that drift.",
      },
      {
        q: "When to rebalance?",
        a: "There are two main approaches, and both work. Calendar rebalancing means you rebalance on a schedule: once a year, twice a year, whatever you pick. Annual rebalancing is the most common recommendation. It is simple, it is easy to remember, and it keeps trading to a minimum.",
      },
      {
        q: "What should I know about rebalancing portfolio?",
        a: "You set up your investments with a plan: 80 percent stocks, 20 percent bonds. Sensible for your age. Then you do not touch it for three years. Stocks have a great run. Bonds plod along. You check your account and find you now hold 90 percent stocks and 10 percent bonds. You did not choose that. The market chose it for you.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "how-are-dividends-taxed",
    title: "How are dividends taxed?",
    metaTitle: "How are dividends taxed?",
    description: "Dividends are cash payments companies make to shareholders, so this guide explains how they work, what reinvestment does, and how dividend taxes work",
    keyword: "dividends explained",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Getting Paid to Own Something",
        blocks: [
          p("Buy a stock and there are two ways to make money. The price can go up, and you profit when you sell. Or the company can pay you cash while you hold it. That cash payment is a dividend."),
          p("A dividend is a slice of a company's profits, distributed to shareholders. It usually arrives as cash deposited into your brokerage account, often every quarter. You did nothing except own the stock on the right date. The money just shows up."),
        ],
      },
      {
        h2: "How Dividends Work, Step by Step",
        blocks: [
          p("A company's board of directors declares a dividend: an amount per share, and the dates that matter. There are three dates to know."),
          p("The declaration date is when the company announces the dividend. The ex-dividend date is the cutoff: you must own the stock before this date to receive the payment. Buy on or after the ex-dividend date and you miss this round. The payment date is when the cash actually lands in accounts."),
        ],
      },
      {
        h2: "Dividend Yield: The Key Number",
        blocks: [
          p("Dividend yield tells you how much income a stock pays relative to its price. The formula is simple: annual dividend per share divided by the stock price."),
          p("A stock paying 2 dollars a year in dividends with a 50 dollar share price has a 4 percent yield. The same 2 dollar dividend on a 100 dollar share price is a 2 percent yield. Same payment, different yield, because the price differs."),
        ],
      },
      {
        h2: "Reinvestment: The Quiet Compounding Machine",
        blocks: [
          p("When a dividend lands in your account, you have a choice: take the cash or reinvest it. Reinvesting means using the dividend to buy more shares automatically. Most brokerages offer this as a free setting called a dividend reinvestment plan, or DRIP."),
          p("Reinvestment is powerful because it compounds. Your dividends buy more shares. Those shares pay their own dividends. Those buy more shares. Over decades, a meaningful portion of a dividend investor's total return can come from reinvested dividends rather than price growth."),
          p("This is a general principle, not a promise about any specific stock. But the mechanics are real: reinvested cash buys assets that generate more cash."),
        ],
      },
      {
        h2: "Dividend Stocks vs Growth Stocks",
        blocks: [
          p("Dividend paying stocks and growth stocks are different flavors, not rivals. Growth stocks reinvest profits to expand, aiming for bigger price gains. Dividend stocks return profits to shareholders, aiming for steadier total returns with income along the way."),
          p("Growth stocks tend to be more volatile. Their value depends on future expectations, which swing with sentiment. Dividend stocks tend to be calmer, anchored by real cash payments. In market downturns, the dividend provides a cushion: you are still getting paid even when prices fall."),
        ],
      },
      {
        h2: "How Dividends Are Taxed: General Terms",
        blocks: [
          p("Taxes on dividends depend on the type of dividend and the type of account. Here is the general picture, not tax advice for your situation."),
          p("In a taxable brokerage account, dividends are taxable in the year you receive them, even if you reinvest them. Reinvesting does not make them tax free. The IRS treats the cash as income whether you spent it or bought more shares."),
          p("Dividends come in two tax flavors. Qualified dividends meet certain IRS holding period and company requirements, and they are taxed at the lower long term capital gains rates. Most dividends from established U.S. companies are qualified."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Dividends are cash payments from company profits to shareholders. You can take the cash or reinvest it, and reinvesting lets compounding do quiet work over decades. In taxable accounts, dividends are taxed in the year received, with qualified dividends generally getting better rates than ordinary ones."),
          p("They are a useful tool, not a magic one. Understand the yield, respect the risk of cuts, and judge every investment on total return."),
          p("This is general educational information, not financial advice and not tax advice. Tax rules depend on your situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "How are dividends taxed: general terms?",
        a: "Taxes on dividends depend on the type of dividend and the type of account. Here is the general picture, not tax advice for your situation. In a taxable brokerage account, dividends are taxable in the year you receive them, even if you reinvest them. Reinvesting does not make them tax free.",
      },
      {
        q: "What should I know about dividends explained?",
        a: "Buy a stock and there are two ways to make money. The price can go up, and you profit when you sell. Or the company can pay you cash while you hold it. That cash payment is a dividend. A dividend is a slice of a company's profits, distributed to shareholders.",
      },
      {
        q: "What should I know about dividend yield?",
        a: "Dividend yield tells you how much income a stock pays relative to its price. The formula is simple: annual dividend per share divided by the stock price. A stock paying 2 dollars a year in dividends with a 50 dollar share price has a 4 percent yield. The same 2 dollar dividend on a 100 dollar share price is a 2 percent yield.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "should-i-use-a-brokerage-account-or-a-retirement-account",
    title: "Should I use a brokerage account or a retirement account?",
    metaTitle: "Should I use a brokerage account or a retirement account?",
    description: "A brokerage account and a retirement account tax your investments very differently, so here is how each works and when to use which one.",
    keyword: "brokerage account vs retirement account",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Two Buckets, Different Tax Rules",
        blocks: [
          p("When you open an investment account, you are choosing a tax bucket. The investments inside can be similar, often identical. What differs is how the government taxes the growth."),
          p("A taxable brokerage account has no special tax treatment. You pay taxes as you go. A retirement account, like a 401(k) or IRA, gives you a tax break, either now or later, in exchange for rules about when you can touch the money."),
        ],
      },
      {
        h2: "The Taxable Brokerage Account",
        blocks: [
          p("A brokerage account is the plain vanilla option. You open it, deposit money, buy stocks, bonds, or funds. No contribution limits. No income limits. No age restrictions on withdrawals."),
        ],
      },
      {
        h2: "The 401(k): Tax Break Through Work",
        blocks: [
          p("A 401(k) is a retirement account offered by your employer. You contribute straight from your paycheck, often before you ever see the money, which makes saving automatic."),
          p("With a traditional 401(k), contributions reduce your taxable income this year. The money grows tax deferred, meaning no taxes on dividends or gains along the way. You pay ordinary income tax when you withdraw in retirement."),
        ],
      },
      {
        h2: "The IRA: Your Own Retirement Account",
        blocks: [
          p("An IRA, individual retirement arrangement, is a retirement account you open yourself, independent of any employer. It comes in the same two tax flavors."),
          p("A traditional IRA works like a traditional 401(k): deductible contributions for many people, tax deferred growth, taxed withdrawals in retirement. Deductibility phases out at higher incomes if you or your spouse has a workplace plan."),
        ],
      },
      {
        h2: "Side by Side",
        blocks: [
          p("Think of it this way. The brokerage account is flexible and taxed along the way. The traditional 401(k) and traditional IRA give you a tax break now and tax you later. The Roth versions tax you now and leave you alone later."),
        ],
      },
      {
        h2: "When to Use Each",
        blocks: [
          p("Use retirement accounts for retirement. That sounds obvious, but it is the whole point. Money you will not need until your sixties belongs in the accounts designed for exactly that, capturing every tax break available."),
          p("Use the brokerage account for everything sooner. A goal five or ten years out does not belong in a 401(k), because the penalties make early access expensive. House savings, career break funds, and general wealth building beyond retirement all live here."),
        ],
      },
      {
        h2: "A Common Funding Order",
        blocks: [
          p("There is a widely used priority order for investing new dollars. It is general guidance, not a personal prescription, but it reflects how the tax math usually works out."),
          p("First, contribute enough to your 401(k) to capture the full employer match. Turning down matching money is turning down an instant return that no investment can reliably beat."),
        ],
      },
      {
        h2: "Mistakes to Avoid",
        blocks: [
          p("The most expensive mistake is skipping the 401(k) match. If your employer offers one and you are not contributing enough to get it, fix that before anything else."),
          p("Another is putting short term money in retirement accounts. Cash you need in two years should not be locked behind age 59 and a half rules. Match the account to the timeline."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Brokerage accounts give you flexibility and tax you along the way. Retirement accounts give you tax breaks and restrict early access. Fund the match first, use Roth and traditional accounts for the long term money, and use the brokerage account for nearer goals and overflow."),
          p("This is general educational information, not financial advice and not tax advice. Account choices depend on your income, goals, and tax situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the taxable brokerage account?",
        a: "A brokerage account is the plain vanilla option. You open it, deposit money, buy stocks, bonds, or funds. No contribution limits. No income limits. No age restrictions on withdrawals. The trade is taxes. You owe tax on dividends and interest in the year you receive them. When you sell an investment for a profit, you owe capital gains tax.",
      },
      {
        q: "What is the 401(k): tax break through work?",
        a: "A 401(k) is a retirement account offered by your employer. You contribute straight from your paycheck, often before you ever see the money, which makes saving automatic. With a traditional 401(k), contributions reduce your taxable income this year. The money grows tax deferred, meaning no taxes on dividends or gains along the way.",
      },
      {
        q: "What is the IRA: your own retirement account?",
        a: "An IRA, individual retirement arrangement, is a retirement account you open yourself, independent of any employer. It comes in the same two tax flavors. A traditional IRA works like a traditional 401(k): deductible contributions for many people, tax deferred growth, taxed withdrawals in retirement.",
      },
      {
        q: "When to use each?",
        a: "Use retirement accounts for retirement. That sounds obvious, but it is the whole point. Money you will not need until your sixties belongs in the accounts designed for exactly that, capturing every tax break available. Use the brokerage account for everything sooner.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "index-funds-or-actively-managed-funds-which-is-better",
    title: "Index funds or actively managed funds: which is better?",
    metaTitle: "Index funds or actively managed funds: which is better?",
    description: "Index funds and actively managed funds take opposite approaches to beating the market, so here is what long term research tends to show about costs",
    keyword: "index funds vs actively managed funds",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Two Philosophies of Investing",
        blocks: [
          p("Every mutual fund and ETF follows one of two philosophies. Active funds hire professional managers to research companies, pick stocks, and try to beat the market. Index funds skip all of that and simply hold the stocks in a market index, matching the market instead of trying to beat it."),
          p("Active management sounds better. Who would not want a smart professional picking winners for them? But decades of evidence tell a humbling story, and it is worth understanding before you choose."),
        ],
      },
      {
        h2: "What Active Funds Promise",
        blocks: [
          p("An actively managed fund employs analysts and portfolio managers who study companies, meet executives, build models, and make judgments. The promise is skill: these experts will find undervalued stocks, avoid losers, and deliver returns above the market average."),
        ],
      },
      {
        h2: "What Index Funds Do Instead",
        blocks: [
          p("An index fund does not try to be smart. It holds every stock in an index, like the S&P 500, in the same proportions as the index. When the index changes, the fund changes. No research team, no predictions, no star manager."),
          p("The result is market performance, minus a tiny fee. If the market gains 8 percent and the fund charges 0.05 percent, you get roughly 7.95 percent. Boring, predictable, and cheap."),
        ],
      },
      {
        h2: "What the Long-Term Evidence Tends to Show",
        blocks: [
          p("Independent researchers have tracked active fund performance against benchmarks for decades. The best known of these scorecards is published regularly by S&P Dow Jones Indices under the name SPIVA. Its findings have been remarkably consistent over the years."),
          p("The broad pattern: over short periods, a decent share of active funds beats the market. Over longer periods, that share shrinks substantially. Measured across ten or fifteen years, the majority of actively managed funds in most categories underperform their benchmark index after fees."),
        ],
      },
      {
        h2: "Why Costs Explain Most of It",
        blocks: [
          p("Here is the least controversial part of the whole debate. Active funds charge more than index funds. That is not a judgment, it is arithmetic: research teams, trading, and marketing cost money."),
          p("Every year, an active fund starts behind by the difference in fees. To beat an index fund tracking the same market, the active manager must outperform by more than that fee gap, after all trading costs, year after year."),
        ],
      },
      {
        h2: "The Case Active Managers Still Make",
        blocks: [
          p("Active management is not defenseless, and a fair account should include its arguments."),
          p("In less efficient markets, skill may matter more. U.S. large company stocks are followed by thousands of analysts, and prices reflect available information quickly. Smaller companies, emerging markets, and certain bond markets get less attention, which may leave more room for skilled managers to find mispriced securities."),
        ],
      },
      {
        h2: "What This Means for Your Choices",
        blocks: [
          p("For the core of a long term portfolio, broad market index funds are the default recommendation of most independent financial educators, and the evidence is why. Low cost, diversified, and no reliance on picking a winning manager."),
        ],
      },
      {
        h2: "A Note on ETFs",
        blocks: [
          p("You will see both philosophies sold as ETFs as well as mutual funds. Most ETFs are index funds, but actively managed ETFs exist and are growing. The wrapper does not determine the philosophy. An active ETF has the same challenge as an active mutual fund: beating the market by more than its costs, consistently."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Active funds try to beat the market. Index funds settle for matching it at low cost. Long term research tends to show that most active funds trail their benchmarks after fees, mainly because fees are certain and outperformance is not."),
          p("This is general educational information, not financial advice. Fund choices depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What active funds promise?",
        a: "An actively managed fund employs analysts and portfolio managers who study companies, meet executives, build models, and make judgments. The promise is skill: these experts will find undervalued stocks, avoid losers, and deliver returns above the market average. Some of the time, some of them do.",
      },
      {
        q: "What index funds do instead?",
        a: "An index fund does not try to be smart. It holds every stock in an index, like the S&P 500, in the same proportions as the index. When the index changes, the fund changes. No research team, no predictions, no star manager. The result is market performance, minus a tiny fee.",
      },
      {
        q: "What the long-Term evidence tends to show?",
        a: "Independent researchers have tracked active fund performance against benchmarks for decades. The best known of these scorecards is published regularly by S&P Dow Jones Indices under the name SPIVA. Its findings have been remarkably consistent over the years.",
      },
      {
        q: "Why costs explain most of it?",
        a: "Here is the least controversial part of the whole debate. Active funds charge more than index funds. That is not a judgment, it is arithmetic: research teams, trading, and marketing cost money. Every year, an active fund starts behind by the difference in fees.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "what-is-the-difference-between-risk-tolerance-and-risk-capacity",
    title: "What is the difference between risk tolerance and risk capacity?",
    metaTitle: "What is the difference between risk tolerance and risk",
    description: "Risk tolerance is how you feel about market drops, risk capacity is what you can afford, so here is how they differ and how age and timeline factor in.",
    keyword: "risk tolerance vs risk capacity",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Two Questions That Sound Like One",
        blocks: [
          p("“How much risk should I take?” feels like a single question. It is actually two questions wearing a trench coat."),
          p("The first: how much risk can you stomach emotionally? That is risk tolerance. The second: how much risk can you afford financially? That is risk capacity. They often point in different directions, and the tension between them is where most investing mistakes live."),
          p("Understanding both, separately, leads to better decisions than mashing them into one gut feeling."),
        ],
      },
      {
        h2: "Risk Tolerance: The Emotional Side",
        blocks: [
          p("Risk tolerance is psychological. It is how you react when your investments fall. Some people see a 20 percent drop as a sale and buy more. Others see it as a catastrophe and sell everything at the worst moment."),
          p("Tolerance is personal and partly hardwired. It connects to your personality, your past experiences with money, and how much financial anxiety you carry generally. Two people with identical finances can have completely different tolerance levels."),
        ],
      },
      {
        h2: "Risk Capacity: The Financial Side",
        blocks: [
          p("Risk capacity is math, not mood. It is your financial ability to endure losses and still meet your goals. It depends on concrete facts about your life."),
          p("Time horizon is the biggest factor. Money you need in two years has almost no capacity for risk. A market crash next year would wreck the plan. Money you need in thirty years has enormous capacity. Even a brutal crash leaves decades for recovery."),
        ],
      },
      {
        h2: "How Age and Timeline Factor In",
        blocks: [
          p("Age is a rough proxy for capacity, not a rule. A 25 year old investing for retirement at 65 has forty years. That long horizon means high capacity: time smooths out volatility, and contributions during downturns buy shares cheaply."),
          p("A 60 year old five years from retirement has low capacity for the retirement money. A crash now means selling investments at depressed prices to fund living expenses, which can permanently damage the plan."),
        ],
      },
      {
        h2: "When Tolerance and Capacity Collide",
        blocks: [
          p("The interesting cases are the mismatches."),
          p("High capacity, low tolerance: the young professional with forty years ahead who panics at every dip. The math says be aggressive. The stomach says hide in cash. If this person forces an aggressive portfolio, they will likely sell in the next crash and lock in losses. The right move is a middle ground: enough growth exposure to meet long term goals, calm enough to hold through the bad years. Sometimes the best portfolio is the one you can keep."),
        ],
      },
      {
        h2: "How to Assess Yourself Honestly",
        blocks: [
          p("For capacity, list the facts. When do you need the money? How stable is your income? How big is your emergency fund? What other goals compete for these dollars? Write it down. Capacity is a worksheet, not a vibe."),
          p("For tolerance, look at your history. How did you react to the last market drop? Did you check your balance obsessively? Did you stop contributing? Did you sell? Past behavior is the best predictor you have."),
        ],
      },
      {
        h2: "What This Means in Practice",
        blocks: [
          p("Separate your money by goal, and assess each pool on its own. Your retirement account at age 30 can be aggressive. Your house fund for next year cannot. One person, two capacities, two allocations."),
          p("Revisit capacity when life changes, not when markets change. A new job, a new child, a health scare, an inheritance: these change your financial facts. A market dip does not change your capacity, though it may reveal your tolerance."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Risk tolerance is how you feel. Risk capacity is what your finances allow. Age and timeline drive capacity, but income stability, savings, and competing goals adjust it. When the two disagree, respect capacity's limits and find an allocation your tolerance can actually hold."),
          p("The goal was never maximum risk or minimum risk. It is the right risk: enough growth to reach your goals, calm enough to stay invested until you do."),
          p("This is general educational information, not financial advice. Risk decisions depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "When tolerance and capacity collide?",
        a: "The interesting cases are the mismatches. High capacity, low tolerance: the young professional with forty years ahead who panics at every dip. The math says be aggressive. The stomach says hide in cash. If this person forces an aggressive portfolio, they will likely sell in the next crash and lock in losses.",
      },
      {
        q: "How do I assess yourself honestly?",
        a: "For capacity, list the facts. When do you need the money? How stable is your income? How big is your emergency fund? What other goals compete for these dollars? Write it down. Capacity is a worksheet, not a vibe. For tolerance, look at your history. How did you react to the last market drop? Did you check your balance obsessively?",
      },
      {
        q: "What this means in practice?",
        a: "Separate your money by goal, and assess each pool on its own. Your retirement account at age 30 can be aggressive. Your house fund for next year cannot. One person, two capacities, two allocations. Revisit capacity when life changes, not when markets change.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "how-do-i-start-investing-with-100",
    title: "How do I start investing with $100?",
    metaTitle: "How do I start investing with $100?",
    description: "You do not need thousands to start investing, so here is how $100 can work through fractional shares, an employer match, and a Roth IRA, after the emergency",
    keyword: "how to start investing with $100",
    eyebrow: "Investing, explained",
    lede: "",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "",
    sections: [
      {
        h2: "Small Money Still Counts",
        blocks: [
          p("There is a persistent myth that investing requires a pile of cash. It does not. Brokerages now let you start with the cost of a dinner out, and the habits you build with 100 dollars are the same habits that manage 100,000 later."),
        ],
      },
      {
        h2: "Step Zero: The Emergency Fund Comes First",
        blocks: [
          p("Before investing a dime, make sure you have a small cash cushion. Investing while you have zero savings is fragile. The first surprise car repair forces you to sell investments at whatever price the market offers that day, possibly at a loss."),
        ],
      },
      {
        h2: "Priority One: Grab the Employer Match",
        blocks: [
          p("If your job offers a 401(k) with an employer match, contributing enough to get the full match beats everything else on this list. Many employers match 50 or 100 percent of your contributions up to a few percent of your salary."),
        ],
      },
      {
        h2: "The Roth IRA: Your Own Tax Advantaged Account",
        blocks: [
          p("No workplace plan, or want to invest beyond it? A Roth IRA is the account many beginners start with, and for good reason."),
          p("You contribute after tax dollars, money you have already paid tax on. Inside the account, your investments grow tax free, and qualified withdrawals in retirement are tax free too. Decades of growth with no tax bill at the end is a powerful deal."),
        ],
      },
      {
        h2: "Fractional Shares: Buy a Slice of Anything",
        blocks: [
          p("Here is the innovation that killed the “I don't have enough” excuse. Fractional shares let you buy a piece of a stock or fund for any dollar amount, even if one full share costs hundreds or thousands."),
          p("Want to own a company whose shares trade at 500 dollars? With 100 dollars, you buy one fifth of a share. Your returns match the stock's returns exactly, just scaled to your slice. Dividends arrive proportionally too."),
        ],
      },
      {
        h2: "Where to Put the $100",
        blocks: [
          p("For most beginners, a broad market index fund or ETF is the default worth considering. One purchase spreads your money across hundreds or thousands of companies. Costs are low. No stock picking required."),
          p("In a Roth IRA at a major brokerage, you can buy fractional shares of a total market or S&P 500 index ETF with your 100 dollars. Set dividends to reinvest automatically, so every payout buys more fractional shares without you lifting a finger."),
        ],
      },
      {
        h2: "Automate the Next $100",
        blocks: [
          p("The most important feature of your investing plan is not what you buy. It is whether the money shows up every month without a decision."),
          p("Set up an automatic transfer, 100 dollars, 50 dollars, 25 dollars, whatever fits, moving from checking to your investment account on payday."),
        ],
      },
      {
        h2: "What Not to Do With Your First $100",
        blocks: [
          p("Do not invest money you need soon. Rent due next month is not investing capital. The emergency fund rule exists for a reason."),
          p("Do not borrow to invest. Credit card debt at high interest while hoping investments grow is a losing trade in almost every scenario."),
        ],
      },
      {
        h2: "The Bottom Line",
        blocks: [
          p("Build a small emergency cushion first. Capture any employer 401(k) match, because it is the best return available. Open a Roth IRA for tax free long term growth. Use fractional shares to buy diversified index funds with whatever you have. Automate monthly contributions and increase them over time."),
          p("This is general educational information, not financial advice. Investment and account choices depend on your full situation, so talk to a qualified professional before making big moves."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the employer match?",
        a: "If your job offers a 401(k) with an employer match, contributing enough to get the full match beats everything else on this list. Many employers match 50 or 100 percent of your contributions up to a few percent of your salary. A 100 percent match is an instant 100 percent return on your contribution.",
      },
      {
        q: "What is the Roth IRA: your own tax advantaged account?",
        a: "No workplace plan, or want to invest beyond it? A Roth IRA is the account many beginners start with, and for good reason. You contribute after tax dollars, money you have already paid tax on. Inside the account, your investments grow tax free, and qualified withdrawals in retirement are tax free too.",
      },
      {
        q: "Where to put the $100?",
        a: "For most beginners, a broad market index fund or ETF is the default worth considering. One purchase spreads your money across hundreds or thousands of companies. Costs are low. No stock picking required. In a Roth IRA at a major brokerage, you can buy fractional shares of a total market or S&P 500 index ETF with your 100 dollars.",
      },
      {
        q: "What should I know about the next?",
        a: "The most important feature of your investing plan is not what you buy. It is whether the money shows up every month without a decision. Set up an automatic transfer, 100 dollars, 50 dollars, 25 dollars, whatever fits, moving from checking to your investment account on payday. This is dollar cost averaging in action.",
      },
    ],
    sources: [
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How do I start investing?", href: "/answers/how-do-i-start-investing" },
      { label: "What is an index fund?", href: "/answers/what-is-an-index-fund" },
      { label: "How does compound interest work?", href: "/answers/how-does-compound-interest-work" },
    ],
    startHref: "/start?topic=investing",
  },
  {
    slug: "social-security-when-should-you-claim-your-benefits",
    title: "Social Security: when should you claim your benefits?",
    metaTitle: "Social Security: when should you claim your benefits?",
    description: "Claiming Social Security at 62, full retirement age, or 70 changes your monthly check for life, so here is how the tradeoff works.",
    keyword: "when to claim social security",
    eyebrow: "Retirement, explained",
    lede: "You can start Social Security as early as 62. You can also wait until 70. Most people pick something in between.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "You can start Social Security as early as 62. You can also wait until 70. Most people pick something in between. That one decision shapes your monthly income for the rest of your life, so it is worth understanding before you file. This is general information, not financial advice. The rules change, and your situation is your own.",
    sections: [
      {
        h2: "The basic tradeoff",
        blocks: [
          p("Social Security rewards patience. Claim early and your monthly check is smaller, but you collect for more years. Wait and your monthly check is bigger, but you collect for fewer years."),
          p("Think of it as a seesaw. Early claiming gives you more checks at a lower amount. Late claiming gives you fewer checks at a higher amount. Your full retirement age sits in the middle and pays what the program calls your full benefit."),
        ],
      },
      {
        h2: "What happens when you claim at 62",
        blocks: [
          p("Sixty-two is the earliest age you can claim retirement benefits. Filing this early permanently reduces your monthly payment compared to what you would get at full retirement age. The reduction sticks around. It is not a temporary haircut."),
        ],
      },
      {
        h2: "What happens when you wait until 70",
        blocks: [
          p("Seventy is the latest age that matters for this decision. Every year you wait past your full retirement age, up to 70, your monthly benefit grows. After 70 there is no more growth from waiting, so there is no reason to delay past that point."),
        ],
      },
      {
        h2: "Full retirement age: the middle path",
        blocks: [
          p("Your full retirement age is set by law and depends on the year you were born. It is not 65 for most people anymore. Check ssa.gov for the exact age that applies to you."),
          p("Claiming at full retirement age gets you your full calculated benefit. No reduction, no bonus. For a lot of people this is the natural default, and there is nothing wrong with defaulting here if the details feel overwhelming."),
        ],
      },
      {
        h2: "The spousal angle",
        blocks: [
          p("Married couples get extra decisions. In general terms, a spouse may be able to claim a benefit based on the other spouse's work record. This matters when one spouse earned much more than the other, or when one spouse did not work much outside the home."),
        ],
      },
      {
        h2: "The break-even question everyone asks",
        blocks: [
          p("People love asking: at what age does waiting pay off? The idea is that there is some age where the bigger late checks finally overtake the head start of the early checks."),
          p("Here is the honest answer. Break-even math is real, but it pretends you know how long you will live. You do not. It also ignores taxes, spousal effects, and what the money means to you right now versus later."),
        ],
      },
      {
        h2: "What actually matters most",
        blocks: [
          p("Forget the calculators for a minute. The real inputs are boring and human."),
          p("How is your health? Do you need the money now? Are you still working and do you like it? Is your spouse counting on a survivor benefit? Do you have savings to bridge the gap if you wait?"),
        ],
      },
      {
        h2: "A simple way to think about it",
        blocks: [
          p("Claim early if you need income now or you have reason to think your timeline is short. Wait if you can afford to and you want the biggest guaranteed monthly check you can get. Land in the middle if you want simplicity."),
          p("This is general information, not financial advice. Social Security is one piece of a retirement plan, not the whole plan."),
        ],
      },
    ],
    faq: [
      {
        q: "What happens when you claim at 62?",
        a: "Sixty-two is the earliest age you can claim retirement benefits. Filing this early permanently reduces your monthly payment compared to what you would get at full retirement age. The reduction sticks around. It is not a temporary haircut. People claim at 62 for real reasons. They need the money. They lost a job and cannot find another.",
      },
      {
        q: "What happens when you wait until 70?",
        a: "Seventy is the latest age that matters for this decision. Every year you wait past your full retirement age, up to 70, your monthly benefit grows. After 70 there is no more growth from waiting, so there is no reason to delay past that point. Waiting works best for people who can afford to wait.",
      },
      {
        q: "What should I know about the middle path?",
        a: "Your full retirement age is set by law and depends on the year you were born. It is not 65 for most people anymore. Check ssa.gov for the exact age that applies to you. Claiming at full retirement age gets you your full calculated benefit. No reduction, no bonus.",
      },
      {
        q: "What is the spousal angle?",
        a: "Married couples get extra decisions. In general terms, a spouse may be able to claim a benefit based on the other spouse's work record. This matters when one spouse earned much more than the other, or when one spouse did not work much outside the home. Coordinating matters too.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-is-the-4-rule-for-retirement",
    title: "What is the 4% rule for retirement?",
    metaTitle: "What is the 4% rule for retirement?",
    description: "The 4% rule says you can withdraw 4% of your savings in year one of retirement and adjust for inflation after that. Here is where it came from and why critics",
    keyword: "4% rule retirement",
    eyebrow: "Retirement, explained",
    lede: "The 4% rule is the most famous guideline in retirement planning. It is also one of the most argued about.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "The 4% rule is the most famous guideline in retirement planning. It is also one of the most argued about. Here is what it actually says, where it came from, and why smart people disagree about it. This is general information, not financial advice.",
    sections: [
      {
        h2: "What the rule says",
        blocks: [
          p("The rule is simple. In your first year of retirement, withdraw 4% of your total portfolio. Every year after that, withdraw the same dollar amount adjusted for inflation."),
          p("So if you retire with a portfolio of a certain size, you take 4% of it in year one. In year two, you take that same amount plus a bump for inflation. You keep doing that year after year."),
          p("The claim behind the rule: this pace should make your money last through a long retirement, something like 30 years, in most historical market scenarios."),
        ],
      },
      {
        h2: "Where it came from",
        blocks: [
          p("The rule traces back to research published in the late 1990s, often called the Trinity study after the university where the researchers worked. They looked at decades of US stock and bond market history and tested different withdrawal rates against different mixes of stocks and bonds."),
        ],
      },
      {
        h2: "Why it became so popular",
        blocks: [
          p("Before this research, retirement withdrawal advice was mostly vibes. Spend conservatively. Do not touch principal. Hope for the best."),
          p("The 4% rule gave people a number. A number you can plan around. If you know your annual spending, you can work backward to a savings target. If you know your savings, you can work forward to a spending budget."),
          p("Financial independence communities especially loved it. It turned “when can I retire” into a math problem with an answer."),
        ],
      },
      {
        h2: "Why critics say it is too rigid",
        blocks: [
          p("Here is where the arguing starts. The rule assumes you withdraw the inflation-adjusted amount every single year, rain or shine, no matter what the market does. Real humans do not behave that way."),
          p("Critics make a few big points."),
          p("First, nobody actually follows it mechanically. When the market crashes 30%, most retirees cut back on spending without being told. When markets boom, they spend a little more. Real spending flexes. The rule pretends it does not."),
        ],
      },
      {
        h2: "The guardrails idea",
        blocks: [
          p("Some planners propose a middle ground. Start near 4%, but build in guardrails. If your portfolio drops a lot, trim spending for a while. If it grows a lot, give yourself a raise."),
          p("This keeps the simplicity of a starting number but adds the flexibility real life demands. It matches how people actually behave anyway."),
        ],
      },
      {
        h2: "What the rule is actually good for",
        blocks: [
          p("Here is the thing the critics sometimes miss. The 4% rule was never meant to be a law you follow blindly for 30 years. It is a planning tool. It answers “about how much do I need” and “about how much can I spend.”"),
          p("Used that way, it is genuinely useful. It turns a scary open-ended question into a rough target. Rough targets beat no targets."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("The 4% rule says start at 4% and adjust for inflation. It came from serious research on market history. Critics say it is too rigid because real spending flexes, history may not repeat, and it often leaves money on the table."),
          p("Both sides have a point. Use the rule to set your target. Then plan to adjust as real life happens, because real life always happens."),
          p("This is general information, not financial advice. A retirement spending plan should reflect your own savings, income sources, and tolerance for uncertainty."),
        ],
      },
    ],
    faq: [
      {
        q: "What the rule says?",
        a: "The rule is simple. In your first year of retirement, withdraw 4% of your total portfolio. Every year after that, withdraw the same dollar amount adjusted for inflation. So if you retire with a portfolio of a certain size, you take 4% of it in year one. In year two, you take that same amount plus a bump for inflation.",
      },
      {
        q: "Where it came from?",
        a: "The rule traces back to research published in the late 1990s, often called the Trinity study after the university where the researchers worked. They looked at decades of US stock and bond market history and tested different withdrawal rates against different mixes of stocks and bonds. They wanted to answer a plain question.",
      },
      {
        q: "Why it became so popular?",
        a: "Before this research, retirement withdrawal advice was mostly vibes. Spend conservatively. Do not touch principal. Hope for the best. The 4% rule gave people a number. A number you can plan around. If you know your annual spending, you can work backward to a savings target.",
      },
      {
        q: "Why critics say it is too rigid?",
        a: "Here is where the arguing starts. The rule assumes you withdraw the inflation-adjusted amount every single year, rain or shine, no matter what the market does. Real humans do not behave that way. Critics make a few big points. First, nobody actually follows it mechanically.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-are-required-minimum-distributions",
    title: "What are required minimum distributions?",
    metaTitle: "What are required minimum distributions?",
    description: "Required minimum distributions force withdrawals from tax-deferred retirement accounts starting at a certain age, with steep penalties for missing them. Here",
    keyword: "required minimum distributions",
    eyebrow: "Retirement, explained",
    lede: "You got a tax break when you put money into your 401(k) or traditional IRA. The IRS let that money grow for decades without taxing it.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "You got a tax break when you put money into your 401(k) or traditional IRA. The IRS let that money grow for decades without taxing it. Eventually, the deal comes due. That is what required minimum distributions are about. RMDs are the government's way of saying: you have deferred taxes long enough, start taking money out so we can tax it.",
    sections: [
      {
        h2: "What RMDs are",
        blocks: [
          p("This is general information, not financial advice. RMD ages and rules have changed before and can change again."),
          p("A required minimum distribution is the smallest amount you must withdraw each year from certain tax-deferred retirement accounts once you reach a certain age. The amount is calculated from your account balance and your life expectancy."),
          p("The key word is minimum. You can always take out more. You just cannot take out less."),
        ],
      },
      {
        h2: "When they start",
        blocks: [
          p("The starting age for RMDs has moved around over the years. Congress has raised it more than once, which tells you everything about how stable this number is."),
          p("In general terms, you must take your first RMD by a deadline in the year after you reach the starting age, and then every year after that. If you are still working for the employer that sponsors your 401(k), you may be able to delay RMDs from that plan until you actually retire. That exception does not apply to IRAs."),
        ],
      },
      {
        h2: "The penalty concept",
        blocks: [
          p("Miss an RMD, or take less than required, and the IRS can hit the shortfall with a penalty tax. This is not a slap on the wrist. Historically the penalty has been a large percentage of the amount you should have withdrawn but did not."),
          p("If you realize you missed one, fix it as fast as you can and talk to a tax professional about the correction process. Speed matters."),
        ],
      },
      {
        h2: "How the amount gets calculated",
        blocks: [
          p("Each year, you take your account balance as of the end of the previous year and divide it by a life expectancy factor the IRS publishes in tables. The result is your RMD for the year."),
          p("As you get older, the life expectancy factor shrinks, so the required withdrawal gets bigger relative to your balance. That is by design. The IRS wants the account drawn down over your lifetime, not passed along untouched."),
        ],
      },
      {
        h2: "Why RMDs mess with tax planning",
        blocks: [
          p("RMDs can push you into a higher tax bracket in retirement, which surprises people. You spent your working years deferring taxes, and now forced withdrawals land on top of your Social Security and any other income."),
          p("They can also affect other things tied to your income. Higher income in retirement can mean higher Medicare premiums through IRMAA, and more of your Social Security becoming taxable. One forced withdrawal ripples outward."),
        ],
      },
      {
        h2: "Common mistakes",
        blocks: [
          p("The biggest one is simply forgetting. People with several old 401(k)s scattered across former employers lose track. Consolidate or at least inventory every account well before RMD age."),
          p("Another is assuming the custodian will handle it. Some do calculate it for you and some even automate the withdrawal. Many do not. The legal responsibility is yours no matter what."),
        ],
      },
      {
        h2: "What to do now",
        blocks: [
          p("If RMDs are years away, the move is awareness. Know which of your accounts will be subject to them. Keep beneficiaries updated, because inherited account rules are their own maze."),
          p("If RMDs are close, get precise. Confirm the current starting age at irs.gov. List every affected account. Decide whether consolidating makes tracking easier. Talk through Roth conversion timing with a tax pro while you still have low-income years to use."),
          p("This is general information, not financial advice. Check irs.gov for the current RMD ages, tables, and penalty rules."),
        ],
      },
    ],
    faq: [
      {
        q: "What RMDs are?",
        a: "This is general information, not financial advice. RMD ages and rules have changed before and can change again. A required minimum distribution is the smallest amount you must withdraw each year from certain tax-deferred retirement accounts once you reach a certain age.",
      },
      {
        q: "When they start?",
        a: "The starting age for RMDs has moved around over the years. Congress has raised it more than once, which tells you everything about how stable this number is. In general terms, you must take your first RMD by a deadline in the year after you reach the starting age, and then every year after that.",
      },
      {
        q: "What is the penalty concept?",
        a: "Miss an RMD, or take less than required, and the IRS can hit the shortfall with a penalty tax. This is not a slap on the wrist. Historically the penalty has been a large percentage of the amount you should have withdrawn but did not.",
      },
      {
        q: "What should I know about the amount gets calculated?",
        a: "Each year, you take your account balance as of the end of the previous year and divide it by a life expectancy factor the IRS publishes in tables. The result is your RMD for the year. As you get older, the life expectancy factor shrinks, so the required withdrawal gets bigger relative to your balance. That is by design.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-is-a-backdoor-roth-ira",
    title: "What is a backdoor Roth IRA?",
    metaTitle: "What is a backdoor Roth IRA?",
    description: "Earn too much to contribute to a Roth IRA directly? The backdoor Roth, contribute to a traditional IRA then convert, is the workaround people use. Here",
    keyword: "backdoor roth ira",
    eyebrow: "Retirement, explained",
    lede: "Roth IRAs are great. Tax-free growth, tax-free withdrawals in retirement, no required distributions while you are alive.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Roth IRAs are great. Tax-free growth, tax-free withdrawals in retirement, no required distributions while you are alive. The catch is that high earners cannot contribute directly. There is an income limit, and above it the door shuts. The backdoor Roth is the workaround. It is legal, it is well known, and it has a trap in it called the pro-rata rule. Here is the whole concept.",
    sections: [
      {
        h2: "The income limit problem",
        blocks: [
          p("This is general information, not financial advice. Tax rules change, so verify current limits at irs.gov."),
          p("Direct Roth IRA contributions phase out above certain income levels. Below the range, you can contribute the full amount. Inside the range, your allowed contribution shrinks. Above it, you cannot contribute directly at all."),
          p("The exact numbers change year to year with inflation adjustments. Check irs.gov for the current year's limits before you assume anything. Plenty of people get surprised by a raise or a bonus pushing them over the line."),
        ],
      },
      {
        h2: "The backdoor concept in three steps",
        blocks: [
          p("Step one: contribute to a traditional IRA. There is no income limit on contributing to a traditional IRA. Anyone with earned income can put money in. You just might not get to deduct it, which is fine for this strategy. You actually want it to be nondeductible."),
          p("Step two: convert that traditional IRA money to a Roth IRA. There is no income limit on conversions either. Anyone can convert."),
        ],
      },
      {
        h2: "Why the timing matters",
        blocks: [
          p("Ideally you convert quickly, before the contribution has time to earn much. Here is why. The contribution itself was after-tax money, so converting the contribution is not a taxable event. But any earnings that pile up before you convert are pre-tax, and converting those means paying tax on them."),
        ],
      },
      {
        h2: "The pro-rata rule: the trap",
        blocks: [
          p("This is the part that bites people. The IRS does not let you cherry-pick which IRA dollars you convert. If you have other pre-tax money sitting in traditional, SEP, or SIMPLE IRAs, the pro-rata rule says your conversion is treated as coming proportionally from all of it."),
        ],
      },
      {
        h2: "How people deal with pro-rata",
        blocks: [
          p("The common fix is to get pre-tax IRA money out of the IRA universe before attempting the backdoor. Many employer 401(k) plans accept rollovers from IRAs. Move the pre-tax IRA balance into your current 401(k), and your IRA is left holding only the after-tax contribution. Then the conversion is clean."),
          p("This only works if your 401(k) accepts incoming rollovers and has decent investment options. Not all plans do. Check yours before counting on this."),
        ],
      },
      {
        h2: "Who the backdoor is for",
        blocks: [
          p("It is for people who earn too much for direct Roth contributions, have earned income, and do not have a big pre-tax IRA balance gumming up the pro-rata math. Or people willing to do the 401(k) rollover cleanup first."),
          p("Also note the step transaction idea some people worry about. Tax professionals have debated whether doing the contribution and conversion as rapid back-to-back steps could be challenged. The strategy is widely used and the IRS has never shut it down, but this is one more reason to keep clean records and talk to a tax pro."),
        ],
      },
      {
        h2: "Keep it clean",
        blocks: [
          p("File the right forms. Nondeductible traditional IRA contributions get reported on Form 8606, which tracks your after-tax basis so you are not taxed twice. Miss the form and you create a paperwork mess that can take years to untangle."),
          p("This is general information, not financial advice. Check irs.gov for current income limits and contribution caps, and talk to a tax professional about the pro-rata rule before you convert."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the income limit problem?",
        a: "This is general information, not financial advice. Tax rules change, so verify current limits at irs.gov. Direct Roth IRA contributions phase out above certain income levels. Below the range, you can contribute the full amount. Inside the range, your allowed contribution shrinks. Above it, you cannot contribute directly at all.",
      },
      {
        q: "What is the backdoor concept in three steps?",
        a: "Step one: contribute to a traditional IRA. There is no income limit on contributing to a traditional IRA. Anyone with earned income can put money in. You just might not get to deduct it, which is fine for this strategy. You actually want it to be nondeductible. Step two: convert that traditional IRA money to a Roth IRA.",
      },
      {
        q: "Why do the timing matter?",
        a: "Ideally you convert quickly, before the contribution has time to earn much. Here is why. The contribution itself was after-tax money, so converting the contribution is not a taxable event. But any earnings that pile up before you convert are pre-tax, and converting those means paying tax on them.",
      },
      {
        q: "What is the pro-rata rule: the trap?",
        a: "This is the part that bites people. The IRS does not let you cherry-pick which IRA dollars you convert. If you have other pre-tax money sitting in traditional, SEP, or SIMPLE IRAs, the pro-rata rule says your conversion is treated as coming proportionally from all of it.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "should-i-take-a-401k-loan",
    title: "Should I take a 401(k) loan?",
    metaTitle: "Should I take a 401(k) loan?",
    description: "A 401(k) loan lets you borrow from your own retirement savings, but the risks, job loss, opportunity cost, and double taxation, make it a move to understand",
    keyword: "401(k) loan",
    eyebrow: "Retirement, explained",
    lede: "Your 401(k) balance looks tempting when money gets tight. It is your money, sitting right there. A 401(k) loan lets you borrow from it.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Your 401(k) balance looks tempting when money gets tight. It is your money, sitting right there. A 401(k) loan lets you borrow from it. But “borrowing from yourself” is not as harmless as it sounds. This is general information, not financial advice.",
    sections: [
      {
        h2: "How a 401(k) loan works",
        blocks: [
          p("Not every plan offers loans, so first check whether yours does. If it does, the mechanics are straightforward."),
          p("You borrow from your own account balance, up to limits set by law and your plan. You pay the money back to your own account, with interest, through payroll deductions, usually over five years. The interest goes back into your account, not to a bank."),
          p("There is no credit check. There is no lender judging your application. That ease is part of the appeal and part of the danger."),
        ],
      },
      {
        h2: "The double taxation concept",
        blocks: [
          p("Here is the subtle cost people miss. You repay a 401(k) loan with after-tax dollars from your paycheck. Those dollars go back into your pre-tax account. Then when you withdraw that money in retirement, you pay income tax on it again."),
          p("Follow the trail. You earn a dollar, pay tax on it, use it to repay the loan, it lands in your 401(k), and years later you pay tax on it when you withdraw it. The same economic dollar gets taxed twice."),
        ],
      },
      {
        h2: "The job loss risk",
        blocks: [
          p("This is the big one. If you leave your job, voluntarily or not, while a loan is outstanding, most plans require you to repay the remaining balance quickly, often within a short window after separation."),
          p("Lose your job and suddenly owe a lump sum back to your 401(k)? That is brutal timing. The loan comes due at the exact moment your income disappears."),
        ],
      },
      {
        h2: "The opportunity cost",
        blocks: [
          p("While your money is out on loan to you, it is not invested. In a rising market, that is growth you will never get back. The interest you pay yourself is almost never as much as the market returns you missed."),
          p("People underestimate this because it is invisible. There is no statement line that says “growth you missed: $X.” But the math is relentless. Money pulled out in your 30s or 40s misses decades of compounding."),
        ],
      },
      {
        h2: "When people take them anyway",
        blocks: [
          p("Life happens. People borrow from 401(k)s to stop a foreclosure, cover medical bills, or avoid truly terrible debt. Sometimes the 401(k) loan really is the least bad option on the table."),
          p("If you are considering one, be honest about which situation you are in. “Least bad option in a crisis” is very different from “easy money for a kitchen remodel.” The first can be defensible. The second is your future self paying for your present self's impatience."),
        ],
      },
      {
        h2: "If you do take one",
        blocks: [
          p("Borrow the minimum you actually need, not the maximum allowed. Pay it back as fast as your plan permits. Keep contributing to the 401(k) while you repay if you possibly can, because pausing contributions stacks a second loss on top of the loan."),
          p("And have a plan for job loss. Know your plan's repayment deadline after separation before you borrow. If you are in an unstable job or industry, that deadline should scare you straight."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("A 401(k) loan is easy to get and expensive in ways that do not show up on the paperwork. Double taxation on repayments. A repayment bomb if you lose your job. Years of missed growth."),
          p("Your 401(k) is not a savings account and not an emergency fund. Treat it like what it is: money your future self is counting on."),
          p("This is general information, not financial advice. Check your plan's loan rules and talk through alternatives before borrowing from retirement savings."),
        ],
      },
    ],
    faq: [
      {
        q: "How does a 401(k) loan work?",
        a: "Not every plan offers loans, so first check whether yours does. If it does, the mechanics are straightforward. You borrow from your own account balance, up to limits set by law and your plan. You pay the money back to your own account, with interest, through payroll deductions, usually over five years.",
      },
      {
        q: "What is the double taxation concept?",
        a: "Here is the subtle cost people miss. You repay a 401(k) loan with after-tax dollars from your paycheck. Those dollars go back into your pre-tax account. Then when you withdraw that money in retirement, you pay income tax on it again. Follow the trail.",
      },
      {
        q: "What is the job loss risk?",
        a: "This is the big one. If you leave your job, voluntarily or not, while a loan is outstanding, most plans require you to repay the remaining balance quickly, often within a short window after separation. Lose your job and suddenly owe a lump sum back to your 401(k)? That is brutal timing.",
      },
      {
        q: "What is the opportunity cost?",
        a: "While your money is out on loan to you, it is not invested. In a rising market, that is growth you will never get back. The interest you pay yourself is almost never as much as the market returns you missed. People underestimate this because it is invisible.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-are-catch-up-contributions-after-50",
    title: "What are catch-up contributions after 50?",
    metaTitle: "What are catch-up contributions after 50?",
    description: "Once you turn 50, the IRS lets you contribute extra to your 401(k) and IRA beyond the normal limits. Here is the concept and why it exists.",
    keyword: "catch-up contributions",
    eyebrow: "Retirement, explained",
    lede: "Turning 50 comes with a perk nobody tells you about at the birthday party.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Turning 50 comes with a perk nobody tells you about at the birthday party. The IRS lets you put extra money into your retirement accounts beyond the normal annual limits. These are called catch-up contributions, and they exist for a simple reason: a lot of people reach 50 behind on savings. This is general information, not financial advice. Limits change yearly, so check irs.gov for the current numbers.",
    sections: [
      {
        h2: "The concept",
        blocks: [
          p("Every year the IRS sets a maximum you can contribute to tax-advantaged retirement accounts. For 401(k)s there is one limit. For IRAs there is a lower one. These caps apply to everyone."),
          p("Once you hit 50, you get an additional allowance on top. It is extra room, stacked on the regular limit, available only to people 50 and older. You do not need to prove you are behind. You do not need to apply. You just need to be 50 or older during the calendar year."),
        ],
      },
      {
        h2: "Why they exist",
        blocks: [
          p("Congress created catch-up contributions because the data told an uncomfortable story. Many workers spend their 30s and 40s saving too little. Kids, mortgages, career changes, and life in general eat the money that was supposed to go to retirement."),
          p("Then people hit their 50s, the kids get older, earnings often peak, and suddenly there is cash flow and a clear view of the finish line. Catch-up contributions let those peak earning years do more heavy lifting."),
        ],
      },
      {
        h2: "Which accounts allow them",
        blocks: [
          p("The big ones are 401(k)s and similar employer plans, and traditional and Roth IRAs. Both types of accounts have their own catch-up amounts, and the 401(k) catch-up is substantially larger than the IRA one, which makes sense given the higher base limits."),
          p("If you have both a 401(k) and an IRA, you can use the catch-up on both. They are separate allowances. Maxing the regular limits plus both catch-ups in your 50s and 60s can move the needle in a serious way."),
        ],
      },
      {
        h2: "Why your 50s and 60s are powerful saving years",
        blocks: [
          p("Three things tend to line up. Earnings are often at their career peak. Big expenses like kids' college or the mortgage may be winding down. And every dollar saved has fewer years to grow, which sounds bad, but it also means every dollar is closer to being spent, so the saving feels more concrete and urgent."),
        ],
      },
      {
        h2: "The mistake to avoid",
        blocks: [
          p("The worst use of catch-up eligibility is treating it as permission to stay behind. “I will catch up later” becomes “I never caught up.” The extra room helps, but it cannot fully replace decades of missed compounding."),
          p("The second mistake is more subtle: ramping up savings but also ramping up lifestyle spending at the same time. Peak earning years tempt peak spending. Every lifestyle upgrade in your 50s is money that is not catching up anything."),
        ],
      },
      {
        h2: "A special note on timing",
        blocks: [
          p("Eligibility is based on turning 50 during the calendar year, not on your birthday having passed. If you turn 50 in December, you can use the catch-up for the whole year. Do not wait until after the birthday to start."),
        ],
      },
      {
        h2: "What to do with this",
        blocks: [
          p("If you are 50 or older and not maxing your regular limits yet, the catch-up is step two. Step one is getting the full employer match, always. Step two is the regular max. Step three is the catch-up."),
          p("If you are under 50, file this away. Your future self gets extra room. Your present self's job is to need as little catching up as possible."),
          p("This is general information, not financial advice. Your plan administrator can confirm your catch-up eligibility and how to elect it."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the concept?",
        a: "Every year the IRS sets a maximum you can contribute to tax-advantaged retirement accounts. For 401(k)s there is one limit. For IRAs there is a lower one. These caps apply to everyone. Once you hit 50, you get an additional allowance on top. It is extra room, stacked on the regular limit, available only to people 50 and older.",
      },
      {
        q: "Why they exist?",
        a: "Congress created catch-up contributions because the data told an uncomfortable story. Many workers spend their 30s and 40s saving too little. Kids, mortgages, career changes, and life in general eat the money that was supposed to go to retirement.",
      },
      {
        q: "Which accounts allow them?",
        a: "The big ones are 401(k)s and similar employer plans, and traditional and Roth IRAs. Both types of accounts have their own catch-up amounts, and the 401(k) catch-up is substantially larger than the IRA one, which makes sense given the higher base limits. If you have both a 401(k) and an IRA, you can use the catch-up on both.",
      },
      {
        q: "Why your 50s and 60s are powerful saving years?",
        a: "Three things tend to line up. Earnings are often at their career peak. Big expenses like kids' college or the mortgage may be winding down. And every dollar saved has fewer years to grow, which sounds bad, but it also means every dollar is closer to being spent, so the saving feels more concrete and urgent.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "pension-or-401k-what-is-the-difference",
    title: "Pension or 401(k): what is the difference?",
    metaTitle: "Pension or 401(k): what is the difference?",
    description: "Pensions promised a monthly check for life. 401(k)s hand you an account and wish you luck. Here is what changed and what it means for your retirement.",
    keyword: "pension vs 401(k)",
    eyebrow: "Retirement, explained",
    lede: "Your grandfather retired with a pension. You will probably retire with a 401(k). Those are not just different accounts.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Your grandfather retired with a pension. You will probably retire with a 401(k). Those are not just different accounts. They are different philosophies about who bears the risk of retirement. Understanding the shift explains a lot about why retirement feels harder now. This is general information, not financial advice.",
    sections: [
      {
        h2: "The pension era",
        blocks: [
          p("For much of the 20th century, the standard deal at big American employers was the defined benefit pension. Work there long enough, and the company paid you a monthly check for the rest of your life after you retired."),
          p("The formula was usually based on your salary and your years of service. More years, higher pay, bigger check. Simple to understand. The company handled the investing, absorbed the market risk, and owed you the money no matter what the stock market did."),
        ],
      },
      {
        h2: "The 401(k) era",
        blocks: [
          p("The 401(k) is a defined contribution plan. The company, and usually you, contribute money into an account in your name. You choose the investments from a menu. What you get in retirement is whatever the account has grown to. No promises beyond that."),
          p("The risk moved from the employer to you. Market crash the year before you retire? Your problem. Live to 95? You need the money to stretch. Pick bad investments for 30 years? Nobody is bailing you out."),
        ],
      },
      {
        h2: "Why the shift happened",
        blocks: [
          p("A few forces piled up. Companies did not love carrying massive pension liabilities on their balance sheets, especially as life expectancies rose and made those promises more expensive. Accounting rule changes made the costs more visible. Global competition squeezed the margins that funded generous benefits."),
          p("The 401(k) itself was originally a tax code accident, a provision meant for profit-sharing that benefits consultants realized could work as a retirement savings vehicle. Employers liked it because costs were predictable: a match is a known expense, while a pension promise is an open-ended one."),
        ],
      },
      {
        h2: "What workers gained",
        blocks: [
          p("Portability is real. You are not chained to one employer for 30 years to earn your retirement. Your account is yours from early on, and vesting schedules for employer matches are much shorter than old pension vesting cliffs."),
          p("Control is real too. You decide how much to save, where to invest, and when to retire. Nobody's formula decides your life."),
        ],
      },
      {
        h2: "What workers lost",
        blocks: [
          p("Certainty. A pension was a promise. A 401(k) is a possibility. That psychological difference matters more than the finance textbooks admit."),
          p("Most people are not investors. Asking every worker to become their own pension manager, picking funds and rebalancing for 40 years, was optimistic. Many people contribute too little, invest too conservatively or too aggressively, raid the account when money gets tight, or freeze during crashes."),
        ],
      },
      {
        h2: "The hybrid reality",
        blocks: [
          p("Here is what actually exists now. Social Security functions as everyone's base layer pension, a defined benefit from the government. On top of that, most private-sector workers have defined contribution accounts they manage themselves. Public-sector workers, military, and some union members still have real pensions."),
          p("So the modern retirement is a stack: Social Security at the bottom, personal savings in the middle, and whatever else you build on top. Nobody hands you the full package anymore. You assemble it."),
        ],
      },
      {
        h2: "What this means for you",
        blocks: [
          p("You are your own pension manager now. That means saving early, capturing the full employer match, keeping fees low, and not raiding the account. Boring stuff. It also means planning for a long life, because the check does not come automatically anymore."),
          p("This is general information, not financial advice. Your employer's plan documents spell out exactly what type of plan you have and what it promises."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the pension era?",
        a: "For much of the 20th century, the standard deal at big American employers was the defined benefit pension. Work there long enough, and the company paid you a monthly check for the rest of your life after you retired. The formula was usually based on your salary and your years of service. More years, higher pay, bigger check.",
      },
      {
        q: "What is the 401(k) era?",
        a: "The 401(k) is a defined contribution plan. The company, and usually you, contribute money into an account in your name. You choose the investments from a menu. What you get in retirement is whatever the account has grown to. No promises beyond that. The risk moved from the employer to you. Market crash the year before you retire?",
      },
      {
        q: "Why the shift happened?",
        a: "A few forces piled up. Companies did not love carrying massive pension liabilities on their balance sheets, especially as life expectancies rose and made those promises more expensive. Accounting rule changes made the costs more visible. Global competition squeezed the margins that funded generous benefits.",
      },
      {
        q: "What workers gained?",
        a: "Portability is real. You are not chained to one employer for 30 years to earn your retirement. Your account is yours from early on, and vesting schedules for employer matches are much shorter than old pension vesting cliffs. Control is real too. You decide how much to save, where to invest, and when to retire.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "how-much-do-you-actually-need-to-retire",
    title: "How much do you actually need to retire?",
    metaTitle: "How much do you actually need to retire?",
    description: "There is no single magic number for retirement. Here is how income replacement works, why rules of thumb are only starting points, and what changes your number.",
    keyword: "how much to retire",
    eyebrow: "Retirement, explained",
    lede: "Everyone wants the number. The one figure that means “you can retire now.” It does not exist, or rather, it exists but it is different for everyone.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Everyone wants the number. The one figure that means “you can retire now.” It does not exist, or rather, it exists but it is different for everyone. Here is how to think about it honestly. This is general information, not financial advice.",
    sections: [
      {
        h2: "The income replacement concept",
        blocks: [
          p("Retirement planning usually starts with a question: what share of your pre-retirement income will you need to maintain your lifestyle? That share is called the income replacement ratio."),
          p("The logic is simple. In retirement, some costs disappear. You are not saving for retirement anymore, which alone frees up a chunk of your income. You are not paying payroll taxes on earnings you no longer have. The mortgage might be gone. The kids might be launched. Work costs like commuting and wardrobes vanish."),
          p("But other costs appear or grow. Health care typically rises. You might travel more, at least early on. Hobbies cost money. And inflation keeps nibbling for decades."),
        ],
      },
      {
        h2: "Why rules of thumb are starting points",
        blocks: [
          p("You will hear tidy rules. Save some multiple of your salary by certain ages. Aim to replace some percentage of your income. These are fine as conversation starters. They are dangerous as finish lines."),
          p("Rules of thumb assume an average life. Nobody lives an average life. They assume average spending, average health, average housing, average everything. Your retirement has your house, your health, your debts, your plans."),
          p("A rule of thumb also cannot see your income sources. Two people with identical savings can have wildly different retirements if one has a pension and the other does not. Social Security benefits vary enormously. A paid-off house changes everything."),
        ],
      },
      {
        h2: "Factors that change the number",
        blocks: [
          p("Start with housing. It is most people's biggest expense. Retiring with a paid-off house versus retiring with 20 years of mortgage payments left is a completely different financial life. Same for renters in high-cost cities versus owners in cheap ones."),
          p("Health is next. A healthy 65-year-old and a 65-year-old with chronic conditions face different cost trajectories. Long-term care is the wildcard that breaks plans. Most people do not plan for it. Most plans that fail, fail because of it."),
        ],
      },
      {
        h2: "The spending-first approach",
        blocks: [
          p("Forget income multiples for a minute. Try this instead."),
          p("Track your actual spending for a year. All of it. Then adjust: subtract costs that will disappear in retirement, add costs that will appear, and pad health care generously."),
          p("That gives you an annual spending target. Subtract the reliable income you expect, like Social Security and any pension. The gap is what your savings need to cover, year after year, adjusted for inflation, for the rest of your life."),
          p("This method is more work than a rule of thumb. It is also the only method that uses your actual life as the input."),
        ],
      },
      {
        h2: "The moving target problem",
        blocks: [
          p("Here is what nobody tells you. The number moves. Markets move it. Inflation moves it. Health events move it. A divorce, a late-life kid's emergency, a parent who needs care, all of it moves the number."),
          p("So the goal is not to compute a perfect figure once and relax. The goal is to build a plan with margin. Save more than the rule says. Spend a little less than you can. Keep options open, like the ability to work part-time or downsize the house."),
          p("Margin is the real retirement strategy. The number is just margin expressed as a figure."),
        ],
      },
      {
        h2: "A sane way to use all this",
        blocks: [
          p("Pick a rule of thumb to get a rough target. Then do the spending-first math to refine it. Then add margin for the things you cannot predict. Revisit every few years, because your life at 45 is not your life at 60."),
          p("This is general information, not financial advice. A retirement plan built on your actual spending beats any rule of thumb."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the income replacement concept?",
        a: "Retirement planning usually starts with a question: what share of your pre-retirement income will you need to maintain your lifestyle? That share is called the income replacement ratio. The logic is simple. In retirement, some costs disappear. You are not saving for retirement anymore, which alone frees up a chunk of your income.",
      },
      {
        q: "Why rules of thumb are starting points?",
        a: "You will hear tidy rules. Save some multiple of your salary by certain ages. Aim to replace some percentage of your income. These are fine as conversation starters. They are dangerous as finish lines. Rules of thumb assume an average life. Nobody lives an average life.",
      },
      {
        q: "What should I know about the number?",
        a: "Start with housing. It is most people's biggest expense. Retiring with a paid-off house versus retiring with 20 years of mortgage payments left is a completely different financial life. Same for renters in high-cost cities versus owners in cheap ones. Health is next.",
      },
      {
        q: "What is the spending-first approach?",
        a: "Forget income multiples for a minute. Try this instead. Track your actual spending for a year. All of it. Then adjust: subtract costs that will disappear in retirement, add costs that will appear, and pad health care generously. That gives you an annual spending target.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-is-sequence-of-returns-risk",
    title: "What is sequence of returns risk?",
    metaTitle: "What is sequence of returns risk?",
    description: "Two retirees can earn the same average returns and end up with totally different outcomes. Sequence of returns risk explains why the order of market gains",
    keyword: "sequence of returns risk",
    eyebrow: "Retirement, explained",
    lede: "Here is a strange fact about retirement.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Here is a strange fact about retirement. Two people can retire with the same savings, earn the same average annual return over 30 years, and end up in completely different places. One dies rich. The other runs out of money. The difference is not how much the market returned. It is when. This is general information, not financial advice.",
    sections: [
      {
        h2: "What it is",
        blocks: [
          p("Sequence of returns risk is the danger that bad market returns arrive early in your retirement, when your portfolio is at its largest and you are withdrawing from it."),
          p("While you are working and saving, market order barely matters. A crash at 35 is a sale on stocks you keep buying. You recover because you are adding money, not taking it out."),
          p("In retirement the math flips. You are withdrawing every year. If the market drops hard in your first few retired years, you are selling investments at depressed prices to fund your living expenses. Those shares are gone. They cannot participate in the recovery."),
          p("Same average return, different order, different ending. That is the whole concept."),
        ],
      },
      {
        h2: "Why early-retirement drops hurt more",
        blocks: [
          p("Think of it as reverse dollar-cost averaging. When you were saving, regular contributions bought more shares when prices were low. That helped you. In retirement, regular withdrawals sell more shares when prices are low. That hurts you."),
          p("A 30% drop on a million-dollar portfolio that you are also drawing from is devastating in a way the same drop is not for a worker. The worker waits. The retiree sells."),
          p("The damage compounds too. After a big early loss plus withdrawals, your portfolio needs an enormous recovery just to get back to even. And every year you keep withdrawing while waiting for that recovery, the hole gets deeper."),
        ],
      },
      {
        h2: "A simple illustration",
        blocks: [
          p("Imagine two retirees. Both start with the same amount and withdraw the same inflation-adjusted sum each year. One gets great returns in years one through five and terrible returns in years 25 through 30. The other gets the exact reverse: terrible first, great last."),
          p("The average return across 30 years is identical for both. But the retiree who got hit early is in far worse shape, possibly out of money entirely, while the one who got hit late is fine."),
          p("Nobody gets to choose their sequence. That is what makes it a risk rather than a planning input."),
        ],
      },
      {
        h2: "General mitigation concepts",
        blocks: [
          p("You cannot control the market. You can control how exposed your withdrawals are to it."),
          p("The most talked-about idea is keeping a cushion of safer money, often described as a bucket strategy. Hold a few years of spending in cash or short-term bonds. When stocks crash, spend from the cushion instead of selling stocks at the bottom. When stocks recover, refill the cushion."),
          p("Another concept is flexible spending. Instead of withdrawing a rigid inflation-adjusted amount every year no matter what, build in rules to trim spending after bad market years. Small temporary cuts early can add years of life to a portfolio."),
        ],
      },
      {
        h2: "What not to do",
        blocks: [
          p("Do not try to time it. Nobody knows when the bad sequence starts, and sitting in cash for years waiting for a crash that may not come is its own form of damage."),
          p("Do not panic-sell in the crash. Locking in losses by fleeing to cash at the bottom turns sequence risk from a threat into a certainty."),
          p("And do not assume a good first few years mean you are safe forever. The risk fades as the portfolio survives the early zone, but retirement is long and humility is a strategy."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Sequence of returns risk means when returns happen matters as much as what they average. Early-retirement market drops hurt because you are selling into them. The defenses are a cash cushion, flexible spending, more guaranteed income, sane allocation, and the option to keep earning a little longer."),
          p("You cannot pick your sequence. You can build a plan that survives a bad one."),
          p("This is general information, not financial advice. Withdrawal strategies should reflect your own savings, income, and comfort with uncertainty."),
        ],
      },
    ],
    faq: [
      {
        q: "What it is?",
        a: "Sequence of returns risk is the danger that bad market returns arrive early in your retirement, when your portfolio is at its largest and you are withdrawing from it. While you are working and saving, market order barely matters. A crash at 35 is a sale on stocks you keep buying.",
      },
      {
        q: "Why early-retirement drops hurt more?",
        a: "Think of it as reverse dollar-cost averaging. When you were saving, regular contributions bought more shares when prices were low. That helped you. In retirement, regular withdrawals sell more shares when prices are low. That hurts you.",
      },
      {
        q: "What not to do?",
        a: "Do not try to time it. Nobody knows when the bad sequence starts, and sitting in cash for years waiting for a crash that may not come is its own form of damage. Do not panic-sell in the crash. Locking in losses by fleeing to cash at the bottom turns sequence risk from a threat into a certainty.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "what-happens-if-i-work-in-retirement",
    title: "What happens if I work in retirement?",
    metaTitle: "What happens if I work in retirement?",
    description: "Working in retirement can be great, but it interacts with Social Security's earnings test, your tax bill, and Medicare premiums in ways worth understanding",
    keyword: "working in retirement",
    eyebrow: "Retirement, explained",
    lede: "Retirement does not have to mean never working again. Plenty of people keep earning, by choice or by necessity.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Retirement does not have to mean never working again. Plenty of people keep earning, by choice or by necessity. But working while retired tangles with Social Security, taxes, and Medicare in ways that surprise people. Here is the map. This is general information, not financial advice.",
    sections: [
      {
        h2: "Why people keep working",
        blocks: [
          p("Some work because they want to. The job is enjoyable, the structure helps, the social contact matters. Some work because the math demands it. Savings came up short, or a late-life expense changed the plan."),
          p("Both are valid. Work in your 60s and 70s can be the difference between a tight retirement and a comfortable one. It also keeps you engaged, which has value no spreadsheet captures."),
          p("Just know the rules before you clock in."),
        ],
      },
      {
        h2: "The earnings test concept",
        blocks: [
          p("If you claim Social Security before your full retirement age and you keep working, there is an earnings test. In plain terms: earn above a certain annual limit and your Social Security benefits get temporarily reduced."),
          p("The limit changes yearly, so check ssa.gov for the current figure rather than memorizing one. The reduction is not a tax that vanishes into the ether. When you reach full retirement age, your benefit gets recalculated to credit you for the months when benefits were withheld. You are not exactly losing the money forever, but you are not getting it now either."),
        ],
      },
      {
        h2: "How working affects your taxes",
        blocks: [
          p("Working in retirement usually means more income, and more income usually means more tax. Obvious, but the interactions are what get people."),
          p("Your wages stack on top of your other retirement income. That can push you into a higher bracket than your retirement income alone would. It can also push more of your Social Security into taxable territory, because the taxation of benefits is based on your combined income."),
        ],
      },
      {
        h2: "How working affects Medicare: IRMAA",
        blocks: [
          p("Here is the one that blindsides higher earners. Medicare Part B and Part D premiums are means-tested through something called IRMAA, the income-related monthly adjustment amount. Earn above certain thresholds and your premiums go up, sometimes by a lot."),
          p("The kicker: IRMAA looks at your tax return from two years ago. So income you earn at 63 sets your Medicare premiums at 65. People who have a big earnings year right before Medicare eligibility get a premium surprise in the mail."),
        ],
      },
      {
        h2: "The Social Security do-over most people miss",
        blocks: [
          p("If you claimed early, kept working, and now regret the timing, there are limited options. Within a year of claiming you can withdraw your application and pay back what you received, essentially resetting. After that window, the more common move is simply suspending benefits at full retirement age to earn delayed credits until 70."),
          p("These are narrow tools, not general fixes. But they exist, and people who claimed at 62 in a panic and then found good work should know about them."),
        ],
      },
      {
        h2: "Making work work",
        blocks: [
          p("A few principles. First, if you will earn meaningful money before full retirement age, think hard about whether claiming early makes sense or whether you should wait."),
          p("Second, count the after-tax, after-IRMAA value of the work. A part-time job that bumps your Medicare premiums for two years might still be worth it, but you should know the full price."),
          p("Third, coordinate the moving pieces. The year you retire, the year you claim Social Security, and the year you start Medicare are three separate decisions that interact. Making them one at a time without seeing the others is how people leave money on the table."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Working in retirement is normal and often smart. Just understand the earnings test before full retirement age, the tax stacking that shrinks your net gain, and the IRMAA lookback that can raise your Medicare premiums two years later."),
          p("Work with your eyes open and it is one of the best retirement tools you have."),
          p("This is general information, not financial advice. Check ssa.gov for the current earnings test limits and Medicare.gov for current IRMAA thresholds."),
        ],
      },
    ],
    faq: [
      {
        q: "Why people keep working?",
        a: "Some work because they want to. The job is enjoyable, the structure helps, the social contact matters. Some work because the math demands it. Savings came up short, or a late-life expense changed the plan. Both are valid. Work in your 60s and 70s can be the difference between a tight retirement and a comfortable one.",
      },
      {
        q: "What is the earnings test concept?",
        a: "If you claim Social Security before your full retirement age and you keep working, there is an earnings test. In plain terms: earn above a certain annual limit and your Social Security benefits get temporarily reduced. The limit changes yearly, so check ssa.gov for the current figure rather than memorizing one.",
      },
      {
        q: "What is the Social Security do-over most people miss?",
        a: "If you claimed early, kept working, and now regret the timing, there are limited options. Within a year of claiming you can withdraw your application and pay back what you received, essentially resetting. After that window, the more common move is simply suspending benefits at full retirement age to earn delayed credits until 70.",
      },
    ],
    sources: [
      { label: "Social Security Administration", href: "https://www.ssa.gov/" },
      { label: "Investor.gov", href: "https://investor.gov/" },
    ],
    related: [
      { label: "How does a 401(k) work?", href: "/answers/how-does-a-401k-work" },
      { label: "IRA or Roth IRA: which one fits me?", href: "/answers/ira-or-roth-ira-which-one-fits-me" },
      { label: "When should I claim Social Security?", href: "/answers/when-should-i-claim-social-security" },
    ],
    startHref: "/start?topic=retirement",
  },
  {
    slug: "term-whole-or-universal-life-insurance-which-do-i-need",
    title: "Term, whole, or universal life insurance: which do I need?",
    metaTitle: "Term, whole, or universal life insurance: which do I need?",
    description: "Term, whole, and universal life insurance compared in plain English: how each works, what each costs in general terms, and who each one fits.",
    keyword: "term life insurance",
    eyebrow: "Insurance, explained",
    lede: "Life insurance has a simple job. If you die, it pays money to the people you name. That is it.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Life insurance has a simple job. If you die, it pays money to the people you name. That is it. But the way policies do that job varies a lot, and the three main types get confused constantly. Here is each one explained the way I would explain it sitting across a kitchen table.",
    sections: [
      {
        h2: "What life insurance is for",
        blocks: [
          p("Before the types, the purpose. Life insurance replaces income that disappears when you do. If people depend on your paycheck, your business, or your caregiving, a policy makes sure they are not left scrambling. Common reasons people buy it: covering a mortgage so the family keeps the house, replacing income for a spouse or kids, paying off debts, covering final expenses, or leaving something behind. The right type depends on how long you need that protection and what else you want the policy to do."),
        ],
      },
      {
        h2: "Term life insurance: simple and affordable",
        blocks: [
          p("Term life is the simplest version. You pick a length of time, usually 10, 20, or 30 years. You pay a fixed premium during that term. If you die during the term, your beneficiaries get the death benefit. If you outlive the term, the policy ends and nothing is paid out. There is no savings account attached to it. It is pure protection."),
        ],
      },
      {
        h2: "Whole life insurance: permanent with a savings side",
        blocks: [
          p("Whole life covers you for your entire life, as long as premiums get paid. The premium stays level. Part of each payment goes toward the death benefit, and part builds cash value that grows at a guaranteed rate set by the insurer. You can borrow against that cash value or surrender the policy for its cash value, though both reduce what your beneficiaries receive."),
        ],
      },
      {
        h2: "Universal life insurance: permanent with flexibility",
        blocks: [
          p("Universal life is also permanent, but it separates the moving parts. You have a death benefit and a cash value account, and you get flexibility on both. You can usually adjust your premium payments within limits and sometimes adjust the death benefit. The cash value earns interest based on rates the insurer sets, with a guaranteed minimum floor."),
          p("That flexibility cuts both ways. If you underpay premiums in years when the cash value is not earning enough, the policy can eat its own cash value and eventually lapse. People buy universal life for the flexibility and then forget the policy needs attention. It requires more monitoring than whole life."),
        ],
      },
      {
        h2: "The quick comparison",
        blocks: [
          p("Term: temporary, cheapest, no cash value, biggest death benefit per dollar. Whole: permanent, most expensive, guaranteed cash value, set it and forget it. Universal: permanent, middle to higher cost, flexible premiums, needs monitoring."),
        ],
      },
      {
        h2: "How to choose",
        blocks: [
          p("Start with two questions. First, how much protection does your family need and for how long. Add up the mortgage, debts, years of income to replace, and future costs like college. That gives you a coverage target and a time horizon. Second, what is your budget. A smaller permanent policy does not beat a properly sized term policy when the real risk is the next 20 years."),
          p("A common approach: buy term for the big temporary need, like income replacement while kids grow up, and consider a smaller permanent policy only if you have a genuine lifelong need. Do not buy permanent coverage just because someone told you term is “renting.” Renting a big enough roof beats owning a dollhouse."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("None of these is the best type in the abstract. The best type is the one that matches your need, your timeline, and your budget. Most working families with young kids land on term, and that is a perfectly good answer. The mistake is not picking the wrong type. The mistake is putting it off while you research."),
          p("I am a licensed insurance agent in North Carolina, and I walk people through exactly this comparison on real calls. If you want help figuring out how much coverage you need and which type fits, call or text (919) 408-6671 or visit christianbrinkleync.com. No pressure, just straight answers."),
        ],
      },
    ],
    faq: [
      {
        q: "What life insurance is for?",
        a: "Before the types, the purpose. Life insurance replaces income that disappears when you do. If people depend on your paycheck, your business, or your caregiving, a policy makes sure they are not left scrambling.",
      },
      {
        q: "What is the quick comparison?",
        a: "Term: temporary, cheapest, no cash value, biggest death benefit per dollar. Whole: permanent, most expensive, guaranteed cash value, set it and forget it. Universal: permanent, middle to higher cost, flexible premiums, needs monitoring.",
      },
      {
        q: "How do I choose?",
        a: "Start with two questions. First, how much protection does your family need and for how long. Add up the mortgage, debts, years of income to replace, and future costs like college. That gives you a coverage target and a time horizon. Second, what is your budget.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "do-i-need-disability-insurance",
    title: "Do I need disability insurance?",
    metaTitle: "Do I need disability insurance?",
    description: "Disability insurance protects your paycheck, not your stuff. Learn why it is the most overlooked coverage, what own-occupation means, and how group",
    keyword: "disability insurance",
    eyebrow: "Insurance, explained",
    lede: "Ask a room of people what insurance they have, and you will hear car, home, health, maybe life. Almost nobody says disability.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Ask a room of people what insurance they have, and you will hear car, home, health, maybe life. Almost nobody says disability. That is strange, because your ability to earn a paycheck is the engine behind everything else you insure. The house, the car, the retirement savings: all of it runs on income. Disability insurance is the policy that protects the engine itself.",
    sections: [
      {
        h2: "Why it is the most overlooked coverage",
        blocks: [
          p("People skip disability insurance for a few predictable reasons. First, nobody likes picturing themselves unable to work. Death feels abstract and noble. Disability feels scary and specific, so people look away. Second, most people assume it will not happen to them. Illness and injury that keep you out of work for months are more common than most people think, especially over a full working lifetime. Third, people assume their employer or the government has them covered. Sometimes that is partly true, and it is almost never fully true."),
        ],
      },
      {
        h2: "What it actually does",
        blocks: [
          p("Disability insurance pays you a monthly benefit if an illness or injury keeps you from working. There are short term policies that cover weeks to months, and long term policies that can pay for years, sometimes all the way to retirement age. You buy a benefit amount based on your income, you pay a premium, and if a covered disability hits, the policy replaces part of your paycheck while you cannot earn it."),
        ],
      },
      {
        h2: "Own-occupation vs any-occupation: the definition that decides everything",
        blocks: [
          p("The single most important phrase in a disability policy is the definition of disability. It comes in two main versions, and they are very different."),
        ],
      },
      {
        h2: "Group vs individual coverage",
        blocks: [
          p("Many employers offer group disability insurance, often short term and sometimes long term. It is usually cheap or free to the employee, and that makes it an easy yes. Take it. But know its limits."),
        ],
      },
      {
        h2: "What to look at when comparing",
        blocks: [
          p("A few contract features separate good policies from thin ones. The definition of disability, as covered above. The benefit period, meaning how long payments last: two years, five years, or to a set age. The elimination period, meaning how long you wait after becoming disabled before checks start: longer waits mean lower premiums. Whether benefits adjust for inflation over a long claim. And whether the policy is non-cancelable, meaning the insurer cannot raise your premium or change terms as long as you pay."),
        ],
      },
      {
        h2: "Who needs it most",
        blocks: [
          p("If anyone depends on your income, including future you, you are a candidate. It matters most for people in their prime earning years, people with specialized skills, business owners with no employer plan to fall back on, and anyone whose family would face real hardship after a few months without a paycheck. If you have six months of expenses saved and no dependents, your need is smaller. If you have a mortgage, kids, and a job that requires your body or your specific expertise, your need is large."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("You insure your car against a fender bender. Your income deserves at least the same respect. Disability insurance is not exciting, and that is exactly why it gets skipped. But it is the policy that keeps every other part of your financial life standing when you cannot work."),
          p("I am a licensed insurance agent in North Carolina. If you want to see what your employer plan actually covers and whether an individual policy makes sense to fill the gaps, call or text (919) 408-6671 or visit christianbrinkleync.com. We will look at the definitions together, in plain English."),
        ],
      },
    ],
    faq: [
      {
        q: "Why it is the most overlooked coverage?",
        a: "People skip disability insurance for a few predictable reasons. First, nobody likes picturing themselves unable to work. Death feels abstract and noble. Disability feels scary and specific, so people look away. Second, most people assume it will not happen to them.",
      },
      {
        q: "What it actually does?",
        a: "Disability insurance pays you a monthly benefit if an illness or injury keeps you from working. There are short term policies that cover weeks to months, and long term policies that can pay for years, sometimes all the way to retirement age.",
      },
      {
        q: "What should I know about the definition?",
        a: "The single most important phrase in a disability policy is the definition of disability. It comes in two main versions, and they are very different. Own-occupation means you are considered disabled if you cannot do the specific job you had.",
      },
      {
        q: "What to look at when comparing?",
        a: "A few contract features separate good policies from thin ones. The definition of disability, as covered above. The benefit period, meaning how long payments last: two years, five years, or to a set age. The elimination period, meaning how long you wait after becoming disabled before checks start: longer waits mean lower premiums.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "do-i-need-umbrella-insurance",
    title: "Do I need umbrella insurance?",
    metaTitle: "Do I need umbrella insurance?",
    description: "Umbrella insurance adds extra liability protection on top of your auto and home policies. Here is what it is, who needs it, and how the layers fit together.",
    keyword: "umbrella insurance",
    eyebrow: "Insurance, explained",
    lede: "Your auto and home insurance policies each come with liability limits.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Your auto and home insurance policies each come with liability limits. Those limits are the most the insurer will pay if you are found legally responsible for hurting someone or damaging their property. Umbrella insurance is the extra layer that kicks in when those limits run out. Think of it as a roof over the rest of your insurance.",
    sections: [
      {
        h2: "What it is",
        blocks: [
          p("A personal umbrella policy provides additional liability coverage above and beyond your underlying policies, usually your auto and homeowners or renters insurance. It is typically sold in million dollar increments. When a covered claim exceeds the liability limit on your auto or home policy, the umbrella picks up the difference, up to its own limit."),
        ],
      },
      {
        h2: "How it sits on top of your other policies",
        blocks: [
          p("Insurers require you to carry certain minimum liability limits on your auto and home policies before they will sell you an umbrella. Those are called underlying limits. The umbrella does not replace your base coverage. It stacks on top of it."),
          p("This structure matters when you shop. If an umbrella quote looks cheap, check what underlying limits the insurer requires. Raising your auto and home liability limits to qualify can change the total cost picture. Still, the umbrella premium itself is often modest for the amount of coverage you get, because catastrophic liability claims are rare. You are buying protection against the unlikely but devastating event."),
        ],
      },
      {
        h2: "Who needs it",
        blocks: [
          p("Not everyone needs an umbrella, but more people need one than buy one. Consider it if any of these sound like you."),
          p("You have assets worth protecting. Home equity, savings, investments, a business. If a lawsuit could reach beyond your auto and home limits, an umbrella shields what you have built."),
          p("You have future income worth protecting. Lawsuits do not only target what you own today. A large judgment can follow your wages for years. Young professionals with high earning potential sometimes need an umbrella more than they realize."),
        ],
      },
      {
        h2: "What it does not do",
        blocks: [
          p("An umbrella is liability coverage, not a magic shield. It does not cover your own injuries or your own property damage. It does not cover business activities, professional malpractice, or intentional harm. If you run a business, you need commercial coverage for that. The umbrella protects your personal life, not your company."),
        ],
      },
      {
        h2: "How much is enough",
        blocks: [
          p("There is no formula, but a common rule of thumb is to carry umbrella coverage at least equal to your net worth, meaning your assets minus your debts. The idea is straightforward: protect what you could lose in a worst case lawsuit. Someone with a house, savings, and investments has more to shield than someone just starting out, though future earnings count too."),
          p("Talk through your situation with an agent who can see the whole picture. Your auto limits, home limits, assets, and risk factors all feed into the answer. A fifteen minute conversation usually settles it."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Umbrella insurance is one of the cheapest ways to buy a lot of protection. It sits quietly on top of your auto and home policies and only matters on the worst day of your life, which is exactly when you want it. If you have assets, income, or liability risks worth defending, it deserves a look."),
          p("I am a licensed insurance agent in North Carolina. If you want to know whether an umbrella makes sense for your situation and how it would stack with your current policies, call or text (919) 408-6671 or visit christianbrinkleync.com. We will run the numbers together."),
        ],
      },
    ],
    faq: [
      {
        q: "What it is?",
        a: "A personal umbrella policy provides additional liability coverage above and beyond your underlying policies, usually your auto and homeowners or renters insurance. It is typically sold in million dollar increments.",
      },
      {
        q: "Who needs it?",
        a: "Not everyone needs an umbrella, but more people need one than buy one. Consider it if any of these sound like you. You have assets worth protecting. Home equity, savings, investments, a business. If a lawsuit could reach beyond your auto and home limits, an umbrella shields what you have built. You have future income worth protecting.",
      },
      {
        q: "What it does not do?",
        a: "An umbrella is liability coverage, not a magic shield. It does not cover your own injuries or your own property damage. It does not cover business activities, professional malpractice, or intentional harm. If you run a business, you need commercial coverage for that. The umbrella protects your personal life, not your company.",
      },
      {
        q: "How is much enough?",
        a: "There is no formula, but a common rule of thumb is to carry umbrella coverage at least equal to your net worth, meaning your assets minus your debts. The idea is straightforward: protect what you could lose in a worst case lawsuit.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "why-does-my-landlord-want-renters-insurance",
    title: "Why does my landlord want renters insurance?",
    metaTitle: "Why does my landlord want renters insurance?",
    description: "Renters insurance covers your belongings, your liability, and your living expenses after a disaster. Learn what is included, what it costs in general terms,",
    keyword: "renters insurance",
    eyebrow: "Insurance, explained",
    lede: "A lot of renters assume the landlord's insurance covers them. It does not. The landlord's policy covers the building.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "A lot of renters assume the landlord's insurance covers them. It does not. The landlord's policy covers the building. Your stuff, your liability, and your hotel bill after a fire are your problem. That is what renters insurance is for, and it is one of the best deals in all of insurance.",
    sections: [
      {
        h2: "What it covers",
        blocks: [
          p("A standard renters policy has three main parts."),
          p("Personal property covers your belongings against covered events like fire, theft, vandalism, and certain water damage. Furniture, clothes, electronics, kitchen gear. If a burglar cleans out your apartment or a fire ruins everything, this is the part that pays to replace it. Most policies pay either actual cash value, meaning depreciated value, or replacement cost, meaning what it costs to buy it new. Replacement cost coverage is better and usually costs a bit more. Worth it."),
        ],
      },
      {
        h2: "What it does not cover",
        blocks: [
          p("Every policy has exclusions, and renters is no exception. Floods and earthquakes typically need separate coverage. Your roommate's belongings are not covered unless they are named on the policy. High value items like expensive jewelry, art, or collectibles often have sublimits, meaning the policy caps what it pays per category. If you own a five thousand dollar ring, you may need to schedule it separately. Business equipment kept at home can also have limits. Read the policy or ask an agent before you assume."),
        ],
      },
      {
        h2: "What it costs in general terms",
        blocks: [
          p("Renters insurance is generally one of the cheapest policies you can buy. Many renters pay a modest amount each month, often less than they spend on takeout in a week. The exact price depends on where you live, how much coverage you choose, your deductible, and your claims history. Choosing a higher deductible lowers the premium. Bundling with an auto policy from the same insurer often earns a discount."),
          p("The cost conversation usually ends quickly once people hear the range. Then the real question becomes why they waited."),
        ],
      },
      {
        h2: "Why landlords require it",
        blocks: [
          p("More landlords now require tenants to carry renters insurance, and it is not just self interest, though that plays a part. A tenant with liability coverage is less likely to sue the landlord over an incident the tenant caused. It also means tenants can handle their own losses instead of looking to the landlord for help after a fire or break in. From the landlord's side, insured tenants mean fewer disputes and smoother operations."),
        ],
      },
      {
        h2: "How to buy it right",
        blocks: [
          p("Start with an inventory. Walk through your place and list what you own, with rough replacement values. Most people underestimate. Add up furniture, electronics, clothes, and kitchen equipment and the number gets real fast. That total guides how much personal property coverage you need."),
          p("Pick replacement cost over actual cash value if the budget allows. Choose a deductible you could actually pay tomorrow. Consider liability limits beyond the minimum, since liability claims are the part that can truly hurt you financially. And ask about discounts: bundling, protective devices like smoke detectors and deadbolts, and claims free history can all help."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Renters insurance covers your belongings, protects you from liability claims, and pays your living expenses after a disaster. It costs little, and your landlord probably already wants you to have it. If you rent and do not have a policy, this is one of the easiest financial upgrades you can make."),
          p("I am a licensed insurance agent in North Carolina. If you want help picking the right coverage amounts or meeting your lease requirement, call or text (919) 408-6671 or visit christianbrinkleync.com. It takes a few minutes and it is worth it."),
        ],
      },
    ],
    faq: [
      {
        q: "What it covers?",
        a: "A standard renters policy has three main parts. Personal property covers your belongings against covered events like fire, theft, vandalism, and certain water damage. Furniture, clothes, electronics, kitchen gear. If a burglar cleans out your apartment or a fire ruins everything, this is the part that pays to replace it.",
      },
      {
        q: "What it does not cover?",
        a: "Every policy has exclusions, and renters is no exception. Floods and earthquakes typically need separate coverage. Your roommate's belongings are not covered unless they are named on the policy. High value items like expensive jewelry, art, or collectibles often have sublimits, meaning the policy caps what it pays per category.",
      },
      {
        q: "What it costs in general terms?",
        a: "Renters insurance is generally one of the cheapest policies you can buy. Many renters pay a modest amount each month, often less than they spend on takeout in a week. The exact price depends on where you live, how much coverage you choose, your deductible, and your claims history. Choosing a higher deductible lowers the premium.",
      },
      {
        q: "Why landlords require it?",
        a: "More landlords now require tenants to carry renters insurance, and it is not just self interest, though that plays a part. A tenant with liability coverage is less likely to sue the landlord over an incident the tenant caused.",
      },
    ],
    sources: [
      { label: "National Association of Insurance Commissioners", href: "https://www.naic.org/" },
      { label: "USA.gov", href: "https://www.usa.gov/" },
    ],
    related: [
      { label: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
      { label: "How do I choose a health insurance plan?", href: "/answers/how-do-i-choose-a-health-insurance-plan" },
      { label: "What does homeowners insurance cover?", href: "/answers/what-does-homeowners-insurance-cover" },
    ],
    startHref: "/start?topic=insurance",
  },
  {
    slug: "how-does-zero-based-budgeting-work",
    title: "How does zero-based budgeting work?",
    metaTitle: "How does zero-based budgeting work?",
    description: "Zero-based budgeting gives every dollar a job before the month starts. Here is a step-by-step walkthrough, including how to handle irregular income.",
    keyword: "zero-based budgeting",
    eyebrow: "Home buying, explained",
    lede: "Most budgets fail for a boring reason. They are vague. “Spend less on food” is not a plan.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Most budgets fail for a boring reason. They are vague. “Spend less on food” is not a plan. Zero-based budgeting fixes that with one rule: every dollar of income gets assigned a job before the month begins, and income minus assignments equals zero. Not zero in your bank account. Zero unassigned. Every dollar is told where to go, including dollars assigned to savings.",
    sections: [
      {
        h2: "Why it works",
        blocks: [
          p("Traditional budgeting tracks what you spent after the fact. Zero-based budgeting decides before the fact. That shift matters because money you have not assigned tends to evaporate. You know the feeling. Payday arrives, the account looks healthy, and two weeks later you cannot say where it went. When every dollar has a name, stray spending gets caught early, because you see exactly which category it came from."),
          p("It also forces honesty about priorities. If you want to save more, the money has to come from a named category. There is no “we will save what is left,” because what is left is usually nothing. Savings becomes a line item, not a wish."),
        ],
      },
      {
        h2: "Step-by-step setup",
        blocks: [
          p("Step one: write down your total take home income for the month. Not gross pay. The amount that actually lands in your account after taxes and deductions. If you get paid biweekly, add up what you will actually receive in that specific month. Some months have three paychecks. Those are good months. Plan them."),
          p("Step two: list every expense. Start with fixed costs: rent or mortgage, utilities, insurance premiums, minimum debt payments, subscriptions, phone bill. Then variable costs: groceries, gas, dining out, personal spending. Then periodic costs people forget: car registration, annual memberships, holiday gifts, medical copays. Divide annual costs by twelve and budget them monthly so they never ambush you."),
        ],
      },
      {
        h2: "What to do with irregular income",
        blocks: [
          p("Zero-based budgeting still works if your income bounces around. You just budget differently. Two approaches work well."),
          p("The first approach: budget on last month's income. When pay arrives, it funds next month's budget, not this month's. This takes one month of discipline to set up, because you have to get a month ahead, but it turns irregular income into a fixed monthly number. Freelancers and tipped workers swear by this once it clicks."),
          p("The second approach: build the budget in priority order and fund top down. List categories from most essential to least. Each time money comes in, fill categories in order until the money runs out. Rent and food get funded first. Dining out and new clothes wait until the essentials and goals are covered. This works week to week when you cannot plan a full month."),
        ],
      },
      {
        h2: "Common mistakes",
        blocks: [
          p("Budgeting gross income instead of take home. Forgetting irregular expenses like car repairs and gifts. Making the budget so tight it lasts four days. Being too vague with categories, like one giant “miscellaneous” line that swallows everything. And quitting after one bad month. The first month is a draft. The system works on month three, not month one."),
          p("Another quiet mistake: budgeting as a couple without both people in the room. If one partner builds the budget and the other just hears about it, it will not hold. Build it together, even if one person manages the tracking."),
        ],
      },
      {
        h2: "A simple template to start",
        blocks: [
          p("Income: list each source. Essentials: housing, utilities, transportation, insurance, groceries, minimum debt payments, phone. Goals: emergency fund, extra debt payoff, retirement, sinking funds. Lifestyle: dining out, entertainment, personal spending, subscriptions. Total everything. Subtract from income. Adjust until the result is zero."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Zero-based budgeting is not about restriction. It is about intention. Your money was going to go somewhere anyway. This method just makes sure it goes where you decided instead of where it drifted. Give it three months. Most people who stick with it say it feels less like a diet and more like finally being the boss of their own money."),
          p("Want help building a budget that actually fits your life, or figuring out where your money is really going? Call or text (919) 408-6671 or visit christianbrinkleync.com. Sometimes a second pair of eyes finds the leak in ten minutes."),
        ],
      },
    ],
    faq: [
      {
        q: "Why do it work?",
        a: "Traditional budgeting tracks what you spent after the fact. Zero-based budgeting decides before the fact. That shift matters because money you have not assigned tends to evaporate. You know the feeling. Payday arrives, the account looks healthy, and two weeks later you cannot say where it went.",
      },
      {
        q: "What to do with irregular income?",
        a: "Zero-based budgeting still works if your income bounces around. You just budget differently. Two approaches work well. The first approach: budget on last month's income. When pay arrives, it funds next month's budget, not this month's.",
      },
      {
        q: "What should I know about step-by-step setup?",
        a: "Step one: write down your total take home income for the month. Not gross pay. The amount that actually lands in your account after taxes and deductions. If you get paid biweekly, add up what you will actually receive in that specific month. Some months have three paychecks. Those are good months. Plan them. Step two: list every expense.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "Debt snowball or avalanche: which should I pick?", href: "/answers/debt-snowball-or-avalanche-which-should-i-pick" },
      { label: "How are credit scores calculated?", href: "/answers/how-are-credit-scores-calculated" },
      { label: "How much down payment does a first-time home buyer need?", href: "/answers/how-much-down-payment-does-a-first-time-home-buyer-need" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "debt-snowball-or-avalanche-which-should-i-pick",
    title: "Debt snowball or avalanche: which should I pick?",
    metaTitle: "Debt snowball or avalanche: which should I pick?",
    description: "Debt snowball and debt avalanche are the two most popular payoff strategies. Learn how each works, the math versus psychology tradeoff, and which one fits you.",
    keyword: "debt snowball",
    eyebrow: "Home buying, explained",
    lede: "When you have several debts and some extra money to throw at them, the question is where the extra goes. Two strategies dominate the conversation.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "When you have several debts and some extra money to throw at them, the question is where the extra goes. Two strategies dominate the conversation. They share the same foundation and differ on one decision: which debt gets the extra payment first. That one decision changes the experience completely.",
    sections: [
      {
        h2: "The shared foundation",
        blocks: [
          p("Both methods start the same way. List every debt with its balance, minimum payment, and interest rate. Pay the minimum on all of them every month, no exceptions. Missing minimums triggers fees and credit damage that swamp any strategy. Then take every extra dollar you can find and aim it at one target debt. When that debt is gone, roll its entire payment, minimum plus the extra, into the next target. The payment grows like a snowball rolling downhill. That rollover is where the speed comes from."),
        ],
      },
      {
        h2: "The debt snowball: smallest balance first",
        blocks: [
          p("The snowball targets debts in order of balance, smallest to largest, ignoring interest rates. You attack the little one first while minimums hold the line everywhere else. When the smallest is gone, you move to the next smallest, with a bigger payment now because you rolled the freed up money forward."),
        ],
      },
      {
        h2: "The debt avalanche: highest rate first",
        blocks: [
          p("The avalanche targets debts in order of interest rate, highest to lowest, ignoring balances. Extra money attacks the most expensive debt first. Mathematically, this is the cheapest path. Every dollar aimed at the highest rate saves the most future interest. Over the full payoff journey, the avalanche costs less and, when rates differ a lot, can finish sooner."),
        ],
      },
      {
        h2: "The math vs psychology tradeoff",
        blocks: [
          p("This is the whole debate in one line. The avalanche wins on math. The snowball wins on motivation. Research on human behavior consistently shows that small early wins keep people going, which is why the snowball has such a loyal following despite costing more in interest."),
        ],
      },
      {
        h2: "Which to pick: a quick guide",
        blocks: [
          p("Pick the snowball if you have several debts, feel overwhelmed, have quit payoff plans before, or need visible progress to stay motivated. Pick the avalanche if you are disciplined with long goals, your interest rates vary widely, or the math genuinely excites you. Pick the hybrid if you want early wins without ignoring a punishing high rate balance."),
          p("One more consideration: if two debts have similar rates, the distinction barely matters, so just pick the smaller balance and move on. Do not spend three weeks optimizing a decision worth a few dollars. Action beats analysis here."),
        ],
      },
      {
        h2: "Making either method work faster",
        blocks: [
          p("Whichever you choose, speed comes from the size of the extra payment. Sell things you do not use. Pause subscriptions ruthlessly. Direct windfalls, bonuses, and tax refunds at the target debt before they touch your checking account's imagination. Call lenders and ask about rate reductions; the worst they say is no. And consider whether a balance transfer or consolidation loan makes sense, but only if the new rate is truly lower and you will not run the old cards back up."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Snowball: smallest balance first, fastest wins, costs a bit more in interest. Avalanche: highest rate first, cheapest total cost, demands more patience. Both beat minimum payments by a mile. The best method is the one you will actually finish, so pick based on honest self knowledge, not internet debates."),
          p("If debt is eating your budget and you want help building a payoff plan around your real numbers, call or text (919) 408-6671 or visit christianbrinkleync.com. We will map it out together and find the extra dollars hiding in your month."),
        ],
      },
    ],
    faq: [
      {
        q: "What is the shared foundation?",
        a: "Both methods start the same way. List every debt with its balance, minimum payment, and interest rate. Pay the minimum on all of them every month, no exceptions. Missing minimums triggers fees and credit damage that swamp any strategy. Then take every extra dollar you can find and aim it at one target debt.",
      },
      {
        q: "What is the debt snowball: smallest balance first?",
        a: "The snowball targets debts in order of balance, smallest to largest, ignoring interest rates. You attack the little one first while minimums hold the line everywhere else. When the smallest is gone, you move to the next smallest, with a bigger payment now because you rolled the freed up money forward. The power here is psychological.",
      },
      {
        q: "What is the debt avalanche: highest rate first?",
        a: "The avalanche targets debts in order of interest rate, highest to lowest, ignoring balances. Extra money attacks the most expensive debt first. Mathematically, this is the cheapest path. Every dollar aimed at the highest rate saves the most future interest.",
      },
      {
        q: "What is the math vs psychology tradeoff?",
        a: "This is the whole debate in one line. The avalanche wins on math. The snowball wins on motivation. Research on human behavior consistently shows that small early wins keep people going, which is why the snowball has such a loyal following despite costing more in interest. The honest question is not which method is better.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does zero-based budgeting work?", href: "/answers/how-does-zero-based-budgeting-work" },
      { label: "How are credit scores calculated?", href: "/answers/how-are-credit-scores-calculated" },
      { label: "How much down payment does a first-time home buyer need?", href: "/answers/how-much-down-payment-does-a-first-time-home-buyer-need" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-are-credit-scores-calculated",
    title: "How are credit scores calculated?",
    metaTitle: "How are credit scores calculated?",
    description: "Credit scores come from five factors: payment history, utilization, length of history, new credit, and mix. Here is what each one means in plain terms.",
    keyword: "how credit scores work",
    eyebrow: "Home buying, explained",
    lede: "Your credit score looks like a single mysterious number, but it is really a summary of your borrowing behavior. Scoring models weigh five factors.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "Your credit score looks like a single mysterious number, but it is really a summary of your borrowing behavior. Scoring models weigh five factors. They do not weigh them equally, and knowing which ones matter most tells you exactly where to focus. Here is each factor in plain English, ordered roughly by importance.",
    sections: [
      {
        h2: "1. Payment history: the heavyweight",
        blocks: [
          p("This is the biggest factor by a wide margin. It asks one question: do you pay your bills on time. Every on time payment builds your record. Late payments, collections, and bankruptcies damage it, with more recent and more severe problems hurting the most."),
        ],
      },
      {
        h2: "2. Amounts owed and utilization: the second big one",
        blocks: [
          p("The next biggest factor looks at how much of your available credit you are using. This is called credit utilization. If you have a card with a ten thousand dollar limit and you carry a two thousand dollar balance, your utilization on that card is twenty percent. Lower is generally better."),
        ],
      },
      {
        h2: "3. Length of credit history: the quiet contributor",
        blocks: [
          p("This factor looks at how long your accounts have been open, including the age of your oldest account and the average age of all accounts. Longer history generally helps, because it gives the scoring model more evidence of how you handle credit."),
        ],
      },
      {
        h2: "4. New credit: the small ding",
        blocks: [
          p("Opening several new accounts in a short period can lower your score a bit. Each application typically triggers a hard inquiry, which is a lender checking your credit because you asked for credit. One inquiry is minor. A burst of them suggests you are hungry for credit, which reads as risk."),
        ],
      },
      {
        h2: "5. Credit mix: the finishing touch",
        blocks: [
          p("The smallest factor looks at the variety of credit types you have: credit cards, installment loans like auto or student loans, a mortgage. A healthy mix can help slightly, because it shows you can handle different kinds of borrowing."),
          p("Do not open accounts just to improve your mix. Taking out a loan you do not need costs real money to chase a small scoring benefit. If your life naturally includes different credit types over time, the mix takes care of itself."),
        ],
      },
      {
        h2: "What does not affect your score",
        blocks: [
          p("A few things people worry about needlessly. Checking your own credit is a soft inquiry and never hurts your score. Your income, savings, and job title are not factors. Debit card use does not build credit. And being an authorized user can help or hurt depending on how the primary user manages the account, so choose that arrangement carefully."),
        ],
      },
      {
        h2: "How to use this knowledge",
        blocks: [
          p("If your score needs work, the priority list writes itself. First, get every payment on time and keep it that way. Second, pay down revolving balances to lower utilization. Third, leave old accounts open and avoid opening new ones right before you need credit. Fourth, let time do its work. There is no legitimate shortcut. Anyone selling rapid score repair is selling something else."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Payment history matters most, utilization is next, then length of history, new credit, and mix round it out. That order is your action plan. Pay on time, keep balances low, be patient, and the number takes care of itself."),
          p("If credit confusion is keeping you from a goal like buying a home or getting a better auto rate, call or text (919) 408-6671 or visit christianbrinkleync.com. We will look at where you stand and build a simple plan to move the number."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the heavyweight?",
        a: "This is the biggest factor by a wide margin. It asks one question: do you pay your bills on time. Every on time payment builds your record. Late payments, collections, and bankruptcies damage it, with more recent and more severe problems hurting the most. A single 30 day late payment can sting, and a 90 day late payment stings much worse.",
      },
      {
        q: "What should I know about the second big one?",
        a: "The next biggest factor looks at how much of your available credit you are using. This is called credit utilization. If you have a card with a ten thousand dollar limit and you carry a two thousand dollar balance, your utilization on that card is twenty percent. Lower is generally better. High utilization signals risk to lenders.",
      },
      {
        q: "What should I know about the quiet contributor?",
        a: "This factor looks at how long your accounts have been open, including the age of your oldest account and the average age of all accounts. Longer history generally helps, because it gives the scoring model more evidence of how you handle credit. The practical takeaway: think twice before closing your oldest card.",
      },
      {
        q: "What should I know about the small ding?",
        a: "Opening several new accounts in a short period can lower your score a bit. Each application typically triggers a hard inquiry, which is a lender checking your credit because you asked for credit. One inquiry is minor. A burst of them suggests you are hungry for credit, which reads as risk. Rate shopping gets special treatment.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does zero-based budgeting work?", href: "/answers/how-does-zero-based-budgeting-work" },
      { label: "Debt snowball or avalanche: which should I pick?", href: "/answers/debt-snowball-or-avalanche-which-should-i-pick" },
      { label: "How much down payment does a first-time home buyer need?", href: "/answers/how-much-down-payment-does-a-first-time-home-buyer-need" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-much-down-payment-does-a-first-time-home-buyer-need",
    title: "How much down payment does a first-time home buyer need?",
    metaTitle: "How much down payment does a first-time home buyer need?",
    description: "Think buying a home requires 20% down? Explore low down payment options, what PMI is, and assistance programs that help first-time buyers get in the door.",
    keyword: "first time home buyer down payment",
    eyebrow: "Home buying, explained",
    lede: "The 20% down payment is the most persistent myth in home buying. It is a fine goal, but it is not a requirement.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "The 20% down payment is the most persistent myth in home buying. It is a fine goal, but it is not a requirement. Plenty of buyers purchase homes with far less down, through loan programs built exactly for that. If you have been waiting years to save 20% while home prices climb, this post is for you.",
    sections: [
      {
        h2: "Where the 20% idea comes from",
        blocks: [
          p("Putting 20% down has real advantages. You skip private mortgage insurance, you start with meaningful equity, and your monthly payment is lower. Lenders love it. But somewhere along the way, an advantage turned into a perceived rule. First-time buyers hear 20% and assume the door is closed until they save a mountain of cash. It is not."),
          p("The tradeoff of waiting is real. While you save, prices and rents keep moving. Every year of waiting can mean a higher purchase price later. Sometimes buying sooner with less down is the better financial move, even with the extra costs involved."),
        ],
      },
      {
        h2: "Low down payment loan options",
        blocks: [
          p("Conventional loans backed by Fannie Mae and Freddie Mac are available to first-time buyers with down payments well below 20%. These are standard mortgages from regular lenders, just with a smaller down payment. You will pay private mortgage insurance, which we will cover in a moment, but the door is open."),
        ],
      },
      {
        h2: "PMI: the cost of putting less down",
        blocks: [
          p("When you put down less than 20% on a conventional loan, lenders typically require private mortgage insurance, or PMI. It protects the lender, not you, against default. You pay the premium as part of your monthly payment. FHA loans have their own version called mortgage insurance premium, with upfront and annual pieces."),
        ],
      },
      {
        h2: "Down payment assistance programs",
        blocks: [
          p("Beyond loan programs, many states, counties, and cities offer down payment assistance to first-time buyers. These come in several forms: grants you do not repay, forgivable loans that disappear after you live in the home a set number of years, and low interest second loans repaid over time."),
        ],
      },
      {
        h2: "What about closing costs",
        blocks: [
          p("First-time buyers often fixate on the down payment and forget closing costs. These are the lender fees, title charges, prepaid taxes and insurance, and other costs due at closing. They add up to a meaningful chunk on top of the down payment. Some assistance programs help with closing costs too. When you budget for a home, budget for both numbers, not just the down payment."),
          p("Getting pre-approved early helps here. A pre-approval tells you what you can borrow and surfaces the full cash picture before you fall in love with a house."),
        ],
      },
      {
        h2: "How much should you actually put down",
        blocks: [
          p("This is the real question, and the answer is personal. More down means lower payments, less interest over time, and no PMI. Less down means keeping cash reserves for emergencies, moving costs, and the inevitable first year repairs every homeowner discovers."),
          p("Do not drain your emergency fund to hit a down payment number. Buying a home with zero savings left is how a broken water heater becomes a credit card crisis. Keep a cushion. The right down payment is the largest amount you can put down while still sleeping well at night."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Twenty percent is a goal, not a gate. Low down payment conventional loans, FHA, VA, USDA, and assistance programs give first-time buyers multiple paths in the door. PMI makes smaller down payments possible and it does not last forever. Run your numbers, talk to lenders, check local assistance, and keep your emergency fund intact."),
          p("Buying your first home is one of the biggest financial moves you will make. If you want help thinking through the down payment decision, what you can afford, and how to protect the investment once you buy, call or text (919) 408-6671 or visit christianbrinkleync.com."),
        ],
      },
    ],
    faq: [
      {
        q: "Where the 20% idea comes from?",
        a: "Putting 20% down has real advantages. You skip private mortgage insurance, you start with meaningful equity, and your monthly payment is lower. Lenders love it. But somewhere along the way, an advantage turned into a perceived rule. First-time buyers hear 20% and assume the door is closed until they save a mountain of cash. It is not.",
      },
      {
        q: "What should I know about the cost of putting less?",
        a: "When you put down less than 20% on a conventional loan, lenders typically require private mortgage insurance, or PMI. It protects the lender, not you, against default. You pay the premium as part of your monthly payment. FHA loans have their own version called mortgage insurance premium, with upfront and annual pieces.",
      },
      {
        q: "What about closing costs?",
        a: "First-time buyers often fixate on the down payment and forget closing costs. These are the lender fees, title charges, prepaid taxes and insurance, and other costs due at closing. They add up to a meaningful chunk on top of the down payment. Some assistance programs help with closing costs too.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does zero-based budgeting work?", href: "/answers/how-does-zero-based-budgeting-work" },
      { label: "Debt snowball or avalanche: which should I pick?", href: "/answers/debt-snowball-or-avalanche-which-should-i-pick" },
      { label: "How are credit scores calculated?", href: "/answers/how-are-credit-scores-calculated" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "what-is-pmi-and-how-do-i-get-rid-of-it",
    title: "What is PMI and how do I get rid of it?",
    metaTitle: "What is PMI and how do I get rid of it?",
    description: "Private mortgage insurance protects your lender, not you. Learn what PMI costs in general terms and the three ways it ends, including the 20% equity",
    keyword: "private mortgage insurance",
    eyebrow: "Home buying, explained",
    lede: "PMI shows up on the monthly statements of millions of homeowners, and most of them could not explain what it is. Here is the short version.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "PMI shows up on the monthly statements of millions of homeowners, and most of them could not explain what it is. Here is the short version. Private mortgage insurance protects your lender if you default. You pay for it. It does not protect you. And it does not have to last forever.",
    sections: [
      {
        h2: "What PMI is",
        blocks: [
          p("When you buy a home with a conventional loan and put down less than 20%, the lender takes on more risk. PMI offsets that risk. If you stop paying the mortgage and the lender takes a loss, the PMI policy covers part of it. The coverage belongs to the lender. The bill belongs to you."),
        ],
      },
      {
        h2: "What it costs in general terms",
        blocks: [
          p("PMI cost varies with your down payment size, your credit score, and the loan details. Buyers who put down closer to 20% and have strong credit generally pay less than buyers with small down payments and weaker credit. The premium is usually expressed as an annual rate applied to the loan amount, then divided into monthly payments."),
        ],
      },
      {
        h2: "Why it is worth paying anyway",
        blocks: [
          p("PMI gets a bad reputation it does not fully deserve. Yes, it is money that protects someone else. But it is also the fee that lets you buy years earlier than saving 20% would allow. A buyer who pays PMI for five years while building equity often comes out ahead of a buyer who rents for five more years waiting to save a bigger down payment. Do the math for your market instead of treating PMI as pure waste."),
        ],
      },
      {
        h2: "How PMI ends: three paths",
        blocks: [
          p("This is the part most homeowners never learn, and it costs them. PMI ends in three main ways."),
          p("First, you can request cancellation. Once your loan balance drops to about 80% of the original home value, meaning you have roughly 20% equity based on that original value, you can generally ask your servicer to cancel PMI. You usually need to be current on payments and may need to pay for an appraisal to confirm the value. Do not wait for the servicer to offer. Ask."),
        ],
      },
      {
        h2: "The appreciation shortcut",
        blocks: [
          p("Here is what changes the timeline. The 20% and automatic thresholds are based on the original value of the home. But if your home has appreciated significantly, your actual equity may be well above 20% much sooner. Many servicers allow cancellation based on a current appraisal showing sufficient equity, sometimes with a seasoning requirement meaning you must have had the loan a minimum length of time."),
          p("If home values in your area have climbed since you bought, a few hundred dollars for an appraisal could end PMI years early. Run the numbers. If the appraisal costs less than a few months of PMI, it pays for itself fast."),
        ],
      },
      {
        h2: "Mistakes that keep PMI alive",
        blocks: [
          p("The biggest mistake is never asking. Servicers process the automatic termination on schedule, but the months between reaching 20% and hitting the automatic threshold are money you could have kept. The second mistake is missing payments around the time you become eligible, since being current is usually required. The third is assuming FHA mortgage insurance works the same way. It does not. FHA insurance follows different rules, so do not apply this post to an FHA loan."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("PMI is the price of buying with less than 20% down on a conventional loan. It protects the lender, it costs a modest monthly amount, and it ends. Track your equity, request cancellation at 20%, let the automatic rules back you up, and consider an appraisal or refinance if values have risen. It is a temporary toll, not a permanent tax."),
        ],
      },
    ],
    faq: [
      {
        q: "What PMI is?",
        a: "When you buy a home with a conventional loan and put down less than 20%, the lender takes on more risk. PMI offsets that risk. If you stop paying the mortgage and the lender takes a loss, the PMI policy covers part of it. The coverage belongs to the lender. The bill belongs to you.",
      },
      {
        q: "What it costs in general terms?",
        a: "PMI cost varies with your down payment size, your credit score, and the loan details. Buyers who put down closer to 20% and have strong credit generally pay less than buyers with small down payments and weaker credit. The premium is usually expressed as an annual rate applied to the loan amount, then divided into monthly payments.",
      },
      {
        q: "Why it is worth paying anyway?",
        a: "PMI gets a bad reputation it does not fully deserve. Yes, it is money that protects someone else. But it is also the fee that lets you buy years earlier than saving 20% would allow.",
      },
      {
        q: "What is the appreciation shortcut?",
        a: "Here is what changes the timeline. The 20% and automatic thresholds are based on the original value of the home. But if your home has appreciated significantly, your actual equity may be well above 20% much sooner.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does zero-based budgeting work?", href: "/answers/how-does-zero-based-budgeting-work" },
      { label: "Debt snowball or avalanche: which should I pick?", href: "/answers/debt-snowball-or-avalanche-which-should-i-pick" },
      { label: "How are credit scores calculated?", href: "/answers/how-are-credit-scores-calculated" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "how-do-side-hustle-taxes-work",
    title: "How do side hustle taxes work?",
    metaTitle: "How do side hustle taxes work?",
    description: "Earning self-employment income changes your tax picture. Learn how self-employment tax works, when quarterly payments apply, and how to track expenses like",
    keyword: "side hustle taxes",
    eyebrow: "Home buying, explained",
    lede: "The side hustle feels like free money until tax season arrives. Then the IRS wants its cut, and the cut is bigger than most new earners expect.",
    published: "2026-10-14",
    updated: "2026-10-14",
    intro: "The side hustle feels like free money until tax season arrives. Then the IRS wants its cut, and the cut is bigger than most new earners expect. Nobody withholds taxes from your freelance checks. That job is yours now. Here is what to know before April surprises you.",
    sections: [
      {
        h2: "You are a business now, like it or not",
        blocks: [
          p("The moment you earn money outside a W-2 job, the tax code treats you as self-employed for that income. Freelance work, gig driving, selling products online, consulting on the side. It all counts. You report the income, you deduct legitimate business expenses, and you pay tax on the profit."),
          p("This surprises people who think of their hustle as casual. The IRS does not have a casual category. Income is income. The good news is that business treatment also unlocks deductions employees never get."),
        ],
      },
      {
        h2: "Self-employment tax: the part nobody warns you about",
        blocks: [
          p("Here is the shock. As an employee, Social Security and Medicare taxes get split between you and your employer. You pay half through withholding, your employer pays the other half, and you never think about it. When you are self-employed, there is no employer. You pay both halves yourself. This is called self-employment tax, and it applies on top of regular income tax."),
        ],
      },
      {
        h2: "Quarterly estimated payments",
        blocks: [
          p("Employees pay tax gradually through withholding from each paycheck. Self-employed people are expected to pay gradually too, through quarterly estimated tax payments. Four times a year, you send the IRS an estimated payment covering income tax and self-employment tax on your hustle earnings."),
        ],
      },
      {
        h2: "Tracking income and expenses",
        blocks: [
          p("Good records are the foundation of everything. Open a separate bank account for the hustle if you can. Run all business income and spending through it. That single habit makes tax time dramatically easier and creates a clean paper trail if questions ever arise."),
        ],
      },
      {
        h2: "The home office, in general terms",
        blocks: [
          p("If you use part of your home regularly and exclusively for business, you may be able to deduct home office expenses. The exclusive part matters. A desk in the corner of the living room that doubles as the family computer station generally does not qualify. A room used only as your office generally does."),
        ],
      },
      {
        h2: "Retirement and the side hustle",
        blocks: [
          p("One underused advantage of self-employment income: it opens retirement account options beyond your employer's plan. Accounts designed for self-employed people let you shelter hustle income from current taxes while building long term savings. If your hustle is growing, this is worth a conversation with a tax professional. The contribution limits can be generous, and the tax benefit is real."),
        ],
      },
      {
        h2: "When to get professional help",
        blocks: [
          p("Do your own taxes confidently when the hustle is simple: one income stream, straightforward expenses, no employees. Bring in a tax professional when things get complex: multiple income streams, inventory, hiring help, crossing into serious money, or facing your first year of quarterly payments. A good preparer often pays for themselves by finding deductions you missed and keeping you penalty free. That is not an upsell. It is math."),
        ],
      },
      {
        h2: "The bottom line",
        blocks: [
          p("Side hustle taxes come down to four habits. Expect self-employment tax on your profit, because you pay both halves now. Make quarterly estimated payments so April does not ambush you. Track every expense, because deductions cut both income tax and self-employment tax. And learn the home office rules if you work from home. None of this is hard. It just has to happen before tax season, not during it."),
        ],
      },
    ],
    faq: [
      {
        q: "What should I know about the part nobody warns you?",
        a: "Here is the shock. As an employee, Social Security and Medicare taxes get split between you and your employer. You pay half through withholding, your employer pays the other half, and you never think about it. When you are self-employed, there is no employer. You pay both halves yourself.",
      },
      {
        q: "What is the home office, in general terms?",
        a: "If you use part of your home regularly and exclusively for business, you may be able to deduct home office expenses. The exclusive part matters. A desk in the corner of the living room that doubles as the family computer station generally does not qualify. A room used only as your office generally does. There are two methods.",
      },
      {
        q: "What should I know about the side hustle?",
        a: "One underused advantage of self-employment income: it opens retirement account options beyond your employer's plan. Accounts designed for self-employed people let you shelter hustle income from current taxes while building long term savings. If your hustle is growing, this is worth a conversation with a tax professional.",
      },
      {
        q: "When to get professional help?",
        a: "Do your own taxes confidently when the hustle is simple: one income stream, straightforward expenses, no employees. Bring in a tax professional when things get complex: multiple income streams, inventory, hiring help, crossing into serious money, or facing your first year of quarterly payments.",
      },
    ],
    sources: [
      { label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { label: "How does zero-based budgeting work?", href: "/answers/how-does-zero-based-budgeting-work" },
      { label: "Debt snowball or avalanche: which should I pick?", href: "/answers/debt-snowball-or-avalanche-which-should-i-pick" },
      { label: "How are credit scores calculated?", href: "/answers/how-are-credit-scores-calculated" },
    ],
    startHref: "/start?topic=money",
  },
  {
    slug: "social-security-cola-medicare-part-b",
    title: "Will my Social Security raise cover my Medicare premium increase?",
    metaTitle: "Will Your Social Security Raise Cover the 2027 Part B Hike?",
    description:
      "The 2027 Social Security COLA is 3.6% (announced Oct 14); the Part B premium follows in November. How to figure out what you will actually keep each month.",
    keyword: "will social security raise cover medicare premium increase",
    eyebrow: "Medicare questions, answered",
    lede: "Two announcements, one month apart, decide what lands in your bank account. Here is the math, and the rule that keeps your check from shrinking.",
    published: "2026-10-12",
    updated: "2026-10-19",
    intro:
      "Every October the same question comes up in Greensboro living rooms: the Social Security raise is coming, so why does the check barely move? The answer is timing. Your raise and your Medicare premium increase are decided by two different agencies, in two different months, and the premium comes out of your check before you see it. Here is how the two numbers interact for 2027, and the rule that keeps a premium hike from shrinking your payment.",
    sections: [
      {
        h2: "Two announcements, one month apart",
        blocks: [
          p(
            "The Social Security Administration announced the 2027 cost-of-living adjustment, the COLA, on October 14, 2026: 3.6 percent. That works out to about $75 a month on the average benefit. The number is official now, so you can do real math with it.",
          ),
          p(
            "The Part B premium comes later. The Centers for Medicare and Medicaid Services announces next year's standard premium in November. For 2026 it is $202.90 a month. For 2027 the 2026 Medicare Trustees Report projected about $209.50. A projection, not the final figure.",
          ),
          p(
            "Do not plan off headlines. Until both announcements are out, every 2027 comparison you see is built on at least one guess.",
          ),
        ],
      },
      {
        h2: "Do the math on your own check",
        blocks: [
          p(
            "The raise is a percentage of your benefit. The premium increase is a flat dollar amount. That mismatch is the whole story.",
          ),
          table(
            ["Your monthly benefit", "Raise at 3.6% (final)", "Part B hike ~$6.60 (projection)", "What you keep"],
            [
              ["$1,500", "+$54.00", "-$6.60", "~$47.40"],
              ["$2,000", "+$72.00", "-$6.60", "~$65.40"],
              ["$2,500", "+$90.00", "-$6.60", "~$83.40"],
            ],
          ),
          p(
            "One number is final, one is not: the 3.6 percent COLA is official, the $6.60 premium increase is still a projection. Your benefit and the final premium decide your real result.",
          ),
          p(
            "One more cost for the calendar: the standard Part D deductible rises to a maximum of $700 in 2027, and the out-of-pocket cap rises to $2,400. Both are final per the CMS CY2027 Rate Announcement. The deductible does not come out of your check. It shows up at the pharmacy counter in January.",
          ),
        ],
      },
      {
        h2: "The premium comes out before you see the money",
        blocks: [
          p(
            "For most people, the Part B premium is deducted automatically from the Social Security payment. You never get a bill. The deposit in your bank account is already net of the premium.",
          ),
          p(
            "That is why the gross raise can mislead. A $72 raise with a $6.60 premium increase is a $65.40 raise in real life. The check that matters is the one after the deduction.",
          ),
        ],
      },
      {
        h2: "The rule that keeps your check from shrinking",
        blocks: [
          p(
            "Federal law includes a provision people call hold harmless (42 U.S.C. 1395r(f)). If the Part B premium increase is bigger than your COLA, your premium increase is limited so your net Social Security payment does not go down.",
          ),
          p(
            "It does not cover everyone. It does not apply to IRMAA surcharges for higher incomes, to people who pay Part B directly instead of through deduction, to premiums paid by Medicaid, or to first-year Part B enrollees.",
          ),
          p(
            "It stops your check from shrinking. It does not guarantee you keep the whole raise.",
          ),
        ],
      },
      {
        h2: "What to do with this before January",
        blocks: [
          p(
            "The lever you control opens October 15. The Annual Enrollment Period runs October 15 to December 7, the one time of year you can change drug plans and Medicare Advantage plans for January 1. Premiums get the headlines, but drug deductibles and tiers move every year, and that is where the bigger surprises hide.",
          ),
          p(
            "Then read your December notice. Social Security mails a letter showing your exact 2027 amount, also visible in your my Social Security account. Compare that number to your January deposit, not to the COLA headline.",
          ),
          p(
            "If the math worries you, talk to someone local before December 7. A ten-minute review of your drug list against next year's plans beats a hundred COLA headlines.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "When will the 2027 numbers be final?",
        a: "SSA announced the 2027 COLA of 3.6% on October 14, 2026. CMS announces the 2027 Part B premium and deductible in November. Your exact new amount arrives in a Social Security notice in December, and higher payments start with January 2027 benefits.",
      },
      {
        q: "Can a Part B increase make my Social Security check go down?",
        a: "For most people with premiums deducted from Social Security, no. Hold harmless limits the premium increase so the net payment does not fall. Exceptions: IRMAA surcharges, direct Part B payers, new enrollees, and Medicaid-paid premiums.",
      },
      {
        q: "Does the Part D deductible come out of my check too?",
        a: "No. The Part D deductible is paid at the pharmacy, not deducted from your check. For 2027 the standard deductible maxes out at $700, per the CMS CY2027 Rate Announcement. Once you hit the $2,400 out-of-pocket cap, covered drugs cost $0 the rest of the year.",
      },
      {
        q: "I pay extra for Medicare because of my income. Does hold harmless protect me?",
        a: "No. IRMAA, the income-related monthly adjustment amount, sits outside hold harmless protection. If your income dropped since the tax year Social Security used, you can ask for reconsideration with a life-changing event form.",
      },
      {
        q: "Where do I see my exact new amount?",
        a: "Your December notice shows your exact 2027 benefit, also visible in your my Social Security account. That number minus your Part B premium is the January deposit to expect.",
      },
    ],
    sources: [
      {
        label: "CMS: 2026 Medicare Parts A & B premiums and deductibles",
        href: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
      },
      {
        label: "Social Security Administration: 2027 COLA announcement",
        href: "https://www.ssa.gov/news/en/advocates/2026-10-14.html",
      },
      {
        label: "Medicare.gov: When you can join, switch, or drop a plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
    ],
    related: [
      { label: "Do I owe extra for Medicare because of my income?", href: "/answers/medicare-irmaa-income-premiums" },
      { label: "Switching Medicare Advantage plans during AEP", href: "/answers/switching-medicare-advantage-plans-aep" },
      { label: "Do I need Medicare drug coverage?", href: "/answers/do-i-need-medicare-drug-coverage" },
      { label: "Every 2027 Medicare cost, final vs projected", href: "/medicare-costs-2027" },
      { label: "Medicare help near you", href: "/service-area" },
    ],
    startHref: "/start?topic=medicare&stage=already_on_medicare",
  },
  {
    slug: "compare-part-d-plans-open-enrollment-2027",
    title: "How do I compare Medicare drug plans during Open Enrollment?",
    metaTitle: "Compare Medicare Part D Plans for 2027: What to Check",
    description:
      "Open Enrollment runs October 15 to December 7. The 2027 Part D numbers are final: a $700 max deductible and a $2,400 cap. How to compare plans for next year.",
    keyword: "compare medicare part d plans open enrollment 2027",
    eyebrow: "Medicare questions, answered",
    lede: "The monthly premium is the smallest part of the comparison. Your drugs, your pharmacy, and the plan's rulebook decide your real cost for the year.",
    published: "2026-10-19",
    updated: "2026-10-19",
    intro:
      "Every October, Medicare drug plans rewrite the fine print for next year: new premiums, new copay tiers, drugs added or dropped from the list. Open Enrollment, October 15 to December 7, is the one window when you can switch drug plans for January 1. Comparing takes about twenty minutes if you bring your drug list. Here is what to check, with the final 2027 numbers.",
    sections: [
      {
        h2: "Start with the letter you already got",
        blocks: [
          p(
            "By September 30 your plan mails an Annual Notice of Change. It is the single most useful document of the season: exactly what your plan changes for next year. Premium, deductible, copay and coinsurance tiers, which drugs stay on the formulary, and which pharmacy network applies. Read that first, before any advertising.",
          ),
          p(
            "Watch for two red flags. A drug you take moves to a higher tier or leaves the formulary, or your pharmacy drops out of the preferred network. Either one is a signal to shop, even if the premium barely moved.",
          ),
        ],
      },
      {
        h2: "The 2027 numbers you can trust",
        blocks: [
          p(
            "CMS finalized the core 2027 Part D numbers on April 6, 2026, in the CY2027 Rate Announcement. These are not projections.",
          ),
          table(
            ["Part D feature", "2026", "2027"],
            [
              ["Standard deductible (maximum)", "$615", "$700"],
              ["Annual out-of-pocket cap", "$2,100", "$2,400"],
              ["National base beneficiary premium", "$38.99", "$41.33"],
            ],
          ),
          p(
            "Once your out-of-pocket costs for covered drugs reach the $2,400 cap, you pay $0 for covered drugs the rest of the year. The deductible counts toward the cap. Premiums do not.",
          ),
          p(
            "Two footnotes. The base beneficiary premium is the number used to calculate late-enrollment penalties. It is not what any specific plan charges. And the federal demonstration that held stand-alone plan premiums down ends with 2026, so premiums can move more freely for 2027. Read your notice instead of assuming a small increase.",
          ),
        ],
      },
      {
        h2: "Compare your total year, not the monthly premium",
        blocks: [
          p(
            "Take the premium off the table first. Multiply it by 12. Then add what your drugs cost under each plan's rules: deductible, copays or coinsurance by tier, and whether your pharmacy is preferred. The plan with the lowest premium often loses on the total.",
          ),
          p(
            "See how the pieces fit with the 2027 standard benefit. A covered prescription that costs $100 a month and is subject to the deductible runs about $100 a month January through July to meet the $700 deductible, then 25 percent, or $25 a month, August through December. That is $825 for the year before the premium. Your plan's tiers set your real numbers. The standard benefit shows you the shape of the math.",
          ),
          p(
            "Then check the formulary itself. Plans change which drugs they cover and which tier each drug sits in every year. Enter your exact drugs, doses, and pharmacy into the Medicare plan finder at medicare.gov to see your real total by plan.",
          ),
        ],
      },
      {
        h2: "The deadline, and what happens if you do nothing",
        blocks: [
          p(
            "Open Enrollment ends December 7. Your plan must receive your enrollment form by then, and changes take effect January 1. Miss the window and you are generally locked in until next October, outside a few special exceptions.",
          ),
          p(
            "If your plan still fits, you do not have to do anything. Coverage generally renews automatically with the new year's terms. The risk is assuming nothing changed. Plans change formularies and tiers every year, and the premium in your notice is the only number that matters.",
          ),
        ],
      },
      {
        h2: "When a ten-minute review beats an afternoon of tabs",
        blocks: [
          p(
            "Twenty minutes with your drug list and the Medicare plan finder handles most comparisons. The people who get burned are the ones who never open the Annual Notice of Change.",
          ),
          p(
            "If the letter confuses you, get a second pair of eyes before December 7. A free review in Greensboro or anywhere in the Triad takes your actual drug list against next year's plans and tells you the real yearly cost. Bring the notice, your drug bottles, and your pharmacy name.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "When is Open Enrollment for 2027 drug plans?",
        a: "October 15 through December 7, 2026. You can join, switch, or drop a drug plan. Changes take effect January 1, 2027. Your plan must receive the enrollment form by December 7.",
      },
      {
        q: "What are the 2027 Part D deductible and out-of-pocket cap?",
        a: "CMS finalized them in the CY2027 Rate Announcement: the standard deductible rises to a $700 maximum (from $615) and the annual out-of-pocket cap rises to $2,400 (from $2,100). Once your out-of-pocket costs for covered drugs reach the cap, you pay $0 for covered drugs the rest of the year.",
      },
      {
        q: "What is the Annual Notice of Change?",
        a: "A letter your drug plan must mail by September 30 each year. It shows exactly what changes for the next plan year: premium, deductible, copays, formulary, and pharmacy network. Read it before Open Enrollment.",
      },
      {
        q: "Do I have to switch if I like my plan?",
        a: "No. If your plan still fits, it generally renews automatically with the new year's terms. The risk is assuming nothing changed. Plans change formularies and copay tiers every year.",
      },
      {
        q: "Where do I compare plans?",
        a: "The Medicare plan finder at medicare.gov compares 2027 plans using your actual drugs, doses, and pharmacy. Or bring your drug list to a free local review before December 7.",
      },
    ],
    sources: [
      {
        label: "CMS: CY2027 Medicare Advantage and Part D Rate Announcement",
        href: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/announcements-and-documents",
      },
      {
        label: "Medicare.gov: When you can join, switch, or drop a plan",
        href: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
    ],
    related: [
      { label: "Do I need Medicare drug coverage?", href: "/answers/do-i-need-medicare-drug-coverage" },
      { label: "How does Medicare Part D drug coverage work?", href: "/answers/how-does-medicare-part-d-drug-coverage-work" },
      { label: "The Part D late enrollment penalty", href: "/answers/medicare-part-d-late-penalty" },
      { label: "Switching Medicare Advantage plans during AEP", href: "/answers/switching-medicare-advantage-plans-aep" },
      { label: "Every 2027 Medicare cost, final vs projected", href: "/medicare-costs-2027" },
    ],
    startHref: "/start?topic=medicare&stage=already_on_medicare",
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** Plain text of an article body, used for word counts and tests. */
export function articleText(article: Article): string {
  const parts: string[] = [article.title, article.intro];
  for (const section of article.sections) {
    parts.push(section.h2);
    for (const block of section.blocks) {
      if (block.kind === "p") parts.push(block.text);
      else if (block.kind === "table")
        parts.push(block.headers.join(" "), block.rows.map((r) => r.join(" ")).join(" "));
      else parts.push(block.items.join(" "));
    }
  }
  for (const item of article.faq) parts.push(item.q, item.a);
  return parts.join("\n").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
