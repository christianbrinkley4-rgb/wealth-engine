import { pickCounty, renderAtlasEmbed } from "@/lib/atlasEmbed";

/**
 * The iframe partners embed. Standalone HTML (no site layout), framable from
 * any origin, kept out of search results so it doesn't compete with
 * /medicare-2027-by-county.
 */
export function GET(request: Request): Response {
  const county = pickCounty(new URL(request.url).searchParams.get("county"));
  return new Response(renderAtlasEmbed(county), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "frame-ancestors *",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
