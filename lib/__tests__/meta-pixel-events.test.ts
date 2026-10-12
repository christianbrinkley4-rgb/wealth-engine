import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { localBusinessJsonLd, SITE_OWNER_PHONE, speakableJsonLd } from "@/lib/seo";

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
  it("uses the same phone in ProfessionalService schema and speakable hero selectors", () => {
    const graph = JSON.stringify(localBusinessJsonLd());
    expect(graph).toContain(SITE_OWNER_PHONE);
    expect(graph).toContain("ProfessionalService");
    expect(graph).toContain('"price":"0"');
    expect(speakableJsonLd().speakable.cssSelector).toEqual([".sh-title", ".sh-lede"]);
    expect(src("app/medicare-agent-greensboro-nc/page.tsx")).toContain("<LocationBusinessMarkup />");
    expect(src("app/medicare-in/[city]/page.tsx")).toContain("<LocationBusinessMarkup />");
  });
});
