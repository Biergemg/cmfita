"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MapPin, Building2 } from "lucide-react";

export function Contact() {
    const t = useTranslations("Contact");

  return (
    <Section id="contact" className="bg-industrial-900">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-block h-1 w-16 bg-steel-metallic" />
        <h2 className="mb-6 text-5xl uppercase tracking-wide text-steel-light md:text-7xl">
          {t("title")}
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-xl text-industrial-400">
          {t("subtitle")}
        </p>

        <div className="mb-8 grid grid-cols-1 gap-8 text-left md:grid-cols-2">
          <div className="glass-panel rounded-sm p-8">
            <h3 className="mb-4 text-2xl uppercase tracking-widest text-steel-light">
              {t("directContact")}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-widest text-industrial-500">
                  {t("engineerLabel")}
                </p>
                <p className="text-lg font-medium text-steel-light">{t("name")}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-industrial-500">
                  {t("phoneLabel")}
                </p>
                <p className="font-mono text-lg font-medium text-steel-light">{t("phone")}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-industrial-500">
                  {t("emailLabel")}
                </p>
                <p className="text-lg font-medium text-steel-light">{t("email")}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel flex flex-col justify-center rounded-sm bg-industrial-950 p-8">
            <div className="mb-6 flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
              <div>
                <p className="mb-1 text-sm uppercase tracking-widest text-industrial-500">
                  {t("locationLabel")}
                </p>
                <p className="text-base leading-relaxed text-steel-light">{t("address")}</p>
              </div>
            </div>
            <div className="mb-8 flex items-start gap-3">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-steel-metallic" />
              <div>
                <p className="mb-1 text-sm uppercase tracking-widest text-industrial-500">
                  {t("coverageLabel")}
                </p>
                <p className="text-base leading-relaxed text-steel-light">{t("coverage")}</p>
              </div>
            </div>

            <div className="w-full space-y-4">
              <Button
                variant="metallic"
                className="group w-full text-lg"
                onClick={() => window.location.href = `mailto:${t("email")}`}
              >
                {t("ctaProposal")}
              </Button>
              <Button
                variant="outline"
                className="w-full text-lg border-industrial-600 hover:bg-industrial-800"
                onClick={() => window.open(`https://wa.me/${t("phone").replace(/\D/g, "")}`, "_blank")}
              >
                {t("ctaWhatsapp")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
