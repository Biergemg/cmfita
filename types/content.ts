export type Locale = "en" | "es";

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  budget?: string;
  timeline?: string;
  location?: string;
  locale: Locale;
  website?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  scope: string;
  location: string;
  summary: string;
  deliverables: string[];
  metrics: Array<{ label: string; value: string }>;
  gallery: Array<{ src: string; alt: string }>;
  ctaLabel: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  referenceUrl: string;
  badgeLabel: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ServicePage {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  coverAlt: string;
  capabilities: string[];
  deliverables: string[];
  faqs: Array<{ question: string; answer: string }>;
  ctaLabel: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  locale: Locale;
}
