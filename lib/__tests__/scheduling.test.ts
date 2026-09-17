import { describe, expect, it } from "vitest";

import { getReadinessReport } from "@/lib/readiness";
import { bookingUrlForTopic, schedulingConfiguration, SCHEDULING_TOPICS } from "@/lib/scheduling";

const calendarEnvironment = {
  NEXT_PUBLIC_SCHEDULING_MEDICARE_URL: "https://cal.com/test-agent/medicare",
  NEXT_PUBLIC_SCHEDULING_LIFE_INSURANCE_URL: "https://cal.com/test-agent/life",
  NEXT_PUBLIC_SCHEDULING_CARE_COVERAGE_URL: "https://cal.com/test-agent/care",
  NEXT_PUBLIC_SCHEDULING_FINANCIAL_PLANNING_URL: "https://cal.com/test-agent/retirement",
};

describe("topic-specific booking", () => {
  it.each([
    ["medicare", "https://cal.com/test-agent/medicare"],
    ["life_insurance", "https://cal.com/test-agent/life"],
    ["care_coverage", "https://cal.com/test-agent/care"],
    ["financial_planning", "https://cal.com/test-agent/retirement"],
  ])("routes %s to its own configured event", (topic, url) => {
    expect(bookingUrlForTopic(topic, calendarEnvironment)).toBe(url);
  });

  it("never borrows a different service's event or invents a generic calendar", () => {
    const env = {
      NEXT_PUBLIC_SCHEDULING_MEDICARE_URL: calendarEnvironment.NEXT_PUBLIC_SCHEDULING_MEDICARE_URL,
    };
    expect(bookingUrlForTopic("life_insurance", env)).toBeNull();
    expect(bookingUrlForTopic(null, env)).toBeNull();
  });

  it("prefers a topic event and uses a generic fallback only when explicitly configured", () => {
    const env = {
      NEXT_PUBLIC_SCHEDULING_URL: "https://cal.com/test-agent/intro",
      NEXT_PUBLIC_SCHEDULING_MEDICARE_URL: calendarEnvironment.NEXT_PUBLIC_SCHEDULING_MEDICARE_URL,
      NEXT_PUBLIC_SCHEDULING_LIFE_INSURANCE_URL: "https://localhost/booking",
    };
    expect(bookingUrlForTopic("medicare", env)).toBe(
      calendarEnvironment.NEXT_PUBLIC_SCHEDULING_MEDICARE_URL,
    );
    expect(bookingUrlForTopic("life_insurance", env)).toBe(env.NEXT_PUBLIC_SCHEDULING_URL);
    expect(bookingUrlForTopic(null, env)).toBe(env.NEXT_PUBLIC_SCHEDULING_URL);
  });

  it.each([
    "constructor",
    "__proto__",
    "https://other.example/book",
    ["medicare", "life_insurance"],
  ])("does not interpret unknown topic %s as a booking destination", (topic) => {
    expect(bookingUrlForTopic(topic, calendarEnvironment)).toBeNull();
  });

  it("returns no booking destination until a public HTTPS URL is supplied", () => {
    const config = schedulingConfiguration({
      NEXT_PUBLIC_SCHEDULING_MEDICARE_URL: "javascript:alert(1)",
    });
    expect(config.genericUrl).toBeNull();
    for (const topic of SCHEDULING_TOPICS) expect(config.topicUrls[topic]).toBeNull();
  });
});

describe("booking readiness is configuration, not a live check", () => {
  it("reports topic links without claiming appointment synchronization is configured", () => {
    const report = getReadinessReport({ NODE_ENV: "production", ...calendarEnvironment });
    expect(report.automation.checks.onlineScheduling).toBe(true);
    expect(report.booking.webhookConfigured).toBe(false);
    expect(report.booking.syncConfigured).toBe(false);
    expect(report.booking.liveVerified).toBe(false);
    expect(report.verification).toEqual({
      mode: "configuration-only",
      liveConnectionsChecked: false,
    });
  });

  it("requires both validated webhook settings and a command-center route for sync configuration", () => {
    const env = {
      NODE_ENV: "production" as const,
      ...calendarEnvironment,
      CALCOM_WEBHOOK_SECRET: "dedicated-test-secret-with-at-least-thirty-two-characters",
      CALCOM_ORGANIZER_EMAIL: "test-agent@example.invalid",
      CALCOM_EVENT_TYPES: JSON.stringify({ "123": "medicare" }),
    };
    const beforeRoute = getReadinessReport(env);
    expect(beforeRoute.booking.webhookConfigured).toBe(true);
    expect(beforeRoute.booking.webhookTopicsConfigured.medicare).toBe(true);
    expect(beforeRoute.booking.webhookTopicsConfigured.life_insurance).toBe(false);
    expect(beforeRoute.booking.syncConfigured).toBe(false);

    const report = getReadinessReport({
      ...env,
      COMMAND_CENTER_INGEST_URL: "https://project.supabase.co/functions/v1/website-inquiry",
      COMMAND_CENTER_INGEST_KEY: "a".repeat(64),
    });
    expect(report.booking.syncConfigured).toBe(true);
    expect(report.automation.checks.appointmentTopicMappings).toBe(false);
    expect(report.booking.liveVerified).toBe(false);
    expect(report.automation.liveVerified).toBe(false);
    const publicReport = JSON.stringify(report);
    expect(publicReport).not.toContain(env.CALCOM_WEBHOOK_SECRET);
    expect(publicReport).not.toContain(env.CALCOM_ORGANIZER_EMAIL);
    expect(publicReport).not.toContain('"123"');
  });

  it("does not treat a Netlify preview origin as an explicitly configured canonical domain", () => {
    const report = getReadinessReport({
      NODE_ENV: "production",
      URL: "https://site.netlify.app",
      DEPLOY_PRIME_URL: "https://deploy-preview-1--site.netlify.app",
      ...calendarEnvironment,
    });
    expect(report.publicSeo.configured).toBe(false);
    expect(report.fatal.map(({ code }) => code)).toContain("public_site_url");
  });
});
