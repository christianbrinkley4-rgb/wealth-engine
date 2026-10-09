import { describe, expect, it } from "vitest";
import { POST, GET } from "@/app/mcp/route";
import { SITE_URL } from "@/lib/seo";
import { ROTH_DEFINITION } from "@/lib/editorial";
const headers = {
  "content-type": "application/json",
  accept: "application/json, text/event-stream",
};
function request(body: unknown, extra: Record<string, string> = {}) {
  return new Request(SITE_URL + "/mcp", {
    method: "POST",
    headers: { ...headers, ...extra },
    body: JSON.stringify(body),
  });
}
const rpc = (method: string, params: unknown = {}) => ({ jsonrpc: "2.0", id: 1, method, params });
describe("public MCP resources", () => {
  it.each(["2025-03-26", "2025-06-18", "2025-11-25"])(
    "negotiates supported version %s",
    async (protocolVersion) => {
      const response = await POST(
        request(
          rpc("initialize", {
            protocolVersion,
            capabilities: {},
            clientInfo: { name: "test", version: "1" },
          }),
        ),
      );
      const body = await response.json();
      expect(body.result.protocolVersion).toBe(protocolVersion);
      expect(body.result.capabilities).toEqual({ resources: {} });
    },
  );
  it("negotiates a current version for an unfamiliar client version", async () => {
    const body = await (
      await POST(
        request(
          rpc("initialize", {
            protocolVersion: "future",
            capabilities: {},
            clientInfo: { name: "test", version: "1" },
          }),
        ),
      )
    ).json();
    expect(body.result.protocolVersion).toBe("2025-11-25");
  });
  it("lists only readable public resources and answers the Roth definition", async () => {
    const list = await (await POST(request(rpc("resources/list")))).json();
    expect(list.result.resources).toHaveLength(3);
    for (const resource of list.result.resources) {
      const response = await POST(request(rpc("resources/read", { uri: resource.uri })));
      const body = await response.json();
      expect(body.result.contents[0].text.length).toBeGreaterThan(100);
      if (resource.mimeType === "application/json") {
        const definition = JSON.parse(body.result.contents[0].text);
        expect(definition.text).toBe(ROTH_DEFINITION.text);
        expect(
          definition.sources.every((source: { href: string }) =>
            source.href.startsWith("https://www.irs.gov/"),
          ),
        ).toBe(true);
      }
    }
  });
  it("rejects arbitrary resources and unsupported methods", async () => {
    expect(
      (await (await POST(request(rpc("resources/read", { uri: "file:///secrets" })))).json()).error
        .code,
    ).toBe(-32002);
    expect((await (await POST(request(rpc("tools/call")))).json()).error.code).toBe(-32601);
  });
  it("accepts notifications without a response body", async () => {
    const response = await POST(request({ jsonrpc: "2.0", method: "notifications/initialized" }));
    expect(response.status).toBe(202);
    expect(await response.text()).toBe("");
  });
  it("rejects unsafe origins, invalid protocol headers, and incompatible transport headers", async () => {
    expect((await POST(request(rpc("ping"), { origin: "https://evil.example" }))).status).toBe(403);
    expect((await POST(request(rpc("ping"), { "mcp-protocol-version": "bad" }))).status).toBe(400);
    expect((await POST(request(rpc("ping"), { accept: "application/json" }))).status).toBe(406);
    expect((await POST(request(rpc("ping"), { "content-type": "text/plain" }))).status).toBe(415);
    expect((await POST(request(rpc("ping"), { origin: SITE_URL }))).status).toBe(200);
  });
  it("bounds request bodies and rejects malformed requests", async () => {
    expect((await POST(request({ padding: "x".repeat(17000) }))).status).toBe(413);
    expect((await POST(request([rpc("ping")]))).status).toBe(400);
    expect((await POST(request({ ...rpc("ping"), id: null }))).status).toBe(400);
    const bad = new Request(SITE_URL + "/mcp", { method: "POST", headers, body: "{" });
    expect((await (await POST(bad)).json()).error.code).toBe(-32700);
    expect((await (await POST(request(rpc("initialize")))).json()).error.code).toBe(-32602);
  });
  it("advertises POST when no asynchronous stream is supported", () => {
    const response = GET(new Request(SITE_URL + "/mcp"));
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
  });
});
