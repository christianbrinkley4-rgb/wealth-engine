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

export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

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
    title: "Does Medicare cover nursing homes or in-home care?",
    metaTitle: "Does Medicare Cover Nursing Homes or In-Home Care?",
    description:
      "Medicare covers limited skilled care, not long-term custodial care. How skilled nursing and home health work, and what pays for the rest. Plain English.",
    keyword: "does Medicare cover nursing home costs",
    eyebrow: "Medicare questions, answered",
    lede: "Medicare pays for some skilled care for a limited time. It does not pay for long-term care.",
    published: "2026-10-01",
    updated: "2026-10-01",
    intro:
      "Families usually ask this at a hard moment: a parent is in the hospital, and someone has to figure out what comes next. The short answer surprises many people. Medicare covers limited skilled care, and it does not cover long-term custodial care. This is general education, not advice for your situation.",
    sections: [
      {
        h2: "Skilled care versus custodial care",
        blocks: [
          p(
            "Skilled care is nursing or therapy that has to be done by trained professionals, like wound care or physical therapy after a hospital stay. Medicare can pay for some of that.",
          ),
          p(
            "Custodial care is help with daily living, like bathing, dressing, eating, and getting around. Most long stays in a nursing home are for custodial care. Medicare does not pay for custodial care when it is the only care you need.",
          ),
        ],
      },
      {
        h2: "Skilled nursing facility coverage",
        blocks: [
          p(
            "Medicare Part A can cover a stay in a skilled nursing facility, but only if all of these are true:",
          ),
          ul(
            "You had a medically necessary inpatient hospital stay of at least 3 days in a row. Time in the emergency room or under observation does not count.",
            "You enter the facility within a short time after leaving the hospital, generally 30 days.",
            "You need daily skilled care from nursing or therapy staff.",
          ),
          p(
            "If you qualify, the 2026 costs for each benefit period work like this. For days 1 to 20, you pay $0 after your Part A deductible of $1,736. For days 21 to 100, you pay $217 per day. After day 100, Medicare pays nothing toward the stay. The deductible is not charged again if you already paid it for the same hospital stay.",
          ),
          p(
            "If you have a Medicare Advantage plan, the plan sets its own costs and rules for these stays. Ask the plan before a move, not after.",
          ),
        ],
      },
      {
        h2: "Home health care",
        blocks: [
          p(
            "Medicare can pay for home health when a doctor orders it and you are homebound. Homebound means leaving home is hard for you, or needs help from a person or a device like a walker or wheelchair. The care has to come from a Medicare-certified agency.",
          ),
          p("What Medicare can cover:"),
          ul(
            "Part-time or occasional skilled nursing care.",
            "Physical, occupational, and speech therapy.",
            "Medical social services.",
            "A home health aide, but only alongside skilled nursing or therapy.",
          ),
          p("What Medicare does not cover:"),
          ul(
            "Care around the clock at home.",
            "Meal delivery.",
            "Homemaker help like shopping and cleaning.",
            "Personal care, when that is the only care you need.",
          ),
        ],
      },
      {
        h2: "What does pay for long-term care",
        blocks: [
          p("Families usually rely on a mix of these:"),
          ul(
            "Personal savings and income.",
            "Long-term care insurance, if someone bought it before the need. [Here is how that works.](/long-term-care-insurance)",
            "Medicaid, which has income and asset limits set by the state. [NC Medicaid](https://medicaid.nc.gov) can explain who qualifies. I do not give advice on qualifying.",
          ),
        ],
      },
      {
        h2: "Why this matters before a crisis",
        blocks: [
          p(
            "The best time to understand this is while everyone is healthy. Once a parent is in the hospital, decisions come fast and the 3-day and 30-day rules start to matter right away. A calm conversation now gives a family time to ask questions and decide what they want.",
          ),
          p(
            "If you are helping a parent, you may also find our page on [helping a parent with Medicare](/helping-a-parent) useful.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Does Medicare cover nursing homes or in-home care?",
        a: "Medicare covers limited skilled care in a nursing facility after a qualifying hospital stay, and part-time skilled home health care when a doctor orders it. It does not pay for long-term custodial care.",
      },
      {
        q: "How many nursing home days does Medicare cover?",
        a: "Up to 100 days in each benefit period, after a qualifying 3-day hospital stay. In 2026 you pay $0 for days 1 to 20 after the Part A deductible, and $217 per day for days 21 to 100.",
      },
      {
        q: "Does Medicare pay for 24-hour home care?",
        a: "No. Medicare home health is part-time or occasional. Medicare does not cover care around the clock at home.",
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
      { label: "Should I stay on Original Medicare or switch to Medicare Advantage?", href: "/answers/original-medicare-or-medicare-advantage" },
      { label: "Are Medicare Supplement plans the same?", href: "/answers/are-medicare-supplement-plans-the-same" },
      { label: "Turning 65 in North Carolina: your Medicare checklist", href: "/answers/turning-65-medicare-checklist-north-carolina" },
      { label: "Helping a parent with Medicare", href: "/helping-a-parent" },
      { label: "Care and critical illness coverage", href: "/care-coverage" },
      { label: "Long-term care insurance", href: "/long-term-care-insurance" },
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
      "This question comes up every fall, usually from someone holding two plan brochures. HMO and PPO are the two most common kinds of Medicare Advantage plans. Both have to cover everything Original Medicare covers. The difference is how they handle your doctors: who you can see, whether you need a referral, and what happens when you go outside the plan’s network. Here is the plain version, so you can match a plan to how you actually get care.",
    sections: [
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
      parts.push(block.kind === "p" ? block.text : block.items.join(" "));
    }
  }
  for (const item of article.faq) parts.push(item.q, item.a);
  return parts.join("\n").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
