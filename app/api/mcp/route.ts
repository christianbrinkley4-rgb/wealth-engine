import { NextRequest, NextResponse } from "next/server";

import { GET as llmsTxtGet } from "@/app/llms.txt/route";
import { SITE_URL } from "@/lib/seo";

import { guideMarkdown, mcpToolCatalog, numbers2027Markdown, searchMcpDocs } from "./content";

/**
 * MCP (Model Context Protocol) endpoint, Streamable HTTP transport,
 * stateless: every POST is a self-contained JSON-RPC 2.0 message.
 *
 * Supported methods: initialize, ping, tools/list, tools/call,
 * resources/list, resources/read. Notifications (e.g. notifications/
 * initialized) are accepted with an empty 202. Anything else returns a
 * JSON-RPC error. No sessions, no auth: this only serves public content.
 */

export const dynamic = "force-dynamic";

const SERVER_NAME = "christianbrinkleync-content";
const SERVER_VERSION = "1.0.0";
const SUPPORTED_PROTOCOLS = ["2025-06-18", "2024-11-05"] as const;

type JsonRpcId = string | number | null;
type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method?: string;
  params?: Record<string, unknown>;
};

function jsonRpcResult(id: JsonRpcId, result: unknown): NextResponse {
  return NextResponse.json({ jsonrpc: "2.0", id, result });
}

function jsonRpcError(id: JsonRpcId, code: number, message: string, status = 200): NextResponse {
  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { status },
  );
}

const MCP_TOOLS = [
  {
    name: "search_guides",
    title: "Search guides and articles",
    description:
      "Search the site's guides and wealth articles by keyword. Returns matching titles, summaries, and URLs. Use it first, then get_guide for full text.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What the user is asking about, e.g. 'Roth IRA' or 'Part D cap'." },
        limit: { type: "integer", description: "Max results to return.", minimum: 1, maximum: 20, default: 8 },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "get_guide",
    title: "Read a full guide",
    description:
      "Get the full text of a guide or wealth article by its slug (the slug returned by search_guides). Data-driven guides return complete markdown; static pages return a summary plus their URL.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string", description: "Guide slug, e.g. 'overtime-tax-deduction-2026'." },
      },
      required: ["slug"],
      additionalProperties: false,
    },
  },
  {
    name: "list_tools",
    title: "List the money calculators",
    description:
      "List the site's free money calculators, quizzes, and downloads with descriptions and URLs.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_2027_numbers",
    title: "2027 Medicare and tax figures",
    description:
      "The key 2027 Medicare figures (Part D deductible and cap, Part B projections, key dates), each labeled final or projected with its source. Notes that 2027 tax figures are not announced yet.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

function toolResultText(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

async function handleToolCall(params: Record<string, unknown> | undefined, id: JsonRpcId): Promise<NextResponse> {
  const name = params?.["name"];
  const args = (params?.["arguments"] ?? {}) as Record<string, unknown>;
  if (typeof name !== "string") {
    return jsonRpcError(id, -32602, "tools/call requires a string 'name' param.");
  }
  switch (name) {
    case "search_guides": {
      if (typeof args["query"] !== "string" || !args["query"].trim()) {
        return jsonRpcError(id, -32602, "search_guides requires a non-empty string 'query'.");
      }
      const limit =
        typeof args["limit"] === "number" && Number.isInteger(args["limit"])
          ? Math.min(Math.max(args["limit"], 1), 20)
          : 8;
      const results = searchMcpDocs(args["query"], limit);
      return jsonRpcResult(id, toolResultText(JSON.stringify(results, null, 2)));
    }
    case "get_guide": {
      if (typeof args["slug"] !== "string" || !args["slug"].trim()) {
        return jsonRpcError(id, -32602, "get_guide requires a non-empty string 'slug'.");
      }
      const guide = guideMarkdown(args["slug"]);
      if (!guide) {
        return jsonRpcResult(
          id,
          toolResultText(`No guide found for slug "${args["slug"]}". Try search_guides to find the right one.`),
        );
      }
      return jsonRpcResult(id, toolResultText(guide.markdown));
    }
    case "list_tools":
      return jsonRpcResult(id, toolResultText(JSON.stringify(mcpToolCatalog(), null, 2)));
    case "get_2027_numbers":
      return jsonRpcResult(id, toolResultText(numbers2027Markdown()));
    default:
      return jsonRpcError(id, -32602, `Unknown tool: ${name}.`);
  }
}

function handleInitialize(params: Record<string, unknown> | undefined, id: JsonRpcId): NextResponse {
  const clientProtocol = typeof params?.["protocolVersion"] === "string" ? params["protocolVersion"] : undefined;
  const protocolVersion = SUPPORTED_PROTOCOLS.includes(clientProtocol as (typeof SUPPORTED_PROTOCOLS)[number])
    ? clientProtocol
    : SUPPORTED_PROTOCOLS[0];
  return jsonRpcResult(id, {
    protocolVersion,
    capabilities: { tools: {}, resources: {} },
    serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
    instructions:
      "Public content from christianbrinkleync.com: Medicare and money guides, wealth articles, free calculators, and 2027 figures. Everything is educational, never personal financial, tax, legal, or investment advice. Verify changing rules against official sources.",
  });
}

async function handleResourcesRead(params: Record<string, unknown> | undefined, id: JsonRpcId): Promise<NextResponse> {
  const uri = params?.["uri"];
  if (typeof uri !== "string") {
    return jsonRpcError(id, -32602, "resources/read requires a string 'uri' param.");
  }
  if (uri === "site:///llms.txt") {
    const response = llmsTxtGet();
    const text = await response.text();
    return jsonRpcResult(id, {
      contents: [{ uri, mimeType: "text/plain", text }],
    });
  }
  if (uri === "site:///medicare-numbers-2027") {
    return jsonRpcResult(id, {
      contents: [{ uri, mimeType: "text/markdown", text: numbers2027Markdown() }],
    });
  }
  return jsonRpcError(id, -32602, `Unknown resource URI: ${uri}.`);
}

async function handleSingleRequest(body: JsonRpcRequest): Promise<NextResponse | null> {
  const isNotification = body.id === undefined;
  if (body.jsonrpc !== "2.0" || typeof body.method !== "string") {
    return jsonRpcError(body.id ?? null, -32600, "Invalid JSON-RPC 2.0 request.", 400);
  }
  const { id, method, params } = body;

  switch (method) {
    case "initialize":
      return handleInitialize(params, id ?? null);
    case "ping":
      return jsonRpcResult(id ?? null, {});
    case "tools/list":
      return jsonRpcResult(id ?? null, { tools: MCP_TOOLS });
    case "tools/call":
      return handleToolCall(params, id ?? null);
    case "resources/list":
      return jsonRpcResult(id ?? null, {
        resources: [
          {
            uri: "site:///llms.txt",
            name: "llms.txt",
            title: "Site machine index",
            description: "Machine-readable index of the site's pages.",
            mimeType: "text/plain",
          },
          {
            uri: "site:///medicare-numbers-2027",
            name: "2027 Medicare numbers",
            title: "2027 Medicare numbers",
            description: "2027 Medicare figures, each labeled final or projected, plus key dates.",
            mimeType: "text/markdown",
          },
        ],
      });
    case "resources/read":
      return handleResourcesRead(params, id ?? null);
    default:
      // MCP notifications are accepted silently with a 202.
      if (method.startsWith("notifications/") || isNotification) {
        return new NextResponse(null, { status: 202 });
      }
      return jsonRpcError(id ?? null, -32601, `Method not found: ${method}.`);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonRpcError(null, -32700, "Request body is not valid JSON.", 400);
  }

  // Batch requests: handle each in order (rare, but valid JSON-RPC).
  if (Array.isArray(body)) {
    if (body.length === 0) return jsonRpcError(null, -32600, "Empty batch request.");
    const responses: unknown[] = [];
    for (const item of body) {
      const response = await handleSingleRequest(item as JsonRpcRequest);
      if (response && response.status !== 202) responses.push(await response.json());
    }
    if (responses.length === 0) return new NextResponse(null, { status: 202 });
    return NextResponse.json(responses);
  }

  const response = await handleSingleRequest(body as JsonRpcRequest);
  return response ?? new NextResponse(null, { status: 202 });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      ok: true,
      name: SERVER_NAME,
      version: SERVER_VERSION,
      endpoint: `${SITE_URL}/api/mcp`,
      transport: "mcp-streamable-http",
      usage: "POST JSON-RPC 2.0 requests here. See /ai/connect for setup instructions.",
    },
    { status: 200 },
  );
}
