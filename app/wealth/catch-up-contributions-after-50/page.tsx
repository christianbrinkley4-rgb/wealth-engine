import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/catch-up-contributions-after-50",
  title: "Catch-Up Contributions After 50",
  description:
    "2027 catch-up limits for 401(k)s, IRAs, and HSAs, plus the Roth rule for high earners. Read Christian Brinkley's practical guide in plain English.",
  eyebrow: "Retirement saving after 50",
  readMinutes: 5,
  answer:
    "At 50, you can save extra in retirement accounts. The 2027 401(k) catch-up is $8,500, bringing the total to $34,000.",
  sections: [
    {
      heading: "The 401(k) catch-up at 50",
      paragraphs: [
        "Workers 50 and older can add $8,500 on top of the $25,500 employee limit. That brings the 2027 total to $34,000.",
        "The extra money lands in the same account. It follows the same tax rules as your regular contributions.",
        "Counting employer match, total 2027 contributions cannot top $75,000.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/401k-explained", label: "Your 401(k), explained" }],
      },
    },
    {
      heading: "The super catch-up at 60 to 63",
      paragraphs: [
        "Ages 60 through 63 get a bigger catch-up: $11,750. The 2027 total for those ages is $37,250.",
        "The window is short, so these years matter. Extra contributions now grow for the rest of your career.",
      ],
    },
    {
      heading: "The IRA catch-up at 50",
      paragraphs: [
        "The 2027 IRA limit is $7,500 under 50. At 50 and older, a $1,100 catch-up raises it to $8,600.",
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
        "At 55, you can add $1,000 to a health savings account. That lifts the 2027 limit to $5,500 single or $10,000 family.",
        "Each spouse needs their own HSA for their own $1,000. One account cannot hold two catch-ups.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/hsa-explained", label: "HSAs, explained" }],
      },
    },
    {
      heading: "The Roth catch-up rule for 2027",
      paragraphs: [
        "For 2027, catch-up contributions must go to Roth if your 2026 wages topped $155,000.",
        "You pay tax on Roth contributions now, and qualified withdrawals come out tax-free later.",
        "Below $155,000 in 2026 wages, you keep the choice. Check last year's W-2 before you set contributions.",
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
      label: "IRS: 401(k) limit increases to $25,500 for 2027",
      href: "https://www.irs.gov/newsroom/401k-limit-increases-to-25500-for-2027-ira-limit-remains-7500",
    },
    {
      label: "IRS: Retirement topics, catch-up contributions",
      href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions",
    },
    {
      label: "IRS Notice 2026-66, 2027 retirement plan limitations",
      href: "https://www.irs.gov/pub/irs-drop/n-26-66.pdf",
    },
  ],
  faqs: [
    {
      q: "Do catch-up contributions apply to a 403(b) too?",
      a: "Yes. The $8,500 catch-up and the $11,750 super catch-up apply to 403(b) and governmental 457(b) plans too.",
    },
    {
      q: "What counts as prior-year wages for the Roth rule?",
      a: "Wages from the employer sponsoring the plan, above $155,000 in 2026, for 2027 catch-up contributions. Your plan administrator applies the rule.",
    },
    {
      q: "Can I use the catch-up if I turn 50 late in the year?",
      a: "Yes. Turning 50 at any point in 2027 unlocks the full 2027 catch-up.",
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
