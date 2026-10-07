"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

import { Confetti } from "@/app/wealth/ui/Confetti";
import { ShareButton } from "@/app/wealth/ui/controls";
import { useMarkExplored } from "@/app/wealth/ui/hooks";
import {
  getPersonality,
  PERSONALITIES,
  PERSONALITY_QUESTIONS,
  type PersonalityId,
  scorePersonality,
} from "@/lib/wealth/quizzes";

const path = "/wealth/quiz/money-personality";
const MIX_COLORS: Record<PersonalityId, string> = {
  vault: "#c8f73c",
  vibe: "#ff6a45",
  ghost: "#b9c4ff",
  grinder: "#2b46f0",
};

export function PersonalityQuiz() {
  useMarkExplored("money-personality");
  const [answers, setAnswers] = useState<PersonalityId[]>([]);
  const [shared, setShared] = useState<PersonalityId | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const locked = useRef(false);
  const progressId = useId();

  // A shared link opens straight on its type.
  useEffect(() => {
    let active = true;
    const type = new URLSearchParams(window.location.search).get("type");
    const match = type ? getPersonality(type) : undefined;
    if (match) queueMicrotask(() => {
      if (!active) return;
      shouldFocus.current = true;
      setShared(match.id);
    });
    return () => { active = false; };
  }, []);

  const [picked, setPicked] = useState<number | null>(null);
  // Hold for a beat so the choice visibly lands before the next question slides in.
  const choose = (type: PersonalityId, position: number) => {
    if (locked.current) return;
    locked.current = true;
    setPicked(position);
    const advance = () => {
      timer.current = null;
      shouldFocus.current = true;
      setPicked(null);
      setAnswers((previous) => [...previous, type]);
    };
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) advance();
    else timer.current = setTimeout(advance, 300);
  };

  // Letter shortcuts apply only while focus is inside this quiz.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.repeat || event.nativeEvent.isComposing || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return;
    const key = event.key.toLowerCase();
    if (!/^[a-d1-4]$/.test(key)) return;
    const slot = "abcd".includes(key) ? "abcd".indexOf(key) : "1234".indexOf(key);
    const button = event.currentTarget.querySelectorAll<HTMLButtonElement>(".w-option")[slot];
    if (button && !button.disabled) {
      event.preventDefault();
      button.click();
    }
  };

  useEffect(() => {
    return () => { if (timer.current !== null) clearTimeout(timer.current); };
  }, []);

  const finished = answers.length >= PERSONALITY_QUESTIONS.length;
  const score = finished ? scorePersonality(answers) : null;
  const resultId = score?.winner ?? shared;
  const result = resultId ? getPersonality(resultId) : undefined;
  useEffect(() => {
    locked.current = false;
    if (shouldFocus.current) {
      heading.current?.focus();
      shouldFocus.current = false;
    }
  }, [answers.length, resultId]);

  const cancelPending = () => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    locked.current = false;
    setPicked(null);
    shouldFocus.current = true;
  };
  const restart = () => {
    cancelPending();
    setAnswers([]);
    setShared(null);
  };
  const back = () => {
    cancelPending();
    setAnswers((previous) => previous.slice(0, -1));
  };

  if (result) {
    return (
      <div className="w-quiz w-result">
        <div className="w-result-card" data-type={result.id} data-tilt>
          <Confetti />
          <p className="w-eyebrow">{score ? "Your money personality" : "A money personality"}</p>
          <h2 className="w-result-name" ref={heading} tabIndex={-1}>{result.name}</h2>
          <p className="w-result-tag">{result.tagline}</p>
          <p className="w-result-sum">{result.summary}</p>
          {score ? (
            <>
              <div className="w-mix" aria-hidden>
                {PERSONALITIES.map((type) => (
                  <i
                    key={type.id}
                    style={{
                      width: `${(score.counts[type.id] / PERSONALITY_QUESTIONS.length) * 100}%`,
                      background: MIX_COLORS[type.id],
                    }}
                  />
                ))}
              </div>
              <ul className="w-mix-key">
                {PERSONALITIES.filter((type) => score.counts[type.id] > 0).map((type) => (
                  <li key={type.id}>
                    {type.name.replace("The ", "")} {score.counts[type.id]}/{PERSONALITY_QUESTIONS.length}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <div className="w-two">
          <div className="w-card">
            <h3>Strengths</h3>
            <ul>
              {result.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="w-card">
            <h3>Blind spots</h3>
            <ul>
              {result.blindSpots.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="w-steps-title" style={{ marginTop: 28 }}>
          Your next steps
        </p>
        <ul className="w-next-list">
          {result.nextSteps.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span>Next</span>
                <strong>{link.label}</strong>
                <ArrowUpRight size={20} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-btn-row">
          <ShareButton
            title="Money personality quiz"
            text={`I got ${result.name}: "${result.tagline}" What's yours?`}
            path={`${path}/${result.id}`}
            label="Share my result"
            className="w-btn"
          />
          <button type="button" className="w-btn w-btn-ghost" onClick={restart}>
            <RotateCcw size={18} aria-hidden /> {score ? "Take it again" : "Take the quiz"}
          </button>
        </div>
        <p className="w-note">
          <strong>For fun and self-reflection.</strong> I wrote these four types myself. It isn&apos;t a
          scientific test and it isn&apos;t advice. Nobody is 100% one type.
        </p>
      </div>
    );
  }

  const index = answers.length;
  const question = PERSONALITY_QUESTIONS[index];

  return (
    <div className="w-quiz" onKeyDown={onKeyDown}>
      <div className="w-quiz-progress" aria-hidden>
        {PERSONALITY_QUESTIONS.map((item, position) => (
          <i key={item.question} data-on={position <= index ? "true" : undefined} />
        ))}
      </div>
      <div className="w-quiz-step" key={index}>
        <p className="w-eyebrow" id={progressId}>
          Question {index + 1} of {PERSONALITY_QUESTIONS.length}
        </p>
        <h2 className="w-quiz-q" ref={heading} tabIndex={-1} aria-describedby={progressId}>{question.question}</h2>
        <ul className="w-options">
          {question.options.map((option, position) => (
            <li key={option.label}>
              <button
                type="button"
                className="w-option"
                data-picked={picked === position ? "true" : undefined}
                disabled={picked !== null}
                onClick={() => choose(option.type, position)}
              >
                <b aria-hidden>{String.fromCharCode(65 + position)}</b>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        {index > 0 ? (
          <button type="button" className="w-quiz-back" onClick={back}>
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}
