import Image from "next/image";

import { offer, signals, works } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";

export function Offer() {
  return (
    <section id="oferta" className={styles.section} aria-labelledby="imp-oferta">
      <div className={`${styles.wrap} ${styles.offerGrid}`}>
        <div className={styles.offerHead}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="imp-oferta" className={styles.h2}>
            {offer.title}
          </h2>
          <p className={styles.lead}>{offer.intro}</p>
          <a className={styles.btn} href="#valoracion">
            {offer.cta}
          </a>
        </div>
        <ul className={styles.offerList}>
          {offer.items.map((item) => (
            <li key={item.title}>
              <span className={styles.offerMark} aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Signals() {
  return (
    <section id="senales" className={`${styles.section} ${styles.signals}`} aria-labelledby="imp-senales">
      <div className={`${styles.wrap} ${styles.signalsGrid}`}>
        <div>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="imp-senales" className={styles.h2}>
            {signals.title}
          </h2>
          <p className={styles.lead}>{signals.intro}</p>
          <ul className={styles.signalList}>
            {signals.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <a className={styles.btn} href="#valoracion">
            {signals.cta}
          </a>
        </div>
        <figure className={styles.signalPhoto}>
          <Image src={signals.photo} alt={signals.photoAlt} fill sizes="(max-width: 980px) 100vw, 45vw" />
          <figcaption>Obra de Imperpre</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Works() {
  return (
    <section id="obras" className={styles.section} aria-labelledby="imp-obras">
      <div className={styles.wrap}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id="imp-obras" className={styles.h2}>
          {works.title}
        </h2>
        <p className={styles.lead}>{works.intro}</p>
        <div className={styles.worksGrid}>
          {works.photos.map((p, i) => (
            <figure key={p.src} className={styles.work}>
              <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(max-width: 760px) 100vw, 45vw" : "(max-width: 760px) 50vw, 28vw"} />
              <figcaption>{p.tag}</figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.operated}>
          <Image src="/imperpre/fita-emblema-negro-sobre-blanco.png" alt="Emblema de Construcción y Mantenimientos FITA" width={168} height={168} />
          <div>
            <h3>{works.operatedBy.title}</h3>
            <p>{works.operatedBy.body}</p>
          </div>
          <dl>
            {works.operatedBy.rows.map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: Array<{ title: string; description: string }> }) {
  return (
    <section id="preguntas" className={styles.section} aria-labelledby="imp-faq" style={{ paddingTop: 0 }}>
      <div className={styles.wrap} style={{ maxWidth: 980 }}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id="imp-faq" className={styles.h2}>
          Lo que nos preguntan antes de decidir
        </h2>
        <div className={styles.faqList}>
          {items.map((item) => (
            <details key={item.title} className={styles.faqItem}>
              <summary>{item.title}</summary>
              <p>{item.description}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
