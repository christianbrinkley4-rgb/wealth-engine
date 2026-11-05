"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { trackEvent } from "@/app/components/Analytics";
import type { Finding } from "@/lib/retirementChecker";
import { VOICE_DISCLOSURE } from "@/lib/voiceChecker";
import {
  answerWith,
  currentStep,
  goBack,
  repeatQuestion,
  respond,
  resultsSpeech,
  startConversation,
  type StepId,
  type Turn,
  type VoiceState,
} from "@/lib/voiceScript";

import {
  BLOCKED_ERRORS,
  detectVoiceSupport,
  listenOnce,
  Speaker,
  type VoiceSupport,
  warmUpVoices,
} from "./browserSpeech";
import { CheckerResults } from "./CheckerResults";

/**
 * Voice mode for the checker, running entirely in the visitor's browser.
 *
 * The browser reads each question aloud, then listens. Every question also
 * has tap-to-answer buttons, so a misheard answer, a blocked microphone or a
 * browser that can't listen never leaves anyone stuck.
 */

type Phase = "idle" | "running" | "results" | "stopped";
type Activity = "speaking" | "listening" | "waiting" | "paused";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const THIS_YEAR = new Date().getFullYear();
const MONTH_YEAR_STEPS: Partial<Record<StepId, number[]>> = {
  birth: Array.from({ length: 46 }, (_, i) => THIS_YEAR - 40 - i),
  partBStart: Array.from({ length: 26 }, (_, i) => THIS_YEAR + 1 - i),
};
const AMOUNT_STEPS = new Set<StepId>(["wages", "income", "rothAmount"]);

const BTN_PRIMARY =
  "text-19 min-h-14 w-full rounded-lg bg-[var(--color-navy)] px-5 py-4 font-semibold text-white sm:w-auto";
const BTN_CHOICE =
  "text-17 min-h-12 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white px-4 py-3 text-left font-semibold";
const BTN_QUIET =
  "text-16 min-h-11 rounded-lg px-3 py-2 font-semibold text-[var(--color-navy)] underline underline-offset-2";
const FIELD = "text-17 mt-1 w-full rounded-lg border-2 border-[var(--color-navy)] bg-white p-3";

const noop = () => () => {};
/** Wall-clock time, only ever read in event handlers (never during render). */
const clock = () => Date.now();

export function VoiceCheck() {
  const support = useSyncExternalStore<VoiceSupport | "unknown">(
    noop,
    detectVoiceSupport,
    () => "unknown",
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [activity, setActivity] = useState<Activity>("waiting");
  const [voice, setVoice] = useState<VoiceState | null>(null);
  const [heard, setHeard] = useState("");
  const [notice, setNotice] = useState("");
  const [findings, setFindings] = useState<Finding[]>([]);
  const [micOff, setMicOff] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(THIS_YEAR - 65);

  const speaker = useRef<Speaker | null>(null);
  const stateRef = useRef<VoiceState | null>(null);
  const runId = useRef(0);
  const stopListening = useRef<() => void>(() => {});
  const silentTurns = useRef(0);
  const micOffRef = useRef(false);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const questionShownAt = useRef(0);

  const canListen = support === "full" && !micOff;

  // Stop everything if the visitor leaves the page or switches tabs.
  useEffect(() => {
    warmUpVoices();
    const haltAll = () => {
      runId.current += 1;
      stopListening.current();
      speaker.current?.cancel();
    };
    const onHide = () => {
      if (document.visibilityState === "hidden" && stateRef.current) {
        haltAll();
        setActivity((a) => (a === "speaking" || a === "listening" ? "paused" : a));
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      haltAll();
    };
  }, []);

  function getSpeaker(): Speaker {
    if (!speaker.current) speaker.current = new Speaker();
    return speaker.current;
  }

  function halt(): number {
    runId.current += 1;
    stopListening.current();
    speaker.current?.cancel();
    return runId.current;
  }

  function setVoiceState(next: VoiceState) {
    const before = stateRef.current ? currentStep(stateRef.current)?.id : undefined;
    stateRef.current = next;
    setVoice(next);
    const step = currentStep(next);
    if (step?.id !== before) questionShownAt.current = clock();
    if (step && MONTH_YEAR_STEPS[step.id]) {
      setMonth(1);
      setYear(step.id === "birth" ? THIS_YEAR - 65 : THIS_YEAR);
    }
    setAmount("");
    setAmountError("");
  }

  /** A second tap within this window landed on the next question's buttons by accident. */
  function tooSoon(): boolean {
    return clock() - questionShownAt.current < 450;
  }

  async function say(text: string, id: number): Promise<boolean> {
    setActivity("speaking");
    await getSpeaker().speak(text);
    return runId.current === id;
  }

  async function ask(text: string, id: number) {
    if (!(await say(text, id))) return;
    if (support !== "full" || micOffRef.current) {
      setActivity("waiting");
      return;
    }
    // A short pause so the tail of the question isn't heard as the answer.
    await new Promise((r) => window.setTimeout(r, 300));
    if (runId.current !== id) return;
    await listen(id, false);
  }

  /** fromTap: started by the visitor's own tap, which phones require for the microphone. */
  async function listen(id: number, fromTap: boolean) {
    setActivity("listening");
    const session = listenOnce();
    stopListening.current = session.abort;
    const result = await session.result;
    if (runId.current !== id) return;
    const state = stateRef.current;
    if (!state) return;

    if (result.kind === "error") {
      if (BLOCKED_ERRORS.has(result.error)) {
        if (!fromTap) {
          // Some phones only allow the microphone from a direct tap. Offer one.
          setActivity("waiting");
          return;
        }
        micOffRef.current = true;
        setMicOff(true);
        setNotice(
          "Your microphone isn't available, so please tap your answers. I'll still read everything out loud.",
        );
        await say("I can't hear you, so please tap your answer on the screen.", id);
        if (runId.current === id) setActivity("waiting");
        return;
      }
      silentTurns.current += 1;
      if (silentTurns.current >= 2) {
        // Stop asking; the status line tells them how to carry on.
        setActivity("waiting");
        return;
      }
      await ask(`I didn't hear anything. ${repeatQuestion(state).say}`, id);
      return;
    }
    silentTurns.current = 0;
    setNotice("");
    setHeard(result.alternatives[0]);
    await handle(respond(state, result.alternatives), id);
  }

  async function handle(turn: Turn, id: number) {
    setVoiceState(turn.state);
    if (turn.kind === "results") {
      setFindings(turn.findings ?? []);
      setPhase("results");
      trackEvent("tool_complete", { tool_id: "retirement_checker_voice" });
      window.setTimeout(() => document.getElementById("voice-results")?.focus(), 0);
      if (await say(turn.say, id)) setActivity("waiting");
      return;
    }
    if (turn.kind === "stopped") {
      setPhase("stopped");
      if (await say(turn.say, id)) setActivity("waiting");
      return;
    }
    await ask(turn.say, id);
  }

  function start() {
    const id = halt();
    const turn = startConversation();
    silentTurns.current = 0;
    setHeard("");
    setNotice("");
    setFindings([]);
    setPhase("running");
    trackEvent("tool_start", { tool_id: "retirement_checker_voice" });
    // handle() reaches speak() before its first await, so phones treat the
    // speech as part of this tap.
    void handle(turn, id);
    focusQuestion();
  }

  /** After a tapped answer, move focus to the new question and keep it on screen. */
  function focusQuestion() {
    window.setTimeout(() => {
      const target = questionRef.current ?? document.getElementById("voice-results");
      target?.focus();
    }, 0);
  }

  function tap(token: string, label: string) {
    const state = stateRef.current;
    if (!state || tooSoon()) return;
    const id = halt();
    silentTurns.current = 0;
    setNotice("");
    setHeard(label);
    void handle(answerWith(state, token), id);
    focusQuestion();
  }

  function skip() {
    const state = stateRef.current;
    if (!state || tooSoon()) return;
    const id = halt();
    setHeard("Skip");
    void handle(respond(state, ["skip"]), id);
    focusQuestion();
  }

  function talkNow() {
    const id = halt();
    silentTurns.current = 0;
    setNotice("");
    void listen(id, true);
  }

  function again() {
    const state = stateRef.current;
    if (!state) return;
    const id = halt();
    void ask(repeatQuestion(state).say, id);
  }

  function back() {
    const state = stateRef.current;
    if (!state || tooSoon()) return;
    const id = halt();
    setHeard("");
    void handle(goBack(state), id);
    focusQuestion();
  }

  function stop() {
    halt();
    setPhase("stopped");
    setActivity("waiting");
  }

  function hearResults() {
    const id = halt();
    void say(resultsSpeech(findings), id).then((same) => {
      if (same) setActivity("waiting");
    });
  }

  if (support === "unknown") return <VoiceIntro />;

  const step = voice ? currentStep(voice) : null;
  const status =
    activity === "speaking"
      ? "Reading out loud."
      : activity === "listening"
        ? "Listening. Go ahead and answer out loud."
        : activity === "paused"
          ? "Paused while you were away. Tap Repeat to continue."
          : canListen
            ? "Ready when you are. Tap Answer out loud, or pick an answer below."
            : "Pick your answer below.";

  return (
    <VoiceIntro>
      {phase === "idle" || phase === "stopped" ? (
        <div className="mt-5">
          {support === "none" ? (
            <p className="text-17 leading-relaxed">
              This browser can&apos;t read questions aloud. The questions below do exactly the same
              check.
            </p>
          ) : (
            <>
              {phase === "stopped" && (
                <p className="text-17 mb-4 font-semibold" role="status">
                  Voice check stopped. Nothing was saved.
                </p>
              )}
              <button type="button" onClick={start} className={BTN_PRIMARY}>
                {support === "full"
                  ? phase === "stopped"
                    ? "Start the voice check again"
                    : "Start the voice check"
                  : "Read the questions to me"}
              </button>
              <p className="text-16 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
                {support === "full"
                  ? "Your browser will ask to use the microphone. You can also tap your answers."
                  : "This browser can read aloud but can't listen, so you'll tap your answers."}
              </p>
            </>
          )}
        </div>
      ) : null}

      {phase === "running" && step ? (
        <div className="mt-5">
          <p className="text-15 font-semibold tracking-wide text-[var(--color-ink-muted)] uppercase">
            {step.id === "birth"
              ? "First question"
              : step.id === "roth"
                ? "Last question"
                : "Next question"}
          </p>
          <p
            ref={questionRef}
            tabIndex={-1}
            className="text-22 mt-1 leading-snug font-semibold outline-none"
          >
            {step.question}
          </p>

          {/* Not a live region on purpose: the page is already speaking, and a
              screen reader talking over it would be picked up by the microphone. */}
          <p className="text-17 mt-3 flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`inline-block h-3 w-3 shrink-0 rounded-full ${
                activity === "listening"
                  ? "animate-pulse bg-[#b91c1c] motion-reduce:animate-none"
                  : activity === "speaking"
                    ? "bg-[var(--color-navy)]"
                    : "bg-gray-400"
              }`}
            />
            {status}
          </p>
          {heard ? (
            <p className="text-16 mt-1 text-[var(--color-ink-muted)]">
              You answered: <span className="font-semibold">{heard}</span>
            </p>
          ) : null}
          {notice ? <p className="text-17 mt-2 leading-relaxed">{notice}</p> : null}

          {canListen ? (
            // Stays in place while listening so keyboard focus never drops.
            <button
              type="button"
              onClick={activity === "listening" ? undefined : talkNow}
              aria-disabled={activity === "listening"}
              className={`${BTN_PRIMARY} mt-4 ${activity === "listening" ? "opacity-70" : ""}`}
            >
              {activity === "listening" ? "Listening..." : "Answer out loud"}
            </button>
          ) : null}

          {step.choices.length > 0 ? (
            <div className="mt-4 grid gap-2">
              {step.choices.map((c) => (
                <button
                  key={c.token}
                  type="button"
                  onClick={() => tap(c.token, c.label)}
                  className={BTN_CHOICE}
                >
                  {c.label}
                </button>
              ))}
            </div>
          ) : null}

          {MONTH_YEAR_STEPS[step.id] ? (
            <form
              className="mt-4 grid grid-cols-2 gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                tap(`${year}-${month}`, `${MONTHS[month - 1]} ${year}`);
              }}
            >
              <label className="text-16 font-semibold">
                Month
                <select
                  className={FIELD}
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-16 font-semibold">
                Year
                <select
                  className={FIELD}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {MONTH_YEAR_STEPS[step.id]?.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className={`${BTN_CHOICE} col-span-2 text-center`}>
                Use this date
              </button>
            </form>
          ) : null}

          {AMOUNT_STEPS.has(step.id) ? (
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const n = Math.round(Number(amount.replace(/[$,\s]/g, "")));
                if (Number.isFinite(n) && n >= 100) {
                  tap(String(n), `$${n.toLocaleString("en-US")}`);
                } else {
                  setAmountError("Please type a yearly amount in dollars, like 40,000.");
                }
              }}
            >
              <label className="text-16 font-semibold" htmlFor="voice-amount">
                Or type a rough amount
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  id="voice-amount"
                  inputMode="numeric"
                  placeholder="$40,000"
                  className={FIELD}
                  value={amount}
                  aria-invalid={amountError ? true : undefined}
                  aria-describedby={amountError ? "voice-amount-error" : undefined}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setAmountError("");
                  }}
                />
                <button
                  type="submit"
                  className="text-17 mt-1 rounded-lg bg-[var(--color-navy)] px-4 font-semibold text-white"
                >
                  Use
                </button>
              </div>
              {amountError ? (
                <p id="voice-amount-error" role="alert" className="text-16 mt-2 font-semibold">
                  {amountError}
                </p>
              ) : null}
            </form>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
            {!step.required ? (
              <button type="button" onClick={skip} className={BTN_QUIET}>
                Skip this one
              </button>
            ) : null}
            <button type="button" onClick={again} className={BTN_QUIET}>
              Repeat
            </button>
            {voice && voice.history.length > 0 ? (
              <button type="button" onClick={back} className={BTN_QUIET}>
                Go back
              </button>
            ) : null}
            <button type="button" onClick={stop} className={BTN_QUIET}>
              Stop
            </button>
          </div>
        </div>
      ) : null}

      {phase === "results" ? (
        <div className="mt-6">
          <CheckerResults findings={findings} id="voice-results" level={3} announce={false} />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={hearResults} className={BTN_PRIMARY}>
              Hear the results again
            </button>
            <button type="button" onClick={start} className={`${BTN_CHOICE} text-center sm:w-auto`}>
              Start over
            </button>
          </div>
        </div>
      ) : null}
    </VoiceIntro>
  );
}

/** Heading, description and disclosure. Rendered on the server too, so nothing shifts. */
function VoiceIntro({ children }: { children?: React.ReactNode }) {
  return (
    <section
      aria-labelledby="voice-check-title"
      className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-5 sm:p-6"
    >
      <h2 id="voice-check-title" className="text-24 font-semibold">
        Rather answer out loud?
      </h2>
      <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        Your phone or computer reads each question aloud and listens for your answer, then reads
        back anything worth a look. It takes about three minutes, and it&apos;s free.
      </p>
      <ul className="text-16 mt-4 list-disc space-y-1.5 pl-5 leading-relaxed">
        {VOICE_DISCLOSURE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {children ?? (
        <div className="mt-5">
          <button type="button" disabled className={`${BTN_PRIMARY} opacity-70`}>
            Start the voice check
          </button>
          {/* Same height as the live version, so the page doesn't jump when it loads. */}
          <p className="text-16 mt-3 leading-relaxed text-[var(--color-ink-muted)]">
            Your browser will ask to use the microphone. You can also tap your answers.
          </p>
        </div>
      )}
    </section>
  );
}
