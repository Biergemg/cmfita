"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Overview() {
    const t = useTranslations("Overview");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".overview-elem",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
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
        <Section ref={sectionRef} className="bg-industrial-900 border-t border-industrial-800">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex flex-col gap-12 text-center items-center">
                    <div className="w-full">
                        <h2 className="overview-elem text-4xl md:text-6xl font-teko text-steel-light mb-6 tracking-wide uppercase">
                            {t("title")}
                        </h2>
                        <div className="overview-elem w-32 h-1.5 bg-industrial-400 mb-10 mx-auto" />
                        <p className="overview-elem text-xl text-industrial-400 mb-8 leading-relaxed max-w-3xl mx-auto">
                            {t("description1")}
                        </p>
                        <p className="overview-elem text-xl text-industrial-400 leading-relaxed max-w-3xl mx-auto">
                            {t("description2")}
                        </p>
                    </div>

                    <div className="w-full mt-8">
                        <div className="relative h-[400px] md:h-[600px] rounded-sm overflow-hidden border border-industrial-800 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent z-10" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/crane.png"
                                alt="Structural crane installation and construction site"
                                className="overview-elem w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
