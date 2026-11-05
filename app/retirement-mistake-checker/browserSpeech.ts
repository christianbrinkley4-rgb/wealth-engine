/**
 * Thin wrappers over the browser's built-in speech (Web Speech API). Nothing
 * here sends anything to this site: speaking happens in the browser, and
 * listening is handled by the browser (which, depending on the browser, may
 * use its maker's speech service).
 */

import { estimateSpeechMs, pickVoice, splitForSpeech } from "@/lib/speechVoices";

export type VoiceSupport = "full" | "speak" | "none";

interface RecognitionResultList {
  length: number;
  [index: number]: { length: number; [index: number]: { transcript: string } };
}
interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((event: { results: RecognitionResultList }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecognitionCtor = new () => RecognitionLike;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function detectVoiceSupport(): VoiceSupport {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return "none";
  if (typeof window.SpeechSynthesisUtterance !== "function") return "none";
  return recognitionCtor() ? "full" : "speak";
}

/** Chrome loads its voice list late; asking early means the first sentence gets the right voice. */
export function warmUpVoices() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
  }
}

/** Speaks text in short pieces with the clearest voice available. */
export class Speaker {
  private rate: number;
  // Holding references avoids a Chrome bug where onend never fires after GC.
  private queue: SpeechSynthesisUtterance[] = [];
  private finishCurrent: (() => void) | null = null;
  private chosen: SpeechSynthesisVoice | null = null;

  constructor(rate = 0.92) {
    this.rate = rate;
  }

  /** The same voice for the whole conversation, once the browser has loaded its list. */
  private voice(): SpeechSynthesisVoice | null {
    if (!this.chosen) this.chosen = pickVoice(window.speechSynthesis.getVoices());
    return this.chosen;
  }

  speak(text: string): Promise<void> {
    const synth = window.speechSynthesis;
    // Chrome can drop an utterance queued right after cancel(), so only cancel
    // when something is actually playing, and give it a moment to clear. The
    // first line, inside the Start tap, has nothing to cancel and plays at once.
    const busy = synth.speaking || synth.pending;
    this.cancel();
    const pieces = splitForSpeech(text);
    if (pieces.length === 0) return Promise.resolve();
    const voice = this.voice();
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        window.clearTimeout(timer);
        this.finishCurrent = null;
        resolve();
      };
      // Whenever we stop early, silence everything still queued, so the
      // microphone never opens while the phone is still talking.
      const stopAndFinish = () => {
        synth.cancel();
        finish();
      };
      // If the browser never reports the end, carry on anyway.
      const timer = window.setTimeout(stopAndFinish, estimateSpeechMs(text, this.rate));
      this.finishCurrent = finish;
      this.queue = pieces.map((piece, i) => {
        const u = new SpeechSynthesisUtterance(piece);
        u.lang = "en-US";
        u.rate = this.rate;
        if (voice) u.voice = voice;
        if (i === pieces.length - 1) u.onend = finish;
        u.onerror = (event) => {
          // A cancel() we asked for reports "interrupted" or "canceled".
          if (event.error === "interrupted" || event.error === "canceled") finish();
          else stopAndFinish();
        };
        return u;
      });
      const begin = () => {
        if (done) return;
        synth.resume();
        for (const u of this.queue) synth.speak(u);
      };
      if (busy) window.setTimeout(begin, 120);
      else begin();
    });
  }

  cancel() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    this.finishCurrent?.();
    this.queue = [];
  }
}

export type HeardResult =
  | { kind: "heard"; alternatives: string[] }
  | { kind: "error"; error: string };

/** Errors that mean the microphone can't be used at all on this page. */
export const BLOCKED_ERRORS = new Set(["not-allowed", "service-not-allowed", "audio-capture"]);

/**
 * Listens for one answer. Resolves with the recognizer's guesses (best first)
 * or an error code such as "no-speech". Call abort() to stop early.
 */
export function listenOnce(timeoutMs = 15000): { result: Promise<HeardResult>; abort: () => void } {
  const Ctor = recognitionCtor();
  if (!Ctor) {
    return { result: Promise.resolve({ kind: "error", error: "unsupported" }), abort: () => {} };
  }
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 4;
  rec.continuous = false;
  let settle: (r: HeardResult) => void = () => {};
  let settled = false;
  const result = new Promise<HeardResult>((resolve) => {
    settle = (r) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      window.clearTimeout(hardStop);
      resolve(r);
    };
  });
  // At the time limit, stop() rather than abort(): Safari often holds the final
  // result until the recognizer stops, and abort() would throw it away.
  // If nothing arrives shortly after, give up.
  let hardStop = 0;
  const timer = window.setTimeout(() => {
    try {
      rec.stop();
    } catch {
      // already stopped
    }
    hardStop = window.setTimeout(() => {
      try {
        rec.abort();
      } catch {
        // already stopped
      }
      settle({ kind: "error", error: "no-speech" });
    }, 2000);
  }, timeoutMs);
  rec.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const alternatives: string[] = [];
    for (let i = 0; i < (last?.length ?? 0); i += 1) {
      const t = last[i]?.transcript?.trim();
      if (t) alternatives.push(t);
    }
    settle(
      alternatives.length ? { kind: "heard", alternatives } : { kind: "error", error: "no-match" },
    );
  };
  rec.onerror = (event) => settle({ kind: "error", error: event.error || "unknown" });
  rec.onend = () => settle({ kind: "error", error: "no-speech" });
  try {
    rec.start();
  } catch {
    settle({ kind: "error", error: "start-failed" });
  }
  return {
    result,
    abort: () => {
      try {
        rec.abort();
      } catch {
        // already stopped
      }
      settle({ kind: "error", error: "aborted" });
    },
  };
}
