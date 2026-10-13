import { describe, expect, it } from "vitest";
import { eventJsonLd, localBusinessJsonLd, SITE_URL, videoJsonLd } from "@/lib/seo";
import { PRIORITY_MEDICARE_FAQS } from "@/lib/priorityMedicareFaqs";
import { GREENSBORO_MEDICARE_FAQ } from "@/lib/greensboroMedicareGuide";
import { PRIORITY_MEDICARE_CITIES } from "@/lib/priorityMedicareCities";
import { LOCATION_CONSOLIDATIONS } from "@/lib/locationConsolidation";
import sitemap from "@/app/sitemap";

describe("truthful insurance structured data", () => {
  it("omits ratings until actual visible reviews are supplied", () => {
    const business = localBusinessJsonLd()["@graph"][0];
    expect(business["@type"]).toBe("InsuranceAgency");
    expect(business).not.toHaveProperty("aggregateRating");
    expect(business).not.toHaveProperty("review");
    const withReviews = localBusinessJsonLd([
      {
        author: "Synthetic QA reviewer",
        text: "Synthetic test fixture, never published.",
        rating: 4,
        sourceUrl: "https://example.invalid/review/1",
      },
      {
        author: "Synthetic QA reviewer 2",
        text: "Second synthetic fixture, never published.",
        rating: 5,
        sourceUrl: "https://example.invalid/review/2",
      },
    ])["@graph"][0];
    expect(withReviews.aggregateRating).toMatchObject({ ratingValue: 4.5, reviewCount: 2 });
    expect(withReviews.review?.[0].reviewBody).toBe("Synthetic test fixture, never published.");
  });
  it("requires real dated sessions instead of inventing an appointment event", () => {
    const session = {
      name: "Synthetic QA session",
      description: "Test only",
      startDate: "2026-10-20T10:00:00-04:00",
      endDate: "2026-10-20T11:00:00-04:00",
      url: "https://example.invalid/session",
      attendance: "online" as const,
      location: { name: "Test video session", url: "https://example.invalid/session" },
    };
    expect(eventJsonLd(session)).toMatchObject({
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation" },
      offers: { price: 0 },
    });
    expect(() => eventJsonLd({ ...session, startDate: "2026-10-20" })).toThrow();
    expect(() => eventJsonLd({ ...session, endDate: "2026-10-20T09:00:00-04:00" })).toThrow();
    expect(() => eventJsonLd({ ...session, attendance: "in-person" })).toThrow();
  });
  it("retains supplied video dates, duration, and destinations without fabricating metadata", () => {
    const video = {
      name: "Synthetic QA video",
      description: "Test only",
      uploadDate: "2026-10-12",
      duration: "PT30S",
      thumbnailUrl: "https://example.invalid/thumbnail.jpg",
      contentUrl: "https://example.invalid/video.mp4",
      embedUrl: "https://example.invalid/embed",
    };
    expect(videoJsonLd(video)).toEqual({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      ...video,
    });
  });
});

describe("Medicare search consolidation and answer capsules", () => {
  it("excludes permanently consolidated routes from the sitemap", () => {
    const paths = sitemap().map((item) => new URL(item.url).pathname);
    for (const old of Object.keys(LOCATION_CONSOLIDATIONS)) expect(paths).not.toContain(old);
    for (const destination of Object.values(LOCATION_CONSOLIDATIONS))
      expect(paths).toContain(destination.split("#")[0]);
    expect(
      sitemap().filter((item) => item.url === `${SITE_URL}/north-carolina-medicare-programs`),
    ).toHaveLength(1);
  });
  it("keeps concise answers complete rather than silently truncating schema text", () => {
    const faqs = [
      ...Object.values(PRIORITY_MEDICARE_FAQS).flat(),
      ...GREENSBORO_MEDICARE_FAQ,
      ...Object.values(PRIORITY_MEDICARE_CITIES).flatMap((city) => city.faq),
    ];
    for (const faq of faqs) {
      const length = faq.a.split(/\s+/).length;
      expect(length, faq.q).toBeGreaterThanOrEqual(20);
      expect(length, faq.q).toBeLessThanOrEqual(25);
      expect(faq.a, faq.q).toMatch(/[.!?]$/);
    }
  });
});
