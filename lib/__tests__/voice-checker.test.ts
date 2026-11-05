import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { VOICE_DISCLOSURE, voiceCheckerEnabled } from "@/lib/voiceChecker";

const root = join(__dirname, "..", "..");
const src = (path: string) => readFileSync(join(root, path), "utf8");
const EM = String.fromCharCode(0x2014);
const VOICE_FILES = [
  "app/retirement-mistake-checker/VoiceCheck.tsx",
  "app/retirement-mistake-checker/browserSpeech.ts",
  "lib/voiceScript.ts",
  "lib/voiceChecker.ts",
];

describe("voice checker", () => {
  it("stays off unless approved or previewed locally", () => {
    expect(voiceCheckerEnabled({ NEXT_PUBLIC_VOICE_PREVIEW: "1" })).toBe(true);
    const approved = /const APPROVED_FOR_LIVE = (true|false);/.exec(
      src("lib/voiceChecker.ts"),
    )?.[1];
    expect(voiceCheckerEnabled({})).toBe(approved === "true");
  });

  it("discloses who handles speech, no personal details and no advice before start", () => {
    const text = VOICE_DISCLOSURE.join(" ");
    expect(text).toMatch(/not Christian/);
    expect(text).toMatch(/Google, Apple or Microsoft/);
    expect(text).toMatch(/never receives or keeps your voice or your answers/);
    expect(text).toMatch(/Medicare number/);
    expect(text).toMatch(/not plan, tax or legal advice/);
    expect(text).not.toContain(EM);
  });

  it("sends nothing anywhere: no network calls and no third-party voice service", () => {
    for (const file of VOICE_FILES) {
      const code = src(file);
      expect(code, file).not.toMatch(/\bfetch\(|XMLHttpRequest|sendBeacon|WebSocket\(/);
      expect(code, file).not.toMatch(/elevenlabs|openai|anthropic/i);
      expect(code, file).not.toContain(EM);
    }
  });

  it("renders the voice card and its privacy answer only behind the flag", () => {
    const page = src("app/retirement-mistake-checker/page.tsx");
    expect(page).toMatch(/VOICE_ON \? \(\s*<div[^>]*>\s*<VoiceCheck \/>/);
    expect(page).toMatch(/a: VOICE_ON\s*\?/);
  });

  it("measures only that the tool was used, never the answers", () => {
    const code = src("app/retirement-mistake-checker/VoiceCheck.tsx");
    const calls = code.match(/trackEvent\([^)]*\)/g) ?? [];
    expect(calls.length).toBeGreaterThan(0);
    for (const call of calls) expect(call).toMatch(/tool_id: "retirement_checker_voice"/);
  });
});
