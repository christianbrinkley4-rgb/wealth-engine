import { CONTENT_CATALOG as NEW_LIBRARY_PAGES } from "@/lib/contentCatalog";
import { machineDirectory } from "@/lib/machineDirectory";
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
    ...tools.map((tool) => `- [${tool.title}](${SITE_URL}${tool.href}): ${tool.blurb}`),
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
      (type) =>
        `- [${type.name}](${SITE_URL}/wealth/quiz/money-personality/${type.id}): ${type.tagline}`,
    ),
    ...WEALTH_ARTICLES.map(
      (article) =>
        `- [${article.title}](${SITE_URL}/wealth/learn/${article.slug}): ${article.answer}`,
    ),
    ...NEW_LIBRARY_PAGES.map((page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.blurb}`),
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

  return new Response(body + machineDirectory(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
