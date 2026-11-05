/**
 * Voice mode for the retirement mistake checker.
 *
 * Runs entirely in the visitor's browser: the browser's built-in speech reads
 * the questions and listens for answers, a fixed script (lib/voiceScript.ts)
 * matches what was said, and the same tested checkRetirement() produces the
 * results. No AI, no paid service, nothing sent to this site.
 */

/**
 * Christian approved the disclosure wording below on 2026-11-05. Any change to
 * it needs his OK again before it ships (CLAUDE.md: ask before changing what a
 * visitor agrees to). Set this to false to hide voice mode.
 */
const APPROVED_FOR_LIVE = true;

export function voiceCheckerEnabled(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return APPROVED_FOR_LIVE || env.NEXT_PUBLIC_VOICE_PREVIEW === "1";
}

/** Shown before anyone can start. */
export const VOICE_DISCLOSURE = [
  "It's an automated voice, not Christian. It asks the same questions as the form below and reads back the same results.",
  "Your browser does the listening and the reading aloud. Depending on your browser, its maker, such as Google, Apple or Microsoft, may handle that speech. This site never receives or keeps your voice or your answers.",
  "Please don't say your name, Medicare number, Social Security number or health details. You don't need them.",
  "Results are educational, not plan, tax or legal advice.",
] as const;
