import { ImageResponse } from "next/og";

/**
 * The site shipped create-next-app’s favicon, so every browser tab and
 * bookmark carried the Next.js logo rather than anything to do with this
 * business. Generated rather than checked in as a binary so the colours stay
 * tied to the palette in globals.css.
 */

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f2241",
        color: "#f5f0e8",
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        borderRadius: 12,
      }}
    >
      CB
    </div>,
    size,
  );
}
