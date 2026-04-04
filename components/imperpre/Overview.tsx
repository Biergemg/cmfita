"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getWhatsappUrl } from "@/lib/site";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreOverview() {
  const t = useTranslations("Overview");
  const sectionRef = useRef<HTMLDivElement>(null);
  const rawStats = t.raw("stats") as Record<string, { value: string; label: string }>;
  const stats = Object.values(rawStats ?? {});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".overview-elem",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="problema" ref={sectionRef} className="bg-industrial-900 border-t border-industrial-800" containerClassName="max-w-6xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 text-center">

        {/* Header */}
        <div className="w-full">
          <div className="section-kicker justify-center">{t("eyebrow")}</div>
          <h2 className="overview-elem section-title mb-6 md:text-5xl lg:text-6xl max-w-4xl mx-auto text-balance">
            {t("title")}
          </h2>
          <div className="overview-elem mx-auto mb-10 h-1 w-24 bg-amber-500/60" />
          <p className="overview-elem reading-measure mx-auto mb-6 max-w-3xl text-[1.08rem] leading-[1.78] text-industrial-300 md:text-[1.16rem]">
            {t("description1")}
          </p>
          <p className="overview-elem reading-measure mx-auto max-w-3xl text-[1.08rem] leading-[1.78] text-industrial-400 md:text-[1.16rem]">
            {t("description2")}
          </p>
        </div>

        {/* Symptom grid — visual agitation */}
        {stats.length > 0 && (
          <div className="w-full">
            <p className="overview-elem mb-6 text-xs uppercase tracking-[0.22em] text-industrial-500">
              Señales de que el problema ya está activo
            </p>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-3">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="overview-elem group flex items-start gap-4 rounded-sm border border-industrial-800/60 bg-industrial-950/50 p-5 text-left transition-colors hover:border-amber-500/30 hover:bg-industrial-950"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-amber-500/20 bg-amber-500/10">
                    <span className="text-xs font-bold text-amber-400">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p className="mb-1 text-base font-medium text-steel-light">{stat.value}</p>
                    <p className="text-sm leading-relaxed text-industrial-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solve hook — bridge to CTA */}
        <div className="overview-elem w-full rounded-sm border border-industrial-800 bg-industrial-950 p-8 text-left md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-industrial-500">La solución</p>
              <p className="text-xl leading-[1.5] text-steel-light md:text-2xl">
                Antes de gastar en reparaciones que no van a durar, revisa la condición real de tu losa.
              </p>
            </div>
            <Button
              variant="outline"
              className="shrink-0 border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60"
              onClick={() => { trackWhatsappClick("problem-section"); window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer"); }}
            >
              {t("cta")}
            </Button>
          </div>
        </div>

      </div>
    </Section>
  );
}
