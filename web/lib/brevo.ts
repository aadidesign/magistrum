// Lightweight Brevo (Sendinblue) transactional email client.
// Uses fetch, no SDK dependency.

type SendArgs = {
  subject: string;
  htmlBody: string;
  toEmail?: string;
};

export async function sendBrevoEmail({ subject, htmlBody, toEmail }: SendArgs): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const defaultTo = process.env.BREVO_TO_EMAIL;
  const to = toEmail || defaultTo;
  if (!apiKey || !fromEmail || !to) {
    console.warn("[brevo] Missing env config; skipping email send.");
    return false;
  }
  try {
    const r = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Magistrum Pitch Site", email: fromEmail },
        to: [{ email: to }],
        subject,
        htmlContent: htmlBody,
      }),
    });
    if (!r.ok) {
      console.error("[brevo] failed", r.status, await r.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[brevo] exception", e);
    return false;
  }
}
