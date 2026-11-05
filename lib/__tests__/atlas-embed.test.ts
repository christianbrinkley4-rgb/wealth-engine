import { describe, expect, it } from "vitest";

import { TPMO_DISCLAIMER } from "@/lib/agent";
import {
  ATLAS_COUNTIES,
  ATLAS_PAGE_PATH,
  atlasCounty,
  atlasEmbedCode,
  pickCounty,
  renderAtlasEmbed,
} from "@/lib/atlasEmbed";

describe("NC Medicare Atlas embed", () => {
  it("covers all 100 North Carolina counties", () => {
    expect(ATLAS_COUNTIES).toHaveLength(100);
    for (const county of ATLAS_COUNTIES) expect(atlasCounty(county)).not.toBeNull();
  });

  it("only opens on a real county", () => {
    expect(pickCounty("forsyth")).toBe("Forsyth");
    expect(pickCounty(" Guilford ")).toBe("Guilford");
    expect(pickCounty("Atlantis")).toBe("Guilford");
    expect(pickCounty(null)).toBe("Guilford");
    expect(pickCounty('"><script>')).toBe("Guilford");
  });

  it("renders a standalone page with every county and the required disclosures", () => {
    const html = renderAtlasEmbed("Forsyth");
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('<option value="Forsyth" selected>');
    expect(html.match(/<option /g)).toHaveLength(100);
    expect(html).toContain(TPMO_DISCLAIMER);
    expect(html).toContain("1-800-MEDICARE");
    expect(html).toContain("SHIIP");
    expect(html).toContain('name="robots" content="noindex"');
  });

  it("never shows plan IDs, em dashes or ending counts", () => {
    const html = renderAtlasEmbed("Guilford");
    expect(html).not.toMatch(/\b[HRS]\d{4}-\d{3}\b/);
    expect(html).not.toMatch(/[–—]/);
    expect(html.toLowerCase()).not.toContain("ending");
  });

  it("gives partners a real credit link outside the iframe", () => {
    const code = atlasEmbedCode("Alamance");
    expect(code).toContain(
      'src="https://christianbrinkleync.com/embed/county-medicare?county=Alamance"',
    );
    expect(code).toContain(`<a href="https://christianbrinkleync.com${ATLAS_PAGE_PATH}">`);
    expect(code).not.toMatch(/[–—]/);
    expect(atlasEmbedCode()).not.toContain("?county=");
    expect(code).toContain(`e.origin!=="https://christianbrinkleync.com"`);
  });
});
