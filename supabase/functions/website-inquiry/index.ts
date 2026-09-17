import { createClient } from "npm:@supabase/supabase-js@2.105.3";

// verify_jwt is disabled because this endpoint uses a dedicated website key.
// Authorization is checked BEFORE health or capture; there is no browser access.
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const reply = (body: object, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DELIVERY_STATUS = ["sent", "failed_retryable", "failed_permanent"];

function clip(value: unknown, max: number): string | null {
  if (typeof value !== "string" || value.length === 0) return null;
  return value.slice(0, max);
}

function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

async function sendStoredEmail(job: {
  recipient: string;
  subject: string;
  body_text: string;
  reply_to?: string | null;
}): Promise<{ ok: boolean; retryable: boolean; providerId?: string; error?: string }> {
  const resendKey = Deno.env.get("RESEND_API_KEY")?.trim();
  const resendFrom = Deno.env.get("RESEND_FROM")?.trim();
  if (!resendKey || !resendFrom) {
    return { ok: false, retryable: false, error: "sender_unconfigured" };
  }
  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [job.recipient],
        subject: job.subject,
        text: job.body_text,
        reply_to: job.reply_to || undefined,
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    return { ok: false, retryable: true, error: message.slice(0, 300) };
  }
  if (res.ok) {
    let providerId: string | undefined;
    try {
      const data: unknown = await res.json();
      const id = (data as { id?: unknown } | null)?.id;
      if (typeof id === "string" && id.length > 0) providerId = id.slice(0, 200);
    } catch {
      providerId = undefined;
    }
    return { ok: true, retryable: false, providerId };
  }
  const body = await res.text().catch(() => "");
  return {
    ok: false,
    retryable: isRetryableStatus(res.status),
    error: `HTTP ${res.status} · ${body.slice(0, 300)}`,
  };
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return reply({ error: "Method not allowed" }, 405);
  const token = request.headers.get("x-website-key") || "";
  if (!/^[a-f0-9]{64}$/.test(token)) return reply({ error: "Unauthorized" }, 401);
  try {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
    const hash = Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
    const { data: allowed, error: authError } = await db
      .from("website_ingress_keys")
      .select("name")
      .eq("key_sha256", hash)
      .eq("active", true)
      .maybeSingle();
    if (authError) return reply({ error: "Storage unavailable" }, 503);
    if (!allowed) return reply({ error: "Unauthorized" }, 401);
    const isWebsite = allowed.name === "wealth-engine";
    const isRetry = isWebsite || allowed.name === "delivery-retry";
    if (Number(request.headers.get("content-length") || 0) > 35000)
      return reply({ error: "Too large" }, 413);
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 35000) return reply({ error: "Too large" }, 413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return reply({ error: "Invalid request" }, 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body))
      return reply({ error: "Invalid request" }, 400);
    if (body.action === "claim_deliveries" || body.action === "retry_deliveries") {
      if (!isRetry) return reply({ error: "Unauthorized" }, 401);
      // claim_deliveries: website cron sends with its own Resend config.
      // retry_deliveries: Command Center sends when RESEND_* are set here.
      if (body.action === "retry_deliveries") {
        if (!Deno.env.get("RESEND_API_KEY")?.trim() || !Deno.env.get("RESEND_FROM")?.trim()) {
          return reply({ retried: 0, skipped: "sender_unconfigured" });
        }
      }
      const { data, error } = await db.rpc("claim_website_deliveries", { p_limit: 10 });
      if (error) return reply({ error: "Could not claim deliveries" }, 503);
      const jobs = Array.isArray(data) ? data : [];
      if (body.action === "claim_deliveries") {
        return reply({ claimed: jobs.length, jobs });
      }
      let retried = 0;
      for (const job of jobs) {
        if (!job || typeof job !== "object") continue;
        const id = typeof job.id === "string" ? job.id : "";
        const recipient = typeof job.recipient === "string" ? job.recipient : "";
        const subject = typeof job.subject === "string" ? job.subject : "";
        const bodyText = typeof job.body_text === "string" ? job.body_text : "";
        if (!UUID.test(id) || !recipient || !subject || !bodyText) continue;
        const sent = await sendStoredEmail({
          recipient,
          subject,
          body_text: bodyText,
          reply_to: typeof job.reply_to === "string" ? job.reply_to : null,
        });
        await db.rpc("mark_website_delivery", {
          p_outbox_id: id,
          p_status: sent.ok ? "sent" : sent.retryable ? "failed_retryable" : "failed_permanent",
          p_error: sent.error ?? null,
          p_provider_id: sent.providerId ?? null,
        });
        retried += 1;
      }
      return reply({ retried, claimed: jobs.length });
    }
    if (!isWebsite) return reply({ error: "Unauthorized" }, 401);
    if (body.action === "health") {
      const [inquiries, appointments] = await Promise.all([
        db.from("website_inquiries").select("id", { head: true }).limit(0),
        db.from("website_appointments").select("id", { head: true }).limit(0),
      ]);
      return reply(
        {
          ready: !inquiries.error,
          appointment_ready: !appointments.error,
          destination: "T65 Daily Command Center",
        },
        inquiries.error ? 503 : 200,
      );
    }
    if (body.action === "appointment") {
      const { data, error } = await db.rpc("capture_website_appointment", {
        p_payload: body.appointment,
      });
      if (error)
        return reply({ error: "Could not save appointment" }, error.code === "22023" ? 400 : 503);
      return reply(data);
    }
    if (body.action === "mark_delivery") {
      const outboxId = typeof body.outbox_id === "string" ? body.outbox_id : "";
      const status = typeof body.status === "string" ? body.status : "";
      if (!UUID.test(outboxId) || !DELIVERY_STATUS.includes(status))
        return reply({ error: "Invalid delivery report" }, 400);
      const { data, error } = await db.rpc("mark_website_delivery", {
        p_outbox_id: outboxId,
        p_status: status,
        p_error: typeof body.error === "string" ? body.error.slice(0, 500) : null,
        p_provider_id: typeof body.provider_id === "string" ? body.provider_id.slice(0, 200) : null,
        p_recipient: clip(body.recipient, 254),
        p_subject: clip(body.subject, 200),
        p_body_text: clip(body.body_text, 8000),
        p_reply_to: clip(body.reply_to, 254),
      });
      if (error)
        return reply({ error: "Could not record delivery" }, error.code === "22023" ? 400 : 503);
      return reply({ marked: data?.marked === true, status: data?.status ?? null });
    }
    if (body.action !== "capture") return reply({ error: "Invalid action" }, 400);
    const { data, error } = await db.rpc("capture_website_inquiry", {
      p_request_key: body.request_key,
      p_payload: body.lead,
    });
    if (error)
      return reply({ error: "Could not save inquiry" }, error.code === "22023" ? 400 : 503);
    if (!data || typeof data !== "object" || Array.isArray(data))
      return reply({ error: "Could not save inquiry" }, 503);
    if (data.duplicate === true) delete data.outbox;
    return reply(data);
  } catch {
    return reply({ error: "Service unavailable" }, 503);
  }
});
