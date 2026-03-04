"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Wrench, Hexagon, ShieldHalf, PowerOff, Container, PenTool } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";

const icons = [Wrench, Hexagon, ShieldHalf, PenTool, Container, PowerOff];

export function Capabilities() {
    const t = useTranslations("Capabilities");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".capability-card",
                { y: 30, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
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
        <Section ref={sectionRef} id="capabilities" className="bg-industrial-950">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-teko text-steel-light mb-4 tracking-wide uppercase">
                    {t("title")}
                </h2>
                <p className="text-industrial-400 max-w-2xl mx-auto text-lg">
                    {t("subtitle")}
                </p>
            </div>

            <div className="mb-16 relative h-[300px] md:h-[450px] rounded-sm overflow-hidden border border-industrial-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/capabilities.png"
                    alt="Fabrication structural steel welding environment"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, i) => {
                    const IconComponent = icons[i % icons.length];
                    return (
                        <div
                            key={toStableKey(item.title, i)}
                            className="capability-card group relative p-8 border border-industrial-800 bg-industrial-900/30 hover:bg-industrial-800/50 transition-colors rounded-sm"
                        >
                            {/* Blueprint detail lines */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-industrial-400 opacity-50" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-industrial-400 opacity-50" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-industrial-400 opacity-50" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-industrial-400 opacity-50" />

                            <div className="w-14 h-14 bg-industrial-800/80 rounded-sm flex items-center justify-center mb-6 group-hover:bg-steel-light transition-colors duration-500">
                                <IconComponent className="w-7 h-7 text-steel-metallic group-hover:text-industrial-950 transition-colors duration-500" />
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
