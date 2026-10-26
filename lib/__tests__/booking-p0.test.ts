// @vitest-environment jsdom
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { bookingParams, isBookingHref, isMeasuredEvent, metaAllowedOnRoute } from "@/lib/analytics";
const route = vi.hoisted(() => ({ renderedPath: null as string | null }));
vi.mock("next/navigation", () => ({ usePathname: () => route.renderedPath ?? window.location.pathname }));
vi.mock("next/script", () => ({
  default: ({ id, children }: { id?: string; children?: React.ReactNode }) =>
    createElement("script", { id }, children),
}));
vi.mock("@/lib/attribution", () => ({ captureAttribution: () => {} }));
vi.stubEnv("NEXT_PUBLIC_META_ADS_ALLOWED", "true");
vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "test-pixel");
const { Analytics, trackLead, trackMetaContact } = await import("@/app/components/Analytics");
const { TrackedLink } = await import("@/components/TrackedLink");
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  window.history.replaceState({}, "", "/");
  route.renderedPath = null;
});
describe("booking measurement", () => {
  it("declares booking and strips everything except location and path", () => {
    expect(isMeasuredEvent("booking_click")).toBe(true);
    expect(isBookingHref(ENGINE_BOOKING_URL)).toBe(true);
    expect(isBookingHref("/book")).toBe(true);
    expect(isBookingHref(ENGINE_BOOKING_URL + ".invalid")).toBe(false);
    expect(
      bookingParams("/medicare?email=private", {
        cta_location: "hero",
        quiz_id: "aep",
        ...{ email: "private", phone: "private" },
      }),
    ).toEqual({ page_path: "/medicare", cta_location: "hero" });
  });
  it.each([ENGINE_BOOKING_URL, "/book"])(
    "counts one event for plain and tracked links to %s",
    (href) => {
      window.gtag = vi.fn();
      const sa = vi.fn();
      Object.assign(window, { sa_event: sa });
      const { getByText } = render(
        createElement(
          "div",
          {},
          createElement(Analytics),
          createElement(
            "a",
            {
              href,
              "data-cta-location": "hero",
              onClick: (e: React.MouseEvent) => e.preventDefault(),
            },
            "plain",
          ),
          createElement(
            TrackedLink,
            {
              href,
              ctaLocation: "article_end",
              event: "article_cta_click",
              onClick: (e: React.MouseEvent) => e.preventDefault(),
            },
            "tracked",
          ),
        ),
      );
      fireEvent.click(getByText("plain"));
      fireEvent.click(getByText("tracked"));
      expect(window.gtag).toHaveBeenCalledTimes(2);
      expect(window.gtag).toHaveBeenNthCalledWith(1, "event", "booking_click", {
        page_path: "/",
        cta_location: "hero",
      });
      expect(window.gtag).toHaveBeenNthCalledWith(2, "event", "booking_click", {
        page_path: "/",
        cta_location: "article_end",
      });
      expect(sa).toHaveBeenCalledTimes(2);
      expect(sa).toHaveBeenCalledWith("booking_click", { page_path: "/", cta_location: "hero" });
    },
  );
});
describe("Meta route gate", () => {
  it("omits bootstrap and PageView when navigating from wealth to Medicare", () => {
    window.history.replaceState({}, "", "/wealth");
    window.fbq = vi.fn();
    const { rerender } = render(createElement(Analytics));
    expect(document.querySelector("#meta-pixel")).not.toBeNull();
    window.history.replaceState({}, "", "/medicare");
    trackMetaContact();
    trackLead("test", "medicare");
    rerender(createElement(Analytics));
    expect(document.querySelector("#meta-pixel")).toBeNull();
    expect(window.fbq).not.toHaveBeenCalled();
  });
  it.each([false, true])("configures the created stub and gates a late load: %s", (late) => {
    window.history.replaceState({}, "", "/wealth");
    const pixel = vi.fn();
    delete window.fbq;
    const { rerender } = render(createElement(Analytics));
    const bootstrap = document.querySelector("#meta-pixel")!.textContent!;
    const init = bootstrap.indexOf("fbq('init'");
    for (const setting of [
      "window.fbq.disablePushState = true",
      "window.fbq.disableAutoConfig = true",
      "fbq('set','autoConfig',false,'test-pixel')",
    ]) {
      expect(bootstrap.indexOf(setting)).toBeGreaterThan(-1);
      expect(bootstrap.indexOf(setting)).toBeLessThan(init);
    }
    expect(bootstrap.indexOf("n=f.fbq=function")).toBeLessThan(bootstrap.indexOf("window.fbq.disablePushState"));
    const script = document.createElement("script");
    const insertBefore = vi.fn();
    const run = () => runInNewContext(bootstrap, {
      window,
      location: window.location,
      get fbq() { return window.fbq; },
      document: {
        createElement: () => script,
        getElementsByTagName: () => [{ parentNode: { insertBefore } }],
      },
    });
    run();
    const stub = window.fbq as NonNullable<typeof window.fbq> & { callMethod?: typeof pixel };
    expect(stub).toHaveProperty("disablePushState", true);
    expect(stub).toHaveProperty("disableAutoConfig", true);
    trackMetaContact();
    trackLead("early", "financial_planning");
    expect(stub).toHaveProperty("queue", []);
    if (late) {
      window.history.replaceState({}, "", "/turning-65");
      rerender(createElement(Analytics));
    }
    stub.callMethod = pixel;
    script.onload?.call(script, new Event("load"));
    if (late) {
      expect(pixel).not.toHaveBeenCalled();
      window.history.replaceState({}, "", "/wealth");
      rerender(createElement(Analytics));
    }
    expect(pixel).toHaveBeenNthCalledWith(1, "set", "autoConfig", false, "test-pixel");
    expect(pixel).toHaveBeenNthCalledWith(2, "init", "test-pixel");
    expect(pixel).toHaveBeenNthCalledWith(3, "track", "PageView");
    pixel.mockClear();
    window.history.replaceState({}, "", "/turning-65");
    run();
    trackMetaContact();
    trackLead("test", "financial_planning");
    rerender(createElement(Analytics));
    expect(pixel).not.toHaveBeenCalled();
  });
  it("checks the current browser path when the route hook still reports wealth", () => {
    route.renderedPath = "/wealth";
    window.history.replaceState({}, "", "/wealth");
    window.fbq = vi.fn();
    const { rerender } = render(createElement(Analytics));
    window.history.replaceState({}, "", "/start");
    route.renderedPath = "/wealth/retirement";
    rerender(createElement(Analytics));
    expect(window.fbq).not.toHaveBeenCalled();
  });
  it("sends permitted wealth events but never a Medicare Lead", () => {
    window.history.replaceState({}, "", "/wealth");
    window.fbq = vi.fn();
    const { rerender } = render(createElement(Analytics));
    trackLead("medicare-test", "medicare");
    expect(window.fbq).not.toHaveBeenCalled();
    trackMetaContact();
    trackLead("wealth-test", "financial_planning");
    window.history.replaceState({}, "", "/wealth/retirement");
    rerender(createElement(Analytics));
    expect(window.fbq).toHaveBeenCalledWith("track", "Contact");
    expect(window.fbq).toHaveBeenCalledWith("track", "Lead", { content_category: "financial_planning" }, { eventID: "wealth-test" });
    expect(window.fbq).toHaveBeenCalledWith("track", "PageView");
  });
  it.each(["/", "/medicare", "/aep", "/start", "/links", "/wealthy", "/tools", ""])(
    "stays off at %s even with ads enabled",
    (path) => {
      expect(metaAllowedOnRoute(path, true)).toBe(false);
      window.history.replaceState({}, "", path || "/");
      window.fbq = vi.fn();
      trackMetaContact();
      trackLead("test", "medicare");
      expect(window.fbq).not.toHaveBeenCalled();
    },
  );
  it("allows only the wealth section with the flag enabled", () => {
    expect(metaAllowedOnRoute("/wealth", true)).toBe(true);
    expect(metaAllowedOnRoute("/wealth/article", true)).toBe(true);
    expect(metaAllowedOnRoute("/wealth", false)).toBe(false);
    expect(metaAllowedOnRoute(null, true)).toBe(false);
  });
});

describe("booking redirect", () => {
  it("permanently redirects the short booking path to the shared URL", async () => {
    const { default: config } = await import("../../next.config");
    expect(await config.redirects!()).toContainEqual({
      source: "/book",
      destination: ENGINE_BOOKING_URL,
      permanent: true,
    });
  });
});
