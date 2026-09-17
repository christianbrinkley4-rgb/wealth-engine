/** Validate configured booking links; URL validity does not verify a calendar is live. */
export function schedulingUrl(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    const url = new URL(raw.trim());
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(
        url.hostname,
      ) ||
      /example\.|placeholder|your-domain|\.(local|localhost|test|invalid)$/i.test(url.hostname) ||
      url.hostname.startsWith("[")
    )
      return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const LIVE_SCHEDULING_URL = schedulingUrl(process.env.NEXT_PUBLIC_SCHEDULING_URL);

export const SCHEDULING_TOPICS = [
  "medicare",
  "life_insurance",
  "care_coverage",
  "financial_planning",
] as const;
export type SchedulingTopic = (typeof SCHEDULING_TOPICS)[number];

export const SCHEDULING_LABELS: Record<SchedulingTopic, string> = {
  medicare: "Medicare questions",
  life_insurance: "Life insurance",
  care_coverage: "Care and critical illness coverage",
  financial_planning: "Retirement questions",
};

// Keep public environment references explicit so Next.js can also include them
// in client-side imports without exposing any server-only calendar credentials.
const PUBLIC_SCHEDULING_ENV = {
  NEXT_PUBLIC_SCHEDULING_URL: process.env.NEXT_PUBLIC_SCHEDULING_URL,
  NEXT_PUBLIC_SCHEDULING_MEDICARE_URL: process.env.NEXT_PUBLIC_SCHEDULING_MEDICARE_URL,
  NEXT_PUBLIC_SCHEDULING_LIFE_INSURANCE_URL: process.env.NEXT_PUBLIC_SCHEDULING_LIFE_INSURANCE_URL,
  NEXT_PUBLIC_SCHEDULING_CARE_COVERAGE_URL: process.env.NEXT_PUBLIC_SCHEDULING_CARE_COVERAGE_URL,
  NEXT_PUBLIC_SCHEDULING_FINANCIAL_PLANNING_URL:
    process.env.NEXT_PUBLIC_SCHEDULING_FINANCIAL_PLANNING_URL,
};

type SchedulingEnvironment = Record<string, string | undefined>;

export function isSchedulingTopic(value: unknown): value is SchedulingTopic {
  return typeof value === "string" && SCHEDULING_TOPICS.includes(value as SchedulingTopic);
}

export function schedulingConfiguration(env: SchedulingEnvironment = PUBLIC_SCHEDULING_ENV) {
  return {
    genericUrl: schedulingUrl(env.NEXT_PUBLIC_SCHEDULING_URL),
    topicUrls: {
      medicare: schedulingUrl(env.NEXT_PUBLIC_SCHEDULING_MEDICARE_URL),
      life_insurance: schedulingUrl(env.NEXT_PUBLIC_SCHEDULING_LIFE_INSURANCE_URL),
      care_coverage: schedulingUrl(env.NEXT_PUBLIC_SCHEDULING_CARE_COVERAGE_URL),
      financial_planning: schedulingUrl(env.NEXT_PUBLIC_SCHEDULING_FINANCIAL_PLANNING_URL),
    } satisfies Record<SchedulingTopic, string | null>,
  };
}

/** Never send one service to another service's event as an implicit fallback. */
export function bookingUrlForTopic(
  topic: unknown,
  env: SchedulingEnvironment = PUBLIC_SCHEDULING_ENV,
): string | null {
  const config = schedulingConfiguration(env);
  if (topic == null) return config.genericUrl;
  if (!isSchedulingTopic(topic)) return null;
  return config.topicUrls[topic] ?? config.genericUrl;
}
