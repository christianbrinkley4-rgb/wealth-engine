import { describe, expect, it } from "vitest";

import { calculatePartBPremium, STANDARD_BASE_PREMIUM_2026 } from "@/lib/irmaa";
import { scoreLead } from "@/lib/leadScoring";
import {
  describeAnswers,
  getValueBeat,
  HELP_QUIZ_TOPICS,
  isHelpQuizTopic,
  phaseToStepNumber,
  quizTotalSteps,
  QUIZ_SITUATIONS,
  TOPIC_META,
} from "@/lib/helpQuiz";
import { LANDING_CONTRAST, LANDING_PAGES } from "@/lib/landingPages";
import { AGENT } from "@/lib/agent";
import { localBusinessJsonLd, SITE_URL } from "@/lib/seo";
import {
  HIGH_INTENT_SLUGS,
  nearbyCountyContrasts,
  getTriadCity,
  lifePlaceBeat,
  placeCheckBeat,
  retirementPlaceBeat,
  TRIAD_CITIES,
} from "@/lib/triad";
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

  it("includes kitchen-table meeting preference when provided", () => {
    const described = describeAnswers("medicare", {
      meet_preference: "kitchen_table",
    });
    expect(described).toContainEqual({
      question: "How they’d like to talk",
      answer: "Meet in person",
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

describe("quiz situations", () => {
  it("maps the four homepage doors onto real quiz branches", () => {
    expect(QUIZ_SITUATIONS.map((s) => s.id)).toEqual([
      "turning_65",
      "annual_enrollment",
      "retirement",
      "life",
    ]);
  });

  it("pre-answers Medicare stage with values the first question actually has", () => {
    const first = TOPIC_META.medicare.questions[0];
    for (const situation of QUIZ_SITUATIONS) {
      if (!situation.firstAnswer) continue;
      expect(situation.firstAnswer.questionId).toBe(first.id);
      expect(first.options.map((o) => o.value)).toContain(situation.firstAnswer.value);
    }
  });

  it("shortens the progress bar when question one was already answered", () => {
    expect(quizTotalSteps(true)).toBe(4);
    expect(phaseToStepNumber("branch", 1, true)).toBe(2);
    expect(phaseToStepNumber("contact", 0, true)).toBe(4);
    expect(phaseToStepNumber("topic", 0, true)).toBe(1);
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

describe("local lead scoring", () => {
  /**
   * The prefix list originally covered High Point and Summerfield but not
   * Greensboro (274xx) or Winston-Salem (271xx) — so leads from the two
   * biggest cities in the market scored as out-of-area.
   */
  const TRIAD_ZIPS = {
    Greensboro: "27401",
    "Winston-Salem": "27101",
    "High Point": "27260",
    Kernersville: "27284",
    Summerfield: "27358",
    "Oak Ridge": "27310",
  };

  for (const [city, zip] of Object.entries(TRIAD_ZIPS)) {
    it(`counts ${city} (${zip}) as local`, () => {
      const local = scoreLead({ source: "help_quiz", zip_code: zip });
      const distant = scoreLead({ source: "help_quiz", zip_code: "90210" });
      expect(local.score).toBeGreaterThan(distant.score);
    });
  }

  it("does not count an out-of-market ZIP as local", () => {
    expect(scoreLead({ source: "help_quiz", zip_code: "10001" }).score).toBe(
      scoreLead({ source: "help_quiz" }).score,
    );
  });
});

describe("service area honesty", () => {
  it("keeps twenty town pages and five high-intent towns that already exist", () => {
    expect(TRIAD_CITIES).toHaveLength(20);
    expect(HIGH_INTENT_SLUGS).toHaveLength(5);
    for (const slug of HIGH_INTENT_SLUGS) {
      expect(getTriadCity(slug)?.slug).toBe(slug);
    }
    expect(TRIAD_CITIES.some((city) => city.slug === "walkertown")).toBe(false);
    expect(TRIAD_CITIES.some((city) => city.slug === "asheboro")).toBe(false);
    expect(TRIAD_CITIES.some((city) => city.slug === "clemmons")).toBe(false);
  });

  it("flags Kernersville neighbors on a different Medicare list", () => {
    const kernersville = getTriadCity("kernersville");
    expect(kernersville).toBeTruthy();
    const contrasts = nearbyCountyContrasts(kernersville!);
    expect(contrasts.some((place) => place.slug === "greensboro")).toBe(true);
  });

  it("does not turn a drive-time promise into a county-wide or mileage-radius claim", () => {
    expect(Math.max(...TRIAD_CITIES.map((city) => city.minutesFromDowntown))).toBeLessThanOrEqual(
      30,
    );
    expect(JSON.stringify(localBusinessJsonLd())).not.toContain("GeoCircle");
  });

  it("does not publish guessed identity or domain facts", () => {
    expect(AGENT.education).toMatch(/student/i);
    expect(SITE_URL).not.toBe("https://wealth-engine.app");
  });
});

describe("four lead funnels", () => {
  it("maps each quiz door onto a capture topic the API accepts", () => {
    const apiTopics = ["medicare", "financial_planning", "life_insurance"];
    for (const situation of QUIZ_SITUATIONS) {
      expect(apiTopics).toContain(situation.topic);
      expect(HELP_QUIZ_TOPICS).toContain(situation.topic);
    }
  });

  it("gives turning 65 and AEP different Medicare value screens", () => {
    const t65 = getValueBeat("medicare", { medicare_stage: "turning_65_soon" });
    const aep = getValueBeat("medicare", { medicare_stage: "already_on_medicare" });
    expect(t65.headline).not.toBe(aep.headline);
    expect(t65.headline).toMatch(/seven months/i);
    expect(t65.lede).toMatch(/three months/i);
    expect(aep.lede).toMatch(/two years/i);
  });

  it("gives life and retirement their own value screens", () => {
    const life = getValueBeat("life_insurance", { life_cover: "review_existing" });
    const retirement = getValueBeat("financial_planning", { planning_focus: "taxes" });
    expect(life.headline).toMatch(/polic/i);
    expect(retirement.lede).toMatch(/73/);
    expect(life.headline).not.toBe(retirement.headline);
  });

  it("gives leaving-money a beneficiary-form answer instead of the generic calendar", () => {
    const leaving = getValueBeat("financial_planning", { planning_focus: "leaving_money" });
    const calendar = getValueBeat("financial_planning", {});
    expect(leaving.headline).toMatch(/beneficiary|will/i);
    expect(leaving.lede).toMatch(/beneficiary/i);
    expect(leaving.headline).not.toBe(calendar.headline);
  });

  it("keeps each town's Medicare check sentence unique", () => {
    const beats = TRIAD_CITIES.map((city) => placeCheckBeat(city));
    expect(new Set(beats).size).toBe(TRIAD_CITIES.length);
    for (const city of TRIAD_CITIES) {
      expect(placeCheckBeat(city)).toContain(city.name);
      expect(placeCheckBeat(city)).toContain(city.county);
    }
  });

  it("keeps life and retirement place beats unique across towns", () => {
    expect(new Set(TRIAD_CITIES.map((city) => lifePlaceBeat(city))).size).toBe(TRIAD_CITIES.length);
    expect(new Set(TRIAD_CITIES.map((city) => retirementPlaceBeat(city))).size).toBe(
      TRIAD_CITIES.length,
    );
  });

  it("keeps FAQ answers substantive enough to quote", () => {
    for (const city of TRIAD_CITIES) {
      for (const item of [...city.faq, ...city.lifeFaq, ...city.retirementFaq]) {
        expect(item.a.length, `${city.slug}: ${item.q}`).toBeGreaterThanOrEqual(30);
        expect(item.a).not.toMatch(/^(Yes|No|None)\.?$/i);
      }
    }
  });

  it("keeps intro copy unique across towns for all three local page types", () => {
    expect(new Set(TRIAD_CITIES.map((city) => city.intro)).size).toBe(TRIAD_CITIES.length);
    expect(new Set(TRIAD_CITIES.map((city) => city.lifeIntro)).size).toBe(TRIAD_CITIES.length);
    expect(new Set(TRIAD_CITIES.map((city) => city.retirementIntro)).size).toBe(
      TRIAD_CITIES.length,
    );
  });
});

describe("paid landing pages", () => {
  it("covers the four lead angles plus the annuity proposal angle", () => {
    expect(LANDING_PAGES.map((page) => page.slug)).toEqual(
      expect.arrayContaining([
        "turning-65",
        "annual-enrollment",
        "life-insurance",
        "retirement-income",
      ]),
    );
  });

  it("deep-links life-insurance ads into a real first-question answer", () => {
    const page = LANDING_PAGES.find((item) => item.slug === "life-insurance");
    expect(page).toBeTruthy();
    const staged = page!.options.filter((option) => option.href.includes("stage="));
    expect(staged.length).toBeGreaterThanOrEqual(3);
    const lifeValues = TOPIC_META.life_insurance.questions[0].options.map((o) => o.value);
    for (const option of staged) {
      const stage = new URL(option.href, "https://example.com").searchParams.get("stage");
      expect(lifeValues).toContain(stage);
    }
  });

  it("keeps four self-ID options and valid deep links on every paid page", () => {
    const knownPaths = new Set([
      "/remind-me",
      "/keep-my-doctor",
      "/annual-enrollment",
      "/life-insurance",
      "/annuities",
      "/plan",
      "/irmaa-appeal",
      "/retirement-income",
      "/start",
    ]);

    for (const page of LANDING_PAGES) {
      expect(page.options.length, page.slug).toBe(4);
      expect(page.promises.length, page.slug).toBeGreaterThanOrEqual(3);
      for (const option of page.options) {
        const url = new URL(option.href, "https://example.com");
        if (url.pathname === "/start") {
          const topic = url.searchParams.get("topic");
          expect(HELP_QUIZ_TOPICS, `${page.slug}: ${option.label}`).toContain(topic);
          const stage = url.searchParams.get("stage");
          if (stage && topic && isHelpQuizTopic(topic)) {
            const values = TOPIC_META[topic].questions[0].options.map((o) => o.value);
            expect(values, `${page.slug}: ${option.label}`).toContain(stage);
          }
        } else {
          expect(knownPaths.has(url.pathname), `${page.slug}: ${option.href}`).toBe(true);
        }
      }
    }
  });

  it("keeps the mill-vs-kitchen-table contrast substantive", () => {
    expect(LANDING_CONTRAST.length).toBeGreaterThanOrEqual(3);
    for (const row of LANDING_CONTRAST) {
      expect(row.them.length).toBeGreaterThan(10);
      expect(row.us.length).toBeGreaterThan(10);
    }
  });
});
