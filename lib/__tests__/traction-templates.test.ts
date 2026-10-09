import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AGENT } from "@/lib/agent";
import { TrustFacts } from "@/app/components/TrustFacts";
import { siteIdentityJsonLd } from "@/lib/seo";
const mocks = vi.hoisted(() => ({ reviews: null as { count: number; rating: number; url: string } | null }));
vi.mock("@/lib/testimonials", () => ({ get GOOGLE_REVIEWS() { return mocks.reviews; } }));
afterEach(() => { Object.assign(AGENT, { npn: null }); mocks.reviews = null; });
describe("truthful trust facts", () => {
  it("shows the real license wording and neutral review link with no invented lookup or rating", () => {
    const html = renderToStaticMarkup(createElement(TrustFacts));
    expect(html).toContain("NC Life &amp; Health"); expect(html).toContain("Read or leave a Google review");
    expect(html).not.toContain("out of 5"); expect(html).not.toContain("Check my license");
    expect(html).not.toContain("★"); expect(JSON.stringify(siteIdentityJsonLd())).not.toContain('"propertyID":"NPN"');
  });
  it("publishes a lookup and Person identifier only with a valid, publishable NPN", () => {
    Object.assign(AGENT, { npn: "12345678" });
    expect(renderToStaticMarkup(createElement(TrustFacts))).toContain("Check my license");
    expect(JSON.stringify(siteIdentityJsonLd())).toContain('"propertyID":"NPN"');
  });
  it("does not render a rating when its review count is zero", () => {
    mocks.reviews = { count: 0, rating: 5, url: "https://example.test" };
    expect(renderToStaticMarkup(createElement(TrustFacts))).not.toContain("out of 5");
  });
});
describe("tool-first templates", () => {
  it.each(["budget", "compound-interest", "debt-payoff", "emergency-fund", "retirement-projector", "take-home-pay", "life-insurance-needs", "roth-vs-traditional", "roth-conversion-ladder", "medigap-or-advantage-quiz", "roth-conversion-quiz", "cd-or-savings-quiz"])("%s leads with inputs and has one education disclaimer", async slug => {
    const { default: Page } = await import(`../../app/tools/${slug}/page.tsx`);
    const html = renderToStaticMarkup(createElement(Page));
    expect(html).toContain("tool-header");
    const input = Math.min(...[html.indexOf("<input"), html.indexOf('role="progressbar"')].filter(index => index >= 0));
    expect(input).toBeLessThan(html.indexOf('class="ktc"'));
    expect(html.match(/class="t-disclaimer"/g)).toHaveLength(1);
    expect(html).not.toContain("—");
  });
});
