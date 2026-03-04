"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Contact() {
    const t = useTranslations("Contact");

    return (
        <Section id="contact" className="bg-industrial-900">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block w-16 h-1 bg-steel-metallic mb-8" />
                <h2 className="text-5xl md:text-7xl font-teko text-steel-light mb-6 tracking-wide uppercase">
                    {t("title")}
                </h2>
                <p className="text-industrial-400 text-xl max-w-2xl mx-auto mb-12">
                    {t("subtitle")}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
                    <div className="glass-panel p-8 rounded-sm">
                        <h3 className="font-teko text-2xl text-steel-light mb-4 tracking-widest uppercase">{t("directContact")}</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-industrial-500 uppercase tracking-widest">{t("engineerLabel")}</p>
                                <p className="text-lg text-steel-light font-medium">{t("name")}</p>
                            </div>
                            <div>
                                <p className="text-sm text-industrial-500 uppercase tracking-widest">{t("phoneLabel")}</p>
                                <p className="text-lg text-steel-light font-medium font-mono">{t("phone")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-sm bg-industrial-950 flex flex-col justify-center">
                        <p className="text-sm text-industrial-500 uppercase tracking-widest mb-1">{t("emailLabel")}</p>
                        <p className="text-xl text-steel-light font-medium mb-8">{t("email")}</p>

                        <div className="space-y-4 w-full">
                            <Button variant="metallic" className="w-full text-lg group" onClick={() => window.location.href = `mailto:${t("email")}`}>
                                {t("ctaProposal")}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full text-lg border-industrial-600 hover:bg-industrial-800"
                                onClick={() => window.open(`https://wa.me/${t("phone").replace(/\D/g, '')}`, '_blank')}
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
