"use client";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { routeCopy } from "@/data/locale-copy";
import { testimonials } from "@/data/site-content";
import { trackTestimonialCtaClick } from "@/lib/analytics";
import type { Locale } from "@/types/content";

export function Testimonials({ locale }: { locale: Locale }) {
  const copy = routeCopy[locale].testimonials;
  const items = testimonials[locale];

  return (
    <Section className="bg-industrial-900 border-t border-industrial-800">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{copy.title}</h2>
        <p className="mx-auto max-w-3xl text-lg text-industrial-400">{copy.subtitle}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {items.map((item) => (
          <article key={`${item.name}-${item.company}`} className="glass-panel rounded-sm border border-industrial-800 p-8">
            <p className="mb-6 text-lg leading-relaxed text-industrial-200">“{item.quote}”</p>
            <div className="border-t border-industrial-800 pt-4">
              <h3 className="text-2xl text-steel-light">{item.name}</h3>
              <p className="text-sm uppercase tracking-[0.18em] text-industrial-400">{item.role}</p>
              <p className="mt-2 text-industrial-300">{item.company}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          variant="metallic"
          onClick={() => {
            trackTestimonialCtaClick();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {locale === "es" ? "Solicitar referencias" : "Request references"}
        </Button>
      </div>
    </Section>
  );
}
