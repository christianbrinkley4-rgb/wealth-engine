import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/broke-money-reset-plan",
  title: "The Broke Money Reset Plan",
  description:
    "Money gone to zero is a math problem, not a character verdict. A calm triage plan for the worst month.",
  eyebrow: "Money basics",
  readMinutes: 5,
  answer:
    "When money runs out, triage beats panic. Cover housing, food, utilities, and minimums first, then call creditors before they call you.",
  sections: [
    {
      heading: "Step 1: List the bills that cannot wait",
      paragraphs: [
        "Four categories come first: housing, food, utilities, and minimum debt payments. Everything else waits.",
        "Write each bill, its amount, and its due date on one page. Clarity is the whole game here.",
      ],
    },
    {
      heading: "Step 2: Call creditors before they call you",
      paragraphs: [
        "Creditors have hardship options: paused payments, lower minimums, shifted due dates. You get them by calling early.",
        "One honest call beats three ignored letters. Ask what programs exist and get the answer in writing.",
      ],
    },
    {
      heading: "Step 3: Stop new debt today",
      paragraphs: [
        "No new charges, no new loans, no cash advances. New debt turns a bad month into a bad year.",
        "Pause every subscription and auto-payment you can. You can re-add them when income recovers.",
      ],
    },
    {
      heading: "Step 4: Find one extra income lever",
      paragraphs: [
        "One lever beats five ideas. Overtime, a weekend shift, selling what you do not use, or short gig work.",
        "Put every extra dollar toward the four categories above. Momentum matters more than the amount.",
      ],
    },
    {
      heading: "Step 5: Get local help without shame",
      paragraphs: [
        "Dial 211 or visit 211.org for local help with rent, utilities, and food. It is free, confidential, and built for this.",
        "Food banks, utility aid programs, and community agencies exist in every county. Using them is smart, not shameful.",
      ],
    },
  ],
  panel: {
    eyebrow: "Try it · Calculator · 5 minutes",
    title: "Build a budget that works",
    blurb: "Map every dollar now, so the next tight month never blindsides you.",
    href: "/wealth/calculators/budget",
    cta: "Open it",
  },
  sources: [{ label: "211.org: local help with rent, utilities, and food", href: "https://www.211.org" }],
  faqs: [
    {
      q: "Should I pay credit cards before rent?",
      a: "No. Housing, food, and utilities come first. Credit cards wait until the four categories are covered.",
    },
    {
      q: "Will calling my creditor hurt my credit?",
      a: "Asking about hardship options does not hurt your score. Missing payments without a plan does.",
    },
    {
      q: "What if I cannot cover all four categories?",
      a: "Cover housing first, then food, then utilities, then minimums. Then call 211 for local aid.",
    },
    {
      q: "Is bankruptcy the answer?",
      a: "It is a legal tool for some situations, not a first step. Talk with a nonprofit credit counselor first.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    { href: "/wealth/emergency-fund-guide", label: "The Emergency Fund Guide", kind: "Article" },
    { href: "/wealth/health-insurance-basics", label: "Health Insurance Basics", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function BrokeMoneyResetPlanPage() {
  return <WealthArticlePage article={ARTICLE} />;
}
