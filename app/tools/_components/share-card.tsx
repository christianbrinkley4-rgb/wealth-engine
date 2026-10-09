"use client";

import { useState } from "react";
import { shareCardSvg, type ShareCardData } from "@/lib/wealth/share-card";

/** Shared tool card. Image creation stays in the browser until the visitor downloads it. */
export function ShareCard({ data }: { data: ShareCardData }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function download() {
    setBusy(true);
    setMessage("");
    let svgUrl: string | undefined;
    let pngUrl: string | undefined;
    try {
      svgUrl = URL.createObjectURL(new Blob([shareCardSvg(data)], { type: "image/svg+xml" }));
      const image = new Image();
      image.src = svgUrl;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      context.drawImage(image, 0, 0);
      const png = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Image unavailable"))),
          "image/png",
        );
      });
      pngUrl = URL.createObjectURL(png);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "paycheckos-breakdown.png";
      document.body.append(link);
      link.click();
      link.remove();
      setMessage("Your card is ready. Share it wherever you like.");
    } catch {
      setMessage("The image could not download. Copy your numbers below, or try another browser.");
    } finally {
      // Allow the download to consume the blob before releasing it.
      const urls = [svgUrl, pngUrl];
      window.setTimeout(
        () =>
          urls.forEach((url) => {
            if (url) URL.revokeObjectURL(url);
          }),
        1000,
      );
      setBusy(false);
    }
  }

  return (
    <section className="p-share" aria-label="Your share card">
      <div className="p-share-card">
        <p className="p-brand">Christian Brinkley</p>
        <h3>{data.title}</h3>
        <dl className="p-share-metrics">
          {data.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>
                <a href={metric.href}>{metric.value}</a>
              </dd>
            </div>
          ))}
        </dl>
        <p className="p-share-summary">{data.summary}</p>
        <p className="p-share-note">Your entries. Federal estimates use IRS and SSA rules.</p>
        <p className="p-share-note">Education only. Christian is not a CPA.</p>
        <a className="p-share-url" href={data.url}>
          christianbrinkleync.com/tools/paycheck-breakdown
        </a>
      </div>
      <button className="btn btn-primary" type="button" disabled={busy} onClick={download}>
        {busy ? "Making your card..." : "Download share card"}
      </button>
      <p className="t-hint">
        The card includes your pay amounts. Download it only if you want to share them.
      </p>
      <p className="t-hint" role="status">
        {message}
      </p>
    </section>
  );
}
