import { z } from "zod";

export const projectTypes = [
  "structural-fabrication",
  "structural-installation",
  "maintenance-reinforcement",
  "electrical-infrastructure",
  "civil-infrastructure",
  "rfq",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().min(2).max(120),
  email: z.email().max(120),
  phone: z.string().trim().min(7).max(30),
  projectType: z.string().trim().min(2).max(80),
  message: z.string().trim().min(20).max(2000),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  locale: z.enum(["en", "es"]),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
