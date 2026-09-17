export const CAMPAIGN_CHANNELS = {
  mail: { source: "direct_mail", medium: "qr" },
  text: { source: "personal_followup", medium: "sms" },
  email: { source: "personal_followup", medium: "email" },
  facebook: { source: "facebook", medium: "paid_social" },
  nextdoor: { source: "nextdoor", medium: "paid_social" },
} as const;

/** Campaign destinations are explicit so an AEP or life ad never lands on a turning-65 guide. */
export const CAMPAIGN_AUDIENCES = {
  turning_65: { page: "/lp/turning-65", guide: "/turning-65" },
  aep: { page: "/lp/annual-enrollment", guide: "/annual-enrollment" },
  life_insurance: { page: "/lp/life-insurance", guide: "/life-insurance" },
  retirement: { page: "/lp/retirement-income", guide: "/retirement-income" },
} as const;

/** A printed short link stays useful when the destination page changes. */
export function campaignPath(channel: string, params: URLSearchParams): string | null {
  if (!Object.hasOwn(CAMPAIGN_CHANNELS, channel)) return null;
  const defaults = CAMPAIGN_CHANNELS[channel as keyof typeof CAMPAIGN_CHANNELS];
  const audience = params.get("audience") ?? "turning_65";
  if (!Object.hasOwn(CAMPAIGN_AUDIENCES, audience)) return null;
  const destination = CAMPAIGN_AUDIENCES[audience as keyof typeof CAMPAIGN_AUDIENCES];
  const output = new URLSearchParams({
    utm_source: defaults.source,
    utm_medium: defaults.medium,
    utm_campaign: audience,
  });
  // Campaign labels, not customer identity or a caller-provided redirect URL.
  for (const key of ["utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]) {
    const value = params.get(key);
    if (value && /^[a-zA-Z0-9_.~-]{1,200}$/.test(value)) output.set(key, value);
  }
  const page = defaults.medium === "paid_social" ? destination.page : destination.guide;
  return `${page}?${output.toString()}`;
}
