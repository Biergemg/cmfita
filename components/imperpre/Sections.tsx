import Image from "next/image";

import { consequences, decide, discovery, faqTitle, offer, recognition, urgent, works } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";

// Reconocimiento: escenas que la dirección identifica en su propio plantel.
export function Recognition() {
  return (
    <section id="cuando-llueve" className={`${styles.section} ${styles.signals}`} aria-labelledby="imp-rec">
      <div className={`${styles.wrap} ${styles.recGrid}`}>
        <div>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="imp-rec" className={styles.h2}>
            {recognition.title}
          </h2>
          <p className={styles.lead}>{recognition.intro}</p>
        </div>
        <div>
          <ul className={styles.signalList}>
            {recognition.items.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className={styles.recClosing}>{recognition.closing}</p>
        </div>
      </div>
    </section>
  );
}

// Descubrimiento: cómo viaja el agua y por qué el parche falla.
export function Discovery() {
  return (
    <section id="origen" className={styles.section} aria-labelledby="imp-origen">
      <div className={`${styles.wrap} ${styles.discGrid}`}>
        <div>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="imp-origen" className={styles.h2}>
            {discovery.title}
          </h2>
          {discovery.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className={styles.lead}>
              {p}
            </p>
          ))}
        </div>
        <div className={styles.discAside}>
          <figure className={styles.discPhoto}>
            <Image src={discovery.photo} alt={discovery.photoAlt} fill sizes="(max-width: 980px) 100vw, 42vw" />
            <figcaption>{discovery.caption}</figcaption>
          </figure>
          <h3 className={styles.h3}>{discovery.listTitle}</h3>
          <ul className={styles.tickList}>
            {discovery.list.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Consecuencias proporcionadas y, aparte, lo que no debe esperar una visita comercial.
export function Consequences() {
  return (
    <section id="consecuencias" className={`${styles.section} ${styles.mistBg}`} aria-labelledby="imp-cons">
      <div className={styles.wrap}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id="imp-cons" className={styles.h2}>
          {consequences.title}
        </h2>
        <p className={styles.lead}>{consequences.intro}</p>
        <ul className={styles.consGrid}>
          {consequences.items.map((c) => (
            <li key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
        <aside className={styles.urgent} aria-labelledby="imp-urg">
          <h3 id="imp-urg">{urgent.title}</h3>
          <div className={styles.urgentGrid}>
            {urgent.items.map((u) => (
              <div key={u.title}>
                <h4>{u.title}</h4>
                <p>{u.body}</p>
              </div>
            ))}
          </div>
          <p className={styles.urgentFoot}>{urgent.foot}</p>
        </aside>
      </div>
    </section>
  );
}

// Nueva manera de decidir: conocer la azotea antes de elegir un tratamiento.
export function Decide() {
  return (
    <section id="decidir" className={styles.section} aria-labelledby="imp-decidir">
      <div className={styles.wrap}>
        <div className={styles.decideHead}>
          <span className={styles.rule} aria-hidden="true" />
          <h2 id="imp-decidir" className={styles.h2}>
            {decide.title}
          </h2>
          <p className={styles.lead}>{decide.body}</p>
          <p className={styles.lead}>{decide.season}</p>
        </div>
        <div className={styles.compare}>
          <div className={styles.compareOff}>
            <h3>{decide.without.title}</h3>
            <ul>
              {decide.without.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className={styles.compareOn}>
            <h3>{decide.with.title}</h3>
            <ul>
              {decide.with.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// La oferta: revisión técnica sin costo + Ficha de Hallazgos que se queda en la escuela.
export function Offer() {
  return (
    <section id="revision" className={`${styles.section} ${styles.offerSec}`} aria-labelledby="imp-oferta">
      <div className={styles.wrap}>
        <div className={styles.offerTop}>
          <div>
            <span className={styles.rule} aria-hidden="true" />
            <h2 id="imp-oferta" className={styles.h2}>
              {offer.title}
            </h2>
            <p className={styles.lead}>{offer.lead}</p>
            <h3 className={styles.h3}>{offer.reviewTitle}</h3>
            <ul className={styles.tickList}>
              {offer.review.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className={styles.small}>{offer.reviewNote}</p>
          </div>

          <article className={styles.ficha} aria-labelledby="imp-ficha">
            <header>
              <span className={styles.fichaBrand}>
                <Image src="/imperpre/fita-emblema-negro-sobre-blanco.png" alt="" width={72} height={72} />
                Imperpre · Operado por FITA
              </span>
              <h3 id="imp-ficha">{offer.card.title}</h3>
              <p>{offer.card.sub}</p>
            </header>
            <ol>
              {offer.card.rows.map((r) => (
                <li key={r.n}>
                  <span className={styles.fichaN} aria-hidden="true">
                    {r.n}
                  </span>
                  <div>
                    <h4>{r.title}</h4>
                    <p>{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.fichaFoot}>{offer.card.foot}</p>
          </article>
        </div>

        <div className={styles.proposal}>
          <h3 className={styles.h3}>{offer.proposalTitle}</h3>
          <ul className={styles.proposalList}>
            {offer.proposal.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <ul className={styles.promises}>
          {offer.promises.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>

        <div className={styles.offerCta}>
          <a className={styles.btn} href="#valoracion">
            {offer.cta}
          </a>
          <p className={styles.small}>{offer.eligibility}</p>
        </div>
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
          {faqTitle}
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
