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
import { learnEntries, SITUATIONS } from "@/lib/learn";

/**
 * Comprehensive machine-readable index of every key page on the site.
 * The short version lives at /llms.txt. Descriptions stay to one plain
 * sentence so assistants can quote them directly.
 */
export const dynamic = "force-static";

/** New library pages (Oct 2026): wealth guides, tools, and SEO guides. */
const NEW_LIBRARY_PAGES = [
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

const TOWN_PAGES = [
  { slug: "medicare-creedmoor-nc", town: "Creedmoor" },
  { slug: "medicare-oxford-nc", town: "Oxford" },
  { slug: "medicare-butner-nc", town: "Butner" },
  { slug: "medicare-asheboro-nc", town: "Asheboro" },
  { slug: "medicare-mebane-nc", town: "Mebane" },
  { slug: "medicare-eden-nc", town: "Eden" },
  { slug: "medicare-roxboro-nc", town: "Roxboro" },
  { slug: "medicare-madison-nc", town: "Madison" },
  { slug: "medicare-graham-nc", town: "Graham" },
  { slug: "medicare-liberty-nc", town: "Liberty" },
  { slug: "medicare-ramseur-nc", town: "Ramseur" },
] as const;

export function GET() {
  const entries = learnEntries();
  const guides = entries.filter((entry) => entry.kind !== "Tool");
  const tools = entries.filter((entry) => entry.kind === "Tool");

  const medicareLines = SITUATIONS.map((situation) => {
    const lines = guides
      .filter((entry) => entry.situation === situation.id)
      .map((entry) => `- [${entry.title}](${SITE_URL}${entry.href}): ${entry.blurb}`);
    return `### ${situation.label}\n\n${lines.join("\n")}`;
  }).join("\n\n");

  const medicareExtraLines = [
    `- [The 2026-2027 money numbers](${SITE_URL}/numbers): tax brackets, retirement and HSA limits, Social Security, and Medicare figures, each tied to a named IRS, SSA, or CMS source.`,
    `- [2027 Medicare numbers at a glance](${SITE_URL}/medicare-numbers-2027): the 2027 Medicare premiums, deductibles, and caps, each tied to a named source.`,
    `- [Medicare changes for 2027](${SITE_URL}/medicare-changes-2027): what is changing in Medicare for 2027 and what to check before open enrollment.`,
    `- [Is there still a Medicare donut hole in 2027?](${SITE_URL}/medicare-part-d-donut-hole-2027): how the Part D out-of-pocket cap works in 2027.`,
    `- [Medicare Advantage vs. Medigap in Greensboro, NC](${SITE_URL}/medicare-advantage-vs-medigap-greensboro-nc): the two paths compared with Greensboro-area specifics.`,
    `- [Medicare Supplement plans in Greensboro, NC](${SITE_URL}/medicare-supplement-plans-greensboro-nc): how Medigap plans work for Greensboro-area residents.`,
    `- [Annual Enrollment Period](${SITE_URL}/aep): the fall enrollment window, October 15 to December 7, and what to review.`,
    `- [Insurance services](${SITE_URL}/insurance-services): Medicare, life insurance, care coverage, and annuity consultations, plus what to bring.`,
    `- [Care and critical illness coverage](${SITE_URL}/care-coverage): coverage options, limits, and the questions worth asking.`,
    `- [Medicare questions, answered](${SITE_URL}/answers): short answers to Medicare questions Triad neighbors actually asked.`,
    `- [Taxes and retirement hub](${SITE_URL}/taxes-and-retirement): plain-English explainers on Social Security taxes, RMDs, and Roth conversions.`,
    `- [The Learning Hub](${SITE_URL}/learn): every guide, answer, explainer, and tool on the site, organized by situation.`,
  ].join("\n");

  const calcLines = [
    ...tools.map(
      (tool) => `- [${tool.title}](${SITE_URL}${tool.href}): ${tool.blurb}`,
    ),
    ...WEALTH_TOOLS.map(
      (tool) => `- [${tool.title}](${SITE_URL}${tool.href}): ${tool.kind}. ${tool.blurb}`,
    ),
    `- [Money calculators](${SITE_URL}/tools): free interactive money calculators.`,
    `- [Roth vs traditional calculator](${SITE_URL}/tools/roth-vs-traditional): side-by-side after-tax growth projection with 2026 IRS limits.`,
    `- [Emergency fund calculator](${SITE_URL}/tools/emergency-fund): target fund size and a monthly savings plan.`,
    `- [Debt payoff calculator](${SITE_URL}/tools/debt-payoff): avalanche vs snowball, side by side.`,
    `- [Retirement projector](${SITE_URL}/tools/retirement-projector): project savings growth with a labeled assumed rate.`,
    `- [Take-home pay calculator](${SITE_URL}/tools/take-home-pay): federal, NC, and FICA taxes on your salary, estimated.`,
    `- [Life insurance needs calculator](${SITE_URL}/tools/life-insurance-needs): DIME method starting point for a conversation.`,
    `- [Compound interest calculator](${SITE_URL}/tools/compound-interest): watch growth compound year by year.`,
  ].join("\n");

  const wealthLines = [
    `- [Money tools for your 20s and 30s](${SITE_URL}/wealth): christianbuildswealth home.`,
    `- [Christian's links](${SITE_URL}/links): downloads and contact links.`,
    ...WEALTH_NAV.map((item) => `- [${item.label}](${SITE_URL}${item.href}): hub section.`),
    ...PERSONALITIES.map(
      (type) => `- [${type.name}](${SITE_URL}/wealth/quiz/money-personality/${type.id}): ${type.tagline}`,
    ),
    ...WEALTH_ARTICLES.map(
      (article) => `- [${article.title}](${SITE_URL}/wealth/learn/${article.slug}): ${article.answer}`,
    ),
    ...NEW_LIBRARY_PAGES.map(
      (page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.blurb}`,
    ),
  ].join("\n");

  const townLines = [
    `- [Medicare help in your town](${SITE_URL}/medicare-nc-towns): Medicare help across North Carolina towns, starting with Granville County.`,
    ...TOWN_PAGES.map(
      (page) =>
        `- [Medicare help in ${page.town}, NC](${SITE_URL}/${page.slug}): Medicare help in ${page.town}, NC: enrollment timing, doctors, and plan choices.`,
    ),
  ].join("\n");

  const cityLines = TRIAD_CITIES.map((city) =>
    [
      `- [Medicare in ${city.name}](${SITE_URL}/medicare-in/${city.slug}): personal help with enrollment, doctors, prescriptions, and coverage choices. Confirm Medicare Advantage availability for the visitor’s home address.`,
      `- [Life insurance in ${city.name}](${SITE_URL}/life-insurance-in/${city.slug}): review existing coverage and family needs.`,
      `- [Retirement help in ${city.name}](${SITE_URL}/retirement-in/${city.slug}): Medicare and insurance education, with financial planning coordinated through an advisor.`,
    ].join("\n"),
  ).join("\n");

  const profiles = publishedProfiles();
  const profileSection =
    profiles.length > 0
      ? `## Public profiles

${profiles.map((profile) => `- ${profile.label}: ${profile.url}`).join("\n")}
`
      : "";

  const body = `# ${SITE_NAME}

${AGENT.name} is a licensed insurance agent in ${AGENT.city}, ${AGENT.state}, and an accounting senior at UNC Greensboro graduating December 2026. This index lists every key page on the site: Medicare guides, money tools for younger adults, calculators, and contact details. Consultations are no cost, with no obligation to enroll or buy.

## Medicare help

${medicareLines}

### 2027 updates and plan choices

${medicareExtraLines}

${TPMO_DISCLAIMER}

## Money hub (christianbuildswealth)

A separate section of this site at ${SITE_URL}/wealth. General money education for younger adults. Christian is licensed for insurance, not securities, so nothing here recommends an investment.

${wealthLines}

## Calculators

Free tools. Results are estimates from the numbers the visitor types in, not quotes or predictions.

${calcLines}

## AI guides

Plain-language AI guides for regular people, written from Christian's experience running his business on AI. Honest about limits.

- [AI in daily life](${SITE_URL}/ai): what AI can actually do for a normal person, honest about limits.
- [AI tools compared honestly](${SITE_URL}/ai/ai-tools-compared): ChatGPT, Claude, Gemini, Copilot, Perplexity, what each is good at, honest limits, cost.
- [Which AI for which task](${SITE_URL}/ai/which-ai-for-which-task): match the task to the tool, plain-English decision guide.
- [AI for job search](${SITE_URL}/ai/ai-for-job-search): resume help and interview prep with realistic expectations.
- [AI for small business](${SITE_URL}/ai/ai-for-small-business): what a one-person business can automate.
- [AI for seniors](${SITE_URL}/ai/ai-for-seniors): simplest useful starting points for 65+, with scam warnings.
- [AI money tasks](${SITE_URL}/ai/ai-money-tasks): budgeting help, bill scripts, and subscription audits.
- [AI mistakes to avoid](${SITE_URL}/ai/ai-mistakes-to-avoid): hallucinations, sensitive data, and blind trust.
- [The Learning Hub](${SITE_URL}/learn): every guide, answer, explainer, and tool on the site, organized by situation.
- [Medicare words in plain English](${SITE_URL}/medicare-words): short definitions of Part A, Part B, Medicare Advantage, Part D, Medigap, IRMAA, and the enrollment periods.
- [Short machine summary](${SITE_URL}/llms.txt): the compact version of this index.

## About

Christian is currently a licensed insurance agent, not a CPA, CFP, or registered investment adviser. He works with an advisor for financial planning. He represents a limited number of insurance companies; the site does not claim every Medicare plan is available through him.

- [About Christian](${SITE_URL}/about): who he is, how he works, and how he gets paid.
- [Service area](${SITE_URL}/service-area): the Triad communities served and the ways to meet. Communities: ${placeNames().join(", ")}.

${COMPENSATION_DISCLOSURE}

${GOVERNMENT_DISCLAIMER} The site is not affiliated with the University of North Carolina at Greensboro or the Social Security Administration.

## Contact

- [Request a consultation](${SITE_URL}/start): tell Christian what you need help with and he replies personally.
- [Ways to arrange a meeting](${SITE_URL}/schedule): meet at home, in public, or by phone.
- [Save Medicare dates](${SITE_URL}/remind-me): find enrollment dates, print them, or save them to a calendar.
- Phone: ${AGENT.phone}
- Email: ${AGENT.email}
- Hours: ${AGENT.hours} ${AGENT.afterHoursPromise}
- Licensed in: ${AGENT.licensedStates.join(", ")}.

${profileSection}
## Local pages

${townLines}

${cityLines}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
