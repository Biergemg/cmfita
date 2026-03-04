import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-industrial-950 border-t border-industrial-800 pt-20 pb-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <h2 className="font-teko text-4xl text-steel-light mb-4">Construcción y Mantenimientos FITA S.A. de C.V.</h2>
                        <p className="text-industrial-400 max-w-md">
                            {t("description")}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-teko text-xl text-steel-light mb-6 tracking-wide">{t("contact")}</h3>
                        <ul className="space-y-4 text-industrial-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-industrial-400 shrink-0 mt-0.5" />
                                <span className="text-sm">Paseo de los Mexicas 126-D Col. 16 de Septiembre<br />Ciudad Madero, Tamaulipas C.P. 89512</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-industrial-400 shrink-0" />
                                <span className="text-sm">+52 833 518 1171 (Ing. Gustavo Bierge)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-industrial-400 shrink-0" />
                                <span className="text-sm">cmfitasadecv@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-teko text-xl text-steel-light mb-6 tracking-wide">{t("quickLinks")}</h3>
                        <ul className="space-y-2 text-industrial-400">
                            <li><Link href="/#capabilities" className="hover:text-steel-light text-sm transition-colors">{t("capabilities")}</Link></li>
                            <li><Link href="/#projects" className="hover:text-steel-light text-sm transition-colors">{t("projects")}</Link></li>
                            <li><Link href="/#methodology" className="hover:text-steel-light text-sm transition-colors">{t("methodology")}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-industrial-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-industrial-500">
                    <p>© {new Date().getFullYear()} Construcción y Mantenimientos FITA S.A. de C.V. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>RFC: CMF140509C49</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
