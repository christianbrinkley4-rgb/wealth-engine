// @vitest-environment jsdom
import { createElement } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PlanChecklist } from "@/app/medicare-plan-checklist/PlanChecklist";
import { CHECKLIST_SERVICE_COUNTIES, isChecklistServiceCounty, PLAN_COMPARE_URL, SHIIP_CONTACT_URL } from "@/lib/planChecklist";
import { QuizRunner } from "@/app/tools/medigap-or-advantage-quiz/quiz-engine/quiz-engine";
import { DATA } from "@/app/tools/medigap-or-advantage-quiz/data";
const mocks = vi.hoisted(() => ({ event: vi.fn(), loader: vi.fn() }));
vi.mock("@/app/components/Analytics", () => ({ trackEvent: mocks.event }));
vi.mock("@/lib/loadTurnstile", () => ({ loadTurnstile: mocks.loader }));
beforeEach(() => { mocks.event.mockClear(); mocks.loader.mockClear(); });
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.useRealTimers(); });

describe("on-device plan research", () => {
  it("uses only Christian's confirmed service counties and makes no ZIP inference", () => {
    expect([...CHECKLIST_SERVICE_COUNTIES]).toEqual(["Guilford", "Alamance", "Wake", "Granville", "Randolph"]);
    for (const county of CHECKLIST_SERVICE_COUNTIES) expect(isChecklistServiceCounty(county)).toBe(true);
    expect(isChecklistServiceCounty("Another county")).toBe(false);
    expect(isChecklistServiceCounty("27401")).toBe(false);
  });
  it("completes without network or storage, with only synthetic event names", () => {
    const fetch = vi.fn(); vi.stubGlobal("fetch", fetch);
    const storage = vi.spyOn(Storage.prototype, "setItem");
    render(createElement(PlanChecklist));
    fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "00000" } });
    fireEvent.change(screen.getByLabelText("County"), { target: { value: "Another county" } });
    expect(screen.getByRole("status").textContent).toContain("still use this sheet");
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Doctors"), { target: { value: "Synthetic Doctor" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Prescriptions"), { target: { value: "Synthetic medicine, 1 unit" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Travel" }));
    fireEvent.click(screen.getByRole("button", { name: "Make my sheet" }));
    expect(screen.getByRole("article").textContent).toContain("Synthetic Doctor");
    expect(screen.getByRole("article").textContent).toContain("Synthetic medicine");
    expect(screen.getByRole("link", { name: "Open Medicare.gov Plan Compare" }).getAttribute("href")).toBe(PLAN_COMPARE_URL);
    expect(screen.getByRole("link", { name: "Find your county SHIIP counselor" }).getAttribute("href")).toBe(SHIIP_CONTACT_URL);
    expect(fetch).not.toHaveBeenCalled(); expect(storage).not.toHaveBeenCalled();
    expect(mocks.event.mock.calls).toEqual([["checklist_start"], ["checklist_complete"]]);
    fireEvent.click(screen.getByRole("button", { name: "Clear all entries" }));
    expect((screen.getByLabelText("ZIP code") as HTMLInputElement).value).toBe("");
  });
  it("accepts empty optional steps and deduplicates summary completion", () => {
    render(createElement(PlanChecklist));
    for (let i = 0; i < 3; i++) fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Make my sheet" }));
    expect(screen.getByRole("article").textContent).toContain("Not added");
    fireEvent.click(screen.getByRole("button", { name: "Edit my sheet" }));
    for (let i = 0; i < 3; i++) fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Make my sheet" }));
    expect(mocks.event.mock.calls.filter(call => call[0] === "checklist_complete")).toHaveLength(1);
  });
});

describe("tool quiz measurement", () => {
  it("tracks the first deliberate choice, every step and result without any answer", () => {
    render(createElement(QuizRunner, { data: DATA, quizId: "medigap_or_advantage" }));
    expect(mocks.event).not.toHaveBeenCalled();
    for (const question of DATA.questions) fireEvent.click(screen.getByRole("button", { name: question.options[0].label, exact: true }));
    expect(mocks.event.mock.calls.filter(call => call[0] === "quiz_start")).toEqual([["quiz_start", { quiz_id: "medigap_or_advantage" }]]);
    expect(mocks.event.mock.calls.filter(call => call[0] === "quiz_complete")).toEqual([["quiz_complete", { quiz_id: "medigap_or_advantage", step: DATA.questions.length }]]);
    for (const [, detail] of mocks.event.mock.calls) expect(Object.keys(detail ?? {}).every(key => ["quiz_id", "step"].includes(key))).toBe(true);
  });
});

describe("guide form loading and success", () => {
  it("does not load on mount, loads on focus, blocks a missing token and counts success once", async () => {
    vi.resetModules(); vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "synthetic-key"); vi.useFakeTimers();
    const api = { render: vi.fn(() => "synthetic-widget"), getResponse: vi.fn(() => ""), reset: vi.fn(), remove: vi.fn() };
    vi.stubGlobal("turnstile", api);
    const fetch = vi.fn().mockResolvedValue(Response.json({ ok: true })); vi.stubGlobal("fetch", fetch);
    const { GuideCapture } = await import("@/app/components/GuideCapture");
    render(createElement(GuideCapture));
    expect(mocks.loader).not.toHaveBeenCalled();
    fireEvent.focus(screen.getByLabelText("Your email"));
    expect(mocks.loader).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(100)); expect(api.render).toHaveBeenCalledOnce();
    fireEvent.change(screen.getByLabelText("Your email"), { target: { value: "synthetic@example.test" } });
    fireEvent.submit(screen.getByRole("button", { name: "Notify me" }).closest("form")!);
    expect(fetch).not.toHaveBeenCalled(); expect(mocks.event).not.toHaveBeenCalled();
    api.getResponse.mockReturnValue("synthetic-token");
    await act(async () => { fireEvent.submit(screen.getByRole("button", { name: "Notify me" }).closest("form")!); });
    expect(mocks.event.mock.calls).toEqual([["guide_signup", { list_id: "guides" }]]);
    expect(fetch).toHaveBeenCalledOnce(); expect(screen.getByRole("status").textContent).toContain("on the list");
  });
});
