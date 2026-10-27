import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const turnstile = vi.hoisted(() => ({ configured: true, ok: true }));
vi.mock("@/lib/turnstile", () => ({
  isTurnstileConfigured: () => turnstile.configured,
  verifyTurnstile: async () => ({ ok: turnstile.ok }),
}));

import {
  PLAN_LETTER_SYSTEM_PROMPT,
  cleanText,
  countPdfPages,
  extractJson,
  parsePlanLetterSummary,
  sniffType,
} from "@/lib/planLetter";

const ROOT = join(__dirname, "..", "..");

describe("plan letter rules", () => {
  it("tells the model the non-negotiables", () => {
    expect(PLAN_LETTER_SYSTEM_PROMPT).toMatch(/Never name the insurance company/);
    expect(PLAN_LETTER_SYSTEM_PROMPT).toMatch(/Do not recommend a plan/);
    expect(PLAN_LETTER_SYSTEM_PROMPT).toMatch(/Never repeat personal details/);
  });

  it("strips dashes and drops anything that looks personal", () => {
    expect(cleanText("Premium goes up — by $15")).toBe("Premium goes up, by $15");
    expect(cleanText("Member ID H1234567890 changes")).toBeNull();
    expect(cleanText("Call 336-555-0100 for help")).toBeNull();
    expect(cleanText("Email jane@example.com")).toBeNull();
    expect(cleanText("$4,500")).toBe("$4,500");
    expect(cleanText("x".repeat(400))?.length).toBe(280);
  });

  it("drops insurer names, addresses, greetings and any advice", () => {
    expect(cleanText("Humana raises the premium")).toBeNull();
    expect(cleanText("Your plan from Blue Cross changes")).toBeNull();
    expect(cleanText("Mail goes to 1234 Oak Ridge Road")).toBeNull();
    expect(cleanText("Dear Jane, here is your letter")).toBeNull();
    expect(cleanText("You should switch plans before December 7.")).toBeNull();
    expect(cleanText("We recommend you stay with this plan.")).toBeNull();
    expect(cleanText("Your deductible goes from $0 to $250.")).toBe("Your deductible goes from $0 to $250.");
    expect(cleanText("Ask whether your heart doctor is in network for 2027.")).not.toBeNull();
  });

  it("counts plain PDF pages", () => {
    const pdf = new TextEncoder().encode("%PDF-1.4 1 0 obj << /Type /Pages /Count 2 >> 2 0 obj << /Type /Page >> 3 0 obj <</Type/Page>>");
    expect(countPdfPages(pdf)).toBe(2);
  });

  it("pulls JSON out of a chatty reply", () => {
    expect(extractJson('Sure! {"isAnoc": false} done')).toEqual({ isAnoc: false });
    expect(extractJson("no json here")).toBeNull();
  });

  it("validates and caps the model output", () => {
    const summary = parsePlanLetterSummary({
      isAnoc: true,
      planYear: 2027,
      changes: [
        { area: "Monthly premium", before: "$0", after: "$15", plainEnglish: "Your premium goes up by $15." },
        { area: "Made up area", before: null, after: "$5", plainEnglish: "Something else changed." },
        { area: "Deductible", plainEnglish: "" },
        ...Array.from({ length: 12 }, () => ({ area: "Other", plainEnglish: "More." })),
      ],
      watchOuts: ["a", "b", "c", "d", "e"],
      questionsToAsk: ["Call 919-555-0100?", "Is my doctor in network?"],
    });
    expect(summary?.changes).toHaveLength(10);
    expect(summary?.changes[1].area).toBe("Other");
    expect(summary?.watchOuts).toHaveLength(4);
    expect(summary?.questionsToAsk).toEqual(["Is my doctor in network?"]);
    expect(parsePlanLetterSummary({ isAnoc: false, changes: [{ area: "Other", plainEnglish: "x" }] })).toEqual({
      isAnoc: false,
      planYear: null,
      changes: [],
      watchOuts: [],
      questionsToAsk: [],
    });
    expect(parsePlanLetterSummary({ changes: [] })).toBeNull();
  });

  it("checks the real file type from the bytes", () => {
    expect(sniffType(new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toBe("image/jpeg");
    expect(sniffType(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe("image/png");
    expect(sniffType(new TextEncoder().encode("%PDF-1.7"))).toBe("application/pdf");
    expect(sniffType(new TextEncoder().encode("RIFF1234WEBPVP8 "))).toBe("image/webp");
    expect(sniffType(new TextEncoder().encode("<html>"))).toBeNull();
  });

  it("never names an insurer in the page or tool", () => {
    // lib/planLetter.ts holds the blocklist itself, so it is not scanned here.
    for (const file of ["app/plan-letter/page.tsx", "app/plan-letter/PlanLetterTool.tsx"]) {
      expect(readFileSync(join(ROOT, file), "utf8"), file).not.toMatch(
        /humana|aetna|united ?health|blue ?cross|wellcare|devoted|healthteam|cigna|anthem/i,
      );
    }
  });
});

describe("plan letter API", () => {
  afterEach(() => {
    turnstile.configured = true;
    turnstile.ok = true;
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("stays off without the switch and a key", async () => {
    vi.stubEnv("PLAN_LETTER_ENABLED", "");
    vi.stubEnv("ANTHROPIC_API_KEY", "");
    const { POST } = await import("@/app/api/plan-letter/route");
    const res = await POST(new Request("http://localhost/api/plan-letter", { method: "POST" }) as never);
    expect(res.status).toBe(503);
  });

  it("never runs without the bot check configured, even with a key", async () => {
    vi.stubEnv("PLAN_LETTER_ENABLED", "true");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    turnstile.configured = false;
    const { POST } = await import("@/app/api/plan-letter/route");
    const res = await POST(new Request("http://localhost/api/plan-letter", { method: "POST" }) as never);
    expect(res.status).toBe(503);
  });

  it("refuses a failed bot check before reading files", async () => {
    vi.stubEnv("PLAN_LETTER_ENABLED", "true");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    turnstile.ok = false;
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { POST } = await import("@/app/api/plan-letter/route");
    const body = new FormData();
    body.append("files", new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0xe0])]), "page-1");
    const res = await POST(
      new Request("http://localhost/api/plan-letter", { method: "POST", body, headers: { "x-forwarded-for": "203.0.113.11" } }) as never,
    );
    expect(res.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a PDF with too many pages before calling the model", async () => {
    vi.stubEnv("PLAN_LETTER_ENABLED", "true");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { POST } = await import("@/app/api/plan-letter/route");
    const body = new FormData();
    body.append("files", new Blob(["%PDF-1.4 " + "<< /Type /Page >> ".repeat(41)]), "page-1");
    const res = await POST(
      new Request("http://localhost/api/plan-letter", { method: "POST", body, headers: { "x-forwarded-for": "203.0.113.12" } }) as never,
    );
    expect(res.status).toBe(413);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a file that isn't an image or PDF before calling the model", async () => {
    vi.stubEnv("PLAN_LETTER_ENABLED", "true");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { POST } = await import("@/app/api/plan-letter/route");
    const body = new FormData();
    body.append("files", new Blob(["<html>not a letter</html>"]), "page-1");
    const res = await POST(
      new Request("http://localhost/api/plan-letter", {
        method: "POST",
        body,
        headers: { "x-forwarded-for": "203.0.113.9" },
      }) as never,
    );
    expect(res.status).toBe(415);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends images to the model and returns the cleaned summary", async () => {
    vi.stubEnv("PLAN_LETTER_ENABLED", "true");
    vi.stubEnv("ANTHROPIC_API_KEY", "test-key");
    const reply = {
      isAnoc: true,
      planYear: 2027,
      changes: [{ area: "Out-of-pocket maximum", before: "$5,900", after: "$6,750", plainEnglish: "Your yearly limit goes up — by $850." }],
      watchOuts: [],
      questionsToAsk: [],
    };
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ content: [{ type: "text", text: JSON.stringify(reply) }] }), { status: 200 }),
    );
    const { POST } = await import("@/app/api/plan-letter/route");
    const body = new FormData();
    body.append("files", new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3])]), "page-1");
    const res = await POST(
      new Request("http://localhost/api/plan-letter", {
        method: "POST",
        body,
        headers: { "x-forwarded-for": "203.0.113.10" },
      }) as never,
    );
    expect(res.status).toBe(200);
    const data = (await res.json()) as { summary: { changes: Array<{ plainEnglish: string }> } };
    expect(data.summary.changes[0].plainEnglish).toBe("Your yearly limit goes up, by $850.");
    const sent = JSON.parse(String((fetchSpy.mock.calls[0][1] as RequestInit).body));
    expect(sent.messages[0].content[0]).toMatchObject({ type: "image", source: { media_type: "image/jpeg" } });
    expect(sent.system).toMatch(/Annual Notice of Change/);
  });
});
