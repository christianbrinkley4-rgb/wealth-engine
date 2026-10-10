import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/disability-insurance-explained",
  title: "Disability Insurance, Explained",
  description:
    "What disability insurance pays, short-term vs long-term, and the two time periods that shape every policy.",
  eyebrow: "Insurance basics",
  readMinutes: 5,
  answer:
    "Disability insurance replaces part of your paycheck when illness or injury stops you from working. It protects income, not medical bills.",
  sections: [
    {
      heading: "What it actually is",
      paragraphs: [
        "Health insurance pays doctors. Disability insurance pays you. It sends a monthly check while you cannot work.",
        "The check replaces part of your income, not all of it. The gap keeps the incentive to return.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/life-insurance-explained", label: "Life insurance, explained" }],
      },
    },
    {
      heading: "Short-term vs long-term",
      paragraphs: [
        "Short-term coverage handles weeks to a few months. It covers recovery from surgery, injury, or a difficult pregnancy.",
        "Long-term coverage handles years, sometimes to retirement age. It covers serious illness or lasting injury.",
        "The two stack. Short-term carries the early months while long-term waits in the wings.",
      ],
    },
    {
      heading: "Employer coverage vs individual",
      paragraphs: [
        "Many employers offer group disability coverage. It is cheap or free, but it ends when the job ends.",
        "An individual policy is yours alone. It follows you between jobs, and you control the terms.",
        "Start from what work already gives you. You may need only a supplement, not a full policy.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/health-insurance-basics", label: "Health insurance basics" }],
      },
    },
    {
      heading: "Elimination period and benefit period",
      paragraphs: [
        "The elimination period is the wait before checks start. A longer wait means a lower premium.",
        "The benefit period is how long checks keep coming. Choices range from a few years to retirement age.",
        "A long wait with a long benefit period costs less than coverage that starts on day one.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/emergency-fund-guide", label: "The emergency fund guide" }],
      },
    },
  ],
  panel: {
    eyebrow: "Try it · Calculator · 5 minutes",
    title: "Build a budget that works",
    blurb: "Know your must-pay bills now, so a lost paycheck never catches you blind.",
    href: "/tools/budget",
    cta: "Open it",
  },
  sources: [{ label: "Social Security disability benefits (SSA)", href: "https://www.ssa.gov/disability" }],
  faqs: [
    {
      q: "Is disability insurance the same as workers' comp?",
      a: "No. Workers' comp covers job injuries only. Disability insurance covers illness and injury anywhere.",
    },
    {
      q: "Does it cover pregnancy and childbirth?",
      a: "Short-term policies treat childbirth like other medical recoveries. Check the elimination period first.",
    },
    {
      q: "What if I am self-employed?",
      a: "You can buy an individual policy. Income is proven with tax returns, so keep them clean.",
    },
    {
      q: "Can a health condition block me from coverage?",
      a: "Yes. Insurers review your health when you apply, and pre-existing conditions can limit coverage.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    { href: "/wealth/health-insurance-basics", label: "Health Insurance Basics", kind: "Article" },
    { href: "/wealth/emergency-fund-guide", label: "The Emergency Fund Guide", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function DisabilityInsuranceExplainedPage() {
  return <WealthArticlePage article={ARTICLE} />;
}
