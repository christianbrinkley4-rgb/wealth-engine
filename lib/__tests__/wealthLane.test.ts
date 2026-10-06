import { describe, expect, it } from "vitest";

import { WealthLane } from "@/lib/wealthLane";

describe("wealth lane", () => {
  it("recognizes only the young paths", () => {
    expect(WealthLane.isYoungPath("/wealth")).toBe(true);
    expect(WealthLane.isYoungPath("/wealth/paycheck")).toBe(true);
    expect(WealthLane.isYoungPath("/links")).toBe(true);
    expect(WealthLane.isYoungPath("/links/extra")).toBe(true);
    expect(WealthLane.isYoungPath("/")).toBe(false);
    expect(WealthLane.isYoungPath("/turning-65")).toBe(false);
    expect(WealthLane.isYoungPath("/life-insurance")).toBe(false);
    expect(WealthLane.isYoungPath("/retirement-income")).toBe(false);
    expect(WealthLane.isYoungPath("/wealthier")).toBe(false);
    expect(WealthLane.isYoungPath("/link")).toBe(false);
  });

  it("keeps visitor copy educational and free of dashes or invented figures", () => {
    const copy = WealthLane.visitorCopy().join("\n");
    expect(copy).not.toMatch(/[—–]/);
    expect(copy).not.toMatch(/\$\d/);
    expect(copy).not.toMatch(/\bCFP\b/);
    expect(copy).not.toMatch(/you should (buy|invest|enroll|pick)/i);
    expect(copy.toLowerCase()).toContain("not a cpa yet");
    expect(copy.toLowerCase()).toContain("not securities-licensed");
    expect(copy.toLowerCase()).toContain("life and health");
    expect(copy.toLowerCase()).not.toContain("crypto");
  });

  it("previews the hub without pretending the tools are live", () => {
    expect(WealthLane.guides()).toHaveLength(6);
    expect(WealthLane.calculators()).toHaveLength(4);
    expect(WealthLane.quizzes()).toHaveLength(2);
    expect(WealthLane.checklists()).toHaveLength(2);
    const cards = [
      ...WealthLane.guides(),
      ...WealthLane.calculators(),
      ...WealthLane.quizzes(),
      ...WealthLane.checklists(),
    ];
    expect(cards.every((card) => card.status === "Coming next")).toBe(true);
    expect(WealthLane.hero().cta).toBe("Start with your paycheck");
    expect(WealthLane.linksCta()).toBe("Open the wealth hub");
  });

  it("only links out of the lane to pages that already exist", () => {
    for (const link of [
      ...WealthLane.bioLinks(),
      ...WealthLane.footerLinks(),
      ...WealthLane.nav(),
    ]) {
      const path = link.href.split("#")[0];
      expect(["/wealth", "/links", "/about", "/privacy", "/"]).toContain(path);
    }
  });
});
