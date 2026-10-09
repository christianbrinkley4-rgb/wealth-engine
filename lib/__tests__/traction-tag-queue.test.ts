// @vitest-environment jsdom
import { createElement } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
const route = vi.hoisted(() => ({ path: "/aep" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.path }));
vi.mock("next/script", () => ({ default: (props: { children?: string; id?: string; strategy?: string; src?: string }) => createElement("script", { id: props.id, src: props.src, "data-strategy": props.strategy }, props.children) }));
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.resetModules(); delete window.gtag; });
it("queues one landing view, phone clicks and later routes before the deferred tag loads", async () => {
  vi.stubEnv("NEXT_PUBLIC_GA4_ID", "G-SYNTHETIC"); vi.resetModules();
  const { Analytics, trackEvent } = await import("@/app/components/Analytics");
  window.history.replaceState({}, "", "/aep?email=synthetic#private");
  const { rerender } = render(createElement(Analytics));
  expect(document.querySelector('script[src*="googletagmanager"]')?.getAttribute("data-strategy")).toBe("lazyOnload");
  // Execute only our queue bootstrap, with no network or external tag.
  const code = document.getElementById("google-tag")!.textContent!;
  new Function("window", "location", code)(window, window.location);
  act(() => trackEvent("phone_click", { cta_location: "header" }));
  route.path = "/turning-65"; window.history.replaceState({}, "", route.path + "?zip=99999");
  rerender(createElement(Analytics));
  const queue = (window as Window & { dataLayer: IArguments[] }).dataLayer.map(args => Array.from(args));
  const views = queue.filter(call => call[0] === "config");
  expect(views).toHaveLength(2);
  expect(views[0][2]).toEqual({ page_path: "/aep", page_location: "http://localhost:3000/aep" });
  expect(views[1][2]).toEqual({ page_path: "/turning-65", page_location: "http://localhost:3000/turning-65" });
  expect(queue.filter(call => call[0] === "event" && call[1] === "phone_click")).toHaveLength(1);
  expect(JSON.stringify(queue)).not.toContain("99999"); expect(JSON.stringify(queue)).not.toContain("email=");
});
