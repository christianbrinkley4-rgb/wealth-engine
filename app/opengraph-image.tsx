import { ImageResponse } from "next/og";

import { AGENT } from "@/lib/agent";

/**
 * The layout declared `twitter:card = summary_large_image` while the site had
 * no share image at all, so every link shared to Facebook, Nextdoor, iMessage
 * or a text message rendered as an empty grey box with a URL under it — the
 * least trustworthy thing a link can look like, on a site whose whole argument
 * is that it isn’t a lead marketplace.
 */

export const alt = `${AGENT.name} — licensed insurance agent in ${AGENT.city}, ${AGENT.state}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0f2241",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a84c",
            fontWeight: 600,
          }}
        >
          {`${AGENT.city} · ${AGENT.region}`}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 68,
            lineHeight: 1.15,
            fontWeight: 700,
            color: "#f5f0e8",
            maxWidth: 940,
          }}
        >
          Medicare and retirement questions, answered in person.
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 32,
            lineHeight: 1.4,
            color: "rgba(245, 240, 232, 0.82)",
            maxWidth: 900,
          }}
        >
          Personal Medicare and insurance help. No-cost consultation.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          borderTop: "1px solid rgba(245, 240, 232, 0.22)",
          paddingTop: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 68,
            height: 68,
            borderRadius: 14,
            background: "#f5f0e8",
            color: "#0f2241",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          CB
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 32, fontWeight: 600, color: "#f5f0e8" }}>{AGENT.name}</div>
          <div style={{ fontSize: 26, color: "rgba(245, 240, 232, 0.75)" }}>
            {`Licensed insurance agent · ${AGENT.phone}`}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
