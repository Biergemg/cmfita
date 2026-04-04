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
        <h2 className="mb-4 text-4xl uppercase tracking-wide text-steel-light md:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-3xl text-lg text-industrial-300">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <article
            key={toStableKey(item.title, index)}
            className="premium-card rounded-sm p-6 md:p-8"
          >
            <h3 className="mb-3 text-2xl uppercase tracking-wide text-steel-light">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-industrial-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
