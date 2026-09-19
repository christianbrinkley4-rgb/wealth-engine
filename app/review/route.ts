import { NextResponse } from "next/server";
import { GOOGLE_WRITE_REVIEW_URL } from "@/lib/agent";

/**
 * christianbrinkleync.com/review — the short link for business cards, QR codes,
 * and the thank-you note after an appointment. Opens Google's "write a review"
 * box on the independent listing.
 */
export function GET() {
  const response = NextResponse.redirect(GOOGLE_WRITE_REVIEW_URL, 302);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
