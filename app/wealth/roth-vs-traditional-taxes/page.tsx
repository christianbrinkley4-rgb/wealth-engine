import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/roth-vs-traditional-taxes",
  title: "Roth vs Traditional: The Tax Trade",
  description:
    "Pay tax now or pay later. How Roth and traditional accounts differ, and the one question that decides between them.",
  eyebrow: "Tax basics",
  readMinutes: 6,
  answer:
    "Traditional accounts give the tax break now. Roth accounts give it later. The trade favors whichever side faces the lower tax rate.",
  sections: [
    {
      heading: "The core trade",
      paragraphs: [
        "Traditional contributions come from pre-tax income. You skip tax today and pay income tax on withdrawals.",
        "Roth contributions come from after-tax income. You pay tax today and qualified withdrawals come out tax-free.",
        "Both grow without yearly tax drag. The only question is when the IRS takes its cut.",
      ],
    },
    {
      heading: "The one question that decides",
      paragraphs: [
        "Compare your tax rate now to your rate in retirement. The trade favors paying tax in the lower-rate year.",
        "A high-earning year makes the traditional deduction valuable. A low-earning year makes Roth's pay-now price cheap.",
        "Nobody knows future rates for sure. Splitting contributions between both is a middle path for uncertain futures.",
      ],
    },
    {
      heading: "Where each account lives",
      paragraphs: [
        "Both flavors exist as IRAs and as 401(k)s. The 2026 IRA limit is $7,500, or $8,600 at 50 and older.",
        "High earners face Roth IRA income limits: $153,000 to $168,000 single, $242,000 to $252,000 married filing jointly.",
        "New for 2026: 401(k) catch-up contributions must be Roth when prior-year wages topped $150,000.",
      ],
    },
    {
      heading: "Withdrawals and timing",
      paragraphs: [
        "Traditional 401(k) and IRA withdrawals count as taxable income. Required withdrawals start at age 73.",
        "Roth IRA withdrawals of contributions are always tax-free. Earnings come out tax-free after five years, once you reach 59 and a half.",
      ],
    },
  ],
  panel: {
    eyebrow: "Try it · Calculator · 5 minutes",
    title: "Roth vs traditional calculator",
    blurb: "Plug in your numbers and see how the tax trade plays out over time.",
    href: "/wealth/calculators/roth-vs-traditional",
    cta: "Open it",
  },
  sources: [
    { label: "IRS: Roth IRAs", href: "https://www.irs.gov/retirement-plans/roth-iras" },
    {
      label: "IRS: 401(k) limit increases to $24,500 for 2026",
      href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
    },
  ],
  faqs: [
    {
      q: "Can I hold both Roth and traditional accounts?",
      a: "Yes. Many savers hold both, and the IRA limit covers both types combined.",
    },
    {
      q: "Is Roth always better when you are young?",
      a: "Not automatically. A young high earner still faces a high current rate, which favors the traditional deduction.",
    },
    {
      q: "What happens if I withdraw Roth earnings early?",
      a: "Earnings pulled before 59 and a half can face tax and a penalty. Contributions come out free anytime.",
    },
    {
      q: "Do Roth IRAs have required withdrawals?",
      a: "No. The original owner never faces required minimum distributions from a Roth IRA.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    {
      href: "/wealth/catch-up-contributions-after-50",
      label: "Catch-Up Contributions After 50",
      kind: "Article",
    },
    { href: "/wealth/roth-ira-explained", label: "Roth IRAs, Explained", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function RothVsTraditionalTaxesPage() {
  return <WealthArticlePage article={ARTICLE} />;
}
