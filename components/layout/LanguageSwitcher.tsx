"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const locale = useLocale();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "es" : "en";
        startTransition(() => {
            router.replace({ pathname }, { locale: nextLocale });
        });
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-2 font-bold text-industrial-400 hover:text-steel-light"
        >
            <Globe className="w-4 h-4" />
            <span>{locale === "en" ? "ES" : "EN"}</span>
        </Button>
    );
}
