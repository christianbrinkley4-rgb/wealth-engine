import { describe, expect, it } from "vitest";

import { calculatePartBPremium, STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { scoreLead } from "@/lib/leadScoring";
import {
  describeAnswers,
  getValueBeat,
  HELP_QUIZ_TOPICS,
  isHelpQuizTopic,
  TOPIC_META,
} from "@/lib/helpQuiz";
import { thankYouUrl } from "@/lib/thankYouUrl";

/**
 * These cover the parts where a mistake is expensive and invisible: the value
 * screen the prospect is shown, the premium figure quoted back to them, and
 * the promise that no personal data rides in a URL.
 */

describe("thankYouUrl", () => {
  it("never puts an email address in the query string", () => {
    const url = thankYouUrl({ source: "help_quiz", topic: "medicare", eventId: "abc123" });
    expect(url).not.toContain("@");
    expect(url).not.toContain("email");
    expect(url).toContain("source=help_quiz");
    expect(url).toContain("topic=medicare");
    expect(url).toContain("eid=abc123");
  });

  it("omits optional params when absent", () => {
    expect(thankYouUrl({ source: "wizard_completion" })).toBe(
      "/thank-you?source=wizard_completion",
    );
  });
});

describe("getValueBeat", () => {
  it("returns substantive content for every topic, answered or not", () => {
    for (const topic of HELP_QUIZ_TOPICS) {
      const beat = getValueBeat(topic, {});
      expect(beat.headline.length).toBeGreaterThan(20);
      expect(beat.lede.length).toBeGreaterThan(60);
      expect(beat.points.length).toBeGreaterThanOrEqual(3);
      for (const point of beat.points) {
        expect(point.length).toBeGreaterThan(40);
      }
    }
  });

  it("branches on the answer rather than restating it", () => {
    const turning65 = getValueBeat("medicare", { medicare_stage: "turning_65_soon" });
    const working = getValueBeat("medicare", { medicare_stage: "past_65_still_working" });
    const enrolled = getValueBeat("medicare", { medicare_stage: "already_on_medicare" });

    expect(turning65.headline).not.toBe(working.headline);
    expect(working.headline).not.toBe(enrolled.headline);

    // Each branch should carry the fact that matters for that situation.
    expect(turning65.lede).toMatch(/three months/i);
    expect(working.lede).toMatch(/employ/i);
    expect(enrolled.lede).toMatch(/two years/i);
  });

  it("covers every option of every branch question without falling back to one answer", () => {
    for (const topic of HELP_QUIZ_TOPICS) {
      const headlines = new Set<string>();
      for (const question of TOPIC_META[topic].questions) {
        for (const option of question.options) {
          const beat = getValueBeat(topic, { [question.id]: option.value });
          expect(beat.headline).toBeTruthy();
          headlines.add(beat.headline);
        }
      }
      // At least two distinct outcomes per topic, or the questions are theatre.
      expect(headlines.size).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("describeAnswers", () => {
  it("renders labels rather than raw option values for the alert email", () => {
    const described = describeAnswers("medicare", {
      medicare_stage: "turning_65_soon",
      medicare_question: "when_to_enroll",
      income_range: "120k_200k",
    });

    expect(described).toHaveLength(3);
    expect(described[0].answer).toBe("Turning 65 in the next year");
    expect(described[2]).toEqual({
      question: "Household income",
      answer: "$120,000 – $200,000",
    });
  });

  it("skips unanswered questions", () => {
    expect(describeAnswers("life_insurance", {})).toEqual([]);
  });
});

describe("isHelpQuizTopic", () => {
  it("rejects retired and unknown topics", () => {
    expect(isHelpQuizTopic("medicare")).toBe(true);
    // 'annuities' was removed: it is a product word, not a question people ask.
    expect(isHelpQuizTopic("annuities")).toBe(false);
    expect(isHelpQuizTopic(null)).toBe(false);
    expect(isHelpQuizTopic("")).toBe(false);
  });
});

describe("scoreLead", () => {
  it("ranks a local, in-window, high-income quiz lead above a bare one", () => {
    const strong = scoreLead({
      age: 65,
      annual_income: 210_000,
      filing_status: "individual",
      calculated_premium: 500,
      source: "help_quiz",
      zip_code: "27401",
    });
    const weak = scoreLead({ source: "about_page_cta", zip_code: "90210" });

    expect(strong.score).toBeGreaterThan(weak.score);
    expect(strong.tier).toBe("hot");
    expect(strong.risk).toBe("high");
  });

  it("treats a missing premium as low IRMAA risk rather than crashing", () => {
    const result = scoreLead({});
    expect(result.risk).toBe("low");
    expect(result.score).toBe(0);
    expect(result.tier).toBe("cold");
  });
});

describe("calculatePartBPremium", () => {
  it("returns the standard premium below the first threshold", () => {
    const bracket = calculatePartBPremium(80_000, "individual");
    expect(bracket.partBPremium).toBe(STANDARD_BASE_PREMIUM_2026);
    expect(bracket.irmaaSurcharge).toBe(0);
  });

  it("uses different thresholds for joint filers at the same income", () => {
    const single = calculatePartBPremium(150_000, "individual");
    const joint = calculatePartBPremium(150_000, "married_jointly");
    expect(single.partBPremium).toBeGreaterThan(joint.partBPremium);
  });

  it("never returns a premium below the standard base", () => {
    for (const income of [0, 50_000, 109_000, 250_000, 1_000_000]) {
      for (const status of ["individual", "married_jointly"] as const) {
        expect(calculatePartBPremium(income, status).partBPremium).toBeGreaterThanOrEqual(
          STANDARD_BASE_PREMIUM_2026,
        );
      }
    }
  });
});

describe("adult-child entry point", () => {
  /**
   * /helping-a-parent links to
   *   /start?topic=medicare&stage=helping_spouse_or_parent
   * and the quiz only honors `stage` when it matches a real option value. A
   * rename on either side would silently drop those visitors back to question
   * one with no error anywhere, so the link is asserted rather than trusted.
   */
  const STAGE = "helping_spouse_or_parent";

  it("matches a real option on the first Medicare question", () => {
    const firstQuestion = TOPIC_META.medicare.questions[0];
    expect(firstQuestion.id).toBe("medicare_stage");
    expect(firstQuestion.options.map((o) => o.value)).toContain(STAGE);
  });

  it("produces guidance written for the person helping, not the beneficiary", () => {
    const beat = getValueBeat("medicare", { medicare_stage: STAGE });

    // Second person addressed to the helper, third person about the parent.
    expect(beat.headline).toMatch(/you/i);
    expect(beat.lede).toMatch(/authoriz/i);
    expect(beat.points.join(" ")).toMatch(/Social Security/);

    // And it must not be the same answer someone turning 65 themselves gets.
    expect(beat.headline).not.toBe(
      getValueBeat("medicare", { medicare_stage: "turning_65_soon" }).headline,
    );
  });
});
