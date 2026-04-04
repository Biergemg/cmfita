"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";

export function ImperpreMethodology() {
    const t = useTranslations("Methodology");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".timeline-line",
                { height: 0 },
                {
                    height: "100%",
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1
                    }
                }
            );

            gsap.fromTo(".methodology-step",
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const steps = asTitledDescriptionList(t.raw("steps"));

    return (
        <Section ref={sectionRef} id="mecanismo" className="bg-industrial-900 border-t border-industrial-800">
            <div className="text-center mb-20">
                <div className="section-kicker justify-center">Mecanismo simple</div>
                <h2 className="text-4xl md:text-5xl font-teko text-steel-light mb-4 tracking-wide uppercase">
                    {t("title")}
                </h2>
                <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                    {t("subtitle")}
                </p>
            </div>

            <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-industrial-800 md:-translate-x-1/2">
                    <div className="timeline-line w-full bg-steel-metallic origin-top" />
                </div>

                {steps.map((step, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <div key={toStableKey(step.title, i)} className={`methodology-step relative flex items-center justify-between mb-12 md:mb-16 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-industrial-950 border-2 border-steel-metallic rounded-full -translate-x-[7px] md:-translate-x-1/2 z-10" />
                            <div className="hidden md:block w-5/12" />

                            <div className="w-full pl-8 md:pl-0 md:w-5/12 group">
                                <div className={`premium-card p-6 border-l-2 border-l-industrial-400 hover:border-l-steel-light transition-colors ${isEven ? "md:border-l-0 md:border-r-2 md:border-r-industrial-400 md:hover:border-r-steel-light md:text-right" : ""}`}>
                                    <span className="font-teko text-industrial-500 text-xl opacity-80 block mb-1">PASO {String(i + 1).padStart(2, "0")}</span>
                                    <h3 className="font-teko text-2xl text-steel-light mb-2 tracking-wide uppercase">{step.title}</h3>
                                    <p className="text-industrial-400 text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
