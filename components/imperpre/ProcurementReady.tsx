"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getWhatsappUrl } from "@/lib/site";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreProcurementReady() {
  const t = useTranslations("Procurement");

  const stackItems = [
    { title: t("stack1title"), desc: t("stack1desc") },
    { title: t("stack2title"), desc: t("stack2desc") },
    { title: t("stack3title"), desc: t("stack3desc") },
    { title: t("stack4title"), desc: t("stack4desc") },
  ];

  return (
    <Section className="bg-industrial-900 border-t border-industrial-800">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="section-kicker justify-center">{t("eyebrow")}</div>
          <h2 className="mb-4 text-3xl font-bold leading-[1.1] text-steel-light text-balance md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-industrial-400">
            {t("description")}
          </p>
        </div>

        {/* Value stack */}
        <div className="mb-10 rounded-sm border border-industrial-800 bg-industrial-950 overflow-hidden">
          <div className="border-b border-industrial-800 bg-industrial-900 px-7 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-industrial-400">
              {t("stackTitle")}
            </p>
          </div>
          <div className="divide-y divide-industrial-800/60">
            {stackItems.map((item, i) => (
              <div key={i} className="flex items-start gap-5 px-7 py-6 transition-colors hover:bg-industrial-900/40">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                <div>
                  <p className="mb-1 font-semibold text-steel-light">{item.title}</p>
                  <p className="text-sm leading-relaxed text-industrial-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk reversal */}
        <div className="mb-10 rounded-sm border border-amber-500/20 bg-amber-500/5 px-7 py-5">
          <p className="text-sm leading-relaxed text-amber-300/90">
            <span className="font-semibold">Sin compromiso:</span> {t("reversal")}
          </p>
        </div>

        {/* Bullets + CTA */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            {[t("bullet1"), t("bullet2"), t("bullet3")].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-industrial-300">
                <div className="h-1 w-1 rounded-full bg-steel-metallic" />
                {b}
              </div>
            ))}
          </div>
          <Button
            variant="metallic"
            size="lg"
            className="group shrink-0"
            onClick={() => { trackWhatsappClick("procurement-section"); window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer"); }}
          >
            Revisar mi techo sin costo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>
    </Section>
  );
}
