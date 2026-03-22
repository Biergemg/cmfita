"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
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
      gsap.fromTo(bgRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 0.35, duration: 2.5, ease: "power2.out" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(headlineRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
        .fromTo(subheadlineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative flex min-h-[95vh] items-center overflow-hidden bg-industrial-950 pt-24">
      <div ref={bgRef} className="absolute inset-0 z-0 select-none opacity-40">
        <Image src="/hero.png" alt="Industrial execution hero" fill priority className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 z-[1] bg-grid opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-industrial-950 via-industrial-950/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-industrial-950 via-transparent to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="max-w-5xl lg:col-span-7">
            <h1 ref={headlineRef} className="mb-6 text-5xl font-bold leading-[0.96] tracking-normal text-steel-light text-balance md:text-6xl lg:text-7xl">
              {t("headline")}
            </h1>
            <p ref={subheadlineRef} className="mb-10 max-w-3xl text-balance text-lg leading-relaxed text-industrial-300 md:text-xl">
              {t("subheadline")}
            </p>
            <div ref={ctaRef} className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="metallic"
                size="lg"
                className="group"
                onClick={() => {
                  trackProposalRequest("hero");
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("ctaProposal")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-industrial-600 hover:bg-industrial-800"
                onClick={() => {
                  trackWhatsappClick("hero");
                  window.open("https://wa.me/528335181171", "_blank", "noopener,noreferrer");
                }}
              >
                {t("ctaWhatsapp")}
              </Button>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="glass-panel rounded-sm border border-industrial-700/70 p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-industrial-400">{t("panelLabel")}</p>
              <h2 className="mb-5 text-3xl leading-tight text-steel-light">{t("panelTitle")}</h2>
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
