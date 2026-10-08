import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { GET as discoveryText } from "@/app/llms.txt/route";
import { wealthArticleJsonLd } from "@/lib/wealth/seo";

import { getWealthArticle, WEALTH_ARTICLES, wealthArticleText } from "@/lib/wealth/articles";
import {
  FIRST_1000_RESULTS,
  FIRST_1000_START,
  FIRST_1000_TREE,
  getPlanResult,
  getTreeNode,
  PERSONALITIES,
  PERSONALITY_QUESTIONS,
  scorePersonality,
} from "@/lib/wealth/quizzes";
import {
  ANALYZER_FILE,
  BUDGET_FILE,
  EDUCATION_NOTE,
  JOURNEY,
  PILLARS,
  WEALTH_NAV,
  WEALTH_TOOLS,
} from "@/lib/wealth/site";

const root = path.resolve(__dirname, "../..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx|css)$/.test(name) ? [full] : [];
  });
}

const HUB_FILES = [
  ...sourceFiles(path.join(root, "app/wealth")),
  ...sourceFiles(path.join(root, "app/links")),
  ...sourceFiles(path.join(root, "lib/wealth")),
];

/** Every internal link the hub's data points at must be a page that exists. */
const ROUTES = new Set([
  "/",
  "/links",
  "/privacy",
  "/wealth",
  "/wealth/calculators",
  "/wealth/quiz",
  "/wealth/learn",
  "/wealth/journey",
  "/wealth/tools",
  ...WEALTH_TOOLS.filter((tool) => tool.kind !== "Download").map((tool) => tool.href),
  ...WEALTH_ARTICLES.map((article) => `/wealth/learn/${article.slug}`),
]);
const routeExists = (href: string) => ROUTES.has(href.split("#")[0].split("?")[0]);

describe("hub voice rules", () => {
  it("has no em or en dashes anywhere in the hub", () => {
    for (const file of HUB_FILES) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/[—–]/);
    }
  });

  it("never tells a visitor what to buy", () => {
    for (const file of HUB_FILES) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toMatch(/you should (buy|invest in)|guaranteed returns? of|best (stock|fund|etf)s? to buy/i);
      expect(text, file).not.toMatch(/\b(VOO|VTI|SPY|QQQ|bitcoin|crypto)\b/i);
    }
  });

  it("does not claim credentials he does not hold", () => {
    for (const file of HUB_FILES) {
      const text = readFileSync(file, "utf8");
      expect(text, file).not.toMatch(/financial advisor in|I'm a (CPA|CFP|financial advisor)|I am a (CPA|CFP|financial advisor)/i);
    }
  });
});

/**
 * The PUNCH voice checklist (October 2026), the parts a machine can check:
 * no sentence over 25 words and no hedging. Quiz answer options are a
 * character talking, so they are left out of the hedge check.
 */
describe("PUNCH voice", () => {
  const HEDGES =
    /\b(usually|generally|probably|maybe|perhaps|tends? to|typically|rarely|often|might|sort of|kind of|i think|in general|a lot of people|many people|some people|most people)\b/i;
  const BANNED = /game.?changer|in today's world|delve|level up|deep dive|at the end of the day|once-a-year chance|leverage|it's worth noting|importantly|bottom line/i;

  const data: string[] = [
    EDUCATION_NOTE,
    ...WEALTH_ARTICLES.flatMap((article) => wealthArticleText(article).split("\n")),
    ...WEALTH_TOOLS.flatMap((tool) => [tool.title, tool.blurb]),
    ...PILLARS.flatMap((pillar) => [pillar.title, pillar.line, pillar.cta]),
    ...JOURNEY.flatMap((entry) => [entry.title, ...entry.body]),
    ...FIRST_1000_TREE.flatMap((node) => [node.question, node.help ?? ""]),
    ...FIRST_1000_RESULTS.flatMap((result) => [result.title, result.summary, ...result.steps, result.watchOut]),
    ...PERSONALITIES.flatMap((type) => [type.tagline, type.summary, ...type.strengths, ...type.blindSpots]),
    ...PERSONALITY_QUESTIONS.map((question) => question.question),
  ];
  // Long string literals in the pages: FAQ answers, descriptions, takeaways.
  const pageStrings = HUB_FILES.filter((file) => file.endsWith(".tsx")).flatMap((file) =>
    [...readFileSync(file, "utf8").matchAll(/"((?:[^"\\\n]|\\.){40,})"/g)].map((match) => match[1]),
  );
  const sentences = [...data, ...pageStrings]
    .flatMap((text) => text.split(/(?<=[.?!:])\s+/))
    .filter((sentence) => !sentence.startsWith("M") || !/^M[\d.]/.test(sentence));

  it("keeps every sentence to 25 words or fewer", () => {
    const long = sentences.filter((sentence) => sentence.split(/\s+/).filter(Boolean).length > 25);
    expect(long).toEqual([]);
  });

  it("does not hedge", () => {
    expect([...data, ...pageStrings].filter((text) => HEDGES.test(text))).toEqual([]);
  });

  it("uses no banned phrases", () => {
    expect([...data, ...pageStrings].filter((text) => BANNED.test(text))).toEqual([]);
  });
});

describe("tools and navigation", () => {
  it("includes every hub route in both discovery documents", async () => {
    const urls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
    const text = await discoveryText().text();
    const paths = [
      ...ROUTES,
      ...PERSONALITIES.map((type) => `/wealth/quiz/money-personality/${type.id}`),
    ].filter((route) => route.startsWith("/wealth") || route === "/links");
    for (const route of paths) {
      expect(urls.has(route), route).toBe(true);
      expect(text, route).toContain(`${route})`);
    }
  });

  it("uses hub images and authorship for article structured data", () => {
    const data = wealthArticleJsonLd({ headline: "A money question", description: "A 2-minute answer", path: "/wealth/learn/emergency-funds", datePublished: "2026-10-06", dateModified: "2026-10-07" });
    expect(new URL(data.image).pathname).toBe("/wealth/opengraph-image");
    expect(new URL(data.author.url).pathname).toBe("/wealth/journey");
    expect(data.publisher["@type"]).toBe("Person");
  });
  it("links only to pages that exist", () => {
    const hrefs = [
      ...WEALTH_TOOLS.map((tool) => tool.href),
      ...WEALTH_NAV.map((item) => item.href),
      ...PILLARS.map((pillar) => pillar.href),
    ];
    for (const href of hrefs) expect(routeExists(href), href).toBe(true);
  });

  it("has unique tool slugs", () => {
    const slugs = WEALTH_TOOLS.map((tool) => tool.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("ships both downloads", () => {
    for (const file of [BUDGET_FILE, ANALYZER_FILE]) {
      const full = path.join(root, "public", file);
      expect(existsSync(full), file).toBe(true);
      expect(statSync(full).size).toBeGreaterThan(1000);
    }
  });
});

describe("articles", () => {
  it("seeds six with unique slugs", () => {
    expect(WEALTH_ARTICLES).toHaveLength(6);
    expect(new Set(WEALTH_ARTICLES.map((article) => article.slug)).size).toBe(6);
  });

  for (const article of WEALTH_ARTICLES) {
    describe(article.slug, () => {
      const text = wealthArticleText(article);

      it("is a real read, not a stub", () => {
        const words = text.split(/\s+/).filter(Boolean).length;
        expect(words).toBeGreaterThanOrEqual(380);
        expect(words).toBeLessThanOrEqual(900);
      });

      it("keeps the meta description under 160 characters", () => {
        expect(article.description.length).toBeLessThanOrEqual(160);
        expect(article.metaTitle.length).toBeLessThanOrEqual(70);
      });

      it("has 3 to 5 FAQs and at least one source", () => {
        expect(article.faq.length).toBeGreaterThanOrEqual(3);
        expect(article.faq.length).toBeLessThanOrEqual(5);
        expect(article.sources.length).toBeGreaterThanOrEqual(1);
        for (const source of article.sources) expect(source.href).toMatch(/^https:\/\//);
      });

      it("ends with a related tool and related articles that exist", () => {
        expect(WEALTH_TOOLS.some((tool) => tool.slug === article.relatedTool)).toBe(true);
        for (const slug of article.relatedArticles) expect(getWealthArticle(slug), slug).toBeDefined();
      });

      it("uses no hashtags", () => {
        expect(text).not.toMatch(/#\w/);
      });
    });
  }

  it("keeps the 2026 IRS figures consistent", () => {
    const roth = wealthArticleText(getWealthArticle("what-is-a-roth-ira")!);
    expect(roth).toContain("$7,500");
    expect(roth).toContain("$153,000 and $168,000");
    expect(roth).toContain("$242,000 and $252,000");
    expect(roth).toContain("$24,500");
  });
});

describe("first $1,000 quiz", () => {
  it("has no dead ends", () => {
    for (const node of FIRST_1000_TREE) {
      expect(node.options.length).toBeGreaterThanOrEqual(2);
      for (const option of node.options) {
        const target = option.next.startsWith("result:")
          ? getPlanResult(option.next.slice(7))
          : getTreeNode(option.next);
        expect(target, `${node.id} -> ${option.next}`).toBeDefined();
      }
    }
  });

  it("can reach every result, in five questions or fewer", () => {
    const reached = new Set<string>();
    const walk = (id: string, depth: number) => {
      expect(depth).toBeLessThanOrEqual(5);
      for (const option of getTreeNode(id)!.options) {
        if (option.next.startsWith("result:")) reached.add(option.next.slice(7));
        else walk(option.next, depth + 1);
      }
    };
    walk(FIRST_1000_START, 1);
    expect([...reached].sort()).toEqual(FIRST_1000_RESULTS.map((result) => result.id).sort());
  });

  it("links every result to real pages", () => {
    for (const result of FIRST_1000_RESULTS) {
      expect(result.steps.length).toBeGreaterThanOrEqual(3);
      for (const link of result.links) expect(routeExists(link.href), link.href).toBe(true);
    }
  });
});

describe("money personality quiz", () => {
  it("has 8 questions, each with one answer per type", () => {
    expect(PERSONALITY_QUESTIONS).toHaveLength(8);
    for (const question of PERSONALITY_QUESTIONS) {
      expect(question.options.map((option) => option.type).sort()).toEqual(["ghost", "grinder", "vault", "vibe"]);
    }
  });

  it("has 4 types with strengths, blind spots and next steps", () => {
    expect(PERSONALITIES).toHaveLength(4);
    for (const type of PERSONALITIES) {
      expect(type.strengths).toHaveLength(3);
      expect(type.blindSpots).toHaveLength(3);
      expect(type.nextSteps).toHaveLength(3);
      for (const link of type.nextSteps) expect(routeExists(link.href), link.href).toBe(true);
    }
  });

  it("scores the most common answer as the winner", () => {
    expect(scorePersonality(["vault", "vault", "vibe", "vault", "ghost", "vault", "grinder", "vault"]).winner).toBe("vault");
    const tie = scorePersonality(["vault", "vault", "vault", "vault", "vibe", "vibe", "vibe", "vibe"]);
    expect(tie.winner).toBe("vibe");
    expect(tie.counts).toEqual({ vault: 4, vibe: 4, ghost: 0, grinder: 0 });
  });
});

describe("journey", () => {
  it("is newest first with real ISO dates", () => {
    for (const entry of JOURNEY) expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const days = JOURNEY.map((entry) => entry.day);
    expect(days).toEqual([...days].sort((a, b) => b - a));
  });
});
