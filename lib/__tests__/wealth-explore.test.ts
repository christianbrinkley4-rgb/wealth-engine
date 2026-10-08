import { describe, expect, it } from "vitest";
import { nextUnopenedTool } from "@/lib/wealth/explore";
import { WEALTH_TOOLS } from "@/lib/wealth/site";

describe("next tool from existing local history", () => {
  it("does not invent a history for a new visitor or invalid saved slugs", () => {
    expect(nextUnopenedTool([])).toBeUndefined();
    expect(nextUnopenedTool(["unknown", "__proto__"])).toBeUndefined();
  });
  it("connects a finished quiz to a practical unopened tool", () => {
    expect(nextUnopenedTool(["first-1000"])?.slug).toBe("budget");
    expect(nextUnopenedTool(["first-1000", "budget"])?.slug).toBe("debt-payoff");
  });
  it("never recommends an already opened tool and stops at the end", () => {
    const seen = ["money-personality"];
    while (seen.length < WEALTH_TOOLS.length) {
      const next = nextUnopenedTool(seen)!;
      expect(next).toBeDefined();
      expect(seen).not.toContain(next.slug);
      seen.push(next.slug);
    }
    expect(nextUnopenedTool(seen)).toBeUndefined();
  });
});
