"use client";

import { useEffect, useState } from "react";

import { CTA } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";

// Botón fijo en la zona del pulgar (móvil). Se oculta cuando el formulario de valoración está en pantalla para no tapar sus controles.
export function MobileBar() {
  const [hidden, setHidden] = useState(true);
  // También se oculta mientras el hero está en pantalla: ahí el botón principal ya es visible y no hace falta duplicarlo.
  useEffect(() => {
    const form = document.getElementById("valoracion");
    const hero = document.querySelector("section[aria-labelledby='imp-h1']");
    const state = { form: false, hero: true };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === form) state.form = e.isIntersecting;
          if (e.target === hero) state.hero = e.isIntersecting;
        }
        setHidden(state.form || state.hero);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    if (form) io.observe(form);
    if (hero) io.observe(hero);
    return () => io.disconnect();
  }, []);
  return (
    <div className={styles.mobileBar} data-hidden={hidden} aria-hidden={hidden}>
      <a className={styles.btn} href="#valoracion" tabIndex={hidden ? -1 : 0}>
        {CTA}
      </a>
    </div>
  );
}
