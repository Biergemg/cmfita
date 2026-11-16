"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { hero } from "@/components/imperpre/content";
import styles from "@/components/imperpre/imperpre.module.css";

// Hero «Se desenrolla»: un rollo de membrana (ilustración) avanza empujado por el soplete y cubre la escena inicial;
// al final se descubre una escena con membrana instalada. Sin JavaScript o con movimiento reducido queda el estado final legible.
export function RollHero() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const after = stage.querySelector<HTMLElement>(`.${styles.after}`)!;
    const roll = stage.querySelector<HTMLElement>(`.${styles.roll}`)!;
    const torch = stage.querySelector<HTMLElement>(`.${styles.torch}`)!;
    const flame = stage.querySelector<SVGGElement>(`.${styles.flame}`)!;
    const S = { x: 0, w: 0, heat: 0 };
    let mob = false;
    let G = { span: 1, textEdge: 1 };
    const dims = () => {
      mob = window.innerWidth <= 760;
      const span = mob ? stage.clientHeight : stage.clientWidth;
      // En móvil la hoja debe cubrir todo el texto y el botón del hero: se mide el contenido real en vez de suponer un 60 %.
      let textEdge = Math.max(560, stage.clientWidth * 0.52);
      if (mob) {
        const print = stage.querySelector<HTMLElement>(`.${styles.print}`);
        let need = 0;
        if (print) {
          const prev = print.style.height;
          print.style.height = "auto";
          need = print.offsetHeight;
          print.style.height = prev;
        }
        textEdge = Math.min(stage.clientHeight * 0.86, Math.max(stage.clientHeight * 0.6, need + 4));
      }
      const rd = mob ? 64 : Math.max(90, window.innerWidth * 0.075);
      // En escritorio el rollo se centra en el borde de la hoja: el texto termina antes de su mitad para no quedar debajo.
      stage.style.setProperty("--pw", `${mob ? textEdge : textEdge - rd / 2 - 8}px`);
      stage.style.setProperty("--rd", `${rd}px`);
      G = { span, textEdge };
    };
    const paint = () => {
      stage.style.setProperty("--x", `${S.x}px`);
      stage.style.setProperty("--rp", `${-S.x * 0.9}px`);
      const v = Math.max(mob ? 0 : (G.textEdge / G.span) * 100, (1 - S.w) * 100);
      after.style.clipPath = mob ? `inset(${v}% 0 0 0)` : `inset(0 0 0 ${v}%)`;
      const gone = S.x > G.span + 40;
      roll.style.opacity = gone ? "0" : "1";
      stage.style.setProperty("--ton", gone ? "0" : "1");
      stage.style.setProperty("--heat", String(gone ? 0 : S.heat));
    };
    dims();
    S.x = G.textEdge;
    paint();

    const ctx = gsap.context(() => {
      if (reduce) {
        S.x = G.textEdge;
        S.heat = 0.6;
        paint();
        return;
      }
      gsap.set(flame, { scaleX: 0 });
      const ignite = () => {
        const flick = gsap.timeline({ repeat: -1 });
        for (let i = 0; i < 6; i++)
          flick.to(flame, { scaleX: gsap.utils.random(0.84, 1.12), scaleY: gsap.utils.random(0.86, 1.16), duration: gsap.utils.random(0.06, 0.12), ease: "none" });
        gsap.fromTo(torch, { rotation: mob ? 87 : -3 }, { rotation: mob ? 93 : 3, duration: 1.1, yoyo: true, repeat: -1, ease: "sine.inOut" });
      };
      gsap
        .timeline({ delay: 0.3 })
        .to(flame, { scaleX: 1, duration: 0.35, ease: "back.out(2)", onStart: ignite })
        .to(S, { heat: 1, duration: 0.4, onUpdate: paint }, "<")
        .fromTo(S, { x: () => G.textEdge * 0.84 }, { x: () => G.textEdge, duration: 1.6, ease: "power2.out", onUpdate: paint }, "<.1")
        .from(`.${styles.hint}`, { opacity: 0, y: -8, duration: 0.5 }, 1.8);
      gsap
        .timeline({
          scrollTrigger: { trigger: stage.parentElement, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
          onUpdate: paint,
        })
        .fromTo(S, { x: () => G.textEdge }, { x: () => G.span * 1.14 + 420, ease: "none", duration: 0.5, immediateRender: false })
        .to({}, { duration: 0.08 })
        .fromTo(S, { w: 0 }, { w: 1, ease: "power2.inOut", duration: 0.42, immediateRender: false });
      gsap.to(`.${styles.hint}`, { opacity: 0, scrollTrigger: { trigger: stage.parentElement, start: "top top", end: "+=200", scrub: true } });
    }, stage);

    const onResize = () => {
      dims();
      paint();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="imp-h1">
      <div className={styles.stage} ref={stageRef}>
        <figure className={`${styles.photo} ${styles.before}`}>
          <Image src="/imperpre/obra-proceso-equipo.jpg" alt="Equipo de Imperpre trabajando sobre una losa de concreto desgastada" fill priority sizes="100vw" />
          <figcaption>{hero.before}</figcaption>
        </figure>
        <figure className={`${styles.photo} ${styles.after}`}>
          <Image src="/imperpre/obra-resultado-panoramica-hero.jpg" alt="Azotea con membrana prefabricada gris instalada, con juntas y bajante visibles" fill sizes="100vw" />
          <figcaption>{hero.after}</figcaption>
        </figure>
        <div className={`${styles.sheet} ${styles.granule}`}>
          <span className={styles.melt} />
          <span className={styles.selv} />
          <div className={styles.print}>
            <span className={styles.kick}>
              <i />
              {hero.kicker}
            </span>
            <h1 id="imp-h1">{hero.title}</h1>
            <p>{hero.body}</p>
            <div className={styles.ctas}>
              <a className={styles.btn} href="#valoracion">
                {hero.primary}
              </a>
              <a className={`${styles.btn} ${styles.btnGhost}`} href="#revision">
                {hero.secondary}
              </a>
            </div>
            <span className={styles.note}>{hero.note}</span>
          </div>
        </div>
        <div className={styles.roll} aria-hidden="true" />
        <div className={styles.heat} aria-hidden="true" />
        <div className={styles.torch} aria-hidden="true">
          <svg viewBox="0 0 640 120" preserveAspectRatio="xMinYMid meet">
            <defs>
              <radialGradient id="impFl" cx="1" cy=".5" r="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset=".12" stopColor="#9fd6ff" />
                <stop offset=".28" stopColor="#4aa3ff" stopOpacity=".9" />
                <stop offset=".5" stopColor="#ff8a2a" stopOpacity=".85" />
                <stop offset=".75" stopColor="#d2231c" stopOpacity=".45" />
                <stop offset="1" stopColor="#d2231c" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="impSteel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e9ebec" />
                <stop offset=".5" stopColor="#9aa0a5" />
                <stop offset="1" stopColor="#4c5156" />
              </linearGradient>
              <linearGradient id="impBrass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f1d58a" />
                <stop offset=".5" stopColor="#b8892c" />
                <stop offset="1" stopColor="#6e4f12" />
              </linearGradient>
            </defs>
            <g className={styles.flame}>
              <path d="M118 60 C 80 28, 30 38, 0 60 C 30 82, 80 92, 118 60 Z" fill="url(#impFl)" />
              <path d="M118 60 C 96 48, 70 52, 56 60 C 70 68, 96 72, 118 60 Z" fill="#e8f6ff" opacity=".9" />
            </g>
            <path d="M118 44 L170 50 L170 70 L118 76 Z" fill="url(#impSteel)" />
            <rect x="170" y="54" width="300" height="12" rx="3" fill="url(#impSteel)" />
            <rect x="455" y="48" width="24" height="24" rx="4" fill="url(#impBrass)" />
            <path d="M478 50 L612 46 Q628 46 628 60 Q628 74 612 74 L478 70 Z" fill="#2b2e31" />
            <path d="M486 52 L606 49" stroke="#53585d" strokeWidth="2" />
            <path d="M500 74 Q 515 96 540 92" stroke="#2b2e31" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M628 60 Q 660 60 700 74" stroke="#1d1f22" strokeWidth="9" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <span className={styles.hint}>{hero.hint}</span>
      </div>
    </section>
  );
}
