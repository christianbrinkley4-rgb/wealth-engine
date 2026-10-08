import { ImageResponse } from "next/og";

import { WEALTH_BRAND } from "@/lib/wealth/site";

/** Share card for the hub, in the hub's colors, so a link posted to social looks like it belongs. */

export const alt = `${WEALTH_BRAND}: free money tools from Christian Brinkley`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function WealthOpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#faf8f2",
        padding: "64px 72px",
        fontFamily: "sans-serif",
        color: "#0f1f22",
        border: "14px solid #0f1f22",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: "0.06em", color: "#2b46f0" }}>
        {WEALTH_BRAND.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
          Nobody taught you about money.
        </div>
        <div style={{ display: "flex", marginTop: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              background: "#c8f73c",
              padding: "0 18px",
            }}
          >
            I&apos;m 21 and licensed.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
        <div style={{ display: "flex" }}>Free calculators, quizzes and guides</div>
        <div style={{ display: "flex", background: "#0f1f22", color: "#c8f73c", padding: "10px 20px", borderRadius: 12 }}>
          christianbrinkleync.com/wealth
        </div>
      </div>
    </div>,
    size,
  );
}
