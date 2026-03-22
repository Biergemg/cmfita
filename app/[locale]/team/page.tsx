import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { TeamDirectory } from "@/components/sections/TeamDirectory";
import { routeCopy } from "@/data/locale-copy";
import { getLocaleUrl } from "@/lib/site";
import type { Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].team;
  return { title: copy.title, description: copy.subtitle, alternates: { canonical: getLocaleUrl(locale, "/team") ?? `/${locale}/team` } };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
        <TeamDirectory locale={locale} />
      </main>
      <Footer />
    </>
  );
}
