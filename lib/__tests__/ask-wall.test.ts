import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

import { TRAFFIC_GUIDES } from "@/lib/trafficGuides";

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  select: vi.fn(),
  from: vi.fn(),
  email: vi.fn(),
  notify: vi.fn(),
  commandCenterConfig: vi.fn(),
  commandCenterCapture: vi.fn(),
  markDelivery: vi.fn(),
  verifyTurnstile: vi.fn(),
  hasSupabaseAdminConfig: vi.fn(),
  getSupabaseAdmin: vi.fn(),
}));
vi.mock("@/lib/commandCenter", () => ({
  commandCenterConfig: mocks.commandCenterConfig,
  captureInCommandCenter: mocks.commandCenterCapture,
  markDelivery: mocks.markDelivery,
}));
vi.mock("@/lib/rateLimit", () => ({ getClientIp: () => "127.0.0.1", isRateLimited: () => false }));
vi.mock("@/lib/turnstile", () => ({ verifyTurnstile: mocks.verifyTurnstile }));
vi.mock("@/lib/metaCapi", () => ({ sendMetaLeadEvent: async () => {} }));
vi.mock("@/lib/notifyLead", () => ({
  isLeadNotifyConfigured: () => true,
  notifyLeadCaptured: mocks.notify,
  sendProspectAutoReply: mocks.email,
}));
vi.mock("@/lib/supabase", () => ({
  hasSupabaseAdminConfig: (...args: unknown[]) => mocks.hasSupabaseAdminConfig(...args),
  getSupabaseAdmin: (...args: unknown[]) => mocks.getSupabaseAdmin(...args),
}));
import { POST } from "@/app/api/capture-lead/route";
import { validateQuestion, QUESTION_MIN_LENGTH, QUESTION_MAX_LENGTH } from "@/lib/askWall";

const request = (body: unknown) =>
  new NextRequest("http://localhost/api/capture-lead", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

/** Server rendering escapes entities in text nodes; compare against the decoded page. */
function decodeHtml(html: string): string {
  return html.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
}

const questionBody = (over: Record<string, unknown> = {}) => ({
  kind: "question",
  full_name: "Neighbor",
  question: "What happens to my HSA if I leave my job in the middle of the year?",
  website: "",
  turnstile_token: "test-token",
  ...over,
});

beforeEach(() => {
  vi.clearAllMocks();
  mocks.commandCenterConfig.mockReturnValue(null);
  mocks.verifyTurnstile.mockResolvedValue({ ok: true });
  mocks.hasSupabaseAdminConfig.mockReturnValue(true);
  mocks.getSupabaseAdmin.mockReturnValue({ from: mocks.from });
  mocks.from.mockReturnValue({ select: mocks.select, insert: mocks.insert });
  mocks.insert.mockResolvedValue({ error: null });
  mocks.email.mockResolvedValue({ ok: false, retryable: false, skipped: true });
  mocks.notify.mockResolvedValue({ ok: true, retryable: false });
});

describe("wall question validation", () => {
  it("rejects a question that is too short", () => {
    const result = validateQuestion("Too short?");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain(String(QUESTION_MIN_LENGTH));
  });

  it("rejects an empty question", () => {
    expect(validateQuestion("   ").ok).toBe(false);
    expect(validateQuestion(null).ok).toBe(false);
    expect(validateQuestion(42).ok).toBe(false);
  });

  it("rejects a question that is too long", () => {
    expect(validateQuestion("x".repeat(QUESTION_MAX_LENGTH + 1)).ok).toBe(false);
  });

  it("accepts a question inside the limits and trims it", () => {
    const result = validateQuestion("  " + "x".repeat(QUESTION_MIN_LENGTH) + "  ");
    expect(result).toEqual({ ok: true, question: "x".repeat(QUESTION_MIN_LENGTH) });
  });
});

describe("capture-lead kind=question", () => {
  it("stores the question in ask_questions and returns success", async () => {
    const response = await POST(request(questionBody()));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(mocks.from).toHaveBeenCalledWith("ask_questions");
    const row = mocks.insert.mock.calls[0][0] as Record<string, unknown>;
    expect(row.name).toBe("Neighbor");
    expect(row.question).toContain("What happens to my HSA");
    expect(row.ip_hint).toBe("127.0.0.1");
  });

  it("accepts an anonymous question", async () => {
    const response = await POST(request(questionBody({ full_name: "" })));
    expect(response.status).toBe(200);
    const row = mocks.insert.mock.calls[0][0] as Record<string, unknown>;
    expect(row.name).toBeNull();
  });

  it("rejects a bot with a filled honeypot, pretending success", async () => {
    const response = await POST(request(questionBody({ website: "http://spam.example" })));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(mocks.verifyTurnstile).not.toHaveBeenCalled();
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("rejects a rejected Turnstile token without storing", async () => {
    mocks.verifyTurnstile.mockResolvedValue({ ok: false, reason: "rejected" });
    const response = await POST(request(questionBody()));
    expect(response.status).toBe(400);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("rejects a too-short question without storing", async () => {
    const response = await POST(request(questionBody({ question: "Too short?" })));
    expect(response.status).toBe(400);
    expect((await response.json()) as { field?: string }).toMatchObject({ field: "question" });
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("returns 503, not a silent success, when the table write fails", async () => {
    mocks.insert.mockResolvedValue({ error: { message: "relation does not exist" } });
    const response = await POST(request(questionBody()));
    expect(response.status).toBe(503);
    expect((await response.json()) as { code?: string }).toMatchObject({
      code: "storage_unavailable",
    });
  });

  it("returns 503 when Supabase is not configured", async () => {
    mocks.hasSupabaseAdminConfig.mockReturnValue(false);
    const response = await POST(request(questionBody()));
    expect(response.status).toBe(503);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("never touches the lead pipeline for a wall question", async () => {
    await POST(request(questionBody()));
    expect(mocks.notify).not.toHaveBeenCalled();
    expect(mocks.email).not.toHaveBeenCalled();
    expect(mocks.commandCenterCapture).not.toHaveBeenCalled();
    expect(mocks.from).not.toHaveBeenCalledWith("leads");
    expect(mocks.from).not.toHaveBeenCalledWith("lead_events");
  });

  it("keeps its error copy phone-free, the wall is informational", async () => {
    mocks.insert.mockResolvedValue({ error: { message: "down" } });
    const json = (await (await POST(request(questionBody()))).json()) as { error: string };
    expect(json.error).not.toMatch(/\(\d{3}\)/);
  });
});

describe("ask wall publishing contract", () => {
  it("seeds exactly five answered questions with unique slugs", async () => {
    const { ASK_QUESTIONS } = await import("@/lib/askWall");
    expect(ASK_QUESTIONS).toHaveLength(5);
    expect(new Set(ASK_QUESTIONS.map((q) => q.slug)).size).toBe(5);
  });

  it("keeps metadata inside the ~60/160 character limits and writes plain", async () => {
    const { ASK_QUESTIONS } = await import("@/lib/askWall");
    const texts: string[] = [];
    for (const question of ASK_QUESTIONS) {
      expect(question.metaTitle.length).toBeLessThanOrEqual(60);
      expect(question.description.length).toBeLessThanOrEqual(160);
      expect(question.title.endsWith("?")).toBe(true);
      texts.push(
        question.title,
        question.metaTitle,
        question.description,
        question.eyebrow,
        question.lede,
        question.intro,
      );
      for (const section of question.sections) {
        texts.push(section.h2);
        for (const block of section.blocks) {
          if (block.kind === "p") texts.push(block.text);
          else texts.push(...block.items);
        }
      }
      for (const faq of question.faq) {
        expect(faq.q.trim().length).toBeGreaterThan(0);
        expect(faq.a.trim().length).toBeGreaterThan(0);
        texts.push(faq.q, faq.a);
      }
      expect(question.faq.length).toBeGreaterThanOrEqual(2);
      expect(question.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(question.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    // Human voice: no em dashes anywhere on the wall.
    for (const text of texts) expect(text).not.toContain("—");
  });

  it("links every related page to a page that exists", async () => {
    const { ASK_QUESTIONS } = await import("@/lib/askWall");
    const guideSlugs = new Set(TRAFFIC_GUIDES.map((guide) => guide.slug));
    for (const question of ASK_QUESTIONS) {
      for (const link of question.related) {
        if (link.href.startsWith("/guides/")) {
          expect(guideSlugs.has(link.href.replace("/guides/", ""))).toBe(true);
        } else {
          expect(existsSync(resolve(`app${link.href}/page.tsx`))).toBe(true);
        }
      }
    }
  });

  it("makes the wall and every answer discoverable in the sitemap and llms indexes", async () => {
    const { ASK_QUESTIONS } = await import("@/lib/askWall");
    const { default: sitemap } = await import("@/app/sitemap");
    const { GET: shortIndex } = await import("@/app/llms.txt/route");
    const { GET: fullIndex } = await import("@/app/llms-full.txt/route");
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);
    const indexes = await Promise.all([shortIndex().text(), fullIndex().text()]);
    expect(paths.filter((value) => value === "/ask")).toHaveLength(1);
    for (const index of indexes) expect(index).toContain("/ask");
    for (const question of ASK_QUESTIONS) {
      const path = `/ask/${question.slug}`;
      expect(paths.filter((value) => value === path)).toHaveLength(1);
      expect(indexes[0]).toContain(path);
    }
  });

  it("renders the wall with answered cards, the form, and no sales surface", async () => {
    const { ASK_QUESTIONS } = await import("@/lib/askWall");
    const { default: WallPage, metadata } = await import("@/app/ask/page");
    expect(metadata.title?.absolute?.length).toBeLessThanOrEqual(60);
    expect((metadata.description as string).length).toBeLessThanOrEqual(160);
    expect(metadata.alternates?.canonical).toBe("/ask");
    const html = renderToStaticMarkup(await WallPage());
    const text = decodeHtml(html);
    for (const question of ASK_QUESTIONS) {
      expect(html).toContain(`/ask/${question.slug}`);
      expect(text).toContain(question.title);
    }
    expect(html).toContain('id="ask-question"');
    expect(html).toContain("cf-turnstile");
    // Informational surface: no phone number, no consultation CTA on the wall.
    expect(html).not.toMatch(/\(\d{3}\) \d{3}-\d{4}/);
    expect(html).not.toContain("Book a time");
  }, 20000);

  it.each([0, 1, 2, 3, 4])(
    "renders answer page %i with schema, metadata, and disclosures",
    async (index) => {
      const { ASK_QUESTIONS, getAskQuestion } = await import("@/lib/askWall");
      const question = ASK_QUESTIONS[index];
      const { default: AnswerPage, generateMetadata, generateStaticParams } = await import(
        "@/app/ask/[slug]/page"
      );
      expect(generateStaticParams()).toHaveLength(5);
      const props = { params: Promise.resolve({ slug: question.slug }) };
      const meta = await generateMetadata(props);
      expect(meta.title).toEqual({ absolute: question.metaTitle });
      expect(meta.description).toBe(question.description);
      expect(meta.alternates?.canonical).toBe(`/ask/${question.slug}`);
      const html = renderToStaticMarkup(await AnswerPage(props));
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
      expect(scripts.length).toBe(3);
      const types = scripts.map((match) => JSON.parse(match[1])["@type"] as string);
      expect(types).toEqual(["BreadcrumbList", "Article", "FAQPage"]);
      const faq = JSON.parse(scripts[2][1]);
      expect(faq.mainEntity.map((item: { name: string }) => item.name)).toEqual(
        question.faq.map((item) => item.q),
      );
      const text = decodeHtml(html);
      expect(text).toContain(question.title);
      expect(text).toContain(question.intro);
      expect(text).toContain("Disclosures");
      // No sales surface on answer pages either.
      expect(html).not.toMatch(/\(\d{3}\) \d{3}-\d{4}/);
      expect(html).not.toContain("—");
      for (const source of question.sources) expect(html).toContain(source.href);
    },
  );

  it("404s on an unknown wall slug", async () => {
    const { getAskQuestion } = await import("@/lib/askWall");
    expect(getAskQuestion("not-a-real-question")).toBeUndefined();
    const { default: AnswerPage } = await import("@/app/ask/[slug]/page");
    await expect(
      AnswerPage({ params: Promise.resolve({ slug: "not-a-real-question" }) }),
    ).rejects.toThrow();
  });
});
