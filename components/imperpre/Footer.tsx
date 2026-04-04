"use client";

import { MessageCircle, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { legalIdentifier, getWhatsappUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { trackWhatsappClick } from "@/lib/analytics";

export function ImperpreFooter() {
  const t = useTranslations("Footer");

  const openWhatsapp = (location: string) => {
    trackWhatsappClick(location);
    window.open(getWhatsappUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="border-t border-industrial-800 bg-industrial-950 pb-10 pt-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="premium-card mb-14 grid grid-cols-1 gap-10 p-6 sm:p-8 md:grid-cols-[1.25fr_0.8fr] md:p-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-industrial-500">Imperpre</p>
            <h2 className="max-w-3xl text-4xl leading-[0.92] text-steel-light md:text-6xl">
              Revisa tu losa antes de que el problema siga avanzando.
            </h2>
            <p className="reading-measure mt-5 max-w-[58ch] text-base leading-[1.72] text-industrial-300 md:text-lg">{t("description")}</p>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-industrial-500">WhatsApp como primer paso</p>
              <p className="text-sm leading-relaxed text-industrial-300">
                Comparte fotos, ubicación y una breve descripción del problema para orientar mejor la revisión de tu techo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button variant="metallic" onClick={() => openWhatsapp("footer-primary")}>
                {t("whatsapp")}
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-6 text-xl text-steel-light">{t("contact")}</h3>
            <ul className="space-y-4 text-industrial-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-industrial-400" />
                <span className="text-sm">Paseo de los Mexicas 126-D Col. 16 de Septiembre<br />Ciudad Madero, Tamaulipas C.P. 89512</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-industrial-400" />
                <span className="text-sm">+52 833 518 1171</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xl text-steel-light">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-industrial-400">
              <li><Link href="/#problema" className="text-sm transition-colors hover:text-steel-light">{t("problem")}</Link></li>
              <li><Link href="/#oferta" className="text-sm transition-colors hover:text-steel-light">{t("offer")}</Link></li>
              <li><Link href="/#faq" className="text-sm transition-colors hover:text-steel-light">{t("faq")}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-industrial-500">Enfoque del servicio</p>
            <p className="max-w-xl text-sm leading-relaxed text-industrial-400">
              Solución seria para losas de concreto con filtraciones o desgaste, definida a partir de la condición real del techo.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-industrial-900 pt-8 text-xs text-industrial-500 md:flex-row">
          <p>© {new Date().getFullYear()} Imperpre. Todos los derechos reservados.</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <span>{legalIdentifier}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
