import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";

import { Link } from "@/i18n/routing";
import { legalIdentifier } from "@/lib/site";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale() as "en" | "es";

  return (
    <footer className="border-t border-industrial-800 bg-industrial-950 pb-10 pt-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-4xl text-steel-light">Construcción y Mantenimientos FITA S.A. de C.V.</h2>
            <p className="max-w-md text-industrial-400">{t("description")}</p>
          </div>

          <div>
            <h3 className="mb-6 text-xl text-steel-light">{t("contact")}</h3>
            <ul className="space-y-4 text-industrial-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-industrial-400" />
                <span className="text-sm">Paseo de los Mexicas 126-D Col. 16 de Septiembre<br />Ciudad Madero, Tamaulipas C.P. 89512</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-industrial-400" />
                <span className="text-sm">+52 833 518 1171 (Ing. Gustavo Bierge)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-industrial-400" />
                <span className="text-sm">cmfitasadecv@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xl text-steel-light">{t("quickLinks")}</h3>
            <ul className="space-y-2 text-industrial-400">
              <li><Link href="/#capabilities" className="text-sm transition-colors hover:text-steel-light">{t("capabilities")}</Link></li>
              <li><Link href="/#projects" className="text-sm transition-colors hover:text-steel-light">{t("projects")}</Link></li>
              <li><Link href="/services" className="text-sm transition-colors hover:text-steel-light">{locale === "es" ? "Servicios" : "Services"}</Link></li>
              <li><Link href="/blog" className="text-sm transition-colors hover:text-steel-light">Blog</Link></li>
              <li><Link href="/privacy" className="text-sm transition-colors hover:text-steel-light">{locale === "es" ? "Privacidad" : "Privacy"}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-industrial-900 pt-8 text-xs text-industrial-500 md:flex-row">
          <p>© {new Date().getFullYear()} Construcción y Mantenimientos FITA S.A. de C.V. All rights reserved.</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <span>{legalIdentifier}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
