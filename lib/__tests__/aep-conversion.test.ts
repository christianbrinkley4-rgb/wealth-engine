// @vitest-environment jsdom
import { createElement } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EngineQuiz } from "@/components/EngineQuiz";
import { FIT_QUESTIONS } from "@/lib/leadEnginePublic";
import { canMeasureVisitor, isTestTraffic, productionMeasurementHost } from "@/lib/measurementTraffic";
import { shpMetadataCopy, SHP_METADATA_REVERT_AT } from "@/lib/shpMetadata";

const events = vi.hoisted(() => ({ start: vi.fn(), step: vi.fn(), complete: vi.fn() }));
vi.mock("@/hooks/useQuizTracking", () => ({ useQuizTracking: () => events }));
vi.mock("@/app/components/Analytics", () => ({ trackLeadOnce: vi.fn(), trackEvent: vi.fn() }));
afterEach(() => { cleanup(); sessionStorage.clear(); vi.restoreAllMocks(); window.history.replaceState({}, "", "/"); });

describe("result-first Medicare checklist", () => {
  it("shows the result and booking without sending contact details", () => {
    const request = vi.spyOn(globalThis, "fetch");
    Element.prototype.scrollIntoView = vi.fn();
    const results = Object.fromEntries(["eligibility-check", "dual-review", "compare-coverage", "compare-costs"].map(key => [key, { title: "Your educational checklist", points: ["Bring your questions"] }]));
    render(createElement(EngineQuiz, { results }));
    for (const question of FIT_QUESTIONS) fireEvent.click(screen.getByRole("button", { name: question.options[0][1] }));
    expect(screen.getByRole("heading", { name: "Your educational checklist" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Book a 45-minute phone review" }).getAttribute("href")).toBe("/aep");
    expect(request).not.toHaveBeenCalled();
    expect(events.complete).toHaveBeenCalledTimes(1);
  });
});

describe("measurement traffic boundary", () => {
  it("allows only the owned production hosts", () => {
    expect(productionMeasurementHost("christianbrinkleync.com")).toBe(true);
    for (const host of ["localhost", "127.0.0.1", "deploy-preview-1.netlify.app", "christianbrinkleync.com.invalid"]) expect(productionMeasurementHost(host)).toBe(false);
    expect(canMeasureVisitor()).toBe(false);
  });
  it("keeps QA marked across routes until explicitly cleared", () => {
    window.history.replaceState({}, "", "/aep?qa=1");
    expect(isTestTraffic()).toBe(true);
    window.history.replaceState({}, "", "/medicare-fit");
    expect(isTestTraffic()).toBe(true);
    window.history.replaceState({}, "", "/aep?qa=0");
    expect(isTestTraffic()).toBe(false);
  });
  it("handles blocked storage without breaking the page", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(() => isTestTraffic()).not.toThrow();
  });
});

it("reverts deadline metadata at midnight Eastern on November 7", () => {
  expect(shpMetadataCopy(SHP_METADATA_REVERT_AT - 1).title).toContain("Nov. 6");
  expect(shpMetadataCopy(SHP_METADATA_REVERT_AT).title).not.toContain("Deadline");
});
