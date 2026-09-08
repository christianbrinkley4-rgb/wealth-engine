import {
  hasPublishableNpn,
  SATURDAY_HOURS,
  TPMO_ORGANIZATION_COUNT,
  TPMO_PRODUCT_COUNT,
} from "@/lib/agent";
import { isValidPublicSiteUrl } from "@/lib/seo";
import { hasSupabaseAdminConfig } from "@/lib/supabase";
import { hasTestimonials } from "@/lib/testimonials";

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
  npnValid: boolean;
  medicareMarketing: boolean;
  tpmoOrganizationCount: number | null;
  tpmoProductCount: number | null;
  testimonialsConfigured: boolean;
  exactSaturdayHoursConfigured: boolean;
  services: ReadinessServices;
};

export type ReadinessReport = {
  ok: boolean;
  launchReady: boolean;
  environment: "production" | "development";
  fatal: ReadinessIssue[];
  optional: ReadinessIssue[];
  configuredServices: ReadinessServices;
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

export function assessReadiness(input: ReadinessInput): ReadinessReport {
  const fatal: ReadinessIssue[] = [];
  const optional: ReadinessIssue[] = [];
  const publicSeoConfigured = isValidPublicSiteUrl(input.siteUrl);
  const leadCaptureReady = input.services.leadStorage || input.services.leadNotification;

  if (!publicSeoConfigured) {
    fatal.push({
      code: "public_site_url",
      message: "Set NEXT_PUBLIC_SITE_URL to the final public HTTPS origin.",
    });
  }
  if (!input.npnValid) {
    fatal.push({
      code: "npn",
      message: "Replace the placeholder AGENT.npn with the agent’s verified NPN.",
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
    (!positiveCount(input.tpmoOrganizationCount) || !positiveCount(input.tpmoProductCount))
  ) {
    fatal.push({
      code: "tpmo_counts",
      message: "Set verified Medicare TPMO organization and product counts in lib/agent.ts.",
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
  const storage =
    env === process.env
      ? hasSupabaseAdminConfig()
      : notPlaceholder(env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL) &&
        notPlaceholder(env.SUPABASE_SERVICE_ROLE_KEY);

  return assessReadiness({
    production: env.NODE_ENV === "production",
    siteUrl: env.NEXT_PUBLIC_SITE_URL,
    npnValid: hasPublishableNpn(),
    medicareMarketing: true,
    tpmoOrganizationCount: TPMO_ORGANIZATION_COUNT,
    tpmoProductCount: TPMO_PRODUCT_COUNT,
    testimonialsConfigured: hasTestimonials(),
    exactSaturdayHoursConfigured: SATURDAY_HOURS !== null,
    services: {
      leadStorage: storage,
      leadNotification: resend || make || sms,
      prospectEmail: resend,
      reminderDelivery: storage && resend && present(env.CRON_SECRET),
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
