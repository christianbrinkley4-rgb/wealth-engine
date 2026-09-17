/**
 * Bounded fixed-window rate limiter scoped to a single Node process.
 *
 * A serverless cold start resets it, and another instance has its own counts.
 * This is a secondary control; Turnstile and platform abuse protection are
 * still needed in production. A shared store is needed for a global limit.
 */

import { isIP } from "node:net";

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();
export const MAX_RATE_LIMIT_BUCKETS = 10_000;
const CLEANUP_INTERVAL_MS = 60_000;
let nextCleanupAt = 0;

export interface RateLimitOptions {
  /** Max requests per window. */
  limit?: number;
  /** Window length in milliseconds. */
  windowMs?: number;
}

export function isRateLimited(key: string, options: RateLimitOptions = {}): boolean {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();

  if (now >= nextCleanupAt) {
    for (const [storedKey, storedBucket] of buckets) {
      if (storedBucket.reset <= now) buckets.delete(storedKey);
    }
    nextCleanupAt = now + CLEANUP_INTERVAL_MS;
  }

  const bucket = buckets.get(key);

  if (!bucket || bucket.reset <= now) {
    // Do not evict an active bucket: an attacker could otherwise rotate keys
    // to erase an existing limit. Unknown keys wait until capacity is freed.
    if (!bucket && buckets.size >= MAX_RATE_LIMIT_BUCKETS) return true;
    buckets.set(key, { count: 1, reset: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

export function getClientIp(request: Request): string {
  const validIp = (value: string | null): string | null => {
    const ip = value?.trim();
    return ip && isIP(ip) ? ip : null;
  };

  // Trust only the header supplied by the known hosting platform. Netlify's
  // connection-IP header must win over visitor-supplied forwarded headers.
  // NETLIFY is a build flag; SITE_ID/SITE_NAME/URL are also present in the
  // documented serverless runtime, where the build flag may be absent.
  const onNetlify =
    process.env.NETLIFY === "true" ||
    Boolean(process.env.SITE_ID && process.env.SITE_NAME && process.env.URL);
  if (onNetlify) {
    return validIp(request.headers.get("x-nf-client-connection-ip")) || "unknown";
  }
  if (process.env.VERCEL === "1") {
    return validIp(request.headers.get("x-forwarded-for")) || "unknown";
  }

  // A generic Request has no socket identity. Do not treat arbitrary headers
  // from direct/self-hosted clients as proof of an IP or contact permission.
  return "unknown";
}
