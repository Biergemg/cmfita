import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeCopy } from "@/data/locale-copy";
import { getBlogPosts } from "@/lib/content";
import { getLocaleUrl } from "@/lib/site";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].blog;
  return { title: copy.title, description: copy.subtitle, alternates: { canonical: getLocaleUrl(locale, "/blog") ?? `/${locale}/blog` } };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].blog;
  const posts = await getBlogPosts(locale);

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
        <section className="container mx-auto max-w-6xl px-6 pb-20">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl text-steel-light md:text-6xl">{copy.title}</h1>
            <p className="mx-auto max-w-3xl text-lg text-industrial-400">{copy.subtitle}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="glass-panel overflow-hidden rounded-sm border border-industrial-800">
                <div className="relative h-72">
                  <Image src={post.coverImage} alt={post.coverAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className="p-8">
                  <p className="text-sm uppercase tracking-[0.18em] text-industrial-400">{new Date(post.date).toLocaleDateString(locale)}</p>
                  <h2 className="mt-3 text-3xl text-steel-light">{post.title}</h2>
                  <p className="mt-3 text-industrial-300">{post.summary}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm uppercase tracking-[0.18em] text-steel-light underline underline-offset-4">{copy.readMore}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
