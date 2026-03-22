"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as "en" | "es";
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass-panel py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-4" aria-label="FITA home">
          <div className="relative h-20 w-20 flex-shrink-0 transition-transform group-hover:scale-105 md:h-28 md:w-28">
            <Image src="/logo.png" alt="FITA Logo" fill priority className="object-contain drop-shadow-md" sizes="112px" />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm font-semibold uppercase tracking-widest text-industrial-400 transition-colors hover:text-steel-light"
            >
              {link.label}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-industrial-800" />
          <LanguageSwitcher />
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
        <div id="mobile-navigation" className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-industrial-800 bg-industrial-950 p-6 shadow-2xl md:hidden">
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
        </div>
      )}
    </header>
  );
}
