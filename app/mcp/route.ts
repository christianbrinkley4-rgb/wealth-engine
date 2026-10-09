import { GET as brief } from "@/app/llms.txt/route";
import { GET as full } from "@/app/llms-full.txt/route";
import { ROTH_DEFINITION } from "@/lib/editorial";
import { SITE_URL } from "@/lib/seo";

const VERSIONS = ["2025-03-26", "2025-06-18", "2025-11-25"];
const RESOURCES = [
  { uri: SITE_URL + "/llms.txt", name: "Site brief", mimeType: "text/plain" },
  { uri: SITE_URL + "/llms-full.txt", name: "Public page directory", mimeType: "text/plain" },
  {
    uri: SITE_URL + "/wealth/roth-ira-explained#definition",
    name: "Roth IRA definition and sources",
    mimeType: "application/json",
  },
];
const HEADERS = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
type Id = string | number | null;
function error(id: Id, code: number, message: string, status = 200) {
  return Response.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { status, headers: HEADERS },
  );
}
function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  return origin === null || origin === SITE_URL;
}
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Stateless public resources only. No tools, user data, remote fetching, or mutation. */
export async function POST(request: Request) {
  if (!originAllowed(request)) return error(null, -32600, "Origin is not allowed.", 403);
  const version = request.headers.get("mcp-protocol-version");
  if (version && !VERSIONS.includes(version))
    return error(null, -32600, "Unsupported protocol version.", 400);
  const accept = request.headers.get("accept") || "";
  if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
    return error(null, -32600, "Accept must include JSON and event streams.", 406);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return error(null, -32600, "Use application/json.", 415);
  }
  let message: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error(null, -32700, "Empty request.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16 * 1024) {
        await reader.cancel();
        return error(null, -32600, "Request is too large.", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    message = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    return error(null, -32700, "Invalid JSON.", 400);
  }
  if (
    !record(message) ||
    message.jsonrpc !== "2.0" ||
    typeof message.method !== "string" ||
    (message.params !== undefined && !record(message.params))
  ) {
    return error(null, -32600, "Invalid request.", 400);
  }
  if (!("id" in message)) return new Response(null, { status: 202, headers: HEADERS });
  if (
    typeof message.id !== "string" &&
    (typeof message.id !== "number" || !Number.isFinite(message.id))
  ) {
    return error(null, -32600, "Invalid request ID.", 400);
  }
  const id = message.id as string | number;
  const params = (message.params || {}) as Record<string, unknown>;
  let result: unknown;
  switch (message.method) {
    case "initialize":
      if (
        typeof params.protocolVersion !== "string" ||
        !record(params.capabilities) ||
        !record(params.clientInfo) ||
        typeof params.clientInfo.name !== "string" ||
        typeof params.clientInfo.version !== "string"
      ) {
        return error(
          id,
          -32602,
          "Initialization requires protocolVersion, capabilities, and clientInfo.",
        );
      }
      result = {
        protocolVersion: VERSIONS.includes(params.protocolVersion)
          ? params.protocolVersion
          : VERSIONS[2],
        capabilities: { resources: {} },
        serverInfo: { name: "christian-brinkley-education", version: "1.0.0" },
        instructions:
          "Public educational material. Cite the linked primary sources. This is not personal financial advice.",
      };
      break;
    case "ping":
      result = {};
      break;
    case "resources/list":
      if (params.cursor !== undefined)
        return error(id, -32602, "This resource list has no cursor.");
      result = { resources: RESOURCES };
      break;
    case "resources/read": {
      const resource = RESOURCES.find((item) => item.uri === params.uri);
      if (!resource) return error(id, -32002, "Resource not found.");
      const text =
        resource === RESOURCES[0]
          ? await brief().text()
          : resource === RESOURCES[1]
            ? await full().text()
            : JSON.stringify({
                ...ROTH_DEFINITION,
                reviewed: "2026-10-09",
                scope: "General education.",
              });
      result = { contents: [{ ...resource, text }] };
      break;
    }
    default:
      return error(id, -32601, "Method not found.");
  }
  return Response.json({ jsonrpc: "2.0", id, result }, { headers: HEADERS });
}

/** This server has no asynchronous event stream. */
export function GET(request: Request) {
  if (!originAllowed(request)) return error(null, -32600, "Origin is not allowed.", 403);
  const version = request.headers.get("mcp-protocol-version");
  if (version && !VERSIONS.includes(version))
    return error(null, -32600, "Unsupported protocol version.", 400);
  return new Response(null, { status: 405, headers: { ...HEADERS, Allow: "POST" } });
}
