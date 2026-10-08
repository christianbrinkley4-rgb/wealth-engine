import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { IRMAA_NOTE, NON_FIGURE_CELLS, SECTIONS } from "@/app/numbers/data";
import { NUMBERS_METADATA } from "@/app/numbers/meta";

const root = (p: string) => resolve(process.cwd(), p);
const read = (p: string) => readFileSync(root(p), "utf8");

describe("numbers hub: metadata limits", () => {
  it("keeps the title at 60 characters or fewer", () => {
    const title = NUMBERS_METADATA.title;
    const text = typeof title === "string" ? title : (title as { absolute: string }).absolute;
    expect(text.length).toBeLessThanOrEqual(60);
  });

  it("keeps the description at 160 characters or fewer", () => {
    const description = NUMBERS_METADATA.description as string;
    expect(description.length).toBeLessThanOrEqual(160);
  });

  it("sets the canonical path", () => {
    expect(NUMBERS_METADATA.alternates?.canonical).toBe("/numbers");
  });
});

describe("numbers hub: every figure is site-verified", () => {
  it("finds each figure verbatim in its declared source file", () => {
    const missing: string[] = [];
    for (const section of SECTIONS) {
      for (const row of section.rows) {
        const source = read(row.sourceFile);
        for (const cell of [row.y2026, row.y2027]) {
          if (NON_FIGURE_CELLS.has(cell)) continue;
          if (!source.includes(cell)) {
            missing.push(`${section.id} / ${row.label}: "${cell}" not in ${row.sourceFile}`);
          }
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("keeps the 2027 Medicare figures aligned with the shared numbers module", () => {
    const source = read("lib/medicareNumbers2027.ts");
    for (const pair of ["$700", "$2,400", "$209.50", "$292", "$12"]) {
      expect(source).toContain(pair);
    }
    const hub = read("app/numbers/data.ts");
    for (const pair of ["$700", "$2,400", "209.50", "292", "$12"]) {
      expect(hub).toContain(pair);
    }
  });

  it("keeps the IRMAA first thresholds aligned with the IRMAA guide", () => {
    const source = read(IRMAA_NOTE.sourceFile);
    expect(source).toContain("$109,000");
    expect(source).toContain("$218,000");
    const hub = read("app/numbers/data.ts");
    expect(hub).toContain("$109,000");
    expect(hub).toContain("$218,000");
  });
});

describe("numbers hub: page quality", () => {
  it("renders WebPage, speakable, Article, and Dataset schema", () => {
    const page = read("app/numbers/page.tsx");
    expect(page).toContain('"@type": "WebPage"');
    expect(page).toContain("speakable");
    expect(page).toContain('"@type": "Dataset"');
    expect(page).toContain("articleJsonLd");
  });

  it("shows the last-updated date on the page", () => {
    const page = read("app/numbers/page.tsx");
    expect(page).toContain("LAST_UPDATED_LABEL");
    const data = read("app/numbers/data.ts");
    expect(data).toContain("October 8, 2026");
  });

  it("contains no em dashes in page copy", () => {
    for (const f of ["app/numbers/page.tsx", "app/numbers/data.ts", "app/numbers/meta.ts"]) {
      expect(read(f)).not.toContain("—");
    }
  });
});

describe("numbers hub: site wiring", () => {
  it("lists /numbers in the sitemap", () => {
    expect(read("app/sitemap.ts")).toContain('"/numbers"');
  });

  it("mentions /numbers in the llms indexes", () => {
    expect(read("app/llms.txt/route.ts")).toContain("/numbers");
    expect(read("app/llms-full.txt/route.ts")).toContain("/numbers");
  });

  it("links /numbers from the footer", () => {
    expect(read("app/components/SiteFooter.tsx")).toContain("/numbers");
  });

  it("links /numbers from the /wealth hub", () => {
    expect(read("app/wealth/page.tsx")).toContain("/numbers");
  });
});
