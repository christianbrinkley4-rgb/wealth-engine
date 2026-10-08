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

  it("sends the primary button to the published paycheck lesson", () => {
    expect(WealthLane.guides()).toHaveLength(6);
    expect(WealthLane.calculators()).toHaveLength(4);
    expect(WealthLane.quizzes()).toHaveLength(2);
    expect(WealthLane.checklists()).toHaveLength(2);

    const hero = WealthLane.hero();
    const paycheck = WealthLane.guides().find((card) => card.id === "paycheck");
    const lesson = WealthLane.paycheckLesson();
    expect(hero.cta).toBe("Start with your paycheck");
    expect(hero.ctaHref).toBe(WealthLane.paycheckPath);
    expect(hero.ctaHref.includes("#")).toBe(false);
    expect(paycheck?.status).toBe("Ready");
    expect(paycheck?.href).toBe(hero.ctaHref);
    expect(lesson.lines.map((line) => line.label)).toEqual([...WealthLane.stubLines()]);
    for (const line of lesson.lines) {
      expect(line.text.length).toBeGreaterThan(40);
      expect(line.text).not.toMatch(/\$\d/);
    }

    const stillComing = [
      ...WealthLane.guides().filter((card) => card.id !== "paycheck"),
      ...WealthLane.calculators(),
      ...WealthLane.quizzes(),
      ...WealthLane.checklists(),
    ];
    expect(
      stillComing.every((card) => card.status === "Coming next" && card.href === undefined),
    ).toBe(true);
    expect(WealthLane.linksCta()).toBe("Open the wealth hub");
  });

  it("only links out of the lane to pages that already exist", () => {
    const hrefs = [
      ...WealthLane.bioLinks(),
      ...WealthLane.footerLinks(),
      ...WealthLane.nav(),
      ...WealthLane.guides().flatMap((card) => (card.href ? [{ href: card.href }] : [])),
      { href: WealthLane.hero().ctaHref },
    ];
    for (const link of hrefs) {
      const path = link.href.split("#")[0];
      expect(["/wealth", "/wealth/paycheck", "/links", "/about", "/privacy", "/"]).toContain(path);
    }
  });
});
