import { describe, expect, it } from "vitest";

import {
  aepQuizPayload,
  aepQuizResult,
  aepQuizTier,
  AEP_QUIZ_QUESTIONS,
} from "../aepQuiz";

describe("aepQuizTier", () => {
  it("routes turning-65-soon to the turning-65 tier regardless of other answers", () => {
    expect(
      aepQuizTier({ onMedicare: true, happyWithPlan: false, turning65Soon: true }),
    ).toBe("aep_turning65");
    expect(aepQuizTier({ turning65Soon: true })).toBe("aep_turning65");
    expect(
      aepQuizTier({ onMedicare: false, doctorsChanged: true, turning65Soon: true }),
    ).toBe("aep_turning65");
  });

  it("recommends a review when on Medicare and unhappy with the plan", () => {
    expect(aepQuizTier({ onMedicare: true, happyWithPlan: false })).toBe("aep_review");
  });

  it("recommends a review when doctors changed", () => {
    expect(
      aepQuizTier({ onMedicare: true, happyWithPlan: true, doctorsChanged: true }),
    ).toBe("aep_review");
  });

  it("recommends a review when prescriptions changed", () => {
    expect(
      aepQuizTier({ onMedicare: true, happyWithPlan: true, prescriptionsChanged: true }),
    ).toBe("aep_review");
  });

  it("returns the fine tier when on Medicare with no change signals", () => {
    expect(
      aepQuizTier({
        onMedicare: true,
        happyWithPlan: true,
        doctorsChanged: false,
        prescriptionsChanged: false,
      }),
    ).toBe("aep_fine");
  });

  it("returns the fine tier for empty or unanswered quizzes", () => {
    expect(aepQuizTier({})).toBe("aep_fine");
    expect(aepQuizTier({ onMedicare: false })).toBe("aep_fine");
  });

  it("does not recommend a review for change signals when not on Medicare", () => {
    // Someone not on Medicare and not turning 65 (e.g. helping a parent) gets
    // the watch list, not a review push.
    expect(aepQuizTier({ onMedicare: false, doctorsChanged: true })).toBe("aep_fine");
  });
});

describe("aepQuizResult", () => {
  it("returns educational copy for every tier, never a plan recommendation", () => {
    for (const tier of ["aep_review", "aep_turning65", "aep_fine"] as const) {
      const result = aepQuizResult(tier);
      const allText = [result.headline, result.lede, ...result.points, result.note].join(" ");
      expect(allText).not.toMatch(/you (must|should) switch/i);
      expect(allText).not.toMatch(/best plan/i);
      expect(result.ctaHref).toBeTruthy();
      expect(result.ctaLabel).toBeTruthy();
    }
  });

  it("routes the review tier to scheduling and the turning-65 tier to the guide", () => {
    expect(aepQuizResult("aep_review").ctaHref).toContain("/schedule");
    expect(aepQuizResult("aep_turning65").ctaHref).toContain("/turning-65");
  });
});

describe("aepQuizPayload", () => {
  it("includes the tier so capture-lead picks the completer nurture branch", () => {
    const payload = aepQuizPayload({ onMedicare: true, happyWithPlan: false });
    expect(payload.tier).toBe("aep_review");
  });

  it("serializes booleans to yes/no strings and skips unanswered questions", () => {
    const payload = aepQuizPayload({
      onMedicare: true,
      doctorsChanged: false,
    });
    expect(payload.on_medicare).toBe("yes");
    expect(payload.doctors_changed).toBe("no");
    expect(payload.happy_with_plan).toBeUndefined();
    expect(Object.values(payload).every((v) => typeof v === "string")).toBe(true);
  });
});

describe("AEP_QUIZ_QUESTIONS", () => {
  it("has exactly five questions in the specified order", () => {
    expect(AEP_QUIZ_QUESTIONS).toHaveLength(5);
    expect(AEP_QUIZ_QUESTIONS.map((q) => q.id)).toEqual([
      "onMedicare",
      "happyWithPlan",
      "doctorsChanged",
      "prescriptionsChanged",
      "turning65Soon",
    ]);
  });
});
