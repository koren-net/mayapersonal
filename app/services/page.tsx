import {
  ArrowUpLeft,
  Check,
  ClipboardList,
  Infinity as InfinityIcon,
  LayoutDashboard,
  PlugZap,
  Receipt,
  Users,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { CheckList } from "@/components/ui/CheckList";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel, WhatsAppIcon } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { retainer, tracks } from "@/lib/content";
import { capabilities, diagnostic, pricingPrinciples, retainerDetails, trackDetails, websites } from "@/lib/pages";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "שירותים ומוצרים",
  description:
    "אתרים ודפי נחיתה שמחוברים לעסק, הקמת תשתית דיגיטלית, אוטומציות תפעוליות, טרנספורמציה מלאה ושותפות צמיחה חודשית — פירוט מלא של מה בונים, למי זה מתאים ומה מקבלים בסוף.",
  alternates: { canonical: "/services" },
};

const capabilityIcons = {
  users: Users,
  workflow: Workflow,
  receipt: Receipt,
  dashboard: LayoutDashboard,
  onboarding: ClipboardList,
  plug: PlugZap,
} as const;

const index = [
  { href: `#${diagnostic.id}`, label: diagnostic.name },
  { href: `#${websites.id}`, label: websites.name },
  ...tracks.map((t) => ({ href: `#${t.id}`, label: `מסלול ${t.name}` })),
  { href: "#partnership", label: retainer.name },
  { href: "#compare", label: "השוואה" },
];

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        label="שירותים ומוצרים"
        title="מה אנחנו בונים,"
        serif="ואיך זה עובד בפועל."
        intro="אתרים ודפי נחיתה, שלושה מסלולי תפעול ושותפות מתמשכת. כאן תמצאו בדיוק מה כל אחד כולל, למי הוא מתאים ומה נשאר אצלכם בסוף."
      >
        <nav aria-label="ניווט בעמוד" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {index.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* How it starts: intro call + diagnosis meeting */}
      <section id={diagnostic.id} aria-labelledby="diagnostic-title" className="px-3 md:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-paper md:rounded-[3.5rem] md:px-14 md:py-20">
          <div aria-hidden className="absolute -top-24 -left-24 -z-10 size-72 animate-blob rounded-full bg-signal/90 motion-reduce:animate-none" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1 text-xs font-semibold text-paper/85">
                <span aria-hidden className="size-2 rounded-full bg-signal" />
                {diagnostic.label} · {diagnostic.call.name} {diagnostic.call.price}
              </p>
              <h2 id="diagnostic-title" className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
                {diagnostic.name}
              </h2>
              <p className="mt-4 font-serif text-2xl text-signal md:text-3xl">{diagnostic.tagline}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">{diagnostic.body}</p>
              <h3 className="mt-10 text-sm font-semibold text-paper/65">איך זה מתנהל</h3>
              <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                {diagnostic.steps.map((step, i) => (
                  <li key={step.title} className="flex items-start gap-3 rounded-2xl border border-white/10 px-4 py-3 text-[15px]">
                    <span className="mt-1 font-mono text-xs text-signal">0{i + 1}</span>
                    <span>
                      <span className="block font-semibold">{step.title}</span>
                      <span className="mt-0.5 block text-sm text-paper/70">{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <h3 className="text-sm font-semibold text-paper/65">
                מה יוצא מפגישת האבחון ({diagnostic.meeting.duration} · {diagnostic.meeting.price})
              </h3>
              <div className="mt-4">
                <CheckList items={diagnostic.deliverables} tone="ink" />
              </div>
              <p className="mt-4 text-sm text-paper/70">
                {diagnostic.meeting.price} כולל מע״מ. {diagnostic.meeting.offset}.
              </p>
              <div className="mt-8">
                <PillLink
                  href={whatsappHref("היי, אשמח לתאם שיחת היכרות עם קורן.נט.")}
                  variant="signal"
                  icon={<WhatsAppIcon className="size-5" />}
                >
                  לתאם שיחת היכרות
                </PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Websites & landing pages */}
      <section id={websites.id} aria-labelledby="websites-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionLabel index="01">{websites.name}</SectionLabel>
        <h2 id="websites-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          {websites.title} <span className="font-serif font-normal">{websites.serif}</span>
        </h2>
        <Reveal>
          <div className="mt-16 grid gap-10 rounded-[2.5rem] border border-ink/10 bg-paper p-7 md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-lg leading-relaxed">{websites.intro}</p>
              <h3 className="mt-8 text-xs font-semibold text-ink/65">בכל אתר ודף נחיתה</h3>
              <div className="mt-4">
                <CheckList items={websites.included} />
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
              <div>
                <h3 className="text-xs font-semibold text-ink/65">מה אפשר לבנות</h3>
                <ul className="mt-4 border-b border-ink/10">
                  {websites.offers.map((o) => (
                    <li key={o.id} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink/10 py-5">
                      <span>
                        <span className="block text-2xl font-black tracking-tight md:text-3xl">{o.name}</span>
                        <span className="mt-1 block font-serif text-lg text-ink/75">{o.tagline}</span>
                      </span>
                      <span className="text-sm text-ink/70">
                        {websites.pricePrefix}
                        <span className="text-2xl font-black text-ink md:text-3xl">{o.price}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">{websites.priceNote}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PillLink href={websites.href} icon={<ArrowUpLeft className="size-5" />}>
                  כל הפרטים על אתרים
                </PillLink>
                <PillLink href={whatsappHref(websites.whatsappMessage)} variant="outline" icon={<WhatsAppIcon className="size-5" />}>
                  לדבר על אתר
                </PillLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Tracks */}
      <section id="tracks" aria-labelledby="tracks-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <SectionLabel index="02">מסלולי עבודה</SectionLabel>
        <h2 id="tracks-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          שלושה מסלולים, <span className="font-serif font-normal">לפי השלב שבו העסק נמצא.</span>
        </h2>

        <div className="mt-16 flex flex-col gap-4">
          {tracks.map((t) => {
            const details = trackDetails[t.id];
            return (
              <Reveal key={t.id}>
                <article
                  id={t.id}
                  aria-labelledby={`${t.id}-title`}
                  className="grid gap-10 rounded-[2.5rem] border border-ink/10 bg-paper p-7 md:p-12 lg:grid-cols-12"
                >
                  <div className="lg:col-span-5">
                    <p className="font-mono text-sm text-ink/70">{t.index}</p>
                    <h3 id={`${t.id}-title`} className="mt-5 text-5xl font-black tracking-[-0.04em] md:text-6xl">
                      {t.name}
                    </h3>
                    <p className="mt-2 font-serif text-2xl text-ink/80">{t.tagline}</p>

                    <dl className="mt-8 flex flex-col gap-5">
                      <div>
                        <dt className="text-xs font-semibold text-ink/65">הבעיה שזה פותר</dt>
                        <dd className="mt-1.5 text-lg leading-relaxed">{details.problem}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-ink/65">למי זה מתאים</dt>
                        <dd className="mt-1.5 text-lg leading-relaxed">{t.fit}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold text-ink/65">התוצאה</dt>
                        <dd className="mark-signal mt-1.5 inline font-serif text-2xl leading-snug">{t.outcome}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:col-span-7">
                    <div>
                      <h4 className="text-xs font-semibold text-ink/65">מה בונים</h4>
                      <div className="mt-4">
                        <CheckList items={t.builds} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-ink/65">מה נשאר אצלכם בסוף</h4>
                      <div className="mt-4">
                        <CheckList items={details.deliverables} />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-xs font-semibold text-ink/65">שלבי העבודה</h4>
                      <ol className="mt-4 flex flex-wrap gap-2">
                        {details.phases.map((phase, i) => (
                          <li key={phase} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper">
                            <span className="font-mono text-xs text-signal">0{i + 1}</span>
                            {phase}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="md:col-span-2">
                      <PillLink
                        href={whatsappHref(`היי, אשמח לשמוע עוד על מסלול ${t.name} של קורן.נט.`)}
                        icon={<WhatsAppIcon className="size-5" />}
                      >
                        לדבר על מסלול {t.name}
                      </PillLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Partnership */}
      <section id="partnership" aria-labelledby="partnership-title" className="px-3 md:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-signal px-6 py-16 text-ink md:rounded-[3.5rem] md:px-14 md:py-20">
          <InfinityIcon aria-hidden className="absolute top-10 left-10 hidden size-24 opacity-20 md:block" strokeWidth={1.5} />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="03" tone="accent">
                {retainer.label}
              </SectionLabel>
              <h2 id="partnership-title" className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
                {retainer.name}
              </h2>
              <p className="mt-4 font-serif text-2xl md:text-3xl">{retainer.tagline}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85">{retainer.body}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/85">
                <strong>למי: </strong>
                {retainerDetails.fit}
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <h3 className="text-sm font-semibold text-ink/80">מה כלול בכל חודש</h3>
              <ul className="mt-4 flex flex-col gap-2">
                {retainerDetails.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl bg-ink/[0.08] px-4 py-3 text-[15px] leading-snug font-medium">
                    <span aria-hidden className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink text-signal">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <PillLink
                  href={whatsappHref("היי, אשמח לשמוע על שותפות הצמיחה של קורן.נט.")}
                  icon={<WhatsAppIcon className="size-5" />}
                >
                  לדבר על שותפות צמיחה
                </PillLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionLabel index="04">מה אפשר לבנות</SectionLabel>
        <h2 id="capabilities-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          התחומים <span className="font-serif font-normal">שבהם אנחנו עובדים.</span>
        </h2>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => {
            const Icon = capabilityIcons[c.icon];
            return (
              <li key={c.title} className="flex flex-col gap-8 rounded-[2rem] bg-paper-2 p-7 transition-colors duration-500 hover:bg-paper-3">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-ink text-signal">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/75">{c.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Comparison */}
      <section id="compare" aria-labelledby="compare-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <SectionLabel index="05">השוואה</SectionLabel>
        <h2 id="compare-title" className="mt-6 text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          המסלולים, <span className="font-serif font-normal">זה לצד זה.</span>
        </h2>
        <div className="mt-12 overflow-x-auto rounded-[2rem] border border-ink/10">
          <table className="w-full min-w-[44rem] border-collapse text-start">
            <caption className="sr-only">השוואה בין מסלולי העבודה של קורן.נט</caption>
            <thead>
              <tr className="bg-ink text-paper">
                <th scope="col" className="w-40 p-5 text-start text-sm font-semibold text-paper/75">
                  <span className="sr-only">מאפיין</span>
                </th>
                {tracks.map((t) => (
                  <th key={t.id} scope="col" className="p-5 text-start text-2xl font-black">
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[15px] leading-relaxed">
              {[
                { label: "במשפט אחד", get: (t: (typeof tracks)[number]) => t.tagline },
                { label: "למי מתאים", get: (t: (typeof tracks)[number]) => t.fit },
                { label: "התוצאה", get: (t: (typeof tracks)[number]) => t.outcome },
              ].map((row) => (
                <tr key={row.label} className="border-t border-ink/10">
                  <th scope="row" className="p-5 text-start align-top text-sm font-semibold text-ink/70">
                    {row.label}
                  </th>
                  {tracks.map((t) => (
                    <td key={t.id} className="p-5 align-top">
                      {row.get(t)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing approach */}
      <section aria-labelledby="pricing-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="06">תמחור</SectionLabel>
            <h2 id="pricing-title" className="mt-6 text-[clamp(1.9rem,3.1vw,2.75rem)] leading-[1] font-black tracking-[-0.04em]">
              איך מתמחרים <span className="font-serif font-normal">בלי הפתעות.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-ink/75">
              לאתרים ולדפי נחיתה יש{" "}
              <Link
                href={`#${websites.id}`}
                className="font-semibold text-ink underline decoration-signal decoration-[3px] underline-offset-4 transition-colors hover:decoration-ink"
              >
                מחיר התחלתי
              </Link>
              . בפרויקטים של תפעול ומערכות אין מחירון מדף, כי כל עסק בנוי אחרת. אחרי פגישת האבחון מקבלים הצעה מסודרת.
            </p>
          </div>
          <ol className="grid gap-3 md:grid-cols-3 lg:col-span-8">
            {pricingPrinciples.map((p, i) => (
              <li key={p.title} className="rounded-[2rem] border border-ink/10 p-7">
                <span className="font-mono text-xs text-ink/70">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/75">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="יצירת קשר" className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-paper-2 px-6 py-12 md:flex-row md:items-center md:px-14 md:py-16">
          <p className="max-w-xl text-3xl leading-tight font-black tracking-tight md:text-4xl">
            לא בטוחים איזה מסלול מתאים? <span className="font-serif font-normal">זה בדיוק התפקיד של שיחת ההיכרות.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <PillLink href={whatsappHref()} icon={<WhatsAppIcon className="size-5" />}>
                שיחת היכרות בוואטסאפ
              </PillLink>
            </Magnetic>
            <PillLink href="/contact" variant="outline" icon={<ArrowUpLeft className="size-5" />}>
              לעמוד יצירת קשר
            </PillLink>
          </div>
        </div>
      </section>
    </main>
  );
}
