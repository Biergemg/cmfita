"use client";

import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { CheckCircle2, Factory } from "lucide-react";

export function ProcurementReady() {
    const t = useTranslations("Procurement");
    const locale = useLocale();

    return (
        <Section className="bg-industrial-950 relative overflow-hidden py-16 md:py-24">
            <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-industrial-400 to-transparent opacity-20" />

            <div className="section-kicker justify-center">{locale === "es" ? "¿Cómo entrar?" : "How to get in?"}</div>
            <div className="premium-card p-8 md:p-12 max-w-5xl mx-auto rounded-sm flex flex-col md:flex-row items-center gap-12">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-industrial-900 rounded-full border border-industrial-400 flex items-center justify-center opacity-80 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <Factory className="w-12 h-12 md:w-16 md:h-16 text-steel-metallic" />
                </div>

                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-teko text-steel-light mb-4 tracking-wide uppercase">
                        {t("title")}
                    </h2>
                    <p className="text-industrial-400 mb-6 text-lg leading-relaxed">
                        {t("description")}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-industrial-800 pt-6">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-steel-metallic shrink-0" />
                            <span className="text-sm font-semibold text-industrial-200 uppercase tracking-widest">{t("bullet1")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-steel-metallic shrink-0" />
                            <span className="text-sm font-semibold text-industrial-200 uppercase tracking-widest">{t("bullet2")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-steel-metallic shrink-0" />
                            <span className="text-sm font-semibold text-industrial-200 uppercase tracking-widest">{t("bullet3")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
