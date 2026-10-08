/**
 * Tool-drop signups for the /wealth hub.
 *
 * Deliberately separate from the Medicare lead pipeline: a 23-year-old asking
 * for a budget tool is not a Medicare inquiry. A signup is one email to
 * Christian's inbox and nothing else. No database row, no command center,
 * no nurture sequence.
 */

/**
 * The exact line shown under the form. It is copied into the email Christian
 * receives, so there is a record of what each person agreed to. Bump the
 * version whenever the wording changes.
 */
export const DROPS_CONSENT_VERSION = "2026-10-06.v1";
export const DROPS_CONSENT_TEXT =
  "Christian Brinkley will email you when a new tool is out. No spam. Your email is never sold or shared. " +
  "Reply unsubscribe to any email and you're off the list.";

/**
 * The guide list: the same one-email-to-Christian pipeline as tool drops,
 * for readers who want new guides instead of new tools. Separate consent
 * wording, separate version, so the record of what each person agreed to
 * stays exact.
 */
export const GUIDE_DROPS_CONSENT_VERSION = "2026-10-08.v1";
export const GUIDE_DROPS_CONSENT_TEXT =
  "Christian Brinkley will email you when a new guide is out. No spam. Your email is never sold or shared. " +
  "Reply unsubscribe to any email and you're off the list.";

export type DropsList = "tools" | "guides";

export function normalizeDropsList(value: unknown): DropsList {
  return value === "guides" ? "guides" : "tools";
}

export const DROPS_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeDropsEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !DROPS_EMAIL_PATTERN.test(email)) return null;
  return email;
}
