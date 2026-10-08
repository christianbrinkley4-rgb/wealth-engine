/**
 * Regression tests for Christian's standing rule: the /ai guides are purely
 * informational. No phone number, no sales CTA, no enrollment language
 * anywhere on /ai routes.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(__dirname, "..", "..");

function src(path: string): string {
  return readFileSync(join(root, path), "utf8");
}

describe("ai phone suppression", () => {
  it("StickyMobileCta hides the call bar on /ai routes", () => {
    const code = src("components/StickyMobileCta.tsx");
    expect(code).toMatch(/"\/ai"/);
  });

  it("ServiceHero hides the enrollment note when hidePhoneCta is set", () => {
    const code = src("app/components/ServiceHero.tsx");
    expect(code).toMatch(/hidePhoneCta \? null/);
  });

  it("every /ai page passes hidePhoneCta to its hero", () => {
    const pages = [
      "app/ai/page.tsx",
      "app/ai/connect/page.tsx",
      "app/ai/ai-tools-compared/page.tsx",
      "app/ai/which-ai-for-which-task/page.tsx",
      "app/ai/ai-money-tasks/page.tsx",
      "app/ai/ai-for-seniors/page.tsx",
      "app/ai/ai-for-small-business/page.tsx",
      "app/ai/ai-for-job-search/page.tsx",
      "app/ai/ai-mistakes-to-avoid/page.tsx",
    ];
    for (const p of pages) {
      expect(src(p), p).toMatch(/hidePhoneCta/);
    }
  });

  it("TopRouteChrome and SiteFooter suppress phone on /ai routes", () => {
    expect(src("app/components/TopRouteChrome.tsx")).toMatch(/isAiRoute/);
    expect(src("app/components/SiteFooter.tsx")).toMatch(/isAiRoute/);
  });
});
