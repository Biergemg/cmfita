"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { getWhatsappUrl } from "@/lib/site";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreProjectExperience() {
  const t = useTranslations("Projects");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-row",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const projects = asTitledDescriptionList(t.raw("items"));

  return (
    <Section ref={sectionRef} id="oferta" className="bg-industrial-900 border-t border-industrial-800">

      {/* Header */}
      <div className="mb-12 text-center">
        <div className="section-kicker justify-center">{t("eyebrow")}</div>
        <h2 className="mb-4 text-3xl font-bold text-steel-light text-balance md:text-5xl">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-industrial-400">{t("subtitle")}</p>
      </div>

      {/* Visual — abstract water/protection concept, no photos */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="relative overflow-hidden rounded-sm border border-industrial-800 bg-industrial-950 p-8">
          {/* Animated water-like gradient lines */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/60 to-transparent"
                style={{ top: `${15 + i * 14}%`, opacity: 1 - i * 0.12 }}
              />
            ))}
          </div>
          {/* Central message */}
          <div className="relative text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-industrial-500">El resultado</p>
            <p className="text-2xl font-bold leading-snug text-steel-light md:text-3xl">
              Tu azotea deja de filtrar.
            </p>
            <p className="mt-3 text-sm text-industrial-400">
              Visita técnica gratuita · Sin compromiso · Si vuelve a filtrar, regresamos
            </p>
          </div>
        </div>
      </div>

      {/* Offer items */}
      <div className="mx-auto max-w-3xl space-y-3">
        {projects.map((project, i) => (
          <div
            key={toStableKey(project.title, i)}
            className="project-row flex items-start gap-4 rounded-sm border border-industrial-800 bg-industrial-950 p-6 transition-colors hover:border-industrial-700"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
            <div>
              <h3 className="mb-1.5 font-semibold text-steel-light">{project.title}</h3>
              <p className="text-sm leading-relaxed text-industrial-400">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <button
          onClick={() => { trackWhatsappClick("offer-section"); window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer"); }}
          className="inline-flex items-center gap-2.5 rounded-sm border border-industrial-600 bg-industrial-800 px-6 py-3.5 text-base font-semibold tracking-wide text-steel-light transition-all hover:bg-industrial-700 active:scale-95"
        >
          <WhatsappIcon className="h-5 w-5 shrink-0" />
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </Section>
  );
}
