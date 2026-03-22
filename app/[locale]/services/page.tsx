import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeCopy } from "@/data/locale-copy";
import { getServices } from "@/lib/content";
import { getLocaleUrl } from "@/lib/site";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].services;
  return { title: copy.title, description: copy.subtitle, alternates: { canonical: getLocaleUrl(locale, "/services") ?? `/${locale}/services` } };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].services;
  const services = await getServices(locale);

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
        <section className="container mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl text-steel-light md:text-6xl">{copy.title}</h1>
            <p className="mx-auto max-w-3xl text-lg text-industrial-400">{copy.subtitle}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article key={service.slug} className="glass-panel rounded-sm border border-industrial-800 p-8">
                <h2 className="text-3xl text-steel-light">{service.title}</h2>
                <p className="mt-3 text-industrial-300">{service.excerpt}</p>
                <ul className="mt-6 space-y-2 text-sm text-industrial-400">
                  {service.capabilities.slice(0, 3).map((capability) => <li key={capability}>• {capability}</li>)}
                </ul>
                <Link href={`/services/${service.slug}`} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-steel-light underline underline-offset-4">
                  {copy.readMore}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
