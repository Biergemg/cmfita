import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactFormSchema } from "@/lib/contact";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const rateLimit = checkRateLimit(getIp(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form submission.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!resend || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
      return NextResponse.json(
        { ok: false, error: "Contact service is not configured." },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: data.email,
      subject: `FITA lead · ${data.projectType} · ${data.company}`,
      text: [
        `Name: ${data.name}`,
        `Company: ${data.company}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Project type: ${data.projectType}`,
        `Budget: ${data.budget || "N/A"}`,
        `Timeline: ${data.timeline || "N/A"}`,
        `Location: ${data.location || "N/A"}`,
        `Locale: ${data.locale}`,
        "",
        data.message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error while sending the request." },
      { status: 500 },
    );
  }
}
