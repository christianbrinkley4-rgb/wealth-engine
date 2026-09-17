import { describe, expect, it } from "vitest";

import { buildRobots } from "@/app/robots";
import { assessReadiness } from "@/lib/readiness";
import { isValidPublicSiteUrl } from "@/lib/seo";

const configuredServices = {
  leadStorage: true,
  leadNotification: true,
  prospectEmail: true,
  reminderDelivery: true,
  botProtection: true,
  analytics: true,
};

function readyInput() {
  return {
    production: true,
    siteUrl: "https://medicare.gov",
    medicareMarketing: true,
    medicareTpmoScope: "one-organization" as const,
    tpmoOrganizationCount: 3,
    tpmoProductCount: 12,
    testimonialsConfigured: true,
    exactSaturdayHoursConfigured: true,
    services: configuredServices,
  };
}

describe("production readiness", () => {
  it("separates fatal blockers, optional enhancements, and configured services", () => {
    const report = assessReadiness({
      ...readyInput(),
      siteUrl: undefined,
      medicareTpmoScope: "multiple-organizations",
      tpmoOrganizationCount: null,
      tpmoProductCount: null,
      testimonialsConfigured: false,
      exactSaturdayHoursConfigured: false,
      services: {
        ...configuredServices,
        leadStorage: false,
        leadNotification: false,
      },
    });

    expect(report.launchReady).toBe(false);
    expect(report.ok).toBe(false);
    expect(report.fatal.map((issue) => issue.code)).toEqual([
      "public_site_url",
      "lead_capture_route",
      "tpmo_counts",
    ]);
    expect(report.optional.map((issue) => issue.code)).toEqual(["testimonials", "saturday_hours"]);
    expect(report.configuredServices).toEqual({
      ...configuredServices,
      leadStorage: false,
      leadNotification: false,
    });
    expect(report.publicSeo).toEqual({ configured: false, indexable: false });
  });

  it("does not make local development unhealthy", () => {
    const report = assessReadiness({
      ...readyInput(),
      production: false,
      siteUrl: "http://localhost:3000",
      medicareTpmoScope: "unconfirmed",
      tpmoOrganizationCount: null,
      tpmoProductCount: null,
      services: {
        ...configuredServices,
        leadStorage: false,
        leadNotification: false,
      },
    });

    expect(report.ok).toBe(true);
    expect(report.launchReady).toBe(false);
    expect(report.fatal.length).toBeGreaterThan(0);
  });

  it("requires confirmation, not counts, for a single-organization TPMO", () => {
    const unconfirmed = assessReadiness({
      ...readyInput(),
      medicareTpmoScope: "unconfirmed",
      tpmoOrganizationCount: null,
      tpmoProductCount: null,
    });
    const singleOrganization = assessReadiness({
      ...readyInput(),
      medicareTpmoScope: "one-organization",
      tpmoOrganizationCount: null,
      tpmoProductCount: null,
    });

    expect(unconfirmed.fatal.map((issue) => issue.code)).toContain("tpmo_scope");
    expect(singleOrganization.fatal).toEqual([]);
    expect(singleOrganization.publicSeo.indexable).toBe(true);
  });

  it("accepts notification delivery as a capture fallback", () => {
    const report = assessReadiness({
      ...readyInput(),
      services: {
        ...configuredServices,
        leadStorage: false,
        leadNotification: true,
      },
    });

    expect(report.leadCapture.ready).toBe(true);
    expect(report.fatal.map((issue) => issue.code)).not.toContain("lead_capture_route");
    expect(report.publicSeo.indexable).toBe(true);
  });
});

describe("indexing safeguards", () => {
  it("only accepts public HTTPS origins", () => {
    expect(isValidPublicSiteUrl("https://medicare.gov")).toBe(true);
    expect(isValidPublicSiteUrl("http://medicare.gov")).toBe(false);
    expect(isValidPublicSiteUrl("https://localhost:3000")).toBe(false);
    expect(isValidPublicSiteUrl("https://192.168.1.10")).toBe(false);
    expect(isValidPublicSiteUrl("https://medicare.gov/path")).toBe(false);
    expect(isValidPublicSiteUrl("https://your-domain.com")).toBe(false);
    expect(isValidPublicSiteUrl("not a URL")).toBe(false);
  });

  it("disallows all crawling until the public origin is valid", () => {
    expect(buildRobots("http://localhost:3000", false)).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });
  });

  it("publishes sitemap and host only when configured", () => {
    const result = buildRobots("https://medicare.gov", true);
    expect(result.host).toBe("https://medicare.gov");
    expect(result.sitemap).toBe("https://medicare.gov/sitemap.xml");
  });
});
