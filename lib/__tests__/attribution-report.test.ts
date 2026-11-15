import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { calculate, calculatorLeadLabel } from "@/app/greensboro-medicare-cost-calculator/data";
import { checkIrmaa, irmaaLeadLabel } from "@/lib/irmaaChecker";
import { CHECKLIST_CONTACT_REQUEST } from "@/lib/planChecklist";

import {
  parseArgs,
  referrerFor,
  renderHtml,
  renderText,
  safeOutPath,
  sampleData,
  summarize,
  toolFor,
  utmFor,
  weekOf,
  // @ts-expect-error The standalone local script is JavaScript.
} from "../../scripts/report-attribution.mjs";

/** Every row in this file is fictional. No real lead appears here. */

const ROOT = join(__dirname, "..", "..");
const NOW = new Date("2026-11-15T12:00:00Z");

describe("toolFor", () => {
  it("reads the tool name the three new tools really send", () => {
    expect(
      toolFor({
        source: "wizard_completion",
        irmaa_bracket: irmaaLeadLabel(checkIrmaa(150_000, "individual")),
      }),
    ).toBe("IRMAA checker (/irmaa-checker)");
    expect(
      toolFor({
        source: "wizard_completion",
        irmaa_bracket: calculatorLeadLabel(calculate({ age: 67, meds: 2, visits: 6 })),
      }),
    ).toBe("Greensboro cost calculator (/greensboro-medicare-cost-calculator)");
    expect(
      toolFor({ source: "wizard_completion", irmaa_bracket: CHECKLIST_CONTACT_REQUEST.irmaa_bracket }),
    ).toBe("Plan checklist (/plan-checklist-tool)");
  });

  it("keeps older leads in the tool that made them", () => {
    expect(toolFor({ source: "wizard_completion", irmaa_bracket: "Tier 1 IRMAA" })).toBe(
      "Medicare wizard (/medicare)",
    );
    expect(toolFor({ source: "roth_calculator", irmaa_bracket: "Plan 65, Standard" })).toBe(
      "Plan 65 planner (/plan)",
    );
    expect(toolFor({ source: "roth_calculator", irmaa_bracket: "Roth window, current" })).toBe(
      "Roth window calculator (/roth-window)",
    );
    expect(toolFor({ source: "help_quiz" })).toBe("Help quiz (/start)");
    expect(toolFor({ source: "quiz-2026" })).toBe("Plan check quiz (/plan-check)");
    expect(toolFor({ source: "about_page_cta" })).toBe("About page form");
    expect(toolFor({ source: null })).toBe("No source recorded");
    expect(toolFor({ source: "something_new" })).toBe("Other source: something_new");
  });
});

describe("campaign grouping", () => {
  it("groups by UTM source and medium, in lower case", () => {
    expect(utmFor({ attribution: { utm_source: "Facebook", utm_medium: "Social" } })).toBe(
      "facebook / social",
    );
    expect(utmFor({ attribution: null })).toBe("(no tag) / (no tag)");
    expect(utmFor({ attribution: "not an object" })).toBe("(no tag) / (no tag)");
  });

  it("names where an untagged visit came from, host only", () => {
    expect(referrerFor({ attribution: { utm_source: "google" } })).toBeNull();
    expect(referrerFor({ attribution: { referrer: "https://www.bing.com/search?q=private" } })).toBe(
      "bing.com",
    );
    expect(referrerFor({ attribution: { gclid: "sample" } })).toBe(
      "Google Ads click id, no UTM tag",
    );
    expect(referrerFor({ attribution: {} })).toBe("Direct, or referrer not recorded");
    expect(referrerFor({ attribution: { referrer: "not a url" } })).toBe(
      "Direct, or referrer not recorded",
    );
  });
});

describe("weekOf", () => {
  it("returns the Monday of the week, in UTC", () => {
    expect(weekOf("2026-11-15T23:59:00Z")).toBe("2026-11-09"); // Sunday
    expect(weekOf("2026-11-09T00:00:00Z")).toBe("2026-11-09"); // Monday
    expect(weekOf("2026-11-13T08:55:00Z")).toBe("2026-11-09"); // Friday
    expect(weekOf("not a date")).toBeNull();
  });
});

describe("summarize on the fictional sample", () => {
  const summary = summarize({ ...sampleData(), now: NOW, table: "leads", days: 90 });
  const count = (rows: Array<{ label: string; count: number }>, label: string) =>
    rows.find((row) => row.label === label)?.count;

  it("counts every lead once in each breakdown", () => {
    expect(summary.total).toBe(10);
    for (const rows of [summary.byTool, summary.byUtm, summary.byWeek]) {
      expect(rows.reduce((sum: number, row: { count: number }) => sum + row.count, 0)).toBe(10);
    }
  });

  it("breaks leads down by tool", () => {
    expect(count(summary.byTool, "IRMAA checker (/irmaa-checker)")).toBe(2);
    expect(count(summary.byTool, "Help quiz (/start)")).toBe(3);
    expect(count(summary.byTool, "Plan checklist (/plan-checklist-tool)")).toBe(1);
    expect(count(summary.byTool, "Medicare wizard (/medicare)")).toBe(1);
  });

  it("breaks leads down by UTM source and medium", () => {
    expect(count(summary.byUtm, "google / organic")).toBe(3);
    expect(count(summary.byUtm, "facebook / social")).toBe(2);
    expect(count(summary.byUtm, "(no tag) / (no tag)")).toBe(4);
    expect(count(summary.byReferrer, "bing.com")).toBe(1);
  });

  it("breaks leads down by week", () => {
    expect(summary.byWeek).toEqual([
      { label: "2026-11-02", count: 5 },
      { label: "2026-11-09", count: 5 },
    ]);
  });

  it("compares contact-step starts with completions", () => {
    expect(summary.funnel).toEqual([
      { label: "life_insurance", starts: 2, completions: 1, rate: 50 },
      { label: "medicare", starts: 4, completions: 2, rate: 50 },
    ]);
  });

  it("shows an empty week as zero and skips rows with no date", () => {
    const sparse = summarize({
      leads: [
        { created_at: "2026-10-05T10:00:00Z", source: "help_quiz" },
        { created_at: "2026-10-20T10:00:00Z", source: "help_quiz" },
        { created_at: null, source: "help_quiz" },
      ],
      now: NOW,
    });
    expect(sparse.total).toBe(2);
    expect(sparse.undated).toBe(1);
    expect(sparse.byWeek).toEqual([
      { label: "2026-10-05", count: 1 },
      { label: "2026-10-12", count: 0 },
      { label: "2026-10-19", count: 1 },
    ]);
    expect(sparse.funnel).toBeNull();
  });
});

describe("output", () => {
  const summary = summarize({ ...sampleData(), now: NOW, table: "leads", days: 90 });

  it("prints a plain text report with every section", () => {
    const text = renderText(summary);
    for (const heading of [
      "LEAD ATTRIBUTION REPORT",
      "Total leads: 10",
      "Leads by source tool",
      "Leads by UTM source / medium",
      "Leads by week (week starts Monday, UTC)",
      "Contact-step starts and completions (help quiz)",
      "medicare: 4 starts, 2 completions, 50% completed",
    ]) {
      expect(text).toContain(heading);
    }
  });

  it("says so when the starts table cannot be read", () => {
    const text = renderText(summarize({ leads: sampleData().leads, partials: null, now: NOW }));
    expect(text).toContain("Not available. The lead_events table could not be read.");
  });

  it("writes HTML that is noindex and escapes database text", () => {
    const hostile = summarize({
      leads: [
        {
          created_at: "2026-11-10T10:00:00Z",
          source: "<script>alert(1)</script>",
          attribution: { utm_source: '"><img src=x>', utm_medium: "x" },
        },
      ],
      now: NOW,
    });
    const html = renderHtml(hostile);
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<img src=x>");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("safety rules of the script", () => {
  const source = readFileSync(join(ROOT, "scripts/report-attribution.mjs"), "utf8");

  it("refuses to write the report into a folder the website serves", () => {
    for (const out of ["public/report.html", "app/report/page.html", ".next/x.html"]) {
      expect(() => safeOutPath(out, ROOT)).toThrow(/part of the website/);
    }
    expect(() => safeOutPath(".cache/attribution/x.txt", ROOT)).toThrow(/\.html/);
    expect(safeOutPath(".cache/attribution/x.html", ROOT)).toContain("attribution");
  });

  it("reads options and rejects unknown ones", () => {
    expect(parseArgs([])).toEqual({ days: 90, out: null, table: null, sample: false });
    expect(parseArgs(["--days=30", "--table=leads"])).toMatchObject({ days: 30, table: "leads" });
    expect(parseArgs(["--all", "--sample"])).toMatchObject({ days: null, sample: true });
    expect(() => parseArgs(["--days=0"])).toThrow();
    expect(() => parseArgs(["--table=users"])).toThrow();
    expect(() => parseArgs(["--nope"])).toThrow();
  });

  it("holds no key and takes the key from the environment", () => {
    expect(source).toContain("process.env.SUPABASE_SERVICE_ROLE_KEY");
    expect(source).not.toMatch(/eyJ[A-Za-z0-9_-]{10,}/); // a JWT
    expect(source).not.toMatch(/sb_secret_|service_role\s*[:=]\s*["'`]/);
    expect(source).not.toMatch(/https:\/\/[a-z0-9]{15,}\.supabase\.co/);
  });

  it("selects no contact column from the database", () => {
    const selects = [...source.matchAll(/select:\s*\n?\s*"([^"]+)"/g)].map((m) => m[1]);
    expect(selects.length).toBe(2);
    const all = `${selects.join(",")},created_at, interest_topic`;
    expect(all).not.toMatch(/email|full_name|phone|zip|quiz_answers|consent|ip_hint/);
  });

  it("is not imported by the app and is not a deployed route", () => {
    const sitemapSource = readFileSync(join(ROOT, "app/sitemap.ts"), "utf8");
    expect(sitemapSource).not.toContain("attribution-report");
    expect(source).not.toMatch(/from ["']@\//);
  });

  it("is wired to npm run report:attribution", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    expect(pkg.scripts["report:attribution"]).toBe("node scripts/report-attribution.mjs");
  });
});
