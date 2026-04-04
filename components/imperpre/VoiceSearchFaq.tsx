"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getWhatsappUrl } from "@/lib/site";
import { trackWhatsappClick } from "@/lib/analytics";

type FaqItem = { title: string; description: string; tag?: string };

export function ImperpreVoiceSearchFaq() {
  const t = useTranslations("Faq");
  const raw = t.raw("items") as FaqItem[];
  const items: FaqItem[] = Array.isArray(raw) ? raw : [];

  return (
    <Section
      id="faq"
      className="bg-industrial-950 border-t border-industrial-800"
      containerClassName="max-w-4xl"
    >
      {/* Header */}
      <div className="mb-14 text-center">
        <p className="section-kicker justify-center">{t("eyebrow")}</p>
        <h2 className="section-title mb-4">{t("title")}</h2>
        <p className="section-subtitle reading-measure mx-auto max-w-2xl">{t("subtitle")}</p>
      </div>

      {/* FAQ items */}
      <div className="space-y-3">
        {items.map((item, i) => (
          <article
            key={i}
            className="rounded-sm border border-industrial-800 bg-industrial-900 transition-colors hover:border-industrial-700"
          >
            {/* Question row */}
            <div className="flex items-start gap-4 px-6 py-5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-industrial-800 text-[11px] font-bold text-steel-metallic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  {item.tag && (
                    <span className="rounded-sm border border-industrial-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-industrial-500">
                      {item.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold leading-snug text-steel-light md:text-lg">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Answer */}
            <div className="border-t border-industrial-800/60 px-6 pb-6 pt-4">
              <p className="pl-10 text-sm leading-[1.8] text-industrial-300 md:text-base">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-industrial-500">¿Tienes otra pregunta? Te respondemos directo.</p>
        <Button
          variant="outline"
          className="group border-industrial-700 hover:bg-industrial-800"
          onClick={() => { trackWhatsappClick("faq-section"); window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer"); }}
        >
          {t("cta")}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Section>
  );
}
