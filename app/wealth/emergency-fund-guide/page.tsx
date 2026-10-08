import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/emergency-fund-guide",
  title: "The Emergency Fund Guide",
  description:
    "What an emergency fund is, where to keep it, and how to build it on autopay without thinking about it.",
  eyebrow: "Money basics",
  readMinutes: 5,
  answer:
    "An emergency fund is cash set aside for surprises: job loss, car repairs, medical bills. Start small, automate it, and leave it alone.",
  sections: [
    {
      heading: "What it is and is not",
      paragraphs: [
        "It is insurance you pay to yourself. It is not a vacation fund, a down payment, or a chance to invest.",
        "Its job is to keep a bad week from becoming debt. That is the entire job description.",
      ],
      linkRow: {
        intro: "Keep going:",
        links: [{ href: "/wealth/budgeting-that-actually-works", label: "Budgeting that actually works" }],
      },
    },
    {
      heading: "Start with a starter fund",
      paragraphs: [
        "Aim for a small starter fund you can reach fast. One month of essential bills is a solid first target.",
        "A starter fund you actually finish beats a big goal you abandon. Momentum is the strategy.",
      ],
    },
    {
      heading: "The 3 to 6 month target",
      paragraphs: [
        "A common target is three to six months of essential expenses. Treat it as a direction, not a deadline.",
        "Single-income households lean toward six months. Stable dual incomes can sit closer to three.",
      ],
    },
    {
      heading: "Where to keep it",
      paragraphs: [
        "Keep it in a high-yield savings account, separate from checking. Separate means you will not spend it by accident.",
        "It must stay liquid and safe. Investing emergency money turns a safety net into a gamble.",
      ],
      linkRow: {
        intro: "Keep going:",
        links: [{ href: "/guides/hysa-vs-money-market-account", label: "HYSA vs money market account" }],
      },
    },
    {
      heading: "Build it on autopay",
      paragraphs: [
        "Set an automatic transfer for the day after payday. Even a small amount works when it never misses.",
        "Raise the transfer when raises or windfalls arrive. Send found money to the fund before lifestyle absorbs it.",
        "When a real emergency raids the fund, rebuilding it becomes bill number one.",
      ],
      linkRow: {
        intro: "Keep going:",
        links: [{ href: "/wealth/learn/emergency-funds", label: "Emergency funds, step by step" }],
      },
    },
  ],
  panel: {
    eyebrow: "Try it · Calculator · 5 minutes",
    title: "Build a budget that works",
    blurb: "Find the monthly surplus that becomes your automatic emergency fund transfer.",
    href: "/wealth/calculators/budget",
    cta: "Open it",
  },
  sources: [{ label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" }],
  faqs: [
    {
      q: "Should I pause debt payoff to build the fund?",
      a: "Build the small starter fund first, then attack debt. Both matter, in that order.",
    },
    {
      q: "How much is one month of essential bills?",
      a: "Add housing, food, utilities, transport, insurance, and minimum debt payments. That is your monthly number.",
    },
    {
      q: "What counts as a real emergency?",
      a: "Job loss, essential car repair, medical bills, urgent home repair. A sale does not count.",
    },
    {
      q: "Where should I keep the starter fund?",
      a: "The same high-yield savings account. One account, one job, no confusion.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    { href: "/wealth/broke-money-reset-plan", label: "The Broke Money Reset Plan", kind: "Article" },
    {
      href: "/wealth/catch-up-contributions-after-50",
      label: "Catch-Up Contributions After 50",
      kind: "Article",
    },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function EmergencyFundGuidePage() {
  return <WealthArticlePage article={ARTICLE} />;
}
