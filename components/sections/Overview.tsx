"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Section } from "@/components/ui/section";

export function Overview() {
  const t = useTranslations("Overview");
  const sectionRef = useRef<HTMLDivElement>(null);
  const rawStats = t.raw("stats") as Record<string, { value: string; label: string }>;
  const stats = Object.values(rawStats ?? {});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".overview-elem",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef} className="bg-industrial-900 border-t border-industrial-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 text-center">
        <div className="w-full">
          <h2 className="overview-elem mb-6 text-4xl text-steel-light md:text-6xl">{t("title")}</h2>
          <div className="overview-elem mx-auto mb-10 h-1.5 w-32 bg-industrial-400" />
          <p className="overview-elem mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-industrial-400">{t("description1")}</p>
          <p className="overview-elem mx-auto max-w-3xl text-xl leading-relaxed text-industrial-400">{t("description2")}</p>
        </div>

        {stats.length > 0 && (
          <div className="grid w-full gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="overview-elem border border-industrial-800 bg-industrial-950/60 p-6 text-left">
                <p className="text-3xl text-steel-light">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-industrial-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="w-full mt-4">
          <div className="relative h-[400px] overflow-hidden rounded-sm border border-industrial-800 shadow-2xl md:h-[600px]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent" />
            <Image
              src="/crane.png"
              alt="Structural crane installation and construction site"
              fill
              className="overview-elem object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
