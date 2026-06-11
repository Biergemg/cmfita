"use client";

import Image from "next/image";
import { useEffect } from "react";

import { caseStudies } from "@/data/site-content";
import { trackPortfolioCaseView, trackProposalRequest } from "@/lib/analytics";
import type { Locale } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { routeCopy } from "@/data/locale-copy";

export function Portfolio({ locale }: { locale: Locale }) {
  const copy = routeCopy[locale].portfolio;
  const items = caseStudies[locale];

  useEffect(() => {
    items.forEach((item) => trackPortfolioCaseView(item.slug));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section className="bg-industrial-950 border-t border-industrial-800">
      <div className="mb-12 text-center">
        <div className="section-kicker justify-center">Casos de referencia</div>
        <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{copy.title}</h2>
        <p className="mx-auto max-w-3xl text-lg text-industrial-400">{copy.subtitle}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.slug} className="premium-card group overflow-hidden rounded-sm">
            {/* Image with overlay */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={item.gallery[0]!.src}
                alt={item.gallery[0]!.alt}
                fill
                className="object-cover brightness-[0.82] transition-[transform,filter] duration-700 group-hover:brightness-[0.95] group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom gradient — bleeds into card body */}
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/20 to-transparent" />
              {/* Sector badge */}
              <div className="absolute right-4 top-4 rounded-sm border border-white/10 bg-industrial-950/80 px-3 py-1.5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-[0.24em] text-industrial-300">{item.sector}</p>
              </div>
              {/* Copper accent bar */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-signal-copper to-signal-amber transition-all duration-500 group-hover:w-full" />
            </div>
            <div className="space-y-5 p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-industrial-500">
                <span>{item.location}</span>
              </div>
              <div>
                <h3 className="text-3xl text-steel-light">{item.title}</h3>
                <p className="mt-3 text-industrial-300">{item.summary}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="border border-industrial-800 bg-industrial-950/70 p-4">
                    <p className="text-2xl font-semibold text-signal-amber">{metric.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-industrial-400">{metric.label}</p>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 text-sm text-industrial-300">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2">
                    <span className="mt-[3px] h-[6px] w-[6px] shrink-0 rounded-full bg-signal-copper/60" />
                    {deliverable}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => {
                  trackProposalRequest("portfolio");
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.ctaLabel}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
