import { describe, expect, it } from "vitest";

import { quizCopy, scoreQuiz, type QuizData } from "./types";

const DATA: QuizData = {
  slug: "test-quiz",
  quizName: "Test quiz",
  intro: "Intro copy.",
  questions: [
    {
      id: "q1",
      text: "Pick one.",
      options: [
        { label: "A", scores: { alpha: 2 } },
        { label: "B", scores: { beta: 2 } },
        { label: "C", scores: { alpha: 1, beta: 1 } },
      ],
    },
    {
      id: "q2",
      text: "Pick another.",
      options: [
        { label: "X", scores: { alpha: 3 } },
        { label: "Y", scores: { beta: 1 } },
      ],
    },
  ],
  results: [
    {
      id: "alpha",
      headline: "Alpha",
      shareLabel: "Alpha",
      lede: "Alpha lede.",
      bullets: ["one"],
      takeToPro: ["ask"],
      closing: "Close.",
    },
    {
      id: "beta",
      headline: "Beta",
      shareLabel: "Beta",
      lede: "Beta lede.",
      bullets: ["two"],
      takeToPro: ["ask"],
      closing: "Close.",
    },
  ],
};

describe("scoreQuiz", () => {
  it("adds scores across questions and picks the winner", () => {
    expect(scoreQuiz(DATA, [0, 0]).id).toBe("alpha"); // 2 + 3
    expect(scoreQuiz(DATA, [1, 1]).id).toBe("beta"); // 2 + 1
  });

  it("resolves ties to the first listed result", () => {
    expect(scoreQuiz(DATA, [2]).id).toBe("alpha"); // alpha 1, beta 1: tie
    expect(scoreQuiz(DATA, [1, 0]).id).toBe("alpha"); // alpha 3, beta 2
  });

  it("treats unknown buckets as ignorable and out-of-range answers as zero", () => {
    expect(scoreQuiz(DATA, [99, -1]).id).toBe("alpha");
    expect(scoreQuiz(DATA, []).id).toBe("alpha");
  });

  it("is deterministic for partial answers", () => {
    expect(scoreQuiz(DATA, [0]).id).toBe("alpha");
  });
});

describe("quizCopy", () => {
  it("collects every user-facing string for audits", () => {
    const copy = quizCopy(DATA);
    expect(copy).toContain("Test quiz");
    expect(copy).toContain("Pick one.");
    expect(copy).toContain("Alpha");
    expect(copy).toContain("Close.");
  });
});
