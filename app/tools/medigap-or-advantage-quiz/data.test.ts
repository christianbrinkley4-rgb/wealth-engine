import { describe, expect, it } from "vitest";

import { faqJsonLd } from "@/lib/seo";

import { buildShareCardData } from "../_components/share-card-data";
import { scoreQuiz, quizCopy, type QuizData } from "./quiz-engine/types";
import { DATA, FAQS, META } from "./data";

const CARRIERS = [
  "humana",
  "unitedhealthcare",
  "aetna",
  "cigna",
  "blue cross",
  "anthem",
  "wellcare",
  "mutual of omaha",
  "kaiser",
];

/** Option index that leans a given bucket: 0 medigap, 1 advantage, 2 mixed. */
const LEAN_INDEX: Record<string, number> = { medigap: 0, advantage: 1, mixed: 2 };

describe("medigap quiz scoring", () => {
  it("all medigap-leaning answers land in the medigap bucket", () => {
    const answers = DATA.questions.map(() => LEAN_INDEX.medigap);
    expect(scoreQuiz(DATA, answers).id).toBe("medigap");
  });

  it("all advantage-leaning answers land in the advantage bucket", () => {
    const answers = DATA.questions.map(() => LEAN_INDEX.advantage);
    expect(scoreQuiz(DATA, answers).id).toBe("advantage");
  });

  it("all unsure answers land in the mixed bucket", () => {
    const answers = DATA.questions.map(() => LEAN_INDEX.mixed);
    expect(scoreQuiz(DATA, answers).id).toBe("mixed");
  });

  it("each single question resolves to its highest-scoring bucket", () => {
    for (const question of DATA.questions) {
      question.options.forEach((option, optionIndex) => {
        const single: QuizData = {
          ...DATA,
          questions: [{ ...question, options: [option] }],
        };
        const entries = Object.entries(option.scores).sort((a, b) => b[1] - a[1]);
        // A real tie resolves to the first listed result, which is "mixed" by design.
        const tie = entries.length > 1 && entries[0][1] === entries[1][1];
        expect(
          scoreQuiz(single, [0]).id,
          `${question.id} option ${optionIndex}`,
        ).toBe(tie ? "mixed" : entries[0][0]);
      });
    }
  });
});

describe("medigap quiz metadata", () => {
  it("title fits 60 characters, description fits 160", () => {
    expect(META.title.length).toBeLessThanOrEqual(60);
    expect(META.description.length).toBeLessThanOrEqual(160);
  });

  it("has 7 questions", () => {
    expect(DATA.questions).toHaveLength(7);
  });

  it("emits a valid FAQPage schema with every FAQ", () => {
    const schema = faqJsonLd(FAQS) as {
      "@type": string;
      mainEntity: Array<{ name: string }>;
    };
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(FAQS.length);
    for (const entity of schema.mainEntity) {
      expect(entity.name.length).toBeGreaterThan(0);
    }
  });
});

describe("medigap quiz compliance copy", () => {
  const copy = quizCopy(DATA).join(" ").toLowerCase();

  it("contains no em dashes", () => {
    for (const line of quizCopy(DATA)) {
      expect(line, line).not.toContain("—");
    }
  });

  it("names no carriers", () => {
    for (const carrier of CARRIERS) {
      expect(copy, carrier).not.toContain(carrier);
    }
  });

  it("never recommends a plan in result copy", () => {
    const resultCopy = DATA.results
      .flatMap((r) => [r.headline, r.lede, ...r.bullets, r.closing])
      .join(" ")
      .toLowerCase();
    expect(resultCopy).not.toContain("recommend");
    expect(resultCopy).not.toContain("you should pick");
    expect(resultCopy).not.toContain("best plan");
  });

  it("frames every result as questions for an agent", () => {
    for (const result of DATA.results) {
      expect(result.takeToProHeading).toBe("Questions to bring to a licensed agent");
      expect(result.takeToPro.length).toBeGreaterThanOrEqual(3);
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
