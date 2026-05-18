import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { sendBrevoEmail } from "@/lib/brevo";
import { business } from "@/lib/business";

const schema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  company: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  service: z.string().min(1).max(80),
  message: z.string().max(500).optional(),
  consent: z.literal(true),
  bot_field: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  if (parsed.data.bot_field) {
    return NextResponse.json({ ok: true, leadId: "ok" }); // silently drop bots
  }

  const lead = {
    ...parsed.data,
    source: "website-contact",
    createdAt: new Date(),
    userAgent: req.headers.get("user-agent") || null,
    referer: req.headers.get("referer") || null,
  };

  let leadId = "queued";
  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      const r = await db.collection("leads").insertOne(lead);
      leadId = r.insertedId.toString();
    }
  } catch (e) {
    console.error("[lead] mongo write failed", e);
  }

  // Brevo notification, non-blocking
  sendBrevoEmail({
    subject: `New lead, ${parsed.data.firstName} ${parsed.data.lastName} (${parsed.data.company})`,
    htmlBody: `
      <h2>New enquiry from the Magistrum site</h2>
      <p><strong>Name:</strong> ${parsed.data.firstName} ${parsed.data.lastName}</p>
      <p><strong>Company:</strong> ${parsed.data.company}</p>
      <p><strong>Email:</strong> <a href="mailto:${parsed.data.email}">${parsed.data.email}</a></p>
      <p><strong>Phone:</strong> ${parsed.data.phone}</p>
      <p><strong>Service:</strong> ${parsed.data.service}</p>
      <p><strong>Message:</strong> ${parsed.data.message || "(none)"}</p>
      <hr />
      <p style="color:#64748B;font-size:12px">Pitch site: ${business.name} · Lead ID: ${leadId}</p>
    `,
  }).catch((e) => console.error("[lead] brevo send failed", e));

  return NextResponse.json({ ok: true, leadId });
}
