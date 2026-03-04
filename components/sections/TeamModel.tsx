"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TeamModel() {
    const t = useTranslations("Model");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".model-card",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section ref={sectionRef} className="bg-industrial-900 border-t border-b border-industrial-800 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-industrial-400 bg-industrial-800 rounded-full">
                        <Users className="w-4 h-4 text-steel-metallic" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-steel-light">
                            {t("badge")}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-teko text-steel-light mb-4 tracking-wide uppercase">
                        {t("title")}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-teko text-steel-metallic mb-8 tracking-wide">
                        {t("subtitle")}
                    </h3>

                    <div className="space-y-6 text-lg text-industrial-400 leading-relaxed">
                        <p>{t("description1")}</p>
                        <p>{t("description2")}</p>
                    </div>
                </div>

                <div className="relative h-[400px] lg:h-[500px] rounded-sm overflow-hidden border border-industrial-800 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/team.png"
                        alt="Massive structural execution and industrial fabrication"
                        className="model-card w-full h-full object-cover"
                    />
                </div>
            </div>
        </Section>
    );
}
