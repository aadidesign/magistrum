import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FieldProps>(
  function Input({ label, hint, error, required, id, className, ...rest }, ref) {
    const inputId = id || rest.name;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    return (
      <div>
        <label htmlFor={inputId} className="label">
          {label}
          {required ? <span className="text-danger ml-0.5" aria-hidden> *</span> : null}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          className={cn(
            "w-full px-4 py-3 bg-surface-elevated border border-border-strong rounded-lg text-ink placeholder:text-ink-muted transition-colors duration-fast focus:border-navy-600 focus:ring-2 focus:ring-navy-100",
            error ? "border-danger focus:border-danger focus:ring-red-100" : "",
            className,
          )}
          {...rest}
        />
        {hint && !error ? <p id={hintId} className="helper">{hint}</p> : null}
        {error ? <p id={errorId} className="error" role="alert">{error}</p> : null}
      </div>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps>(
  function Textarea({ label, hint, error, required, id, className, ...rest }, ref) {
    const inputId = id || rest.name;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;
    return (
      <div>
        <label htmlFor={inputId} className="label">
          {label}
          {required ? <span className="text-danger ml-0.5" aria-hidden> *</span> : null}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
          rows={4}
          className={cn(
            "w-full px-4 py-3 bg-surface-elevated border border-border-strong rounded-lg text-ink placeholder:text-ink-muted transition-colors duration-fast focus:border-navy-600 focus:ring-2 focus:ring-navy-100 resize-y",
            error ? "border-danger focus:border-danger focus:ring-red-100" : "",
            className,
          )}
          {...rest}
        />
        {hint && !error ? <p id={hintId} className="helper">{hint}</p> : null}
        {error ? <p id={errorId} className="error" role="alert">{error}</p> : null}
      </div>
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & FieldProps>(
  function Select({ label, hint, error, required, id, className, children, ...rest }, ref) {
    const inputId = id || rest.name;
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div>
        <label htmlFor={inputId} className="label">
          {label}
          {required ? <span className="text-danger ml-0.5" aria-hidden> *</span> : null}
        </label>
        <select
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            "w-full px-4 py-3 bg-surface-elevated border border-border-strong rounded-lg text-ink transition-colors duration-fast focus:border-navy-600 focus:ring-2 focus:ring-navy-100",
            error ? "border-danger" : "",
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        {error ? <p id={errorId} className="error" role="alert">{error}</p> : null}
      </div>
    );
  },
);
