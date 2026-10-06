// Regenerates public/review-qr.svg, the QR code on the printable review card.
// Run: node scripts/make-review-qr.mjs
// The link is fixed (lib/review.ts) so a printed card never goes stale.
import { writeFileSync } from "node:fs";
import QRCode from "qrcode";

const LINK = "https://christianbrinkleync.com/review?from=card";

const svg = await QRCode.toString(LINK, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  color: { dark: "#10302a", light: "#ffffff" },
});
writeFileSync(new URL("../public/review-qr.svg", import.meta.url), svg);
console.log(`Wrote public/review-qr.svg for ${LINK}`);
