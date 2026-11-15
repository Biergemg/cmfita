"use client";

import { useEffect, useState } from "react";

import styles from "@/components/imperpre/imperpre.module.css";

// Botón fijo en la zona del pulgar (móvil). Se oculta cuando el formulario de valoración está en pantalla para no tapar sus controles.
export function MobileBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("valoracion");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    io.observe(target);
    return () => io.disconnect();
  }, []);
  return (
    <div className={styles.mobileBar} data-hidden={hidden} aria-hidden={hidden}>
      <a className={styles.btn} href="#valoracion" tabIndex={hidden ? -1 : 0}>
        Pedir valoración
      </a>
    </div>
  );
}
