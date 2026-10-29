// @vitest-environment jsdom
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Lead fixes from the Oct 29, 2026 AEP review (docs/AEP-LEAD-FIXES-2026-10-29.md).
 *
 * - /aep's callback form loaded the form check (close to 1 MB) with the page,
 *   held its button disabled with no reason until the check passed, and never
 *   counted a saved request as a lead.
 * - The /start quick form counted a quiz start on page load.
 * - The five-question checklist reported no funnel events at all.
 */

vi.mock("next/navigation", () => ({
  usePathname: () => "/aep",
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams("topic=medicare&quick=1"),
}));
vi.mock("@/hooks/useLocalStorage", () => ({
  useLocalStorage: () => [
    { topic: null, branchIndex: 0, answers: {}, phase: "topic", skippedFirst: false },
    vi.fn(),
    vi.fn(),
  ],
}));

const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
  delete window.gtag;
  document.head.querySelectorAll("script").forEach((tag) => tag.remove());
  sessionStorage.clear();
});

function recordEvents() {
  const recorder = vi.fn();
  window.gtag = recorder;
  return () => recorder.mock.calls.filter((call) => call[0] === "event").map((call) => call[1]);
}

async function loadEngineContact() {
  return (await import("@/components/EngineContact")).EngineContact;
}

function fillCallbackForm() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Test Person" } });
  fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "3365550100" } });
  fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "27401" } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("/aep callback form", () => {
  it("does not load the form check until someone uses the form", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "1x00000000000000000000AA");
    const EngineContact = await loadEngineContact();
    const { container } = render(createElement(EngineContact));
    expect(document.querySelector(`script[src^="${TURNSTILE_SRC}"]`)).toBeNull();
    expect(container.querySelector("script")).toBeNull();

    fireEvent.focus(screen.getByLabelText("Name"));
    expect(document.querySelectorAll(`script[src="${TURNSTILE_SRC}"]`)).toHaveLength(1);
  });

  it("keeps the button live and says why when the check has not finished", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "1x00000000000000000000AA");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const EngineContact = await loadEngineContact();
    render(createElement(EngineContact));
    const button = screen.getByRole("button", { name: "Request a Medicare call" });
    expect((button as HTMLButtonElement).disabled).toBe(false);

    fillCallbackForm();
    fireEvent.submit(button.closest("form")!);
    expect(screen.getByRole("alert").textContent).toContain("form check is still finishing");
    expect(screen.getByRole("alert").textContent).toContain("(919) 408-6671");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("counts generate_lead once, only after the server confirms the record", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_ID", "G-TEST123");
    const events = recordEvents();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => ({
        ok: true,
        status: 200,
        json: async () => ({ stored: true, id: JSON.parse(String(init.body)).id }),
      })),
    );
    const EngineContact = await loadEngineContact();
    render(createElement(EngineContact));
    fillCallbackForm();
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "Request a Medicare call" }).closest("form")!);
    });
    expect(screen.getByText("Your callback request is saved.")).toBeTruthy();
    expect(events().filter((name) => name === "generate_lead")).toHaveLength(1);
  });

  it("does not count a lead when the record is not confirmed", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA4_ID", "G-TEST123");
    const events = recordEvents();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 503,
        json: async () => ({ error: "I couldn't confirm your request was saved." }),
      })),
    );
    const EngineContact = await loadEngineContact();
    render(createElement(EngineContact));
    fillCallbackForm();
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "Request a Medicare call" }).closest("form")!);
    });
    expect(screen.getByRole("alert").textContent).toContain("couldn't confirm");
    expect(events()).not.toContain("generate_lead");
  });
});

describe("/start quick form measurement", () => {
  it("counts a start when a field is touched, not when the page opens", async () => {
    const events = recordEvents();
    const { HelpQuiz } = await import("@/app/start/HelpQuiz");
    render(createElement(HelpQuiz));
    expect(events()).not.toContain("quiz_start");

    fireEvent.focus(document.getElementById("help-quiz-name")!);
    expect(events().filter((name) => name === "quiz_start")).toHaveLength(1);
  });
});

describe("five-question checklist measurement", () => {
  it("reports start, each step, and completion under its own quiz id", async () => {
    const recorder = vi.fn();
    window.gtag = recorder;
    const { EngineQuiz } = await import("@/components/EngineQuiz");
    const results = Object.fromEntries(
      ["eligibility-check", "dual-review", "compare-coverage", "compare-costs"].map((key) => [
        key,
        { title: key, points: [] },
      ]),
    );
    render(createElement(EngineQuiz, { results }));
    for (let i = 0; i < 5; i += 1) {
      const options = document.querySelectorAll(".engine-options button");
      fireEvent.click(options[0]);
    }
    const sent = recorder.mock.calls.filter((call) => call[0] === "event");
    expect(sent.map((call) => call[1])).toEqual([
      "quiz_start",
      "quiz_step",
      "quiz_step",
      "quiz_step",
      "quiz_step",
      "quiz_step",
      "quiz_complete",
    ]);
    for (const call of sent) expect(call[2].quiz_id).toBe("medicare_fit");
    // Answers never leave the device through analytics.
    expect(JSON.stringify(sent)).not.toMatch(/healthy|keep|travel|lowcost|dual/);
  });
});

describe("/plan-check layout", () => {
  it("uses the compact hero so the quiz starts near the top on a phone", () => {
    const source = readFileSync("app/plan-check/page.tsx", "utf8");
    expect(source).toMatch(/<ServiceHero\s+variant="compact"/);
    expect(source).toContain('secondaryHref="#plan-check-quiz"');
    expect(source).toContain('id="plan-check-quiz"');
  });
});

describe("llms.txt answers for the questions strangers ask", () => {
  it("answers generic local agent questions and links each town page", async () => {
    const { GET } = await import("@/app/llms.txt/route");
    const body = await GET().text();
    for (const line of [
      '"Is there a Medicare agent in High Point NC?"',
      '"Is there a Medicare agent in Winston-Salem NC?"',
      '"Where can I get free Medicare help in the Triad?"',
      "/medicare-agent-high-point-nc",
      "/medicare-agent-winston-salem-nc",
      "/medicare-agent-granville-county-nc",
      "1-855-408-1212",
    ])
      expect(body).toContain(line);
  });

  it("uses only the verified 2027 Part D figures and no em dashes", async () => {
    const { GET } = await import("@/app/llms.txt/route");
    const body = await GET().text();
    expect(body).toContain("no more than $700");
    expect(body).toContain("capped at $2,400");
    expect(body).toContain("15 drugs take effect January 1, 2027");
    expect(body).not.toContain("\u2014");
  });
});

describe("sitewide copy guards from the Oct 29 quality audit", () => {
  function pages(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) return /^(wealth|ai|tools)$/.test(name) ? [] : pages(full);
      return full.endsWith(".tsx") ? [full] : [];
    });
  }
  const files = [...pages("app"), ...pages("components")];

  it("never promises a review length other than the 45 minutes the booking page offers", () => {
    for (const file of files)
      expect(readFileSync(file, "utf8"), file).not.toMatch(/\b(15|20|30|60)[- ]minutes?\b/i);
  });

  it("never leaves a space before a comma after a link", () => {
    for (const file of files) expect(readFileSync(file, "utf8"), file).not.toContain('{" "},');
  });
});

describe("internal links to pages Search Console found orphaned (Oct 29)", () => {
  it("links the questions page sitewide and the High Point Medigap page from High Point", () => {
    expect(readFileSync("app/components/RelatedMedicareGuides.tsx", "utf8")).toContain(
      'href="/questions-to-ask-medicare-agent"',
    );
    const city = readFileSync("app/components/PriorityCityMedicarePage.tsx", "utf8");
    expect(city).toContain('href="/medigap-plans-high-point-nc"');
    expect(city).toContain('href="/questions-to-ask-medicare-agent"');
  });
});
