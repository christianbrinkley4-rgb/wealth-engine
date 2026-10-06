"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

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

  // A shared link opens straight on its type.
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    const match = type ? getPersonality(type) : undefined;
    if (match) queueMicrotask(() => setShared(match.id));
  }, []);

  const finished = answers.length === PERSONALITY_QUESTIONS.length;
  const score = finished ? scorePersonality(answers) : null;
  const resultId = score?.winner ?? shared;
  const result = resultId ? getPersonality(resultId) : undefined;
  const restart = () => {
    setAnswers([]);
    setShared(null);
  };

  if (result) {
    return (
      <div className="w-quiz w-result">
        <div className="w-result-card" data-type={result.id}>
          <Confetti />
          <p className="w-eyebrow">{score ? "Your money personality" : "A money personality"}</p>
          <h2 className="w-result-name">{result.name}</h2>
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
            path={`${path}?type=${result.id}`}
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
    <div className="w-quiz">
      <div className="w-quiz-progress" aria-hidden>
        {PERSONALITY_QUESTIONS.map((item, position) => (
          <i key={item.question} data-on={position <= index ? "true" : undefined} />
        ))}
      </div>
      <div className="w-quiz-step" key={index}>
        <p className="w-eyebrow">
          Question {index + 1} of {PERSONALITY_QUESTIONS.length}
        </p>
        <h2 className="w-quiz-q">{question.question}</h2>
        <ul className="w-options">
          {question.options.map((option, position) => (
            <li key={option.label}>
              <button
                type="button"
                className="w-option"
                onClick={() => setAnswers((previous) => [...previous, option.type])}
              >
                <b aria-hidden>{String.fromCharCode(65 + position)}</b>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        {index > 0 ? (
          <button type="button" className="w-quiz-back" onClick={() => setAnswers((previous) => previous.slice(0, -1))}>
            Back
          </button>
        ) : null}
      </div>
    </div>
  );
}
