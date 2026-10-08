import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/catch-up-contributions-after-50",
  title: "Catch-Up Contributions After 50",
  description:
    "2026 catch-up limits for 401(k)s, IRAs, and HSAs, plus the new Roth rule for high earners.",
  eyebrow: "Retirement saving after 50",
  readMinutes: 5,
  answer:
    "At 50, you can save extra in retirement accounts. The 2026 401(k) catch-up is $8,000, bringing the total to $32,500.",
  sections: [
    {
      heading: "The 401(k) catch-up at 50",
      paragraphs: [
        "Workers 50 and older can add $8,000 on top of the $24,500 employee limit. That brings the 2026 total to $32,500.",
        "The extra money lands in the same account. It follows the same tax rules as your regular contributions.",
        "Counting employer match, total 2026 contributions cannot top $72,000.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/401k-explained", label: "Your 401(k), explained" }],
      },
    },
    {
      heading: "The super catch-up at 60 to 63",
      paragraphs: [
        "Ages 60 through 63 get a bigger catch-up: $11,250. The 2026 total for those ages is $35,750.",
        "The window is short, so these years matter. Extra contributions now grow for the rest of your career.",
      ],
    },
    {
      heading: "The IRA catch-up at 50",
      paragraphs: [
        "The 2026 IRA limit is $7,500 under 50. At 50 and older, a $1,100 catch-up raises it to $8,600.",
        "The limit covers traditional and Roth IRAs combined. It is one bucket, not one per account.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/roth-ira-explained", label: "Roth IRA, explained" }],
      },
    },
    {
      heading: "The HSA catch-up at 55",
      paragraphs: [
        "At 55, you can add $1,000 to a health savings account. That lifts the limit to $5,400 single or $9,750 family.",
        "Each spouse needs their own HSA for their own $1,000. One account cannot hold two catch-ups.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/hsa-explained", label: "HSAs, explained" }],
      },
    },
    {
      heading: "The new 2026 Roth catch-up rule",
      paragraphs: [
        "New for 2026: catch-up contributions must go to Roth if your prior-year wages topped $150,000.",
        "You pay tax on Roth contributions now, and qualified withdrawals come out tax-free later.",
        "Below $150,000 in prior-year wages, you keep the choice. Check last year's W-2 before you set contributions.",
      ],
    },
  ],
  panel: {
    eyebrow: "Go deeper · Article",
    title: "401(k)s, Explained",
    blurb: "How matching, vesting, and withdrawals actually work, in plain English.",
    href: "/wealth/401k-explained",
    cta: "Read the guide",
  },
  sources: [
    {
      label: "IRS: 401(k) limit increases to $24,500 for 2026",
      href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
    },
    {
      label: "IRS: Retirement topics, catch-up contributions",
      href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions",
    },
  ],
  faqs: [
    {
      q: "Do catch-up contributions apply to a 403(b) too?",
      a: "Yes. The $8,000 catch-up and the $11,250 super catch-up apply to 403(b) and governmental 457(b) plans too.",
    },
    {
      q: "What counts as prior-year wages for the Roth rule?",
      a: "Wages from the employer sponsoring the plan, above $150,000 in the prior year. Your plan administrator applies the rule.",
    },
    {
      q: "Can I use the catch-up if I turn 50 late in the year?",
      a: "Yes. Turning 50 at any point in 2026 unlocks the full 2026 catch-up.",
    },
    {
      q: "Does the IRA catch-up need earned income?",
      a: "Yes. You need earned income at least equal to your contribution. The same rule covers the $1,100 catch-up.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    {
      href: "/wealth/pre-retirement-5-year-checklist",
      label: "Your 5-Year Pre-Retirement Checklist",
      kind: "Article",
    },
    { href: "/wealth/roth-vs-traditional-taxes", label: "Roth vs Traditional: The Tax Trade", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function CatchUpContributionsAfter50Page() {
  return <WealthArticlePage article={ARTICLE} />;
}
