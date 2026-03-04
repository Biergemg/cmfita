"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";

export function ProjectExperience() {
    const t = useTranslations("Projects");
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.fromTo(".project-row",
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const projects = asTitledDescriptionList(t.raw("items"));

    return (
        <Section ref={sectionRef} id="projects" className="bg-industrial-900 border-t border-industrial-800">
            <div className="flex flex-col md:flex-row gap-12 mb-16 items-end">
                <div className="md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-teko text-steel-light mb-4 tracking-wide uppercase">
                        {t("title")}
                    </h2>
                    <div className="w-20 h-1 bg-industrial-400" />
                </div>
                <div className="md:w-1/2">
                    <p className="text-industrial-400 text-lg border-l-2 border-industrial-800 pl-6 py-2">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            <div className="mb-16 relative h-[400px] lg:h-[500px] rounded-sm overflow-hidden border border-industrial-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/60 via-transparent to-transparent z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/infrastructure.png"
                    alt="Massive infrastructure scale pipeline environment"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col border-t border-industrial-800">
                {projects.map((project, i) => (
                    <div
                        key={toStableKey(project.title, i)}
                        className="project-row group flex flex-col md:flex-row py-8 border-b border-industrial-800 hover:bg-industrial-800/20 transition-colors"
                    >
                        <div className="md:w-1/3 mb-4 md:mb-0 pr-8">
                            <span className="font-teko text-industrial-500 text-3xl opacity-50 block mb-2">0{i + 1}</span>
                            <h3 className="font-teko text-2xl text-steel-light tracking-wide group-hover:text-steel-metallic transition-colors">{project.title}</h3>
                        </div>
                        <div className="md:w-2/3 md:pl-8 md:border-l border-industrial-800 flex items-center">
                            <p className="text-industrial-400 leading-relaxed group-hover:text-steel-light transition-colors duration-500">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
