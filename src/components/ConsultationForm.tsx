"use client";

import { useRef, useState, type FormEvent } from "react";
import { consultation, locations } from "@/content/site";
import styles from "./Consultation.module.css";

type Field = "firstName" | "phone" | "email";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? "").trim();
  if (!get("firstName")) errors.firstName = consultation.errors.firstName;
  if (get("phone").replace(/\D/g, "").length < 7) errors.phone = consultation.errors.phone;
  if (get("email") && !EMAIL.test(get("email"))) errors.email = consultation.errors.email;
  return errors;
}

export function ConsultationForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentMessage, setSentMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const el = e.currentTarget;
    const data = new FormData(el);
    const found = validate(data);
    setErrors(found);
    const firstInvalid = (["firstName", "phone", "email"] as const).find((k) => found[k]);
    if (firstInvalid) {
      const target = el.elements.namedItem(firstInvalid);
      if (target instanceof HTMLElement) target.focus();
      return;
    }

    setStatus("sending");
    const payload = Object.fromEntries(data.entries());
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean };
      if (!res.ok || !json.ok) throw new Error("Request failed");
      setSentMessage(consultation.success(String(payload.firstName).trim(), String(payload.studio)));
      setStatus("sent");
      form.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldProps = (name: Field) => ({
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onInput: () => errors[name] && setErrors((prev) => ({ ...prev, [name]: undefined })),
  });
  const errorText = (name: Field) =>
    errors[name] && (
      <span className={styles.err} id={`${name}-error`}>
        {errors[name]}
      </span>
    );

  return (
    <form ref={form} className={styles.card} noValidate onSubmit={onSubmit}>
      <label>
        First name
        <input {...fieldProps("firstName")} autoComplete="given-name" required aria-required="true" />
        {errorText("firstName")}
      </label>
      <label>
        Last name
        <input name="lastName" autoComplete="family-name" />
      </label>
      <label>
        Phone
        <input {...fieldProps("phone")} type="tel" autoComplete="tel" required aria-required="true" />
        {errorText("phone")}
      </label>
      <label>
        Email
        <input {...fieldProps("email")} type="email" autoComplete="email" />
        {errorText("email")}
      </label>
      <label>
        Interested in
        <select name="treatment">
          {consultation.treatmentOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label>
        Preferred studio
        <select name="studio">
          {locations.studios.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>
      </label>
      <label className={styles.full}>
        Anything we should know?
        <textarea name="message" rows={3} />
      </label>
      <div className={styles.full}>
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : consultation.submit} <span className="arr">→</span>
        </button>
      </div>
      <div className={styles.full} role="status" aria-live="polite">
        {status === "sent" ? (
          <p className={styles.sent}>{sentMessage}</p>
        ) : status === "error" ? (
          <p className={styles.formError}>{consultation.errors.server}</p>
        ) : (
          <p className={styles.note}>{consultation.note}</p>
        )}
      </div>
    </form>
  );
}
