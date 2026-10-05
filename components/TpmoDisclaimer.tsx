import { TPMO_DISCLAIMER } from "@/lib/agent";

/**
 * The CMS third-party marketing (TPMO) disclaimer for Medicare pages.
 *
 * The wording lives in exactly one place, TPMO_DISCLAIMER in lib/agent.ts,
 * built from the confirmed organization and product counts there. Change the
 * text or the counts in that file only; every Medicare page, the footer, and
 * the disclosure box all render it from here.
 */
export function TpmoDisclaimer({ className }: { className?: string }) {
  return <p className={className}>{TPMO_DISCLAIMER}</p>;
}
