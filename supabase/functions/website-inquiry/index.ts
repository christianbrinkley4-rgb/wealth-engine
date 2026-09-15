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
      .eq("name", "wealth-engine")
      .eq("key_sha256", hash)
      .eq("active", true)
      .maybeSingle();
    if (authError) return reply({ error: "Storage unavailable" }, 503);
    if (!allowed) return reply({ error: "Unauthorized" }, 401);
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
    // Record the outcome of one queued delivery. This action reports on an
    // email; it never causes one. mark_website_delivery writes a row and, for a
    // permanently failed prospect reply, a task for Christian — nothing else.
    if (body.action === "mark_delivery") {
      const outboxId = typeof body.outbox_id === "string" ? body.outbox_id : "";
      const status = typeof body.status === "string" ? body.status : "";
      // Reject a malformed report before it reaches the database, so a bad id
      // cannot be distinguished from a real one by response timing or error.
      if (!UUID.test(outboxId) || !DELIVERY_STATUS.includes(status))
        return reply({ error: "Invalid delivery report" }, 400);
      const { data, error } = await db.rpc("mark_website_delivery", {
        p_outbox_id: outboxId,
        p_status: status,
        p_error: typeof body.error === "string" ? body.error.slice(0, 500) : null,
        p_provider_id: typeof body.provider_id === "string" ? body.provider_id.slice(0, 200) : null,
      });
      if (error)
        return reply({ error: "Could not record delivery" }, error.code === "22023" ? 400 : 503);
      // An id that is already sent, or no longer exists, answers 200 with
      // marked: false. Neither is a failure the website should retry.
      return reply({ marked: data?.marked === true, status: data?.status ?? null });
    }
    if (body.action !== "capture") return reply({ error: "Invalid action" }, 400);
    const { data, error } = await db.rpc("capture_website_inquiry", {
      p_request_key: body.request_key,
      p_payload: body.lead,
    });
    // Keep contact data, tokens and provider error detail out of logs/responses.
    if (error)
      return reply({ error: "Could not save inquiry" }, error.code === "22023" ? 400 : 503);
    if (!data || typeof data !== "object" || Array.isArray(data))
      return reply({ error: "Could not save inquiry" }, 503);
    // The outbox ids pass through to the website, which reports each delivery
    // back through mark_delivery. A duplicate owes no new deliveries: its rows
    // were queued by the first submission and may already be sent, so the ids
    // are withheld here as well as in SQL. Agreeing in two places is what keeps
    // a stale copy of either side from producing a second email.
    if (data.duplicate === true) delete data.outbox;
    return reply(data);
  } catch {
    return reply({ error: "Service unavailable" }, 503);
  }
});
