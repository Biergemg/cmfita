"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Section } from "@/components/ui/section";

const WORKS = [
  {
    src: "/imperpre/obra-resultado-perspectiva.jpg",
    altKey: "alt1" as const,
    tagKey: "tagResult" as const,
    span: "col-span-2 row-span-2",
    aspect: "aspect-[4/3]",
    objectPosition: "50% 40%",
  },
  {
    src: "/imperpre/obra-instalacion-altura.jpg",
    altKey: "alt4" as const,
    tagKey: "tagInstall" as const,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]",
    objectPosition: "50% 30%",
  },
  {
    src: "/imperpre/obra-materiales-montacargas.jpg",
    altKey: "alt7" as const,
    tagKey: "tagMaterials" as const,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[3/4]",
    objectPosition: "50% 50%",
  },
  {
    src: "/imperpre/obra-progreso-skyline.jpg",
    altKey: "alt5" as const,
    tagKey: "tagProgress" as const,
    span: "col-span-2 row-span-1",
    aspect: "aspect-[16/7]",
    objectPosition: "50% 40%",
  },
  {
    src: "/imperpre/obra-proceso-equipo.jpg",
    altKey: "alt8" as const,
    tagKey: "tagProcess" as const,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/3]",
    objectPosition: "50% 50%",
  },
  {
    src: "/imperpre/obra-resultado-azotea-blanca-2.jpg",
    altKey: "alt2" as const,
    tagKey: "tagResult" as const,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/3]",
    objectPosition: "50% 50%",
  },
  {
    src: "/imperpre/obra-resultado-panoramica-hero.jpg",
    altKey: "alt3" as const,
    tagKey: "tagResult" as const,
    span: "col-span-1 row-span-1",
    aspect: "aspect-[4/3]",
    objectPosition: "50% 20%",
  },
  {
    src: "/imperpre/obra-resultado-atardecer.jpg",
    altKey: "alt6" as const,
    tagKey: "tagResult" as const,
    span: "col-span-3 row-span-1",
    aspect: "aspect-[21/6]",
    objectPosition: "50% 30%",
  },
] as const;

export function ImperpreWorksGallery() {
  const t = useTranslations("WorksGallery");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="trabajos"
      className="bg-industrial-950 border-t border-industrial-800"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="section-kicker justify-center">{t("eyebrow")}</div>
        <h2 className="mb-3 text-3xl font-bold text-steel-light text-balance md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-industrial-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-2">
        {WORKS.map((item) => (
          <GalleryCard key={item.src} item={item} tag={t(item.tagKey)} alt={t(item.altKey)} />
        ))}
      </div>

      {/* Mobile: 2 cols for first 6, full width for last */}
      <div className="grid grid-cols-2 gap-2 md:hidden">
        {WORKS.slice(0, 6).map((item) => (
          <div key={item.src} className="gallery-item group relative overflow-hidden rounded-sm bg-industrial-900">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={item.src}
                alt={t(item.altKey)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: item.objectPosition }}
                sizes="(max-width: 768px) 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 rounded-sm bg-industrial-950/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-industrial-400">
                {t(item.tagKey)}
              </span>
            </div>
          </div>
        ))}
        <div className="col-span-2 gallery-item group relative overflow-hidden rounded-sm bg-industrial-900">
          <div className="aspect-[21/7] relative overflow-hidden">
            <Image
              src={WORKS[7].src}
              alt={t(WORKS[7].altKey)}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ objectPosition: WORKS[7].objectPosition }}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 rounded-sm bg-industrial-950/70 px-2 py-0.5 text-[10px] uppercase tracking-widest text-industrial-400">
              {t(WORKS[7].tagKey)}
            </span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-industrial-600">
        {t("disclaimer")}
      </p>
    </Section>
  );
}

function GalleryCard({
  item,
  tag,
  alt,
}: {
  item: (typeof WORKS)[number];
  tag: string;
  alt: string;
}) {
  return (
    <div
      className={`gallery-item group relative overflow-hidden rounded-sm bg-industrial-900 ${item.span}`}
    >
      <div className={`relative overflow-hidden ${item.aspect}`}>
        <Image
          src={item.src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: item.objectPosition }}
          sizes="(max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/80 via-industrial-950/10 to-transparent" />
        {/* Tag */}
        <span className="absolute bottom-3 left-3 rounded-sm bg-industrial-950/75 px-2.5 py-1 text-[10px] uppercase tracking-widest text-industrial-400 backdrop-blur-[2px]">
          {tag}
        </span>
      </div>
    </div>
  );
}
