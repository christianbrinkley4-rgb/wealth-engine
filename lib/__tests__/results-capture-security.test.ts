// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
// The real next/script needs the app router; the form only cares that onLoad fires.
vi.mock("next/script", async () => {
  const { useEffect } = await import("react");
  return {
    default: function Script({ onLoad }: { onLoad?: () => void }) {
      useEffect(() => onLoad?.(), [onLoad]);
      return null;
    },
  };
});

const wizardData = {
  zip_code: "27401",
  filing_status: "individual" as const,
  age: 64,
  annual_income: 80000,
  calculated_premium: 202.9,
  irmaa_bracket: "standard",
};

function stubTurnstile(token: string) {
  const api = {
    ready: vi.fn((callback: () => void) => callback()),
    render: vi.fn(() => "widget-1"),
    getResponse: vi.fn(() => token),
    reset: vi.fn(),
    remove: vi.fn(),
  };
  vi.stubGlobal("turnstile", api);
  return api;
}

async function renderForm() {
  const { EmailResultsCapture } = await import("@/components/EmailResultsCapture");
  const view = render(createElement(EmailResultsCapture, { wizardData }));
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "Test@Example.com" } });
  fireEvent.click(screen.getByRole("checkbox"));
  return view;
}

const submit = () => fireEvent.click(screen.getByRole("button", { name: /email it to me/i }));
const sentBody = (fetch: ReturnType<typeof vi.fn>) => JSON.parse(fetch.mock.calls[0][1].body);

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key");
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("results email capture form check", () => {
  it("sends the Turnstile token and an empty honeypot with a complete lead", async () => {
    const api = stubTurnstile("valid-token");
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true }));
    vi.stubGlobal("fetch", fetch);
    const { container } = await renderForm();

    await waitFor(() => expect(api.render).toHaveBeenCalledOnce());
    expect(api.render.mock.calls[0][1]).toMatchObject({ sitekey: "test-site-key" });
    submit();

    await waitFor(() => expect(mocks.push).toHaveBeenCalledOnce());
    expect(sentBody(fetch)).toMatchObject({
      stage: "complete",
      source: "wizard_completion",
      email: "test@example.com",
      website: "",
      turnstile_token: "valid-token",
    });
    expect(container.querySelector('input[name="website"]')).toHaveProperty("tabIndex", -1);
  });

  it("does not submit until the form check has produced a token", async () => {
    const api = stubTurnstile("");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await renderForm();

    await waitFor(() => expect(api.render).toHaveBeenCalledOnce());
    submit();

    expect(await screen.findByRole("alert")).toHaveProperty(
      "textContent",
      expect.stringContaining("finish the quick form check"),
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(api.reset).toHaveBeenCalledWith("widget-1");
  });

  it.each([
    () => Promise.resolve(Response.json({ error: "Rejected." }, { status: 400 })),
    () => Promise.reject(new Error("network unavailable")),
  ])("resets the spent token after a failed submit", async (response) => {
    const api = stubTurnstile("used-token");
    vi.stubGlobal("fetch", vi.fn(response));
    await renderForm();

    await waitFor(() => expect(api.render).toHaveBeenCalledOnce());
    submit();

    await screen.findByRole("alert");
    expect(api.reset).toHaveBeenCalledWith("widget-1");
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("forwards a filled honeypot so the route can drop the bot quietly", async () => {
    const api = stubTurnstile("valid-token");
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true }));
    vi.stubGlobal("fetch", fetch);
    const { container } = await renderForm();
    // The widget is polled for rather than announced, so wait for it to exist.
    await waitFor(() => expect(api.render).toHaveBeenCalledOnce());

    fireEvent.change(container.querySelector('input[name="website"]')!, {
      target: { value: "https://spam.example" },
    });
    submit();

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    expect(sentBody(fetch).website).toBe("https://spam.example");
  });

  it("keeps the form usable without a site key", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true }));
    vi.stubGlobal("fetch", fetch);
    await renderForm();

    submit();

    await waitFor(() => expect(mocks.push).toHaveBeenCalledOnce());
    expect(sentBody(fetch).turnstile_token).toBe("");
  });
});
