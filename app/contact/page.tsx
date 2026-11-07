import { Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { contactSteps } from "@/lib/pages";
import { mailHref, site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "יצירת קשר",
  description: `שיחת היכרות של 20 דקות, בלי התחייבות. וואטסאפ, טלפון ${site.phoneDisplay} או מייל ${site.email}.`,
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    href: whatsappHref(),
    external: true,
    label: "וואטסאפ",
    value: "הדרך הכי מהירה",
    icon: WhatsAppIcon,
    primary: true,
  },
  { href: telHref, external: false, label: "טלפון", value: site.phoneDisplay, icon: Phone, primary: false, ltr: true },
  { href: mailHref, external: false, label: "דוא״ל", value: site.email, icon: Mail, primary: false, ltr: true },
];

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        label="יצירת קשר"
        title="בואו נדבר"
        serif="על העסק שלכם."
        intro="שיחת היכרות של 20 דקות — בלי מצגות ובלי התחייבות. מספרים לנו איפה העסק נתקע, ויוצאים עם תמונה ברורה של הצעד הראשון."
      />

      <section aria-label="דרכי התקשרות וטופס פנייה" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <ul className="flex flex-col gap-3">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className={`group flex items-center gap-5 rounded-[1.75rem] p-5 transition-colors md:p-6 ${
                        c.primary ? "bg-ink text-paper hover:bg-ink-3" : "bg-paper-2 hover:bg-paper-3"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`grid size-14 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:-rotate-12 ${
                          c.primary ? "bg-signal text-ink" : "bg-ink text-signal"
                        }`}
                      >
                        <Icon className="size-6" />
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-sm font-semibold ${c.primary ? "text-paper/75" : "text-ink/70"}`}>
                          {c.label}
                          {c.external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
                        </span>
                        <span dir={c.ltr ? "ltr" : undefined} className="block truncate text-xl font-bold md:text-2xl">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div>
              <h2 className="text-xl font-bold tracking-tight">מה קורה אחרי שפונים?</h2>
              <ol className="mt-5 flex flex-col gap-4">
                {contactSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-signal font-mono text-xs font-bold text-ink">
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{s.title}</span>
                      <span className="block leading-relaxed text-ink/75">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="rounded-2xl border border-ink/10 px-5 py-4 text-[15px] leading-relaxed text-ink/80">
              <strong className="text-ink">צריכים התאמת נגישות?</strong> אפשר לפנות בכל ערוץ שנוח לכם, ולבקש
              התאמות לשיחה או לפגישה. פרטים נוספים ב
              <Link href="/accessibility" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
                הצהרת הנגישות
              </Link>
              .
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
