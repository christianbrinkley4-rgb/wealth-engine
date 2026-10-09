// @vitest-environment jsdom
import { createElement } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { RevealObserver } from "@/components/motion/RevealObserver";
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.documentElement.classList.remove("js-reveal");
});
it("does not hide server content before the observer marks visible targets", () => {
  let callback: IntersectionObserverCallback;
  const observer = { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe = observer.observe;
      unobserve = observer.unobserve;
      disconnect = observer.disconnect;
    },
  );
  const visible = document.createElement("h1");
  visible.dataset.reveal = "";
  visible.textContent = "Readable at first paint";
  document.body.append(visible);
  const below = document.createElement("p");
  below.dataset.reveal = "";
  document.body.append(below);
  const { unmount } = render(createElement(RevealObserver));
  expect(document.documentElement.classList.contains("js-reveal")).toBe(false);
  act(() =>
    callback(
      [
        { target: visible, isIntersecting: true, boundingClientRect: { top: 100 } },
        { target: below, isIntersecting: false, boundingClientRect: { top: 1500 } },
      ] as unknown as IntersectionObserverEntry[],
      observer as unknown as IntersectionObserver,
    ),
  );
  expect(visible.classList.contains("is-in")).toBe(true);
  expect(below.classList.contains("is-in")).toBe(false);
  expect(document.documentElement.classList.contains("js-reveal")).toBe(true);
  unmount();
  expect(document.documentElement.classList.contains("js-reveal")).toBe(false);
  visible.remove();
  below.remove();
});
