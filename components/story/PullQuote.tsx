import type { ReactNode } from "react";

/** A short line already said on the page, set apart so it is easy to read. */
export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="pull-quote">
      <blockquote>{children}</blockquote>
      {cite ? <figcaption>{cite}</figcaption> : null}
    </figure>
  );
}
