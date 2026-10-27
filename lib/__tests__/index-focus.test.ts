import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { CHANGES_2027 } from "@/lib/changes2027";
import { isOffTopicPath, offTopicRobotsHeaders, OFF_TOPIC_PATHS } from "@/lib/indexFocus";

const MONEY_PAGES = [
  "/",
  "/aep",
  "/plan-check",
  "/turning-65",
  "/medicare-plans-ending-2027",
  "/medicare-plans-ending-2027/guilford-county",
  "/medicare-agent-greensboro-nc",
  "/medicare-agent-high-point-nc",
  "/medicare-agent-winston-salem-nc",
  "/life-insurance",
  "/final-expense-insurance",
  "/annuities",
  "/retirement-income",
  "/social-security-timing",
  "/irmaa-appeal",
  "/tools/retirement-projector",
  "/tools/life-insurance-needs",
  "/tools/medigap-or-advantage-quiz",
  "/answers/when-should-i-claim-social-security",
  "/answers/what-are-required-minimum-distributions",
  "/answers/term-whole-or-universal-life-insurance-which-do-i-need",
  "/guides/medicare-automatic-renewal",
  "/guides/nc-state-health-plan-medicare",
];

describe("index focus", () => {
  it("never pulls a Medicare, retirement or life insurance page out of Google", () => {
    for (const path of MONEY_PAGES) expect(isOffTopicPath(path), path).toBe(false);
  });

  it("keeps every money page in the sitemap and every off-topic page out", () => {
    const paths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
    for (const path of MONEY_PAGES) {
      if (path === "/") continue; // homepage is emitted as the bare origin
      expect(paths.has(path), path).toBe(true);
    }
    for (const path of paths) expect(isOffTopicPath(path), path).toBe(false);
  });

  it("matches whole sections and ignores trailing slashes and queries", () => {
    expect(isOffTopicPath("/wealth")).toBe(true);
    expect(isOffTopicPath("/wealth/roth-ira-explained/")).toBe(true);
    expect(isOffTopicPath("/ai?x=1")).toBe(true);
    expect(isOffTopicPath("/wealthy-retirees")).toBe(false);
    expect(isOffTopicPath(OFF_TOPIC_PATHS[0])).toBe(true);
  });

  it("sends noindex, follow for every off-topic route", () => {
    const rules = offTopicRobotsHeaders();
    for (const path of OFF_TOPIC_PATHS) {
      const rule = rules.find((r) => r.source === path);
      expect(rule?.headers).toEqual([{ key: "X-Robots-Tag", value: "noindex, follow" }]);
    }
    expect(rules.some((r) => r.source === "/wealth/:path*")).toBe(true);
  });

  it("sends every 2027 news card to an indexed page with a printed source", () => {
    for (const item of CHANGES_2027) {
      expect(isOffTopicPath(item.href), item.href).toBe(false);
      expect(item.source.length).toBeGreaterThan(5);
      expect(`${item.title} ${item.body}`).not.toMatch(/—/);
    }
  });
});
