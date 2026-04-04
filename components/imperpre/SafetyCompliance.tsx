"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";

export function ImperpreSafetyCompliance() {
  const t = useTranslations("Safety");
  const sectionRef = useRef<HTMLDivElement>(null);
  const items = asTitledDescriptionList(t.raw("items"));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".safety-item",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} className="bg-industrial-950 border-t border-industrial-800">
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="section-kicker justify-center">{t("eyebrow")}</div>
        <h2 className="mb-5 text-4xl font-bold leading-[1.1] text-steel-light text-balance md:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-industrial-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Guarantee badge — prominent risk reversal */}
      <div className="mx-auto mb-14 max-w-3xl">
        <div className="flex items-start gap-5 rounded-sm border border-green-500/20 bg-green-500/5 p-6 md:p-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
            <ShieldCheck className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">Garantía</p>
            <p className="text-base leading-relaxed text-steel-light md:text-lg">
              {t("guarantee")}
            </p>
          </div>
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={toStableKey(item.title, i)}
            className="safety-item rounded-sm border border-industrial-800 bg-industrial-900 p-7 transition-colors hover:border-industrial-700"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-industrial-800 text-xs font-bold text-steel-metallic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-steel-light">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-industrial-400">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
