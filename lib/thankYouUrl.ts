/**
 * Builds the post-capture thank-you URL with attribution params.
 * Kept in lib so client components can import without pulling in the API route bundle.
 */
export function thankYouUrl(source: string, email: string) {
  const params = new URLSearchParams({ source, email });
  return `/thank-you?${params.toString()}`;
}
