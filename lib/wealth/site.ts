/**
 * Facts, navigation and the tool list for the /wealth hub.
 *
 * WEALTH_FACTS is the whole fact base. Christian supplied every line in
 * October 2026. Pages read from here so nothing about him gets written twice
 * or drifts. Do not add a claim that is not on this list.
 */

import { AGENT } from "@/lib/agent";

export const WEALTH_BRAND = "christianbuildswealth";
export const WEALTH_BASE = "/wealth";

/** The two downloads, served from /public. Rebuild them in the christianbuildswealth repo. */
export const BUDGET_FILE = "/wealth/downloads/budget-spreadsheet.xlsx";
export const ANALYZER_FILE = "/wealth/downloads/ratio-checker.zip";

export const WEALTH_FACTS = {
  age: 21,
  license: "Licensed insurance agent in North Carolina (NC Life & Health)",
  school: "Accounting senior at UNCG, graduating December 2026",
  gpa: "3.69 GPA",
  excel: "Microsoft Excel certified",
  python: "Writes Python",
  advisorWork: [
    "Reviewed 100+ client files",
    "Sat in on dozens of client money appointments",
    "Ran the advisor's monthly budget",
    "Built Python automation for follow-ups",
  ],
  city: "Greensboro, NC",
  phone: AGENT.phone,
  phoneHref: AGENT.phoneHref,
  smsHref: "sms:+19194086671",
} as const;

/** Printed on every page of the hub. He is insurance licensed, not securities licensed. */
export const EDUCATION_NOTE =
  "Everything here is general education, not financial, tax, legal or investment advice. " +
  "I'm licensed for insurance in North Carolina (NC Life & Health). I'm not securities licensed " +
  "and I'm not your advisor, so I don't tell anyone what to buy. Calculators show estimates " +
  "from the numbers you type in. They are not predictions or guarantees.";

export type WealthTool = {
  slug: string;
  href: string;
  kind: "Calculator" | "Quiz" | "Download";
  title: string;
  blurb: string;
  time: string;
  /** Accent used on the card. */
  tone: "lime" | "cobalt" | "coral" | "ink";
};

export const WEALTH_TOOLS: readonly WealthTool[] = [
  {
    slug: "compound-interest",
    href: "/tools/compound-interest",
    kind: "Calculator",
    title: "Compound interest",
    blurb: "Drag three sliders. Watch the curve bend. See what waiting ten years costs.",
    time: "1 min",
    tone: "lime",
  },
  {
    slug: "budget",
    href: "/tools/budget",
    kind: "Calculator",
    title: "50/30/20 budget builder",
    blurb: "Type your take-home pay. Drag the split until it looks like your real life.",
    time: "2 min",
    tone: "cobalt",
  },
  {
    slug: "debt-payoff",
    href: "/tools/debt-payoff",
    kind: "Calculator",
    title: "Debt payoff: avalanche vs snowball",
    blurb: "Add your debts. See both methods side by side, in months and in interest.",
    time: "3 min",
    tone: "coral",
  },
  {
    slug: "roth-vs-traditional",
    href: "/tools/roth-vs-traditional",
    kind: "Calculator",
    title: "Roth vs traditional",
    blurb: "Pay tax now or pay it later. One slider shows why the answer flips.",
    time: "2 min",
    tone: "ink",
  },
  {
    slug: "first-1000",
    href: "/wealth/quiz/first-1000",
    kind: "Quiz",
    title: "What do I do with my first $1,000?",
    blurb: "A few honest questions. You leave with a short plan to think over.",
    time: "1 min",
    tone: "lime",
  },
  {
    slug: "money-personality",
    href: "/wealth/quiz/money-personality",
    kind: "Quiz",
    title: "Money personality quiz",
    blurb: "Eight questions, four types. Find your strengths and your blind spots.",
    time: "2 min",
    tone: "coral",
  },
  {
    slug: "budget-spreadsheet",
    href: "/wealth/tools#budget-spreadsheet",
    kind: "Download",
    title: "Budget spreadsheet",
    blurb: "A real Excel file with working formulas. Planned vs actual, plus a 50/30/20 check.",
    time: "Free",
    tone: "cobalt",
  },
  {
    slug: "ratio-checker",
    href: "/wealth/tools#ratio-checker",
    kind: "Download",
    title: "Financial Statement Analyzer",
    blurb: "10 ratios from company statements. A Python download with a sample you can run.",
    time: "Free",
    tone: "ink",
  },
];

export function getTool(slug: string): WealthTool {
  const tool = WEALTH_TOOLS.find((item) => item.slug === slug);
  if (!tool) throw new Error(`Unknown wealth tool: ${slug}`);
  return tool;
}

export const WEALTH_NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/wealth/learn", label: "Guides" },
  { href: "/wealth/quiz", label: "Quizzes" },
  { href: "/wealth/journey", label: "Journey" },
  { href: "/", label: "Medicare help" },
] as const;

export type Pillar = { id: string; title: string; line: string; href: string; cta: string };

export const PILLARS: readonly Pillar[] = [
  {
    id: "money-basics",
    title: "Money basics",
    line: "Budgets, emergency funds, credit scores. The stuff school skipped.",
    href: "/wealth/learn#money-basics",
    cta: "Start with the basics",
  },
  {
    id: "accounting-explained",
    title: "Accounting explained",
    line: "What accountants do all day, and how to read a company's numbers yourself.",
    href: "/wealth/learn#accounting-explained",
    cta: "See how it works",
  },
  {
    id: "building-in-public",
    title: "Building in public",
    line: "I'm 21 and figuring this out with you watching. Wins and misses both.",
    href: "/wealth/journey",
    cta: "Read the journey",
  },
  {
    id: "ai-and-money",
    title: "AI and money",
    line: "I write Python. Start with 2 downloads and check the numbers yourself.",
    href: "/wealth/tools",
    cta: "Grab the tools",
  },
];

export type JourneyEntry = {
  day: number;
  /** ISO date, real dates only. */
  date: string;
  title: string;
  body: string[];
  tag: "Milestone" | "Background" | "Build";
};

/**
 * Newest first. Christian: these are seeded from the facts you gave me, in
 * plain words. Rewrite them in your own voice and add a new entry on top
 * whenever something real happens. Never backfill a day that did not happen.
 */
export const JOURNEY: readonly JourneyEntry[] = [
  {
    day: 1,
    date: "2026-10-06",
    title: "Day 1: this site exists now",
    tag: "Milestone",
    body: [
      "I'm 21. I'm a licensed insurance agent in North Carolina and an accounting senior at UNCG. I graduate in December.",
      "I've reviewed 100+ client files and sat in on dozens of client money appointments. Here, you can work through the math yourself.",
      "The October 6 build has 4 calculators, 2 quizzes, 6 articles and 2 downloads. Open 1 tool and change the numbers.",
      "What I'm not: a financial advisor. I'm not securities licensed, so you won't get stock picks from me. You'll get the math, the tools, and what I'm learning.",
    ],
  },
  {
    day: 0,
    date: "2026-10-06",
    title: "Day 0: what I'm walking in with",
    tag: "Background",
    body: [
      "Here's the honest starting line, so you can judge everything else I post.",
      "School: accounting at UNCG, 3.69 GPA, graduating December 2026. Microsoft Excel certified. I write Python.",
      "Work: I got my NC Life & Health license and I work with a financial advisor. I've reviewed 100+ client files and sat in on dozens of client money appointments. I ran the advisor's monthly budget and built Python automation for follow-ups.",
      "That's my starting line at 21: insurance, accounting, Excel and Python.",
    ],
  },
];
