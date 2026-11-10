// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";
import StatePlanPage, {
  generateMetadata,
  revalidate,
} from "@/app/guides/nc-state-health-plan-medicare/page";
import { SHP_METADATA_REVERT_AT } from "@/lib/shpMetadata";

const fixture: SeoGuideData = {
  slug: "test-guide",
  path: "/wealth/test-guide",
  title: "A clear question?",
  metaTitle: "A Clear Question: Explained",
  description: "An explanation with official sources.",
  published: "2026-10-08",
  reviewed: "2026-11-05",
  scope: "general",
  answer: "A direct answer with [official guidance](https://www.irs.gov/).",
  sections: [
    {
      title: "Compare the rules",
      table: {
        caption: "An accessible comparison",
        headers: ["Option", "Rule", "Check"],
        rows: [["One", "A rule", "Your documents"]],
      },
    },
  ],
  faqs: [
    { q: "What should I check?", a: "Read the **official** [document](https://www.irs.gov/)." },
  ],
  sources: [{ label: "IRS guidance", href: "https://www.irs.gov/" }],
  related: [{ label: "Money education", href: "/wealth" }],
  closing:
    "I'm Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. (919) 408-6671",
};

function pageDocument(html: string) {
  const root = document.createElement("div");
  root.innerHTML = html;
  return root;
}

type FaqSchema = {
  "@type": string;
  mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
};

function faqSchema(root: HTMLElement) {
  const schemas: FaqSchema[] = JSON.parse(
    root.querySelector('script[type="application/ld+json"]')!.textContent!,
  );
  return schemas.find((schema) => schema["@type"] === "FAQPage")!;
}

afterEach(() => vi.useRealTimers());

describe("reviewed editorial guide renderer", () => {
  it("renders the answer, accessible table, sources, single booking close, and matching FAQ schema", () => {
    const root = pageDocument(renderToStaticMarkup(createElement(SeoGuidePage, { data: fixture })));
    expect(root.querySelector("h1")?.textContent).toBe(fixture.title);
    const faq = faqSchema(root);
    expect([...root.querySelectorAll("dt")].map((node) => node.textContent)).toEqual(
      faq.mainEntity!.map((item) => item.name),
    );
    expect([...root.querySelectorAll("dd")].map((node) => node.textContent)).toEqual(
      faq.mainEntity!.map((item) => item.acceptedAnswer.text),
    );
    expect(root.querySelector("caption")?.textContent).toBe("An accessible comparison");
    expect(root.querySelector("th[scope=col]")?.textContent).toBe("Option");
    expect(root.querySelector('a[href="https://www.irs.gov/"]')).not.toBeNull();
    // Top CTA strip plus bottom close both route through /aep, never
    // straight to the calendar; the closing phone number is a tel: link.
    const bookingLinks = [...root.querySelectorAll("a")].filter(
      (a) => a.getAttribute("href") === "/aep",
    );
    expect(bookingLinks).toHaveLength(2);
    expect(bookingLinks.map((a) => a.dataset.ctaLocation)).toEqual([
      "inline",
      "page_close",
    ]);
    expect(root.querySelector('a[href="tel:+19194086671"]')).not.toBeNull();
    expect(root.querySelectorAll('a[href="tel:+19194086671"]')).toHaveLength(3);
    expect(root.textContent?.trim().endsWith("(919) 408-6671")).toBe(true);
    expect(root.textContent).not.toContain("Personal Medicare help");
    expect(root.querySelector('[aria-label="Required disclosures"]')).not.toBeNull();
    const metadata = seoGuideMetadata(fixture);
    expect(metadata.alternates?.canonical).toBe("/wealth/test-guide");
    expect(metadata.title).toEqual({ absolute: fixture.metaTitle });
    expect(metadata.description).toBe(fixture.description);
  });

  it("escapes script delimiters in structured data", () => {
    const data = {
      ...fixture,
      faqs: [{ q: "Is this safe?", a: "A literal </script><script> marker." }],
    };
    const root = pageDocument(renderToStaticMarkup(createElement(SeoGuidePage, { data })));
    expect(root.querySelectorAll("script")).toHaveLength(1);
    expect(faqSchema(root).mainEntity![0].acceptedAnswer.text).toBe(data.faqs[0].a);
  });
});

describe("State Health Plan deadline changes", () => {
  it("keeps the deadline current before midnight Eastern, then changes body, metadata, and FAQ together", () => {
    vi.useFakeTimers();
    vi.setSystemTime(SHP_METADATA_REVERT_AT - 1);
    let root = pageDocument(renderToStaticMarkup(createElement(StatePlanPage)));
    expect(root.textContent).toContain("Open Enrollment runs October 12 through November 6, 2026");
    const before = generateMetadata();
    expect(before.title).toEqual({
      absolute: "NC State Health Plan Retirees: Choose by Nov. 6, 2026",
    });
    expect(before.description).toBe(
      "On the 70/30 plan? If you do nothing by November 6, 2026, you move to the Base Medicare Advantage plan. Atrium stays in network. See what to check.",
    );
    expect(before.alternates?.canonical).toBe("/guides/nc-state-health-plan-medicare");
    expect(before.openGraph).toMatchObject({
      title: "State retirees on Medicare: your Nov. 6 plan deadline",
      description:
        "70/30 members who do nothing by November 6, 2026 move to the Base Medicare Advantage plan. Here is what to check first.",
    });
    expect(before.twitter).toMatchObject({
      title: "State retirees on Medicare: your Nov. 6 plan deadline",
      description:
        "70/30 members who do nothing by November 6, 2026 move to the Base Medicare Advantage plan. Here is what to check first.",
    });
    expect(faqSchema(root).mainEntity![0].acceptedAnswer.text).toContain("deadline is November 6");
    vi.setSystemTime(SHP_METADATA_REVERT_AT);
    root = pageDocument(renderToStaticMarkup(createElement(StatePlanPage)));
    expect(root.textContent).toContain("Open Enrollment period has ended");
    expect(root.textContent).not.toContain("Open Enrollment runs");
    const after = generateMetadata();
    expect(after.title).toEqual({
      absolute: "NC State Health Plan Medicare: 2027 Retiree Guide",
    });
    expect(after.description).toBe(
      "Review NC State Health Plan Medicare options for 2027, what changed after open enrollment, and where to ask about retiree coverage.",
    );
    expect(after.description).not.toContain("November 6 enrollment deadline");
    expect(after.openGraph).toMatchObject({
      title: "NC State Health Plan Medicare: 2027 Retiree Guide",
    });
    expect(faqSchema(root).mainEntity![0].acceptedAnswer.text).toContain("deadline was November 6");
    expect([...root.querySelectorAll("dd")][0].textContent).toBe(
      faqSchema(root).mainEntity![0].acceptedAnswer.text,
    );
    expect(revalidate).toBe(3600);
  });
});
