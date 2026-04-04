"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ShieldCheck, Crosshair, Leaf } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";

const icons = [ShieldCheck, Crosshair, Leaf];

export function SafetyCompliance() {
    const t = useTranslations("Safety");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".safety-item",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
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

    const items = asTitledDescriptionList(t.raw("items"));

    return (
        <Section ref={sectionRef} className="bg-industrial-950 relative overflow-hidden">
            {/* Background blueprint elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-industrial-800 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-industrial-800 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <div className="section-kicker justify-center">Ejecución en campo</div>
                <h2 className="text-4xl md:text-5xl font-teko text-steel-light mb-4 tracking-wide uppercase">
                    {t("title")}
                </h2>
                <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                    {t("subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {items.map((item, i) => {
                    const Icon = icons[i % icons.length];
                    return (
                        <div key={toStableKey(item.title, i)} className="safety-item premium-card p-8 text-center flex flex-col items-center border-t-4 border-t-industrial-400 hover:border-t-steel-light transition-colors duration-500 rounded-sm">
                            <div className="w-16 h-16 bg-industrial-950 border border-industrial-800 rounded-full flex items-center justify-center mb-6 shadow-highlight">
                                <Icon className="w-8 h-8 text-steel-metallic" />
                            </div>
                            <h3 className="font-teko text-2xl text-steel-light mb-3 tracking-wide">{item.title}</h3>
                            <p className="text-industrial-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
}
