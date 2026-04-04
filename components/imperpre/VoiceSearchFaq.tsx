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
      containerClassName="max-w-3xl"
    >
      <div className="mb-12 text-center">
        <p className="section-kicker justify-center">{t("eyebrow")}</p>
        <h2 className="mb-3 text-3xl font-bold text-steel-light md:text-4xl">{t("title")}</h2>
        <p className="text-industrial-400">{t("subtitle")}</p>
      </div>

      <div className="space-y-3 mb-12">
        {items.map((item, i) => (
          <article key={i} className="rounded-sm border border-industrial-800 bg-industrial-900">
            {/* Question */}
            <div className="px-6 py-5">
              {item.tag && (
                <span className="mb-2 inline-block rounded-sm border border-industrial-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-industrial-500">
                  {item.tag}
                </span>
              )}
              <h3 className="text-base font-semibold text-steel-light md:text-lg">{item.title}</h3>
            </div>
            {/* Answer */}
            <div className="border-t border-industrial-800/60 px-6 pb-6 pt-4">
              <p className="text-sm leading-[1.8] text-industrial-300 md:text-base">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Single CTA */}
      <div className="text-center">
        <Button
          variant="metallic"
          size="lg"
          className="group"
          onClick={() => { trackWhatsappClick("faq-cta"); window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer"); }}
        >
          {t("cta")}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Section>
  );
}
