"use client";

import { useRef } from "react";
import { trackEvent } from "@/app/components/Analytics";
import type { FormId } from "@/lib/analytics";

export function useFormTracking(form_id: FormId) {
  const started = useRef(false);
  return {
    start() {
      if (started.current) return;
      started.current = true;
      trackEvent("form_start", { form_id });
    },
    submit() {
      trackEvent("form_submit", { form_id });
    },
  };
}
