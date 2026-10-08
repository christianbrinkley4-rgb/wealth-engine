import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import {
  AGENT,
  COMPENSATION_DISCLOSURE,
  GOVERNMENT_DISCLAIMER,
  publishedProfiles,
  TPMO_DISCLAIMER,
} from "@/lib/agent";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { placeNames, TRIAD_CITIES } from "@/lib/triad";
import { WEALTH_ARTICLES } from "@/lib/wealth/articles";
import { WEALTH_NAV, WEALTH_TOOLS } from "@/lib/wealth/site";
import { PERSONALITIES } from "@/lib/wealth/quizzes";
import { learnEntries } from "@/lib/learn";

/** Public summary kept consistent with the visitor-facing pages. */
export const dynamic = "force-static";

/** New hub pages (Oct 2026): wealth library, tools, AI guides, SEO guides. */
const NEW_GUIDE_PAGES = [
  ...TRAFFIC_GUIDES.map((guide) => ({ path: `/guides/${guide.slug}`, title: guide.title, blurb: guide.answer })),
  { path: "/guides", title: "Money, tax, and Medicare guides", blurb: "Browse practical guides by question." },
  { path: "/wealth/money-moves-in-your-20s", title: "Five money moves for your 20s", blurb: "The five money moves that matter most in your 20s, in plain English." },
  { path: "/wealth/roth-ira-explained", title: "Roth IRA, explained", blurb: "What a Roth IRA is, who it fits, and the 2026 IRS limits." },
  { path: "/wealth/building-in-public", title: "Building in public: the manifesto", blurb: "Why Christian documents his money journey in public." },
  { path: "/wealth/teens-first-job-money-guide", title: "Your First Job: A Teen Money Guide", blurb: "First paycheck explained for teens: taxes, W-4, and what to do with it." },
  { path: "/wealth/credit-score-basics", title: "Credit Scores, Explained Plainly", blurb: "What a credit score is and what builds it." },
  { path: "/wealth/budgeting-that-actually-works", title: "Budgeting That Actually Works", blurb: "A budgeting system that survives real life." },
  { path: "/wealth/student-loans-payoff-plan", title: "A Student Loan Payoff Plan That Fits on One Page", blurb: "Avalanche vs snowball, loan inventory, and automation." },
  { path: "/wealth/buying-first-home-money-guide", title: "Buying Your First Home: The Money Parts", blurb: "Down payment, closing costs, PITI, and the post-purchase emergency fund." },
  { path: "/wealth/401k-explained", title: "Your 401(k), Explained", blurb: "What a 401(k) is, the match, vesting, and 2026 IRS limits." },
  { path: "/wealth/life-insurance-explained", title: "Life Insurance, Explained in Plain English", blurb: "Term vs whole life, how agents get paid, questions to ask." },
  { path: "/wealth/529-college-savings-basics", title: "529 College Savings Plans, Explained", blurb: "How 529 plans work, including the NC tax picture." },
  { path: "/wealth/catch-up-contributions-after-50", title: "Catch-Up Contributions After 50", blurb: "2026 catch-up limits for 401(k)s, IRAs, and HSAs." },
  { path: "/wealth/pre-retirement-5-year-checklist", title: "Your 5-Year Pre-Retirement Checklist", blurb: "A numbered checklist for the five years before retirement." },
  { path: "/wealth/first-tax-return-guide", title: "Your First Tax Return, Explained", blurb: "W-2 vs 1099, the standard deduction, and when you must file." },
  { path: "/wealth/tax-brackets-explained-plainly", title: "Tax Brackets, Explained Plainly", blurb: "2026 federal tax brackets and marginal vs effective rates." },
  { path: "/wealth/roth-vs-traditional-taxes", title: "Roth vs Traditional: The Tax Trade", blurb: "Pay tax now vs pay later, explained mechanically." },
  { path: "/wealth/disability-insurance-explained", title: "Disability Insurance, Explained", blurb: "Short vs long term, employer vs individual coverage." },
  { path: "/wealth/health-insurance-basics", title: "Health Insurance Basics", blurb: "Premiums, deductibles, copays, and out-of-pocket maximums." },
  { path: "/wealth/broke-money-reset-plan", title: "The Broke Money Reset Plan", blurb: "A triage plan for when the money runs out." },
  { path: "/wealth/emergency-fund-guide", title: "The Emergency Fund Guide", blurb: "How to build an emergency fund on autopay." },
  { path: "/wealth/social-security-explained", title: "Social Security, Explained in Plain English", blurb: "How Social Security works, FRA, and 2026 figures." },
  { path: "/wealth/hsa-explained", title: "The HSA, Explained in Plain English", blurb: "The triple tax advantage and 2026 HSA limits." },
  { path: "/wealth/rmd-explained-73", title: "RMDs at 73, Explained in Plain English", blurb: "Required minimum distributions under SECURE 2.0." },
  { path: "/wealth/credit-cards-beginners", title: "Credit Cards for Beginners", blurb: "How credit cards work: APR, grace periods, minimums." },
  { path: "/wealth/rent-vs-buy-math", title: "Rent vs. Buy: The Math, Minus the Opinions", blurb: "The math inputs on both sides of rent vs buy." },
  { path: "/wealth/car-buying-money-guide", title: "The Real Cost of Buying a Car", blurb: "Total cost thinking: price, interest, insurance, ownership." },
  { path: "/wealth/side-hustle-taxes", title: "Side-Hustle Taxes, Explained in Plain English", blurb: "Self-employment tax and tracking income and expenses." },
  { path: "/wealth/529-vs-roth-for-college", title: "529 vs. Roth IRA for College", blurb: "Two education-funding paths compared plainly." },
  { path: "/tools", title: "Money calculators", blurb: "Free interactive money calculators." },
  { path: "/tools/roth-vs-traditional", title: "Roth vs traditional calculator", blurb: "Side-by-side after-tax growth projection with 2026 IRS limits." },
  { path: "/tools/emergency-fund", title: "Emergency fund calculator", blurb: "Target fund size and a monthly savings plan." },
  { path: "/tools/debt-payoff", title: "Debt payoff calculator", blurb: "Avalanche vs snowball, side by side." },
  { path: "/tools/retirement-projector", title: "Retirement projector", blurb: "Project savings growth with a labeled assumed rate." },
  { path: "/tools/take-home-pay", title: "Take-home pay calculator", blurb: "Federal, NC, and FICA taxes on your salary, estimated." },
  { path: "/tools/life-insurance-needs", title: "Life insurance needs calculator", blurb: "DIME method starting point for a conversation." },
  { path: "/tools/compound-interest", title: "Compound interest calculator", blurb: "Watch growth compound year by year." },
  { path: "/ai", title: "AI in daily life", blurb: "What AI can actually do for a normal person, honest about limits." },
  { path: "/ai/ai-tools-compared", title: "AI tools compared honestly", blurb: "ChatGPT, Claude, Gemini, Copilot, Perplexity: what each is good at, limits, cost." },
  { path: "/ai/which-ai-for-which-task", title: "Which AI for which task", blurb: "Match the task to the tool: writing, research, email, learning." },
  { path: "/ai/ai-for-job-search", title: "AI for job search", blurb: "Resume help and interview prep with realistic expectations." },
  { path: "/ai/ai-for-small-business", title: "AI for small business", blurb: "What a one-person business can automate." },
  { path: "/ai/ai-for-seniors", title: "AI for seniors", blurb: "Simplest useful starting points for 65+, with scam warnings." },
  { path: "/ai/ai-money-tasks", title: "AI money tasks", blurb: "Budgeting help, bill scripts, and subscription audits." },
  { path: "/ai/ai-mistakes-to-avoid", title: "AI mistakes to avoid", blurb: "Hallucinations, sensitive data, and blind trust." },
  { path: "/guides/what-medicare-does-not-cover", title: "What Medicare does not cover", blurb: "The exclusion list and cost-sharing gaps, plainly." },
  { path: "/guides/medicare-hsa-contributions", title: "Medicare and HSA contributions", blurb: "The 6-month retroactive Part A trap, as dated action steps." },
  { path: "/guides/working-while-collecting-social-security", title: "Working while collecting Social Security", blurb: "2026 earnings limits and how withheld benefits come back." },
  { path: "/guides/is-social-security-taxed", title: "Is Social Security taxed?", blurb: "Combined-income mechanics and the senior deduction." },
  { path: "/guides/missed-medicare-enrollment", title: "What happens if you miss Medicare enrollment", blurb: "Open enrollment vs general enrollment paths." },
  { path: "/guides/medicare-automatic-renewal", title: "Do you have to renew Medicare every year?", blurb: "Automatic renewal and the yearly review that still matters." },
  { path: "/guides/medicare-part-b-employer-coverage", title: "Do I need Part B with employer coverage?", blurb: "The 20-employee rule, the 8-month SEP, and the COBRA trap." },
  { path: "/guides/medicare-travel", title: "Does Medicare Advantage work out of state?", blurb: "Emergency coverage, HMO vs PPO travel, service-area rules." },
  { path: "/guides/irmaa-brackets-2026", title: "2026 IRMAA brackets", blurb: "The complete 2026 IRMAA table, verified against CMS." },
  { path: "/guides/standard-deduction-seniors-2026", title: "Standard deduction for seniors 2026", blurb: "2026 standard deduction plus the 65+ add-on amounts." },
] as const;

export function GET() {
  const articleLines = learnEntries()
    .filter((entry) => entry.kind === "Answer" || entry.kind === "Explainer")
    .map((entry) => `- [${entry.title}](${SITE_URL}${entry.href}): ${entry.blurb}`)
    .join("\n");
  const cityLines = TRIAD_CITIES.map((city) =>
    [
      `- [Medicare in ${city.name}](${SITE_URL}/medicare-in/${city.slug}): personal help with enrollment, doctors, prescriptions, and coverage choices. Confirm Medicare Advantage availability for the visitor’s home address.`,
      `- [Life insurance in ${city.name}](${SITE_URL}/life-insurance-in/${city.slug}): review existing coverage and family needs.`,
      `- [Retirement help in ${city.name}](${SITE_URL}/retirement-in/${city.slug}): Medicare and insurance education, with financial planning coordinated through an advisor.`,
    ].join("\n"),
  ).join("\n");

  const wealthLines = [
    `- [Money tools for your 20s](${SITE_URL}/wealth): christianbuildswealth home.`,
    `- [Christian's links](${SITE_URL}/links): downloads and contact links.`,
    ...WEALTH_NAV.map((item) => `- [${item.label}](${SITE_URL}${item.href}): hub section.`),
    ...PERSONALITIES.map((type) => `- [${type.name}](${SITE_URL}/wealth/quiz/money-personality/${type.id}): ${type.tagline}`),
    ...WEALTH_TOOLS.map(
      (tool) => `- [${tool.title}](${SITE_URL}${tool.href}): ${tool.kind}. ${tool.blurb}`,
    ),
    ...WEALTH_ARTICLES.map(
      (article) => `- [${article.title}](${SITE_URL}/wealth/learn/${article.slug}): ${article.answer}`,
    ),
    ...NEW_GUIDE_PAGES.map(
      (page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.blurb}`,
    ),
  ].join("\n");

  const profiles = publishedProfiles();
  const profileSection =
    profiles.length > 0
      ? `## Public profiles

${profiles.map((profile) => `- ${profile.label}: ${profile.url}`).join("\n")}
`
      : "";

  const body = `# ${SITE_NAME}

${AGENT.name} is a licensed insurance agent based in ${AGENT.city}, ${AGENT.state}, and an accounting senior at UNC Greensboro. He helps people approaching retirement, people already retired, and their families. Consultations are no cost, with no obligation to enroll or buy.

## Personal, local help

- Christian personally reviews inquiries. Contact information is not sold to other agents.
- Meetings can be at home, at a convenient public location, or by phone. Visitors may include a spouse or family member.
- Communities served: ${placeNames().join(", ")}.
- Visitors outside those communities can get in touch to discuss a way to meet. Phone consultations are available in North Carolina.
- Licensed in: ${AGENT.licensedStates.join(", ")}.
- Phone: ${AGENT.phone}.
- Hours: ${AGENT.hours} ${AGENT.afterHoursPromise}
- [About Christian](${SITE_URL}/about)
- [Service area](${SITE_URL}/service-area)
- [Request a consultation](${SITE_URL}/start)
- [Ways to arrange a meeting](${SITE_URL}/schedule)

${profileSection}
## Who answers

Every page on this site is published under one name: ${AGENT.name}, ${AGENT.licenseLine}. There is no call center, no lead resale, and no hand-off to another agent. Calls to ${AGENT.phone} go to Christian. Articles show the date they were last updated and list their official sources.

## Local questions this site is meant to answer

This site is for people in and near Greensboro, High Point, and Winston-Salem, North Carolina who want a licensed agent they can meet in person. Typical questions:

- When to enroll in Medicare at 65, including if still working
- How Medicare Advantage and Medigap differ
- How to check whether a doctor in Guilford, Forsyth, or a neighboring county is in a plan
- Life insurance when work coverage ends
- How a 401(k) withdrawal or Roth conversion can affect a Medicare premium later

${TPMO_DISCLAIMER}

## Guides

- [Insurance services](${SITE_URL}/insurance-services): Medicare, life insurance, care coverage, annuity consultations and retirement education. See what each service covers and what to bring.
- [Learning Hub](${SITE_URL}/learn): every guide, answer, explainer, and tool on the site, organized by situation (turning 65, already on Medicare, costs, taxes, retirement income, insurance, helping a parent).
- [Medicare words in plain English](${SITE_URL}/medicare-words): short definitions of Part A, Part B, Medicare Advantage, Part D, Medigap, IRMAA, the enrollment periods, and other common terms, each with a link to the official Medicare.gov, CMS, or Social Security page.
- [Taxes and retirement](${SITE_URL}/taxes-and-retirement): plain-English explainers on Social Security taxes, required minimum distributions, and Roth conversions, and how retirement income affects Medicare premiums. Educational, not tax advice.
- [Plan check](${SITE_URL}/plan-check): a seven-question quiz on whether a current Medicare plan deserves a second look before December 7. Answers stay on the device unless the visitor asks for results by email.
- [Turning 65](${SITE_URL}/turning-65): Medicare enrollment timing, current coverage, and questions to consider before choosing a plan.
- [Annual enrollment](${SITE_URL}/annual-enrollment): review next year’s costs, doctors, and prescriptions before deciding whether to keep or change coverage.
- [Medicare Advantage and Medigap](${SITE_URL}/advantage-vs-medigap): differences in coverage, costs, provider access, and enrollment rules.
- [Keeping your doctors](${SITE_URL}/keep-my-doctor): steps to confirm a provider’s participation before enrolling.
- [Helping a parent](${SITE_URL}/helping-a-parent): organize questions, check dates, and understand permission requirements while respecting a parent’s wishes.
- [Life insurance](${SITE_URL}/life-insurance): review existing policies, beneficiaries, budget, and family needs.
- [Care and critical illness coverage](${SITE_URL}/care-coverage): understand coverage options, limits, and questions to ask.
- [Long-term care insurance](${SITE_URL}/long-term-care-insurance): care preferences, benefit requirements, costs, and family questions.
- [Short-term care insurance](${SITE_URL}/short-term-care-insurance): review limited care benefits, covered settings, and expenses that remain.
- [Critical illness insurance](${SITE_URL}/critical-illness-insurance): understand specified conditions, payment rules, exclusions, and existing coverage.
- [Annuities](${SITE_URL}/annuities): understand guarantees, costs, and access to funds before deciding.
- [Retirement income](${SITE_URL}/retirement-income): general education about retirement accounts and potential Medicare premium effects.
- [Social Security timing](${SITE_URL}/social-security-timing): consider income needs, family circumstances, and personal benefit estimates.
- [Medicare premium review](${SITE_URL}/irmaa-appeal): learn about requesting a review through Social Security after a qualifying life change.

## Question-led articles and retirement explainers

${articleLines}

## Published 2026 figures

- [2026 Medicare costs](${SITE_URL}/medicare-costs-2026): the Part A, Part B, Part D and IRMAA figures for 2026, each taken from a named CMS fact sheet. Part B standard premium $202.90 a month; Part B annual deductible $283; Part A hospital deductible $1,736 per benefit period; Part D out-of-pocket cap $2,100 a year; Part D maximum deductible $615. Income-related surcharges begin above $109,000 for a single filer and $218,000 filing jointly, based on the 2024 tax return. These figures are federal and identical in every state; only plan availability and pricing vary locally.

## 2027 figures

- [The 2026-2027 money numbers](${SITE_URL}/numbers): tax brackets and standard deductions, 401(k) and IRA limits, HSA limits, Social Security wage base and COLA, and Medicare premiums, deductibles, and caps, each tied to a named IRS, SSA, or CMS source.
- [2027 Medicare numbers at a glance](${SITE_URL}/medicare-numbers-2027): Part B standard premium about $209.50 a month (projected), Part D standard deductible $700 and out-of-pocket cap $2,400 (final), Medicare Advantage average premium about $12 a month. Each figure tied to a named source.
- [Medicare changes for 2027](${SITE_URL}/medicare-changes-2027): what is changing in Medicare for 2027 and what to check before open enrollment.
- [Is there still a Medicare donut hole in 2027?](${SITE_URL}/medicare-part-d-donut-hole-2027): how the $2,400 Part D out-of-pocket cap works in 2027.

## Free tools

- [Medicare enrollment dates](${SITE_URL}/turning-65#enrollment-dates): find estimated enrollment dates, print them, or save them to a personal calendar without providing contact information. Includes the first-of-month birthday adjustment.
- [Save Medicare dates](${SITE_URL}/remind-me): the same calendar tool; this page does not offer automatic reminder emails.
- [2026 Medicare Part B estimate](${SITE_URL}/medicare): an estimate using published 2026 rates.
- [Roth conversion timing examples](${SITE_URL}/plan): compare estimated Medicare premium effects using 2026 rates.
- [Roth conversion estimate](${SITE_URL}/roth-window): explore income-related Medicare charges using 2026 rates. Future rates may differ.

## Money tools for people in their 20s and 30s (christianbuildswealth)

A separate section of this site at ${SITE_URL}/wealth. General money education for younger adults. Christian is licensed for insurance, not securities, so nothing here recommends an investment.

${wealthLines}

## Qualifications and disclosures

Christian is currently a licensed insurance agent, not a CPA, CFP, or registered investment adviser. He works with an advisor for financial planning. Personal tax, legal, and investment advice requires an appropriately qualified professional. He represents a limited number of insurance companies; the site does not claim every Medicare plan is available through him. Confirm current plan and provider details before enrollment.

${COMPENSATION_DISCLOSURE}

${GOVERNMENT_DISCLAIMER} The site is not affiliated with the University of North Carolina at Greensboro or the Social Security Administration.

## Local pages

${cityLines}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
