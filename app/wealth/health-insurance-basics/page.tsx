import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/health-insurance-basics",
  title: "Health Insurance Basics",
  description:
    "Premiums, deductibles, copays, coinsurance, and out-of-pocket max, explained in plain English with a worked example.",
  eyebrow: "Insurance basics",
  readMinutes: 6,
  answer:
    "Five numbers run every health plan: premium, deductible, copay, coinsurance, and out-of-pocket max. Learn those and any plan makes sense.",
  sections: [
    {
      heading: "The five numbers",
      paragraphs: [
        "The premium is your monthly bill for having the plan. You pay it whether you see a doctor or not.",
        "The deductible is what you pay first each year before the plan helps. After you meet it, cost-sharing starts.",
        "A copay is a flat fee per visit. Coinsurance is your percentage of the bill after the deductible.",
        "The out-of-pocket max is the yearly ceiling. Hit it and the plan pays 100% of covered care for the rest of the year.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Say your plan has a $2,000 deductible, 20% coinsurance, and a $6,000 out-of-pocket max. You face a $10,000 surgery bill.",
        "You pay the first $2,000. Of the remaining $8,000, you pay 20%, which is $1,600. Your total is $3,600.",
        "Premiums sit outside this math. They are the price of admission, paid every month.",
      ],
    },
    {
      heading: "High-deductible plans and HSAs",
      paragraphs: [
        "A high-deductible plan trades lower premiums for a higher deductible. For 2026 the minimum deductible is $1,700 single or $3,400 family.",
        "Pair it with a health savings account. The 2026 HSA limit is $4,400 single or $8,750 family, plus $1,000 at 55 and older.",
        "HSA money goes in pre-tax, grows tax-free, and comes out tax-free for medical costs.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/hsa-explained", label: "HSAs, explained" }],
      },
    },
  ],
  panel: {
    eyebrow: "Go deeper · Article",
    title: "HSAs, Explained",
    blurb: "The triple tax break, contribution limits, and how to use one well.",
    href: "/wealth/hsa-explained",
    cta: "Read the guide",
  },
  sources: [
    {
      label: "IRS Publication 969: HSAs and high-deductible health plans",
      href: "https://www.irs.gov/publications/p969",
    },
  ],
  faqs: [
    {
      q: "What is the difference between a copay and coinsurance?",
      a: "A copay is a flat dollar fee per visit. Coinsurance is a percentage of the bill.",
    },
    {
      q: "Do premiums count toward the deductible?",
      a: "No. Premiums and deductibles are separate buckets, and premiums never reduce the deductible.",
    },
    {
      q: "What does the out-of-pocket max actually cap?",
      a: "Your yearly spending on covered care. Premiums and out-of-network care sit outside the cap.",
    },
    {
      q: "Is a high-deductible plan a bad deal?",
      a: "Not by itself. Low premiums plus an HSA can beat a richer plan in healthy, high-earning years.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    {
      href: "/wealth/disability-insurance-explained",
      label: "Disability Insurance, Explained",
      kind: "Article",
    },
    { href: "/wealth/emergency-fund-guide", label: "The Emergency Fund Guide", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function HealthInsuranceBasicsPage() {
  return <WealthArticlePage article={ARTICLE} />;
}
