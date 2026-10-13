// @vitest-environment jsdom
import { createElement } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CHECKLIST_COUNTIES, isChecklistCounty } from "@/lib/planChecklist";
import { TRIAD_CITIES } from "@/lib/triad";
import { QuizRunner } from "@/app/tools/medigap-or-advantage-quiz/quiz-engine/quiz-engine";
import { DATA } from "@/app/tools/medigap-or-advantage-quiz/data";
const mocks = vi.hoisted(() => ({ event: vi.fn(), loader: vi.fn() }));
vi.mock("@/app/components/Analytics", () => ({ trackEvent: mocks.event }));
vi.mock("@/lib/loadTurnstile", () => ({ loadTurnstile: mocks.loader }));
beforeEach(() => {
  mocks.event.mockClear();
  mocks.loader.mockClear();
});
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("on-device plan research", () => {
  it("offers every county the site has a town page for and makes no ZIP inference", () => {
    for (const city of TRIAD_CITIES) {
      const named = city.county.replace(/ Count(y|ies)$/, "").split(" and ");
      for (const county of named) expect(isChecklistCounty(county)).toBe(true);
    }
    for (const county of CHECKLIST_COUNTIES) expect(isChecklistCounty(county)).toBe(true);
    expect(isChecklistCounty("Another county")).toBe(false);
    expect(isChecklistCounty("27401")).toBe(false);
  });
});

describe("tool quiz measurement", () => {
  it("tracks the first deliberate choice, every step and result without any answer", () => {
    render(createElement(QuizRunner, { data: DATA, quizId: "medigap_or_advantage" }));
    expect(mocks.event).not.toHaveBeenCalled();
    for (const question of DATA.questions)
      fireEvent.click(screen.getByRole("button", { name: question.options[0].label, exact: true }));
    expect(mocks.event.mock.calls.filter((call) => call[0] === "quiz_start")).toEqual([
      ["quiz_start", { quiz_id: "medigap_or_advantage" }],
    ]);
    expect(mocks.event.mock.calls.filter((call) => call[0] === "quiz_complete")).toEqual([
      ["quiz_complete", { quiz_id: "medigap_or_advantage", step: DATA.questions.length }],
    ]);
    for (const [, detail] of mocks.event.mock.calls)
      expect(Object.keys(detail ?? {}).every((key) => ["quiz_id", "step"].includes(key))).toBe(
        true,
      );
  });
});

describe("guide form loading and success", () => {
  it("does not load on mount, loads on focus, blocks a missing token and counts success once", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "synthetic-key");
    vi.useFakeTimers();
    const api = {
      render: vi.fn(() => "synthetic-widget"),
      getResponse: vi.fn(() => ""),
      reset: vi.fn(),
      remove: vi.fn(),
    };
    vi.stubGlobal("turnstile", api);
    const fetch = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetch);
    const { GuideCapture } = await import("@/app/components/GuideCapture");
    render(createElement(GuideCapture));
    expect(mocks.loader).not.toHaveBeenCalled();
    fireEvent.focus(screen.getByLabelText("Your email"));
    expect(mocks.loader).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(100));
    expect(api.render).toHaveBeenCalledOnce();
    fireEvent.change(screen.getByLabelText("Your email"), {
      target: { value: "synthetic@example.test" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Notify me" }).closest("form")!);
    expect(fetch).not.toHaveBeenCalled();
    expect(mocks.event).not.toHaveBeenCalled();
    api.getResponse.mockReturnValue("synthetic-token");
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: "Notify me" }).closest("form")!);
    });
    expect(mocks.event.mock.calls).toEqual([["guide_signup", { list_id: "guides" }]]);
    expect(fetch).toHaveBeenCalledOnce();
    expect(screen.getByRole("status").textContent).toContain("on the list");
  });
});
