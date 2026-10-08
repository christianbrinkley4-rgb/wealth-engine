import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { SITE_STATS } from "@/lib/siteStats";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";
import { STANDALONE_GUIDES } from "@/lib/standaloneGuides";

const ROOT = join(__dirname, "..", "..");

function pageDirs(relative: string): string[] {
  return readdirSync(join(ROOT, relative), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => {
      try {
        return readdirSync(join(ROOT, relative, name)).includes("page.tsx");
      } catch {
        return false;
      }
    });
}

describe("SITE_STATS trust band counts", () => {
  it("calculators matches the /tools calculator pages (quizzes and hub excluded)", () => {
    const tools = pageDirs("app/tools").filter(
      (name) => name !== "_components" && !name.endsWith("-quiz")
    );
    expect(tools).toHaveLength(SITE_STATS.calculators);
  });

  it("quizzes matches the /tools quiz pages", () => {
    const quizzes = pageDirs("app/tools").filter((name) => name.endsWith("-quiz"));
    expect(quizzes).toHaveLength(SITE_STATS.quizzes);
  });

  it("guides matches TRAFFIC_GUIDES plus the standalone /guides pages", () => {
    expect(TRAFFIC_GUIDES).toHaveLength(31);
    expect(STANDALONE_GUIDES).toHaveLength(10);
    expect(SITE_STATS.guides).toBe(TRAFFIC_GUIDES.length + STANDALONE_GUIDES.length);
  });

  it("articles matches the /wealth article pages (hubs and sections excluded)", () => {
    const hubs = new Set(["learn", "calculators", "journey", "quiz", "tools", "ui"]);
    const articles = pageDirs("app/wealth").filter((name) => !hubs.has(name));
    expect(articles).toHaveLength(SITE_STATS.articles);
  });
});
