import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LOCAL_MEDICARE_TOWNS } from "@/lib/localMedicareFacts";
import { INDEXABLE_MEDICARE_SLUGS } from "@/lib/triad";
import { LocalMedicarePage } from "@/app/components/LocalMedicarePage";

describe("sourced local Medicare pages", () => {
  it("covers eight kept towns and the four identified handwritten pages", () => {
    expect(Object.keys(LOCAL_MEDICARE_TOWNS).sort()).toEqual([...INDEXABLE_MEDICARE_SLUGS, "butner", "graham", "ramseur", "liberty"].sort());
    const allowed = new Set(["www.guilfordcountync.gov", "www.senior-resources-guilford.org", "careers.conehealth.com", "library.greensboro-nc.gov", "www.highpointnc.gov", "www.wakehealth.edu", "forsyth.cc", "www.forsyth.cc", "www.shepherdscenter.org", "toknc.com", "www.novanthealth.org", "www.burlingtonnc.gov", "alamanceeldercare.com", "library.alamancecountync.gov", "www.summerfieldnc.gov", "www.jamestownpubliclibrary.com", "www.stokesdale.org", "www.butnernc.org", "www.granvillecounty.org", "www.dukehealth.org", "www.cityofgraham.com", "www.randolphcountync.gov", "www.ncdoi.gov", "www.randolphhealth.org", "www.randolphlibrary.org"]);
    for (const town of Object.values(LOCAL_MEDICARE_TOWNS)) {
      expect(town.facts).toHaveLength(4);
      expect(new Set(town.facts.map(fact => fact.kind)).size).toBe(4);
      for (const fact of town.facts) {
        const url = new URL(fact.sourceUrl);
        expect(url.protocol).toBe("https:"); expect(allowed.has(url.hostname) || ["library.nc.gov", "www.butnernc.gov"].includes(url.hostname)).toBe(true);
        expect(fact.checkedOn).toBe("2026-10-09"); expect(fact.body).not.toContain("—");
      }
    }
  });
  it("renders each source and consistent dated schema without a claimed meeting place", () => {
    for (const [key, town] of Object.entries(LOCAL_MEDICARE_TOWNS)) {
      const html = renderToStaticMarkup(createElement(LocalMedicarePage, { townKey: key }));
      for (const fact of town.facts) expect(html).toContain(fact.sourceUrl.replaceAll("&", "&amp;"));
      expect(html).toContain("2026-10-09");
      for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) expect(() => JSON.parse(match[1])).not.toThrow();
      expect(html).toContain("NC Life &amp; Health");
    }
  });
});
