"use client";

import { routeCopy } from "@/data/locale-copy";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = typeof window !== "undefined" && window.location.pathname.includes("/es") ? "es" : "en";
  const copy = routeCopy[locale];

  return (
    <main className="flex min-h-screen items-center justify-center bg-industrial-950 px-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-industrial-400">500</p>
        <h1 className="mt-4 text-5xl text-steel-light">{copy.errorTitle}</h1>
        <p className="mt-4 max-w-xl text-industrial-300">{copy.errorBody}</p>
        <p className="mt-3 text-xs text-industrial-500">{error.digest ?? error.message}</p>
        <Button variant="metallic" className="mt-8" onClick={() => reset()}>
          {locale === "es" ? "Intentar de nuevo" : "Try again"}
        </Button>
      </div>
    </main>
  );
}
