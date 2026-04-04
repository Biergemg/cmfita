"use client";

import { useTranslations } from "next-intl";
import { Building2, CheckCircle2, MapPin, MessageCircle } from "lucide-react";

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
    <Section id="contact" className="bg-industrial-900 border-t border-industrial-800">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8 inline-block h-1 w-16 bg-steel-metallic" />
        <h2 className="mb-6 text-4xl text-steel-light md:text-6xl">{t("emotionalTitle")}</h2>
        <p className="mx-auto mb-14 max-w-3xl text-xl text-industrial-400">{t("emotionalBody")}</p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] text-left mb-16">
          <div className="space-y-8">
            <div className="glass-panel rounded-sm p-8">
              <h3 className="mb-4 text-2xl text-steel-light">{t("directContact")}</h3>
              <div className="space-y-4 text-industrial-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
                  <p>{t("address")}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
                  <p>Ubicación del inmueble</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
                  <p>Tipo de inmueble</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-panel rounded-sm border border-industrial-800 bg-industrial-950 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-industrial-500">{t("formalLabel")}</p>
                <p className="text-base leading-relaxed text-steel-light">{t("formalValue")}</p>
              </div>
              <div className="glass-panel rounded-sm border border-industrial-800 bg-industrial-950 p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-industrial-500">{t("quickLabel")}</p>
                <p className="text-base leading-relaxed text-steel-light">{t("quickValue")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-sm p-8">
              <h3 className="mb-4 text-3xl text-steel-light">{t("title")}</h3>
              <p className="mb-6 text-industrial-300 text-lg leading-relaxed">{t("subtitle")}</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-widest text-industrial-500">{t("engineerLabel")}</p>
                  <p className="text-lg font-medium text-steel-light">{t("name")}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-industrial-500">{t("phoneLabel")}</p>
                  <p className="font-mono text-lg font-medium text-steel-light">{t("phone")}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-industrial-500">{t("emailLabel")}</p>
                  <a href={`mailto:${t("email")}`} className="text-lg font-medium text-steel-light hover:text-steel-metallic" onClick={() => trackEmailClick("contact-email")}>{t("email")}</a>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-sm bg-industrial-950 p-8">
              <div className="mb-6 flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
                <div>
                  <p className="mb-1 text-sm uppercase tracking-widest text-industrial-500">{t("locationLabel")}</p>
                  <p className="text-base leading-relaxed text-steel-light">{t("address")}</p>
                </div>
              </div>
              <div className="mb-8 flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
                <div>
                  <p className="mb-1 text-sm uppercase tracking-widest text-industrial-500">{t("coverageLabel")}</p>
                  <p className="text-base leading-relaxed text-steel-light">{t("coverage")}</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button variant="metallic" className="w-full" onClick={() => openWhatsapp("contact-primary")}>
                  {t("ctaProposal")}
                </Button>
                <Button variant="outline" className="w-full border-industrial-600 hover:bg-industrial-800" onClick={() => openWhatsapp("contact-secondary")}>
                  {t("ctaWhatsapp")}
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-industrial-400">{t("microcopy")}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
