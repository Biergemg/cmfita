"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Section } from "@/components/ui/section";

export function TeamModel() {
  const t = useTranslations("Model");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".model-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} className="relative border-b border-t border-industrial-800 bg-industrial-900">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-industrial-400 bg-industrial-800 px-3 py-1">
            <Users className="h-4 w-4 text-steel-metallic" />
            <span className="text-xs font-semibold uppercase tracking-widest text-steel-light">{t("badge")}</span>
          </div>

          <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{t("title")}</h2>
          <h3 className="mb-8 text-xl tracking-wide text-steel-metallic md:text-2xl">{t("subtitle")}</h3>

          <div className="space-y-6 text-lg leading-relaxed text-industrial-400">
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-sm border border-industrial-800 shadow-2xl lg:h-[500px]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent" />
          <Image src="/team.png" alt="Massive structural execution and industrial fabrication" fill className="model-card object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </div>
    </Section>
  );
}
