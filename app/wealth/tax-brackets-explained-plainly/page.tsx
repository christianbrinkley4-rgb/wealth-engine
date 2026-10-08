import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/tax-brackets-explained-plainly",
  title: "Tax Brackets, Explained Plainly",
  description:
    "How 2026 federal tax brackets really work, with a worked example. Only your last dollars face the top rate.",
  eyebrow: "Tax basics",
  readMinutes: 6,
  answer:
    "Tax brackets slice your income into layers. Each layer is taxed at its own rate. A raise never taxes your whole paycheck at the higher rate.",
  sections: [
    {
      heading: "Marginal vs effective rate",
      paragraphs: [
        "Your marginal rate is the rate on your last dollar of income. Your effective rate is total tax divided by total income.",
        "The effective rate always lands below the marginal rate. That gap is the whole point of brackets.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/wealth/first-tax-return-guide", label: "Your first tax return, explained" }],
      },
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Take a single filer earning $60,000 in 2026. Subtract the $16,100 standard deduction first, leaving $43,900 of taxable income.",
        "The first $12,400 is taxed at 10%, which is $1,240. The next $31,500 is taxed at 12%, which is $3,780.",
        "Total federal tax is $5,020. The marginal rate is 12%, and the effective rate is about 11.4%.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/tools/take-home-pay", label: "Take-home pay calculator" }],
      },
    },
    {
      heading: "The 2026 federal brackets",
      paragraphs: [
        "These rates apply to taxable income for tax year 2026. Find your filing status and read down the rows.",
      ],
      table: {
        caption: "2026 federal income tax brackets",
        headers: ["Rate", "Single", "Married filing jointly"],
        rows: [
          ["10%", "$0 to $12,400", "$0 to $24,800"],
          ["12%", "$12,401 to $50,400", "$24,801 to $100,800"],
          ["22%", "$50,401 to $105,700", "$100,801 to $211,400"],
          ["24%", "$105,701 to $201,775", "$211,401 to $403,550"],
          ["32%", "$201,776 to $256,225", "$403,551 to $512,450"],
          ["35%", "$256,226 to $640,600", "$512,451 to $768,700"],
          ["37%", "Over $640,600", "Over $768,700"],
        ],
      },
    },
    {
      heading: "The standard deduction subtracts first",
      paragraphs: [
        "Brackets apply to taxable income, not total income. The standard deduction comes off before any bracket math.",
        "For 2026 that is $16,100 single and $32,200 married filing jointly. Itemizing only helps when deductions top those numbers.",
      ],
      linkRow: {
        intro: "Keep reading:",
        links: [{ href: "/guides/standard-deduction-seniors-2026", label: "2026 standard deduction for seniors" }],
      },
    },
  ],
  panel: {
    eyebrow: "Go deeper · Article",
    title: "Your First Tax Return, Explained",
    blurb: "W-2s, 1099s, refunds, and free filing, all in plain English.",
    href: "/wealth/first-tax-return-guide",
    cta: "Read the guide",
  },
  sources: [
    {
      label: "IRS: 2026 tax inflation adjustments (IR-2025-103)",
      href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
    },
  ],
  faqs: [
    {
      q: "Will a raise push all my income into a higher bracket?",
      a: "No. Only the dollars above the bracket line face the higher rate. A raise always raises take-home pay.",
    },
    {
      q: "Do these brackets include state tax?",
      a: "No. These are federal brackets. North Carolina adds a flat 3.99% on income.",
    },
    {
      q: "What is taxable income?",
      a: "Income left after subtractions like the standard deduction. Brackets apply to that number.",
    },
    {
      q: "How do I find my marginal rate?",
      a: "Find your taxable income in the table. The rate on its row is your marginal rate.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    {
      href: "/wealth/first-tax-return-guide",
      label: "Your First Tax Return, Explained",
      kind: "Article",
    },
    { href: "/wealth/roth-vs-traditional-taxes", label: "Roth vs Traditional: The Tax Trade", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function TaxBracketsExplainedPage() {
  return <WealthArticlePage article={ARTICLE} />;
}
