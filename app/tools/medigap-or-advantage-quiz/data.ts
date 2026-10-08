/**
 * Medigap or Medicare Advantage quiz data.
 * EDUCATIONAL ONLY. The result is a personalized list of questions to bring
 * to a licensed agent. Never a plan recommendation, no carrier names,
 * no plan names, no "most people should" language.
 */

import type { QuizData, QuizFaq, QuizMeta } from "./quiz-engine/types";

export const META: QuizMeta = {
  title: "Medigap or Advantage Quiz | Christian Brinkley",
  description:
    "Seven questions to ask yourself before choosing between Medigap and Medicare Advantage. Educational only, get a list of questions to bring to an agent.",
};

export const DATA: QuizData = {
  slug: "medigap-or-advantage-quiz",
  quizName: "Medigap or Medicare Advantage quiz",
  intro:
    "Seven quick questions about how you use health care and what matters to you. There is no right answer. At the end you get a list of questions to bring to a licensed agent, not a plan pick.",
  questions: [
    {
      id: "doctors",
      text: "When you picture seeing a specialist, what matters more?",
      options: [
        {
          label: "Seeing any doctor who takes Medicare, no referrals",
          scores: { medigap: 2 },
        },
        {
          label: "I am fine with a network if it keeps costs down",
          scores: { advantage: 2 },
        },
        { label: "Not sure yet", scores: { mixed: 2 } },
      ],
    },
    {
      id: "travel",
      text: "How often are you away from home?",
      sub: "Think travel, snowbird winters, or a possible move in the next few years.",
      options: [
        {
          label: "I travel a lot or split time between places",
          scores: { medigap: 2 },
        },
        {
          label: "I am home most of the time",
          scores: { advantage: 2 },
        },
        { label: "Not sure", scores: { mixed: 2 } },
      ],
    },
    {
      id: "budget",
      text: "Which monthly cost picture sounds more comfortable?",
      options: [
        {
          label: "Higher steady premium, smaller surprises at the doctor",
          scores: { medigap: 2 },
        },
        {
          label: "Lower monthly premium, copays when I use care",
          scores: { advantage: 2 },
        },
        { label: "Not sure", scores: { mixed: 2 } },
      ],
    },
    {
      id: "drugs",
      text: "Do you take regular prescriptions?",
      options: [
        { label: "Yes, several", scores: { advantage: 1, mixed: 1 } },
        { label: "Just one or none", scores: { medigap: 1, mixed: 1 } },
        { label: "Not sure", scores: { mixed: 2 } },
      ],
    },
    {
      id: "extras",
      text: "How much do extras like dental, vision, and hearing matter to you?",
      options: [
        {
          label: "A lot, I would like them bundled in",
          scores: { advantage: 2 },
        },
        {
          label: "I can handle those separately",
          scores: { medigap: 2 },
        },
        { label: "Not sure", scores: { mixed: 2 } },
      ],
    },
    {
      id: "referrals",
      text: "How do you feel about needing a referral or plan approval before some care?",
      options: [
        {
          label: "I would rather not deal with that",
          scores: { medigap: 2 },
        },
        {
          label: "Fine with it if it saves me money",
          scores: { advantage: 2 },
        },
        { label: "Not sure", scores: { mixed: 2 } },
      ],
    },
    {
      id: "future",
      text: "How much does keeping future options open matter to you?",
      sub: "In most states you can be asked health questions when you apply for Medigap later, outside your first enrollment window.",
      options: [
        {
          label: "A lot, I want flexibility down the road",
          scores: { medigap: 2 },
        },
        {
          label: "I will pick one and stick with it",
          scores: { advantage: 2 },
        },
        { label: "Not sure", scores: { mixed: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "mixed",
      headline: "Your answers are genuinely mixed, and that is normal",
      shareLabel: "Genuinely mixed",
      lede: "You want pieces of both paths. That means the details matter more than the label, and a conversation will beat any quiz.",
      bullets: [
        "Neither path is the wrong one. Medigap trades higher steady premiums for wide-open doctor choice. Advantage trades networks and approvals for lower premiums and bundled extras.",
        "Your first enrollment window matters. Some choices are easy to make now and hard to reverse later, especially Medigap underwriting in most states.",
        "The cheapest premium is rarely the whole story. Ask what a bad year costs under each path, not just a healthy one.",
      ],
      takeToProHeading: "Questions to bring to a licensed agent",
      takeToPro: [
        "What does my first full year cost under each path, using my actual doctors and prescriptions?",
        "Which choice keeps more doors open if my health changes in five years?",
        "How would each path handle a big surprise, like surgery or a long hospital stay?",
        "What deadlines apply to me personally, and what happens if I miss one?",
      ],
      closing:
        "This quiz cannot pick a plan for you, and it does not try. Bring these questions to a licensed agent and decide with real numbers.",
    },
    {
      id: "medigap",
      headline: "Your answers point toward questions about Medigap",
      shareLabel: "Medigap questions",
      lede: "You lean toward doctor flexibility and predictable costs. Medigap pairs with Original Medicare to cover much of what Medicare does not.",
      bullets: [
        "Medigap plans work with any doctor or hospital that takes Medicare, anywhere in the country. No networks, no referrals.",
        "You pay a monthly premium for the Medigap plan on top of your Part B premium, and most routine care costs little or nothing at the visit.",
        "Medigap does not include drug coverage, so it usually pairs with a separate Part D plan. Dental, vision, and hearing stay separate too.",
        "Timing counts: in most states, signing up later can mean health questions and higher prices. Ask about this before you decide.",
      ],
      takeToProHeading: "Questions to bring to a licensed agent",
      takeToPro: [
        "What do Medigap premiums look like for my age and ZIP code, and how often do they rise?",
        "If I start with Advantage and want Medigap later, how does underwriting work in North Carolina?",
        "Which of my prescriptions would a standalone Part D plan cover, and at what cost?",
        "What is my total yearly picture: all premiums plus what I would still pay at the doctor?",
      ],
      closing:
        "This quiz cannot pick a plan for you, and it does not try. Bring these questions to a licensed agent and decide with real numbers.",
    },
    {
      id: "advantage",
      headline: "Your answers point toward questions about Medicare Advantage",
      shareLabel: "Advantage questions",
      lede: "You lean toward lower premiums and bundled coverage. Advantage plans combine hospital, medical, and often drug coverage in one plan.",
      bullets: [
        "Medicare Advantage plans are offered by private companies approved by Medicare. Most have provider networks and set copays for care.",
        "Monthly premiums are often low, and many plans bundle drug coverage plus dental, vision, and hearing benefits.",
        "Every plan has a yearly maximum out-of-pocket. That cap is the number that matters most in a bad health year.",
        "Some care needs a referral or plan approval first. Ask how that works day to day before you enroll.",
      ],
      takeToProHeading: "Questions to bring to a licensed agent",
      takeToPro: [
        "Which of my doctors and hospitals are in-network for the plans available at my address?",
        "What is each plan's maximum out-of-pocket, and what would a hospital stay cost me?",
        "How do referrals and prior approvals work in practice for specialists?",
        "What happens to my coverage if I travel out of state or move?",
      ],
      closing:
        "This quiz cannot pick a plan for you, and it does not try. Bring these questions to a licensed agent and decide with real numbers.",
    },
  ],
};

export const FAQS: QuizFaq[] = [
  {
    q: "Is this quiz a recommendation?",
    a: "No. It is educational. Your answers produce a list of questions to bring to a licensed agent, not a plan pick. No quiz can replace a conversation about your doctors, prescriptions, and budget.",
  },
  {
    q: "What is the basic difference between Medigap and Medicare Advantage?",
    a: "Medigap works alongside Original Medicare and helps pay what Medicare does not, with wide doctor choice and a monthly premium. Medicare Advantage is an alternative way to get your Medicare coverage through a private plan, usually with networks, copays, and bundled extras.",
  },
  {
    q: "Can I switch between them later?",
    a: "Sometimes, but the rules differ. Moving from Advantage to Medigap later can involve health questions in most states, which is why the quiz asks about future flexibility. A licensed agent can walk you through your specific timing.",
  },
  {
    q: "Does this quiz send my answers anywhere?",
    a: "No. The quiz runs entirely in your browser. Nothing is saved, sent, or sold, and there is no account or signup.",
  },
];
