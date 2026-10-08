import type { Metadata } from "next";

import { wealthMetadata } from "@/lib/wealth/seo";
import { WealthArticlePage, type ArticleData } from "@/app/wealth/catch-up-contributions-after-50/article";

const ARTICLE: ArticleData = {
  path: "/wealth/pre-retirement-5-year-checklist",
  title: "Your 5-Year Pre-Retirement Checklist",
  description:
    "Six moves for the five years before retirement: spending, health coverage, Social Security, catch-ups, debt, and estate basics.",
  eyebrow: "Pre-retirement planning",
  readMinutes: 6,
  answer:
    "Five years out, retirement gets concrete. Know your spending, bridge health coverage to 65, time Social Security, use catch-ups, cut debt, and set estate basics.",
  sections: [
    {
      heading: "The checklist",
      paragraphs: [],
      ordered: true,
      list: [
        "Know your spending. Track a full year of expenses so your retirement income target is real, not a guess.",
        "Bridge health coverage to 65. Medicare starts at 65, so plan the gap years now.",
        "Time Social Security. Full retirement age is 67 for anyone born in 1960 or later.",
        "Use catch-up contributions. Extra 401(k), IRA, and HSA contributions are open to you in your 50s and 60s.",
        "Make a debt plan. Enter retirement carrying as little required monthly debt as you can.",
        "Lock down estate basics. Sign a will, update beneficiaries, and name someone to act for you.",
      ],
    },
    {
      heading: "The health coverage bridge",
      paragraphs: [
        "The gap between your last workday and 65 needs a plan. A spouse's plan, COBRA, or marketplace coverage can bridge it.",
        "Medicare planning starts before 65. Learn the enrollment windows early so nothing lapses.",
      ],
      linkRow: {
        intro: "Start here:",
        links: [
          { href: "/turning-65", label: "turning 65" },
          { href: "/medicare-costs", label: "Medicare costs" },
        ],
      },
    },
    {
      heading: "Social Security timing",
      paragraphs: [
        "Your full retirement age is 67 if you were born in 1960 or later. Claiming earlier shrinks the monthly check.",
        "Waiting past full retirement age grows it. The trade is smaller checks now versus a bigger check later.",
      ],
    },
    {
      heading: "Estate basics in one afternoon",
      paragraphs: [
        "A will says where your things go. Beneficiary forms on retirement accounts and life insurance override the will, so update them too.",
        "Name someone to make financial and medical decisions if you cannot. Store copies where your family can find them.",
      ],
    },
  ],
  panel: {
    eyebrow: "Go deeper · Guide",
    title: "Turning 65 and Medicare",
    blurb: "Enrollment windows, deadlines, and first steps, in plain English.",
    href: "/turning-65",
    cta: "Read the guide",
  },
  sources: [
    {
      label: "Social Security: 2026 changes fact sheet (SSA)",
      href: "https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf",
    },
    {
      label: "IRS: Retirement topics, catch-up contributions",
      href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions",
    },
  ],
  faqs: [
    {
      q: "I plan to work past 65. Do I still need this checklist?",
      a: "Yes. Health coverage, Social Security timing, and estate basics matter even when the paycheck continues.",
    },
    {
      q: "When should I start learning about Medicare?",
      a: "Start the year you turn 64. Enrollment windows open around your 65th birthday.",
    },
    {
      q: "Is five years enough time to get ready?",
      a: "It is enough to move the big levers: spending, debt, savings rate, and coverage.",
    },
  ],
  nextLinks: [
    { href: "/wealth", label: "Wealth hub", kind: "Hub" },
    {
      href: "/wealth/catch-up-contributions-after-50",
      label: "Catch-Up Contributions After 50",
      kind: "Article",
    },
    { href: "/wealth/roth-vs-traditional-taxes", label: "Roth vs Traditional: The Tax Trade", kind: "Article" },
  ],
};

export function generateMetadata(): Metadata {
  return wealthMetadata({ title: ARTICLE.title, description: ARTICLE.description, path: ARTICLE.path });
}

export default function PreRetirementChecklistPage() {
  return <WealthArticlePage article={ARTICLE} />;
}
