"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, AlertTriangle } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { trackWhatsappClick } from "@/lib/analytics";
import { getWhatsappUrl } from "@/lib/site";

export function ImperpreHero() {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(eyebrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(headlineRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.3")
        .fromTo(subheadlineRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(ctaRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(panelRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.7");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openWhatsapp = (location: string) => {
    trackWhatsappClick(location);
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={containerRef} className="relative flex min-h-[92vh] items-center overflow-hidden bg-industrial-950 pt-20">
      {/* Subtle geometric accent — no background image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/3 rounded-full border border-industrial-800/40 opacity-60" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/6 translate-x-1/3 rounded-full border border-industrial-800/30 opacity-40" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-industrial-700/30 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

          {/* Left — Main copy */}
          <div className="lg:col-span-7">
            <div ref={eyebrowRef} className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-sm border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-amber-400">{t("eyebrow")}</span>
              </div>
            </div>

            <h1
              ref={headlineRef}
              className="mb-6 text-4xl font-bold leading-[1.0] tracking-[-0.01em] text-steel-light text-balance sm:text-5xl md:text-6xl lg:text-[5rem]"
            >
              {t("headline")}
            </h1>

            <p
              ref={subheadlineRef}
              className="mb-10 max-w-[42rem] text-pretty text-[1.1rem] leading-[1.75] text-industrial-300 md:text-[1.2rem]"
            >
              {t("subheadline")}
            </p>

            <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="metallic"
                size="lg"
                className="group w-full sm:w-auto"
                onClick={() => openWhatsapp("hero-primary")}
              >
                {t("ctaProposal")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-industrial-600 hover:bg-industrial-800 sm:w-auto"
                onClick={() => openWhatsapp("hero-secondary")}
              >
                {t("ctaWhatsapp")}
              </Button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-industrial-500">{t("microcopy")}</p>
          </div>

          {/* Right — Value panel */}
          <div ref={panelRef} className="hidden lg:col-span-5 lg:block">
            <div className="rounded-sm border border-industrial-800 bg-industrial-900/70 p-8 backdrop-blur-sm">
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-industrial-500">{t("panelLabel")}</p>
              <h2 className="mb-6 text-2xl leading-[1.2] tracking-[-0.01em] text-steel-light">
                {t("panelTitle")}
              </h2>

              <ul className="mb-8 space-y-4">
                {[t("panelBullet1"), t("panelBullet2"), t("panelBullet3")].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-amber-500/15 text-[10px] font-bold text-amber-400">
                      {i + 1}
                    </span>
                    <span className="text-[0.95rem] leading-[1.65] text-industrial-300">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="grid gap-3 border-t border-industrial-800/70 pt-6 md:grid-cols-2">
                <div className="rounded-sm border border-industrial-800/60 bg-industrial-950/50 p-4">
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-industrial-500">
                    {t("formalLabel")}
                  </p>
                  <p className="text-sm leading-relaxed text-steel-light">{t("formalValue")}</p>
                </div>
                <div className="rounded-sm border border-industrial-800/60 bg-industrial-950/50 p-4">
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-industrial-500">
                    {t("quickLabel")}
                  </p>
                  <p className="text-sm leading-relaxed text-steel-light">{t("quickValue")}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
