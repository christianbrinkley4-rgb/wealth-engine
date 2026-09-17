/**
 * Ad attribution capture.
 *
 * The first page a visitor lands on carries the only reliable evidence of
 * which ad produced them: the UTM tags, the click id, and the referrer. By the
 * time they submit the form three pages later, all of it is gone from the URL.
 * So we snapshot it on first load and read it back at submit.
 *
 * sessionStorage, not localStorage: a visitor who comes back next week from a
 * different ad should be attributed to the new one.
 */

const STORAGE_KEY = "attribution_v1";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  /** Meta click id — also needed for Conversions API match quality. */
  fbclid?: string;
  /** Google click id, if you ever run search ads. */
  gclid?: string;
  referrer?: string;
  landing_path?: string;
  captured_at?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
] as const;

function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, 200);
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Call once on first client render. Safe to call repeatedly. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};
    for (const key of UTM_KEYS) {
      const value = clean(params.get(key));
      if (value) fromUrl[key] = value;
    }

    const existing = readAttribution();
    const hasNewCampaignData = Object.keys(fromUrl).length > 0;

    // Keep the first touch unless this visit carries fresh campaign tags.
    if (existing && !hasNewCampaignData) return;

    const record: Attribution = {
      ...fromUrl,
      referrer: clean(document.referrer),
      landing_path: window.location.pathname,
      captured_at: new Date().toISOString(),
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Private browsing or blocked storage: attribution is nice to have, not
    // worth breaking the page over.
  }
}

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Attribution;
  } catch {
    return null;
  }
}

/**
 * Meta’s browser and server events must share an id so the Conversions API
 * deduplicates them instead of double-counting the lead.
 */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
