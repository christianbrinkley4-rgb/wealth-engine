import { neon } from "@neondatabase/serverless";

/** Server-only, parameterized calls to the same transactional Postgres functions. */
export async function neonEngineRpc(name: string, args: Record<string, unknown>) {
  const connection = process.env.LEAD_ENGINE_DATABASE_URL;
  if (!connection) throw new Error("engine_unconfigured");
  try {
    const parsed = new URL(connection);
    if (
      parsed.protocol !== "postgresql:" ||
      !parsed.hostname.endsWith(".neon.tech") ||
      !parsed.password
    )
      throw new Error();
  } catch {
    throw new Error("engine_unconfigured");
  }
  const sql = neon(connection, { fetchOptions: { signal: AbortSignal.timeout(12000) } });
  try {
    switch (name) {
      case "capture_engine_lead": {
        const rows = await sql.query(
          "select public.capture_engine_lead($1::uuid,$2::text,$3::jsonb) as result",
          [args.p_id, args.p_fingerprint, JSON.stringify(args.p_payload)],
        );
        return rows[0]?.result;
      }
      case "claim_engine_alerts":
        return await sql.query("select * from public.claim_engine_alerts($1::uuid)", [
          args.p_lead_id ?? null,
        ]);
      case "finish_engine_alert": {
        const rows = await sql.query(
          "select public.finish_engine_alert($1::uuid,$2::uuid,$3::boolean,$4::text,$5::text) as result",
          [
            args.p_id,
            args.p_lease_token,
            args.p_sent,
            args.p_provider_id ?? null,
            args.p_error ?? null,
          ],
        );
        return rows[0]?.result;
      }
      case "engine_queue_health": {
        const rows = await sql.query("select public.engine_queue_health() as result", []);
        return rows[0]?.result;
      }
      default:
        throw new Error("unknown_engine_operation");
    }
  } catch (error) {
    if ((error as { code?: string }).code === "23505") throw new Error("id_conflict");
    // Driver errors can contain SQL parameters. Keep contact data and credentials out of logs and responses.
    throw new Error("storage_unavailable");
  }
}
