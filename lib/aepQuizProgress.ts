import { AEP_QUIZ_QUESTIONS, type AepQuizAnswers } from "./aepQuiz";
import { questionsForVariant, type QuizVariant } from "./quizExperiment";

export const AEP_PROGRESS_KEY = "aep-quiz-progress-v1";
export const AEP_PROGRESS_MAX_AGE = 24 * 60 * 60 * 1000;
export type AepProgress = {
  variant: QuizVariant;
  answers: AepQuizAnswers;
  index: number;
  phase: "questions" | "capture";
};

// Contact details, permission checkboxes, and verification tokens are never persisted.
export function readAepProgress(raw: string | null, now = Date.now()): AepProgress | null {
  try {
    const value = JSON.parse(raw ?? "null");
    if (
      !value ||
      value.version !== 1 ||
      !Number.isFinite(value.savedAt) ||
      now - value.savedAt > AEP_PROGRESS_MAX_AGE ||
      value.savedAt > now ||
      !["a", "b"].includes(value.variant) ||
      !["questions", "capture"].includes(value.phase) ||
      !Number.isInteger(value.index) ||
      value.index < 0 ||
      !value.answers ||
      typeof value.answers !== "object" ||
      Array.isArray(value.answers)
    )
      return null;
    const answers: AepQuizAnswers = {};
    for (const { id } of AEP_QUIZ_QUESTIONS) {
      if (typeof value.answers[id] === "boolean") answers[id] = value.answers[id];
    }
    const questions = questionsForVariant(value.variant, answers);
    if (value.index >= questions.length) return null;
    const required = value.phase === "capture" ? questions : questions.slice(0, value.index);
    if (required.some(({ id }) => typeof answers[id] !== "boolean")) return null;
    return { variant: value.variant, answers, index: value.index, phase: value.phase };
  } catch {
    return null;
  }
}

export function saveAepProgress(progress: AepProgress): string {
  return JSON.stringify({ ...progress, version: 1, savedAt: Date.now() });
}
