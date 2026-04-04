"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { getWhatsappUrl } from "@/lib/site";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreNavbar() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 });
  }, []);

  const openWhatsapp = () => {
    trackWhatsappClick("nav");
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <header ref={headerRef} className="fixed top-0 z-50 w-full border-b border-industrial-800/60 bg-industrial-950/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo only — no nav links */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0">
            <Image src="/logo.png" alt="Imperpre" fill priority className="object-contain" sizes="40px" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-steel-light">Imperpre</span>
        </div>

        {/* Single CTA — the only action */}
        <button
          onClick={openWhatsapp}
          className="flex items-center gap-2 rounded-sm border border-industrial-600 bg-industrial-800 px-4 py-2 text-sm font-semibold tracking-wide text-steel-light transition-all hover:bg-industrial-700 hover:border-industrial-500 active:scale-95"
        >
          <WhatsappIcon className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Agendar visita gratuita</span>
          <span className="sm:hidden">Agendar visita</span>
        </button>
      </div>
    </header>
  );
}
