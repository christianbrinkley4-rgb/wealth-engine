import { describe, expect, it } from "vitest";

import { estimateSpeechMs, pickVoice, splitForSpeech } from "@/lib/speechVoices";

describe("pickVoice", () => {
  it("prefers natural American voices and never picks novelty voices", () => {
    const voices = [
      { name: "Bubbles", lang: "en-US" },
      { name: "Fred", lang: "en-US", default: true },
      { name: "Daniel", lang: "en-GB" },
      { name: "Microsoft Aria Online (Natural) - English (United States)", lang: "en-US" },
      { name: "Samantha", lang: "en-US" },
    ];
    expect(pickVoice(voices)?.name).toMatch(/Aria Online \(Natural\)/);
    expect(pickVoice(voices.filter((v) => !/Aria/.test(v.name)))?.name).toBe("Samantha");
  });

  it("falls back to any English voice, then to none", () => {
    expect(pickVoice([{ name: "Daniel", lang: "en-GB" }])?.name).toBe("Daniel");
    expect(pickVoice([{ name: "Amelie", lang: "fr-FR" }])).toBeNull();
    expect(pickVoice([{ name: "Zarvox", lang: "en-US" }])).toBeNull();
  });
});

describe("splitForSpeech", () => {
  it("splits on sentences and keeps every piece short", () => {
    const text =
      "Got it: June 1958. Do you have Medicare yet? " +
      "This sentence is deliberately long, with several clauses, so that it has to be broken into smaller pieces at a sensible comma, because Chrome stops speaking long utterances, which would cut the answer off.";
    const parts = splitForSpeech(text, 80);
    expect(parts[0]).toBe("Got it: June 1958.");
    expect(parts[1]).toBe("Do you have Medicare yet?");
    for (const p of parts) expect(p.length).toBeLessThanOrEqual(81);
    expect(parts.join(" ").replace(/\s+/g, " ")).toBe(text.replace(/\s+/g, " "));
  });

  it("does not split dollar amounts or decimals", () => {
    expect(splitForSpeech("The limit is $24,480. That is for 2026.")).toEqual([
      "The limit is $24,480.",
      "That is for 2026.",
    ]);
  });
});

describe("estimateSpeechMs", () => {
  it("allows more time for longer text and slower speech", () => {
    const short = estimateSpeechMs("Do you have Medicare yet?");
    const long = estimateSpeechMs("word ".repeat(100));
    expect(long).toBeGreaterThan(short);
    expect(estimateSpeechMs("word ".repeat(100), 0.8)).toBeGreaterThan(long);
  });
});

describe("review fixes", () => {
  it("prefers an on-device voice so spoken answers stay on the phone", () => {
    const voices = [
      { name: "Google US English", lang: "en-US", localService: false },
      { name: "Microsoft Aria Online (Natural)", lang: "en-US", localService: false },
      { name: "Samantha", lang: "en-US", localService: true },
    ];
    expect(pickVoice(voices)?.name).toBe("Samantha");
  });

  it("uses no regex lookbehind anywhere in voice mode (older iPhones can't parse it)", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const root = join(__dirname, "..", "..");
    for (const file of [
      "lib/speechVoices.ts",
      "lib/voiceScript.ts",
      "lib/voiceChecker.ts",
      "app/retirement-mistake-checker/VoiceCheck.tsx",
      "app/retirement-mistake-checker/browserSpeech.ts",
      "app/retirement-mistake-checker/CheckerResults.tsx",
      "app/retirement-mistake-checker/CheckerForm.tsx",
    ]) {
      expect(readFileSync(join(root, file), "utf8"), file).not.toMatch(/\(\?<[=!]/);
    }
  });

  it("allows extra time for numbers, which take several words to say", () => {
    expect(estimateSpeechMs("$1,850 in 2027")).toBeGreaterThan(estimateSpeechMs("one two three"));
  });
});
