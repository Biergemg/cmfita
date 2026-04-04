"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";
import { Section } from "@/components/ui/section";

export function ProjectExperience() {
  const t = useTranslations("Projects");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-row",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const projects = asTitledDescriptionList(t.raw("items"));

  return (
    <Section ref={sectionRef} id="projects" className="bg-industrial-900 border-t border-industrial-800">
      <div className="mb-16 flex flex-col items-end gap-12 md:flex-row">
        <div className="md:w-1/2">
          <div className="section-kicker">Experiencia documentada</div>
          <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{t("title")}</h2>
          <div className="h-1 w-20 bg-industrial-400" />
        </div>
        <div className="md:w-1/2">
          <p className="border-l-2 border-industrial-800 py-2 pl-6 text-lg text-industrial-400">{t("subtitle")}</p>
        </div>
      </div>

      <div className="relative mb-16 h-[400px] overflow-hidden rounded-sm border border-industrial-800 shadow-2xl lg:h-[500px]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-industrial-950/60 via-transparent to-transparent" />
        <Image src="/infrastructure.png" alt="Massive infrastructure scale pipeline environment" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>

      <div className="flex flex-col border-t border-industrial-800">
        {projects.map((project, i) => (
          <div key={toStableKey(project.title, i)} className="project-row group flex flex-col border-b border-industrial-800 py-8 transition-colors hover:bg-industrial-800/20 md:flex-row">
            <div className="mb-4 pr-8 md:mb-0 md:w-1/3">
              <span className="mb-2 block text-3xl text-industrial-500 opacity-50">0{i + 1}</span>
              <h3 className="text-2xl tracking-wide text-steel-light transition-colors group-hover:text-steel-metallic">{project.title}</h3>
            </div>
            <div className="flex items-center md:w-2/3 md:border-l md:border-industrial-800 md:pl-8">
              <p className="max-w-[56ch] leading-relaxed text-industrial-400 transition-colors duration-500 group-hover:text-steel-light">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
