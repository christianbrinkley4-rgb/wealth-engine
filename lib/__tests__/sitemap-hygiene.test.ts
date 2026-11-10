import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";
import { isOffTopicPath } from "@/lib/indexFocus";
import { LOCATION_CONSOLIDATIONS } from "@/lib/locationConsolidation";

// Search Console "Redirect error" and "Excluded by noindex" (Nov 9, 2026).
// Every sitemap URL must be a final, indexable, self-canonical page.
// Live check after deploy: node scripts/check-sitemap-live.mjs <origin>

const ROOT = join(__dirname, "..", "..");
const paths = sitemap().map((entry) => new URL(entry.url).pathname);

describe("sitemap hygiene", () => {
  it("no consolidation redirect lands on a #fragment", () => {
    for (const [source, destination] of Object.entries(LOCATION_CONSOLIDATIONS)) {
      expect(destination, source).not.toContain("#");
    }
  });

  it("no consolidation destination is itself redirected (one hop)", () => {
    for (const [source, destination] of Object.entries(LOCATION_CONSOLIDATIONS)) {
      expect(LOCATION_CONSOLIDATIONS[destination], source).toBeUndefined();
    }
  });

  it("lists no redirect source and no off-topic (noindex) page", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    const sources = new Set([
      ...Object.keys(LOCATION_CONSOLIDATIONS),
      ...redirects.map((r) => r.source),
    ]);
    for (const path of paths) {
      expect(sources.has(path), `${path} redirects`).toBe(false);
      expect(isOffTopicPath(path), `${path} is noindex`).toBe(false);
    }
  });

  it("the Creedmoor pages restored in #46 stay live and in the sitemap", () => {
    for (const path of ["/medicare-creedmoor-nc", "/medicare-agent-creedmoor-nc"]) {
      expect(LOCATION_CONSOLIDATIONS[path], path).toBeUndefined();
      expect(paths, path).toContain(path);
    }
  });

  it("the plan checklist tool canonicals to itself, not to a redirect", () => {
    const source = readFileSync(join(ROOT, "app/plan-checklist-tool/page.tsx"), "utf8");
    expect(source).toContain('const path = "/plan-checklist-tool";');
    expect(paths).toContain("/plan-checklist-tool");
  });

  it("live pages link no consolidated URL (link the final page directly)", () => {
    const pages = readdirSync(join(ROOT, "app"), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("[") && !entry.name.startsWith("_"))
      .map((entry) => entry.name)
      .filter((name) => !LOCATION_CONSOLIDATIONS[`/${name}`] && existsSync(join(ROOT, "app", name, "page.tsx")));
    expect(pages).toContain("medicare-agent-greensboro-nc");
    for (const name of pages) {
      const source = readFileSync(join(ROOT, "app", name, "page.tsx"), "utf8");
      for (const consolidated of Object.keys(LOCATION_CONSOLIDATIONS)) {
        expect(source, `${name} links ${consolidated}`).not.toContain(`href="${consolidated}"`);
      }
    }
  });

  it("the sitewide footer links no consolidated URL and sends Creedmoor to its restored page", () => {
    const footer = readFileSync(join(ROOT, "app/components/SiteFooter.tsx"), "utf8");
    for (const consolidated of Object.keys(LOCATION_CONSOLIDATIONS)) {
      expect(footer, `footer links ${consolidated}`).not.toContain(`href="${consolidated}"`);
    }
    expect(footer).toContain('<Link href="/medicare-creedmoor-nc">Medicare in Creedmoor</Link>');
  });

  it("the towns hub Creedmoor card links the restored Creedmoor pages", () => {
    const hub = readFileSync(join(ROOT, "app/medicare-nc-towns/page.tsx"), "utf8");
    expect(hub).toMatch(/name: "Creedmoor",\s+href: "\/medicare-creedmoor-nc",\s+agentHref: "\/medicare-agent-creedmoor-nc"/);
  });
});
