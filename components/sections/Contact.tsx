"use client";

import { useTranslations } from "next-intl";
import { Building2, MapPin } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { trackEmailClick, trackProposalRequest, trackWhatsappClick } from "@/lib/analytics";
import type { Locale } from "@/types/content";

export function Contact({ locale }: { locale: Locale }) {
  const t = useTranslations("Contact");

  return (
    <Section id="contact" className="bg-industrial-900 border-t border-industrial-800">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8 inline-block h-1 w-16 bg-steel-metallic" />
        <h2 className="mb-6 text-5xl text-steel-light md:text-7xl">{t("title")}</h2>
        <p className="mx-auto mb-12 max-w-3xl text-xl text-industrial-400">{t("subtitle")}</p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] text-left">
          <div className="space-y-8">
            <div className="glass-panel rounded-sm p-8">
              <h3 className="mb-4 text-2xl text-steel-light">{t("directContact")}</h3>
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
                  <a href={`mailto:${t("email")}`} className="text-lg font-medium text-steel-light hover:text-steel-metallic" onClick={() => trackEmailClick("contact-card")}>
                    {t("email")}
                  </a>
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
                <Button
                  variant="metallic"
                  className="w-full"
                  onClick={() => {
                    trackProposalRequest("contact-card");
                    trackEmailClick("contact-card");
                    window.location.href = `mailto:${t("email")}?subject=Env%C3%ADo%20de%20bases%20o%20invitaci%C3%B3n%20-%20FITA`;
                  }}
                >
                  {t("ctaProposal")}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-industrial-600 hover:bg-industrial-800"
                  onClick={() => {
                    trackWhatsappClick("contact-card");
                    window.open(`https://wa.me/${t("phone").replace(/\D/g, "")}`, "_blank", "noopener,noreferrer");
                  }}
                >
                  {t("ctaWhatsapp")}
                </Button>
              </div>
            </div>
          </div>

          <ContactForm locale={locale} />
        </div>
      </div>
    </Section>
  );
}
