export const COMPOUND_DEFAULTS = { start: 0, monthly: 250, years: 40, rate: 7, age: 22, wait: 10 };
export const END_AGE = 65;

export function normalizeCompoundState(value: unknown): typeof COMPOUND_DEFAULTS {
  const saved = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const read = (key: keyof typeof COMPOUND_DEFAULTS, min: number, max: number, step?: number) => {
    const raw = saved[key];
    const number = typeof raw === "number" && Number.isFinite(raw) ? raw : COMPOUND_DEFAULTS[key];
    const rounded = step ? Math.round(number / step) * step : number;
    return Math.min(max, Math.max(min, rounded));
  };
  const age = read("age", 16, 50, 1);
  return {
    start: read("start", 0, 10_000_000),
    monthly: read("monthly", 0, 2000, 25),
    years: read("years", 1, 50, 1),
    rate: read("rate", 0, 12, 0.5),
    age,
    wait: read("wait", 1, Math.min(20, END_AGE - age - 1), 1),
  };
}

export function readCompoundQuery(query: URLSearchParams): typeof COMPOUND_DEFAULTS | null {
  if (!query.has("m")) return null;
  const read = (name: string, fallback: number) => {
    const raw = query.get(name);
    if (raw === null || raw.trim() === "") return fallback;
    const number = Number(raw);
    return Number.isFinite(number) ? number : fallback;
  };
  return normalizeCompoundState({
    ...COMPOUND_DEFAULTS,
    start: read("s", COMPOUND_DEFAULTS.start),
    monthly: read("m", COMPOUND_DEFAULTS.monthly),
    years: read("y", COMPOUND_DEFAULTS.years),
    rate: read("r", COMPOUND_DEFAULTS.rate),
  });
}
