import { describe, expect, it } from "vitest";

import { faqJsonLd } from "@/lib/seo";

import { buildShareCardData } from "../_components/share-card-data";
import {
  scoreQuiz,
  quizCopy,
  type QuizData,
} from "../medigap-or-advantage-quiz/quiz-engine/types";
import { DATA, FAQS, META } from "./data";

/** Resolve one question answered alone to its top bucket (ties -> taxpro). */
function singleBucket(question: QuizData["questions"][number], optionIndex: number): string {
  const single: QuizData = {
    ...DATA,
    questions: [{ ...question, options: [question.options[optionIndex]] }],
  };
  return scoreQuiz(single, [0]).id;
}

describe("roth conversion quiz scoring", () => {
  it("conversion-friendly answers land in the explore bucket", () => {
    // Lower bracket now, cash to pay tax, 15+ years, dip year, RMDs near, heirs yes.
    const answers = [0, 0, 0, 0, 0, 0];
    expect(scoreQuiz(DATA, answers).id).toBe("explore");
  });

  it("conversion-hostile answers land in the not-worth bucket", () => {
    // Higher bracket now, no cash, under 5 years, high-income year, RMDs far, spend it myself.
    const answers = [1, 1, 2, 1, 1, 1];
    expect(scoreQuiz(DATA, answers).id).toBe("notworth");
  });

  it("all unsure answers land in the tax-pro bucket", () => {
    const answers = [3, 2, 1, 2, 2, 2];
    expect(scoreQuiz(DATA, answers).id).toBe("taxpro");
  });

  it("each single question resolves to its highest-scoring bucket", () => {
    for (const question of DATA.questions) {
      question.options.forEach((option, optionIndex) => {
        const entries = Object.entries(option.scores).sort((a, b) => b[1] - a[1]);
        const tie = entries.length > 1 && entries[0][1] === entries[1][1];
        expect(singleBucket(question, optionIndex), `${question.id} option ${optionIndex}`).toBe(
          tie ? "taxpro" : entries[0][0],
        );
      });
    }
  });
});

describe("roth conversion quiz metadata", () => {
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

describe("roth conversion quiz compliance copy", () => {
  it("contains no em dashes", () => {
    for (const line of quizCopy(DATA)) {
      expect(line, line).not.toContain("—");
    }
    expect(META.title).not.toContain("—");
    expect(META.description).not.toContain("—");
  });

  it("never gives personalized advice in result copy", () => {
    const resultCopy = DATA.results
      .flatMap((r) => [r.headline, r.lede, ...r.bullets, r.closing])
      .join(" ")
      .toLowerCase();
    expect(resultCopy).not.toContain("you should convert");
    expect(resultCopy).not.toContain("do the conversion");
  });

  it("ends every result with a tax pro", () => {
    for (const result of DATA.results) {
      expect(result.takeToProHeading).toBe("Bring this to a tax professional");
      expect(result.closing.toLowerCase()).toContain("tax pro");
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
