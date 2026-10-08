/**
 * Quiz content for /wealth/quiz. Education only: results describe the standard order
 * for the basics, never a product to buy.
 */

export type QuizLink = { href: string; label: string };

/* ── What should I do with my first $1,000? ──────────────────────────── */

export type TreeOption = { label: string; next: string };
export type TreeNode = { id: string; question: string; help?: string; options: TreeOption[] };

export type PlanResult = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  watchOut: string;
  links: QuizLink[];
};

export const FIRST_1000_START = "high-rate";

export const FIRST_1000_TREE: readonly TreeNode[] = [
  {
    id: "high-rate",
    question: "Are you carrying a balance on a credit card or a high-rate loan?",
    help: "High-rate means a card or a loan charging around 20% or more. Check your statement for the APR.",
    options: [
      { label: "Yes, I carry a balance", next: "cushion-with-debt" },
      { label: "No, nothing like that", next: "cushion" },
    ],
  },
  {
    id: "cushion-with-debt",
    question: "If your car died tomorrow, could you cover a $500 repair without borrowing?",
    options: [
      { label: "No, I'd have to borrow", next: "result:buffer-then-debt" },
      { label: "Yes, I could cover it", next: "result:attack-debt" },
    ],
  },
  {
    id: "cushion",
    question: "Do you have at least one month of expenses sitting in savings?",
    help: "Rent, food, phone, gas, insurance. One month of the bills that don't wait.",
    options: [
      { label: "Not yet", next: "result:starter-fund" },
      { label: "Yes", next: "match" },
    ],
  },
  {
    id: "match",
    question: "Does your job match retirement contributions, and are you getting all of it?",
    help: "A match means your employer adds money when you put money into the plan at work.",
    options: [
      { label: "There's a match and I'm not getting all of it", next: "result:grab-match" },
      { label: "I honestly don't know", next: "result:check-match" },
      { label: "No match, or I already get all of it", next: "horizon" },
    ],
  },
  {
    id: "horizon",
    question: "When do you expect to need this $1,000?",
    options: [
      { label: "Within the next couple of years", next: "result:short-term" },
      { label: "Not for five years or more", next: "full-fund" },
    ],
  },
  {
    id: "full-fund",
    question: "Do you have three to six months of expenses saved?",
    options: [
      { label: "Not yet", next: "result:build-fund" },
      { label: "Yes, that's covered", next: "result:long-term" },
    ],
  },
];

export const FIRST_1000_RESULTS: readonly PlanResult[] = [
  {
    id: "buffer-then-debt",
    title: "Split it: small buffer first, then the debt",
    summary:
      "With no cushion, one surprise bill goes right back on the card. Keep a small buffer. Send the rest at the highest rate you owe.",
    steps: [
      "Park $500 in savings as a starter buffer.",
      "Send what's left to the debt with the highest APR.",
      "Keep paying every minimum on time. Late fees undo the progress.",
      "Run your real numbers in the debt payoff calculator to see your finish date.",
    ],
    watchOut: "The buffer is for true emergencies. Concert tickets are not an emergency.",
    links: [
      { href: "/wealth/calculators/debt-payoff", label: "Debt payoff calculator" },
      { href: "/wealth/learn/emergency-funds", label: "Emergency funds, explained" },
    ],
  },
  {
    id: "attack-debt",
    title: "Point it at your highest-rate debt",
    summary:
      "Paying down a 24% card is a guaranteed stop to 24% interest on that money. You already have a cushion, so all $1,000 can go here.",
    steps: [
      "List every debt with its balance, APR and minimum payment.",
      "Send the $1,000 to the highest APR, or the smallest balance if a quick win keeps you going.",
      "Roll that debt's old payment into the next one when it's gone.",
      "Compare both methods with your numbers before you pick.",
    ],
    watchOut: "Stop adding to the card while you pay it down, or the math never ends.",
    links: [
      { href: "/wealth/calculators/debt-payoff", label: "Avalanche vs snowball calculator" },
      { href: "/wealth/learn/credit-scores-explained", label: "Credit scores, explained" },
    ],
  },
  {
    id: "starter-fund",
    title: "Make it your starter emergency fund",
    summary:
      "One month of expenses changes how money feels. A flat tire becomes annoying and stops being a crisis. That comes before anything fancier.",
    steps: [
      "Open a separate savings account so the money isn't staring at you in checking.",
      "Put the $1,000 there and name the account something like Do Not Touch.",
      "Add a small automatic transfer every payday.",
      "Work out your own target with a real budget.",
    ],
    watchOut: "Savings at a bank or credit union is insured up to legal limits. Check for FDIC or NCUA coverage.",
    links: [
      { href: "/wealth/learn/emergency-funds", label: "How big should it be?" },
      { href: "/wealth/calculators/budget", label: "Budget builder" },
    ],
  },
  {
    id: "grab-match",
    title: "Look hard at the match you're leaving behind",
    summary:
      "A match is part of your pay that only shows up if you contribute. Get the full match before you do anything else with spare cash.",
    steps: [
      "Find your plan's match formula in your benefits portal or ask HR.",
      "See how much more per paycheck gets you the full match.",
      "Use the $1,000 as a cushion so the smaller paycheck doesn't sting.",
      "Ask whether your plan has a Roth option and learn the difference.",
    ],
    watchOut: "Check the vesting schedule. Some matches only become fully yours after a set time at the company.",
    links: [
      { href: "/wealth/calculators/roth-vs-traditional", label: "Roth vs traditional" },
      { href: "/wealth/calculators/compound-interest", label: "See what a match can grow into" },
    ],
  },
  {
    id: "check-match",
    title: "First job: find out if there's a match",
    summary:
      "This costs nothing and takes ten minutes. If your employer matches and you're not contributing, that's pay you're not collecting.",
    steps: [
      "Log in to your benefits portal or email HR: do we have a retirement match, and what's the formula?",
      "Keep the $1,000 in savings until you know the answer.",
      "If there's a match, see what it takes per paycheck to get all of it.",
      "Come back and take this quiz again with the answer.",
    ],
    watchOut: "No retirement plan at work? You can still open an IRA on your own. The Roth article covers the basics.",
    links: [
      { href: "/wealth/learn/what-is-a-roth-ira", label: "What a Roth IRA actually is" },
      { href: "/wealth/learn/budgeting-on-your-first-job", label: "Budgeting on your first job" },
    ],
  },
  {
    id: "short-term",
    title: "Keep it safe and easy to reach",
    summary:
      "Money you need within a couple of years has no time to recover from a bad stretch. Short-term money belongs somewhere boring and insured.",
    steps: [
      "Name the goal and the date: moving costs, a car, a certification.",
      "Keep it in insured savings, separate from spending money.",
      "Divide what's left to save by the months you have. That's your monthly number.",
      "Automate that amount so the goal funds itself.",
    ],
    watchOut: "Compare savings rates between banks and credit unions. They are not all the same.",
    links: [
      { href: "/wealth/calculators/budget", label: "Find the monthly amount" },
      { href: "/wealth/learn/the-50-30-20-rule", label: "The 50/30/20 rule" },
    ],
  },
  {
    id: "build-fund",
    title: "Finish the emergency fund",
    summary:
      "You have a start. Three to six months of expenses is the standard target before taking long-term risk. $1,000 moves you closer.",
    steps: [
      "Add up one month of must-pay bills. Multiply by three for your first target.",
      "Put the $1,000 toward it.",
      "Set an automatic transfer until you hit the target.",
      "Once it's full, point that same transfer at long-term goals.",
    ],
    watchOut: "Unsteady income, like commissions or gig work, is a reason to lean toward six months.",
    links: [
      { href: "/wealth/learn/emergency-funds", label: "Emergency funds, explained" },
      { href: "/wealth/calculators/budget", label: "Budget builder" },
    ],
  },
  {
    id: "long-term",
    title: "You're ready to learn long-term investing",
    summary:
      "No high-rate debt, a full cushion, and five or more years. This is where people start learning about retirement accounts. Time does most of the work, so understanding it early matters.",
    steps: [
      "Learn the account types first: 401(k), Roth IRA, traditional IRA. The account is the container, not the investment.",
      "See what $1,000 plus a monthly amount can turn into over decades.",
      "Compare paying tax now with paying it later.",
      "For what goes inside the account, talk to a licensed advisor or do your own research. I can't pick for you.",
    ],
    watchOut:
      "I'm not securities licensed, so this stops at education. Anyone promising a guaranteed return deserves hard questions.",
    links: [
      { href: "/wealth/calculators/compound-interest", label: "Compound interest calculator" },
      { href: "/wealth/calculators/roth-vs-traditional", label: "Roth vs traditional" },
      { href: "/wealth/learn/what-is-a-roth-ira", label: "What a Roth IRA actually is" },
    ],
  },
];

export function getTreeNode(id: string): TreeNode | undefined {
  return FIRST_1000_TREE.find((node) => node.id === id);
}

export function getPlanResult(id: string): PlanResult | undefined {
  return FIRST_1000_RESULTS.find((result) => result.id === id);
}

/* ── Money personality ───────────────────────────────────────────────── */

export type PersonalityId = "vault" | "vibe" | "ghost" | "grinder";

export type Personality = {
  id: PersonalityId;
  name: string;
  tagline: string;
  summary: string;
  strengths: string[];
  blindSpots: string[];
  nextSteps: QuizLink[];
};

export const PERSONALITIES: readonly Personality[] = [
  {
    id: "vault",
    name: "The Vault",
    tagline: "Money in, door locked.",
    summary:
      "You feel best when the number goes up. Saving comes easy. Spending, even on things you need, feels like losing.",
    strengths: [
      "A surprise bill doesn't wreck your month.",
      "You can delay a purchase without it eating at you.",
      "You already track where the money goes.",
    ],
    blindSpots: [
      "Guilt over normal spending, even when it's in the budget.",
      "Leaving long-term money in checking because moving it feels risky.",
      "Skipping things that matter to you to protect a number.",
    ],
    nextSteps: [
      { href: "/wealth/calculators/budget", label: "Give yourself a guilt-free wants number" },
      { href: "/wealth/calculators/compound-interest", label: "See what idle savings could do over time" },
      { href: "/wealth/learn/what-is-a-roth-ira", label: "Learn what a Roth IRA is" },
    ],
  },
  {
    id: "vibe",
    name: "The Vibe",
    tagline: "Money is for living.",
    summary:
      "You spend on experiences and people, and you don't regret much. The good times are real. So is the checking account on the 28th.",
    strengths: [
      "You're generous and you use money to make memories.",
      "You don't let fear run your decisions.",
      "You recover from money stress fast.",
    ],
    blindSpots: [
      "Small swipes that add up before you notice.",
      "Saving whatever's left, which is nothing.",
      "Card balances that follow the fun home.",
    ],
    nextSteps: [
      { href: "/wealth/calculators/budget", label: "Build a budget with a real fun line in it" },
      { href: "/wealth/learn/emergency-funds", label: "Set up a starter emergency fund" },
      { href: "/wealth/quiz/first-1000", label: "Plan your next $1,000" },
    ],
  },
  {
    id: "ghost",
    name: "The Ghost",
    tagline: "If I don't look, it's fine.",
    summary:
      "Money stuff stresses you out, so you avoid it. Unopened mail, unchecked balances. You're not bad with money. You just haven't looked at it yet.",
    strengths: [
      "You're not obsessed with money and it doesn't define you.",
      "Once you face a problem, you fix it fast.",
      "You're starting with a clean slate and zero bad systems to unlearn.",
    ],
    blindSpots: [
      "Late fees and missed due dates from not looking.",
      "Not knowing your real monthly number.",
      "Small problems growing quietly into big ones.",
    ],
    nextSteps: [
      { href: "/wealth/learn/budgeting-on-your-first-job", label: "Do the ten-minute first budget" },
      { href: "/wealth/learn/credit-scores-explained", label: "Learn what's in your credit score" },
      { href: "/wealth/calculators/debt-payoff", label: "Face the debt number once" },
    ],
  },
  {
    id: "grinder",
    name: "The Grinder",
    tagline: "I'll just make more.",
    summary:
      "Your answer to every money problem is more income. Side gigs, overtime, the next raise. It works, until you notice the money leaves as fast as it comes in.",
    strengths: [
      "You bet on yourself and it pays.",
      "You see chances to earn that other people miss.",
      "A setback doesn't scare you, because you know you can earn again.",
    ],
    blindSpots: [
      "Earning more without keeping more.",
      "No system, so a big month and a small month feel the same by the end.",
      "Burnout from fixing everything with more hours.",
    ],
    nextSteps: [
      { href: "/wealth/calculators/budget", label: "Give every new dollar a job" },
      { href: "/wealth/calculators/compound-interest", label: "See what a raise could grow into" },
      { href: "/wealth/learn/what-accountants-actually-do", label: "Think like an accountant about your income" },
    ],
  },
];

export type PersonalityQuestion = {
  question: string;
  options: Array<{ label: string; type: PersonalityId }>;
};

export const PERSONALITY_QUESTIONS: readonly PersonalityQuestion[] = [
  {
    question: "$500 you didn't expect lands in your account. First move?",
    options: [
      { label: "Straight to savings", type: "vault" },
      { label: "Dinner's on me this weekend", type: "vibe" },
      { label: "I probably won't notice for a week", type: "ghost" },
      { label: "Put it into something that makes more", type: "grinder" },
    ],
  },
  {
    question: "When do you check your bank balance?",
    options: [
      { label: "Daily. I like knowing.", type: "vault" },
      { label: "When my card gets declined", type: "vibe" },
      { label: "I avoid it on purpose", type: "ghost" },
      { label: "Mostly when a payment hits", type: "grinder" },
    ],
  },
  {
    question: "Your friends plan a trip you can't really afford.",
    options: [
      { label: "I'm out. Not in the budget.", type: "vault" },
      { label: "I'm in. I'll figure it out.", type: "vibe" },
      { label: "I say maybe and stop replying", type: "ghost" },
      { label: "I pick up extra shifts to cover it", type: "grinder" },
    ],
  },
  {
    question: "The word budget makes you feel...",
    options: [
      { label: "Calm. I have one.", type: "vault" },
      { label: "Trapped", type: "vibe" },
      { label: "A little sick", type: "ghost" },
      { label: "Like it's for people who can't earn more", type: "grinder" },
    ],
  },
  {
    question: "You have a bill due and money is tight.",
    options: [
      { label: "Covered. That's what the cushion is for.", type: "vault" },
      { label: "Card now, deal with it later", type: "vibe" },
      { label: "I'll open that email tomorrow", type: "ghost" },
      { label: "Time to sell something or work more", type: "grinder" },
    ],
  },
  {
    question: "Pick the sentence that sounds most like you.",
    options: [
      { label: "I'd rather have it and not need it.", type: "vault" },
      { label: "You can't take it with you.", type: "vibe" },
      { label: "Money is confusing and I'd rather not.", type: "ghost" },
      { label: "There's always more money to make.", type: "grinder" },
    ],
  },
  {
    question: "Something you want costs $200.",
    options: [
      { label: "I wait 30 days and usually skip it", type: "vault" },
      { label: "Already ordered", type: "vibe" },
      { label: "I buy it and don't look at the total", type: "ghost" },
      { label: "I ask how many hours of work that is", type: "grinder" },
    ],
  },
  {
    question: "Retirement accounts?",
    options: [
      { label: "I have one and I read the statements", type: "vault" },
      { label: "Later. I'm young.", type: "vibe" },
      { label: "I think I got an email about that once", type: "ghost" },
      { label: "I'd rather put money into my own thing", type: "grinder" },
    ],
  },
];

const TIE_ORDER: PersonalityId[] = ["ghost", "vibe", "grinder", "vault"];

/** Most answers wins. A tie goes to the earlier type in TIE_ORDER. */
export function scorePersonality(answers: PersonalityId[]): {
  winner: PersonalityId;
  counts: Record<PersonalityId, number>;
} {
  const counts: Record<PersonalityId, number> = { vault: 0, vibe: 0, ghost: 0, grinder: 0 };
  for (const answer of answers) counts[answer] += 1;
  const winner = [...TIE_ORDER].sort((a, b) => counts[b] - counts[a])[0];
  return { winner, counts };
}

export function getPersonality(id: string): Personality | undefined {
  return PERSONALITIES.find((item) => item.id === id);
}
