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

export const HELP_QUIZ_TOPICS = [
  "medicare",
  "financial_planning",
  "life_insurance",
  "care_coverage",
] as const;

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
    blurb: "Enrollment timing, current coverage, or helping a family member.",
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
        prompt: "What would you most like help understanding?",
        options: [
          { value: "when_to_enroll", label: "When I have to sign up, and by when" },
          { value: "which_coverage", label: "How the coverage choices differ" },
          { value: "cost_surprises", label: "Why my premium is what it is" },
          { value: "all_of_it", label: "I need help with the full picture" },
        ],
      },
    ],
  },
  financial_planning: {
    id: "financial_planning",
    label: "Retirement income",
    shortLabel: "Income",
    blurb: "Social Security, 401(k) options, and how retirement income may affect Medicare.",
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
        prompt: "Which question would you like to start with?",
        options: [
          { value: "social_security", label: "When to start Social Security" },
          { value: "income_order", label: "Which accounts to draw from first" },
          { value: "taxes", label: "Keeping taxes down in retirement" },
          { value: "leaving_money", label: "Leaving money to family cleanly" },
          { value: "annuities", label: "Annuities and retirement income options" },
        ],
      },
    ],
  },
  care_coverage: {
    id: "care_coverage",
    label: "Care and critical illness coverage",
    shortLabel: "Care coverage",
    blurb: "Planning for care needs and the financial impact of a serious illness.",
    questions: [
      {
        id: "care_focus",
        prompt: "What would you like to talk about?",
        options: [
          { value: "long_term", label: "Long-term care insurance" },
          { value: "short_term", label: "Short-term care insurance" },
          { value: "critical_illness", label: "Critical illness insurance" },
          { value: "explore", label: "I’m not sure—help me understand the options" },
        ],
      },
      {
        id: "care_for",
        prompt: "Who are you planning for?",
        options: [
          { value: "myself", label: "Myself" },
          { value: "couple", label: "My spouse and me" },
          { value: "family", label: "A parent or another family member" },
        ],
      },
    ],
  },
  life_insurance: {
    id: "life_insurance",
    label: "Life insurance",
    shortLabel: "Life",
    blurb: "Review personal and employer coverage, beneficiaries, and policy end dates.",
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

/**
 * The first screen of /start. Four cards, matching the four indexed lead
 * pages — not three generic topics. Turning 65 and annual enrollment both
 * land on Medicare, but they skip the "where are you" question because the
 * card already answered it.
 */
export interface QuizSituation {
  id: string;
  topic: HelpQuizTopic;
  label: string;
  blurb: string;
  /** When set, the first branch question is pre-answered and skipped. */
  firstAnswer?: { questionId: string; value: string };
}

export const QUIZ_SITUATIONS: QuizSituation[] = [
  {
    id: "turning_65",
    topic: "medicare",
    label: "Turning 65",
    blurb: "Understand when to enroll and how Medicare fits with your current coverage.",
    firstAnswer: { questionId: "medicare_stage", value: "turning_65_soon" },
  },
  {
    id: "annual_enrollment",
    topic: "medicare",
    label: "Already on Medicare",
    blurb: "Review your costs, prescriptions, and the doctors you want to keep.",
    firstAnswer: { questionId: "medicare_stage", value: "already_on_medicare" },
  },
  {
    id: "retirement",
    topic: "financial_planning",
    label: "Retirement income",
    blurb: "Discuss retirement income questions and how they may affect Medicare costs.",
  },
  {
    id: "life",
    topic: "life_insurance",
    label: "Life insurance",
    blurb: "Check employer coverage, beneficiaries, end dates, and family needs.",
  },
  {
    id: "care",
    topic: "care_coverage",
    label: "Care and critical illness",
    blurb: "Discuss long-term care, short-term care, and critical illness insurance.",
  },
];

export const TOPIC_ORDER: HelpQuizTopic[] = [
  "medicare",
  "financial_planning",
  "life_insurance",
  "care_coverage",
];

export const TOPICS: TopicOption[] = TOPIC_ORDER.map((id) => ({
  id,
  label: TOPIC_META[id].label,
  shortLabel: TOPIC_META[id].shortLabel,
}));

export const TOPIC_LABELS: Record<InterestTopic, string> = {
  medicare: "Medicare",
  financial_planning: "Retirement income",
  life_insurance: "Life insurance",
  care_coverage: "Care and critical illness coverage",
};

export const BRANCH_QUESTIONS: Record<InterestTopic, HelpQuizQuestion[]> = {
  medicare: TOPIC_META.medicare.questions,
  financial_planning: TOPIC_META.financial_planning.questions,
  life_insurance: TOPIC_META.life_insurance.questions,
  care_coverage: TOPIC_META.care_coverage.questions,
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
  { value: "prefer_not", label: "I can not say" },
];

/** topic → 2 questions → value → contact. Shorter when a card already answered question one. */
export const HELP_QUIZ_TOTAL_STEPS = 5;

export type HelpQuizPhase = "topic" | "branch" | "value" | "contact";

export function phaseToStepNumber(
  phase: HelpQuizPhase,
  branchIndex: number,
  skippedFirst = false,
): number {
  const raw = (() => {
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
  })();

  if (skippedFirst && raw > 1) return raw - 1;
  return raw;
}

export function quizTotalSteps(skippedFirst: boolean): number {
  return skippedFirst ? HELP_QUIZ_TOTAL_STEPS - 1 : HELP_QUIZ_TOTAL_STEPS;
}

/** Optional meeting preference on the contact step. */
export const MEET_OPTIONS: HelpQuizOption[] = [
  { value: "kitchen_table", label: "Meet at my home" },
  { value: "coffee_shop", label: "Meet at a convenient public location" },
  { value: "phone", label: "Talk by phone" },
  { value: "video", label: "Meet by video" },
  { value: "email", label: "Start by email" },
];

export const STEP_LABELS: Record<HelpQuizPhase, string> = {
  topic: "What you need",
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
  const note = "This is general information, not individualized tax, legal, or investment advice.";

  if (topic === "medicare") {
    const stage = answers.medicare_stage;

    if (stage === "turning_65_soon") {
      return {
        headline: "Your Medicare timeline spans seven months.",
        lede: "It begins three months before your birthday month. Employer coverage, HSA contributions, a younger spouse, and Medigap timing can all affect the next step.",
        points: [
          "If you delay Part B without qualifying for an exception, a late enrollment penalty may apply. Check how your current coverage works before deciding to wait.",
          "Medigap has a separate six-month open enrollment period that begins when you’re 65 or older and enrolled in Part B. Health questions may affect later applications unless another protection applies.",
          "Enrolling before your birthday month generally lets Part B begin when you turn 65. A birthday on the first of the month shifts the timing earlier. The date tool can help you find your estimated window.",
        ],
        note,
      };
    }

    if (stage === "past_65_still_working") {
      return {
        headline: "Check your work coverage before deciding when to enroll.",
        lede: "Your employer’s size and the type of coverage you have can affect when you should enroll in Part B. Check with your benefits administrator and Medicare before deciding to delay.",
        points: [
          "With 20 or more employees, current employer coverage generally pays first. An eight-month Part B Special Enrollment Period generally follows the end of employment or that coverage, whichever happens first.",
          "With fewer than 20 employees, Medicare generally pays first. Ask your employer how your coverage works before delaying enrollment.",
          "COBRA and retiree coverage follow different rules from coverage through current employment. Check your enrollment timing with Medicare before relying on either to delay Part B.",
        ],
        note,
      };
    }

    if (stage === "already_on_medicare") {
      return {
        headline: "Review coverage changes before you renew.",
        lede: "A yearly review can help you check your doctors, prescriptions, and costs. Your income may affect premiums too: Medicare generally looks at income from two years earlier when calculating income-related charges.",
        points: [
          "If your income fell after a qualifying life change, such as retirement, ask Social Security whether Form SSA-44 could help them review your income-related premium charges.",
          "Medicare’s annual enrollment period runs October 15 through December 7. People already in Medicare Advantage also have a January 1 through March 31 period for certain changes.",
          "Prescription coverage and provider networks can change. Review the details for the coming year even if your health needs have stayed the same.",
        ],
        note,
      };
    }

    // "Helping a spouse or parent" is usually an adult child doing the
    // research, who needs to know what to ask and what they are allowed to
    // do on someone else’s behalf.
    return {
      headline: "Start with how your family member would like you to help.",
      lede: "You can help organize questions and paperwork. If you need to discuss personal records or act on a family member’s behalf, first check what permission or legal authority the agency or plan requires.",
      points: [
        "Medicare, Social Security, and insurers may have different requirements for sharing information. Ask which authorization is needed before calling on someone else’s behalf.",
        "Help them check their Medicare enrollment dates and any current employer coverage. The initial period generally lasts seven months, with a timing adjustment for birthdays on the first of the month.",
        "Ask about the separate Medigap open enrollment period, which begins when someone is 65 or older and enrolled in Part B. The timing and any other protections can affect their options.",
      ],
      note,
    };
  }

  if (topic === "care_coverage") {
    return {
      headline:
        answers.care_focus === "critical_illness"
          ? "Start with the illnesses the policy actually covers."
          : answers.care_focus === "short_term"
            ? "Start with the length and kind of care a policy covers."
            : "Start with the help your family would need.",
      lede: "Care and critical illness policies cover different situations. We can compare their purpose, what triggers a benefit, and what a policy would leave for your family to pay.",
      points: [
        "For care coverage, ask where care can be received, what qualifies for benefits, and how long benefits can last.",
        "For critical illness coverage, ask which diagnoses and definitions qualify. A policy does not cover every illness or expense.",
        "Bring any existing policy to our consultation. We can review waiting periods, exclusions, benefit limits, and premiums together.",
      ],
      note,
    };
  }

  if (topic === "financial_planning") {
    const focus = answers.planning_focus;

    if (focus === "annuities")
      return {
        headline: "Income is only one part of an annuity decision.",
        lede: "We can discuss the insurance options I offer and how a contract could fit your income needs. A financial advisor can help assess how it fits alongside your investments.",
        points: [
          "Ask how and when income can start, what is guaranteed, and which conditions apply.",
          "Review surrender charges, withdrawal limits, rider costs, and access to money for an emergency.",
          "Bring an existing annuity statement if you have one. Understand the consequences before replacing a contract.",
        ],
        note,
      };

    if (focus === "social_security") {
      return {
        headline: "Your Social Security start date affects monthly income.",
        lede: "You can start any time between 62 and 70. Claiming before full retirement age permanently reduces the monthly benefit; waiting past it adds delayed retirement credits of about 8% a year. After 70 there is nothing more to gain by waiting.",
        points: [
          "If you were born in 1960 or later, your full retirement age is 67.",
          "If you’re married, consider how each start date may affect income for a surviving spouse. Social Security can explain the rules for your situation.",
          "Claiming early while still working can trigger the earnings test, which withholds part of the benefit until full retirement age.",
        ],
        note,
      };
    }

    if (focus === "taxes" || focus === "income_order") {
      return {
        headline: "Your income needs can change after you retire.",
        lede: "Before required withdrawals begin, it can be useful to review how you’ll draw from savings. Your account types, birth year, taxes, and Medicare costs all matter. A qualified tax professional or advisor can help with those decisions.",
        points: [
          "Required minimum distributions currently begin at 73, and move to 75 for people born in 1960 or later.",
          "Moving money to Roth during that gap can lower later RMDs — but a conversion at 63 raises the income Medicare looks at when you’re 65, because of the two-year lookback.",
          "A change in marital status can affect taxes and Medicare income thresholds. Review the implications with a qualified tax professional.",
        ],
        note,
      };
    }

    if (focus === "leaving_money") {
      return {
        headline: "Keep your beneficiary information up to date.",
        lede: "Beneficiary records help determine who receives funds from insurance policies and certain accounts. Review them after important family changes, and ask the insurer or account provider how to make updates.",
        points: [
          "After a marriage, divorce, or death, review the people named on each policy and account. Legal rules can affect the outcome, so seek qualified advice when needed.",
          "Inherited IRAs now generally have to be emptied within ten years for most non-spouse heirs, which can create a tax bill the family did not budget for.",
          "Ask your insurer how benefits would be paid and what records your beneficiary would need. Keep the policy information somewhere a trusted family member can find it.",
        ],
        note,
      };
    }

    return {
      headline: "Start with the dates that matter to your retirement.",
      lede: "Your retirement date, Medicare enrollment, Social Security, and required withdrawals may happen at different times. Reviewing them together can help you prepare.",
      points: [
        "62 to 70: the Social Security window, where waiting adds roughly 8% a year after full retirement age.",
        "Required minimum distributions generally begin at 73, or 75 for people born in 1960 or later. The rules also depend on your accounts and circumstances.",
        "Two years before 65: the income Medicare will use to set your first premium is already being recorded.",
      ],
      note,
    };
  }

  const cover = answers.life_cover;

  if (cover === "review_existing") {
    return {
      headline: "Let’s review the coverage you already have.",
      lede: "A policy review can help you understand your coverage amount, premiums, beneficiaries, and how long the coverage lasts. Bring your current policy and any questions you have.",
      points: [
        "Check who is named to receive the policy benefit and whether the information reflects your current wishes. Your insurer can explain how to make changes.",
        "Employer life insurance may change or end when you retire. Ask what continues, what it costs, and whether any deadlines apply.",
        "Check when any level-premium period ends and what renewal would cost. The policy or insurer can explain your options.",
      ],
      note,
    };
  }

  if (cover === "final_expenses") {
    return {
      headline: "Understand what final expense coverage would provide.",
      lede: "Final expense coverage is whole life in a modest amount, meant to keep funeral and medical costs off your family rather than to replace income. Price is driven by age and health at the time you apply.",
      points: [
        "Cost and eligibility depend on the policy, your age, health, and other factors. We can discuss the options available to you.",
        "Some policies have a waiting period before the full benefit is payable. That detail is worth reading before anything is signed.",
        "Keep your beneficiary information current, and let someone you trust know where to find the policy and how to contact the insurer.",
      ],
      note,
    };
  }

  return {
    headline: "Think about what your family would need help paying for.",
    lede: "The length of coverage is one part of the choice. Your budget, current policies, savings, and family needs matter too. We can review those together.",
    points: [
      "Term insurance can provide coverage for a set period, such as while a mortgage is being paid. Review the end date and any renewal options.",
      "Permanent life insurance is designed for longer-term coverage when policy requirements are met. Review its costs and how it would fit your needs over time.",
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
  const meet = answers.meet_preference;
  if (meet) {
    const label = MEET_OPTIONS.find((o) => o.value === meet)?.label ?? meet;
    out.push({ question: "How they’d like to talk", answer: label });
  }
  const income = answers.income_range;
  if (answers.best_time)
    out.push({ question: "Preferred time to connect", answer: answers.best_time });
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
