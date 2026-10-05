/**
 * The Learning Hub catalog: every guide, answer, explainer and tool on the
 * site, organized by the situation someone is in rather than by product.
 *
 * Articles from lib/articles.ts and lib/taxArticles.ts are pulled in
 * automatically, so a new article shows up here without a second edit.
 * Standalone guide pages are listed by hand below.
 */

import { ARTICLES, articleText, type Article } from "@/lib/articles";
import { TAX_ARTICLES } from "@/lib/taxArticles";

export const SITUATIONS = [
  {
    id: "turning-65",
    label: "Turning 65",
    blurb: "Your enrollment window, what to sign up for, and what to do first.",
  },
  {
    id: "on-medicare",
    label: "Already on Medicare",
    blurb: "Reviewing your plan each fall, changing plans, and keeping your doctors.",
  },
  {
    id: "medicare-costs",
    label: "Medicare costs",
    blurb: "Premiums, deductibles, penalties, and what higher income does to them.",
  },
  {
    id: "taxes",
    label: "Taxes in retirement",
    blurb: "Social Security taxes, RMDs, Roth conversions, in plain English.",
  },
  {
    id: "retirement-income",
    label: "Retirement income",
    blurb: "When to take Social Security and how to turn savings into a paycheck.",
  },
  {
    id: "insurance",
    label: "Insurance explained",
    blurb: "Life insurance, long-term care, and critical illness coverage.",
  },
  {
    id: "family",
    label: "Helping a parent",
    blurb: "For the adult kids sorting this out alongside Mom or Dad.",
  },
] as const;

export type SituationId = (typeof SITUATIONS)[number]["id"];

export type LearnKind = "Guide" | "Answer" | "Explainer" | "Tool" | "Checklist";

export type LearnEntry = {
  href: string;
  title: string;
  blurb: string;
  situation: SituationId;
  kind: LearnKind;
  /** Minutes to read, for articles whose text is known. */
  minutes?: number;
  featured?: boolean;
};

const GUIDES: LearnEntry[] = [
  {
    href: "/turning-65",
    title: "Turning 65: when to sign up for Medicare",
    blurb: "Your seven-month window, coverage through work, and what to do first.",
    situation: "turning-65",
    kind: "Guide",
    featured: true,
  },
  {
    href: "/turning-65-checklist",
    title: "Your turning-65 checklist",
    blurb: "Eight steps to take before your 65th birthday, in order.",
    situation: "turning-65",
    kind: "Checklist",
  },
  {
    href: "/advantage-vs-medigap",
    title: "Medicare Advantage or a Medigap plan?",
    blurb: "How the two paths differ on doctors, costs, and travel.",
    situation: "turning-65",
    kind: "Guide",
    featured: true,
  },
  {
    href: "/special-enrollment",
    title: "Special Enrollment Periods",
    blurb: "When you can sign up or change plans outside the usual windows.",
    situation: "turning-65",
    kind: "Guide",
  },
  {
    href: "/plan-check",
    title: "Does your Medicare plan still fit?",
    blurb: "Seven questions, about 90 seconds, and an honest read on whether to look again.",
    situation: "on-medicare",
    kind: "Tool",
    featured: true,
  },
  {
    href: "/annual-enrollment",
    title: "Reviewing your plan each fall",
    blurb: "What changes every year and what to check before December 7.",
    situation: "on-medicare",
    kind: "Guide",
  },
  {
    href: "/medicare-annual-enrollment-2026-checklist",
    title: "Annual Enrollment 2026 checklist",
    blurb: "A step-by-step review list for this fall.",
    situation: "on-medicare",
    kind: "Checklist",
  },
  {
    href: "/anoc",
    title: "Got your Annual Notice of Change letter?",
    blurb: "How to read it, and the lines that matter most.",
    situation: "on-medicare",
    kind: "Guide",
  },
  {
    href: "/keep-my-doctor",
    title: "Can I keep my doctors?",
    blurb: "What to check for Triad doctors and hospitals before you choose.",
    situation: "on-medicare",
    kind: "Guide",
  },
  {
    href: "/medicare-advantage-doctor-networks",
    title: "Triad doctor networks and Medicare Advantage",
    blurb: "How networks work here, and how to check yours.",
    situation: "on-medicare",
    kind: "Guide",
  },
  {
    href: "/medicare-costs-2026",
    title: "Every 2026 Medicare cost, with its source",
    blurb: "Premiums, deductibles, and income brackets on one page.",
    situation: "medicare-costs",
    kind: "Guide",
    featured: true,
  },
  {
    href: "/medicare-costs",
    title: "What does Medicare cost?",
    blurb: "A plain walk-through of what you pay and when.",
    situation: "medicare-costs",
    kind: "Guide",
  },
  {
    href: "/part-b-penalty",
    title: "The Part B late penalty, worked out",
    blurb: "Find out whether a penalty applies to you and what it adds.",
    situation: "medicare-costs",
    kind: "Tool",
  },
  {
    href: "/medicare",
    title: "Part B and IRMAA premium estimate",
    blurb: "See what your income could mean for your Medicare premiums.",
    situation: "medicare-costs",
    kind: "Tool",
  },
  {
    href: "/irmaa-appeal",
    title: "Appealing a high Medicare premium",
    blurb: "When a life change means you can ask Social Security to look again.",
    situation: "medicare-costs",
    kind: "Guide",
  },
  {
    href: "/roth-window",
    title: "Your Roth conversion window",
    blurb: "How many lower-income years you might have before RMDs start.",
    situation: "taxes",
    kind: "Tool",
  },
  {
    href: "/plan",
    title: "Conversion and Medicare timing planner",
    blurb: "Line up conversions with the years Medicare looks at your income.",
    situation: "taxes",
    kind: "Tool",
  },
  {
    href: "/social-security-timing",
    title: "When should I take Social Security?",
    blurb: "62, full retirement age, or 70, and what changes with each.",
    situation: "retirement-income",
    kind: "Guide",
    featured: true,
  },
  {
    href: "/retirement-income",
    title: "Turning savings into a paycheck",
    blurb: "The questions to answer before you stop working.",
    situation: "retirement-income",
    kind: "Guide",
  },
  {
    href: "/annuities",
    title: "Annuities, explained without the sales pitch",
    blurb: "What they are, what they cost, and when they fit.",
    situation: "retirement-income",
    kind: "Guide",
  },
  {
    href: "/life-insurance",
    title: "Life insurance, in plain English",
    blurb: "What it's for, and how to review the coverage you already have.",
    situation: "insurance",
    kind: "Guide",
  },
  {
    href: "/long-term-care-insurance",
    title: "Long-term care insurance",
    blurb: "What it pays for, what it costs, and the alternatives.",
    situation: "insurance",
    kind: "Guide",
  },
  {
    href: "/short-term-care-insurance",
    title: "Short-term care insurance",
    blurb: "Coverage for recovery stays that Medicare doesn't fully pay.",
    situation: "insurance",
    kind: "Guide",
  },
  {
    href: "/critical-illness-insurance",
    title: "Critical illness insurance",
    blurb: "A lump sum if you're diagnosed with a covered illness.",
    situation: "insurance",
    kind: "Guide",
  },
  {
    href: "/helping-a-parent",
    title: "Helping a parent with Medicare",
    blurb: "What you can do for them, and what they have to do themselves.",
    situation: "family",
    kind: "Guide",
    featured: true,
  },
];

/** Which situation each Medicare answer belongs to. Unlisted ones default to costs. */
const ANSWER_SITUATION: Record<string, SituationId> = {
  "original-medicare-or-medicare-advantage": "on-medicare",
  "are-medicare-supplement-plans-the-same": "turning-65",
  "does-medicare-cover-nursing-homes": "family",
  "turning-65-medicare-checklist-north-carolina": "turning-65",
  "medicare-advantage-dental-coverage": "on-medicare",
  "medicare-advantage-hmo-vs-ppo": "on-medicare",
  "switching-medicare-advantage-plans-aep": "on-medicare",
  "medicare-irmaa-income-premiums": "medicare-costs",
};

const minutesFor = (article: Article) =>
  Math.max(2, Math.round(articleText(article).split(/\s+/).length / 220));

export function learnEntries(): LearnEntry[] {
  const answers: LearnEntry[] = ARTICLES.map((article) => ({
    href: `/answers/${article.slug}`,
    title: article.title,
    blurb: article.lede,
    situation: ANSWER_SITUATION[article.slug] ?? "medicare-costs",
    kind: "Answer",
    minutes: minutesFor(article),
  }));
  const explainers: LearnEntry[] = TAX_ARTICLES.map((article, index) => ({
    href: `/taxes-and-retirement/${article.slug}`,
    title: article.title,
    blurb: article.lede,
    situation: "taxes",
    kind: "Explainer",
    minutes: minutesFor(article),
    featured: index === 0,
  }));
  return [...GUIDES, ...answers, ...explainers];
}

export function entriesFor(situation: SituationId): LearnEntry[] {
  return learnEntries().filter((entry) => entry.situation === situation);
}
