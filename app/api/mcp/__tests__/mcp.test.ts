import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import { GET, POST } from "@/app/api/mcp/route";

/** MCP connector contract: initialize, tools, resources, errors. */

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/mcp", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

const rpc = async (body: unknown) => (await POST(post(body))).json() as Promise<{
  jsonrpc: string;
  id: number | null;
  result?: Record<string, unknown>;
  error?: { code: number; message: string };
}>;

const initialize = () =>
  rpc({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "0" } },
  });

describe("MCP initialize handshake", () => {
  it("negotiates the protocol version and identifies the server", async () => {
    const response = await initialize();
    expect(response.jsonrpc).toBe("2.0");
    expect(response.id).toBe(1);
    const result = response.result as Record<string, unknown>;
    expect(result.protocolVersion).toBe("2025-06-18");
    expect(result.serverInfo).toMatchObject({ name: "christianbrinkleync-content", version: "1.0.0" });
    expect((result.capabilities as Record<string, unknown>).tools).toBeDefined();
    expect((result.capabilities as Record<string, unknown>).resources).toBeDefined();
  });

  it("accepts the notifications/initialized handshake notice with a 202", async () => {
    const response = await POST(
      post({ jsonrpc: "2.0", method: "notifications/initialized", params: {} }),
    );
    expect(response.status).toBe(202);
  });
});

describe("MCP tools", () => {
  it("lists the four content tools", async () => {
    const response = await rpc({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
    const tools = (response.result as { tools: Array<{ name: string }> }).tools;
    expect(tools.map((tool) => tool.name).sort()).toEqual(
      ["get_2027_numbers", "get_guide", "list_tools", "search_guides"].sort(),
    );
    const search = tools.find((tool) => tool.name === "search_guides");
    expect(search?.inputSchema).toMatchObject({ required: ["query"] });
  });

  it("search_guides returns real matches for a money query", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "search_guides", arguments: { query: "Roth IRA" } },
    });
    const text = (response.result as { content: Array<{ text: string }> }).content[0].text;
    const results = JSON.parse(text) as Array<{ slug: string; title: string; url: string }>;
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.slug.includes("roth"))).toBe(true);
    expect(results[0]).toMatchObject({ slug: expect.any(String), title: expect.any(String), url: expect.stringContaining("http") });
  });

  it("search_guides finds Medicare content too", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: { name: "search_guides", arguments: { query: "Medicare plan not renewing Triad" } },
    });
    const text = (response.result as { content: Array<{ text: string }> }).content[0].text;
    expect(text.toLowerCase()).toContain("medicare");
  });

  it("get_guide returns full markdown for a data-driven guide", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: { name: "get_guide", arguments: { slug: "overtime-tax-deduction-2026" } },
    });
    const text = (response.result as { content: Array<{ text: string }> }).content[0].text;
    expect(text).toContain("# Overtime Tax Deduction 2026: What Actually Qualifies");
    expect(text).toContain("Fair Labor Standards Act");
    expect(text).toContain("## Checklist");
  });

  it("get_guide handles an unknown slug gracefully", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 6,
      method: "tools/call",
      params: { name: "get_guide", arguments: { slug: "no-such-guide" } },
    });
    const text = (response.result as { content: Array<{ text: string }> }).content[0].text;
    expect(text).toContain("No guide found");
  });

  it("list_tools returns the 8 calculators, quizzes, and downloads", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 7,
      method: "tools/call",
      params: { name: "list_tools", arguments: {} },
    });
    const text = (response.result as { content: Array<{ text: string }> }).content[0].text;
    const tools = JSON.parse(text) as Array<{ slug: string; url: string }>;
    expect(tools).toHaveLength(8);
    expect(tools.some((t) => t.slug === "compound-interest")).toBe(true);
    expect(tools.every((t) => t.url.includes("/tools/") || t.url.includes("/wealth/"))).toBe(true);
  });

  it("get_2027_numbers returns the verified Medicare figures", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 8,
      method: "tools/call",
      params: { name: "get_2027_numbers", arguments: {} },
    });
    const text = (response.result as { content: Array<{ text: string }> }).content[0].text;
    expect(text).toContain("$700");
    expect(text).toContain("$2,400");
    expect(text).toContain("Projection");
    expect(text).toContain("not announced 2027 tax brackets");
  });

  it("rejects a tool call with missing arguments", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 9,
      method: "tools/call",
      params: { name: "search_guides", arguments: {} },
    });
    expect(response.error?.code).toBe(-32602);
  });

  it("rejects an unknown tool name", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 10,
      method: "tools/call",
      params: { name: "delete_everything", arguments: {} },
    });
    expect(response.error?.code).toBe(-32602);
  });
});

describe("MCP resources", () => {
  it("lists the llms.txt index and the 2027 numbers resources", async () => {
    const response = await rpc({ jsonrpc: "2.0", id: 11, method: "resources/list", params: {} });
    const resources = (response.result as { resources: Array<{ uri: string }> }).resources;
    expect(resources.map((r) => r.uri)).toEqual(["site:///llms.txt", "site:///medicare-numbers-2027"]);
  });

  it("reads the real llms.txt content", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 12,
      method: "resources/read",
      params: { uri: "site:///llms.txt" },
    });
    const text = (response.result as { contents: Array<{ text: string }> }).contents[0].text;
    expect(text.length).toBeGreaterThan(1000);
    expect(text).toContain("christianbrinkleync");
  });

  it("reads the 2027 numbers as markdown", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 13,
      method: "resources/read",
      params: { uri: "site:///medicare-numbers-2027" },
    });
    const contents = (response.result as { contents: Array<{ mimeType: string; text: string }> }).contents;
    expect(contents[0].mimeType).toBe("text/markdown");
    expect(contents[0].text).toContain("2027 Medicare numbers");
  });

  it("rejects an unknown resource URI", async () => {
    const response = await rpc({
      jsonrpc: "2.0",
      id: 14,
      method: "resources/read",
      params: { uri: "site:///nope" },
    });
    expect(response.error?.code).toBe(-32602);
  });
});

describe("MCP error handling", () => {
  it("rejects an unknown method with -32601", async () => {
    const response = await rpc({ jsonrpc: "2.0", id: 15, method: "tools/destroy", params: {} });
    expect(response.error?.code).toBe(-32601);
    expect(response.error?.message).toContain("tools/destroy");
  });

  it("rejects a malformed JSON-RPC request with -32600", async () => {
    const response = await rpc({ id: 16, method: "ping" });
    expect(response.error?.code).toBe(-32600);
  });

  it("rejects an unparseable body with -32700", async () => {
    const response = await POST(post("{not json"));
    const body = (await response.json()) as { error: { code: number } };
    expect(body.error.code).toBe(-32700);
  });

  it("answers ping", async () => {
    const response = await rpc({ jsonrpc: "2.0", id: 17, method: "ping", params: {} });
    expect(response.result).toEqual({});
  });

  it("GET returns a human-readable description, not JSON-RPC", async () => {
    const response = await GET();
    const body = (await response.json()) as { endpoint: string };
    expect(body.endpoint).toContain("/api/mcp");
  });
});
