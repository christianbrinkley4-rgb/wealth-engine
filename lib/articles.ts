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
  {
    slug: "original-medicare-or-medicare-advantage",
    title: "Should I stay on Original Medicare or switch to Medicare Advantage?",
    metaTitle: "Original Medicare or Medicare Advantage? What to Check First",
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
      { label: "Medicare Advantage vs Medigap in the Triad", href: "/advantage-vs-medigap" },
      { label: "Check your doctors before you choose a plan", href: "/keep-my-doctor" },
      { label: "Annual Enrollment, step by step", href: "/annual-enrollment" },
    ],
    startHref: "/start?topic=medicare&stage=already_on_medicare",
  },

  {
    slug: "are-medicare-supplement-plans-the-same",
    title: "Are Medicare Supplement plans the same no matter the company?",
    metaTitle: "Are Medigap Plans the Same Across Companies? Plan Letters",
    description:
      "Medigap plans are standardized by letter, so Plan G covers the same core benefits at every company. What really differs, and what to do when a notice arrives.",
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
      { label: "Medicare Advantage vs Medigap in the Triad", href: "/advantage-vs-medigap" },
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
      "Does Medicare cover nursing homes? Mostly no. Up to 100 days of skilled nursing after a hospital stay, but not long-term care.",
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
            "If you go without Part B when you should have signed up, you pay an extra 10% of the standard premium for each full 12-month period you waited. The standard Part B premium is $202.90 in 2026. You keep paying that extra amount for as long as you have Part B. You can [estimate yours with our penalty calculator](/part-b-penalty).",
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
            "If you want to see your own dates laid out, our [timeline tool](/turning-65) builds them from your birthday.",
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
      "Original Medicare skips routine dental. Many Medicare Advantage plans add some dental, but the details vary. What to check before you count on it.",
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
    metaTitle: "HMO vs PPO Medicare Advantage: Which Fits Your Doctors?",
    description:
      "HMO or PPO? The real differences are your doctors, referrals, and what out-of-network care costs. A plain-English comparison for Triad neighbors.",
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
      "Switching Medicare Advantage plans during open enrollment? The six checks that matter: timing, doctors, drugs, costs, pharmacy, and ratings.",
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
      "Earn over $109K single or $218K joint? IRMAA adds surcharges to Medicare Part B and Part D. How the two-year lookback works, and how to appeal.",
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
      "Taking few or no prescriptions at 65? What Medicare Part D costs, how the late penalty works, and what to check before you skip drug coverage.",
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
            "If you're not sure whether you have creditable coverage, or what a plan would cost with your actual prescriptions, bring the list and we'll check it together. No cost, and no pressure to enroll.",
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
      { label: "Medicare words, in plain English", href: "/medicare-words" },
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
