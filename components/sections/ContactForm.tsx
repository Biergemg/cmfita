"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { routeCopy } from "@/data/locale-copy";
import { contactFormSchema, projectTypes } from "@/lib/contact";
import {
  trackContactFormFailed,
  trackContactFormStarted,
  trackContactFormSubmitted,
  trackRfqSubmitted,
} from "@/lib/analytics";
import type { Locale } from "@/types/content";
import type { ContactFormInput } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = routeCopy[locale].contact;
  const [serverState, setServerState] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
      budget: "",
      timeline: "",
      location: "",
      locale,
      website: "",
    },
  });

  const labels = locale === "es"
    ? {
        name: "Nombre",
        company: "Empresa",
        email: "Correo",
        phone: "Teléfono",
        projectType: "Tipo de proyecto",
        message: "Mensaje",
        budget: "Presupuesto estimado",
        timeline: "Plazo objetivo",
        location: "Ubicación del proyecto",
      }
    : {
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        projectType: "Project type",
        message: "Message",
        budget: "Estimated budget",
        timeline: "Target timeline",
        location: "Project location",
      };

  async function onSubmit(values: ContactFormInput) {
    setServerState(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { ok: boolean; error?: string };

      if (!response.ok || !result.ok) {
        trackContactFormFailed(result.error ?? "unknown");
        setServerState({ type: "error", message: copy.error });
        return;
      }

      trackContactFormSubmitted(values.projectType);
      if (values.projectType === "rfq") {
        trackRfqSubmitted();
      }
      form.reset({ ...form.getValues(), name: "", company: "", email: "", phone: "", projectType: "", message: "", budget: "", timeline: "", location: "", website: "" });
      setServerState({ type: "success", message: copy.success });
    } catch {
      trackContactFormFailed("network");
      setServerState({ type: "error", message: copy.error });
    }
  }

  return (
    <div className="glass-panel rounded-sm border border-industrial-800 p-8">
      <div className="mb-6">
        <h3 className="text-2xl text-steel-light">{copy.formTitle}</h3>
        <p className="mt-2 text-industrial-400">{copy.formSubtitle}</p>
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={labels.name} error={form.formState.errors.name?.message}>
            <input
              {...form.register("name")}
              className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400"
              onFocus={() => trackContactFormStarted()}
            />
          </Field>
          <Field label={labels.company} error={form.formState.errors.company?.message}>
            <input {...form.register("company")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
          </Field>
          <Field label={labels.email} error={form.formState.errors.email?.message}>
            <input type="email" {...form.register("email")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
          </Field>
          <Field label={labels.phone} error={form.formState.errors.phone?.message}>
            <input {...form.register("phone")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
          </Field>
          <Field label={labels.projectType} error={form.formState.errors.projectType?.message}>
            <select {...form.register("projectType")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400">
              <option value="">{copy.started}</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </Field>
          <Field label={labels.budget} error={form.formState.errors.budget?.message}>
            <input {...form.register("budget")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
          </Field>
          <Field label={labels.timeline} error={form.formState.errors.timeline?.message}>
            <input {...form.register("timeline")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
          </Field>
          <Field label={labels.location} error={form.formState.errors.location?.message}>
            <input {...form.register("location")} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
          </Field>
        </div>
        <Field label={labels.message} error={form.formState.errors.message?.message}>
          <textarea {...form.register("message")} rows={6} className="w-full border border-industrial-700 bg-industrial-950 px-4 py-3 text-steel-light outline-none focus:border-industrial-400" />
        </Field>

        {serverState && (
          <p className={serverState.type === "success" ? "text-emerald-300" : "text-rose-300"}>
            {serverState.message}
          </p>
        )}

        <Button type="submit" variant="metallic" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? copy.sending : copy.submit}
        </Button>
      </form>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm text-industrial-300">
      <span className="mb-2 block uppercase tracking-[0.18em] text-industrial-400">{label}</span>
      {children}
      {error && <span className="mt-2 block text-rose-300">{error}</span>}
    </label>
  );
}
