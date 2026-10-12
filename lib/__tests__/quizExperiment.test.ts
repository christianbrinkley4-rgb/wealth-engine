import { describe, expect, it } from "vitest";

import { AEP_QUIZ_QUESTIONS } from "@/lib/aepQuiz";
import {
  assignQuizVariant,
  captureButtonLabel,
  questionsForVariant,
  readQuizVariantCookie,
  resultButtonLabel,
} from "@/lib/quizExperiment";

describe("quiz variant assignment", () => {
  it("keeps an existing cookie and assigns a new one from the coin flip", () => {
    expect(assignQuizVariant("b").variant).toBe("b");
    expect(assignQuizVariant("b").isNew).toBe(false);
    expect(assignQuizVariant(null, () => 0.1)).toEqual({ variant: "a", isNew: true });
    expect(assignQuizVariant(undefined, () => 0.9)).toEqual({ variant: "b", isNew: true });
    expect(readQuizVariantCookie("theme=dark; we-quiz-variant=b; other=1")).toBe("b");
    expect(readQuizVariantCookie("")).toBeNull();
  });

  it("reorders the same questions and drops the plan question when someone is not on Medicare", () => {
    const shorter = questionsForVariant("b", { onMedicare: false });
    expect(shorter.map((question) => question.id)).toEqual([
      "turning65Soon",
      "onMedicare",
      "doctorsChanged",
      "prescriptionsChanged",
    ]);
    expect(questionsForVariant("a", { onMedicare: false }).map((question) => question.id)).toEqual(
      AEP_QUIZ_QUESTIONS.map((question) => question.id),
    );
    expect(questionsForVariant("b", { onMedicare: true })).toHaveLength(5);
  });

  it("changes the button wording without changing the destination", () => {
    expect(captureButtonLabel("a")).toBe("Show my result");
    expect(captureButtonLabel("b")).toBe("Get my free review");
    expect(resultButtonLabel("b", "Book my free review")).toBe("Schedule my free review");
    expect(resultButtonLabel("a", "Find my enrollment dates")).toBe("Find my enrollment dates");
  });
});
