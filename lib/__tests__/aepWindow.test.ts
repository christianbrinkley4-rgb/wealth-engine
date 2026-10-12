import { describe, expect, it } from "vitest";

import { aepWindow, aepWindowMessage } from "@/lib/aepWindow";

describe("annual enrollment window", () => {
  it("counts the days before October 15, 2026 in Eastern time", () => {
    const state = aepWindow(new Date("2026-10-12T16:00:00-04:00"));
    expect(state.phase).toBe("before");
    expect(state.daysUntilOpen).toBe(3);
    expect(aepWindowMessage(state)).toContain("October 15");
    expect(aepWindowMessage(state)).toContain("December 7");
    expect(aepWindowMessage(state)).not.toMatch(/open now/i);
  });

  it("counts down to December 7 once the window is open", () => {
    const state = aepWindow(new Date("2026-10-15T00:30:00-04:00"));
    expect(state.phase).toBe("open");
    expect(state.daysUntilDeadline).toBe(53);
    expect(aepWindowMessage(state)).toContain("53 days left");
  });

  it("says the window has closed after December 7", () => {
    const state = aepWindow(new Date("2026-12-08T12:00:00-05:00"));
    expect(state.phase).toBe("closed");
    expect(aepWindowMessage(state)).toContain("January 1 to March 31");
  });
});
