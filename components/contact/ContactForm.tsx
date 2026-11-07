"use client";

import { Mail, Send } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { contactTopics } from "@/lib/pages";
import { site, whatsappHref } from "@/lib/site";

type Fields = { name: string; business: string; phone: string; topic: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", business: "", phone: "", topic: "", message: "" };

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "נא לכתוב שם (לפחות 2 תווים).";
  if (f.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(f.phone.trim()))
    errors.phone = "מספר הטלפון לא נראה תקין. אפשר גם להשאיר ריק.";
  if (f.message.trim().length < 5) errors.message = "ספרו לנו בכמה מילים מה תקוע אצלכם.";
  return errors;
}

function compose(f: Fields) {
  return [
    "היי, הגעתי מהאתר של קורן.נט.",
    `שם: ${f.name.trim()}`,
    f.business.trim() ? `עסק: ${f.business.trim()}` : null,
    f.phone.trim() ? `טלפון: ${f.phone.trim()}` : null,
    f.topic ? `נושא: ${f.topic}` : null,
    "",
    f.message.trim(),
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

const inputClass =
  "w-full rounded-2xl border border-ink/20 bg-paper px-4 py-3.5 text-base text-ink transition-colors placeholder:text-ink/65 hover:border-ink/40 focus:border-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink aria-[invalid=true]:border-saffron aria-[invalid=true]:bg-saffron/[0.06]";

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();
  const noticeId = `${id}-notice`;

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const channel = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value ?? "whatsapp";
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus("");
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const text = compose(fields);
    if (channel === "email") {
      const subject = `פנייה מהאתר — ${fields.name.trim()}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setStatus("נפתחה תוכנת הדואר שלכם עם ההודעה מוכנה — נשאר רק ללחוץ ״שליחה״.");
    } else {
      window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
      setStatus("נפתח WhatsApp עם ההודעה מוכנה — נשאר רק ללחוץ ״שליחה״.");
    }
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={noticeId}
      className="rounded-[2rem] border border-ink/10 bg-paper p-6 md:p-10"
    >
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">ספרו לנו מה תקוע</h2>
      <p className="mt-2 text-ink/75">
        שדות המסומנים ב־<span aria-hidden>*</span>
        <span className="sr-only">כוכבית</span> הם שדות חובה.
      </p>

      {errorCount > 0 && (
        <div role="alert" className="mt-6 rounded-2xl border border-saffron bg-saffron/10 px-4 py-3 text-[15px] font-medium">
          יש {errorCount === 1 ? "שדה אחד" : `${errorCount} שדות`} שצריך לתקן לפני השליחה.
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-semibold">
            שם מלא <span aria-hidden>*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
          />
          {errors.name && (
            <p id={`${id}-name-err`} className="mt-1.5 text-sm font-medium text-ink">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-business`} className="mb-2 block text-sm font-semibold">
            שם העסק
          </label>
          <input
            id={`${id}-business`}
            name="business"
            autoComplete="organization"
            value={fields.business}
            onChange={(e) => set("business", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-phone`} className="mb-2 block text-sm font-semibold">
            טלפון לחזרה
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={`${inputClass} text-end`}
          />
          {errors.phone && (
            <p id={`${id}-phone-err`} className="mt-1.5 text-sm font-medium text-ink">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold">על מה תרצו לדבר?</legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((topic) => {
            const checked = fields.topic === topic;
            return (
              <label
                key={topic}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                  checked ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={topic}
                  checked={checked}
                  onChange={() => set("topic", topic)}
                  className="sr-only"
                />
                {topic}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-semibold">
          מה הכי תקוע אצלכם כרגע? <span aria-hidden>*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${inputClass} resize-y`}
        />
        {errors.message && (
          <p id={`${id}-message-err`} className="mt-1.5 text-sm font-medium text-ink">
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex h-14 items-center gap-3 rounded-full bg-ink ps-6 pe-2 font-semibold text-paper transition-transform active:scale-[0.97]"
        >
          שליחה בוואטסאפ
          <span aria-hidden className="grid size-10 place-items-center rounded-full bg-signal text-ink">
            <WhatsAppIcon className="size-5" />
          </span>
        </button>
        <button
          type="submit"
          value="email"
          className="inline-flex h-14 items-center gap-3 rounded-full border border-ink/25 ps-6 pe-2 font-semibold transition-colors hover:border-ink active:scale-[0.97]"
        >
          שליחה במייל
          <span aria-hidden className="grid size-10 place-items-center rounded-full bg-ink/[0.07]">
            <Mail className="size-5" />
          </span>
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-4 flex items-center gap-2 text-[15px] font-medium empty:hidden">
        {status && <Send className="size-4 shrink-0" aria-hidden />}
        {status}
      </p>

      {/* Privacy notice at the point of collection (Privacy Protection Law, s. 11 / Amendment 13) */}
      <p id={noticeId} className="mt-6 rounded-2xl bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink/80">
        <strong className="text-ink">על הפרטים שלכם:</strong> מסירת הפרטים נעשית מרצונכם ואינה חובה על פי
        חוק. האתר לא שומר אותם — הלחיצה על ״שליחה״ פותחת את WhatsApp או את תוכנת הדואר שלכם עם ההודעה מוכנה,
        והפרטים יגיעו אלינו רק אם תבחרו לשלוח. נשתמש בהם כדי לחזור אליכם ולטפל בפנייה בלבד, ולא נשלח דיוור
        שיווקי ללא הסכמה מפורשת. פרטים נוספים ב
        <Link href="/privacy" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
          מדיניות הפרטיות
        </Link>
        .
      </p>
    </form>
  );
}
