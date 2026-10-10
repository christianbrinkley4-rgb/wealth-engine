import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { handoffDestination } from "@/lib/analytics";
import { COUNTY_COUNSELING, countyCounseling, NC_SHIIP } from "@/lib/localMedicareFacts";
import { TRIAD_CITIES } from "@/lib/triad";

const HANDWRITTEN = ["butner", "graham", "ramseur", "liberty"] as const;

describe("free counseling contacts on town pages", () => {
  it("lists only contacts with an https source and a check date", () => {
    for (const contact of [NC_SHIIP, ...Object.values(COUNTY_COUNSELING)]) {
      expect(new URL(contact.sourceUrl).protocol).toBe("https:");
      expect(contact.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(contact.phoneHref).toBe(`tel:+1${contact.phone.replace(/\D/g, "")}`);
      // Every source is reported as a SHIIP hand-off, never as a call to Christian.
      expect(handoffDestination(contact.sourceUrl)).toBe("nc_shiip");
    }
  });

  it("keys local contacts by a county the town data actually uses", () => {
    const counties = new Set(TRIAD_CITIES.map((city) => city.county));
    for (const county of Object.keys(COUNTY_COUNSELING)) expect(counties.has(county)).toBe(true);
    expect(countyCounseling("Forsyth County")?.phone).toBe("336-748-0217");
    // No verified local contact yet: the page falls back to the statewide line.
    expect(countyCounseling("Guilford County")).toBeNull();
  });

  it("keeps the four hand-written town pages hand-written", () => {
    for (const town of HANDWRITTEN) {
      const source = readFileSync(`app/medicare-${town}-nc/page.tsx`, "utf8");
      expect(source).toContain("Local Resources Worth Knowing");
      expect(source).not.toContain("LocalMedicarePage");
    }
  });
});
