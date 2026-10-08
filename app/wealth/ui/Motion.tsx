"use client";

import { useEffect } from "react";

/**
 * Pointer-driven motion for the hub, on devices with a real cursor:
 *
 *  - [data-tilt] cards lean toward the pointer in 3D and carry a moving glare
 *  - .w-btn buttons pull slightly toward the pointer (magnetic)
 *  - [data-spot] surfaces get a spotlight that follows the pointer
 *
 * One delegated listener and one animation frame for the whole section, and
 * it only writes CSS variables, so React never re-renders for a mouse move.
 * Skipped entirely on touch screens and for reduced motion.
 */
export function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".w-root");
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let tilted: HTMLElement | null = null;
    let pulled: HTMLElement | null = null;

    const clearTilt = (el: HTMLElement | null) => {
      el?.style.removeProperty("--rx");
      el?.style.removeProperty("--ry");
    };
    const clearPull = (el: HTMLElement | null) => {
      el?.style.removeProperty("--bx");
      el?.style.removeProperty("--by");
    };

    const apply = () => {
      frame = 0;
      const event = last;
      if (!event || !(event.target instanceof Element)) return;

      const tilt = event.target.closest<HTMLElement>("[data-tilt]");
      if (tilted !== tilt) clearTilt(tilted);
      if (tilt) {
        const box = tilt.getBoundingClientRect();
        const px = (event.clientX - box.left) / box.width;
        const py = (event.clientY - box.top) / box.height;
        tilt.style.setProperty("--rx", `${((0.5 - py) * 9).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${((px - 0.5) * 11).toFixed(2)}deg`);
        tilt.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        tilt.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      }
      tilted = tilt;

      const button = event.target.closest<HTMLElement>(".w-btn");
      if (pulled !== button) clearPull(pulled);
      if (button) {
        const box = button.getBoundingClientRect();
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        button.style.setProperty("--bx", `${(dx * 0.18).toFixed(1)}px`);
        button.style.setProperty("--by", `${(dy * 0.28).toFixed(1)}px`);
      }
      pulled = button;

      const spot = event.target.closest<HTMLElement>("[data-spot]");
      if (spot) {
        const box = spot.getBoundingClientRect();
        spot.style.setProperty("--sx", `${(event.clientX - box.left).toFixed(0)}px`);
        spot.style.setProperty("--sy", `${(event.clientY - box.top).toFixed(0)}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = null;
      clearTilt(tilted);
      clearPull(pulled);
      tilted = null;
      pulled = null;
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
