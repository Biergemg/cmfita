import Image from "next/image";
import Link from "next/link";

import { nav } from "@/components/imperpre/content";
import { imperpreFontClass } from "@/components/imperpre/fonts";
import styles from "@/components/imperpre/imperpre.module.css";

// Cabecera blanca: emblema de FITA (versión negro sobre blanco, sin modificar) + «Imperpre» en texto.
export function ImperpreNavbar() {
  return (
    <div className={`${styles.root} ${imperpreFontClass}`} style={{ display: "contents" }}>
      <header className={styles.top}>
        <Link className={styles.brand} href="/es" aria-label="Imperpre, operado por FITA — inicio">
          <Image src="/imperpre/fita-emblema-negro-sobre-blanco.png" alt="" width={120} height={120} priority />
          <span className={styles.brandSep} aria-hidden="true" />
          <span>
            <span className={styles.brandName}>Imperpre</span>
            <span className={styles.brandSub}>Operado por FITA</span>
          </span>
        </Link>
        <nav className={styles.topNav} aria-label="Secciones">
          {nav.map((item) => (
            <Link key={item.href} className={styles.navLink} href={`/es${item.href}`}>
              {item.label}
            </Link>
          ))}
          <Link className={styles.btn} href="/es#valoracion">
            Pedir valoración
          </Link>
        </nav>
      </header>
    </div>
  );
}
