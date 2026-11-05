import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/retirement-check/route";

function post(body: unknown, ip = "203.0.113.7") {
  return new Request("http://localhost/api/retirement-check", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/retirement-check", () => {
  it("returns cited findings for a COBRA trap", async () => {
    const response = await POST(
      post({ birthMonth: 6, birthYear: 1958, medicare: "part_a_only", coverage: "cobra" }),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = (await response.json()) as {
      findings: Array<{ title: string; source: string }>;
      note: string;
    };
    expect(body.findings.some((f) => f.title.includes("COBRA"))).toBe(true);
    expect(body.note).toContain("North Carolina only");
  });

  it("rejects bad input with a 400", async () => {
    expect((await POST(post("not json"))).status).toBe(400);
    expect((await POST(post([1, 2]))).status).toBe(400);
    expect((await POST(post({ birthYear: 1958 }))).status).toBe(400);
  });

  it("rate limits a flood from one address", async () => {
    let last = 200;
    for (let i = 0; i < 35; i++) {
      last = (
        await POST(
          post(
            { birthMonth: 1, birthYear: 1960, medicare: "none", coverage: "none" },
            "198.51.100.9",
          ),
        )
      ).status;
    }
    expect(last).toBe(429);
  });
});
