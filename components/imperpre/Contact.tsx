"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { trackEmailClick, trackWhatsappClick } from "@/lib/analytics";
import { getWhatsappUrl } from "@/lib/site";

export function ImperpreContact() {
  const t = useTranslations("Contact");

  const openWhatsapp = (location: string) => {
    trackWhatsappClick(location);
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <Section id="contact" className="bg-industrial-950 border-t border-industrial-800">
      <div className="mx-auto max-w-5xl">

        {/* Emotional close — full-width headline */}
        <div className="mb-14 text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-amber-500/50" />
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] text-steel-light text-balance md:text-5xl lg:text-[3.5rem]">
            {t("emotionalTitle")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-industrial-400">
            {t("emotionalBody")}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">

          {/* Left — what to send + contact data */}
          <div className="flex flex-col gap-5">
            <div className="rounded-sm border border-industrial-800 bg-industrial-900 p-7">
              <h3 className="mb-5 text-lg font-medium text-steel-light">{t("directContact")}</h3>
              <ul className="space-y-4 text-industrial-300">
                {[t("address"), "Ubicación del inmueble", "Tipo de inmueble (escuela, edificio, oficina)"].map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-industrial-800 bg-industrial-900 p-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-industrial-500">{t("formalLabel")}</p>
                <p className="text-sm leading-relaxed text-steel-light">{t("formalValue")}</p>
              </div>
              <div className="rounded-sm border border-industrial-800 bg-industrial-900 p-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-industrial-500">{t("quickLabel")}</p>
                <p className="text-sm leading-relaxed text-steel-light">{t("quickValue")}</p>
              </div>
            </div>

            <div className="rounded-sm border border-industrial-800 bg-industrial-900 p-5">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-industrial-500">{t("coverageLabel")}</p>
              <p className="text-sm leading-relaxed text-steel-light">{t("coverage")}</p>
            </div>
          </div>

          {/* Right — CTA block */}
          <div className="flex flex-col gap-5">
            <div className="rounded-sm border border-industrial-800 bg-industrial-900 p-7">
              <h3 className="mb-3 text-2xl font-bold text-steel-light">{t("title")}</h3>
              <p className="mb-7 text-[1rem] leading-relaxed text-industrial-300">{t("subtitle")}</p>

              <div className="mb-7 space-y-4 border-t border-industrial-800 pt-5">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-steel-metallic" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-industrial-500">{t("phoneLabel")}</p>
                    <p className="font-mono text-base font-medium text-steel-light">{t("phone")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 shrink-0 text-steel-metallic" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-industrial-500">{t("engineerLabel")}</p>
                    <p className="text-base font-medium text-steel-light">{t("name")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-industrial-500">{t("emailLabel")}</p>
                    <a
                      href={`mailto:${t("email")}`}
                      className="text-sm text-steel-light hover:text-steel-metallic transition-colors"
                      onClick={() => trackEmailClick("contact-email")}
                    >
                      {t("email")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="metallic"
                  className="group w-full"
                  size="lg"
                  onClick={() => openWhatsapp("contact-primary")}
                >
                  {t("ctaProposal")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-industrial-700 hover:bg-industrial-800"
                  onClick={() => openWhatsapp("contact-secondary")}
                >
                  {t("ctaWhatsapp")}
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-industrial-500">{t("microcopy")}</p>
            </div>

            {/* Urgency strip */}
            <div className="rounded-sm border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="text-sm leading-relaxed text-amber-300/90">
                <span className="font-semibold">¿Ya hay goteras activas?</span> El daño que ocurre durante una
                temporada de lluvias sin atención es daño permanente en la losa. Escríbenos hoy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
