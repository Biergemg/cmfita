"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { method } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";

// Sistema 3C: cada franja de membrana se desenrolla con su rollo y su flama al entrar en pantalla.
export function Method() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(`.${styles.strip}`).forEach((st) => {
        gsap.fromTo(st, { "--u": "0%", "--f": "0%" }, { "--u": "100%", "--f": "100%", ease: "none", scrollTrigger: { trigger: st, start: "top 88%", end: "center 50%", scrub: 0.5 } });
        const mini = st.querySelector(`.${styles.mini}`);
        gsap.fromTo(mini, { opacity: 1 }, { opacity: 0, ease: "none", scrollTrigger: { trigger: st, start: "center 52%", end: "center 46%", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="metodo" ref={ref} className={styles.method} aria-labelledby="imp-metodo">
      <div className={styles.methodHead}>
        <span className={styles.rule} aria-hidden="true" />
        <h2 id="imp-metodo" className={styles.h2}>
          {method.title}
        </h2>
        <p className={styles.lead}>{method.intro}</p>
      </div>
      <div>
        {method.steps.map((s, i) => (
          <article key={s.n} className={`${styles.strip} ${i % 2 ? styles.stripEven : ""}`}>
            <div className={`${styles.band} ${styles.granule}`}>
              <span className={styles.bandN}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
            <span className={styles.mini} aria-hidden="true" />
            <figure className={styles.stripFig}>
              <Image src={s.img} alt={s.alt} fill sizes="(max-width: 760px) 100vw, 40vw" />
              <figcaption>Obra de Imperpre</figcaption>
            </figure>
          </article>
        ))}
      </div>
      <div className={styles.afterWrap}>
        <h3 className={styles.h3}>{method.afterTitle}</h3>
        <ul className={styles.afterList}>
          {method.after.map((a) => (
            <li key={a.title}>
              <h4>{a.title}</h4>
              <p>{a.body}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.closing}>
        <span className={styles.rule} aria-hidden="true" />
        {method.closing}
      </p>
    </section>
  );
}
