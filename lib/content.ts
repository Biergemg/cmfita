import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import type { BlogPostMeta, Locale, ServicePage } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

type ContentKind = "blog" | "services";

async function readMdxDirectory(kind: ContentKind, locale: Locale) {
  const dir = path.join(CONTENT_ROOT, kind, locale);
  const entries = await fs.readdir(dir);
  return entries.filter((file) => file.endsWith(".mdx"));
}

async function readMdxFile(kind: ContentKind, locale: Locale, slug: string) {
  const filePath = path.join(CONTENT_ROOT, kind, locale, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getServices(locale: Locale): Promise<ServicePage[]> {
  const files = await readMdxDirectory("services", locale);
  const services = await Promise.all(
    files.map(async (file) => {
      const source = await readMdxFile("services", locale, file.replace(/\.mdx$/, ""));
      const { data } = matter(source);
      return data as ServicePage;
    }),
  );

  return services.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getServiceBySlug(locale: Locale, slug: string) {
  const source = await readMdxFile("services", locale, slug);
  const { content, data } = matter(source);
  const compiled = await compileMDX<ServicePage>({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] }, parseFrontmatter: false },
  });

  return {
    frontmatter: data as ServicePage,
    content: compiled.content,
  };
}

export async function getBlogPosts(locale: Locale): Promise<BlogPostMeta[]> {
  const files = await readMdxDirectory("blog", locale);
  const posts = await Promise.all(
    files.map(async (file) => {
      const source = await readMdxFile("blog", locale, file.replace(/\.mdx$/, ""));
      const { data } = matter(source);
      return data as BlogPostMeta;
    }),
  );

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getBlogPostBySlug(locale: Locale, slug: string) {
  const source = await readMdxFile("blog", locale, slug);
  const { content, data } = matter(source);
  const compiled = await compileMDX<BlogPostMeta>({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] }, parseFrontmatter: false },
  });

  return {
    frontmatter: data as BlogPostMeta,
    content: compiled.content,
  };
}
