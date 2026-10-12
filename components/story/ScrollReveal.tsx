import type { ElementType, ReactNode } from "react";

/**
 * Fade and rise when the block scrolls into view.
 *
 * Uses the site-wide reveal observer in components/motion/RevealObserver.
 * One observer for every page, and content stays visible if JavaScript
 * never runs. A second animation library would only add weight.
 */
export function ScrollReveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag data-reveal className={className}>
      {children}
    </Tag>
  );
}
