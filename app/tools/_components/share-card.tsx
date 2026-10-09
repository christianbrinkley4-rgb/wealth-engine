"use client";

/**
 * "Share your result" button for the /tools calculators. Renders a branded
 * 1200x630 card on a canvas from the tool's own computed numbers, then
 * either opens the native share sheet (with the image attached) or downloads
 * the PNG. Everything runs in the visitor's browser.
 */

import { useRef, useState } from "react";

import {
  SHARE_BRAND,
  SHARE_CARD_SIZE,
  shareCardFileName,
  shareCardText,
  type ShareCardData,
} from "./share-card-data";

const HEADLINE_FONT = (px: number) => `700 ${px}px Georgia, "Times New Roman", serif`;
const SANS_FONT = (px: number, weight = 600) =>
  `${weight} ${px}px system-ui, -apple-system, "Segoe UI", sans-serif`;

/** Draw the branded card. Exported for tests and the button below. */
export function drawShareCard(ctx: CanvasRenderingContext2D, data: ShareCardData): void {
  const { width: W, height: H } = SHARE_CARD_SIZE;
  const pad = 72;

  // Background.
  ctx.fillStyle = SHARE_BRAND.navy;
  ctx.fillRect(0, 0, W, H);

  // Gold inset frame.
  ctx.strokeStyle = SHARE_BRAND.gold;
  ctx.lineWidth = 3;
  const frame = 28;
  ctx.beginPath();
  ctx.roundRect(frame, frame, W - frame * 2, H - frame * 2, 18);
  ctx.stroke();

  // Accent bar under the top frame edge.
  ctx.fillStyle = SHARE_BRAND.gold;
  ctx.fillRect(pad, frame + 34, 96, 6);

  // Eyebrow: tool name.
  ctx.fillStyle = SHARE_BRAND.gold;
  ctx.font = SANS_FONT(30);
  ctx.textBaseline = "alphabetic";
  ctx.fillText(data.toolName.toUpperCase(), pad, frame + 110);

  // Headline number, shrunk until it fits.
  let headlinePx = 150;
  ctx.font = HEADLINE_FONT(headlinePx);
  while (ctx.measureText(data.headlineNumber).width > W - pad * 2 && headlinePx > 48) {
    headlinePx -= 8;
    ctx.font = HEADLINE_FONT(headlinePx);
  }
  ctx.fillStyle = "#ffffff";
  ctx.fillText(data.headlineNumber, pad, frame + 110 + headlinePx + 40);

  // One-line label.
  ctx.fillStyle = SHARE_BRAND.paper;
  ctx.font = SANS_FONT(42, 500);
  const labelY = frame + 110 + headlinePx + 40 + 78;
  ctx.fillText(data.headlineLabel, pad, labelY);

  // Optional risk hook (Honestly Calculator), shrunk until it fits.
  if (data.riskLine) {
    let riskPx = 32;
    ctx.font = SANS_FONT(riskPx, 500);
    while (ctx.measureText(data.riskLine).width > W - pad * 2 && riskPx > 20) {
      riskPx -= 2;
      ctx.font = SANS_FONT(riskPx, 500);
    }
    ctx.fillStyle = "#cfc8b8";
    ctx.fillText(data.riskLine, pad, labelY + 62);
  }

  // Footer: name and domain.
  ctx.fillStyle = "#ffffff";
  ctx.font = SANS_FONT(32, 700);
  ctx.fillText(SHARE_BRAND.name, pad, H - frame - 44);
  ctx.fillStyle = SHARE_BRAND.gold;
  ctx.font = SANS_FONT(32, 500);
  const nameWidth = ctx.measureText(SHARE_BRAND.name).width;
  ctx.fillText(SHARE_BRAND.domain, pad + nameWidth + 28, H - frame - 44);
}

function renderCardBlob(data: ShareCardData): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = SHARE_CARD_SIZE.width;
  canvas.height = SHARE_CARD_SIZE.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is not available in this browser.");
  drawShareCard(ctx, data);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not render the card image."));
    }, "image/png");
  });
}

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Button that shares the tool's headline result as a branded image card.
 * data-* attributes expose the exact numbers for tests and debugging.
 */
export function ShareResultButton({
  headlineNumber,
  headlineLabel,
  toolName,
  toolPath,
  riskLine,
}: ShareCardData) {
  const [status, setStatus] = useState<"idle" | "working" | "shared" | "saved" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  const reset = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2500);
  };

  const share = async () => {
    if (status === "working") return;
    setStatus("working");
    const data: ShareCardData = { headlineNumber, headlineLabel, toolName, toolPath, riskLine };
    try {
      const blob = await renderCardBlob(data);
      const fileName = shareCardFileName(toolPath);
      const file = new File([blob], fileName, { type: "image/png" });
      if (
        typeof navigator !== "undefined" &&
        "canShare" in navigator &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file],
            title: `${toolName} result`,
            text: shareCardText(data),
          });
          setStatus("shared");
          reset();
          return;
        } catch (error) {
          // The visitor closed the share sheet. Nothing to do.
          if (error instanceof DOMException && error.name === "AbortError") {
            setStatus("idle");
            return;
          }
          // Share failed partway, fall through to the download.
        }
      }
      downloadBlob(blob, fileName);
      setStatus("saved");
      reset();
    } catch {
      setStatus("failed");
      reset();
    }
  };

  const label =
    status === "working"
      ? "Making your card..."
      : status === "shared"
        ? "Shared"
        : status === "saved"
          ? "Saved"
          : status === "failed"
            ? "Try again"
            : "Share your result";

  return (
    <button
      type="button"
      className="btn btn-outline t-copy-btn"
      onClick={share}
      disabled={status === "working"}
      aria-live="polite"
      data-headline-number={headlineNumber}
      data-headline-label={headlineLabel}
      data-tool-name={toolName}
      data-tool-path={toolPath}
      data-risk-line={riskLine}
    >
      {label}
    </button>
  );
}
