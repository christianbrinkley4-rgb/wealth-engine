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
  {
    slug: "missed-iep-penalties",
    title: "What happens if I miss my Medicare Initial Enrollment Period?",
    metaTitle: "Missed Your Medicare Initial Enrollment Period? Next Steps",
    description:
      "Missing your Medicare Initial Enrollment Period can mean lifetime penalties and a wait for coverage. How the penalties work and what to do next.",
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
            "If you are unsure, ask your benefits office directly: is our prescription drug coverage creditable for Medicare Part D purposes? Get the answer in writing.",
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
      "Medicare Part B covers medically necessary cataract surgery, the standard lens, and one pair of glasses after. What you pay and what costs extra.",
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
      "You can usually stay on your spouse's employer plan at 65 and delay Medicare. The 20-employee rule, Part D creditability, and when to sign up.",
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
        q: "What if we are on COBRA from my spouse's old job?",
        a: "COBRA does not count. It does not qualify you for a Special Enrollment Period and does not protect you from the Part B penalty.",
      },
      {
        q: "Can we both delay Medicare on one spouse's plan?",
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
      "Apply for Medicare online at ssa.gov, by phone, or at your local Social Security office. What you need, when to apply, and what happens next.",
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
      "Medicare covers ambulance rides only when medically necessary. What counts, what you pay, and why non-emergency rides get denied.",
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
