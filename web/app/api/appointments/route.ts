import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { sendBrevoEmail } from "@/lib/brevo";

const schema = z.object({
  session_id: z.string().min(1),
  name: z.string().min(1).max(100),
  phone: z.string().min(7).max(30),
  service: z.string().max(120).optional(),
  preferred_time: z.string().max(120).optional(),
  area: z.string().max(60).optional(),
  notes: z.string().max(600).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }

  const appt = { ...parsed.data, source: "chatbot", createdAt: new Date() };
  let id = "queued";
  try {
    if (process.env.MONGODB_URI) {
      const db = await getDb();
      const r = await db.collection("appointments").insertOne(appt);
      id = r.insertedId.toString();
    }
  } catch (e) {
    console.error("[appointments] mongo write failed", e);
  }

  sendBrevoEmail({
    subject: `Chatbot booking, ${parsed.data.name}`,
    htmlBody: `
      <h2>New chatbot appointment request</h2>
      <p><strong>Name:</strong> ${parsed.data.name}</p>
      <p><strong>Phone:</strong> ${parsed.data.phone}</p>
      <p><strong>Service:</strong> ${parsed.data.service || "(unspecified)"}</p>
      <p><strong>Preferred time:</strong> ${parsed.data.preferred_time || "(unspecified)"}</p>
      <p><strong>Area:</strong> ${parsed.data.area || "(unspecified)"}</p>
      <p><strong>Notes:</strong> ${parsed.data.notes || "(none)"}</p>
      <hr />
      <p style="color:#64748B;font-size:12px">Session: ${parsed.data.session_id} · Appt ID: ${id}</p>
    `,
  }).catch((e) => console.error("[appointments] brevo send failed", e));

  return NextResponse.json({ ok: true, appointmentId: id });
}
