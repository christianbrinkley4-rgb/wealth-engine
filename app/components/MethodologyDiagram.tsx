"use client";

const INPUTS = [
  {
    number: "INPUT 01",
    title: "Federal Tax Change Modeling",
    body: "We compare your current estimated tax profile to expected 2026 rules so you can see what may change for your household.",
  },
  {
    number: "INPUT 02",
    title: "North Carolina Tax Layer",
    body: "North Carolina tax assumptions are added so your estimate reflects local reality, not national averages alone.",
  },
  {
    number: "INPUT 03",
    title: "Medicare Surcharge Mapping",
    body: "Household income is checked against Medicare surcharge tiers to estimate potential Part B and Part D premium increases.",
  },
  {
    number: "INPUT 04",
    title: "Long-Term Projection Path",
    body: "The chart compares a baseline path and a guided path over time to make long-range planning tradeoffs easier to understand.",
  },
];

export default function MethodologyDiagram() {
  return (
    <section className="border border-t-0 border-(--rule) bg-(--ink-2) px-8 py-12 sm:px-12">
      <p className="eyebrow-gold">The Research Behind the Math</p>
      <h2 className="mt-5 font-serif text-[30px] leading-tight text-(--ink)">
        Four trusted inputs. One clear planning view.
      </h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-[1.8] text-(--slate)">
        Christian builds each estimate using IRS publications, CMS Medicare schedules, and North
        Carolina tax tables. This Student Researcher workflow keeps every Personalized Review rooted
        in Piedmont Triad Context and educational clarity.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {INPUTS.map((input) => (
          <article
            key={input.number}
            className="rounded-xl border border-(--rule) bg-(--ink-3) p-6 transition-colors duration-200 hover:border-(--gold-border)"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-(--gold) uppercase">
              {input.number}
            </p>
            <p className="mt-3 text-[14px] font-bold text-(--ink)">{input.title}</p>
            <p className="mt-2.5 text-[13px] leading-[1.65] text-(--slate)">{input.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
