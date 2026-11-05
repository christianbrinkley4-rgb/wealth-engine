/**
 * Voice version of the retirement mistake checker.
 *
 * The ElevenLabs agent below asks the checker's questions out loud, then calls
 * POST /api/retirement-check (the same tested rules as the typed form) and
 * reads back only what that returns. It never answers from its own knowledge.
 *
 * Agent settings live in the ElevenLabs dashboard, not in this repo:
 * zero-retention mode, voice recording off, file uploads off, runs only from
 * christianbrinkleync.com, 3 conversations at once, 40 a day, 10 minutes each.
 */

export const VOICE_AGENT_ID = "agent_8401m6nyb6awfm7s921y5z9pwny1";

/**
 * The voice button stays hidden until Christian approves the disclosure
 * wording below (CLAUDE.md: ask before changing what a visitor agrees to).
 * NEXT_PUBLIC_VOICE_PREVIEW=1 shows it in a local build for testing.
 */
const APPROVED_FOR_LIVE = false;

export function voiceCheckerEnabled(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return APPROVED_FOR_LIVE || env.NEXT_PUBLIC_VOICE_PREVIEW === "1";
}

/** Shown before anyone can start. Keep in step with the agent's first message and widget terms. */
export const VOICE_DISCLOSURE = [
  "It's an automated assistant, not Christian and not a person.",
  "Your voice goes to ElevenLabs, our voice provider, only to run the conversation. It's set up not to record or keep it.",
  "Please don't share your name, Medicare number, Social Security number or health details. You don't need them.",
  "Results are educational, not plan, tax or legal advice.",
] as const;

/**
 * Caption text for the on-page transcript. The agent is told to speak plain
 * sentences, but models slip, and the site never shows em or en dashes or
 * markdown. Dashes become commas; asterisks and stray hashes are dropped.
 */
// Built from a string so the escapes survive formatting (en dash, em dash).
const DASHES = new RegExp("\\s*[\\u2013\\u2014]\\s*", "g");

export function captionText(text: string): string {
  return text
    .replace(DASHES, ", ")
    .replace(/[*#]+/g, "")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim();
}
