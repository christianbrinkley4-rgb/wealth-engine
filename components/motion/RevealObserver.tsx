"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals [data-reveal] elements as they scroll into view, once each.
 *
 * One observer for the whole site, not one per component, so a long article
 * with forty reveals costs the same as a page with four. A mutation observer
 * picks up elements that client components render later (quiz results, the
 * date tool). Anything already above the viewport, from a reload part-way
 * down the page, is shown at once rather than waiting to be scrolled past.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // SSR content stays readable while JavaScript starts. Only enable reveals
    // after the observer has marked the initial visible elements as shown.
    root.classList.remove("js-reveal");

    const show = (el: Element) => el.classList.add("is-in");

    if (typeof IntersectionObserver === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
        root.classList.add("js-reveal");
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll?.("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]:not(.is-in)")) io.observe(node);
          watch(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      root.classList.remove("js-reveal");
    };
  }, [pathname]);

  return null;
}

