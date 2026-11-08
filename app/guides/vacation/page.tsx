import { ArrowDown, ArrowUpLeft, FileDown } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Checklist } from "@/components/guides/vacation/Checklist";
import { InboxDemo } from "@/components/guides/vacation/InboxDemo";
import { Workbench } from "@/components/guides/vacation/Workbench";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillLink } from "@/components/ui/PillLink";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { automations, systemFlow, vacationGuide } from "@/lib/guides/vacation";
import { site, whatsappHref } from "@/lib/site";
import cover from "./cover.jpg";
import sunset from "./sunset.jpg";
import towel from "./towel.jpg";

export const metadata: Metadata = {
  title: vacationGuide.metaTitle,
  description: vacationGuide.metaDescription,
  alternates: { canonical: vacationGuide.href },
  // Reached only through the link in the Instagram reply: not in the menu or sitemap, not indexed.
  robots: { index: false, follow: false },
  openGraph: {
    type: "article",
    locale: "he_IL",
    siteName: site.name,
    url: vacationGuide.href,
    title: `${vacationGuide.metaTitle} · מדריך חינמי`,
    description: vacationGuide.metaDescription,
    images: [{ url: cover.src, width: cover.width, height: cover.height }],
  },
};

/** Section kicker in the site's label style, without a section number (the guide has its own 01–03). */
function Kicker({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "paper" }) {
  return (
    <p className={`flex items-center gap-3 text-sm font-medium ${tone === "ink" ? "text-ink/65" : "text-paper/70"}`}>
      <span aria-hidden className="h-px w-10 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

export default function VacationGuidePage() {
  return (
    <main id="main">
      {/* Cover */}
      <section aria-labelledby="guide-title" className="px-3 pt-24 md:px-5 md:pt-28">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink text-paper md:rounded-[3.5rem]">
          <Image
            src={cover}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="-z-20 object-cover object-[50%_72%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-b from-ink/95 via-ink/75 to-ink/10 md:bg-linear-to-l md:from-ink/95 md:via-ink/70 md:to-ink/5"
          />
          <div aria-hidden className="absolute -top-32 -right-32 -z-10 size-[28rem] rounded-full bg-signal/25 blur-3xl" />

          <div className="mx-auto flex min-h-[44rem] max-w-7xl flex-col px-6 pt-10 pb-8 md:min-h-[48rem] md:px-14 md:pt-14 md:pb-12">
            <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 bg-ink/40 py-1.5 ps-3 pe-4 text-sm font-semibold backdrop-blur">
              <span aria-hidden className="size-2.5 animate-pulse rounded-full bg-saffron motion-reduce:animate-none" />
              מדריך חינמי · מאת מאיה קורן
            </p>

            <h1
              id="guide-title"
              className="mt-10 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] font-black tracking-[-0.045em]"
            >
              <MaskLines
                lines={[
                  "3 אוטומציות",
                  "שמאפשרות לצאת",
                  <span key="3">
                    לחופש <span className="font-serif font-normal tracking-[-0.02em] text-signal">אמיתי</span>
                  </span>,
                ]}
              />
            </h1>
            <Reveal delay={0.25}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/85 md:text-xl md:leading-relaxed">
                {vacationGuide.lead}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <PillLink href="#details" variant="signal" icon={<ArrowDown className="size-5" />}>
                  מתחילים
                </PillLink>
                <a
                  href={vacationGuide.pdfHref}
                  download
                  className="inline-flex items-center gap-2 py-2 text-base font-semibold text-paper/90 underline decoration-signal decoration-2 underline-offset-[6px] transition-colors hover:text-signal"
                >
                  <FileDown className="size-5" aria-hidden />
                  הורדת המדריך כ-PDF
                  <span className="text-sm font-normal text-paper/65">({vacationGuide.pdfSize})</span>
                </a>
              </div>
            </Reveal>

            {/* Contents */}
            <nav aria-label="שלוש האוטומציות" className="mt-auto pt-14">
              <ol className="flex flex-wrap gap-2">
                {automations.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`#${a.id}`}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-ink/45 py-2 ps-2 pe-4 text-sm font-semibold backdrop-blur transition-colors duration-300 hover:border-signal hover:bg-ink/70"
                    >
                      <span className="grid size-7 place-items-center rounded-full bg-signal font-mono text-xs font-bold text-ink">
                        {a.index}
                      </span>
                      {a.name}
                      <span className="text-paper/60">· {a.minutes}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {/* Status card, like the one your phone will show */}
          <div
            aria-hidden
            className="absolute bottom-28 left-6 hidden w-[22rem] -rotate-2 animate-float items-center gap-3 rounded-2xl border border-white/15 bg-ink/55 p-3.5 backdrop-blur-md motion-reduce:animate-none md:left-14 lg:flex"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-signal text-ink">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="flex justify-between gap-3 text-xs text-paper/65">
                <span>וואטסאפ ביזנס</span>
                <span>פועל</span>
              </span>
              <span className="mt-0.5 block font-bold">הודעת היעדרות: אתם בחופש</span>
            </span>
          </div>
        </div>
      </section>

      {/* Why the vacation isn't a vacation */}
      <section aria-labelledby="why-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Kicker>לפני שמתחילים</Kicker>
            <h2
              id="why-title"
              className="mt-6 text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.98] font-black tracking-[-0.04em] text-balance"
            >
              למה החופש שלכם <span className="font-serif font-normal">לא באמת חופש?</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75 md:text-xl md:leading-relaxed">
              שלושה דברים מושכים אתכם חזרה לטלפון: לקוחות חדשים שמחכים לתשובה, שאלות שחוזרות על עצמן, ותיאום פגישות.
              לכל אחד מהם יש אוטומציה. <b className="text-ink">בחינם.</b>
            </p>
            <p className="mt-4 text-sm font-semibold text-ink/65">לחצו על ״עם 3 האוטומציות״ וראו מה משתנה.</p>
          </div>
          <Reveal className="lg:col-span-6" delay={0.1}>
            <InboxDemo />
          </Reveal>
        </div>
      </section>

      {/* The guide itself */}
      <section aria-labelledby="guide-steps-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <Kicker>המדריך</Kicker>
        <h2
          id="guide-steps-title"
          className="mt-6 max-w-3xl text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.98] font-black tracking-[-0.04em]"
        >
          שלוש אוטומציות. <span className="font-serif font-normal">חצי שעה.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
          ממלאים את הפרטים פעם אחת, מעתיקים את הנוסחים, ומדביקים בוואטסאפ ביזנס וביומן Google.
        </p>
        <div className="mt-12">
          <Workbench />
        </div>
      </section>

      {/* Checklist */}
      <section aria-labelledby="checklist-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7">
            <Kicker>שמרו לחופש הבא</Kicker>
            <h2
              id="checklist-title"
              className="mt-6 text-[clamp(2.25rem,4.6vw,4rem)] leading-[0.98] font-black tracking-[-0.04em]"
            >
              10 דקות <span className="font-serif font-normal">לפני שיוצאים.</span>
            </h2>
            <div className="mt-10">
              <Checklist />
            </div>
          </div>
          <div className="relative hidden min-h-[28rem] overflow-hidden rounded-[2rem] lg:col-span-5 lg:block">
            <Image
              src={towel}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 1px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* It's a system */}
      <section aria-labelledby="system-title" className="px-3 md:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] text-paper md:rounded-[3.5rem]">
          <Image
            src={sunset}
            alt=""
            fill
            placeholder="blur"
            sizes="100vw"
            className="-z-20 object-cover object-[50%_60%]"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-ink/90 via-ink/70 to-ink/90" />
          <div aria-hidden className="absolute -bottom-40 -left-40 -z-10 size-[30rem] rounded-full bg-signal/30 blur-3xl" />

          <div className="mx-auto max-w-7xl px-6 py-20 md:px-14 md:py-28">
            <Kicker tone="paper">וכשמחברים את שלושתן</Kicker>
            <h2
              id="system-title"
              className="mt-6 text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-black tracking-[-0.045em]"
            >
              זו כבר <span className="font-serif font-normal text-signal">מערכת.</span>
            </h2>

            <ol className="relative mt-12 max-w-2xl">
              <span aria-hidden className="absolute top-3 right-[0.6rem] bottom-3 w-0.5 bg-signal/45" />
              {systemFlow.map((step, i) => (
                <li key={step.text} className="relative">
                  <Reveal delay={0.12 * i} y={14}>
                    <div className="flex items-start gap-5 py-3.5">
                      <span
                        aria-hidden
                        className="relative mt-1.5 size-[1.4rem] shrink-0 rounded-full bg-signal shadow-[0_0_0_7px_rgba(155,123,255,0.25)]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-signal-soft">{step.time}</p>
                        <p className="mt-1 text-2xl font-bold md:text-3xl">{step.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-paper/85 md:text-xl md:leading-relaxed">
              וזו רק ההתחלה. מערכת שלמה גם שומרת כל פנייה ברשימה אחת, שולחת הצעת מחיר, ומזכירה לכם מה עוד פתוח.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="guide-cta-title" className="px-3 py-3 md:px-5 md:py-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-signal px-6 py-16 text-ink md:rounded-[3.5rem] md:px-14 md:py-24">
          <div aria-hidden className="absolute -bottom-24 left-[12%] -z-10 size-48 rounded-full bg-paper/40 md:size-64" />
          <div aria-hidden className="absolute -top-16 -left-16 -z-10 size-40 rounded-full bg-paper/30" />
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold text-ink">מאיה קורן · קורן.נט</p>
            <h2
              id="guide-cta-title"
              className="mt-6 text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9] font-black tracking-[-0.05em]"
            >
              רוצים שזה <span className="font-serif font-normal tracking-[-0.03em]">יעבוד לבד?</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/85 md:text-xl md:leading-relaxed">
              אני בונה לעסקים את מה שמחזיק אותם כשהם לא בחדר. שיחה של 20 דקות, בחינם: נבדוק יחד מה עוד אפשר להוריד
              מכם, ואיך יוצאים לחופש הבא באמת.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <PillLink href={whatsappHref(vacationGuide.whatsappMessage)} size="lg" icon={<WhatsAppIcon className="size-6" />}>
                  לקביעת שיחה בוואטסאפ
                </PillLink>
              </Magnetic>
              <PillLink href="/services" variant="outline" size="lg" icon={<ArrowUpLeft className="size-5" />}>
                לכל השירותים
              </PillLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-base font-semibold">
              <a
                href={vacationGuide.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span dir="ltr">@{vacationGuide.instagram.handle}</span>
                <span className="sr-only"> (אינסטגרם, נפתח בחלון חדש)</span>
              </a>
              <a
                href={vacationGuide.pdfHref}
                download
                className="inline-flex items-center gap-2 underline decoration-ink/40 decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
              >
                <FileDown className="size-5" aria-hidden />
                המדריך כ-PDF ({vacationGuide.pdfSize})
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
