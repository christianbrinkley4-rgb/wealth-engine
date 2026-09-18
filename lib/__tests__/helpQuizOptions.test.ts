import { describe, expect, it } from "vitest";

import { BRANCH_QUESTIONS, describeAnswers, visibleOptions } from "@/lib/helpQuiz";

const medicareQuestion = BRANCH_QUESTIONS.medicare.find((q) => q.id === "medicare_question")!;
const labelsFor = (stage: string) =>
  visibleOptions(medicareQuestion, { medicare_stage: stage }).map((o) => o.value);

describe("the second Medicare question follows the first", () => {
  it("never asks someone already on Medicare when to sign up", () => {
    const shown = labelsFor("already_on_medicare");
    expect(shown).not.toContain("when_to_enroll");
    expect(shown).not.toContain("which_coverage");
    expect(shown).toEqual(["plan_still_fits", "keep_doctors_drugs", "costs_changed", "all_of_it"]);
  });

  it("asks people approaching 65 about enrolling, not about renewing", () => {
    const shown = labelsFor("turning_65_soon");
    expect(shown).toContain("when_to_enroll");
    expect(shown).toContain("which_coverage");
    expect(shown).not.toContain("plan_still_fits");
    expect(shown).not.toContain("costs_changed");
  });

  it("treats someone still working, and someone helping a parent, as pre-enrollment", () => {
    for (const stage of ["past_65_still_working", "helping_spouse_or_parent"]) {
      expect(labelsFor(stage), stage).toContain("when_to_enroll");
      expect(labelsFor(stage), stage).not.toContain("plan_still_fits");
    }
  });

  it("always offers the way out for someone who wants everything looked at", () => {
    for (const stage of [
      "turning_65_soon",
      "past_65_still_working",
      "already_on_medicare",
      "helping_spouse_or_parent",
      "",
    ]) {
      expect(labelsFor(stage), stage).toContain("all_of_it");
    }
  });

  it("still labels an answer that is no longer offered", () => {
    // Someone can change their stage after answering. The record Christian
    // receives has to stay readable rather than printing a raw value.
    const described = describeAnswers("medicare", {
      medicare_stage: "already_on_medicare",
      medicare_question: "when_to_enroll",
    });
    expect(described.map((d) => d.answer)).toContain("When I have to sign up, and by when");
  });
});
