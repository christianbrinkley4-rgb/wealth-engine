import { describe, expect, it } from "vitest";
import { AEP_HERO_TITLES, aepPhase } from "@/lib/aep";

describe("aepPhase", () => {
  // Note: phase boundaries are evaluated in America/New_York.
  const at = (iso: string) => new Date(iso);

  it("is 'before' ahead of October 15", () => {
    expect(aepPhase(at("2026-09-20T12:00:00-04:00"))).toBe("before");
    expect(aepPhase(at("2026-10-14T23:59:00-04:00"))).toBe("before");
  });

  it("is 'open' from October 15 through December 7", () => {
    expect(aepPhase(at("2026-10-15T00:00:00-04:00"))).toBe("open");
    expect(aepPhase(at("2026-11-01T12:00:00-05:00"))).toBe("open");
    expect(aepPhase(at("2026-12-07T23:59:00-05:00"))).toBe("open");
  });

  it("is 'after' from December 8 through New Year's Eve", () => {
    expect(aepPhase(at("2026-12-08T00:00:00-05:00"))).toBe("after");
    expect(aepPhase(at("2026-12-31T23:59:00-05:00"))).toBe("after");
    // From Jan 1 the next AEP is upcoming again.
    expect(aepPhase(at("2027-01-05T12:00:00-05:00"))).toBe("before");
  });

  it("only claims the window is open inside the window", () => {
    expect(AEP_HERO_TITLES.before).not.toMatch(/is open/i);
    expect(AEP_HERO_TITLES.after).not.toMatch(/is open/i);
    expect(AEP_HERO_TITLES.open).toMatch(/is open/i);
  });
});
