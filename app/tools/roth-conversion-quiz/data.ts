/**
 * Roth conversion quiz data.
 * EDUCATIONAL ONLY. The result is a framework for thinking about a
 * conversion, never personalized advice. Every result ends with
 * "talk to a tax pro."
 */

import type { QuizData, QuizFaq, QuizMeta } from "../medigap-or-advantage-quiz/quiz-engine/types";

export const META: QuizMeta = {
  title: "Roth Conversion Quiz | Christian Brinkley",
  description:
    "Six questions: is a Roth conversion worth it this year? Brackets, timing, and how you would pay the tax. Educational only, ends with a tax pro checklist.",
};

export const DATA: QuizData = {
  slug: "roth-conversion-quiz",
  quizName: "Roth conversion quiz",
  intro:
    "Six questions about your taxes, your timeline, and how you would pay the conversion tax. At the end you get a plain-English read on the idea plus a checklist to bring to a tax professional.",
  questions: [
    {
      id: "bracket",
      text: "Compare your tax bracket now to what you expect in retirement.",
      options: [
        {
          label: "Lower now than I expect later",
          scores: { explore: 2 },
        },
        {
          label: "Higher now than I expect later",
          scores: { notworth: 2 },
        },
        {
          label: "About the same",
          scores: { taxpro: 1, explore: 1 },
        },
        { label: "I honestly do not know", scores: { taxpro: 2 } },
      ],
    },
    {
      id: "paytax",
      text: "Could you pay the conversion tax from savings, outside the account?",
      sub: "Paying from the converted money itself usually weakens the whole idea.",
      options: [
        {
          label: "Yes, from cash or savings",
          scores: { explore: 2 },
        },
        {
          label: "No, I would have to use the converted money",
          scores: { notworth: 2 },
        },
        { label: "Not sure", scores: { taxpro: 2 } },
      ],
    },
    {
      id: "timeline",
      text: "How many years until you will need this money?",
      options: [
        { label: "15 or more", scores: { explore: 2 } },
        { label: "5 to 15", scores: { taxpro: 2 } },
        { label: "Under 5", scores: { notworth: 2 } },
      ],
    },
    {
      id: "incomeyear",
      text: "Anything unusual about this year's income?",
      options: [
        {
          label: "Lower than normal, a dip year",
          scores: { explore: 2 },
        },
        {
          label: "Higher than normal",
          scores: { notworth: 2 },
        },
        { label: "About normal", scores: { taxpro: 2 } },
      ],
    },
    {
      id: "rmd",
      text: "Are required withdrawals (RMDs) on your radar?",
      sub: "The IRS eventually requires yearly withdrawals from traditional accounts, and they are taxed as income.",
      options: [
        {
          label: "Yes, I am getting close to that age",
          scores: { explore: 1, taxpro: 1 },
        },
        { label: "No, that is decades away", scores: { taxpro: 2 } },
        { label: "What is an RMD?", scores: { taxpro: 2 } },
      ],
    },
    {
      id: "heirs",
      text: "Do you plan to leave this money to heirs?",
      options: [
        {
          label: "Yes, I want it to pass on tax-free",
          scores: { explore: 2 },
        },
        {
          label: "No, I will spend it myself",
          scores: { taxpro: 1, notworth: 1 },
        },
        { label: "Not sure", scores: { taxpro: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "taxpro",
      headline: "Too close to call. This is a tax-pro question.",
      shareLabel: "Ask a tax pro",
      lede: "Your answers have pieces pointing both ways, or a few unknowns that really decide the math. That is exactly when a professional earns their fee.",
      bullets: [
        "A conversion is mostly a bet on your tax rate now versus later. When that comparison is unclear, the answer is unclear too.",
        "Small details swing it: paying the tax from savings versus from the account, your state taxes, and whether a conversion nudges your Medicare premiums up.",
        "A partial conversion can be the middle path. Converting just enough to fill your current bracket is a common strategy worth asking about.",
      ],
      takeToProHeading: "Bring this to a tax professional",
      takeToPro: [
        "Last year's tax return and your best estimate of this year's income.",
        "When you expect to need the money, and whether heirs are in the picture.",
        "Whether a partial conversion, filling just my current bracket, makes sense.",
        "How a conversion would affect my Medicare premiums and state taxes.",
      ],
      closing:
        "Talk to a tax pro before you act. Bring these answers and you will get a straight answer fast.",
    },
    {
      id: "explore",
      headline: "A conversion looks worth exploring",
      shareLabel: "Worth exploring",
      lede: "Your answers line up with the classic conversion case: a lower rate now, cash to pay the tax, and time for the money to grow.",
      bullets: [
        "Converting in a lower-bracket year means you pay the tax at a discount compared to withdrawing later at a higher rate.",
        "Paying the tax from savings keeps the full converted amount working for you, which is where the long-term benefit comes from.",
        "A long runway and a dip year are the two strongest signals. You appear to have at least one, maybe both.",
      ],
      takeToProHeading: "Bring this to a tax professional",
      takeToPro: [
        "Should I convert a partial amount to fill my current bracket without spilling into the next?",
        "How would a conversion affect my Medicare premiums (the IRMAA surcharge)?",
        "Does my state tax the conversion too, and how much does that change the math?",
        "What is the deadline to complete a conversion for this tax year?",
      ],
      closing:
        "This is a strong starting point, not a green light. Talk to a tax pro and run your real numbers before you convert anything.",
    },
    {
      id: "notworth",
      headline: "A conversion probably is not worth it this year",
      shareLabel: "Probably not this year",
      lede: "Your answers point to a higher rate now, a short timeline, or no outside cash to pay the tax. Those are the three classic reasons to wait.",
      bullets: [
        "Converting while your bracket is higher than it will be later usually means paying more tax than you would by waiting.",
        "With a short timeline, the converted money has less time to grow tax-free, which shrinks the payoff.",
        "Paying the tax from the converted amount itself leaves less money working for you from day one.",
      ],
      takeToProHeading: "Bring this to a tax professional",
      takeToPro: [
        "Is there a future dip year, like early retirement, when a conversion would make more sense?",
        "Would small partial conversions over several years beat one big one?",
        "How do I make sure a conversion does not push me into a higher bracket or raise my Medicare premiums?",
      ],
      closing:
        "Not this year does not mean never. Revisit in a lower-income year, and talk to a tax pro before you rule it out for good.",
    },
  ],
};

export const FAQS: QuizFaq[] = [
  {
    q: "Is this quiz financial advice?",
    a: "No. It is educational. Your answers produce a plain-English read on the idea and a checklist for a tax professional. Only a pro who sees your full return can say whether a conversion makes sense for you.",
  },
  {
    q: "What is a Roth conversion, in plain English?",
    a: "You move money from a traditional retirement account into a Roth account. You pay income tax on the amount now, and qualified withdrawals later are tax-free. The bet is that your tax rate now is lower than it would be later.",
  },
  {
    q: "Why does paying the tax from savings matter so much?",
    a: "If you pay the tax from the converted money, less money lands in the Roth and starts growing. Paying from outside savings keeps the full amount working for you, which is where most of the long-term benefit comes from.",
  },
  {
    q: "What is IRMAA and why does the quiz mention it?",
    a: "IRMAA is a surcharge on Medicare Part B and Part D premiums for higher-income retirees. A big conversion can push your income over the threshold and raise your premiums for a year or two. A tax pro can model this before you convert.",
  },
];
