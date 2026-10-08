/**
 * Server-side version of the shareable result card, rendered by the dynamic
 * opengraph-image and twitter-image routes. Same branding as the client
 * canvas card: navy, gold, big headline number, one-line label, tool name.
 */

import { SHARE_BRAND, type ShareCardData } from "./share-card-data";

/** Pick a headline size that fits 1200px wide, mirroring the canvas fit. */
function headlineFontSize(headlineNumber: string): number {
  if (headlineNumber.length <= 7) return 150;
  if (headlineNumber.length <= 10) return 118;
  return 92;
}

export function ShareCardOg({ data }: { data: ShareCardData }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: SHARE_BRAND.navy,
        padding: "28px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `3px solid ${SHARE_BRAND.gold}`,
          borderRadius: 18,
          padding: "44px 44px 40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", background: SHARE_BRAND.gold, width: 96, height: 6 }} />
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontFamily: "sans-serif",
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: SHARE_BRAND.gold,
            }}
          >
            {data.toolName.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: headlineFontSize(data.headlineNumber),
              fontWeight: 700,
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            {data.headlineNumber}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: "sans-serif",
              fontSize: 42,
              fontWeight: 500,
              color: SHARE_BRAND.paper,
            }}
          >
            {data.headlineLabel}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontFamily: "sans-serif" }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#ffffff" }}>
            {SHARE_BRAND.name}
          </div>
          <div style={{ display: "flex", marginLeft: 28, fontSize: 32, fontWeight: 500, color: SHARE_BRAND.gold }}>
            {SHARE_BRAND.domain}
          </div>
        </div>
      </div>
    </div>
  );
}
