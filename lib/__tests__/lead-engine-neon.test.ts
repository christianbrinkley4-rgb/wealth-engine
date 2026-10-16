import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
const { query } = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock("@neondatabase/serverless", () => ({ neon: () => ({ query }) }));
import { neonEngineRpc } from "../leadEngineNeon";
beforeEach(() => {
  vi.stubEnv(
    "LEAD_ENGINE_DATABASE_URL",
    "postgresql://test:synthetic@ep-test.us-east-1.aws.neon.tech/lead_engine?sslmode=require",
  );
  query.mockReset();
});
afterEach(() => vi.unstubAllEnvs());
describe("Neon capture adapter", () => {
  it("parameterizes contact data in the transactional function", async () => {
    query.mockResolvedValue([{ result: { stored: true, id: "id" } }]);
    expect(
      await neonEngineRpc("capture_engine_lead", {
        p_id: "id",
        p_fingerprint: "hash",
        p_payload: { name: "O'Name" },
      }),
    ).toEqual({ stored: true, id: "id" });
    expect(query.mock.calls[0][0]).not.toContain("O'Name");
    expect(query.mock.calls[0][1][2]).toBe(JSON.stringify({ name: "O'Name" }));
  });
  it("maps a reused request ID to a recoverable conflict", async () => {
    query.mockRejectedValue(Object.assign(new Error("private database detail"), { code: "23505" }));
    await expect(neonEngineRpc("capture_engine_lead", {})).rejects.toThrow("id_conflict");
  });
  it("keeps provider connection details out of errors", async () => {
    query.mockRejectedValue(new Error("private connection detail"));
    await expect(neonEngineRpc("engine_queue_health", {})).rejects.toThrow(/^storage_unavailable$/);
  });
  it("doesn't accept arbitrary function names", async () => {
    await expect(neonEngineRpc("drop_table", {})).rejects.toThrow();
    expect(query).not.toHaveBeenCalled();
  });
  it("sanitizes asynchronous queue claim failures", async () => {
    query.mockRejectedValue(new Error("private contact and connection details"));
    await expect(neonEngineRpc("claim_engine_alerts", {})).rejects.toThrow(/^storage_unavailable$/);
  });
  it("blocks connections outside the configured Neon service", async () => {
    vi.stubEnv("LEAD_ENGINE_DATABASE_URL", "postgresql://test:test@other.example/lead_engine");
    await expect(neonEngineRpc("engine_queue_health", {})).rejects.toThrow("engine_unconfigured");
  });
});
