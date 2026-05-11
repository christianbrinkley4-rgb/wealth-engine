"use client";

interface ConceptItem {
  number: string;
  title: string;
  body: React.ReactNode;
  bullets: React.ReactNode[];
}

const CONCEPTS: ConceptItem[] = [
  {
    number: "01 · THE 2026 TAX CHANGES",
    title: "Why 2026 Matters for Families",
    body: (
      <>
        Several current federal tax rules are scheduled to change after 2025. That can affect your
        tax bill, Social Security timing, and Medicare-related planning choices all at once.
      </>
    ),
    bullets: [
      <>
        Top tax rates could move from <strong>37% to 39.6%</strong>
      </>,
      <>The standard deduction may become smaller</>,
      <>Deduction rules can change household by household</>,
      <>
        The years before retirement may be the best time to plan ahead
      </>,
    ],
  },
  {
    number: "02 · RETIREMENT TIMING RISK",
    title: "Returns Matter, But Timing Matters Too",
    body: (
      <>
        Two people can earn similar long-term returns and still end up in very different places.
        Big drops early in retirement can have lasting effects if withdrawals happen at the same
        time.
      </>
    ),
    bullets: [
      <>
        A major loss in Year 1 hurts more than a major loss later
      </>,
      <>
        A steady withdrawal plan can reduce pressure during down markets
      </>,
      <>Cash reserves can help avoid selling at the wrong moment</>,
      <>Simple planning now can protect choices later</>,
    ],
  },
  {
    number: "03 · IRMAA BRACKETS",
    title: "Medicare Costs Can Rise with Income",
    body: (
      <>
        Medicare has income-based surcharges. If household income crosses certain levels, monthly
        Part B and Part D costs can increase.
      </>
    ),
    bullets: [
      <>
        For many couples, the first key threshold starts near <strong>$206,000 MAGI</strong>
      </>,
      <>
        Surcharges can add meaningful cost over time
      </>,
      <>Income spikes from withdrawals can move you into a higher tier</>,
      <>
        Income timing is often the strongest planning lever
      </>,
    ],
  },
];

export default function ThreeConcepts() {
  return (
    <section className="grid grid-cols-1 border border-t-0 border-(--rule) bg-(--ink-2) md:grid-cols-3">
      {CONCEPTS.map((concept) => (
        <article
          key={concept.number}
          className="border-b border-(--rule) px-8 py-9 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-(--gold)">
            {concept.number}
          </p>
          <h3 className="mt-4 font-serif text-[22px] leading-tight text-(--ink)">
            {concept.title}
          </h3>
          <p className="mt-4 text-[14px] leading-[1.75] text-(--slate)">{concept.body}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {concept.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-[13px] leading-normal text-(--slate)"
              >
                <span className="font-mono text-(--gold)">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
