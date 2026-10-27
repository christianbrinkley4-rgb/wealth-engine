import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";

const ROOT = join(__dirname, "..", "..");
const flat = (text: string) => text.replace(/\s+/g, " ");
const page = flat(readFileSync(join(ROOT, "app/state-health-plan-checklist/page.tsx"), "utf8"));
const guide = flat(readFileSync(join(ROOT, "app/guides/nc-state-health-plan-medicare/page.tsx"), "utf8"));

describe("State Health Plan Nov 6 checklist", () => {
  it("is in the sitemap and linked from the guide", () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(paths).toContain("/state-health-plan-checklist");
    expect(guide).toContain('href="/state-health-plan-checklist"');
  });

  it("only states facts the verified guide also states", () => {
    for (const fact of ["833-429-5003", "855-859-0966", "$4,000 to $4,500", "$3,300 to $3,700", "three-tier provider network", "$50 copay", "access", "January 1, 2021"]) {
      expect(page, fact).toContain(fact);
      expect(guide, fact).toContain(fact);
    }
  });

  it("never says Atrium is out of network and never names an insurer", () => {
    expect(page).not.toMatch(/out-of-network tier|out of network for 2027/i);
    expect(page).not.toMatch(/humana|aetna|united ?health|blue ?cross|wellcare|devoted|healthteam|cigna|anthem/i);
    expect(page).not.toMatch(/—/);
  });
});
