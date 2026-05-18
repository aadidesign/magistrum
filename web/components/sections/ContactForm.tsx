"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Accept an international phone number with country code.
// Allowed: leading + or 00, then 8–15 digits (spaces / dashes / parentheses ignored).
const phoneRegex = /^(?:\+|00)\s?\d[\d\s\-()]{7,18}\d$/;

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Email must be a valid address"),
  phone: z
    .string()
    .min(8, "Phone number is required")
    .regex(phoneRegex, "Please include your country code, e.g. +971 50 123 4567"),
  service: z.string().min(1, "Please pick a service"),
  message: z.string().max(500, "Keep it under 500 characters").optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm to proceed" }) }),
  bot_field: z.string().max(0).optional(), // honeypot
});

type FormVals = z.infer<typeof schema>;

export function ContactForm({ services }: { services: readonly { slug: string; name: string }[] }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormVals>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { service: "" },
  });

  async function onSubmit(values: FormVals) {
    setServerError(null);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!r.ok) throw new Error("Submission failed");
      const data = await r.json();
      router.push(`/thank-you?lead=${data.leadId || ""}`);
    } catch (e: any) {
      setServerError("Something went wrong. Please WhatsApp us or try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {serverError ? (
        <div role="alert" className="bg-red-50 border border-danger text-danger px-4 py-3 rounded-lg text-sm">{serverError}</div>
      ) : null}
      <p className="text-xs text-ink-muted"><span className="text-danger">*</span> required</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="First name" required placeholder="e.g. Aisha" {...register("firstName")} error={errors.firstName?.message} autoComplete="given-name" />
        <Input label="Last name" required placeholder="e.g. Al Mansoori" {...register("lastName")} error={errors.lastName?.message} autoComplete="family-name" />
      </div>
      <Input
        label="Company name"
        hint="Your business or organisation"
        required
        placeholder="e.g. Acme Trading LLC"
        {...register("company")}
        error={errors.company?.message}
        autoComplete="organization"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Work email"
          type="email"
          required
          placeholder="you@company.com"
          {...register("email")}
          error={errors.email?.message}
          autoComplete="email"
          inputMode="email"
        />
        <Input
          label="Phone number"
          type="tel"
          required
          hint="Include country code (e.g. +971 for UAE, +91 for India)"
          placeholder="+971 50 123 4567"
          {...register("phone")}
          error={errors.phone?.message}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
      <Select label="Service of interest" required {...register("service")} error={errors.service?.message}>
        <option value="" disabled>— Select one —</option>
        {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
      </Select>
      <Textarea label="Tell us a bit more (optional)" hint="Current stack, team size, deadline, what's tripping you up — anything that helps us prepare." {...register("message")} error={errors.message?.message} />

      <label className="flex items-start gap-2 text-sm text-ink-secondary cursor-pointer">
        <input type="checkbox" {...register("consent")} className="mt-1 accent-navy-700" />
        <span>I agree to be contacted about this enquiry. <span className="text-ink-muted">(See our Privacy Policy.)</span></span>
      </label>
      {errors.consent ? <p className="error">{errors.consent.message as string}</p> : null}

      {/* Honeypot, hidden from real users */}
      <input type="text" tabIndex={-1} aria-hidden="true" autoComplete="off" {...register("bot_field")} style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

      <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
