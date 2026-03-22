"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Hexagon, PenTool, PowerOff, ShieldHalf, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { asTitledDescriptionList, toStableKey } from "@/lib/i18n";
import { Section } from "@/components/ui/section";

const icons = [Wrench, Hexagon, ShieldHalf, PenTool, Container, PowerOff];

export function Capabilities() {
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
    <Section ref={sectionRef} id="capabilities" className="bg-industrial-950">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{t("title")}</h2>
        <p className="mx-auto max-w-2xl text-lg text-industrial-400">{t("subtitle")}</p>
      </div>

      <div className="relative mb-16 h-[300px] overflow-hidden rounded-sm border border-industrial-800 shadow-2xl md:h-[450px]">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent" />
        <Image src="/capabilities.png" alt="Fabrication structural steel welding environment" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const IconComponent = icons[i % icons.length];
          return (
            <div key={toStableKey(item.title, i)} className="capability-card group relative rounded-sm border border-industrial-800 bg-industrial-900/30 p-8 transition-colors hover:bg-industrial-800/50">
              <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-industrial-400 opacity-50" />
              <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-industrial-400 opacity-50" />
              <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-industrial-400 opacity-50" />
              <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-industrial-400 opacity-50" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-sm bg-industrial-800/80 transition-colors duration-500 group-hover:bg-steel-light">
                <IconComponent className="h-7 w-7 text-steel-metallic transition-colors duration-500 group-hover:text-industrial-950" />
              </div>

              <h3 className="mb-3 text-2xl text-steel-light">{item.title}</h3>
              <p className="text-sm leading-relaxed text-industrial-400">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
