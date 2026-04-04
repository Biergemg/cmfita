import { Section } from "@/components/ui/section";
import { routeCopy } from "@/data/locale-copy";
import { certifications } from "@/data/site-content";
import type { Locale } from "@/types/content";

export function Certifications({ locale }: { locale: Locale }) {
  const copy = routeCopy[locale].certifications;
  const items = certifications[locale];

  return (
    <Section className="bg-industrial-950 border-t border-industrial-800">
      <div className="mb-12 text-center">
        <div className="section-kicker justify-center">Validación y contacto</div>
        <h2 className="mb-4 text-4xl text-steel-light md:text-5xl">{copy.title}</h2>
        <p className="mx-auto max-w-3xl text-lg text-industrial-400">{copy.subtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.referenceUrl}
            className="premium-card rounded-sm p-8 transition-colors hover:border-signal-copper/50"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-industrial-400">{item.badgeLabel}</p>
            <h3 className="text-2xl text-steel-light">{item.name}</h3>
            <p className="mt-3 text-industrial-300">{item.issuer}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
