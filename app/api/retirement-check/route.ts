import { NextResponse } from "next/server";

import { runCheckRetirementTraps } from "@/lib/mcpRetirementTools";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";

/**
 * POST /api/retirement-check
 *
 * The same checker as /retirement-mistake-checker and the MCP tool, as plain
 * JSON, for the voice assistant (an ElevenLabs agent tool) to call so it reads
 * back tested, cited findings instead of improvising.
 *
 * Stateless: the request body is never logged or stored. Rate limited per IP.
 */

export const dynamic = "force-dynamic";

export async function POST(request: Request): Promise<NextResponse> {
  if (isRateLimited(`retirement-check:${getClientIp(request)}`, { limit: 30, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the facts as a JSON object." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Send the facts as a JSON object." }, { status: 400 });
  }
  const text = runCheckRetirementTraps(body as Record<string, unknown>);
  if (text.startsWith("ERROR:")) {
    return NextResponse.json({ error: text.slice(7) }, { status: 400 });
  }
  return new NextResponse(text, {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
