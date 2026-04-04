"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Building2, Factory, GraduationCap, ShieldHalf, Waves, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";
import { Section } from "@/components/ui/section";

const icons = [GraduationCap, Building2, Factory, Waves, Wrench, ShieldHalf];

export function ImperpreCapabilities() {
  const t = useTranslations("Capabilities");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-card",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = asTitledDescriptionList(t.raw("items"));

  return (
    <Section ref={sectionRef} id="para-quien" className="bg-industrial-950">
      <div className="mb-16 text-center">
        <div className="section-kicker justify-center">{t("eyebrow")}</div>
        <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-lg text-industrial-400">{t("subtitle")}</p>
      </div>

      <div className="relative mb-16 h-[300px] overflow-hidden rounded-sm border border-industrial-800 shadow-2xl md:h-[450px]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent" />
        <Image src="/capabilities.png" alt="Inmuebles con losa de concreto" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {items.map((item, i) => {
          const IconComponent = icons[i % icons.length];
          return (
            <div key={toStableKey(item.title, i)} className="capability-card premium-card group p-8 transition-colors hover:bg-industrial-800/40">
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-industrial-400 opacity-50" />
              <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-industrial-400 opacity-50" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-industrial-400 opacity-50" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-industrial-400 opacity-50" />

              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-sm bg-industrial-800/80 transition-colors duration-500 group-hover:bg-steel-light">
                  <IconComponent className="h-7 w-7 text-steel-metallic transition-colors duration-500 group-hover:text-industrial-950" />
                </div>
                <span className="text-xs uppercase tracking-[0.24em] text-industrial-500">0{i + 1}</span>
              </div>

              <h3 className="mb-3 text-2xl text-steel-light">{item.title}</h3>
              <p className="max-w-[40ch] text-sm leading-relaxed text-industrial-400">{item.description}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm uppercase tracking-[0.2em] text-industrial-500">{t("filterNote")}</p>
    </Section>
  );
}
