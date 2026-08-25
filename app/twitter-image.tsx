/**
 * Same image as the Open Graph card. X reads og:image as a fallback, but
 * messaging apps and preview scrapers that only look for twitter:image do not.
 */
export { default, alt, size, contentType } from "./opengraph-image";
