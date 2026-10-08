import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/first-tax-return-guide",
  title: "Your First Tax Return, Explained",
  description:
    "W-2s, 1099s, the standard deduction, and when filing gets you money back. Plain English, no jargon.",
  eyebrow: "Tax basics",
  readMinutes: 5,
  answer:
    "A tax return reports last year's income and settles up with the IRS. File when you must, and file anyway when a refund is waiting.",
  sections: [
    {
      heading: "W-2 vs 1099 in plain English",
      paragraphs: [
        "A W-2 comes from an employer. It shows your wages and the taxes already withheld from your paychecks.",
        "A 1099 reports income from freelance, contract, or gig work. No taxes were withheld, so you settle up yourself.",
        "With 1099 income you also pay the employer share of Social Security and Medicare taxes. Set aside money from every payment.",
      ],
    },
    {
      heading: "The standard deduction",
      paragraphs: [
        "The standard deduction is income the IRS does not tax. For 2026 it is $16,100 for single filers.",
        "Subtract it from your income before you figure tax. It beats itemizing for simple first-time returns.",
      ],
    },
    {
      heading: "When you must file vs when you should anyway",
      paragraphs: [
        "The IRS sets an income threshold for required filing each year. Earn above it and you must file.",
        "File anyway when an employer withheld taxes from your pay. Withholding above your real tax bill comes back as a refund.",
        "Credits for students and low earners only pay out on a filed return. No return means no credit.",
      ],
    },
    {
      heading: "Free filing exists",
      paragraphs: [
        "IRS Free File offers free guided filing for qualifying incomes. The IRS site lists the current income cutoff.",
        "Volunteer programs at libraries and community centers offer free help each tax season.",
      ],
    },
  ],
  panel: {
    eyebrow: "Try it · Calculator · 5 minutes",
    title: "Build a budget that works",
    blurb: "See where your money goes each month, then give your refund a job.",
    href: "/wealth/calculators/budget",
    cta: "Open it",
  },
  sources: [
    { label: "IRS Free File", href: "https://www.irs.gov/freefile" },
    { label: "IRS: About Form W-2", href: "https://www.irs.gov/forms-pubs/about-form-w-2" },
  ],
  faqs: [
    {
      q: "I only worked part of the year. Do I still file?",
      a: "File if your income tops the filing threshold. File anyway when withholding means a refund.",
    },
    {
      q: "What if I lost my W-2?",
      a: "Ask your employer for a copy. Your last pay stub of the year can fill the gap.",
    },
    {
      q: "When are taxes due?",
      a: "April 15 in a normal year. File or request an extension by then to avoid penalties.",
    },
  ],
  nextLinks: [
    { href: "/guides/overtime-tax-deduction-2026", label: "Overtime deduction rules", kind: "Article" },
    { href: "/guides/tips-tax-deduction-2026", label: "Tips and service charges", kind: "Article" },
    { href: "/guides/tax-extension-cannot-pay", label: "Cannot pay after an extension?", kind: "Article" },
    { href: "/guides/tax-filing-mistakes-first-timers", label: "7 tax filing mistakes first-timers make", kind: "Article" },
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    {
      href: "/wealth/tax-brackets-explained-plainly",
      label: "Tax Brackets, Explained Plainly",
      kind: "Article",
    },
    { href: "/wealth/roth-vs-traditional-taxes", label: "Roth vs Traditional: The Tax Trade", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function FirstTaxReturnGuidePage() {
  return <WealthArticlePage article={ARTICLE} />;
}
