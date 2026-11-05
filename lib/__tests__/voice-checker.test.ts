import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  captionText,
  VOICE_AGENT_ID,
  VOICE_DISCLOSURE,
  voiceCheckerEnabled,
} from "@/lib/voiceChecker";

const root = join(__dirname, "..", "..");
const src = (path: string) => readFileSync(join(root, path), "utf8");
const EM = String.fromCharCode(0x2014);
const EN = String.fromCharCode(0x2013);

describe("voice checker", () => {
  it("stays off unless approved or previewed locally", () => {
    expect(voiceCheckerEnabled({})).toBe(false);
    expect(voiceCheckerEnabled({ NEXT_PUBLIC_VOICE_PREVIEW: "0" })).toBe(false);
    expect(voiceCheckerEnabled({ NEXT_PUBLIC_VOICE_PREVIEW: "1" })).toBe(true);
  });

  it("points at the ElevenLabs agent", () => {
    expect(VOICE_AGENT_ID).toMatch(/^agent_[a-z0-9]+$/);
  });

  it("discloses AI, the voice provider, no PII and no advice before start", () => {
    const text = VOICE_DISCLOSURE.join(" ");
    expect(text).toMatch(/not Christian/);
    expect(text).toMatch(/ElevenLabs/);
    expect(text).toMatch(/Medicare number/);
    expect(text).toMatch(/not plan, tax or legal advice/);
    expect(text).not.toContain(EM);
  });

  it("loads the ElevenLabs SDK only after a tap", () => {
    const code = src("app/retirement-mistake-checker/VoiceCheck.tsx");
    const staticImports = code.match(/^import (?!type ).*from "@elevenlabs\/client";$/gm) ?? [];
    expect(staticImports).toEqual([]);
    expect(code).toContain('await import("@elevenlabs/client")');
    expect(code).not.toContain(EM);
  });

  it("renders the voice card and its privacy answer only behind the flag", () => {
    const page = src("app/retirement-mistake-checker/page.tsx");
    expect(page).toMatch(/VOICE_ON \? \(\s*<div[^>]*>\s*<VoiceCheck \/>/);
    expect(page).toMatch(/a: VOICE_ON\s*\?/);
  });

  it("cleans dashes and markdown out of captions", () => {
    expect(captionText(`traps people miss${EM}things like deadlines`)).toBe(
      "traps people miss, things like deadlines",
    );
    expect(captionText(`one ${EN} two`)).toBe("one, two");
    expect(captionText("**Act soon:** sign up")).toBe("Act soon: sign up");
    expect(captionText("  ok  ")).toBe("ok");
  });
});
