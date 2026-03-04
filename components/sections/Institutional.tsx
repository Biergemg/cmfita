"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Ruler, Factory, Handshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Institutional() {
    const t = useTranslations("Institutional");
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
        <Section ref={sectionRef} className="bg-industrial-950 border-t border-industrial-800 py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {/* Block 1: Execution Standards */}
                    <div className="micro-block flex flex-col items-start">
                        <Ruler className="w-8 h-8 text-steel-metallic mb-6" />
                        <h3 className="font-teko text-2xl text-steel-light mb-4 tracking-wide uppercase">
                            {t("standardsTitle")}
                        </h3>
                        <p className="text-industrial-400 leading-relaxed text-[15px]">
                            {t("standardsDesc")}
                        </p>
                    </div>

                    {/* Block 2: Sectors */}
                    <div className="micro-block flex flex-col items-start">
                        <Factory className="w-8 h-8 text-steel-metallic mb-6" />
                        <h3 className="font-teko text-2xl text-steel-light mb-4 tracking-wide uppercase">
                            {t("sectorsTitle")}
                        </h3>
                        <p className="text-industrial-400 leading-relaxed text-[15px]">
                            {t("sectorsDesc")}
                        </p>
                    </div>

                    {/* Block 3: Engineering Collaboration */}
                    <div className="micro-block flex flex-col items-start">
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
