/**
 * Help-quiz question tree, value screen, and shared types for /start.
 *
 * Two design rules, both learned the hard way:
 *
 * 1. The value screen has to be worth the answers. It runs BEFORE the contact
 *    step and its job is to hand back something specific — a real deadline, a
 *    rule that catches people out — not a paraphrase of what they just told us.
 *    Everything in it is a structural rule (enrollment windows, penalty
 *    formulas, lookback periods), never a dollar figure that goes stale.
 *
 * 2. Money questions come last and stay optional. Nobody owes a stranger their
 *    income bracket to ask a question.
 */

export const HELP_QUIZ_TOPICS = ["medicare", "financial_planning", "life_insurance"] as const;

export type HelpQuizTopic = (typeof HELP_QUIZ_TOPICS)[number];

/** Alias used by lead scoring / capture payload. */
export type InterestTopic = HelpQuizTopic;

export type HelpQuizAnswerMap = Record<string, string>;
export type QuizAnswers = HelpQuizAnswerMap;

export interface HelpQuizOption {
  value: string;
  label: string;
}

export interface HelpQuizQuestion {
  id: string;
  prompt: string;
  help?: string;
  options: HelpQuizOption[];
}

export interface HelpQuizTopicMeta {
  id: HelpQuizTopic;
  label: string;
  shortLabel: string;
  blurb: string;
  questions: HelpQuizQuestion[];
}

export interface HelpQuizValueBeat {
  /** The single most useful thing we can tell this person for free. */
  headline: string;
  lede: string;
  points: string[];
  note: string;
}

export interface TopicOption {
  id: InterestTopic;
  label: string;
  shortLabel: string;
}

export const TOPIC_META: Record<HelpQuizTopic, HelpQuizTopicMeta> = {
  medicare: {
    id: "medicare",
    label: "Medicare",
    shortLabel: "Medicare",
    blurb: "Turning 65, already enrolled, or helping someone else.",
    questions: [
      {
        id: "medicare_stage",
        prompt: "Where are you in the process?",
        options: [
          { value: "turning_65_soon", label: "Turning 65 in the next year" },
          { value: "past_65_still_working", label: "Past 65 and still working" },
          { value: "already_on_medicare", label: "Already on Medicare" },
          { value: "helping_spouse_or_parent", label: "Helping a spouse or parent" },
        ],
      },
      {
        id: "medicare_question",
        prompt: "What’s the part you’d most like sorted out?",
        options: [
          { value: "when_to_enroll", label: "When I have to sign up, and by when" },
          { value: "which_coverage", label: "How the coverage choices differ" },
          { value: "cost_surprises", label: "Why my premium is what it is" },
          { value: "all_of_it", label: "Honestly, all of it" },
        ],
      },
    ],
  },
  financial_planning: {
    id: "financial_planning",
    label: "Retirement income",
    shortLabel: "Income",
    blurb: "Social Security timing, withdrawals, and taxes in retirement.",
    questions: [
      {
        id: "planning_stage",
        prompt: "Where are you right now?",
        options: [
          { value: "still_working", label: "Still working full time" },
          { value: "retiring_soon", label: "Retiring within a couple of years" },
          { value: "recently_retired", label: "Recently retired" },
          { value: "long_retired", label: "Retired for a while now" },
        ],
      },
      {
        id: "planning_focus",
        prompt: "What do you want to sort out first?",
        options: [
          { value: "social_security", label: "When to start Social Security" },
          { value: "income_order", label: "Which accounts to draw from first" },
          { value: "taxes", label: "Keeping taxes down in retirement" },
          { value: "leaving_money", label: "Leaving money to family cleanly" },
        ],
      },
    ],
  },
  life_insurance: {
    id: "life_insurance",
    label: "Life insurance",
    shortLabel: "Life",
    blurb: "Coverage that ends at retirement, final expenses, or a legacy.",
    questions: [
      {
        id: "life_cover",
        prompt: "What are you trying to take care of?",
        options: [
          { value: "replace_income", label: "Income my family would lose" },
          { value: "final_expenses", label: "Funeral and final expenses" },
          { value: "legacy", label: "Leaving something behind" },
          { value: "review_existing", label: "Reviewing a policy I already have" },
        ],
      },
      {
        id: "life_who",
        prompt: "Who would this cover?",
        options: [
          { value: "myself", label: "Me" },
          { value: "spouse", label: "My spouse" },
          { value: "both", label: "Both of us" },
          { value: "someone_else", label: "Someone else I’m helping" },
        ],
      },
    ],
  },
};

export const TOPIC_ORDER: HelpQuizTopic[] = ["medicare", "financial_planning", "life_insurance"];

export const TOPICS: TopicOption[] = TOPIC_ORDER.map((id) => ({
  id,
  label: TOPIC_META[id].label,
  shortLabel: TOPIC_META[id].shortLabel,
}));

export const TOPIC_LABELS: Record<InterestTopic, string> = {
  medicare: "Medicare",
  financial_planning: "Retirement income",
  life_insurance: "Life insurance",
};

export const BRANCH_QUESTIONS: Record<InterestTopic, HelpQuizQuestion[]> = {
  medicare: TOPIC_META.medicare.questions,
  financial_planning: TOPIC_META.financial_planning.questions,
  life_insurance: TOPIC_META.life_insurance.questions,
};

/**
 * The free-text box on the contact step.
 *
 * It exists because landing pages make specific promises — "tell me who you
 * see", "have me look at my premium" — and a fixed multiple-choice quiz can’t
 * keep them. The prompt changes to match wherever they came from, so the
 * button and the question finally agree with each other.
 */
export type AskContext = "doctors" | "premium" | "parent" | "general";

export function isAskContext(value: string | null | undefined): value is AskContext {
  return value === "doctors" || value === "premium" || value === "parent";
}

export const ASK_PROMPTS: Record<AskContext, { label: string; placeholder: string }> = {
  doctors: {
    label: "Which doctors do you want to keep?",
    placeholder: "Dr. Patel at my primary care practice, and my cardiologist downtown",
  },
  premium: {
    label: "What changed with your premium?",
    placeholder: "I retired in March and the amount jumped in January",
  },
  parent: {
    label: "What’s going on with them?",
    placeholder: "Mom turns 65 in April and still works part time",
  },
  general: {
    label: "Anything specific you’d like me to look at?",
    placeholder:
      "Doctors you want to keep, a letter that didn’t make sense, a premium that changed",
  },
};

/** Asked last, on the contact step, and always skippable. */
export const INCOME_OPTIONS: HelpQuizOption[] = [
  { value: "under_80k", label: "Under $80,000" },
  { value: "80k_120k", label: "$80,000 – $120,000" },
  { value: "120k_200k", label: "$120,000 – $200,000" },
  { value: "over_200k", label: "Over $200,000" },
  { value: "prefer_not", label: "I’d rather not say" },
];

/** topic → 2 questions → value → contact */
export const HELP_QUIZ_TOTAL_STEPS = 5;

export type HelpQuizPhase = "topic" | "branch" | "value" | "contact";

export function phaseToStepNumber(phase: HelpQuizPhase, branchIndex: number): number {
  switch (phase) {
    case "topic":
      return 1;
    case "branch":
      return 2 + Math.min(Math.max(branchIndex, 0), 1);
    case "value":
      return 4;
    case "contact":
      return 5;
    default:
      return 1;
  }
}

export const STEP_LABELS: Record<HelpQuizPhase, string> = {
  topic: "Pick a topic",
  branch: "Your situation",
  value: "What this means",
  contact: "Where to reach you",
};

/**
 * The free answer. Everything below is a structural rule that holds year to
 * year — enrollment windows, penalty formulas, lookback periods — so nothing
 * here goes stale between ad campaigns. Dollar thresholds deliberately live in
 * the calculators, where they can be updated in one place.
 */
export function getValueBeat(topic: HelpQuizTopic, answers: HelpQuizAnswerMap): HelpQuizValueBeat {
  const note =
    "This is general information, not advice about your specific situation. That’s what the call is for.";

  if (topic === "medicare") {
    const stage = answers.medicare_stage;

    if (stage === "turning_65_soon") {
      return {
        headline: "Your sign-up window is seven months long, and it’s already running.",
        lede: "It opens three months before the month you turn 65, includes your birthday month, and closes three months after. Miss it without qualifying coverage elsewhere and the Part B penalty is permanent.",
        points: [
          "The Part B late penalty is 10% for every full 12 months you could have had it and didn’t — and you pay it for as long as you have Part B.",
          "There’s a separate six-month window for Medigap that starts the month you’re 65 and enrolled in Part B. Inside it you can’t be turned down or charged more for your health history. Outside it, in most states, you can.",
          "Signing up early in the window means coverage starts the month you turn 65. Signing up late in it can push your start date back.",
        ],
        note,
      };
    }

    if (stage === "past_65_still_working") {
      return {
        headline: "Whether you can delay Part B depends on how many people your employer employs.",
        lede: "This is the detail that catches working people out. Group coverage at a large employer generally lets you delay Part B penalty-free. At a small employer, Medicare usually becomes your primary payer whether or not you’ve enrolled.",
        points: [
          "Twenty or more employees: your group plan generally stays primary, and you get a Special Enrollment Period of eight months after the job or the coverage ends.",
          "Fewer than twenty employees: Medicare usually pays first, and staying off Part B can leave you with claims nobody covers.",
          "COBRA and retiree coverage are not the same thing as active employer coverage for this rule — that mix-up is where the penalties usually come from.",
        ],
        note,
      };
    }

    if (stage === "already_on_medicare") {
      return {
        headline: "Your premium is based on a tax return from two years ago.",
        lede: "Medicare looks back two years to decide whether you pay the standard Part B premium or an income-related amount on top of it. So a one-time event — selling a house, a large withdrawal, a Roth conversion — shows up on your premium two years later.",
        points: [
          "If your income dropped because of a life-changing event — retiring, losing a job, marriage, divorce, a spouse’s death — you can ask Social Security to use current income instead, on Form SSA-44. Many people never find out this exists.",
          "Coverage can be changed each year between October 15 and December 7. If you’re on Medicare Advantage there’s a second window, January 1 to March 31.",
          "Drug coverage is worth re-checking annually even if nothing about your health changed — the plans change around you.",
        ],
        note,
      };
    }

    // "Helping a spouse or parent" is usually an adult child doing the
    // research, who needs to know what to ask and what they are allowed to
    // do on someone else’s behalf.
    return {
      headline: "You can do the research, but you can’t sign for them.",
      lede: "The hardest part of helping a parent through this is usually not the plans — it’s that Medicare and Social Security won’t discuss their account with you unless they’ve authorized it. Sorting that out first saves weeks.",
      points: [
        "Social Security needs written authorization before they’ll talk to you about someone else’s record. Getting that in place early is the difference between one phone call and five.",
        "The deadline you’re working to: their sign-up window runs seven months — the three months before the month they turn 65, that month, and the three after. Missing it means a Part B penalty of 10% for every full 12 months they could have had it, for as long as they have it.",
        "The one that gets missed: a separate six-month window for supplemental coverage opens when they’re 65 and enrolled in Part B. Inside it their health history can’t be used against them. Outside it, in most states, it can — which matters most for exactly the parents whose health is already a worry.",
      ],
      note,
    };
  }

  if (topic === "financial_planning") {
    const focus = answers.planning_focus;

    if (focus === "social_security") {
      return {
        headline: "Waiting is worth roughly 8% a year — but only up to 70.",
        lede: "You can start any time between 62 and 70. Claiming before full retirement age permanently reduces the monthly benefit; waiting past it adds delayed retirement credits of about 8% a year. After 70 there is nothing more to gain by waiting.",
        points: [
          "For anyone born in 1960 or later, full retirement age is 67 — not 65, which is the number most people still have in their head.",
          "For a married couple the bigger question is usually the higher earner’s start date, because that benefit is what the survivor keeps.",
          "Claiming early while still working can trigger the earnings test, which withholds part of the benefit until full retirement age.",
        ],
        note,
      };
    }

    if (focus === "taxes" || focus === "income_order") {
      return {
        headline:
          "The years between retiring and 73 are usually the cheapest tax years you’ll ever have.",
        lede: "Once required minimum distributions start at 73, your taxable income is set by a formula instead of by you. The gap between your last paycheck and that first RMD is the window where the order you draw from accounts actually changes the total tax bill.",
        points: [
          "Required minimum distributions currently begin at 73, and move to 75 for people born in 1960 or later.",
          "Moving money to Roth during that gap can lower later RMDs — but a conversion at 63 raises the income Medicare looks at when you’re 65, because of the two-year lookback.",
          "When one spouse dies the survivor files as single, often on similar income. That bracket change surprises people more than any other single thing in retirement.",
        ],
        note,
      };
    }

    return {
      headline: "Three dates set the shape of almost every retirement income plan.",
      lede: "Before the details, the calendar. Most of the decisions people agonize over are really about which of these three doors to walk through first.",
      points: [
        "62 to 70: the Social Security window, where waiting adds roughly 8% a year after full retirement age.",
        "73: required minimum distributions begin (75 if you were born in 1960 or later), and your taxable income stops being your choice.",
        "Two years before 65: the income Medicare will use to set your first premium is already being recorded.",
      ],
      note,
    };
  }

  const cover = answers.life_cover;

  if (cover === "review_existing") {
    return {
      headline: "Start with what the policy actually is, and who it currently pays.",
      lede: "Most reviews turn up one of two things: coverage that quietly ends sooner than expected, or a beneficiary who hasn’t been right for years.",
      points: [
        "The beneficiary form on the policy controls who gets the money. It overrides what your will says — an ex-spouse listed there still gets paid.",
        "Coverage through an employer usually ends when the job does, and is rarely portable at a price worth paying. It’s the most common gap I see at retirement.",
        "Term coverage is level for a set number of years and then gets expensive fast. Knowing your exact end date is the whole ballgame.",
      ],
      note,
    };
  }

  if (cover === "final_expenses") {
    return {
      headline: "This is a small policy, and the honest questions are about health and timing.",
      lede: "Final expense coverage is whole life in a modest amount, meant to keep funeral and medical costs off your family rather than to replace income. Price is driven by age and health at the time you apply.",
      points: [
        "Rates go up with every year you wait, and a change in health can take options off the table entirely. Timing matters more here than in most insurance.",
        "Some policies have a waiting period before the full benefit is payable. That detail is worth reading before anything is signed.",
        "The beneficiary designation is what gets money to your family quickly — faster than anything that has to go through an estate.",
      ],
      note,
    };
  }

  return {
    headline: "The real question is how many more years the money is needed for.",
    lede: "Whether coverage should be temporary or permanent comes down to how long the need lasts — not to which product someone wants to sell you. That’s a question you can answer yourself before you talk to anyone.",
    points: [
      "If the need ends — a mortgage paid off, a spouse reaching their own pension or Social Security — term coverage for exactly that long is usually the honest answer.",
      "If the need doesn’t end, permanent coverage exists for that, and it costs meaningfully more. Both are legitimate; the mismatch is what costs people money.",
      "Group coverage through work generally ends at retirement, so it’s worth knowing now what remains after your last day.",
    ],
    note,
  };
}

export function isHelpQuizTopic(value: string | null | undefined): value is HelpQuizTopic {
  return HELP_QUIZ_TOPICS.includes(value as HelpQuizTopic);
}

export function isInterestTopic(value: string | null | undefined): value is InterestTopic {
  return isHelpQuizTopic(value);
}

/** Human-readable answers for the notification email. */
export function describeAnswers(
  topic: HelpQuizTopic,
  answers: HelpQuizAnswerMap,
): Array<{ question: string; answer: string }> {
  const out: Array<{ question: string; answer: string }> = [];
  for (const question of TOPIC_META[topic].questions) {
    const value = answers[question.id];
    if (!value) continue;
    const label = question.options.find((o) => o.value === value)?.label ?? value;
    out.push({ question: question.prompt, answer: label });
  }
  const income = answers.income_range;
  if (income) {
    const label = INCOME_OPTIONS.find((o) => o.value === income)?.label ?? income;
    out.push({ question: "Household income", answer: label });
  }
  // Free text last, because it is usually the most useful thing on the page.
  const note = answers.note;
  if (note) {
    out.push({ question: "In their own words", answer: note });
  }
  return out;
}
