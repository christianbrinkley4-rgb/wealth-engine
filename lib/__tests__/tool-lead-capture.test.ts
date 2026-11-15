// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  calculate,
  calculatorLeadLabel,
} from "@/app/greensboro-medicare-cost-calculator/data";
import { CHECKLIST_CONTACT_REQUEST } from "@/lib/planChecklist";

/**
 * Lead capture wiring on the cost calculator and the plan checklist.
 *
 * All test data here is fictional. No real client appears in this file.
 */

const mocks = vi.hoisted(() => ({ push: vi.fn(), event: vi.fn(), lead: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("@/app/components/Analytics", () => ({
  trackEvent: mocks.event,
  recordAcceptedLead: mocks.lead,
}));

const ROOT = join(__dirname, "..", "..");
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");
const sentBody = (fetch: ReturnType<typeof vi.fn>) => JSON.parse(fetch.mock.calls[0][1].body);

beforeEach(() => {
  vi.resetModules();
  // No site key: the form check is inactive, as it is in local development.
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "");
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("EmailResultsCapture optional props", () => {
  it("keeps the original heading and button when no option is passed", async () => {
    const { EmailResultsCapture } = await import("@/components/EmailResultsCapture");
    render(
      createElement(EmailResultsCapture, {
        wizardData: { zip_code: "", irmaa_bracket: "Test label" },
      }),
    );
    expect(screen.getByRole("heading", { name: "Send me these numbers" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /email it to me/i })).toBeTruthy();
  });

  it("leaves out fields a tool does not ask for", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true, stored: true }));
    vi.stubGlobal("fetch", fetch);
    const { EmailResultsCapture } = await import("@/components/EmailResultsCapture");
    render(
      createElement(EmailResultsCapture, {
        wizardData: { zip_code: "", calculated_premium: 209.5, irmaa_bracket: "Test label" },
      }),
    );
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /email it to me/i }));

    await waitFor(() => expect(mocks.push).toHaveBeenCalledOnce());
    const body = sentBody(fetch);
    expect(body.source).toBe("wizard_completion");
    expect(body.calculated_premium).toBe(209.5);
    expect(body).not.toHaveProperty("age");
    expect(body).not.toHaveProperty("filing_status");
    expect(body).not.toHaveProperty("annual_income");
  });
});

describe("cost calculator lead label", () => {
  const result = calculate({ age: 67, meds: 7, visits: 13 });
  const label = calculatorLeadLabel(result);

  it("starts with the tool name and marks the Part B figure as projected", () => {
    expect(label.startsWith("Cost calculator, 2027 projected Part B: ")).toBe(true);
  });

  it("fits the 100 characters the capture API stores, at the highest inputs", () => {
    const highest = calculatorLeadLabel(calculate({ age: 90, meds: 10, visits: 24 }));
    expect(highest.length).toBeLessThanOrEqual(100);
    expect(label.length).toBeLessThanOrEqual(100);
  });

  it("carries the two yearly estimates and no prescription or visit count", () => {
    expect(label).toContain(`$${result.medigapYearly.toLocaleString("en-US")}/yr`);
    expect(label).toContain(`$${result.maYearly.toLocaleString("en-US")}/yr`);
    expect(label).not.toMatch(/\b(7|13)\b/);
  });

  it("the calculator sends age, ZIP, and the label, not the counts", () => {
    const source = read("app/greensboro-medicare-cost-calculator/CalculatorClient.tsx");
    const block = source.slice(source.indexOf("<EmailResultsCapture"));
    const props = block.slice(0, block.indexOf("/>"));
    expect(props).toContain("irmaa_bracket: calculatorLeadLabel(result)");
    expect(props).not.toMatch(/\bmeds\b/);
    expect(props).not.toMatch(/\bvisits\b/);
  });
});

describe("plan checklist contact request", () => {
  it("holds fixed labels only, with no field from the sheet", () => {
    expect(Object.keys(CHECKLIST_CONTACT_REQUEST).sort()).toEqual([
      "interest_topic",
      "irmaa_bracket",
      "quiz_answers",
      "zip_code",
    ]);
    expect(CHECKLIST_CONTACT_REQUEST.zip_code).toBe("");
    expect(CHECKLIST_CONTACT_REQUEST.irmaa_bracket.startsWith("Plan checklist")).toBe(true);
    expect(CHECKLIST_CONTACT_REQUEST.irmaa_bracket.length).toBeLessThanOrEqual(100);
    expect(CHECKLIST_CONTACT_REQUEST.quiz_answers).toEqual({
      entry_mode: "quick_contact",
      tool: "plan_checklist",
    });
  });

  it("the checklist passes that constant and never its own entries", () => {
    const source = read("app/plan-checklist-tool/PlanChecklist.tsx");
    const block = source.slice(source.indexOf("<EmailResultsCapture"));
    const props = block.slice(0, block.indexOf("/>"));
    expect(props).toContain("wizardData={CHECKLIST_CONTACT_REQUEST}");
    expect(props).not.toContain("entries");
    expect(props).not.toContain("priorities");
  });

  it("sends nothing typed into the sheet when the contact form is submitted", async () => {
    const fetch = vi.fn().mockResolvedValue(Response.json({ success: true, stored: true }));
    vi.stubGlobal("fetch", fetch);
    const { PlanChecklist } = await import("@/app/plan-checklist-tool/PlanChecklist");
    render(createElement(PlanChecklist));

    // Fictional sheet content.
    fireEvent.change(screen.getByLabelText("ZIP code"), { target: { value: "27401" } });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Doctors"), {
      target: { value: "Dr. Test Example, Sample Family Practice" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.change(screen.getByLabelText("Prescriptions"), {
      target: { value: "Testmedicine 10 mg once a day" },
    });
    fireEvent.change(screen.getByLabelText("Pharmacy"), {
      target: { value: "Sample Pharmacy on Test Street" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    fireEvent.click(screen.getByRole("button", { name: "Make my sheet" }));

    expect(screen.getByRole("heading", { name: "Or ask me to contact you" })).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: "Test Client" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
    // The consent box is the only checkbox on the sheet step.
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send my request" }));

    await waitFor(() => expect(mocks.push).toHaveBeenCalledOnce());
    expect(fetch).toHaveBeenCalledOnce();
    expect(fetch.mock.calls[0][0]).toBe("/api/capture-lead");

    const raw = fetch.mock.calls[0][1].body as string;
    for (const typed of ["Testmedicine", "Dr. Test Example", "Sample Pharmacy", "27401"]) {
      expect(raw, `the request must not contain "${typed}"`).not.toContain(typed);
    }

    const body = sentBody(fetch);
    expect(body).toMatchObject({
      stage: "complete",
      source: "wizard_completion",
      email: "test@example.com",
      full_name: "Test Client",
      zip_code: "",
      interest_topic: "medicare",
      quiz_answers: { entry_mode: "quick_contact", tool: "plan_checklist" },
    });
    expect(body).not.toHaveProperty("calculated_premium");
    expect(body).not.toHaveProperty("age");
  });
});
