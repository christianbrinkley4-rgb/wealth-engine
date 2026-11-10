import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import sitemap from "@/app/sitemap";
import { LOCAL_VISIBILITY_CITIES } from "@/lib/localVisibilityCities";
import { canonicalMedicareLocation, LOCATION_CONSOLIDATIONS } from "@/lib/locationConsolidation";
import { priorityCityMetadata } from "@/app/components/PriorityCityMedicarePage";

describe("local search routes", () => {
  it("keeps each released location reachable, linked, and listed once with its canonical", () => {
    const paths = sitemap().map((item) => new URL(item.url).pathname);
    const hub = readFileSync(resolve("app/medicare-nc-towns/page.tsx"), "utf8");
    for (const slug of Object.keys(LOCAL_VISIBILITY_CITIES) as Array<
      keyof typeof LOCAL_VISIBILITY_CITIES
    >) {
      const path = `/medicare-agent-${slug}-nc`;
      expect(existsSync(resolve(`app${path}/page.tsx`)), path).toBe(true);
      expect(LOCATION_CONSOLIDATIONS[path], path).toBeUndefined();
      expect(
        paths.filter((p) => p === path),
        path,
      ).toHaveLength(1);
      expect(priorityCityMetadata(slug).alternates?.canonical).toBe(path);
      expect(
        hub.includes(path) ||
          ["durham", "chapel-hill", "cary", "apex", "morrisville", "garner", "clayton"].includes(
            slug,
          ),
        path,
      ).toBe(true);
    }
    expect(LOCATION_CONSOLIDATIONS["/medicare-creedmoor-nc"]).toBeUndefined();
    expect(paths.filter((p) => p === "/medicare-creedmoor-nc")).toHaveLength(1);
    expect(paths.filter((p) => p === "/medicare-agent-creedmoor-nc")).toHaveLength(1);
    expect(canonicalMedicareLocation("/medicare-oxford-nc")).toBe("/medicare-agent-oxford-nc");
    expect(new Set(paths).size).toBe(paths.length);
  });
});
