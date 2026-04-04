"use client";

import { useTranslations } from "next-intl";

import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";
import { Section } from "@/components/ui/section";

export function VoiceSearchFaq() {
  const t = useTranslations("Faq");
  const items = asTitledDescriptionList(t.raw("items"));

  return (
    <Section
      id="faq"
      className="bg-industrial-950 border-t border-industrial-800"
      containerClassName="max-w-5xl"
    >
      <div className="mb-14 text-center">
        <p className="section-kicker justify-center">
          {t("eyebrow")}
        </p>
        <h2 className="section-title mb-4">
          {t("title")}
        </h2>
        <p className="section-subtitle reading-measure mx-auto max-w-3xl">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <article
            key={toStableKey(item.title, index)}
            className="premium-card rounded-sm p-6 md:p-8"
          >
            <h3 className="mb-3 text-2xl tracking-[0.02em] text-steel-light">
              {item.title}
            </h3>
            <p className="reading-measure text-base leading-[1.72] text-industrial-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
