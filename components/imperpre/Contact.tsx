"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { trackWhatsappClick } from "@/lib/analytics";
import { getWhatsappUrl } from "@/lib/site";

export function ImperpreContact() {
  const t = useTranslations("Contact");

  const openWhatsapp = (location: string) => {
    trackWhatsappClick(location);
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <Section id="contact" className="bg-industrial-950 border-t border-industrial-800">
      <div className="mx-auto max-w-2xl text-center">

        <div className="mx-auto mb-6 h-px w-16 bg-steel-metallic/40" />

        <h2 className="mb-5 text-3xl font-bold leading-[1.1] text-steel-light text-balance md:text-5xl">
          {t("emotionalTitle")}
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-industrial-400">
          {t("emotionalBody")}
        </p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => openWhatsapp("contact-primary")}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-industrial-600 bg-industrial-800 px-6 py-4 text-base font-semibold tracking-wide text-steel-light transition-all hover:bg-industrial-700 active:scale-95 sm:w-auto sm:px-10"
          >
            <WhatsappIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
            {t("ctaProposal")}
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-xs text-industrial-500">{t("microcopy")}</p>
        </div>

      </div>
    </Section>
  );
}
