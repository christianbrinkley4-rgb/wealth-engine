import { ImageResponse } from "next/og";

import {
  isToolSlug,
  SHARE_CARD_SIZE,
  TOOL_CARD_DEFAULTS,
  TOOL_SLUGS,
} from "../_components/share-card-data";
import { ShareCardOg } from "../_components/share-card-og";

/**
 * Per-tool Open Graph image. File-based metadata outranks the metadata
 * object, so each tool page shares its own branded result card instead of
 * the site-wide image. Values are the tool's own defaults, computed from
 * the same math the tool uses.
 */

export const alt = "A calculator result card from christianbrinkleync.com";
export const size = { width: SHARE_CARD_SIZE.width, height: SHARE_CARD_SIZE.height };
export const contentType = "image/png";

export function generateStaticParams() {
  return TOOL_SLUGS.map((tool) => ({ tool }));
}

export default async function ToolOpengraphImage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const data = isToolSlug(tool) ? TOOL_CARD_DEFAULTS[tool] : TOOL_CARD_DEFAULTS.budget;
  return new ImageResponse(<ShareCardOg data={data} />, size);
}
