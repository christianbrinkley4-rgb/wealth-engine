import { NextRequest, NextResponse } from "next/server";
import { campaignPath } from "@/lib/campaigns";

export async function GET(request: NextRequest, context: { params: Promise<{ channel: string }> }) {
  const { channel } = await context.params;
  const path = campaignPath(channel, request.nextUrl.searchParams);
  if (!path) return new NextResponse("Campaign link not found.", { status: 404 });
  const response = NextResponse.redirect(new URL(path, request.url), 302);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
