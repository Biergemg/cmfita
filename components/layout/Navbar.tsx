"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";

import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as "en" | "es";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = pathname === "/" || pathname === `/${locale}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(".nav-shell", { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.25 });
  }, []);

  const navLinks = [
    { href: "/#capabilities", label: t("capabilities") },
    { href: "/#projects", label: t("projects") },
    { href: "/#methodology", label: t("methodology") },
    { href: "/services", label: locale === "es" ? "Servicios" : "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/team", label: locale === "es" ? "Equipo" : "Team" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4 md:px-6">
      <div className={`nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-sm border px-3 py-3 transition-all duration-300 sm:px-4 md:px-6 ${scrolled ? "glass-panel border-industrial-700/80 bg-industrial-950/78 shadow-[0_24px_60px_rgba(2,6,23,0.45)]" : "border-white/8 bg-industrial-950/48 backdrop-blur-sm"}`}>
        <Link href="/" className="group flex items-center gap-3" aria-label="FITA home">
          <div className="relative h-16 w-16 flex-shrink-0 transition-transform group-hover:scale-105 md:h-20 md:w-20">
            <Image src="/logo.png" alt="FITA Logo" fill priority className="object-contain drop-shadow-md" sizes="112px" />
          </div>
          <div className="hidden min-w-0 md:block">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-industrial-500">Construcción y Mantenimientos</p>
            <p className="font-teko text-[2rem] leading-none tracking-[0.025em] text-steel-light">FITA</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || (isHome && link.href.startsWith("/#")) ? "page" : undefined}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-industrial-400 transition-colors hover:text-steel-light"
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-industrial-800" />
          <LanguageSwitcher />
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => {
              window.location.href = "mailto:cmfitasadecv@gmail.com?subject=Invitaci%C3%B3n%20a%20cotizar%20-%20FITA";
            }}
          >
            {locale === "es" ? "Invitar a cotizar" : "Invite to bid"}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mx-auto mt-2 flex max-w-7xl flex-col gap-4 rounded-sm border border-industrial-800 bg-industrial-950/96 p-4 shadow-2xl backdrop-blur-md sm:p-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg tracking-wider text-steel-light hover:text-steel-metallic"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={() => {
              setMobileMenuOpen(false);
              window.location.href = "mailto:cmfitasadecv@gmail.com?subject=Invitaci%C3%B3n%20a%20cotizar%20-%20FITA";
            }}
          >
            {locale === "es" ? "Invitar a cotizar" : "Invite to bid"}
          </Button>
        </div>
      )}
    </header>
  );
}
