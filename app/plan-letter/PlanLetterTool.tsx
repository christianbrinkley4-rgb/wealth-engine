"use client";

import { Camera, CheckCircle2, FileText, Loader2, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { useDeferredFormCheck } from "@/hooks/useDeferredFormCheck";
import { AGENT } from "@/lib/agent";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { loadTurnstile } from "@/lib/loadTurnstile";
import {
  PLAN_LETTER_MAX_FILES,
  PLAN_LETTER_LIVE as ENABLED,
  PLAN_LETTER_MAX_PDF_PAGES,
  PLAN_LETTER_MAX_TOTAL_BYTES,
  PLAN_LETTER_RETENTION_URL,
  sniffType,
  type PlanLetterSummary,
} from "@/lib/planLetter";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const MAX_EDGE = 1600;

type TurnstileApi = {
  render: (container: HTMLElement, options: { sitekey: string; theme: "light" }) => string | undefined;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

function turnstileApi(): TurnstileApi | undefined {
  return (window as Window & { turnstile?: TurnstileApi }).turnstile;
}

const ERRORS: Record<string, string> = {
  rate_limited: "You've used this a few times in the last hour. Try again later, or call or text me and I'll read it with you.",
  form_check: "The spam check didn't go through. Give it a second and tap again.",
  file_count: `Add between 1 and ${PLAN_LETTER_MAX_FILES} pages.`,
  too_large: "Those pages are too big together. Try fewer pages, or photos instead of a scan.",
  file_type: "That file type won't work. Use a photo (JPG or PNG) or a PDF.",
  unreadable: "I couldn't read that clearly. Try a sharper photo in good light, flat on a table.",
  timeout: "That took too long. Try again with fewer pages.",
  too_many_pages: `That PDF has more than ${PLAN_LETTER_MAX_PDF_PAGES} pages. Take photos of the first few pages instead.`,
};

/** Phone photos are huge. Shrink them to a readable 1600px JPEG before upload. */
async function shrink(file: File): Promise<Blob> {
  if (file.type === "application/pdf" || !file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    return file;
  }
}

export function PlanLetterTool() {
  const id = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "reading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<PlanLetterSummary | null>(null);
  const { formRef, active, activate } = useDeferredFormCheck();
  const [turnstileReady, setTurnstileReady] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const showingForm = !(status === "done" && summary);

  useEffect(() => {
    if (!ENABLED || !TURNSTILE_SITE_KEY || !active || turnstileReady) return;
    loadTurnstile();
    const poll = setInterval(() => {
      if (turnstileApi()) {
        setTurnstileReady(true);
        clearInterval(poll);
      }
    }, 100);
    const giveUp = setTimeout(() => clearInterval(poll), 20000);
    return () => {
      clearInterval(poll);
      clearTimeout(giveUp);
    };
  }, [turnstileReady, active]);

  useEffect(() => {
    const api = turnstileApi();
    const target = container.current;
    if (!TURNSTILE_SITE_KEY || !turnstileReady || !showingForm || !target || !api) return;
    let widgetId: string | undefined;
    try {
      widgetId = api.render(target, { sitekey: TURNSTILE_SITE_KEY, theme: "light" });
      widget.current = widgetId ?? null;
    } catch {
      widget.current = null;
    }
    return () => {
      widget.current = null;
      if (widgetId) {
        try {
          api.remove(widgetId);
        } catch {
          // Already gone.
        }
      }
    };
  }, [turnstileReady, active, showingForm]);

  useEffect(() => {
    if (status === "done") resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [status]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setError(null);
    setFiles((current) => [...current, ...Array.from(list)].slice(0, PLAN_LETTER_MAX_FILES));
  }

  function reset() {
    setFiles([]);
    setSummary(null);
    setError(null);
    setStatus("idle");
    try {
      if (widget.current) turnstileApi()?.reset(widget.current);
    } catch {
      // The next tap asks for a fresh check.
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "reading") return;
    if (files.length === 0) {
      setError("Add a photo of at least one page first.");
      return;
    }
    let turnstileToken: string | undefined;
    if (TURNSTILE_SITE_KEY) {
      turnstileToken = widget.current ? turnstileApi()?.getResponse(widget.current) : undefined;
      if (!turnstileToken) {
        setError("The spam check is still loading. Give it a second and tap again.");
        return;
      }
    }
    setStatus("reading");
    setError(null);
    try {
      const body = new FormData();
      let total = 0;
      for (const [index, file] of files.entries()) {
        const blob = await shrink(file);
        const head = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
        if (!sniffType(head)) {
          setError(
            "One of those photos is in a format I can't read (often an iPhone HEIC photo). Take a screenshot of the photo and add the screenshot instead, or use a PDF.",
          );
          setStatus("idle");
          return;
        }
        total += blob.size;
        body.append("files", blob, `page-${index + 1}`);
      }
      if (total > PLAN_LETTER_MAX_TOTAL_BYTES) {
        setError(ERRORS.too_large);
        setStatus("idle");
        return;
      }
      if (turnstileToken) body.append("turnstileToken", turnstileToken);
      const response = await fetch("/api/plan-letter", { method: "POST", body });
      const data = (await response.json().catch(() => ({}))) as {
        summary?: PlanLetterSummary;
        error?: string;
      };
      if (response.ok && data.summary) {
        setSummary(data.summary);
        setStatus("done");
        return;
      }
      setError(ERRORS[data.error ?? ""] ?? `Something went wrong reading that. Call or text me at ${AGENT.phone} and I'll go through it with you.`);
    } catch {
      setError("That didn't send. Check your connection and try again.");
    }
    setStatus("idle");
    try {
      if (widget.current) turnstileApi()?.reset(widget.current);
    } catch {
      // The next tap asks for a fresh check.
    }
  }

  if (!ENABLED) {
    return (
      <div className="card-surface p-6 md:p-8" data-plan-letter>
        <h2 className="text-24 font-bold">The letter reader is being set up</h2>
        <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
          Until it&apos;s ready, I&apos;ll read your Annual Notice of Change with you myself. Call or
          text{" "}
          <a href={AGENT.phoneHref} data-cta-location="inline" className="font-semibold underline underline-offset-2">
            {AGENT.phone}
          </a>
          , or book a free phone review.
        </p>
        <a
          href={ENGINE_BOOKING_URL}
          data-cta-location="inline"
          className="text-17 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] mt-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a phone review
        </a>
      </div>
    );
  }

  if (status === "done" && summary) {
    return (
      <div ref={resultRef} className="card-surface scroll-mt-24 p-6 md:p-8" role="status" data-plan-letter>
        {summary.isAnoc ? (
          <>
            <CheckCircle2 className="size-10 text-[var(--color-success)]" aria-hidden />
            <h2 className="text-24 mt-4 font-bold">
              What changes in your plan{summary.planYear ? ` for ${summary.planYear}` : ""}
            </h2>
            {summary.changes.length === 0 ? (
              <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                I couldn&apos;t find a clear list of changes on those pages. Try the page with the
                table called &quot;Summary of Important Costs.&quot;
              </p>
            ) : (
              <ul className="mt-5 flex flex-col gap-4">
                {summary.changes.map((change, index) => (
                  <li key={index} className="border-t border-gray-200 pt-4">
                    <p className="text-15 font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                      {change.area}
                    </p>
                    {change.before || change.after ? (
                      <p className="text-19 mt-1 font-semibold">
                        {change.before ?? "?"} → {change.after ?? "?"}
                      </p>
                    ) : null}
                    <p className="text-17 mt-1 leading-relaxed">{change.plainEnglish}</p>
                  </li>
                ))}
              </ul>
            )}
            {summary.watchOuts.length > 0 ? (
              <div className="mt-6 rounded-lg border-2 border-[var(--color-gold)] p-4">
                <p className="text-19 font-semibold">Worth a closer look</p>
                <ul className="text-17 mt-2 flex list-disc flex-col gap-2 pl-5 leading-relaxed">
                  {summary.watchOuts.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {summary.questionsToAsk.length > 0 ? (
              <>
                <p className="text-19 mt-6 font-semibold">Questions to ask before December 7</p>
                <ul className="text-17 mt-2 flex list-disc flex-col gap-2 pl-5 leading-relaxed">
                  {summary.questionsToAsk.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="text-15 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
              This summary was written by an AI reading your pages, so it can miss or misread
              something. Your letter is the official word. It doesn&apos;t check your doctors or your
              prescriptions, and it doesn&apos;t tell you whether to change plans.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-24 font-bold">That doesn&apos;t look like an Annual Notice of Change</h2>
            <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              The letter usually says &quot;Annual Notice of Change&quot; near the top of the first
              page and arrives by the end of September. If you can&apos;t find yours, your plan can
              mail or email another copy. The number is on the back of your member card.
            </p>
          </>
        )}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-19 font-semibold">Want a second set of eyes on it?</p>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;ll check your doctors and prescriptions against next year&apos;s plans in your
            county, free, before December 7.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={ENGINE_BOOKING_URL}
              data-cta-location="tool_result"
              className="text-17 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a free phone review
            </a>
            <a
              href={AGENT.phoneHref}
              data-cta-location="tool_result"
              className="text-17 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-navy)] bg-white px-6 font-semibold text-[var(--color-navy)]"
            >
              Call or text {AGENT.phone}
            </a>
          </div>
          <button type="button" onClick={reset} className="text-17 mt-5 underline underline-offset-2">
            Read a different letter
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} onFocus={activate} className="card-surface p-6 md:p-8" data-plan-letter>
      <h2 className="text-24 font-bold">Add photos of your letter</h2>
      <p className="text-17 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
        {`Up to ${PLAN_LETTER_MAX_FILES} pages. `}The most useful one is the table called &quot;Summary
        of Important Costs,&quot; usually in the first few pages. You can skip the page with your
        name and address.
      </p>

      <label
        htmlFor={`${id}-files`}
        className="text-19 mt-5 flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[var(--color-navy)] bg-[var(--color-paper)] px-4 py-4 font-semibold"
      >
        <Camera className="size-6" aria-hidden />
        {files.length === 0 ? "Take or choose a photo" : "Add another page"}
      </label>
      <input
        id={`${id}-files`}
        type="file"
        accept="image/*,application/pdf"
        multiple
        className="sr-only"
        disabled={files.length >= PLAN_LETTER_MAX_FILES || status === "reading"}
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {files.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2" aria-label="Pages added">
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className="text-17 flex items-center justify-between gap-3 rounded-lg border border-gray-300 px-3 py-2">
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="size-5 shrink-0" aria-hidden />
                <span className="truncate">Page {index + 1}</span>
              </span>
              <button
                type="button"
                onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                className="flex size-11 items-center justify-center rounded-full"
                aria-label={`Remove page ${index + 1}`}
                disabled={status === "reading"}
              >
                <X className="size-5" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {TURNSTILE_SITE_KEY ? <div ref={container} className="mt-5 min-h-[65px]" /> : null}

      {error ? (
        <p className="text-17 mt-4 font-semibold text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="text-17 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[var(--color-navy)] px-6 font-semibold text-[var(--color-paper)] mt-5 w-full disabled:opacity-70" disabled={status === "reading"}>
        {status === "reading" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden /> Reading your letter, about 20 seconds
          </>
        ) : (
          "Explain my letter"
        )}
      </button>
      <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
        Your pages are sent to Anthropic, the company behind the Claude AI, to be read. This site
        doesn&apos;t save them, and you don&apos;t need to give a name, phone number or email.
        Anthropic&apos;s standard policy is to delete them within 30 days (
        <a href={PLAN_LETTER_RETENTION_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          their policy
        </a>
        ).
      </p>
    </form>
  );
}
