/** Accept North American numbers with an optional +1 country code. Never truncate. */
export function normalizeUsPhone(value: unknown): string | null {
  if (value == null || value === "") return "";
  if (typeof value !== "string" || /[a-z]/i.test(value)) return null;
  const digits = value.replace(/\D/g, "");
  if (!digits) return value.trim() ? null : "";
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits.length === 10 ? digits : null;
}
