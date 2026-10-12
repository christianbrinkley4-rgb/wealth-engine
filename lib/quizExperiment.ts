/**
 * Cookie-based A/B assignment for the AEP quiz.
 *
 * Variant A is the current quiz. Variant B reorders the same questions,
 * skips the "happy with your plan" step when the person is not on Medicare,
 * and uses different button wording. Scoring still keys off answer ids, so
 * the result tiers do not change.
 */

import { AEP_QUIZ_QUESTIONS, type AepQuizAnswers, type AepQuizQuestion } from "@/lib/aepQuiz";

export type QuizVariant = "a" | "b";

export const QUIZ_VARIANT_COOKIE = "we-quiz-variant";

const VARIANT_B_ORDER: Array<keyof AepQuizAnswers> = [
  "turning65Soon",
  "onMedicare",
  "doctorsChanged",
  "prescriptionsChanged",
  "happyWithPlan",
];

export function parseQuizVariant(cookieValue: string | null | undefined): QuizVariant | null {
  if (cookieValue === "a" || cookieValue === "b") return cookieValue;
  return null;
}

export function assignQuizVariant(
  existing: string | null | undefined,
  random: () => number = Math.random,
): { variant: QuizVariant; isNew: boolean } {
  const parsed = parseQuizVariant(existing);
  if (parsed) return { variant: parsed, isNew: false };
  const variant: QuizVariant = random() < 0.5 ? "a" : "b";
  return { variant, isNew: true };
}

/** Cookie string. Thirty days, first-party, not readable by scripts on other sites. */
export function quizVariantCookie(variant: QuizVariant): string {
  return `${QUIZ_VARIANT_COOKIE}=${variant}; Path=/; Max-Age=2592000; SameSite=Lax`;
}

export function readQuizVariantCookie(cookieHeader: string): QuizVariant | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${QUIZ_VARIANT_COOKIE}=([ab])(?:;|$)`));
  return parseQuizVariant(match?.[1]);
}

export function questionsForVariant(
  variant: QuizVariant,
  answers: AepQuizAnswers,
  questions: readonly AepQuizQuestion[] = AEP_QUIZ_QUESTIONS,
): AepQuizQuestion[] {
  const order =
    variant === "b" ? VARIANT_B_ORDER : questions.map((question) => question.id);
  return order
    .map((id) => questions.find((question) => question.id === id))
    .filter((question): question is AepQuizQuestion => {
      if (!question) return false;
      if (variant === "b" && question.id === "happyWithPlan" && answers.onMedicare === false) {
        return false;
      }
      return true;
    });
}

export function captureButtonLabel(variant: QuizVariant): string {
  return variant === "b" ? "Get my free review" : "Show my result";
}

export function resultButtonLabel(variant: QuizVariant, fallback: string): string {
  if (variant === "b" && fallback === "Book my free review") return "Schedule my free review";
  return fallback;
}
