import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MdxContent } from "@/components/content/MdxContent";
import { Button } from "@/components/ui/button";
import { routeCopy } from "@/data/locale-copy";
import { getServiceBySlug, getServices } from "@/lib/content";
import { getBreadcrumbSchema, getServiceSchema } from "@/lib/schema";
import { getLocaleUrl } from "@/lib/site";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/types/content";

export async function generateStaticParams() {
  const locales: Locale[] = ["es"];
  const params = await Promise.all(locales.map(async (locale) => (await getServices(locale)).map((service) => ({ locale, slug: service.slug }))));
  return params.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  try {
    const service = await getServiceBySlug(locale, slug);
    return {
      title: service.frontmatter.seoTitle,
      description: service.frontmatter.seoDescription,
      alternates: { canonical: getLocaleUrl(locale, `/services/${slug}`) ?? `/${locale}/services/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].services;

  try {
    const service = await getServiceBySlug(locale, slug);
    const url = getLocaleUrl(locale, `/services/${slug}`) ?? `/${locale}/services/${slug}`;
    const serviceSchema = getServiceSchema({ localeUrl: url, title: service.frontmatter.title, description: service.frontmatter.seoDescription });
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: locale === "es" ? "Inicio" : "Home", item: getLocaleUrl(locale) ?? `/${locale}` },
      { name: copy.breadcrumb, item: getLocaleUrl(locale, "/services") ?? `/${locale}/services` },
      { name: service.frontmatter.title, item: url },
    ]);

    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <section className="container mx-auto max-w-5xl px-6 pb-20">
            <div className="mb-10">
              <Link href="/services" className="text-sm uppercase tracking-[0.18em] text-industrial-400 underline underline-offset-4">{copy.breadcrumb}</Link>
              <h1 className="mt-6 text-5xl text-steel-light md:text-6xl">{service.frontmatter.title}</h1>
              <p className="mt-4 text-lg text-industrial-300">{service.frontmatter.excerpt}</p>
            </div>
            <div className="relative mb-10 h-[380px] overflow-hidden rounded-sm border border-industrial-800">
              <Image src={service.frontmatter.heroImage} alt={service.frontmatter.coverAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1100px" />
            </div>
            <div className="mb-10 grid gap-4 md:grid-cols-2">
              <div className="glass-panel rounded-sm border border-industrial-800 p-6">
                <h2 className="mb-4 text-2xl text-steel-light">{locale === "es" ? "Capacidades" : "Capabilities"}</h2>
                <ul className="space-y-2 text-industrial-300">{service.frontmatter.capabilities.map((item) => <li key={item}>• {item}</li>)}</ul>
              </div>
              <div className="glass-panel rounded-sm border border-industrial-800 p-6">
                <h2 className="mb-4 text-2xl text-steel-light">{locale === "es" ? "Entregables" : "Deliverables"}</h2>
                <ul className="space-y-2 text-industrial-300">{service.frontmatter.deliverables.map((item) => <li key={item}>• {item}</li>)}</ul>
              </div>
            </div>
            <MdxContent>{service.content}</MdxContent>
            <div className="mt-12 rounded-sm border border-industrial-800 bg-industrial-900 p-8">
              <h2 className="mb-4 text-3xl text-steel-light">FAQ</h2>
              <div className="space-y-4">{service.frontmatter.faqs.map((faq) => <div key={faq.question}><h3 className="text-xl text-steel-light">{faq.question}</h3><p className="mt-2 text-industrial-300">{faq.answer}</p></div>)}</div>
            </div>
            <div className="mt-10">
              <Link href="/#contact" className="inline-flex rounded-industrial bg-gradient-to-b from-steel-light to-steel-metallic px-6 py-3 font-teko text-lg uppercase tracking-wider text-industrial-950">{service.frontmatter.ctaLabel}</Link>
              <p className="mt-4 text-sm text-industrial-400">{locale === "es" ? "Usa el formulario del inicio para iniciar tu RFQ o propuesta técnica." : "Use the home-page contact form to start your RFQ or technical proposal."}</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}
