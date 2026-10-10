/**
 * "Do I Need to Act During AEP?" quiz logic.
 *
 * Five plain-language questions, about 60 seconds. Educational only: the quiz
 * never recommends a plan, never names a carrier, never promises savings.
 * Every result tier ends at the same place: a free review conversation.
 *
 * The result tiers ("aep_review" / "aep_turning65" / "aep_fine") are stored
 * as the `tier` key in quiz_answers when the lead is captured, which is how
 * /api/capture-lead picks the completer nurture branch for source
 * "quiz-2026".
 */

export type AepQuizTier = "aep_review" | "aep_turning65" | "aep_fine";

export interface AepQuizAnswers {
  /** Already on Medicare? */
  onMedicare?: boolean;
  /** Happy with the current plan? Only meaningful when onMedicare is true. */
  happyWithPlan?: boolean;
  /** Have your doctors changed? */
  doctorsChanged?: boolean;
  /** Have your prescriptions changed? */
  prescriptionsChanged?: boolean;
  /** Turning 65 soon? */
  turning65Soon?: boolean;
}

export interface AepQuizQuestion {
  id: keyof AepQuizAnswers;
  text: string;
  help?: string;
}

export const AEP_QUIZ_QUESTIONS: AepQuizQuestion[] = [
  {
    id: "onMedicare",
    text: "Are you already on Medicare?",
    help: "This includes Original Medicare, a Medicare Advantage plan, or a supplement.",
  },
  {
    id: "happyWithPlan",
    text: "Are you happy with your current plan?",
    help: "Think about your costs, your doctors, and how the plan has treated you this year.",
  },
  {
    id: "doctorsChanged",
    text: "Have your doctors changed, or are you worried any might leave your plan's network?",
  },
  {
    id: "prescriptionsChanged",
    text: "Have your prescriptions changed, or have any of your drug costs gone up?",
  },
  {
    id: "turning65Soon",
    text: "Are you turning 65 in the next year?",
    help: "If so, you may have your own enrollment window separate from the fall one.",
  },
];

/**
 * Determines the result tier from the answers.
 *
 * Turning 65 soon always routes to the turning-65 path, because that person
 * has a different enrollment window than the fall Annual Enrollment Period.
 * On Medicare plus any change signal (unhappy, doctors changed, prescriptions
 * changed) means a review is worth their time. Everyone else gets the
 * "probably fine, here is what to watch" outcome.
 */
export function aepQuizTier(answers: AepQuizAnswers): AepQuizTier {
  if (answers.turning65Soon === true) return "aep_turning65";
  if (answers.onMedicare === true) {
    if (
      answers.happyWithPlan === false ||
      answers.doctorsChanged === true ||
      answers.prescriptionsChanged === true
    ) {
      return "aep_review";
    }
  }
  return "aep_fine";
}

export interface AepQuizResult {
  tier: AepQuizTier;
  headline: string;
  lede: string;
  points: string[];
  note: string;
  /** Primary call to action. */
  ctaHref: string;
  ctaLabel: string;
}

const RESULTS: Record<AepQuizTier, AepQuizResult> = {
  aep_review: {
    tier: "aep_review",
    headline: "Yes, a free review is worth your time.",
    lede: "Something changed since you picked your plan: your costs, your doctors, or your prescriptions. Plans change too, every single year. A 30-minute review costs nothing and tells you whether your coverage still fits for 2027.",
    points: [
      "Your plan's costs, drug list, and doctor network can all change on January 1.",
      "Your Annual Notice of Change letter (mailed in September) spells out exactly what is different.",
      "If your plan still fits, I will tell you so. Plenty of people I meet with keep what they have.",
    ],
    note: "Annual Enrollment runs October 15 through December 7. After December 7, your options to change coverage are limited.",
    ctaHref: "/schedule?topic=medicare",
    ctaLabel: "Book my free review",
  },
  aep_turning65: {
    tier: "aep_turning65",
    headline: "You may have your own enrollment window.",
    lede: "Turning 65 comes with a 7-month Initial Enrollment Period built around your birthday month, separate from the fall Annual Enrollment window. The dates matter, and missing them can mean lifetime penalties.",
    points: [
      "Your window runs 3 months before, the month of, and 3 months after you turn 65.",
      "The exact dates depend on your birthday, including whether you were born on the 1st.",
      "If you are still working with employer coverage, different rules may let you wait.",
    ],
    note: "Start with the turning-65 guide to find your exact dates, then we can talk through your situation.",
    ctaHref: "/turning-65",
    ctaLabel: "Find my enrollment dates",
  },
  aep_fine: {
    tier: "aep_fine",
    headline: "Probably fine, but here is what to watch.",
    lede: "Nothing in your answers raises a flag, which is good. Medicare plans still change every year, so it is worth a quick check of the September letter your plan mailed you before December 7.",
    points: [
      "Skim your Annual Notice of Change for premium, drug cost, and network changes.",
      "If nothing meaningful changed and you are happy, staying put is a fine decision.",
      "If anything looks different or confusing, a free review takes 30 minutes.",
    ],
    note: "You are never required to change plans. The fall window is simply your yearly chance to check.",
    ctaHref: "/aep",
    ctaLabel: "Learn about the fall window",
  },
};

export function aepQuizResult(tier: AepQuizTier): AepQuizResult {
  return RESULTS[tier];
}

/**
 * Serializes answers into the string-only quiz_answers shape the
 * /api/capture-lead endpoint accepts, including the tier so the server picks
 * the completer nurture branch.
 */
export function aepQuizPayload(answers: AepQuizAnswers): Record<string, string> {
  const tier = aepQuizTier(answers);
  const payload: Record<string, string> = { tier };
  const labels: Record<keyof AepQuizAnswers, string> = {
    onMedicare: "on_medicare",
    happyWithPlan: "happy_with_plan",
    doctorsChanged: "doctors_changed",
    prescriptionsChanged: "prescriptions_changed",
    turning65Soon: "turning_65_soon",
  };
  for (const [key, label] of Object.entries(labels) as Array<
    [keyof AepQuizAnswers, string]
  >) {
    const value = answers[key];
    if (value === true) payload[label] = "yes";
    else if (value === false) payload[label] = "no";
  }
  return payload;
}
