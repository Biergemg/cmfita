"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { Link } from "@/i18n/routing";
import { legalIdentifier } from "@/lib/site";
import { Button } from "@/components/ui/button";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale() as "en" | "es";

  return (
    <footer className="border-t border-industrial-800 bg-industrial-950 pb-10 pt-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="premium-card mb-14 grid grid-cols-1 gap-10 p-8 md:grid-cols-[1.25fr_0.8fr] md:p-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-industrial-500">
              {locale === "es" ? "Empresa de ejecución multidisciplina" : "Multidisciplinary execution company"}
            </p>
            <h2 className="max-w-3xl text-4xl leading-[0.92] text-steel-light md:text-6xl">
              {locale === "es" ? "Ejecución sin sorpresas de alcance." : "Execution without scope surprises."}
            </h2>
            <p className="reading-measure mt-5 max-w-[58ch] text-base leading-[1.72] text-industrial-300 md:text-lg">{t("description")}</p>
          </div>
          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-industrial-500">
                {locale === "es" ? "Contacto formal y rápido" : "Formal and quick contact"}
              </p>
              <p className="text-sm leading-relaxed text-industrial-300">
                {locale === "es"
                  ? "Usa correo para invitaciones, propuestas o alcances. Usa WhatsApp para dudas iniciales."
                  : "Use email for invitations, proposals, or scope packages. Use WhatsApp for quick first contact."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button
                variant="metallic"
                onClick={() => {
                  window.location.href = "mailto:cmfitasadecv@gmail.com?subject=Env%C3%ADo%20de%20bases%20o%20invitaci%C3%B3n%20-%20FITA";
                }}
              >
                {locale === "es" ? "Enviar bases o invitación" : "Send bid package or invitation"}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  window.open("https://wa.me/528335181171", "_blank", "noopener,noreferrer");
                }}
              >
                {locale === "es" ? "Preguntar por WhatsApp" : "Ask on WhatsApp"}
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

          <div className="md:col-span-2">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-industrial-500">
              {locale === "es" ? "Cobertura" : "Coverage"}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-industrial-400">
              {locale === "es"
                ? "Desde Ciudad Madero, FITA puede participar en proyectos de sector público o privado en alcances parciales o integrales, con base en licitación, invitación o asignación directa."
                : "From Ciudad Madero, FITA can participate in public or private projects through partial or broader scopes, based on bid, invitation, or direct award."}
            </p>
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
