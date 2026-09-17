import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { timelineAnswers } from "@/lib/enrollmentTimeline";

const fetchMock = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-17T16:00:00Z"));
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("RESEND_FROM", "test@example.com");
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => ({ id: "test-id" }) });
  vi.resetModules();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("Medicare dates email", () => {
  it.each([
    {
      name: "January 1 birthday across the year boundary",
      input: { month: 1, year: 2027, birthdayOnFirst: true },
      expected: [
        "September 1, 2026",
        "November 30, 2026",
        "December 1, 2026",
        "March 31, 2027",
        "May 31, 2027",
      ],
    },
    {
      name: "a window that has already closed",
      input: { month: 1, year: 2026, birthdayOnFirst: false },
      expected: [
        "October 1, 2025",
        "December 31, 2025",
        "January 1, 2026",
        "April 30, 2026",
        "June 30, 2026",
      ],
    },
  ])(
    "sends recomputed dates for $name without unrelated quiz advice",
    async ({ input, expected }) => {
      const { sendProspectAutoReply } = await import("@/lib/notifyLead");
      const result = await sendProspectAutoReply({
        email: "visitor@example.com",
        full_name: "<Visitor> Test",
        interest_topic: "medicare",
        quiz_answers: { ...timelineAnswers(input), opensOn: "January 1, 2099" },
      });

      expect(result).toMatchObject({ ok: true, providerId: "test-id" });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
      expect(payload.subject).toContain("Your Medicare dates");
      for (const body of [payload.text, payload.html]) {
        for (const date of expected) expect(body).toContain(date);
        expect(body).not.toContain("2099");
        expect(body).not.toContain("family member would like you to help");
        expect(body).toContain("topic=medicare");
      }
      expect(payload.html).toContain("&lt;Visitor&gt;");
      expect(payload.html).not.toContain("Hi <Visitor>");
    },
  );

  it("keeps dates out of a request about another service", async () => {
    const { sendProspectAutoReply } = await import("@/lib/notifyLead");
    await sendProspectAutoReply({
      email: "visitor@example.com",
      interest_topic: "life_insurance",
      quiz_answers: timelineAnswers({ month: 1, year: 2027, birthdayOnFirst: true }),
    });
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.subject).not.toContain("Your Medicare dates");
    expect(payload.text).not.toContain("Your enrollment window opens");
    expect(payload.html).not.toContain("Your enrollment window opens");
  });
});
