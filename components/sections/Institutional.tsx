"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { Ruler, Factory, Handshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Institutional() {
    const t = useTranslations("Institutional");
    const locale = useLocale();
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".micro-block",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section ref={sectionRef} className="bg-industrial-950 border-t border-industrial-800 py-16 md:py-24" containerClassName="max-w-6xl">
            <div className="mx-auto max-w-6xl">
                <div className="section-kicker">{locale === "es" ? "Por qué FITA es diferente" : "Why FITA is different"}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* Block 1: Execution Standards */}
                    <div className="micro-block premium-card flex flex-col items-start p-8">
                        <Ruler className="w-8 h-8 text-steel-metallic mb-6" />
                        <h3 className="font-teko text-2xl text-steel-light mb-4 tracking-wide uppercase">
                            {t("standardsTitle")}
                        </h3>
                        <p className="text-industrial-400 leading-relaxed text-[15px]">
                            {t("standardsDesc")}
                        </p>
                    </div>

                    {/* Block 2: Sectors */}
                    <div className="micro-block premium-card flex flex-col items-start p-8">
                        <Factory className="w-8 h-8 text-steel-metallic mb-6" />
                        <h3 className="font-teko text-2xl text-steel-light mb-4 tracking-wide uppercase">
                            {t("sectorsTitle")}
                        </h3>
                        <p className="text-industrial-400 leading-relaxed text-[15px]">
                            {t("sectorsDesc")}
                        </p>
                    </div>

                    {/* Block 3: Engineering Collaboration */}
                    <div className="micro-block premium-card flex flex-col items-start p-8">
                        <Handshake className="w-8 h-8 text-steel-metallic mb-6" />
                        <h3 className="font-teko text-2xl text-steel-light mb-4 tracking-wide uppercase">
                            {t("collabTitle")}
                        </h3>
                        <p className="text-industrial-400 leading-relaxed text-[15px]">
                            {t("collabDesc")}
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
