/**
 * In-memory token-bucket rate limiter scoped to a single Node process.
 *
 * This is intentionally minimal: it survives a single warm Lambda/edge worker
 * but resets between cold starts. Good enough to stop scripted abuse of a
 * public capture endpoint; not a substitute for a real WAF in production.
 *
 * If/when this app moves to multi-region serverless, swap this for Upstash
 * Redis (https://upstash.com/docs/redis/sdks/ratelimit/overview) — the call
 * site only needs to await a boolean.
 */

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

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
  const bucket = buckets.get(key);

  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
