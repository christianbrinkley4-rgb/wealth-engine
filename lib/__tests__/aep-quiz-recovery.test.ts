// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import {
  AEP_PROGRESS_KEY,
  readAepProgress,
  saveAepProgress,
  AEP_PROGRESS_MAX_AGE,
} from "../aepQuizProgress";

vi.mock("@/app/components/Analytics", () => ({ trackLeadOnce: vi.fn() }));
vi.mock("@/hooks/useQuizTracking", () => ({
  useQuizTracking: () => ({ start: vi.fn(), step: vi.fn(), complete: vi.fn() }),
}));
vi.mock("@/lib/loadTurnstile", () => ({ loadTurnstile: vi.fn() }));
const answers = {
  onMedicare: true,
  happyWithPlan: true,
  doctorsChanged: false,
  prescriptionsChanged: false,
  turning65Soon: false,
};
const capture = { variant: "a" as const, phase: "capture" as const, index: 4, answers };
let api: {
  render: ReturnType<typeof vi.fn>;
  getResponse: ReturnType<typeof vi.fn>;
  reset: ReturnType<typeof vi.fn>;
  remove: ReturnType<typeof vi.fn>;
};
beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-key");
  const values = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      values.delete(key);
    }),
    clear: vi.fn(() => values.clear()),
  });
  document.cookie = "we-quiz-variant=a";
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
  Element.prototype.scrollIntoView = vi.fn();
  api = {
    render: vi.fn(() => "widget"),
    getResponse: vi.fn(() => "valid-token"),
    reset: vi.fn(),
    remove: vi.fn(),
  };
  vi.stubGlobal("turnstile", api);
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
async function mount() {
  const { AepQuiz } = await import("@/app/aep-quiz/AepQuiz");
  return render(createElement(AepQuiz));
}
async function contact() {
  localStorage.setItem(AEP_PROGRESS_KEY, saveAepProgress(capture));
  await mount();
  await waitFor(() => expect(api.render).toHaveBeenCalled());
  fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Test" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
  fireEvent.click(screen.getByRole("checkbox"));
}
const submit = () => fireEvent.click(screen.getByRole("button", { name: "Show my result" }));

describe("quiz progress and submission recovery", () => {
  it("restores the same question after remount", async () => {
    const view = await mount();
    fireEvent.click(await screen.findByRole("button", { name: "Yes", exact: true }));
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("2");
    view.unmount();
    await mount();
    await waitFor(() =>
      expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("2"),
    );
  });
  it("restores capture but never persists contact details or consent", async () => {
    await contact();
    const raw = localStorage.getItem(AEP_PROGRESS_KEY)!;
    expect(readAepProgress(raw)?.phase).toBe("capture");
    expect(raw).not.toContain("test@example.com");
    expect(raw).not.toContain("consent");
    cleanup();
    await mount();
    expect(((await screen.findByLabelText("Email")) as HTMLInputElement).value).toBe("");
    expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(false);
  });
  it.each([
    "{",
    JSON.stringify({ version: 1 }),
    saveAepProgress({ ...capture, index: 99 }),
    saveAepProgress({ ...capture, answers: {} }),
  ])("ignores corrupt or incomplete storage", (raw) => {
    expect(readAepProgress(raw)).toBeNull();
  });
  it("expires saved answers after 24 hours", () => {
    expect(
      readAepProgress(saveAepProgress(capture), Date.now() + AEP_PROGRESS_MAX_AGE + 1000),
    ).toBeNull();
  });
  it("works when browser storage is blocked", async () => {
    vi.spyOn(localStorage, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(localStorage, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(localStorage, "removeItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    await mount();
    fireEvent.click(await screen.findByRole("button", { name: "Yes", exact: true }));
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("2");
  });
  it.each([
    new Response("bad gateway", { status: 502 }),
    Response.json({}),
    Response.json({ error: "Please wait a minute." }, { status: 429 }),
  ])("keeps answers and contact fields after an unconfirmed response", async (response) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    await contact();
    submit();
    await screen.findByRole("alert");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("test@example.com");
    expect(readAepProgress(localStorage.getItem(AEP_PROGRESS_KEY))?.phase).toBe("capture");
    expect(api.reset).toHaveBeenCalled();
  });
  it("recovers from a network failure and clears progress only after confirmation", async () => {
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockResolvedValueOnce(Response.json({ success: true, stored: true }));
    vi.stubGlobal("fetch", fetch);
    await contact();
    submit();
    await screen.findByRole("alert");
    expect(api.reset).toHaveBeenCalled();
    submit();
    await screen.findByText("Your result");
    expect(localStorage.getItem(AEP_PROGRESS_KEY)).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it("shows verification errors immediately and clears them after verification succeeds", async () => {
    await contact();
    const options = api.render.mock.calls[0][1];
    expect(options.size).toBe("compact");
    act(() => options["error-callback"]());
    expect(screen.getByRole("alert").textContent).toContain("form check");
    act(() => options.callback());
    expect(screen.queryByRole("alert")).toBeNull();
  });
  it("clears progress when starting over", async () => {
    await contact();
    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("1");
    expect(localStorage.getItem(AEP_PROGRESS_KEY)).toBeNull();
  });
});
