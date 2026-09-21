import { describe, expect, it } from "vitest";

import {
  GOOGLE_REVIEW_URL,
  REENGAGE_AFTER_DAYS,
  REENGAGE_SEQUENCE_KEY,
  REVIEW_SEQUENCE_KEY,
  buildSendPlan,
  defaultEmailContext,
  getSequence,
  listSequenceKeys,
  renderStep,
  sequenceKeyForTopic,
  shouldEnrollNurture,
} from "@/lib/nurture";

const ctx = defaultEmailContext({
  fullName: "Mary Johnson",
  unsubscribeToken: "a".repeat(48),
  topic: "medicare",
});

describe("nurture sequences", () => {
  it("maps every inquiry topic to a sequence", () => {
    expect(sequenceKeyForTopic("medicare")).toBe("medicare-nurture");
    expect(sequenceKeyForTopic("life_insurance")).toBe("life-nurture");
    expect(sequenceKeyForTopic("financial_planning")).toBe("financial-nurture");
    expect(sequenceKeyForTopic("care_coverage")).toBe("care-nurture");
    expect(sequenceKeyForTopic(null)).toBeNull();
    expect(sequenceKeyForTopic("something-else")).toBeNull();
  });

  it("exposes six sequences with at least two steps each", () => {
    const keys = listSequenceKeys();
    expect(keys).toHaveLength(6);
    expect(keys).toContain(REVIEW_SEQUENCE_KEY);
    expect(keys).toContain(REENGAGE_SEQUENCE_KEY);
    for (const key of keys) {
      const seq = getSequence(key);
      expect(seq).not.toBeNull();
      expect(seq!.steps.length).toBeGreaterThanOrEqual(2);
      // Step keys unique within a sequence, offsets non-decreasing.
      const stepKeys = seq!.steps.map((s) => s.key);
      expect(new Set(stepKeys).size).toBe(stepKeys.length);
      const offsets = seq!.steps.map((s) => s.dayOffset);
      expect([...offsets].sort((a, b) => a - b)).toEqual(offsets);
    }
  });

  it("returns null for unknown sequence keys", () => {
    expect(getSequence("nope")).toBeNull();
    expect(buildSendPlan("nope", new Date())).toEqual([]);
  });

  it("builds a send plan with correct due dates", () => {
    const plan = buildSendPlan("medicare-nurture", new Date("2026-09-19T12:00:00Z"));
    expect(plan.map((p) => p.stepKey)).toEqual([
      "medicare-penalty",
      "medicare-still-working",
      "medicare-costs",
      "medicare-doctor",
      "medicare-checkin",
    ]);
    expect(plan[0].sendAfter).toBe("2026-09-20"); // day 1
    expect(plan[4].sendAfter).toBe("2026-10-19"); // day 30
  });

  it("re-engage waits 45 days after a finished nurture", () => {
    expect(REENGAGE_AFTER_DAYS).toBe(45);
  });

  it("sends the review ask after the appointment ends and the nudge 7 days later", () => {
    const seq = getSequence(REVIEW_SEQUENCE_KEY)!;
    expect(seq.steps.map((s) => s.key)).toEqual(["review-ask", "review-reminder"]);
    expect(seq.steps[0].dayOffset).toBe(0); // first cron run on/after appointment end
    expect(seq.steps[1].dayOffset).toBe(7);
    expect(seq.steps[0].subject).toBe("Thanks for today — quick favor?");
    expect(seq.steps[1].subject).toBe("One quick nudge");
    // Anchored to the appointment end date: ask due that day, nudge 7 days on.
    const plan = buildSendPlan(REVIEW_SEQUENCE_KEY, new Date("2026-10-01T15:00:00Z"));
    expect(plan[0].sendAfter).toBe("2026-10-01");
    expect(plan[1].sendAfter).toBe("2026-10-08");
  });

  it("review emails ask for Google reviews only, never Yelp", () => {
    const seq = getSequence(REVIEW_SEQUENCE_KEY)!;
    for (const step of seq.steps) {
      const rendered = renderStep(step, {
        ...ctx,
        googleReviewUrl: "https://google.example/review",
      });
      expect(rendered.text).toMatch(/Google review/);
      expect(rendered.text).not.toMatch(/Yelp/i);
    }
  });
});

describe("shouldEnrollNurture", () => {
  const base = { consentGiven: true, email: "mary@example.com", status: "new", topic: "medicare" };

  it("enrolls an eligible inbound lead", () => {
    expect(shouldEnrollNurture(base)).toEqual({ enroll: true, reason: "eligible" });
  });

  it("refuses without consent", () => {
    expect(shouldEnrollNurture({ ...base, consentGiven: false }).enroll).toBe(false);
  });

  it("refuses without an email", () => {
    expect(shouldEnrollNurture({ ...base, email: null }).enroll).toBe(false);
    expect(shouldEnrollNurture({ ...base, email: "not-an-email" }).enroll).toBe(false);
  });

  it("refuses stopped statuses", () => {
    for (const status of ["booked", "client", "closed", "BOOKED"]) {
      expect(shouldEnrollNurture({ ...base, status }).enroll).toBe(false);
    }
  });

  it("refuses topics with no sequence", () => {
    expect(shouldEnrollNurture({ ...base, topic: "t65_list" }).enroll).toBe(false);
    expect(shouldEnrollNurture({ ...base, topic: null }).enroll).toBe(false);
  });
});

describe("renderStep", () => {
  it("fills every placeholder and leaves none behind", () => {
    for (const key of listSequenceKeys()) {
      const seq = getSequence(key)!;
      for (const step of seq.steps) {
        const rendered = renderStep(step, {
          ...ctx,
          googleReviewUrl: "https://google.example/review",
        });
        expect(rendered.subject.length).toBeGreaterThan(0);
        for (const part of [rendered.subject, rendered.text, rendered.html]) {
          expect(part).not.toMatch(/\{(greeting|firstName|booking|review|unsubscribe|site|phone)\}/);
        }
        // Personal greeting and unsubscribe escape hatch always present.
        expect(rendered.text).toContain("Hi Mary");
        expect(rendered.text).toContain(ctx.unsubscribeUrl);
        expect(rendered.html).toContain(ctx.unsubscribeUrl);
      }
    }
  });

  it("adds the general-information framing to educational steps", () => {
    const seq = getSequence("medicare-nurture")!;
    const educational = seq.steps.find((s) => s.key === "medicare-penalty")!;
    const checkin = seq.steps.find((s) => s.key === "medicare-checkin")!;
    expect(renderStep(educational, ctx).text).toContain("general information rather than advice");
    expect(renderStep(checkin, ctx).text).not.toContain("general information rather than advice");
  });

  it("never invents statistics or guarantees in copy", () => {
    const banned = [/\b#1\b/i, /guarantee/i, /best plan/i, /everyone saves/i];
    for (const key of listSequenceKeys()) {
      const seq = getSequence(key)!;
      for (const step of seq.steps) {
        const rendered = renderStep(step, ctx);
        for (const pattern of banned) {
          expect(rendered.text).not.toMatch(pattern);
          expect(rendered.subject).not.toMatch(pattern);
        }
      }
    }
  });

  it("falls back to a neutral greeting without a name", () => {
    const seq = getSequence("medicare-nurture")!;
    const rendered = renderStep(seq.steps[0], { ...ctx, firstName: "" });
    expect(rendered.text).toContain("Hi there,");
  });
});

describe("defaultEmailContext", () => {
  it("builds booking, unsubscribe, and review links", () => {
    expect(ctx.firstName).toBe("Mary");
    expect(ctx.bookingUrl).toContain("/start");
    expect(ctx.unsubscribeUrl).toContain("/unsubscribe?token=" + "a".repeat(48));
    expect(ctx.googleReviewUrl).toBe(GOOGLE_REVIEW_URL);
  });

  it("handles a missing name", () => {
    const noName = defaultEmailContext({ fullName: null, unsubscribeToken: "b".repeat(48) });
    expect(noName.firstName).toBe("there");
  });
});
