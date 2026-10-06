import type { Metadata } from "next";
import Image from "next/image";

import { AGENT } from "@/lib/agent";
import { REVIEW_ORIGIN, REVIEW_PATH } from "@/lib/review";

import { PrintButton } from "./PrintButton";

// Christian's own tool: print it, hand it over. Not linked from anywhere and
// not for search.
export const metadata: Metadata = {
  title: "Review card",
  robots: { index: false, follow: false },
  alternates: { canonical: `${REVIEW_PATH}/card` },
};

export default function ReviewCardPage() {
  return (
    <main className="rvc">
      <div className="shell">
        <div className="rvc-card">
          <Image
            src="/christian-brinkley-square.jpg"
            alt={`${AGENT.name}, licensed insurance agent in ${AGENT.city}, North Carolina`}
            width={192}
            height={192}
            sizes="96px"
            className="rvc-avatar"
          />
          <h1>Worked with me?</h1>
          <p>
            Thank you. A Google review helps neighbors find an agent they can call. Say what’s
            true, in your own words.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- a QR code is a plain SVG file */}
          <img
            src="/review-qr.svg"
            alt={`QR code that opens ${REVIEW_ORIGIN.replace("https://", "")}${REVIEW_PATH}`}
            width={220}
            height={220}
            className="rvc-qr"
          />
          <p className="rvc-scan">Point your phone camera at the square.</p>
          <p className="rvc-link">{REVIEW_ORIGIN.replace("https://", "")}/review</p>
          <p className="rvc-who">
            {AGENT.name} · {AGENT.licenseLine} · {AGENT.phone}
          </p>
        </div>
        <div className="rvc-actions">
          <PrintButton />
          <p>
            This page is for printing. The code sends people to the review page, the same one for
            everyone.
          </p>
        </div>
      </div>
    </main>
  );
}
