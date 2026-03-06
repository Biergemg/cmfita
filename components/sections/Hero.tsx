"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { trackProposalRequest, trackWhatsappClick } from "@/lib/analytics";

export function Hero() {
    const t = useTranslations("Hero");

    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background subtle scale
            gsap.fromTo(bgRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 0.3, duration: 2.5, ease: "power2.out" }
            );

            // Text reveal
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(headlineRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.2 }
            )
                .fromTo(subheadlineRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6 },
                    "-=0.4"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-industrial-950">
            {/* Background Image with Overlay */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 select-none opacity-40"
                style={{
                    backgroundImage: "url('/hero.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 z-[1] bg-grid opacity-50 mix-blend-overlay pointer-events-none" />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-industrial-950 via-industrial-950/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-[2] bg-gradient-to-r from-industrial-950 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                    <div className="lg:col-span-7 max-w-5xl">
                    <h1
                        ref={headlineRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold font-teko uppercase leading-[0.96] tracking-normal mb-6 text-steel-light text-balance"
                    >
                        {t("headline")}
                    </h1>

                        <p
                            ref={subheadlineRef}
                            className="text-lg md:text-xl text-industrial-300 max-w-3xl font-inter mb-10 text-balance leading-relaxed"
                        >
                            {t("subheadline")}
                        </p>

                        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
                            <Button
                                variant="metallic"
                                size="lg"
                                className="group"
                                onClick={() => {
                                    trackProposalRequest();
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                {t("ctaProposal")}
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-industrial-600 hover:bg-industrial-800"
                                onClick={() => {
                                    trackWhatsappClick();
                                    window.open("https://wa.me/528335181171", "_blank");
                                }}
                            >
                                {t("ctaWhatsapp")}
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="glass-panel p-8 border border-industrial-700/70 rounded-sm">
                            <p className="text-xs tracking-[0.2em] uppercase text-industrial-400 mb-3">
                                {t("panelLabel")}
                            </p>
                            <h2 className="text-3xl font-teko text-steel-light leading-tight mb-5">
                                {t("panelTitle")}
                            </h2>
                            <ul className="space-y-3 text-sm text-industrial-300">
                                <li className="border-l-2 border-industrial-400 pl-3">{t("panelBullet1")}</li>
                                <li className="border-l-2 border-industrial-400 pl-3">{t("panelBullet2")}</li>
                                <li className="border-l-2 border-industrial-400 pl-3">{t("panelBullet3")}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
