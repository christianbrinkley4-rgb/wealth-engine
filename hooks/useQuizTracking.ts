"use client";

import { useCallback, useEffect, useRef } from "react";

import { trackEvent } from "@/app/components/Analytics";
import type { QuizId } from "@/lib/analytics";

/**
 * Funnel measurement for a quiz: start, each step, completion, and leaving
 * part-way. Every event carries the quiz id and a step number only. Answers,
 * scores and results never leave the device through analytics.
 *
 * Abandonment fires once, when the page is hidden or left after a start and
 * before completion. "Hidden" includes switching tabs on a phone, which is
 * the moment most people actually walk away; if they come back and finish,
 * the completion still counts, so the abandon number reads as "stepped away",
 * not "lost for good".
 */
export function useQuizTracking(quizId: QuizId) {
  const started = useRef(false);
  const completed = useRef(false);
  const abandoned = useRef(false);
  const lastStep = useRef(0);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    completed.current = false;
    abandoned.current = false;
    lastStep.current = 0;
    trackEvent("quiz_start", { quiz_id: quizId });
  }, [quizId]);

  /** Call with the 1-based number of the step just answered. */
  const step = useCallback(
    (stepNumber: number) => {
      if (!started.current) start();
      lastStep.current = stepNumber;
      trackEvent("quiz_step", { quiz_id: quizId, step: stepNumber });
    },
    [quizId, start],
  );

  const complete = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    trackEvent("quiz_complete", { quiz_id: quizId, step: lastStep.current });
  }, [quizId]);

  /** For "retake": the next start counts as a new run. */
  const reset = useCallback(() => {
    started.current = false;
    completed.current = false;
    abandoned.current = false;
    lastStep.current = 0;
  }, []);

  useEffect(() => {
    function leave() {
      if (!started.current || completed.current || abandoned.current) return;
      abandoned.current = true;
      trackEvent("quiz_abandon", { quiz_id: quizId, step: lastStep.current });
    }
    function onVisibility() {
      if (document.visibilityState === "hidden") leave();
    }
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", leave);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", leave);
      // Leaving the quiz for another page inside the site is also leaving it.
      leave();
    };
  }, [quizId]);

  return { start, step, complete, reset };
}
