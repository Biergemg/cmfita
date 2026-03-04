"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const t = useTranslations("Navbar");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/#capabilities", label: t("capabilities") },
        { href: "/#projects", label: t("projects") },
        { href: "/#methodology", label: t("methodology") },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-panel py-3" : "bg-transparent py-5"}`}>
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 transition-transform group-hover:scale-105">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.png"
                            alt="FITA Logo"
                            className="w-full h-full object-contain drop-shadow-md"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="text-sm font-semibold text-industrial-400 hover:text-steel-light uppercase tracking-widest transition-colors">
                            {link.label}
                        </Link>
                    ))}
                    <div className="w-px h-6 bg-industrial-800 mx-2" />
                    <LanguageSwitcher />
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <LanguageSwitcher />
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-industrial-950 border-b border-industrial-800 p-6 flex flex-col gap-4 shadow-2xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-teko text-steel-light hover:text-steel-metallic uppercase tracking-wider"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
