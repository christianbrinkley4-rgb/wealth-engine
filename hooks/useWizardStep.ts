"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function normalizeStep(stepParam: string | null, totalSteps: number) {
  const parsed = Number(stepParam);
  if (!Number.isInteger(parsed)) {
    return 1;
  }
  if (parsed < 1 || parsed > totalSteps) {
    return 1;
  }
  return parsed;
}

function readStepFromUrl(totalSteps: number): number {
  if (typeof window === "undefined") return 1;
  const params = new URLSearchParams(window.location.search);
  return normalizeStep(params.get("step"), totalSteps);
}

/**
 * Drives wizard steps from the URL (?step=n) without useSearchParams().
 * That avoids Suspense stalling the whole route on static pages (infinite "Loading...").
 */
export function useWizardStep(totalSteps: number = 5) {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const syncStep = () => setStep(readStepFromUrl(totalSteps));
    const timer = window.setTimeout(syncStep, 0);
    const onPopState = () => syncStep();
    window.addEventListener("popstate", onPopState);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", onPopState);
    };
  }, [pathname, totalSteps]);

  const navigateTo = useCallback(
    (nextStep: number) => {
      const clamped = Math.max(1, Math.min(totalSteps, nextStep));
      setStep(clamped);

      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      if (clamped === 1) {
        params.delete("step");
      } else {
        params.set("step", String(clamped));
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, totalSteps],
  );

  const goToNext = useCallback(() => navigateTo(step + 1), [navigateTo, step]);
  const goToPrev = useCallback(() => navigateTo(step - 1), [navigateTo, step]);
  const goToStep = useCallback((nextStep: number) => navigateTo(nextStep), [navigateTo]);

  return {
    step,
    goToNext,
    goToPrev,
    goToStep,
    isFirst: step === 1,
    isLast: step === totalSteps,
    progressPercent: (step / totalSteps) * 100,
  };
}
