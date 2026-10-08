/**
 * Content layer for the MCP connector. Everything here is read from the
 * site's existing sources of truth; nothing is duplicated:
 *
 * - lib/trafficGuides.ts: data-driven /guides/* (full text)
 * - lib/wealth/articles.ts: data-driven /wealth/learn/* (full text)
 * - lib/wealth/site.ts: WEALTH_TOOLS (the tool catalog)
 * - lib/medicareNumbers2027.ts: the 2027 Medicare figures
 * - app/llms.txt/route.ts: the llms.txt machine index (resource)
 *
 * The 28 static wealth articles and 10 static guides have no data source
 * (their copy lives in page components), so this file carries a small
 * title/blurb/URL index for them and returns their URL for full text.
 */

import { WEALTH_ARTICLES, wealthArticleText } from "@/lib/wealth/articles";
import { WEALTH_TOOLS } from "@/lib/wealth/site";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import { medicareNumbers2027Markdown } from "@/lib/medicareNumbers2027";
import { SITE_URL } from "@/lib/seo";

export type McpDoc = {
  slug: string;
  title: string;
  summary: string;
  url: string;
  kind: "guide" | "wealth-article" | "tool";
};

/** The 28 static wealth articles (copy lives in page components). */
const STATIC_WEALTH_ARTICLES: ReadonlyArray<{ slug: string; title: string; blurb: string }> = [
  { slug: "money-moves-in-your-20s", title: "Five money moves for your 20s", blurb: "The five money moves that matter most in your 20s, in plain English." },
  { slug: "roth-ira-explained", title: "Roth IRA, explained", blurb: "What a Roth IRA is, who it fits, and the 2026 IRS limits." },
  { slug: "building-in-public", title: "Building in public: the manifesto", blurb: "Why Christian documents his money journey in public." },
  { slug: "teens-first-job-money-guide", title: "Your First Job: A Teen Money Guide", blurb: "First paycheck explained for teens: taxes, W-4, and what to do with it." },
  { slug: "credit-score-basics", title: "Credit Scores, Explained Plainly", blurb: "What a credit score is and what builds it." },
  { slug: "budgeting-that-actually-works", title: "Budgeting That Actually Works", blurb: "A budgeting system that survives real life." },
  { slug: "student-loans-payoff-plan", title: "A Student Loan Payoff Plan That Fits on One Page", blurb: "Avalanche vs snowball, loan inventory, and automation." },
  { slug: "buying-first-home-money-guide", title: "Buying Your First Home: The Money Parts", blurb: "Down payment, closing costs, PITI, and the post-purchase emergency fund." },
  { slug: "401k-explained", title: "Your 401(k), Explained", blurb: "What a 401(k) is, the match, vesting, and 2026 IRS limits." },
  { slug: "life-insurance-explained", title: "Life Insurance, Explained in Plain English", blurb: "Term vs whole life, how agents get paid, questions to ask." },
  { slug: "529-college-savings-basics", title: "529 College Savings Plans, Explained", blurb: "How 529 plans work, including the NC tax picture." },
  { slug: "catch-up-contributions-after-50", title: "Catch-Up Contributions After 50", blurb: "2026 catch-up limits for 401(k)s, IRAs, and HSAs." },
  { slug: "pre-retirement-5-year-checklist", title: "Your 5-Year Pre-Retirement Checklist", blurb: "A numbered checklist for the five years before retirement." },
  { slug: "first-tax-return-guide", title: "Your First Tax Return, Explained", blurb: "W-2 vs 1099, the standard deduction, and when you must file." },
  { slug: "tax-brackets-explained-plainly", title: "Tax Brackets, Explained Plainly", blurb: "2026 federal tax brackets and marginal vs effective rates." },
  { slug: "roth-vs-traditional-taxes", title: "Roth vs Traditional: The Tax Trade", blurb: "Pay tax now vs pay later, explained mechanically." },
  { slug: "disability-insurance-explained", title: "Disability Insurance, Explained", blurb: "Short vs long term, employer vs individual coverage." },
  { slug: "health-insurance-basics", title: "Health Insurance Basics", blurb: "Premiums, deductibles, copays, and out-of-pocket maximums." },
  { slug: "broke-money-reset-plan", title: "The Broke Money Reset Plan", blurb: "A triage plan for when the money runs out." },
  { slug: "emergency-fund-guide", title: "The Emergency Fund Guide", blurb: "How to build an emergency fund on autopay." },
  { slug: "social-security-explained", title: "Social Security, Explained in Plain English", blurb: "How Social Security works, FRA, and 2026 figures." },
  { slug: "hsa-explained", title: "The HSA, Explained in Plain English", blurb: "The triple tax advantage and 2026 HSA limits." },
  { slug: "rmd-explained-73", title: "RMDs at 73, Explained in Plain English", blurb: "Required minimum distributions under SECURE 2.0." },
  { slug: "credit-cards-beginners", title: "Credit Cards for Beginners", blurb: "How credit cards work: APR, grace periods, minimums." },
  { slug: "rent-vs-buy-math", title: "Rent vs. Buy: The Math, Minus the Opinions", blurb: "The math inputs on both sides of rent vs buy." },
  { slug: "car-buying-money-guide", title: "The Real Cost of Buying a Car", blurb: "Total cost thinking: price, interest, insurance, ownership." },
  { slug: "side-hustle-taxes", title: "Side-Hustle Taxes, Explained in Plain English", blurb: "Self-employment tax and tracking income and expenses." },
  { slug: "529-vs-roth-for-college", title: "529 vs. Roth IRA for College", blurb: "Two education-funding paths compared plainly." },
];

/** The 10 static guides (copy lives in page components). */
const STATIC_GUIDES: ReadonlyArray<{ slug: string; title: string; blurb: string }> = [
  { slug: "what-medicare-does-not-cover", title: "What Medicare does not cover", blurb: "The exclusion list and cost-sharing gaps, plainly." },
  { slug: "medicare-hsa-contributions", title: "Medicare and HSA contributions", blurb: "The 6-month retroactive Part A trap, as dated action steps." },
  { slug: "working-while-collecting-social-security", title: "Working while collecting Social Security", blurb: "2026 earnings limits and how withheld benefits come back." },
  { slug: "is-social-security-taxed", title: "Is Social Security taxed?", blurb: "Combined-income mechanics and the senior deduction." },
  { slug: "missed-medicare-enrollment", title: "What happens if you miss Medicare enrollment", blurb: "Open enrollment vs general enrollment paths." },
  { slug: "medicare-automatic-renewal", title: "Do you have to renew Medicare every year?", blurb: "Automatic renewal and the yearly review that still matters." },
  { slug: "medicare-part-b-employer-coverage", title: "Do I need Part B with employer coverage?", blurb: "The 20-employee rule, the 8-month SEP, and the COBRA trap." },
  { slug: "medicare-travel", title: "Does Medicare Advantage work out of state?", blurb: "Emergency coverage, HMO vs PPO travel, service-area rules." },
  { slug: "irmaa-brackets-2026", title: "2026 IRMAA brackets", blurb: "The complete 2026 IRMAA table, verified against CMS." },
  { slug: "standard-deduction-seniors-2026", title: "Standard deduction for seniors 2026", blurb: "2026 standard deduction plus the 65+ add-on amounts." },
];

/** Every searchable document across guides, wealth articles, and tools. */
export function mcpDocumentIndex(): McpDoc[] {
  const docs: McpDoc[] = [
    ...TRAFFIC_GUIDES.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      summary: guide.answer,
      url: `${SITE_URL}/guides/${guide.slug}`,
      kind: "guide" as const,
    })),
    ...WEALTH_ARTICLES.map((article) => ({
      slug: article.slug,
      title: article.title,
      summary: article.answer,
      url: `${SITE_URL}/wealth/learn/${article.slug}`,
      kind: "wealth-article" as const,
    })),
    ...STATIC_WEALTH_ARTICLES.map((article) => ({
      slug: article.slug,
      title: article.title,
      summary: article.blurb,
      url: `${SITE_URL}/wealth/${article.slug}`,
      kind: "wealth-article" as const,
    })),
    ...STATIC_GUIDES.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      summary: guide.blurb,
      url: `${SITE_URL}/guides/${guide.slug}`,
      kind: "guide" as const,
    })),
    ...WEALTH_TOOLS.map((tool) => ({
      slug: tool.slug,
      title: tool.title,
      summary: tool.blurb,
      url: `${SITE_URL}${tool.href}`,
      kind: "tool" as const,
    })),
  ];
  return docs;
}

const WORD_SPLIT = /[^a-z0-9]+/i;

function scoreDoc(query: string, doc: McpDoc, fullText: string): number {
  const terms = query.toLowerCase().split(WORD_SPLIT).filter((t) => t.length > 2);
  if (terms.length === 0) return 0;
  const title = doc.title.toLowerCase();
  const haystack = `${doc.title} ${doc.summary} ${fullText}`.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (title.includes(term)) score += 5;
    else if (haystack.includes(term)) score += 2;
  }
  return score;
}

function fullSearchText(slug: string): string {
  const guide = TRAFFIC_GUIDES.find((g) => g.slug === slug);
  if (guide) {
    return [
      guide.description,
      ...guide.sections.map((s) => `${s.title} ${s.body}`),
      ...guide.faqs.map((f) => `${f.q} ${f.a}`),
      ...guide.checklist,
    ].join(" ");
  }
  const article = WEALTH_ARTICLES.find((a) => a.slug === slug);
  if (article) return wealthArticleText(article);
  return "";
}

/**
 * Simple scored search over the document index. Returns at most `limit`
 * matches, best first.
 */
export function searchMcpDocs(query: string, limit = 8): McpDoc[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const docs = mcpDocumentIndex();
  return docs
    .map((doc) => ({ doc, score: scoreDoc(trimmed, doc, fullSearchText(doc.slug)) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.doc);
}

/** Full markdown for a data-driven guide or article by slug. */
export function guideMarkdown(slug: string): { title: string; url: string; markdown: string } | null {
  const guide = TRAFFIC_GUIDES.find((g) => g.slug === slug);
  if (guide) {
    const lines: string[] = [`# ${guide.title}`, "", guide.answer, ""];
    for (const section of guide.sections) {
      lines.push(`## ${section.title}`, "", section.body, "");
    }
    lines.push(`## At a glance`, "");
    lines.push(`| ${guide.comparison.headers[0]} | ${guide.comparison.headers[1]} |`);
    lines.push("| --- | --- |");
    for (const row of guide.comparison.rows) {
      lines.push(`| ${row[0]} | ${row[1]} |`);
    }
    lines.push("", "## Checklist", "");
    for (const item of guide.checklist) lines.push(`- ${item}`);
    lines.push("", "## Common questions", "");
    for (const faq of guide.faqs) {
      lines.push(`**${faq.q}**`, "", faq.a, "");
    }
    lines.push("## Sources", "");
    for (const source of guide.sources) lines.push(`- [${source.title}](${source.url})`);
    lines.push("", `Read it on the site: ${SITE_URL}/guides/${guide.slug}`);
    return { title: guide.title, url: `${SITE_URL}/guides/${guide.slug}`, markdown: lines.join("\n") };
  }

  const article = WEALTH_ARTICLES.find((a) => a.slug === slug);
  if (article) {
    const lines: string[] = [`# ${article.title}`, "", article.answer, ""];
    for (const section of article.sections) {
      lines.push(`## ${section.heading}`, "");
      for (const paragraph of section.paragraphs) lines.push(paragraph, "");
      if (section.list) {
        for (const item of section.list) lines.push(`- ${item}`);
        lines.push("");
      }
    }
    lines.push("## Common questions", "");
    for (const faq of article.faq) {
      lines.push(`**${faq.q}**`, "", faq.a, "");
    }
    lines.push("## Sources", "");
    for (const source of article.sources) lines.push(`- [${source.label}](${source.href})`);
    lines.push("", `Read it on the site: ${SITE_URL}/wealth/learn/${article.slug}`);
    return { title: article.title, url: `${SITE_URL}/wealth/learn/${article.slug}`, markdown: lines.join("\n") };
  }

  // Static pages: index entry exists but the copy lives in the page
  // component, so hand back the summary and the URL instead of inventing text.
  const staticEntry =
    STATIC_WEALTH_ARTICLES.find((a) => a.slug === slug) ??
    STATIC_GUIDES.find((g) => g.slug === slug);
  if (staticEntry) {
    const isGuide = STATIC_GUIDES.some((g) => g.slug === slug);
    const url = `${SITE_URL}${isGuide ? "/guides" : "/wealth"}/${slug}`;
    return {
      title: staticEntry.title,
      url,
      markdown: `# ${staticEntry.title}\n\n${staticEntry.blurb}\n\nFull text: ${url}`,
    };
  }
  return null;
}

/** The 8 tools, from lib/wealth/site.ts. */
export function mcpToolCatalog() {
  return WEALTH_TOOLS.map((tool) => ({
    slug: tool.slug,
    title: tool.title,
    kind: tool.kind,
    description: tool.blurb,
    time: tool.time,
    url: `${SITE_URL}${tool.href}`,
  }));
}

/** The 2027 Medicare and tax figures, with a tax note. */
export function numbers2027Markdown(): string {
  return [
    medicareNumbers2027Markdown(),
    "",
    "## 2027 tax figures",
    "",
    "The IRS has not announced 2027 tax brackets, standard deduction amounts, or retirement account limits yet. Those arrive in the fall. Until then, this site quotes verified 2026 figures on the relevant pages.",
  ].join("\n");
}
