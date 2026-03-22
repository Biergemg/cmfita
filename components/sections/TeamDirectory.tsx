import Image from "next/image";

import { Section } from "@/components/ui/section";
import { routeCopy } from "@/data/locale-copy";
import { teamMembers } from "@/data/site-content";
import type { Locale } from "@/types/content";

export function TeamDirectory({ locale }: { locale: Locale }) {
  const copy = routeCopy[locale].team;
  const members = teamMembers[locale];

  return (
    <Section className="bg-industrial-900 border-t border-industrial-800">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl text-steel-light md:text-6xl">{copy.title}</h1>
        <p className="mx-auto max-w-3xl text-lg text-industrial-400">{copy.subtitle}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {members.map((member) => (
          <article key={member.name} className="glass-panel overflow-hidden rounded-sm border border-industrial-800">
            <div className="relative h-80">
              <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="p-8">
              <h2 className="text-3xl text-steel-light">{member.name}</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-industrial-400">{member.role}</p>
              <p className="mt-4 text-industrial-300">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
