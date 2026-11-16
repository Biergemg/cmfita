"use client";

import { OPEN_CONSENT_EVENT } from "@/components/analytics/CookieConsent";
import styles from "@/components/imperpre/imperpre.module.css";

// Permite cambiar en cualquier momento la decisión sobre la medición (vuelve a mostrar el aviso de cookies).
export function CookiePrefsButton() {
  return (
    <button type="button" className={styles.linkBtn} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Preferencias de cookies
    </button>
  );
}
