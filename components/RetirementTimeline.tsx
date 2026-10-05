"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Milestone = {
  age: string;
  title: string;
  text: string;
  link?: { href: string; label: string };
};

/**
 * Ages are fixed by law or tied to a birth year. Sources: IRS (catch-up,
 * rule of 55, 59½, QCDs, RMD ages under SECURE 2.0), SSA (62, full
 * retirement age, delayed credits to 70), Medicare.gov and SSA (enrollment
 * window, two-year income lookback for IRMAA).
 */
const MILESTONES: Milestone[] = [
  {
    age: "50",
    title: "Catch-up contributions start",
    text: "You can put extra money into IRAs and workplace plans each year, on top of the normal limit.",
  },
  {
    age: "55",
    title: "The rule of 55",
    text: "Leave your job in or after the year you turn 55, and you can usually take money from that employer’s 401(k) without the 10% early penalty. It doesn’t apply to IRAs.",
  },
  {
    age: "59½",
    title: "The early withdrawal penalty ends",
    text: "The 10% penalty on IRA and 401(k) withdrawals generally goes away. Income tax still applies to traditional accounts.",
  },
  {
    age: "62",
    title: "Earliest Social Security",
    text: "You can start benefits, but they’re permanently smaller than if you wait.",
    link: { href: "/social-security-timing", label: "When to take Social Security" },
  },
  {
    age: "63",
    title: "Medicare starts watching your income",
    text: "Your Medicare premiums at 65 are based on your tax return from two years earlier. A big Roth conversion or sale at 63 can raise them.",
    link: { href: "/answers/medicare-irmaa-income-premiums", label: "How income affects Medicare" },
  },
  {
    age: "65",
    title: "Medicare",
    text: "Your seven-month window to sign up opens three months before the month you turn 65.",
    link: { href: "/turning-65", label: "Turning 65 guide" },
  },
  {
    age: "67",
    title: "Full retirement age",
    text: "For anyone born in 1960 or later. Benefits aren’t reduced for age, and the earnings limit no longer applies.",
  },
  {
    age: "70",
    title: "Social Security stops growing",
    text: "Waiting past full retirement age adds delayed credits until 70, then they stop. At 70½, you can also give to charity straight from an IRA.",
  },
  {
    age: "73+",
    title: "Required minimum distributions",
    text: "RMDs from traditional IRAs and 401(k)s start at 73 if you were born 1951 through 1959, or 75 if you were born in 1960 or later.",
    link: {
      href: "/taxes-and-retirement/required-minimum-distributions",
      label: "RMDs, explained",
    },
  },
];

/**
 * Signature visual: the retirement timeline as a story you scroll through.
 * The rail fills as you read, and the milestone nearest the middle of the
 * screen is the one in focus. Without JavaScript it is simply a list.
 */
export function RetirementTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-index]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const center = window.innerHeight * 0.5;
      const progress = Math.min(1, Math.max(0, (center - rect.top) / rect.height));
      list.style.setProperty("--progress", progress.toFixed(4));
      let closest = 0;
      let distance = Infinity;
      items.forEach((item, index) => {
        const box = item.getBoundingClientRect();
        const d = Math.abs(box.top + box.height / 2 - center);
        if (d < distance) {
          distance = d;
          closest = index;
        }
      });
      setActive(closest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="rt">
      <div className="rt-sticky" aria-hidden>
        <span className="rt-sticky-label">Age</span>
        <span className="rt-sticky-age" key={active}>
          {MILESTONES[active].age}
        </span>
        <span className="rt-sticky-title">{MILESTONES[active].title}</span>
      </div>
      <ol className="rt-list" ref={listRef}>
        {MILESTONES.map((milestone, index) => (
          <li
            key={milestone.age}
            data-index={index}
            className="rt-item"
            data-active={index === active ? "true" : undefined}
            data-past={index < active ? "true" : undefined}
          >
            <span className="rt-dot" aria-hidden />
            <span className="rt-age">{milestone.age}</span>
            <h3>{milestone.title}</h3>
            <p>{milestone.text}</p>
            {milestone.link ? (
              <Link href={milestone.link.href} className="link-draw">
                <span>{milestone.link.label}</span> <ArrowRight size={16} aria-hidden />
              </Link>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
