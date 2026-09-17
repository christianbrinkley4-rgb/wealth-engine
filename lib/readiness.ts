import {
  MEDICARE_TPMO_SCOPE,
  SATURDAY_HOURS,
  TPMO_ORGANIZATION_COUNT,
  TPMO_PRODUCT_COUNT,
} from "@/lib/agent";
import { isValidPublicSiteUrl } from "@/lib/seo";
import { hasSupabaseAdminConfig } from "@/lib/supabase";
import { hasTestimonials } from "@/lib/testimonials";
import { schedulingConfiguration, SCHEDULING_TOPICS, type SchedulingTopic } from "@/lib/scheduling";
import { commandCenterConfig } from "@/lib/commandCenter";
import { calWebhookConfig } from "@/lib/calWebhook";

export type ReadinessIssue = {
  code: string;
  message: string;
};

export type ReadinessServices = {
  leadStorage: boolean;
  leadNotification: boolean;
  prospectEmail: boolean;
  reminderDelivery: boolean;
  botProtection: boolean;
  analytics: boolean;
};

export type ReadinessInput = {
  production: boolean;
  siteUrl?: string;
  medicareMarketing: boolean;
  medicareTpmoScope: "unconfirmed" | "one-organization" | "multiple-organizations";
  tpmoOrganizationCount: number | null;
  tpmoProductCount: number | null;
  testimonialsConfigured: boolean;
  exactSaturdayHoursConfigured: boolean;
  services: ReadinessServices;
  scheduling?: boolean;
  booking?: BookingConfiguration;
};

type BookingConfiguration = {
  genericCalendarConfigured: boolean;
  topicCalendarsConfigured: Record<SchedulingTopic, boolean>;
  webhookConfigured: boolean;
  webhookTopicsConfigured: Record<SchedulingTopic, boolean>;
  commandCenterRouteConfigured: boolean;
};

export type ReadinessReport = {
  ok: boolean;
  launchReady: boolean;
  environment: "production" | "development";
  fatal: ReadinessIssue[];
  optional: ReadinessIssue[];
  configuredServices: ReadinessServices;
  verification: {
    mode: "configuration-only";
    liveConnectionsChecked: false;
  };
  automation: {
    configured: boolean;
    liveVerified: false;
    checks: Record<string, boolean>;
  };
  booking: BookingConfiguration & {
    syncConfigured: boolean;
    liveVerified: false;
  };
  publicSeo: {
    configured: boolean;
    indexable: boolean;
  };
  leadCapture: {
    ready: boolean;
    durableStorageConfigured: boolean;
    notificationRouteConfigured: boolean;
  };
};

function positiveCount(value: number | null): boolean {
  return Number.isInteger(value) && (value ?? 0) > 0;
}

function topicFlags(
  predicate: (topic: SchedulingTopic) => boolean,
): Record<SchedulingTopic, boolean> {
  return Object.fromEntries(SCHEDULING_TOPICS.map((topic) => [topic, predicate(topic)])) as Record<
    SchedulingTopic,
    boolean
  >;
}

export function assessReadiness(input: ReadinessInput): ReadinessReport {
  const fatal: ReadinessIssue[] = [];
  const optional: ReadinessIssue[] = [];
  const publicSeoConfigured = isValidPublicSiteUrl(input.siteUrl);
  const leadCaptureReady = input.services.leadStorage || input.services.leadNotification;
  const booking = input.booking ?? {
    genericCalendarConfigured: input.scheduling === true,
    topicCalendarsConfigured: topicFlags(() => false),
    webhookConfigured: false,
    webhookTopicsConfigured: topicFlags(() => false),
    commandCenterRouteConfigured: false,
  };
  const bookingSyncConfigured = booking.webhookConfigured && booking.commandCenterRouteConfigured;
  const automationChecks = {
    durableLeadStorage: input.services.leadStorage,
    agentAlerts: input.services.leadNotification,
    prospectEmailReplies: input.services.prospectEmail,
    enrollmentReminders: input.services.reminderDelivery,
    onlineScheduling: SCHEDULING_TOPICS.every(
      (topic) => booking.topicCalendarsConfigured[topic] || booking.genericCalendarConfigured,
    ),
    appointmentSync: bookingSyncConfigured,
    appointmentTopicMappings: SCHEDULING_TOPICS.every(
      (topic) =>
        !(booking.topicCalendarsConfigured[topic] || booking.genericCalendarConfigured) ||
        booking.webhookTopicsConfigured[topic],
    ),
  };

  if (!publicSeoConfigured) {
    fatal.push({
      code: "public_site_url",
      message:
        "Set NEXT_PUBLIC_SITE_URL to the final public HTTPS origin before indexing or promotion.",
    });
  }
  if (input.medicareMarketing && input.medicareTpmoScope === "unconfirmed") {
    fatal.push({
      code: "tpmo_scope",
      message:
        "Confirm whether the agent sells Medicare plans for one or multiple organizations before public Medicare marketing.",
    });
  }
  if (!leadCaptureReady) {
    fatal.push({
      code: "lead_capture_route",
      message: "Configure durable Supabase lead storage or at least one lead notification route.",
    });
  }
  if (
    input.medicareMarketing &&
    input.medicareTpmoScope === "multiple-organizations" &&
    (!positiveCount(input.tpmoOrganizationCount) || !positiveCount(input.tpmoProductCount))
  ) {
    fatal.push({
      code: "tpmo_counts",
      message:
        "A multi-organization TPMO must set verified Medicare organization and product counts in lib/agent.ts.",
    });
  }
  if (!input.testimonialsConfigured) {
    optional.push({
      code: "testimonials",
      message: "Add only verified, permissioned testimonials when available.",
    });
  }
  if (!input.exactSaturdayHoursConfigured) {
    optional.push({
      code: "saturday_hours",
      message: "Add exact Saturday hours only after they are confirmed.",
    });
  }

  return {
    // Local development remains healthy while still reporting launch blockers.
    ok: !input.production || fatal.length === 0,
    launchReady: fatal.length === 0,
    environment: input.production ? "production" : "development",
    fatal,
    optional,
    configuredServices: input.services,
    verification: { mode: "configuration-only", liveConnectionsChecked: false },
    automation: {
      configured: Object.values(automationChecks).every(Boolean),
      liveVerified: false,
      checks: automationChecks,
    },
    booking: { ...booking, syncConfigured: bookingSyncConfigured, liveVerified: false },
    publicSeo: {
      configured: publicSeoConfigured,
      indexable: publicSeoConfigured && fatal.length === 0,
    },
    leadCapture: {
      ready: leadCaptureReady,
      durableStorageConfigured: input.services.leadStorage,
      notificationRouteConfigured: input.services.leadNotification,
    },
  };
}

function present(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function notPlaceholder(value: string | undefined): boolean {
  return present(value) && !/replace|placeholder|your[_-]?|REPLACE_WITH_WEBHOOK/i.test(value!);
}

export function getReadinessReport(env: NodeJS.ProcessEnv = process.env): ReadinessReport {
  const resend = notPlaceholder(env.RESEND_API_KEY) && notPlaceholder(env.RESEND_FROM);
  const make = notPlaceholder(env.MAKE_WEBHOOK_URL);
  const sms =
    notPlaceholder(env.TWILIO_ACCOUNT_SID) &&
    notPlaceholder(env.TWILIO_AUTH_TOKEN) &&
    notPlaceholder(env.TWILIO_FROM_NUMBER) &&
    notPlaceholder(env.ALERT_SMS_TO);
  const directStorage =
    env === process.env
      ? hasSupabaseAdminConfig()
      : notPlaceholder(env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL) &&
        notPlaceholder(env.SUPABASE_SERVICE_ROLE_KEY);

  const storage = Boolean(commandCenterConfig(env)) || directStorage;
  const calendars = schedulingConfiguration(env);
  const webhook = calWebhookConfig(env);
  return assessReadiness({
    production: env.NODE_ENV === "production",
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    booking: {
      genericCalendarConfigured: Boolean(calendars.genericUrl),
      topicCalendarsConfigured: topicFlags((topic) => Boolean(calendars.topicUrls[topic])),
      webhookConfigured: Boolean(webhook),
      webhookTopicsConfigured: topicFlags((topic) =>
        Boolean(webhook && Object.values(webhook.eventTypes).includes(topic)),
      ),
      commandCenterRouteConfigured: Boolean(commandCenterConfig(env)),
    },
    medicareMarketing: true,
    medicareTpmoScope: MEDICARE_TPMO_SCOPE,
    tpmoOrganizationCount: TPMO_ORGANIZATION_COUNT,
    tpmoProductCount: TPMO_PRODUCT_COUNT,
    testimonialsConfigured: hasTestimonials(),
    exactSaturdayHoursConfigured: SATURDAY_HOURS !== null,
    services: {
      leadStorage: storage,
      leadNotification: resend || make || sms,
      prospectEmail: resend,
      reminderDelivery: directStorage && resend && present(env.CRON_SECRET),
      botProtection:
        notPlaceholder(env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) &&
        notPlaceholder(env.TURNSTILE_SECRET_KEY),
      analytics: Boolean(
        present(env.NEXT_PUBLIC_META_PIXEL_ID) ||
        present(env.NEXT_PUBLIC_GA4_ID) ||
        present(env.NEXT_PUBLIC_NEXTDOOR_PIXEL_ID),
      ),
    },
  });
}
