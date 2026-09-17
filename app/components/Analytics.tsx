"use client";

/**
 * Tracking pixels, each one inert until its env var is set. Nothing here loads
 * a third-party script on a site with no campaign IDs configured, so local dev
 * and preview deploys stay clean.
 *
 * Set in Netlify to switch one on (docs/MEASUREMENT-SETUP.md walks through it):
 *   NEXT_PUBLIC_GA4_ID                     analytics property, G-XXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_ID              ads account, AW-XXXXXXXXX
 *   NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL      conversion label for a phone tap
 *   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL      conversion label for an inquiry
 *   NEXT_PUBLIC_META_PIXEL_ID
 *   NEXT_PUBLIC_NEXTDOOR_PIXEL_ID
 *   NEXT_PUBLIC_SIMPLE_ANALYTICS  ("true" — no id needed)
 *
 * Simple Analytics is cookieless and collects no personal data, so it needs no
 * consent banner and nothing about it contradicts the promise this site makes
 * about not passing people's information around. It measures traffic. It does
 * not optimise an ad — only the Meta pixel does that.
 *
 * The matching server-side Meta Lead event lives in lib/metaCapi.ts and shares
 * an event_id with the browser event so Meta counts one lead, not two.
 */

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  conversionTarget,
  eventParams,
  isMeasuredEvent,
  type MeasuredEvent,
} from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const NEXTDOOR_PIXEL_ID = process.env.NEXT_PUBLIC_NEXTDOOR_PIXEL_ID;
const SIMPLE_ANALYTICS = process.env.NEXT_PUBLIC_SIMPLE_ANALYTICS === "true";
const META_ADS_ALLOWED = process.env.NEXT_PUBLIC_META_ADS_ALLOWED === "true";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GOOGLE_TAG_ID = GA4_ID || GOOGLE_ADS_ID;

/**
 * A Google Ads conversion action per event. Christian's two are a call and a
 * completed inquiry; the date tool stays a GA4 event, because measuring
 * interest as a conversion would teach the ad platform to buy browsers
 * instead of households.
 */
const ADS_CONVERSIONS: Partial<Record<MeasuredEvent, string | undefined>> = {
  phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL,
  generate_lead: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL,
};

/** Report one Google Ads conversion, when that action has been configured. */
function trackAdsConversion(event: MeasuredEvent) {
  const target = conversionTarget(GOOGLE_ADS_ID, ADS_CONVERSIONS[event]);
  if (!target) return;
  window.gtag?.("event", "conversion", { send_to: target });
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    ndp?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire the Lead conversion. Called from the thank-you page. */
export function trackLead(eventId: string, topic?: string) {
  if (typeof window === "undefined") return;
  if (!META_ADS_ALLOWED && !GA4_ID && !GOOGLE_ADS_ID && !NEXTDOOR_PIXEL_ID) return;
  try {
    window.fbq?.("track", "Lead", { content_category: topic }, { eventID: eventId });
    // The event id deduplicates against the server-side copy; the topic says
    // which service was asked about, never what was answered.
    window.gtag?.("event", "generate_lead", { event_id: eventId, topic });
    trackAdsConversion("generate_lead");
    window.ndp?.("track", "SIGN_UP");
  } catch {
    // A blocked pixel must never break the confirmation page.
  }
}

/** Reloading thank-you is not a new inquiry. Count at most once per tab. */
export function trackLeadOnce(eventId: string, topic?: string) {
  if (typeof window === "undefined") return;
  const key = `we-lead-pixel:${eventId}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // Private browsing can block storage; still fire once in this visit.
  }
  trackLead(eventId, topic);
}

/**
 * A site interaction worth measuring (a call tap, a finished date lookup).
 * Carries the event name and the page only: never answers, dates, or contact
 * details, which have no business in an analytics or ad platform.
 */
export function trackEvent(name: string) {
  if (typeof window === "undefined") return;
  // An event this file has not declared is a mistake, not a measurement.
  if (!isMeasuredEvent(name)) return;
  try {
    window.gtag?.("event", name, eventParams(window.location.pathname));
    trackAdsConversion(name);
    (window as Window & { sa_event?: (event: string) => void }).sa_event?.(name);
  } catch {
    // A blocked script must never break the page.
  }
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, []);

  // Most people this site serves call rather than fill in a form, so every
  // tap on a phone link counts, wherever it sits on the page.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) trackEvent("phone_click");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Client-side route changes need an explicit pageview.
  useEffect(() => {
    if (!pathname) return;
    try {
      window.fbq?.("track", "PageView");
      if (GA4_ID) window.gtag?.("config", GA4_ID, eventParams(pathname));
    } catch {
      // ignore
    }
  }, [pathname]);

  return (
    <>
      {META_ADS_ALLOWED && META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}

      {GOOGLE_TAG_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
            strategy="afterInteractive"
          />
          {/* One tag, up to two destinations: the analytics property and the
              ads account. Ad personalisation stays off — this site measures
              whether the phone rang, it does not build audiences out of people
              researching their health coverage. */}
          <Script id="google-tag" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;gtag('js',new Date());
gtag('set','allow_ad_personalization_signals',false);
gtag('set','allow_google_signals',false);
${GA4_ID ? `gtag('config','${GA4_ID}');` : ""}
${GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : ""}`}
          </Script>
        </>
      ) : null}

      {SIMPLE_ANALYTICS ? (
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
          data-collect-dnt="false"
        />
      ) : null}

      {NEXTDOOR_PIXEL_ID ? (
        <Script id="nextdoor-pixel" strategy="afterInteractive">
          {`!function(e,t,n,s,u,a){e.twq||(s=e.ndp=function(){
s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},
s.version='1.0',s.queue=[],u=t.createElement(n),u.async=!0,
u.src='https://ads.nextdoor.com/public/pixel/ndp.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}
(window,document,'script');
ndp('init','${NEXTDOOR_PIXEL_ID}');ndp('track','PAGE_VIEW');`}
        </Script>
      ) : null}
    </>
  );
}
