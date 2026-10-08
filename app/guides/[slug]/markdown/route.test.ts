import { describe, expect, it } from "vitest";
import { GET, generateStaticParams } from "./route";
import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";

describe("guide markdown route", () => {
  it("generates static params for every traffic guide", () => {
    const params = generateStaticParams();
    expect(params.length).toBe(TRAFFIC_GUIDES.length);
    expect(params[0]).toHaveProperty("slug");
  });

  it("serves markdown with the right content type", async () => {
    const slug = TRAFFIC_GUIDES[0].slug;
    const res = await GET(new Request("http://localhost/"), {
      params: Promise.resolve({ slug }),
    });
    expect(res.headers.get("Content-Type")).toContain("text/markdown");
    const text = await res.text();
    expect(text).toContain(`# ${TRAFFIC_GUIDES[0].title}`);
    expect(text).toContain("## Quick answer");
    expect(text).toContain(TRAFFIC_GUIDES[0].answer);
    expect(text).toContain("## Frequently asked questions");
    expect(text).toContain("## Sources");
    // No em dashes in the markdown output
    expect(text).not.toContain("\u2014");
  });

  it("markdown content mirrors the guide data exactly", async () => {
    const guide = TRAFFIC_GUIDES[1];
    const res = await GET(new Request("http://localhost/"), {
      params: Promise.resolve({ slug: guide.slug }),
    });
    const text = await res.text();
    for (const section of guide.sections) {
      expect(text).toContain(`## ${section.title}`);
      expect(text).toContain(section.body);
    }
    for (const faq of guide.faqs) {
      expect(text).toContain(faq.q);
      expect(text).toContain(faq.a);
    }
  });
});
