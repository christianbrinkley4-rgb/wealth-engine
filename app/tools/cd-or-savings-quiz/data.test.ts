import { describe, expect, it } from "vitest";

import { faqJsonLd } from "@/lib/seo";

import { buildShareCardData } from "../_components/share-card-data";
import {
  scoreQuiz,
  quizCopy,
  type QuizData,
} from "../medigap-or-advantage-quiz/quiz-engine/types";
import { DATA, FAQS, META } from "./data";

describe("cd/savings quiz scoring", () => {
  it("access-first answers land in the savings bucket", () => {
    const answers = [0, 0, 0, 1, 0, 1];
    expect(scoreQuiz(DATA, answers).id).toBe("savings");
  });

  it("lock-it-away answers land in the cd bucket", () => {
    const answers = [2, 1, 1, 0, 1, 0];
    expect(scoreQuiz(DATA, answers).id).toBe("cd");
  });

  it("split answers land in the mix bucket", () => {
    const answers = [3, 2, 2, 2, 2, 2];
    expect(scoreQuiz(DATA, answers).id).toBe("mix");
  });

  it("each single question resolves to its highest-scoring bucket", () => {
    for (const question of DATA.questions) {
      question.options.forEach((option, optionIndex) => {
        const single: QuizData = {
          ...DATA,
          questions: [{ ...question, options: [option] }],
        };
        const entries = Object.entries(option.scores).sort((a, b) => b[1] - a[1]);
        const tie = entries.length > 1 && entries[0][1] === entries[1][1];
        expect(
          scoreQuiz(single, [0]).id,
          `${question.id} option ${optionIndex}`,
        ).toBe(tie ? DATA.results[0].id : entries[0][0]);
      });
    }
  });
});

describe("cd/savings quiz metadata", () => {
  it("title fits 60 characters, description fits 160", () => {
    expect(META.title.length).toBeLessThanOrEqual(60);
    expect(META.description.length).toBeLessThanOrEqual(160);
  });

  it("has 6 questions", () => {
    expect(DATA.questions).toHaveLength(6);
  });

  it("emits a valid FAQPage schema with every FAQ", () => {
    const schema = faqJsonLd(FAQS) as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(FAQS.length);
  });
});

describe("cd/savings quiz compliance copy", () => {
  it("contains no em dashes", () => {
    for (const line of [...quizCopy(DATA), META.title, META.description]) {
      expect(line, line).not.toContain("—");
    }
  });

  it("names no banks and gives no advice", () => {
    const copy = quizCopy(DATA).join(" ").toLowerCase();
    for (const bank of ["chase", "wells fargo", "bank of america", "\\bally\\b", "\\bmarcus\\b"]) {
      expect(copy, bank).not.toMatch(new RegExp(bank));
    }
    expect(copy).not.toContain("you should open");
  });

  it("reminds every result this is a starting point, not advice", () => {
    for (const result of DATA.results) {
      expect(result.closing.toLowerCase()).toContain("not advice");
    }
  });

  it("builds a valid share card payload for every result", () => {
    for (const result of DATA.results) {
      expect(result.shareLabel.length).toBeGreaterThan(0);
      expect(result.shareLabel.length).toBeLessThanOrEqual(32);
      expect(() =>
        buildShareCardData({
          headlineNumber: result.shareLabel,
          headlineLabel: DATA.quizName,
          toolName: DATA.quizName,
          toolPath: `/tools/${DATA.slug}`,
        }),
      ).not.toThrow();
    }
  });
});
