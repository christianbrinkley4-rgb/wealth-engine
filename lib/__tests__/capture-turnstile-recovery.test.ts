// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ push: vi.fn(), scriptBlocked: false }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("@/app/components/Analytics", () => ({ trackEvent: vi.fn() }));
vi.mock("next/script", async () => {
  const { useEffect } = await import("react");
  return {
    default: function Script({ onReady, onError }: { onReady?: () => void; onError?: () => void }) {
      useEffect(() => {
        if (mocks.scriptBlocked) onError?.();
        else onReady?.();
      }, [onReady, onError]);
      return null;
    },
  };
});

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key");
  mocks.scriptBlocked = false;
});
afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function stubTurnstile() {
  const api = {
    ready: vi.fn((callback: () => void) => callback()),
    render: vi.fn(() => "widget-1"),
    getResponse: vi.fn(() => "valid-token"),
    reset: vi.fn(),
    remove: vi.fn(),
  };
  vi.stubGlobal("turnstile", api);
  return api;
}

async function renderForm(kind: "timeline" | "results") {
  if (kind === "timeline") {
    const { TimelineEmailCapture } = await import("@/components/TimelineEmailCapture");
    render(
      createElement(TimelineEmailCapture, {
        input: { month: 4, year: 2027, birthdayOnFirst: true },
        windowClosed: false,
      }),
    );
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test Visitor" } });
    fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "27401" } });
  } else {
    const { EmailResultsCapture } = await import("@/components/EmailResultsCapture");
    render(
      createElement(EmailResultsCapture, {
        wizardData: {
          zip_code: "27401",
          filing_status: "individual",
          age: 64,
          annual_income: 80000,
          calculated_premium: 202.9,
          irmaa_bracket: "standard",
        },
      }),
    );
  }
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
  fireEvent.click(screen.getByRole("checkbox"));
}
const submit = () => fireEvent.click(screen.getByRole("button", { name: /email/i }));

describe.each(["timeline", "results"] as const)("%s capture verification recovery", (kind) => {
  it("explains a blocked verification script without submitting or blaming the email", async () => {
    mocks.scriptBlocked = true;
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await renderForm(kind);

    expect(screen.getByRole("alert").textContent).toContain("refresh the page");
    submit();
    expect(screen.getByRole("alert").textContent).toContain("refresh the page");
    expect(screen.getByLabelText("Email").getAttribute("aria-invalid")).toBe("false");
    expect(fetch).not.toHaveBeenCalled();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("recovers from a stale widget and allows a verified retry", async () => {
    const api = stubTurnstile();
    api.getResponse.mockImplementationOnce(() => {
      throw new Error("Widget not found");
    });
    const fetch = vi
      .fn()
      .mockResolvedValue(Response.json({ success: true, emailConfigured: false }));
    vi.stubGlobal("fetch", fetch);
    await renderForm(kind);

    await waitFor(() => expect(api.render).toHaveBeenCalledOnce());
    submit();
    expect(screen.getByRole("alert").textContent).toContain("Please try again");
    expect(fetch).not.toHaveBeenCalled();
    expect(api.reset).toHaveBeenCalledWith("widget-1");
    expect(screen.getByLabelText("Email").getAttribute("aria-invalid")).toBe("false");

    submit();
    await waitFor(() => expect(mocks.push).toHaveBeenCalledOnce());
    expect(fetch).toHaveBeenCalledOnce();
    const payload = JSON.parse(fetch.mock.calls[0][1].body);
    expect(payload.turnstile_token).toBe("valid-token");
    expect(payload.consent_given).toBe(true);
    const url = mocks.push.mock.calls[0][0];
    expect(url).toContain("noemail=1");
    expect(url).not.toContain("test@example.com");
  });
});
