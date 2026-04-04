"use client";

import { legalIdentifier, getWhatsappUrl } from "@/lib/site";
import { WhatsappIcon } from "@/components/ui/WhatsappIcon";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreFooter() {
  const openWhatsapp = () => {
    trackWhatsappClick("footer");
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Floating WhatsApp button with glow */}
      <div className="fixed bottom-6 right-4 z-50 sm:bottom-8 sm:right-6">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />
        <button
          onClick={openWhatsapp}
          aria-label="Agendar visita por WhatsApp"
          className="relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_24px_rgba(37,211,102,0.55)] transition-all hover:bg-[#20BD5A] hover:shadow-[0_0_36px_rgba(37,211,102,0.75)] active:scale-95"
        >
          <WhatsappIcon className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">Agendar visita gratuita</span>
        </button>
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-industrial-800/40 bg-industrial-950 py-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Meta disclaimer */}
          <p className="mb-6 text-center text-[11px] leading-relaxed text-industrial-600">
            Este sitio web no está afiliado a Meta Platforms Inc. ni a Facebook Inc. Esta página no está
            respaldada por Facebook de ninguna manera. FACEBOOK es una marca registrada de META PLATFORMS, INC.
          </p>
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-industrial-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Imperpre · Tampico, Madero y Altamira</p>
            <span>{legalIdentifier}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
