// @vitest-environment jsdom
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CTA_IDS, CTA_LOCATIONS, DESTINATIONS, eventParams, LIST_IDS, QUIZ_IDS, TOOL_IDS } from "@/lib/analytics";
import { Analytics, trackEvent } from "@/app/components/Analytics";
import { useToolTracking } from "@/hooks/useToolTracking";
import { TopRouteChrome } from "@/app/components/TopRouteChrome";
import { ServiceHero } from "@/app/components/ServiceHero";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { StickyMobileCta } from "@/components/StickyMobileCta";
vi.mock("next/navigation", () => ({ usePathname: () => "/aep" }));
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); delete window.gtag; });

describe("fixed measurement vocabulary", () => {
  for (const [key, values] of Object.entries({ tool_id: TOOL_IDS, quiz_id: QUIZ_IDS, cta_id: CTA_IDS, cta_location: CTA_LOCATIONS, destination: DESTINATIONS, list_id: LIST_IDS })) {
    it(`allows only the documented ${key} labels`, () => {
      for (const value of values) expect(eventParams("/tools?email=private", { [key]: value })).toEqual({ page_path: "/tools", [key]: value });
      for (const value of ["personal@example.com", "27401", "", "__proto__", "other"]) expect(eventParams("/tools", { [key]: value } as never)).toEqual({ page_path: "/tools" });
    });
  }
  it("never forwards answers or health details", () => {
    expect(eventParams("/tools?zip=27401", { tool_id: "budget", doctors: "Synthetic Doctor", income: 120000, zip: "27401" } as never)).toEqual({ page_path: "/tools", tool_id: "budget" });
  });
});

describe("calculator completion", () => {
  it("counts first change and ten seconds with a result once; untouched tools emit nothing", () => {
    vi.useFakeTimers();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    window.history.replaceState({}, "", "/tools/budget");
    const recorder = vi.fn(); window.gtag = recorder;
    const { result } = renderHook(() => useToolTracking("budget"));
    act(() => vi.advanceTimersByTime(20000)); expect(recorder).not.toHaveBeenCalled();
    act(() => { result.current(() => true); vi.advanceTimersByTime(9000); });
    expect(recorder.mock.calls.map(call => call[1])).toEqual(["tool_start"]);
    act(() => { result.current(() => true); vi.advanceTimersByTime(10000); });
    act(() => { result.current(() => true); vi.advanceTimersByTime(20000); });
    expect(recorder.mock.calls.map(call => call[1])).toEqual(["tool_start", "tool_complete"]);
    trackEvent("tool_complete", { tool_id: "budget" });
    expect(recorder).toHaveBeenCalledTimes(2);
  });
  it("does not complete without a result or after unmount", () => {
    vi.useFakeTimers(); window.history.replaceState({}, "", "/tools/emergency-fund");
    const recorder = vi.fn(); window.gtag = recorder;
    const { result, unmount } = renderHook(() => useToolTracking("emergency_fund"));
    act(() => { result.current(() => false); vi.advanceTimersByTime(10000); });
    act(() => result.current(() => true)); unmount(); act(() => vi.advanceTimersByTime(10000));
    expect(recorder.mock.calls.map(call => call[1])).toEqual(["tool_start"]);
  });
});

describe("CTA surfaces and official handoffs", () => {
  it("labels the header, hero, sticky bar and page close", () => {
    const surfaces = [
      [createElement(TopRouteChrome), "header"],
      [createElement(ServiceHero, { crumbs: [], eyebrow: "Synthetic", title: "Synthetic", lede: "Synthetic", secondaryHref: "/plan-check", secondaryLabel: "Plan check" }), "hero"],
      [createElement(StickyMobileCta), "sticky_bar"],
      [createElement(KitchenTableClose, { heading: "Synthetic", body: "Synthetic", href: "/schedule", label: "Book" }), "page_close"],
    ] as const;
    for (const [component, label] of surfaces) expect(renderToStaticMarkup(component)).toContain(`data-cta-location="${label}"`);
  });
  it("records one phone tap and only genuine tagged official URLs", () => {
    const recorder = vi.fn(); window.gtag = recorder;
    render(createElement(Analytics));
    const link = document.createElement("a"); link.href = "tel:+10000000000"; link.dataset.ctaLocation = "tool_result"; document.body.append(link);
    fireEvent.click(link); expect(recorder.mock.calls.filter(call => call[1] === "phone_click")).toHaveLength(1);
    link.setAttribute("data-handoff", ""); link.href = "https://www.medicare.gov/plan-compare/?zip=27401";
    fireEvent.click(link);
    expect(recorder.mock.calls.filter(call => call[1] === "official_handoff_click")).toEqual([["event", "official_handoff_click", { page_path: window.location.pathname, destination: "medicare_plan_compare" }]]);
    link.href = "https://medicare.gov.example.com/plan-compare/"; fireEvent.click(link);
    expect(recorder.mock.calls.filter(call => call[1] === "official_handoff_click")).toHaveLength(1);
    link.href = "https://www.ncdoi.gov/consumers/shiip"; fireEvent.click(link);
    expect(recorder.mock.calls.filter(call => call[1] === "official_handoff_click").at(-1)?.[2]).toEqual({ page_path: window.location.pathname, destination: "nc_shiip" });
    link.setAttribute("href", "https://["); fireEvent.click(link);
    expect(recorder.mock.calls.filter(call => call[1] === "official_handoff_click")).toHaveLength(2);
    link.remove();
  });
  it("records one CTA click with fixed labels", () => {
    const recorder = vi.fn(); window.gtag = recorder;
    render(createElement("div", {}, createElement(Analytics), createElement(TopRouteChrome)));
    fireEvent.click(screen.getByRole("link", { name: "Plan check", exact: true }));
    expect(recorder.mock.calls.filter(call => call[1] === "cta_click")).toEqual([["event", "cta_click", { page_path: window.location.pathname, cta_id: "plan_check", cta_location: "header" }]]);
    const plain = document.createElement("a"); plain.href = "/schedule?email=synthetic"; document.body.append(plain);
    fireEvent.click(plain); plain.remove();
    expect(recorder.mock.calls.filter(call => call[1] === "cta_click").at(-1)?.[2]).toEqual({ page_path: window.location.pathname, cta_id: "book_time", cta_location: "inline" });
  });
});
