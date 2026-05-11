"use client";

import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { Landmark } from "lucide-react";
import { trackClientEvent } from "@/app/lib/client-telemetry";
import { Button } from "@/components/ui/button";

interface InstitutionalLinkProps {
  zip: string;
  funnel: "WEALTH" | "MEDICARE";
}

export default function InstitutionalLink({ zip, funnel }: InstitutionalLinkProps) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(false);

  const loadLinkToken = useCallback(async () => {
    setLoadingToken(true);
    setError(null);
    try {
      const response = await fetch("/api/plaid/create-link-token", { method: "POST" });
      const data = (await response.json()) as { link_token?: string; error?: string };
      if (!response.ok || !data.link_token) {
        throw new Error(data.error ?? "Unable to initialize institutional link.");
      }
      setLinkToken(data.link_token);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Plaid initialization failed.");
      trackClientEvent({
        type: "plaid_link_error",
        funnel,
        zip,
      });
    } finally {
      setLoadingToken(false);
    }
  }, [funnel, zip]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadLinkToken();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadLinkToken]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: () => {
      trackClientEvent({
        type: "plaid_link_success",
        funnel,
        zip,
      });
    },
    onExit: (_, metadata) => {
      if (metadata.status === "requires_questions") {
        setError("Institution link exited before completion. You can retry anytime.");
      }
    },
  });

  return (
    <section className="rounded-2xl border border-white/8 bg-white/2 p-6">
      <p className="display-eyebrow text-cyan-300/80">Phase 2 · Institutional Review</p>
      <h4 className="mt-2 text-xl font-light tracking-tight text-slate-50">
        Connect institutional accounts via Plaid.
      </h4>
      <p className="mt-3 text-sm leading-relaxed font-light text-slate-400">
        Optional. Once connected, the engine resolves cash-flow, withdrawal timing, and risk drift
        with bank-grade precision. Read-only. Revocable at any time.
      </p>
      <Button
        type="button"
        variant="default"
        size="lg"
        disabled={!ready || !linkToken || loadingToken}
        onClick={() => open()}
        className="mt-4"
      >
        <Landmark className="h-4 w-4" />
        {loadingToken ? "Preparing Secure Link…" : "Authorize Read-Only Access"}
      </Button>
      {error ? <p className="mt-3 text-xs font-light text-rose-300">{error}</p> : null}
    </section>
  );
}
