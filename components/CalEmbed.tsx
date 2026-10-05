"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { trackEvent } from "@/app/components/Analytics";

type CalApi = ((...args: unknown[]) => void) & {
  ns?: Record<string, (...args: unknown[]) => void>;
  loaded?: boolean;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";

/** A Cal.com booking page, as the path the embed needs ("user/event"), or null. */
export function calLinkFrom(bookingUrl: string): string | null {
  try {
    const url = new URL(bookingUrl);
    if (url.protocol !== "https:") return null;
    if (url.hostname !== "cal.com" && url.hostname !== "app.cal.com") return null;
    const path = url.pathname.replace(/^\/+|\/+$/g, "");
    return /^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/.test(path) ? path : null;
  } catch {
    return null;
  }
}

/**
 * Cal.com's documented loader, unchanged in behavior: it queues calls until
 * embed.js arrives, then replays them. Added from an effect, never rendered
 * into server markup.
 */
function installCalLoader() {
  if (window.Cal) return;
  const queue = (api: CalApi, args: unknown[]) => api.q!.push(args);
  const cal = function (...args: unknown[]) {
    const self = window.Cal!;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement("script");
      script.src = EMBED_SRC;
      script.async = true;
      document.head.appendChild(script);
      self.loaded = true;
    }
    if (args[0] === "init") {
      const api = function (...apiArgs: unknown[]) {
        queue(api as CalApi, apiArgs);
      } as CalApi;
      const namespace = args[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        self.ns![namespace] = self.ns![namespace] || api;
        queue(self.ns![namespace] as CalApi, args);
        queue(self, ["initNamespace", namespace]);
      } else {
        queue(self, args);
      }
      return;
    }
    queue(self, args);
  } as CalApi;
  cal.q = [];
  window.Cal = cal;
}

/**
 * The booking calendar, inside the page. Nobody gets sent to another site to
 * pick a time, and the visit can tell when a booking actually finished.
 *
 * Measures two things only: that the calendar was shown, and that Cal.com
 * reported a completed booking. Neither event carries the time, the name, or
 * anything typed into the calendar. The Cal.com webhook still records the
 * booking itself on the server.
 */
export function CalEmbed({ bookingUrl, title }: { bookingUrl: string; title: string }) {
  const calLink = calLinkFrom(bookingUrl);
  const rawId = useId();
  const namespace = `cb${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const containerId = `cal-inline-${namespace}`;
  const [booked, setBooked] = useState(false);
  const opened = useRef(false);
  const completed = useRef(false);

  useEffect(() => {
    if (!calLink) return;
    installCalLoader();
    const Cal = window.Cal!;
    Cal("init", namespace, { origin: "https://app.cal.com" });
    const api = (...args: unknown[]) => window.Cal!.ns![namespace](...args);
    api("inline", {
      elementOrSelector: `#${containerId}`,
      calLink,
      config: { layout: "month_view" },
    });
    api("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": "#10302a" } },
      layout: "month_view",
    });
    const onBooked = () => {
      if (completed.current) return;
      completed.current = true;
      trackEvent("booking_complete");
      setBooked(true);
    };
    // Older and newer embed versions name the event differently; count once.
    api("on", { action: "bookingSuccessful", callback: onBooked });
    api("on", { action: "bookingSuccessfulV2", callback: onBooked });
    if (!opened.current) {
      opened.current = true;
      trackEvent("booking_open");
    }
  }, [calLink, namespace, containerId]);

  if (!calLink) {
    return (
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn">
        View available times <ArrowUpRight size={18} aria-hidden />
      </a>
    );
  }

  return (
    <div className="cal">
      {booked ? (
        <p className="cal-booked" role="status">
          <CheckCircle2 size={20} aria-hidden /> You’re booked. Look for the confirmation email from
          Cal.com, and I’ll see you then.
        </p>
      ) : null}
      <div id={containerId} className="cal-frame" aria-label={title}>
        <div className="cal-loading" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      </div>
      <p className="cal-fallback">
        Calendar not showing up?{" "}
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
