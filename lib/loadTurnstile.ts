/**
 * Loads Cloudflare Turnstile only on a page that is actually showing a form.
 *
 * It used to load on every page from the root layout, so someone reading an
 * article paid for a bot-check script they would never use. Forms now ask for
 * it on first focus or when the form becomes visible.
 *
 * The tag is added straight to the document from an effect, never rendered by
 * React. Rendering a <Script> inside a form once put a second copy of the tag
 * into server markup, mismatched hydration, and took whole pages down. A tag
 * appended after hydration cannot do that, and the data attribute keeps it to
 * one copy however many forms are on the page.
 */
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export function loadTurnstile(): void {
  if (typeof document === "undefined") return;
  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return;
  if (document.querySelector(`script[src="${TURNSTILE_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = TURNSTILE_SRC;
  script.async = true;
  script.defer = true;
  script.dataset.turnstileLoader = "true";
  document.head.appendChild(script);
}
