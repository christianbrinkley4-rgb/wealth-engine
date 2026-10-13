import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { localBusinessJsonLd, SITE_OWNER_PHONE, SITE_URL, speakableJsonLd } from "@/lib/seo";

const root = join(__dirname, "..", "..");

function src(path: string): string {
  return readFileSync(join(root, path), "utf8");
}

describe("pixel events the ad campaign needs", () => {
  it("fires Contact when Christian's number is tapped and Lead when the AEP quiz is finished", () => {
    expect(src("app/components/Analytics.tsx")).toMatch(/fbq\?\.\("track", "Contact"\)/);
    expect(src("app/components/Analytics.tsx")).toMatch(/trackMetaContact\(\)/);
    expect(src("app/aep-quiz/AepQuiz.tsx")).toMatch(/trackLeadOnce\(eventId, "medicare"\)/);
  });
});

describe("location pages share one business record", () => {
  it("uses the same phone in InsuranceAgency schema and speakable hero selectors", () => {
    const graph = JSON.stringify(localBusinessJsonLd());
    expect(graph).toContain(SITE_OWNER_PHONE);
    expect(graph).toContain("InsuranceAgency");
    expect(graph).toContain('"price":"0"');
    expect(speakableJsonLd().speakable.cssSelector).toEqual([".sh-title", ".sh-lede"]);
    const pointed = speakableJsonLd([".sh-title", ".sh-lede"], "/medicare-agent-greensboro-nc");
    expect(pointed["@id"]).toBe(`${SITE_URL}/medicare-agent-greensboro-nc`);
    expect(pointed["@type"]).toBe("WebPage");
    expect(src("app/medicare-agent-greensboro-nc/page.tsx")).toContain(
      '<LocationBusinessMarkup path={path} />',
    );
    expect(src("app/medicare-in/[city]/page.tsx")).toContain("<LocationBusinessMarkup");
  });
});
