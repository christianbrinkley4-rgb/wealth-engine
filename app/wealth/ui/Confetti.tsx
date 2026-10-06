"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#0f1f22", "#2b46f0", "#ff6a45", "#ffffff", "#c8f73c"];
const LIFE_MS = 2800;

/**
 * A physics burst on a full-screen canvas when a quiz result lands: 150
 * pieces with gravity, air drag, spin and flutter. Decoration only. It never
 * blocks a tap, and it does not run for reduced motion.
 */
export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.scale(ratio, ratio);

    const pieces = Array.from({ length: 150 }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 13;
      return {
        x: width / 2,
        y: height * 0.32,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 7,
        size: 5 + Math.random() * 8,
        spin: Math.random() * Math.PI,
        spinRate: (Math.random() - 0.5) * 0.4,
        flutter: Math.random() * Math.PI * 2,
        color: COLORS[index % COLORS.length],
        round: index % 4 === 0,
      };
    });

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const age = now - start;
      context.clearRect(0, 0, width, height);
      if (age > LIFE_MS) return;
      context.globalAlpha = Math.min(1, (LIFE_MS - age) / 700);
      for (const piece of pieces) {
        piece.vx *= 0.985;
        piece.vy = piece.vy * 0.985 + 0.34;
        piece.x += piece.vx + Math.sin(piece.flutter + age / 180) * 0.8;
        piece.y += piece.vy;
        piece.spin += piece.spinRate;
        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.spin);
        // Squash on one axis as it spins, so flat pieces look like they tumble.
        context.scale(1, Math.cos(piece.spin * 2.2));
        context.fillStyle = piece.color;
        if (piece.round) {
          context.beginPath();
          context.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-piece.size / 2, -piece.size / 3, piece.size, piece.size / 1.5);
        }
        context.restore();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={ref} className="w-confetti" aria-hidden />;
}
