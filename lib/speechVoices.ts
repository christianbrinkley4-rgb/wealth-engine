/**
 * Pure helpers for the browser's built-in speech (Web Speech API), kept out of
 * the component so they can be tested without a browser.
 */

export interface VoiceLike {
  name: string;
  lang: string;
  localService?: boolean;
  default?: boolean;
}

// Novelty and character voices that ship with some systems. Never use them.
const NOVELTY =
  /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|deranged|hysterical|junior|ralph|fred|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley|kathy)\b/i;
const NATURAL = /\b(natural|neural)\b/i;
const QUALITY = /\b(premium|enhanced)\b/i;
const KNOWN_GOOD =
  /\b(samantha|ava|allison|aria|jenny|zoe|evan|nathan|tom|susan|google us english|michelle|guy)\b/i;

/**
 * The clearest American English voice available, or null to use the default.
 * On-device voices win over online ones: the spoken text includes the
 * visitor's answers and results, which shouldn't leave the phone to be read.
 */
export function pickVoice<V extends VoiceLike>(voices: readonly V[]): V | null {
  const us = voices.filter((v) => /^en[-_]us$/i.test(v.lang));
  const pool = us.length > 0 ? us : voices.filter((v) => /^en\b|^en[-_]/i.test(v.lang));
  let best: V | null = null;
  let bestScore = -Infinity;
  for (const v of pool) {
    if (NOVELTY.test(v.name)) continue;
    let score = 0;
    if (v.localService !== false) score += 20;
    if (NATURAL.test(v.name)) score += 6;
    if (QUALITY.test(v.name)) score += 5;
    if (KNOWN_GOOD.test(v.name)) score += 3;
    if (v.default) score += 1;
    if (score > bestScore) {
      best = v;
      bestScore = score;
    }
  }
  return best;
}

/**
 * Splits text into sentence-sized pieces. Chrome stops speaking long
 * utterances after about 15 seconds, so each piece stays short.
 */
export function splitForSpeech(text: string, max = 180): string[] {
  // No regex lookbehind here: Safari before iOS 16.4 can't parse it, and a
  // syntax error would take the whole page down on older iPhones.
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const sentences: string[] = [];
  let current: string[] = [];
  words.forEach((word, i) => {
    if (!word) return;
    current.push(word);
    const next = words[i + 1];
    if (/[.?!]$/.test(word) && (next === undefined || /^[A-Z0-9$"]/.test(next))) {
      sentences.push(current.join(" "));
      current = [];
    }
  });
  if (current.length) sentences.push(current.join(" "));
  const out: string[] = [];
  for (const sentence of sentences) {
    if (!sentence) continue;
    if (sentence.length <= max) {
      out.push(sentence);
      continue;
    }
    // Break overlong sentences at commas, then at spaces.
    let rest = sentence;
    while (rest.length > max) {
      let cut = rest.lastIndexOf(", ", max);
      if (cut < max / 3) cut = rest.lastIndexOf(" ", max);
      if (cut <= 0) cut = max;
      out.push(rest.slice(0, cut + 1).trim());
      rest = rest.slice(cut + 1).trim();
    }
    if (rest) out.push(rest);
  }
  return out;
}

/** A generous upper bound on how long text takes to say, for a safety timer. */
export function estimateSpeechMs(text: string, rate = 1): number {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  // "$1,850" or "2027" takes several spoken words; count them generously.
  const words = tokens.reduce((n, t) => n + (/\d/.test(t) ? 4 : 1), 0);
  const wordsPerSecond = 2.5 * rate;
  return Math.round((words / wordsPerSecond) * 1000 * 1.5) + 3000;
}
