"use client";

import { routeCopy } from "@/data/locale-copy";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const locale = typeof window !== "undefined" && window.location.pathname.includes("/es") ? "es" : "en";
  const copy = routeCopy[locale];

  return (
    <main className="flex min-h-screen items-center justify-center bg-industrial-950 px-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-industrial-400">404</p>
        <h1 className="mt-4 text-5xl text-steel-light">{copy.notFoundTitle}</h1>
        <p className="mt-4 max-w-xl text-industrial-300">{copy.notFoundBody}</p>
        <Link href="/" className="mt-8 inline-flex text-sm uppercase tracking-[0.18em] text-steel-light underline underline-offset-4">
          {copy.legal.backHome}
        </Link>
      </div>
    </main>
  );
}
