"use client";

import { useEffect, useRef, useState } from "react";

import { ATLAS_EMBED_PATH, ATLAS_HEIGHT_MESSAGE, ATLAS_IFRAME_HEIGHT } from "@/lib/atlasEmbed";

/** The live widget, sized to its content the same way partner sites can. */
export function AtlasPreview() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(ATLAS_IFRAME_HEIGHT);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.source !== frame.current?.contentWindow) return;
      const data = event.data as { type?: string; height?: number } | null;
      if (!data || data.type !== ATLAS_HEIGHT_MESSAGE) return;
      const next = Number(data.height);
      if (Number.isFinite(next)) setHeight(Math.min(Math.max(next, 400), 1400));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={frame}
      src={ATLAS_EMBED_PATH}
      title="2027 Medicare Advantage changes by North Carolina county"
      width="100%"
      height={height}
      style={{ border: 0, maxWidth: 640 }}
    />
  );
}
