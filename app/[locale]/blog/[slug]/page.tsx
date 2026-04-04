import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/content/MdxContent";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeCopy } from "@/data/locale-copy";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { getBreadcrumbSchema } from "@/lib/schema";
import { getLocaleUrl } from "@/lib/site";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/types/content";

export async function generateStaticParams() {
  const locales: Locale[] = ["es"];
  const params = await Promise.all(locales.map(async (locale) => (await getBlogPosts(locale)).map((post) => ({ locale, slug: post.slug }))));
  return params.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  try {
    const post = await getBlogPostBySlug(locale, slug);
    return { title: post.frontmatter.title, description: post.frontmatter.summary, alternates: { canonical: getLocaleUrl(locale, `/blog/${slug}`) ?? `/${locale}/blog/${slug}` } };
  } catch {
    return {};
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].blog;

  try {
    const post = await getBlogPostBySlug(locale, slug);
    const url = getLocaleUrl(locale, `/blog/${slug}`) ?? `/${locale}/blog/${slug}`;
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: locale === "es" ? "Inicio" : "Home", item: getLocaleUrl(locale) ?? `/${locale}` },
      { name: copy.breadcrumb, item: getLocaleUrl(locale, "/blog") ?? `/${locale}/blog` },
      { name: post.frontmatter.title, item: url },
    ]);

    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
          <article className="container mx-auto max-w-4xl px-6 pb-20">
            <Link href="/blog" className="text-sm uppercase tracking-[0.18em] text-industrial-400 underline underline-offset-4">{copy.breadcrumb}</Link>
            <h1 className="mt-6 text-5xl text-steel-light md:text-6xl">{post.frontmatter.title}</h1>
            <p className="mt-4 text-industrial-300">{post.frontmatter.summary}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-industrial-400">{new Date(post.frontmatter.date).toLocaleDateString(locale)} · {post.frontmatter.author}</p>
            <div className="relative my-10 h-[380px] overflow-hidden rounded-sm border border-industrial-800">
              <Image src={post.frontmatter.coverImage} alt={post.frontmatter.coverAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1100px" />
            </div>
            <MdxContent>{post.content}</MdxContent>
          </article>
        </main>
        <Footer />
      </>
    );
  } catch {
    notFound();
  }
}
