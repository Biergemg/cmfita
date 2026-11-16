"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/types/content";

export const ANALYTICS_CONSENT_KEY = "fita-analytics-consent";
// Evento para volver a mostrar el aviso y cambiar la decisión (p. ej. «Preferencias de cookies» en el pie).
export const OPEN_CONSENT_EVENT = "analytics-consent-open";

// La decisión guardada se lee como fuente externa (localStorage); en el servidor no hay decisión y el aviso no se pinta.
const subscribe = (onChange: () => void) => {
  window.addEventListener("analytics-consent-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("analytics-consent-change", onChange);
    window.removeEventListener("storage", onChange);
  };
};
const readConsent = () => {
  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY) ?? "";
  } catch {
    return "";
  }
};

export function CookieConsent({ locale }: { locale: Locale }) {
  const stored = useSyncExternalStore(subscribe, readConsent, () => "server");
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const visible = reopened || (stored !== "server" && stored !== "granted" && stored !== "denied");
  if (!visible) {
    return null;
  }

  const copy = locale === "es"
    ? {
        title: "Usamos analytics para medir solicitudes y rendimiento.",
        accept: "Aceptar",
        reject: "Rechazar",
        more: "Política de cookies",
      }
    : {
        title: "We use analytics to measure requests and performance.",
        accept: "Accept",
        reject: "Reject",
        more: "Cookie policy",
      };

  const updateConsent = (value: "granted" | "denied") => {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("analytics-consent-change", { detail: value }));
    setReopened(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-industrial-700 bg-industrial-950/95 backdrop-blur p-4 shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-sm text-industrial-300">
          {copy.title} {" "}
          <Link href="/cookies" className="text-steel-light underline underline-offset-4">
            {copy.more}
          </Link>
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => updateConsent("denied")}>
            {copy.reject}
          </Button>
          <Button variant="metallic" size="sm" onClick={() => updateConsent("granted")}>
            {copy.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
