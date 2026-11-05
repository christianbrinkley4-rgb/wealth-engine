"use client";

import type { Conversation } from "@elevenlabs/client";
import { useEffect, useRef, useState } from "react";

import { AGENT } from "@/lib/agent";
import { VOICE_AGENT_ID, VOICE_DISCLOSURE } from "@/lib/voiceChecker";

/**
 * Talk-through version of the checker. Nothing from ElevenLabs loads until the
 * visitor reads the disclosure and taps Start; then the SDK is imported, the
 * browser asks for the microphone, and a WebRTC session opens. Captions are
 * kept in memory only, so a visitor who can't hear well can read along.
 */

type Phase = "idle" | "connecting" | "live" | "ended" | "error";
type Problem = "mic" | "unavailable";
type Line = { id: number; who: "agent" | "user"; text: string };

const MAX_LINES = 6;
const BUTTON = "text-19 w-full rounded-lg px-5 py-4 font-semibold sm:w-auto";

export function VoiceCheck() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const conversation = useRef<Conversation | null>(null);
  const starting = useRef(false);
  const mounted = useRef(true);
  const lineId = useRef(0);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      void conversation.current?.endSession();
      conversation.current = null;
    };
  }, []);

  function fail(kind: Problem) {
    if (!mounted.current) return;
    setProblem(kind);
    setPhase("error");
  }

  async function start() {
    if (starting.current || conversation.current) return;
    starting.current = true;
    setProblem(null);
    setLines([]);
    setSpeaking(false);
    setPhase("connecting");

    try {
      // Ask for the microphone first so a "blocked" answer gets its own message.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
    } catch {
      starting.current = false;
      fail("mic");
      return;
    }

    try {
      const { Conversation: Client, stripAudioTags } = await import("@elevenlabs/client");
      const session = await Client.startSession({
        agentId: VOICE_AGENT_ID,
        connectionType: "webrtc",
        onConnect: () => mounted.current && setPhase("live"),
        onDisconnect: (details) => {
          conversation.current = null;
          if (!mounted.current) return;
          setSpeaking(false);
          if (details.reason === "error") fail("unavailable");
          else setPhase("ended");
        },
        onError: () => fail("unavailable"),
        onModeChange: ({ mode }) => mounted.current && setSpeaking(mode === "speaking"),
        onMessage: ({ message, role }) => {
          const text = stripAudioTags(message).trim();
          if (!text || !mounted.current) return;
          lineId.current += 1;
          const line: Line = { id: lineId.current, who: role, text };
          setLines((prev) => [...prev, line].slice(-MAX_LINES));
        },
      });
      if (!mounted.current) {
        await session.endSession();
        return;
      }
      conversation.current = session;
    } catch {
      fail("unavailable");
    } finally {
      starting.current = false;
    }
  }

  async function stop() {
    const session = conversation.current;
    conversation.current = null;
    await session?.endSession();
    if (mounted.current) setPhase("ended");
  }

  const active = phase === "connecting" || phase === "live";
  const status =
    phase === "connecting"
      ? "Connecting. Your browser may ask to use the microphone."
      : phase === "live"
        ? speaking
          ? "The assistant is talking."
          : "Listening. Go ahead and answer out loud."
        : phase === "ended"
          ? "The conversation has ended. Nothing from it was saved on this site."
          : "";

  return (
    <section
      aria-labelledby="voice-check-title"
      className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-5 sm:p-6"
    >
      <h2 id="voice-check-title" className="text-24 font-semibold">
        Rather talk it through?
      </h2>
      <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        A voice assistant asks the same questions out loud and reads your results back. It takes
        about three minutes and uses your microphone. The questions below do exactly the same check
        if you&apos;d rather tap.
      </p>

      <ul className="text-16 mt-4 list-disc space-y-1.5 pl-5 leading-relaxed">
        {VOICE_DISCLOSURE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        {active ? (
          <button
            type="button"
            onClick={() => void stop()}
            className={`${BUTTON} border-2 border-[var(--color-navy)] bg-white text-[var(--color-navy)]`}
          >
            End conversation
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void start()}
            className={`${BUTTON} bg-[var(--color-navy)] text-white`}
          >
            {phase === "idle" ? "Start talking" : "Start again"}
          </button>
        )}
      </div>

      <p role="status" className="text-17 mt-4 font-semibold empty:hidden">
        {status}
      </p>

      {phase === "error" && problem === "mic" ? (
        <p role="alert" className="text-17 mt-4 leading-relaxed">
          Your browser didn&apos;t allow the microphone. You can allow it in your browser&apos;s
          settings and tap Start again, or use the questions below.
        </p>
      ) : null}
      {phase === "error" && problem === "unavailable" ? (
        <p role="alert" className="text-17 mt-4 leading-relaxed">
          The voice assistant isn&apos;t available right now. The questions below run the same
          check, or you can call or text Christian at{" "}
          <a href={AGENT.phoneHref} className="font-semibold underline">
            {AGENT.phone}
          </a>
          .
        </p>
      ) : null}

      {lines.length > 0 ? (
        <div className="mt-4 rounded-lg border border-gray-300 bg-white p-4">
          <p className="text-15 font-semibold tracking-wide text-[var(--color-ink-muted)] uppercase">
            Captions
          </p>
          <ol className="text-17 mt-2 space-y-2 leading-relaxed">
            {lines.map((line) => (
              <li key={line.id}>
                <span className="font-semibold">
                  {line.who === "agent" ? "Assistant: " : "You: "}
                </span>
                {line.text}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
