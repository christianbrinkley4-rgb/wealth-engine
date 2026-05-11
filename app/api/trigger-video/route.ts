import crypto from "node:crypto";

export const runtime = "nodejs";

const VIDEO_WEBHOOK_URL =
  process.env.AI_VIDEO_WEBHOOK_URL ?? "https://api.example.com/REPLACE_VIDEO_WEBHOOK";
const VIDEO_WEBHOOK_SECRET = process.env.AI_VIDEO_WEBHOOK_SECRET;

interface TriggerVideoPayload {
  firstName: string;
  calculatedTaxDrag: number;
  email?: string;
}

function sanitizeFirstName(value: string) {
  return value.trim().replace(/[^a-zA-Z-' ]/g, "").slice(0, 40);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TriggerVideoPayload>;
    const firstName = sanitizeFirstName(body.firstName ?? "");
    const calculatedTaxDrag = Number(body.calculatedTaxDrag ?? 0);

    if (!firstName) {
      return Response.json({ error: "firstName is required." }, { status: 400 });
    }
    if (!Number.isFinite(calculatedTaxDrag) || calculatedTaxDrag < 0) {
      return Response.json({ error: "calculatedTaxDrag must be a valid number." }, { status: 400 });
    }

    const outboundPayload = {
      event: "strategic_video_request",
      variables: {
        firstName,
        calculatedTaxDrag,
        calculatedTaxDragDisplay: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(calculatedTaxDrag),
      },
      recipient: {
        email: body.email ?? null,
      },
      providerHint: "heygen_or_tavus",
      createdAt: new Date().toISOString(),
    };

    const rawPayload = JSON.stringify(outboundPayload);
    const timestamp = new Date().toISOString();
    const signature = VIDEO_WEBHOOK_SECRET
      ? crypto
          .createHmac("sha256", VIDEO_WEBHOOK_SECRET)
          .update(`${timestamp}.${rawPayload}`)
          .digest("hex")
      : undefined;

    const response = await fetch(VIDEO_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(signature ? { "x-video-signature": signature } : {}),
        ...(signature ? { "x-video-timestamp": timestamp } : {}),
      },
      body: rawPayload,
    });

    if (!response.ok) {
      return Response.json(
        { error: "AI video provider rejected request.", status: response.status },
        { status: 502 },
      );
    }

    return Response.json({ ok: true }, { status: 202 });
  } catch {
    return Response.json({ error: "Unable to trigger AI video workflow." }, { status: 500 });
  }
}
