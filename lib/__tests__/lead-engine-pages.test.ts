import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { isOffTopicPath } from "@/lib/indexFocus";
import { getBrackets } from "@/lib/irmaa";
import {
  IRMAA_SHARE_OF_PART_B_PERCENT,
  SEPARATE_RETURN_FIRST_LINE_2026,
  SEPARATE_RETURN_IRMAA_2026,
  SEPARATE_RETURN_TOP_LINE_2026,
} from "@/lib/irmaaMarried2026";
import { PART_D_IRMAA_2026 } from "@/lib/medicareCosts2026";

/**
 * Guard rails for the Lead-to-Appointment Engine build (November 2026).
 *
 * These read the source of every file the build added and check the rules
 * from the build brief: no em dashes, cost wording, no plan or insurer names,
 * no savings promises, no photo, only verified figures, and the search
 * settings of each page.
 */

const ROOT = join(__dirname, "..", "..");
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");
const paths = sitemap().map((entry) => new URL(entry.url).pathname);

/** Pages people find in search. */
const SEARCH_PAGES = [
  { path: "/irmaa-checker", file: "app/irmaa-checker/page.tsx" },
  { path: "/irmaa-married-filing-jointly", file: "app/irmaa-married-filing-jointly/page.tsx" },
  { path: "/part-d-irmaa", file: "app/part-d-irmaa/page.tsx" },
  { path: "/medicare-cost-greensboro-nc", file: "app/medicare-cost-greensboro-nc/page.tsx" },
] as const;

/** Every file whose text a visitor can read. */
const PUBLIC_FILES = [
  ...SEARCH_PAGES.map((page) => page.file),
  "app/irmaa-checker/IrmaaChecker.tsx",
  "app/appointment-prep/page.tsx",
  "app/appointment-prep/IntakeForm.tsx",
  "app/components/PlainPageParts.tsx",
  "lib/irmaaChecker.ts",
  "lib/irmaaMarried2026.ts",
];

/** Every file the build added, including tests and the private page. */
const ALL_NEW_FILES = [
  ...PUBLIC_FILES,
  "app/prep-sheet/page.tsx",
  "app/prep-sheet/PrepSheetBuilder.tsx",
  "app/prep-sheet/prep-sheet.css",
  "app/api/prep-intake/route.ts",
  "lib/prepSheet.ts",
  "scripts/report-attribution.mjs",
  "lib/__tests__/irmaaChecker.test.ts",
  "lib/__tests__/tool-lead-capture.test.ts",
  "lib/__tests__/prep-sheet.test.ts",
  "lib/__tests__/prep-intake-route.test.ts",
  "lib/__tests__/attribution-report.test.ts",
  "lib/__tests__/lead-engine-pages.test.ts",
  "BUILD-STATE.md",
];

const EM_DASH = String.fromCharCode(0x2014);

describe("every new file", () => {
  it.each(ALL_NEW_FILES)("%s exists and has no em dash", (file) => {
    expect(existsSync(join(ROOT, file)), file).toBe(true);
    const source = read(file);
    expect(source.includes(EM_DASH), `${file} has an em dash`).toBe(false);
    // This file spells the entity out in the pattern itself, so it is skipped here.
    if (!file.endsWith("lead-engine-pages.test.ts")) {
      expect(source, file).not.toMatch(/&mdash;|&#8212;|&#x2014;/i);
    }
  });
});

describe("public copy rules", () => {
  it.each(PUBLIC_FILES)('%s never says "free"', (file) => {
    expect(read(file)).not.toMatch(/\bfree\b/i);
  });

  it.each(PUBLIC_FILES)("%s names no insurance company", (file) => {
    expect(read(file)).not.toMatch(
      /blue ?cross|bcbs|humana|aetna|united ?health|uhc\b|cigna|well ?care|devoted|alignment|kaiser|anthem|mutual of omaha|bankers|health ?team|firstcarolina|centene|healthspring|medicareadvantage\.com/i,
    );
  });

  it.each(PUBLIC_FILES)("%s names no plan", (file) => {
    // No lettered supplement plan and no branded plan type.
    expect(read(file)).not.toMatch(/\bPlan [A-N]\b/);
  });

  it.each(PUBLIC_FILES)("%s promises no savings", (file) => {
    expect(read(file)).not.toMatch(
      /you (will|can|could|may) save|save (up to|money|hundreds|thousands)|guarantee|lowest (price|premium|cost)|best plan/i,
    );
  });

  it.each(PUBLIC_FILES)("%s shows no photo", (file) => {
    expect(read(file)).not.toMatch(
      /<Image\b|<img\b|next\/image|<MedicareByline|<KitchenTableClose|christian-brinkley.*\.(jpg|png|webp)/,
    );
  });

  it("the closer says the question goes to Christian only", () => {
    const parts = read("app/components/PlainPageParts.tsx");
    expect(parts).toContain("Your question goes to {AGENT.name} only.");
    expect(parts).not.toContain("No cost, no obligation.");
  });
});

describe("search pages", () => {
  it.each(SEARCH_PAGES)("$path is in the sitemap and is not kept out of search", ({ path }) => {
    expect(paths).toContain(path);
    expect(isOffTopicPath(path)).toBe(false);
  });

  it.each(SEARCH_PAGES)("$path follows the page template", ({ path, file }) => {
    const source = read(file);
    expect(source).toContain(`const PATH = "${path}";`);
    expect(source).toContain("alternates: { canonical: PATH }");
    expect(source).toContain("breadcrumbJsonLd(");
    expect(source).toContain("articleJsonLd(");
    expect(source).toContain("faqJsonLd(FAQS)");
    expect(source).toContain('<ComplianceDisclosure variant="medicare"');
    expect(source).toContain("<SourceList");
    expect(source).toContain("<TextByline");
    expect(source).not.toContain("robots:");
  });

  it.each(SEARCH_PAGES)("$path uses ResponsiveTable for every table", ({ file }) => {
    const source = read(file);
    expect(source).not.toMatch(/<table\b/);
    expect(source).toContain("<ResponsiveTable");
  });

  it("no new town page was added", () => {
    // /medicare-cost-greensboro-nc is a cost answer page that the build brief
    // asked for. It is the only new path with a town name in it.
    const withTown = SEARCH_PAGES.map((page) => page.path).filter((path) =>
      /greensboro|high-point|winston|creedmoor|burlington|kernersville/.test(path),
    );
    expect(withTown).toEqual(["/medicare-cost-greensboro-nc"]);
  });

  it("the checker labels its year and uses the existing capture form", () => {
    const page = read("app/irmaa-checker/page.tsx");
    const tool = read("app/irmaa-checker/IrmaaChecker.tsx");
    expect(page).toContain("IRMAA Checker ${YEAR}");
    expect(page).toContain("const YEAR = IRMAA_CHECKER_YEAR;");
    expect(tool).toContain('from "@/components/EmailResultsCapture"');
    expect(tool).toContain("<EmailResultsCapture");
    expect(tool).toContain('from "@/lib/irmaaChecker"');
    // The checker holds no bracket amounts of its own.
    expect(tool).not.toMatch(/109[,_]?000|202\.9|284\.1/);
  });

  it("the tools hub links the checker", () => {
    expect(read("app/tools/page.tsx")).toContain('href: "/irmaa-checker"');
  });
});

describe("figures", () => {
  /**
   * Dollar amounts that may be typed into a search page.
   * Section 2 of the build brief: $202.90, $283, $2,100, $2,400, $700,
   * $9,850, $14,800, $209.40, $292.
   * CMS 2026 fact sheet, already in lib/: $109,000, $218,000, $391,000, $615.
   * CMS 2027 fact sheet, November 17, 2026: $15.40, $96.40, $224,000.
   * $230,000 is the income in a worked example, not a Medicare figure.
   */
  const ALLOWED = new Set([
    "$0",
    "$0.00",
    "$202.90",
    "$283",
    "$2,100",
    "$2,400",
    "$700",
    "$615",
    "$9,850",
    "$14,800",
    "$209.40",
    "$292",
    "$109,000",
    "$218,000",
    "$391,000",
    "$230,000",
    "$15.40",
    "$96.40",
    "$224,000",
  ]);

  it.each(SEARCH_PAGES)("$path types no dollar amount outside the verified list", ({ file }) => {
    const typed = read(file).match(/\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
    for (const amount of typed) {
      expect(ALLOWED.has(amount), `${file} contains ${amount}`).toBe(true);
    }
  });

  it("the separate-return table uses the same amounts as the fourth and fifth tiers", () => {
    const tiers = getBrackets("individual");
    const [standard, middle, top] = SEPARATE_RETURN_IRMAA_2026;

    expect(standard.partBPremium).toBe(tiers[0].partBPremium);
    expect(standard.partDSurcharge).toBe(0);

    expect(middle.partBPremium).toBe(tiers[4].partBPremium);
    expect(middle.partBSurcharge).toBe(tiers[4].irmaaSurcharge);
    expect(middle.partDSurcharge).toBe(PART_D_IRMAA_2026[4].surcharge);

    expect(top.partBPremium).toBe(tiers[5].partBPremium);
    expect(top.partBSurcharge).toBe(tiers[5].irmaaSurcharge);
    expect(top.partDSurcharge).toBe(PART_D_IRMAA_2026[5].surcharge);

    expect(SEPARATE_RETURN_FIRST_LINE_2026).toBe(tiers[0].maxIncome);
    expect(SEPARATE_RETURN_TOP_LINE_2026).toBe(391_000);
    expect(middle.income).toBe("More than $109,000, less than $391,000");
    expect(IRMAA_SHARE_OF_PART_B_PERCENT).toBe(8);
  });

  it("the Greensboro page takes its amounts from the shared constants", () => {
    const source = read("app/medicare-cost-greensboro-nc/page.tsx");
    for (const name of [
      "STANDARD_BASE_PREMIUM_2026",
      "PART_B_2026.annualDeductible",
      "PART_D_2026.outOfPocketCap",
      "PART_D_2026.maximumDeductible",
      "PART_B_MONTHLY",
      "PART_B_DEDUCTIBLE",
      "MA_PART_D_DEDUCTIBLE",
    ]) {
      expect(source, name).toContain(name);
    }
    expect(source).toContain("2027 is final");
    expect(source).toContain("const PART_D_CAP_2027 = 2400;");
    expect(source).toContain("const MA_MAX_IN_NETWORK_2027 = 9850;");
    expect(source).toContain("const MA_MAX_COMBINED_2027 = 14800;");
  });
});

describe("what the build must not touch", () => {
  it("did not add a calendar embed", () => {
    for (const file of PUBLIC_FILES) {
      expect(read(file), file).not.toMatch(/cal\.com\/embed|calendly|<iframe/i);
    }
  });

  it("did not add a drug plan comparison", () => {
    for (const file of [...PUBLIC_FILES, "app/prep-sheet/PrepSheetBuilder.tsx", "lib/prepSheet.ts"]) {
      expect(read(file), file).not.toMatch(/formulary|contract ?id|H\d{4}-\d{3}|S\d{4}-\d{3}/i);
    }
  });
});
