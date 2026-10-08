import { ImageResponse } from "next/og";

import { getPersonality, PERSONALITIES } from "@/lib/wealth/quizzes";
import { WEALTH_BRAND } from "@/lib/wealth/site";

/** A share card per money personality, in that type's color. */

export const alt = "A money personality from the christianbuildswealth quiz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PERSONALITIES.map((type) => ({ type: type.id }));
}

const COLORS: Record<string, { background: string; text: string }> = {
  vault: { background: "#c8f73c", text: "#0f1f22" },
  vibe: { background: "#ff6a45", text: "#0f1f22" },
  ghost: { background: "#dfe6ff", text: "#0f1f22" },
  grinder: { background: "#2b46f0", text: "#ffffff" },
};

export default async function PersonalityImage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const result = getPersonality(type) ?? PERSONALITIES[0];
  const color = COLORS[result.id];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: color.background,
        color: color.text,
        padding: "64px 72px",
        fontFamily: "sans-serif",
        border: "14px solid #0f1f22",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: "0.08em" }}>
        MY MONEY PERSONALITY
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}>
          {result.name}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 48, fontWeight: 600 }}>{result.tagline}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30 }}>
        <div style={{ display: "flex" }}>What&apos;s yours? 8 questions, 2 minutes.</div>
        <div
          style={{
            display: "flex",
            background: "#0f1f22",
            color: "#c8f73c",
            padding: "10px 20px",
            borderRadius: 12,
          }}
        >
          {WEALTH_BRAND}
        </div>
      </div>
    </div>,
    size,
  );
}
