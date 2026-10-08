/**
 * CD or high-yield savings quiz data.
 * EDUCATIONAL ONLY. The result is a plain-English read on where the
 * visitor's cash habits point, plus a checklist of what to compare.
 * Never personalized advice, no bank names.
 */

import type { QuizData, QuizFaq, QuizMeta } from "../medigap-or-advantage-quiz/quiz-engine/types";

export const META: QuizMeta = {
  title: "CD or Savings Quiz | Christian Brinkley",
  description:
    "Six questions: should your cash sit in a CD or a high-yield savings account? Timing, access, and rates in plain English. Educational only.",
};

export const DATA: QuizData = {
  slug: "cd-or-savings-quiz",
  quizName: "CD or savings quiz",
  intro:
    "Six questions about when you will need the money and how much access matters. At the end you get a plain-English read plus a short checklist of what to compare before you open anything.",
  questions: [
    {
      id: "timeline",
      text: "When might you need this money?",
      options: [
        {
          label: "Any day. It is my safety net.",
          scores: { savings: 2 },
        },
        {
          label: "Within the next year or so.",
          scores: { savings: 1 },
        },
        {
          label: "I can lock it away for 12 months or more.",
          scores: { cd: 2 },
        },
        { label: "I have no idea.", scores: { savings: 1, mix: 1 } },
      ],
    },
    {
      id: "emergency",
      text: "Is this your emergency fund?",
      options: [
        {
          label: "Yes, this is the emergency money.",
          scores: { savings: 2 },
        },
        {
          label: "No, it is extra savings on top.",
          scores: { mix: 2 },
        },
        { label: "Part of it is.", scores: { mix: 2 } },
      ],
    },
    {
      id: "penalty",
      text: "How would an early-withdrawal penalty feel?",
      sub: "Most CDs charge a penalty if you pull the money out before the term ends.",
      options: [
        {
          label: "Terrible. I want full access, always.",
          scores: { savings: 2 },
        },
        {
          label: "Fine. A better rate is worth the tradeoff.",
          scores: { cd: 2 },
        },
        {
          label: "I did not know CDs had penalties.",
          scores: { savings: 1, mix: 1 },
        },
      ],
    },
    {
      id: "priority",
      text: "What matters more for this money?",
      options: [
        {
          label: "The highest rate I can get.",
          scores: { cd: 2 },
        },
        {
          label: "Easy access whenever I want it.",
          scores: { savings: 2 },
        },
        { label: "A bit of both.", scores: { mix: 2 } },
      ],
    },
    {
      id: "amount",
      text: "How much are we talking about?",
      sub: "Many CDs have minimum deposits. Savings accounts usually do not.",
      options: [
        { label: "Under $1,000.", scores: { savings: 2 } },
        { label: "$1,000 to $10,000.", scores: { mix: 2 } },
        { label: "Over $10,000.", scores: { mix: 2 } },
      ],
    },
    {
      id: "ratetype",
      text: "Locked-in rate, or a rate that moves with the market?",
      options: [
        {
          label: "Lock it in. I like knowing exactly what I earn.",
          scores: { cd: 2 },
        },
        {
          label: "Let it move. I want flexibility if rates rise.",
          scores: { savings: 2 },
        },
        { label: "No preference.", scores: { mix: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "savings",
      headline: "A high-yield savings account looks like the simpler fit",
      shareLabel: "Savings fits best",
      lede: "Access matters most to you. A high-yield savings account pays far more than a traditional savings account while keeping your money reachable.",
      bullets: [
        "Your money stays liquid. No term to wait out, no penalty for moving it when life happens.",
        "High-yield savings rates are usually much higher than a big bank's standard savings rate, and the rate can rise if market rates rise.",
        "Emergency money belongs somewhere boring and reachable. This is the classic home for it.",
        "The tradeoff: the rate can also fall, and it is rarely the highest rate available at any moment.",
      ],
      takeToProHeading: "What to check before you open one",
      takeToPro: [
        "Is the account FDIC or NCUA insured, and up to what amount?",
        "Is there a monthly fee or a minimum balance to earn the top rate?",
        "How long do transfers in and out actually take?",
        "What is the rate compared to what you earn right now?",
      ],
      closing:
        "This is a starting point for your own comparison, not advice. Compare two or three accounts with the checklist above and pick the one that fits.",
    },
    {
      id: "cd",
      headline: "A CD looks worth exploring",
      shareLabel: "CD worth exploring",
      lede: "You can set this money aside and you like certainty. A certificate of deposit locks in a rate for a fixed term.",
      bullets: [
        "The rate is guaranteed for the whole term. You know exactly what you will earn on day one.",
        "CD rates are often higher than savings rates for the same bank, because you are giving up access.",
        "Pulling out early usually costs a penalty, often a few months of interest. Only put in money you truly will not need.",
        "A CD ladder, splitting money across several terms, is how people keep some access while earning CD rates.",
      ],
      takeToProHeading: "What to check before you open one",
      takeToPro: [
        "What is the early-withdrawal penalty, in plain dollars?",
        "Is there a minimum deposit, and does a longer term pay meaningfully more?",
        "Is the account FDIC or NCUA insured?",
        "How do the rates compare across at least two or three banks?",
      ],
      closing:
        "This is a starting point for your own comparison, not advice. Run the checklist above against a few CDs before you lock anything in.",
    },
    {
      id: "mix",
      headline: "A mix might be the move",
      shareLabel: "A mix might win",
      lede: "You want some access and some yield. Splitting the money between savings and CDs gives you both.",
      bullets: [
        "Keep true emergency money in high-yield savings: reachable, no penalties, earning a solid rate.",
        "Put money you will not need for a year or more into CDs to lock in a higher guaranteed rate.",
        "A CD ladder spreads money across several terms so something is always maturing soon.",
        "Revisit the split once a year. As rates move, the best mix moves with them.",
      ],
      takeToProHeading: "What to check before you open anything",
      takeToPro: [
        "How many months of expenses should sit in savings before the rest goes to CDs?",
        "What are the early-withdrawal penalties on the CDs you are comparing?",
        "Are both accounts FDIC or NCUA insured?",
        "What is the total rate picture: blended across savings and CDs?",
      ],
      closing:
        "This is a starting point for your own comparison, not advice. Decide your savings number first, then shop CDs with the rest.",
    },
  ],
};

export const FAQS: QuizFaq[] = [
  {
    q: "Is this quiz financial advice?",
    a: "No. It is educational. Your answers produce a plain-English read on your cash habits and a checklist of what to compare. It cannot see your full finances, so treat it as a starting point.",
  },
  {
    q: "What is the difference between a CD and a high-yield savings account?",
    a: "A CD locks your money in for a fixed term at a guaranteed rate, with a penalty for early withdrawal. A high-yield savings account keeps your money accessible and pays a variable rate that moves with the market.",
  },
  {
    q: "What does FDIC insured mean?",
    a: "It means the government insures your deposits up to the legal limit if the bank fails. Credit unions have the same protection through the NCUA. Only put savings in insured accounts.",
  },
  {
    q: "Do my answers leave my device?",
    a: "No. The quiz runs entirely in your browser. Nothing is saved, sent, or sold, and there is no account or signup.",
  },
];
