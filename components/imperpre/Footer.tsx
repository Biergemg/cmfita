"use client";

import { MessageCircle } from "lucide-react";
import { legalIdentifier, getWhatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreFooter() {
  const openWhatsapp = () => {
    trackWhatsappClick("footer");
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Floating WhatsApp button — mobile & desktop */}
      <div className="fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-6">
        <button
          onClick={openWhatsapp}
          aria-label="Agendar visita por WhatsApp"
          className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-transform hover:scale-105 hover:bg-green-400 active:scale-95 sm:px-5"
        >
          <MessageCircle className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">Agendar visita gratuita</span>
        </button>
      </div>

      {/* Minimal footer — no navigation links */}
      <footer className="border-t border-industrial-800/40 bg-industrial-950 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-xs text-industrial-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Imperpre · Tampico, Madero y Altamira</p>
          <div className="flex items-center gap-4">
            <span>{legalIdentifier}</span>
            <button
              onClick={openWhatsapp}
              className="font-medium text-steel-metallic transition-colors hover:text-steel-light"
            >
              +52 833 518 1171
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
