import Image from "next/image";
import Link from "next/link";

import { footerWhatsappMessage } from "@/components/imperpre/content";
import { imperpreFontClass } from "@/components/imperpre/fonts";
import styles from "@/components/imperpre/imperpre.module.css";
import { contactEmail, contactPhone, getWhatsappUrl } from "@/lib/site";

export function ImperpreFooter() {
  return (
    <div className={`${styles.root} ${imperpreFontClass}`} style={{ display: "contents" }}>
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <div className={styles.footerBrand}>
              <Image src="/imperpre/fita-emblema-negro-sobre-blanco.png" alt="" width={128} height={128} />
              <span>
                <b>Imperpre</b>
                <span>Operado por FITA</span>
              </span>
            </div>
            <p>
              Revisión técnica e impermeabilización de azoteas de concreto para escuelas privadas en Tampico, Ciudad Madero y
              Altamira. Servicio de Construcción y Mantenimientos FITA, S.A. de C.V.
            </p>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href={getWhatsappUrl(footerWhatsappMessage)} target="_blank" rel="noopener noreferrer">
                  WhatsApp {contactPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
              <li>Ciudad Madero, Tamaulipas</li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/es/privacidad">Aviso de privacidad</Link>
              </li>
              <li>
                <Link href="/es/terminos">Términos de servicio</Link>
              </li>
              <li>
                <Link href="/es/cookies">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerLegal}>
          © {new Date().getFullYear()} Construcción y Mantenimientos FITA, S.A. de C.V. · RFC CMF140509C49. Fotografías de
          obras de Imperpre.
        </div>
      </footer>
    </div>
  );
}
