import { NextRequest, NextResponse } from "next/server";

import {
  PLAN_LETTER_MAX_FILES,
  PLAN_LETTER_MAX_PDF_PAGES,
  PLAN_LETTER_MAX_TOTAL_BYTES,
  PLAN_LETTER_SYSTEM_PROMPT,
  countPdfPages,
  extractJson,
  parsePlanLetterSummary,
  sniffType,
} from "@/lib/planLetter";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { isTurnstileConfigured, verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

/**
 * POST /api/plan-letter: read an Annual Notice of Change with an AI model.
 * Off unless PLAN_LETTER_ENABLED=true, ANTHROPIC_API_KEY is set, and the
 * Turnstile spam check is configured: every call costs money, so it never
 * runs without the bot check. Also set a monthly spend limit on the API key.
 * The uploaded file and the model's reply are never stored or logged.
 */
export async function POST(req: NextRequest) {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  if (process.env.PLAN_LETTER_ENABLED !== "true" || !key || !isTurnstileConfigured()) {
    return NextResponse.json({ error: "not_enabled" }, { status: 503 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(`plan-letter:${ip}`, { limit: 5, windowMs: 3_600_000 })) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const token = form.get("turnstileToken");
  const check = await verifyTurnstile(typeof token === "string" ? token : undefined, ip);
  if (!check.ok) return NextResponse.json({ error: "form_check" }, { status: 400 });

  const files = form.getAll("files").filter((item): item is File => item instanceof File);
  if (files.length === 0 || files.length > PLAN_LETTER_MAX_FILES) {
    return NextResponse.json({ error: "file_count" }, { status: 400 });
  }
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > PLAN_LETTER_MAX_TOTAL_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  const content: Array<Record<string, unknown>> = [];
  let pdfPages = 0;
  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = sniffType(bytes);
    if (!type) return NextResponse.json({ error: "file_type" }, { status: 415 });
    if (type === "application/pdf") {
      pdfPages += countPdfPages(bytes);
      if (pdfPages > PLAN_LETTER_MAX_PDF_PAGES) {
        return NextResponse.json({ error: "too_many_pages" }, { status: 413 });
      }
    }
    const data = Buffer.from(bytes).toString("base64");
    content.push(
      type === "application/pdf"
        ? { type: "document", source: { type: "base64", media_type: type, data } }
        : { type: "image", source: { type: "base64", media_type: type, data } },
    );
  }
  content.push({
    type: "text",
    text: "Here is my plan's Annual Notice of Change. Explain what changes for me next year, following your rules. Return only the JSON.",
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45_000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.PLAN_LETTER_MODEL?.trim() || "claude-sonnet-5-5",
        max_tokens: 1500,
        system: PLAN_LETTER_SYSTEM_PROMPT,
        messages: [{ role: "user", content }],
      }),
    });
    if (!res.ok) {
      // Status only. Never log the file or the reply.
      console.error("plan-letter: model request failed", res.status);
      return NextResponse.json({ error: "model_error" }, { status: 502 });
    }
    const body = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const text = (body.content ?? [])
      .filter((part) => part.type === "text" && typeof part.text === "string")
      .map((part) => part.text)
      .join("");
    const summary = parsePlanLetterSummary(extractJson(text));
    if (!summary) return NextResponse.json({ error: "unreadable" }, { status: 422 });
    return NextResponse.json({ summary }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    console.error("plan-letter:", aborted ? "timeout" : "request error");
    return NextResponse.json({ error: aborted ? "timeout" : "model_error" }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
