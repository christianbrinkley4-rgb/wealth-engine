"use client";

/**
 * One-question-at-a-time quiz runner shared by the /tools quizzes.
 * Everything runs in the visitor's browser; answers never leave the device.
 * Keyboard accessible: options are native buttons, focus moves to each new
 * question heading, and the result is announced through an aria-live region.
 */

import { useEffect, useRef, useState } from "react";

import { ShareResultButton } from "@/app/tools/_components/share-card";

import styles from "./quiz-engine.module.css";
import { scoreQuiz, type QuizData } from "./types";

export function QuizRunner({ data }: { data: QuizData }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const done = step >= data.questions.length;
  const question = done ? null : data.questions[step];

  // Move focus to the new question heading each step so keyboard and
  // screen-reader users land in the right place.
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const choose = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = prev.slice();
      next[step] = optionIndex;
      return next;
    });
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const retake = () => {
    setAnswers([]);
    setStep(0);
  };

  if (done) {
    const result = scoreQuiz(data, answers);
    return <QuizResult data={data} resultId={result.id} onRetake={retake} />;
  }

  return (
    <div className={styles.quiz}>
      <p className={styles.intro}>{data.intro}</p>

      <div
        className={styles.progress}
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={data.questions.length}
        aria-label={`Question ${step + 1} of ${data.questions.length}`}
      >
        <span
          className={styles.progressFill}
          style={{ width: `${((step + 1) / data.questions.length) * 100}%` }}
        />
      </div>
      <p className={styles.counter}>
        Question {step + 1} of {data.questions.length}
      </p>

      <h2 ref={headingRef} tabIndex={-1} className={styles.question}>
        {question!.text}
      </h2>
      {question!.sub ? <p className={styles.sub}>{question!.sub}</p> : null}

      <div className={styles.options}>
        {question!.options.map((option, index) => (
          <button
            key={index}
            type="button"
            className={styles.option}
            onClick={() => choose(index)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.nav}>
        <button
          type="button"
          className={styles.back}
          onClick={back}
          disabled={step === 0}
        >
          ← Back
        </button>
        <p className={styles.privacy}>Your answers stay on this device.</p>
      </div>
    </div>
  );
}

function QuizResult({
  data,
  resultId,
  onRetake,
}: {
  data: QuizData;
  resultId: string;
  onRetake: () => void;
}) {
  const result = data.results.find((r) => r.id === resultId) ?? data.results[0];

  return (
    <div className={styles.quiz}>
      <div aria-live="polite">
        <p className={styles.eyebrow}>Your result</p>
        <h2 className={styles.headline}>{result.headline}</h2>
        <p className={styles.lede}>{result.lede}</p>
      </div>

      <ul className={styles.bullets}>
        {result.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>

      <h3 className={styles.takeHeading}>
        {result.takeToProHeading ?? "Questions to bring to a pro"}
      </h3>
      <ul className={styles.takeList}>
        {result.takeToPro.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className={styles.closing}>{result.closing}</p>

      <div className={styles.shareBox}>
        <ShareResultButton
          headlineNumber={result.shareLabel}
          headlineLabel={data.quizName}
          toolName={data.quizName}
          toolPath={`/tools/${data.slug}`}
        />
        <p className={styles.shareNote}>
          The card shows your result headline only, never your answers.
        </p>
      </div>

      <button type="button" className={styles.retake} onClick={onRetake}>
        Retake the quiz
      </button>
    </div>
  );
}
