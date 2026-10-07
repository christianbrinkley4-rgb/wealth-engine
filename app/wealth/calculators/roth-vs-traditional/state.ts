export const ROTH_DEFAULTS = { amount: 3000, years: 40, rate: 7, taxNow: 12, taxLater: 22 };

/** Saved browser data can come from an older version or a manual edit. */
export function normalizeRothState(value: unknown): typeof ROTH_DEFAULTS {
  const saved = typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
  const number = (key: keyof typeof ROTH_DEFAULTS, min: number, max: number, step = 1) => {
    const candidate = saved[key];
    if (typeof candidate !== "number" || !Number.isFinite(candidate)) return ROTH_DEFAULTS[key];
    return Math.min(max, Math.max(min, Math.round(candidate / step) * step));
  };
  return {
    amount: number("amount", 500, 24500, 250),
    years: number("years", 5, 50),
    rate: number("rate", 0, 12, 0.5),
    taxNow: number("taxNow", 0, 45),
    taxLater: number("taxLater", 0, 45),
  };
}
