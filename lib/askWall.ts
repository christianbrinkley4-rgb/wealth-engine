/**
 * "Ask Christian" public Q&A wall.
 *
 * The wall lives at /ask. Visitors read answered questions there and can ask
 * their own through a form that posts to the capture-lead API with
 * kind="question". New questions land in the ask_questions table, reviewed
 * before anything appears on the wall.
 *
 * Writing rules for this file: plain English, short sentences, no em dashes,
 * no savings promises, no client stories. Every figure was already verified
 * on the linked guide or tool page; this file reuses them, it never
 * re-researches them. See docs/CONTENT-VOICE.md.
 */

import type { Article } from "@/lib/articles";

export const QUESTION_MIN_LENGTH = 20;
export const QUESTION_MAX_LENGTH = 2000;
export const NAME_MAX_LENGTH = 120;

export type QuestionValidation =
  | { ok: true; question: string }
  | { ok: false; error: string };

/** Shared by the wall form and the API route so both enforce the same shape. */
export function validateQuestion(value: unknown): QuestionValidation {
  if (typeof value !== "string") {
    return { ok: false, error: "Type your question so I know what to answer." };
  }
  const question = value.trim();
  if (question.length < QUESTION_MIN_LENGTH) {
    return {
      ok: false,
      error: `Give me a little more than that, at least ${QUESTION_MIN_LENGTH} characters so I can answer properly.`,
    };
  }
  if (question.length > QUESTION_MAX_LENGTH) {
    return {
      ok: false,
      error: `That is longer than I can take here, please shorten it to under ${QUESTION_MAX_LENGTH} characters.`,
    };
  }
  return { ok: true, question };
}

export function getAskQuestion(slug: string): Article | undefined {
  return ASK_QUESTIONS.find((question) => question.slug === slug);
}

/**
 * The five launch answers. Each one came from a question neighbors keep
 * asking, and each answer's figures were already checked on the linked
 * guide or tool page. No invented names, no client stories.
 */
export const ASK_QUESTIONS: Article[] = [
  {
    slug: "no-tax-on-overtime-what-actually-qualifies",
    title: "Does 'no tax on overtime' mean my whole overtime check is tax-free?",
    metaTitle: "No Tax on Overtime: What Actually Qualifies in 2026",
    description:
      "Not every overtime dollar qualifies for the 2026 federal overtime deduction. Which part of your pay counts, the $12,500 cap, and why payroll taxes still apply.",
    keyword: "no tax on overtime what qualifies",
    eyebrow: "Ask Christian",
    lede: "Only the overtime premium counts, not the whole check, and there is a yearly cap.",
    published: "2026-10-08",
    updated: "2026-10-08",
    intro:
      "This one comes up constantly: the headlines said no tax on overtime, but the paycheck looks the same. Here is the short version. The deduction covers the overtime premium, the extra half on top of your regular rate, not everything you earned working late. It has a yearly cap, income limits, and it does not touch payroll taxes.",
    sections: [
      {
        h2: "Start with the premium, not the paycheck",
        blocks: [
          {
            kind: "p",
            text: "For ordinary time-and-a-half pay, the qualifying amount is generally the extra half above your regular rate. Extra pay for a holiday or weekend is not automatically qualified overtime. Ask payroll which amount is required under the federal overtime law. A contract or a state rule can require extra pay without making all of it eligible for this federal deduction.",
          },
        ],
      },
      {
        h2: "The 2026 limits and filing rules",
        blocks: [
          {
            kind: "p",
            text: "The annual maximum is $12,500, or $25,000 on a joint return. The deduction starts shrinking above modified adjusted gross income of $150,000, or $300,000 jointly. Married taxpayers must file jointly to qualify, and a valid Social Security number is required. The provision applies to tax years 2025 through 2028, and it is available whether you itemize or take the standard deduction.",
          },
        ],
      },
      {
        h2: "Why your paystub still shows taxes",
        blocks: [
          {
            kind: "p",
            text: "A deduction lowers taxable income. It is not a dollar-for-dollar refund. Social Security and Medicare payroll taxes still apply, and state treatment can differ. Use the tax-year instructions and your employer's reporting, rather than multiplying total overtime wages by your tax rate.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Does no tax on overtime mean no payroll tax?",
        a: "No. The deduction concerns federal income tax. It does not remove Social Security or Medicare payroll taxes.",
      },
      {
        q: "Can I claim it if I take the standard deduction?",
        a: "Yes, if you meet the eligibility rules. Itemizing is not required.",
      },
    ],
    sources: [
      {
        label: "IRS: Overtime deduction rules",
        href: "https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction",
      },
      {
        label: "IRS: Tips and overtime deductions",
        href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-how-to-take-advantage-of-no-tax-on-tips-and-overtime",
      },
    ],
    related: [
      { label: "Overtime deduction rules", href: "/guides/overtime-tax-deduction-2026" },
      { label: "How tax brackets work", href: "/wealth/tax-brackets-explained-plainly" },
      { label: "No tax on tips: what qualifies", href: "/guides/tips-tax-deduction-2026" },
    ],
    startHref: "/start",
  },
  {
    slug: "hsa-after-leaving-job",
    title: "I left my job. Do I lose my HSA?",
    metaTitle: "Leaving a Job? What Happens to Your HSA and FSA",
    description:
      "Your HSA stays yours after a job change. A health FSA follows different rules. What to check on contributions, deadlines, and access before your last day.",
    keyword: "what happens to HSA when you leave your job",
    eyebrow: "Ask Christian",
    lede: "The HSA balance stays yours. Adding to it is a separate question.",
    published: "2026-10-08",
    updated: "2026-10-08",
    intro:
      "People change jobs and panic about their HSA, so let me settle it. Your HSA is your account. Leaving a job does not take it from you, and you can still use it for qualified medical expenses. What changes is whether you can keep adding money to it, and that depends on your coverage, not your employer.",
    sections: [
      {
        h2: "Keeping an HSA is not the same as adding to it",
        blocks: [
          {
            kind: "p",
            text: "You can keep an existing HSA and use it for qualified medical expenses after employment ends. New contributions depend on HSA eligibility, including qualifying coverage and other restrictions. A job change does not reset the annual limit. Count contributions across employers and accounts together.",
          },
        ],
      },
      {
        h2: "Your FSA follows different rules",
        blocks: [
          {
            kind: "p",
            text: "A health FSA is an employer arrangement, so get the dates in writing. Ask benefits staff for the last date an expense can be incurred and the last date a claim can be submitted. Those can be different dates. A claims run-out period is not automatically extra coverage time, and do not assume a remaining FSA balance transfers to a new employer.",
          },
        ],
      },
      {
        h2: "Before your work login stops working",
        blocks: [
          {
            kind: "p",
            text: "Download account statements, receipts, and the plan's reimbursement instructions before your last day. Replace a work email address with a personal one where appropriate, and record the administrator's contact details. Ask the HSA provider about fees your employer previously covered.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do I lose my HSA if I become unemployed?",
        a: "No. The existing account stays yours. Eligibility for new contributions is a separate question.",
      },
      {
        q: "Can I still use my HSA money for medical bills after I leave?",
        a: "Yes. Spending the balance on qualified medical expenses does not require employment or eligibility. Only contributions have eligibility rules.",
      },
    ],
    sources: [
      {
        label: "IRS: Publication 969, HSAs and health FSAs",
        href: "https://www.irs.gov/publications/p969",
      },
    ],
    related: [
      { label: "HSA and FSA after leaving a job", href: "/guides/hsa-fsa-after-leaving-job" },
      { label: "The HSA, explained", href: "/wealth/hsa-explained" },
      { label: "The HSA triple tax advantage", href: "/guides/hsa-triple-tax-advantage" },
    ],
    startHref: "/start",
  },
  {
    slug: "401k-rollover-check-60-day-rule",
    title: "My old employer sent me a 401(k) check. What do I do before the clock runs out?",
    metaTitle: "Old 401(k) Check in Hand: The 60-Day Rule Explained",
    description:
      "A 401(k) check made out to you usually has 20% withheld and a 60-day rollover deadline. What the payee line changes and how to move the full amount.",
    keyword: "401k check made out to me 60 day rollover",
    eyebrow: "Ask Christian",
    lede: "Who the check is made out to decides whether tax gets withheld.",
    published: "2026-10-08",
    updated: "2026-10-08",
    intro:
      "Leaving a job does not require cashing out a 401(k), but sometimes the check shows up anyway. What matters most is the payee line. If the check is made out to you instead of to another retirement plan or IRA, the tax rules get much less forgiving, and there is a clock running.",
    sections: [
      {
        h2: "The payee line decides the withholding",
        blocks: [
          {
            kind: "p",
            text: "A direct rollover of eligible money to another retirement plan or IRA generally avoids mandatory withholding. But if an eligible taxable employer-plan distribution is paid to you, 20% generally must be withheld. A later rollover generally has a 60-day deadline. Rolling over the whole gross amount requires replacing the withheld amount from other funds.",
          },
        ],
      },
      {
        h2: "Ask what the plans allow first",
        blocks: [
          {
            kind: "p",
            text: "You may be able to leave money in the old plan, move it to a new employer's plan, roll it to an IRA, or take a distribution. Plan rules and balances matter. Compare fees, services, withdrawal rules, and protections with a qualified professional. No destination is automatically best for everyone.",
          },
        ],
      },
      {
        h2: "A rollover and a conversion are not identical",
        blocks: [
          {
            kind: "p",
            text: "Moving untaxed money to a Roth IRA generally creates taxable income. Cashing out can also create income tax and an additional early-distribution tax unless an exception applies. Required minimum distributions are not eligible for rollover. An outstanding plan loan can introduce separate deadlines and tax rules.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Does the withheld 20% count as money I rolled over?",
        a: "Not automatically. To roll over the entire gross distribution, you generally must replace that withheld amount within the rollover deadline.",
      },
      {
        q: "Can every retirement payment be rolled over?",
        a: "No. Required minimum distributions and certain other payments are ineligible. Confirm before requesting the transaction.",
      },
    ],
    sources: [
      {
        label: "IRS: Leaving employment",
        href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-termination-of-employment",
      },
      {
        label: "IRS: Rollovers of retirement distributions",
        href: "https://www.irs.gov/retirement-plans/plan-participant-employee/rollovers-of-retirement-plan-and-ira-distributions",
      },
    ],
    related: [
      { label: "401(k) after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
      { label: "Your 401(k), explained", href: "/wealth/401k-explained" },
      { label: "401(k) loan vs withdrawal", href: "/guides/401k-loan-vs-withdrawal" },
    ],
    startHref: "/start",
  },
  {
    slug: "backdoor-roth-ira-explained",
    title: "I earn too much for a Roth IRA. Is the backdoor Roth legit?",
    metaTitle: "Backdoor Roth IRA: How It Works and the Pro-Rata Trap",
    description:
      "Two steps: a nondeductible traditional IRA contribution, then a conversion. The pro-rata rule is the trap to check first. Up to $7,500 a year for 2026.",
    keyword: "backdoor roth ira steps high income",
    eyebrow: "Ask Christian",
    lede: "Two steps, one trap: the pro-rata rule can tax part of the conversion.",
    published: "2026-10-08",
    updated: "2026-10-08",
    intro:
      "Yes, it is a real, recognized path, not a loophole someone made up. A backdoor Roth IRA is a two-step move: contribute to a traditional IRA, then convert it to a Roth. It exists because high earners lose the ability to contribute to a Roth directly once their income passes the IRS phaseout limits. It works best when you have no pre-tax IRA balance, because of the pro-rata rule.",
    sections: [
      {
        h2: "Who actually needs this",
        blocks: [
          {
            kind: "p",
            text: "For 2026, the IRS phases out direct Roth IRA contributions for higher earners. If your income is above that range, direct contributions are off the table. The backdoor route still lets you get money into a Roth through a conversion. Check the current IRS figures to see where the phaseouts start.",
          },
        ],
      },
      {
        h2: "The two steps, in order",
        blocks: [
          {
            kind: "p",
            text: "First, make a nondeductible contribution to a traditional IRA, up to the annual IRA limit ($7,500 for 2026 per the site's IRS figures). Second, convert that traditional IRA balance to a Roth IRA. The conversion itself has no income limit, which is why this path exists. You report both steps on your tax return using Form 8606.",
          },
        ],
      },
      {
        h2: "The pro-rata rule warning",
        blocks: [
          {
            kind: "p",
            text: "The pro-rata rule is the trap. If you hold pre-tax money in any traditional, SEP, or SIMPLE IRA, the IRS treats your conversion as coming proportionally from all of them. That means part of your conversion is taxable, even if you converted only the new contribution. Rolling old pre-tax IRA money into a 401(k) first can clear the path.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do I pay taxes on the backdoor Roth conversion?",
        a: "The conversion is tax-free if you convert only after-tax money with no earnings. Any growth before the conversion is taxable as ordinary income. This is why many people convert quickly after contributing.",
      },
      {
        q: "Can I do a backdoor Roth every year?",
        a: "Yes, as long as you have earned income and the rules stay the same. The annual IRA contribution limit caps each year's amount. Many people repeat the two steps each January.",
      },
    ],
    sources: [
      {
        label: "IRS: Individual retirement arrangements (IRAs)",
        href: "https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras",
      },
      {
        label: "IRS: Roth IRAs",
        href: "https://www.irs.gov/retirement-plans/roth-iras",
      },
      {
        label: "IRS: Publication 590-A",
        href: "https://www.irs.gov/publications/p590a",
      },
    ],
    related: [
      { label: "Backdoor Roth IRA steps", href: "/guides/backdoor-roth-ira-steps" },
      { label: "Roth IRA basics", href: "/wealth/roth-ira-explained" },
      { label: "Roth vs traditional calculator", href: "/tools/roth-vs-traditional" },
    ],
    startHref: "/start",
  },
  {
    slug: "rmd-age-73-how-much",
    title: "When do required minimum distributions start, and how much?",
    metaTitle: "RMDs at 73: When They Start and How Much to Take",
    description:
      "RMDs start at 73 under SECURE 2.0. The amount comes from your balance and IRS life-expectancy tables, and it counts as ordinary income.",
    keyword: "required minimum distributions age 73 how much",
    eyebrow: "Ask Christian",
    lede: "Age 73 is the trigger. Your balance and an IRS table set the amount.",
    published: "2026-10-08",
    updated: "2026-10-08",
    intro:
      "A required minimum distribution is the smallest amount you must withdraw each year from tax-deferred retirement accounts like a traditional IRA or 401(k). Under SECURE 2.0, RMDs start at age 73 (75 if you were born in 1960 or later). The amount comes from last December 31 balance divided by the factor for your age in the IRS life-expectancy tables. You can take it monthly, quarterly, or all at once, the IRS only sets the deadline and the minimum.",
    sections: [
      {
        h2: "When they start",
        blocks: [
          {
            kind: "p",
            text: "Under SECURE 2.0, RMDs begin at age 73 for people born between 1951 and 1959. Born in 1960 or later, your RMD age is 75. Your first RMD is due by April 1 of the year after you reach that age, and every one after that is due by December 31. Delaying the first one to April 1 means two withdrawals land in the same tax year, and both count as taxable income that year.",
          },
        ],
      },
      {
        h2: "How the yearly amount is figured",
        blocks: [
          {
            kind: "p",
            text: "The IRS publishes life-expectancy tables in Publication 590-B. You find the factor for your age, then divide last December 31 balance by that factor. With round numbers: a $274,000 balance divided by a 27.4 factor gives a $10,000 RMD. The factor shrinks each year, so the required withdrawal grows as a share of the balance.",
          },
        ],
      },
      {
        h2: "What counts, and what does not",
        blocks: [
          {
            kind: "p",
            text: "RMDs apply to tax-deferred accounts like traditional IRAs, 401(k)s, 403(b)s, and 457(b)s. Roth IRAs have no RMDs while the original owner is alive. Withdrawals from tax-deferred accounts count as ordinary income in the year you take them, which is why the timing of other income matters in the same year.",
          },
        ],
      },
      {
        h2: "The still-working exception, and what happens if you miss",
        blocks: [
          {
            kind: "p",
            text: "If you are still working at 73, you can delay RMDs from your current employer's plan until you retire, if the plan allows it. IRA RMDs still start on schedule regardless. The IRS charges an excise tax on the amount you failed to withdraw, 25% of the shortfall under SECURE 2.0, dropping to 10% when you correct the mistake within two years.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Do RMDs apply to Roth IRAs?",
        a: "No. Roth IRAs have no RMDs while the original owner is alive. Beneficiaries who inherit a Roth follow separate rules.",
      },
      {
        q: "Are RMDs taxed?",
        a: "Yes. Withdrawals from tax-deferred accounts count as ordinary income in the year you take them.",
      },
      {
        q: "What if I am still working at 73?",
        a: "You can delay RMDs from your current employer's plan until you retire, if the plan allows it. IRA RMDs still start at 73.",
      },
    ],
    sources: [
      {
        label: "IRS: Retirement plan and IRA required minimum distributions FAQs",
        href: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
      },
      {
        label: "SECURE 2.0 Act of 2022 (RMD age raised to 73)",
        href: "https://www.congress.gov/bill/117th-congress/house-bill/2617",
      },
    ],
    related: [
      { label: "RMDs at 73, explained", href: "/wealth/rmd-explained-73" },
      { label: "Social Security: 62 vs 70", href: "/guides/social-security-62-vs-70" },
      { label: "Inherited IRA: the 10-year rule", href: "/guides/inherited-ira-ten-year-rule" },
    ],
    startHref: "/start",
  },
];
