/**
 * Tests for the shareable result card data: the card data builder, the
 * per-tool defaults (computed from the real tool math, never invented),
 * and the dynamic OG/twitter image routes.
 */

import { describe, expect, it } from "vitest";

import {
  buildShareCardData,
  isToolSlug,
  SHARE_BRAND,
  SHARE_CARD_SIZE,
  shareCardFileName,
  shareCardText,
  TOOL_CARD_DEFAULTS,
  TOOL_SLUGS,
} from "./share-card-data";
import ToolOpengraphImage, {
  contentType as ogContentType,
  generateStaticParams as ogParams,
  size as ogSize,
} from "../[tool]/opengraph-image";
import ToolTwitterImage, {
  contentType as twContentType,
  generateStaticParams as twParams,
  size as twSize,
} from "../[tool]/twitter-image";

describe("buildShareCardData", () => {
  it("trims fields and returns the card payload", () => {
    const data = buildShareCardData({
      headlineNumber: "  $1,993  ",
      headlineLabel: " Take-home, per biweekly check ",
      toolName: "Take-home pay calculator",
      toolPath: "/tools/take-home-pay",
    });
    expect(data).toEqual({
      headlineNumber: "$1,993",
      headlineLabel: "Take-home, per biweekly check",
      toolName: "Take-home pay calculator",
      toolPath: "/tools/take-home-pay",
    });
  });

  it("refuses blank fields so a card never renders an empty headline", () => {
    expect(() =>
      buildShareCardData({
        headlineNumber: "   ",
        headlineLabel: "Target fund size",
        toolName: "Emergency fund calculator",
        toolPath: "/tools/emergency-fund",
      }),
    ).toThrow();
  });
});

describe("share card helpers", () => {
  it("builds a download name from the tool path", () => {
    expect(shareCardFileName("/tools/roth-vs-traditional")).toBe("roth-vs-traditional-result.png");
    expect(shareCardFileName("/tools/budget")).toBe("budget-result.png");
  });

  it("writes share text that names the tool and the headline", () => {
    const text = shareCardText({
      headlineNumber: "$300",
      headlineLabel: "Left over each month",
      toolName: "Budget calculator",
      toolPath: "/tools/budget",
    });
    expect(text).toContain("Budget calculator");
    expect(text).toContain("$300");
  });

  it("appends the risk line to the share text when present", () => {
    const text = shareCardText({
      headlineNumber: "$1,870,500",
      headlineLabel: "Projected at age 65",
      toolName: "Retirement projector",
      toolPath: "/tools/retirement-projector",
      riskLine: "But in 26 of the last 98 years, the market lost money.",
    });
    expect(text).toContain("But in 26 of the last 98 years, the market lost money.");
  });

  it("trims the risk line like every other field", () => {
    const data = buildShareCardData({
      headlineNumber: "$1,870,500",
      headlineLabel: "Projected at age 65",
      toolName: "Retirement projector",
      toolPath: "/tools/retirement-projector",
      riskLine: "  But in 26 of the last 98 years, the market lost money.  ",
    });
    expect(data.riskLine).toBe("But in 26 of the last 98 years, the market lost money.");
  });

  it("keeps the card at the 1200x630 social size", () => {
    expect(SHARE_CARD_SIZE).toEqual({ width: 1200, height: 630 });
  });

  it("carries the brand without a phone number", () => {
    expect(SHARE_BRAND.name).toBe("Christian Brinkley");
    expect(SHARE_BRAND.domain).toBe("christianbrinkleync.com");
    expect(JSON.stringify(SHARE_BRAND)).not.toMatch(/919|408|6671/);
  });
});

describe("TOOL_CARD_DEFAULTS", () => {
  it("covers all 8 tools with complete card data", () => {
    expect(TOOL_SLUGS).toHaveLength(8);
    for (const slug of TOOL_SLUGS) {
      const card = TOOL_CARD_DEFAULTS[slug];
      expect(card.slug).toBe(slug);
      expect(card.toolPath).toBe(`/tools/${slug}`);
      expect(card.headlineNumber.trim().length).toBeGreaterThan(0);
      expect(card.headlineLabel.trim().length).toBeGreaterThan(0);
      expect(card.toolName.trim().length).toBeGreaterThan(0);
    }
  });

  it("recognizes the 8 tool slugs and nothing else", () => {
    expect(isToolSlug("budget")).toBe(true);
    expect(isToolSlug("take-home-pay")).toBe(true);
    expect(isToolSlug("not-a-tool")).toBe(false);
  });

  it("computes default headlines from the real tool math", () => {
    // These are the tool defaults run through lib/wealth/math. If the math
    // changes, these expectations change with it. Nothing is hand-written.
    expect(TOOL_CARD_DEFAULTS.budget.headlineNumber).toBe("$300");
    expect(TOOL_CARD_DEFAULTS["compound-interest"].headlineNumber).toBe("$252,111");
    expect(TOOL_CARD_DEFAULTS["emergency-fund"].headlineNumber).toBe("$15,000");
    expect(TOOL_CARD_DEFAULTS["life-insurance-needs"].headlineNumber).toBe("$935,000");
    expect(TOOL_CARD_DEFAULTS["retirement-projector"].headlineNumber).toBe("$1,870,500");
  });

  it("carries a risk line on the two honestly-calculator tools", () => {
    const retirement = TOOL_CARD_DEFAULTS["retirement-projector"];
    expect(retirement.riskLine).toBe("But in 26 of the last 98 years, the market lost money.");
    const debt = TOOL_CARD_DEFAULTS["debt-payoff"];
    expect(debt.riskLine).toMatch(/^Minimums only: /);
    expect(debt.riskLine).toContain("interest.");
    for (const slug of TOOL_SLUGS) {
      if (slug === "retirement-projector" || slug === "debt-payoff") continue;
      expect(TOOL_CARD_DEFAULTS[slug].riskLine).toBeUndefined();
    }
  });
});

describe("dynamic image routes", () => {
  it("declares static params for all 8 tools", () => {
    expect(ogParams()).toHaveLength(8);
    expect(twParams()).toHaveLength(8);
    expect(ogSize).toEqual({ width: 1200, height: 630 });
    expect(twSize).toEqual({ width: 1200, height: 630 });
    expect(ogContentType).toBe("image/png");
    expect(twContentType).toBe("image/png");
  });

  it("returns a 200 PNG for every tool slug", async () => {
    for (const slug of TOOL_SLUGS) {
      const og = await ToolOpengraphImage({ params: Promise.resolve({ tool: slug }) });
      expect(og.status).toBe(200);
      expect(og.headers.get("content-type")).toContain("image/png");
      const tw = await ToolTwitterImage({ params: Promise.resolve({ tool: slug }) });
      expect(tw.status).toBe(200);
      expect(tw.headers.get("content-type")).toContain("image/png");
    }
  });

  it("falls back to the budget card for an unknown slug", async () => {
    const og = await ToolOpengraphImage({ params: Promise.resolve({ tool: "nope" }) });
    expect(og.status).toBe(200);
  });
});
