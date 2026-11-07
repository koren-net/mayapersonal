import { ArrowDownLeft, ArrowUpLeft, Check } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CheckList } from "@/components/ui/CheckList";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel, Tag, WhatsAppIcon } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { websites } from "@/lib/pages";
import { whatsappHref } from "@/lib/site";

const [landing, site] = websites.offers;

export const metadata: Metadata = {
  title: websites.name,
  description: `אתרים ודפי נחיתה שמחוברים לעסק: כל פנייה נוחתת ישר בוואטסאפ או ב-CRM, והפונה מקבל תשובה ראשונה מיד. ${landing.name} ${websites.pricePrefix}${landing.price}, ${site.name} ${websites.pricePrefix}${site.price}, כולל מע״מ. הדומיין והאחסון על שמכם.`,
  alternates: { canonical: websites.href },
};

export default function WebsitesPage() {
  const { before, after } = websites.journey;

  return (
    <main id="main">
      <PageHero label={websites.name} title={websites.title} serif={websites.serif} intro={websites.intro}>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <PillLink href={whatsappHref(websites.whatsappMessage)} icon={<WhatsAppIcon className="size-5" />}>
                לדבר על אתר בוואטסאפ
              </PillLink>
            </Magnetic>
            <PillLink href="#pricing" variant="outline" icon={<ArrowDownLeft className="size-5" />}>
              למחירים
            </PillLink>
          </div>
        </Reveal>
      </PageHero>

      {/* Before / after: the same inquiry, two endings */}
      <section aria-labelledby="journey-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <SectionLabel index="01">מה ההבדל</SectionLabel>
        <h2 id="journey-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          אותה פנייה. <span className="font-serif font-normal">שני סופים.</span>
        </h2>

        <div className="mt-14 grid gap-3 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border-2 border-dashed border-saffron bg-paper-2 p-7 md:p-10">
              <Tag tone="saffron" className="bg-paper text-ink/70">
                לפני
              </Tag>
              <h3 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">{before.label}.</h3>
              <ol className="mt-8 flex flex-col gap-3">
                {before.steps.map((step, i) => {
                  const last = i === before.steps.length - 1;
                  return (
                    <li key={step} className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="grid size-[1.9rem] shrink-0 place-items-center rounded-full border border-ink/20 bg-paper font-mono text-xs"
                      >
                        {i + 1}
                      </span>
                      <span className={`text-[15px] md:text-base ${last ? "font-bold" : "font-medium text-ink/80"}`}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink p-7 text-paper md:p-10">
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-signal/10 blur-3xl" />
              <Tag tone="signal" className="bg-white/[0.07] text-paper/80">
                אחרי
              </Tag>
              <h3 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">{after.label}.</h3>
              <ol className="mt-8 flex flex-col gap-3">
                {after.steps.map((step, i) => {
                  const last = i === after.steps.length - 1;
                  return (
                    <li key={step} className="flex items-center gap-4">
                      <span aria-hidden className="grid size-[1.9rem] shrink-0 place-items-center rounded-full bg-signal text-ink">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className={`text-[15px] md:text-base ${last ? "font-bold" : "font-medium text-paper/85"}`}>
                        {step}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offers and prices */}
      <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <SectionLabel index="02">מחירים</SectionLabel>
        <h2 id="pricing-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          שלושה גדלים, <span className="font-serif font-normal">אותו חיבור.</span>
        </h2>

        <ul className="mt-14 grid gap-3 md:grid-cols-3">
          {websites.offers.map((o, i) => (
            <li key={o.id} className="flex flex-col rounded-[2rem] border border-ink/10 p-7">
              <span className="font-mono text-xs text-ink/70">0{i + 1}</span>
              <h3 className="mt-6 text-3xl font-black tracking-tight md:text-4xl">{o.name}</h3>
              <p className="mt-2 font-serif text-xl text-ink/80">{o.tagline}</p>
              <p className="mt-4 leading-relaxed text-ink/75">{o.fit}</p>
              <p className="mt-auto pt-8 text-sm text-ink/70">
                {websites.pricePrefix}
                <span className="text-4xl font-black tracking-tight text-ink">{o.price}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink/70">{websites.priceNote}</p>

        <Reveal className="mt-10">
          <div className="grid gap-8 rounded-[2rem] border border-ink/10 p-7 md:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h3 className="text-3xl font-black tracking-tight md:text-4xl">
                בכל אתר <span className="font-serif font-normal">ודף נחיתה.</span>
              </h3>
            </div>
            <div className="lg:col-span-7">
              <CheckList items={websites.included} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Ownership + optional maintenance */}
      <section aria-labelledby="ownership-title" className="px-3 md:px-5">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-paper md:rounded-[3.5rem] md:px-14 md:py-20">
          <div aria-hidden className="absolute -top-24 -left-24 -z-10 size-72 animate-blob rounded-full bg-signal/90 motion-reduce:animate-none" />
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="03" tone="paper">
                בעלות
              </SectionLabel>
              <h2 id="ownership-title" className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
                {websites.ownership.title}{" "}
                <span className="font-serif font-normal text-signal">{websites.ownership.serif}</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">{websites.ownership.body}</p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="rounded-[2rem] border border-white/10 p-7">
                <h3 className="text-3xl font-black tracking-tight">
                  {websites.maintenance.title}.{" "}
                  <span className="font-serif font-normal text-signal">{websites.maintenance.tagline}</span>
                </h3>
                <p className="mt-3 leading-relaxed text-paper/75">{websites.maintenance.body}</p>
                <div className="mt-6">
                  <CheckList items={websites.maintenance.includes} tone="ink" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge to the operations tracks */}
      <section aria-labelledby="bridge-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="04">ומה הלאה</SectionLabel>
            <h2 id="bridge-title" className="mt-6 text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
              {websites.bridge.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/75">{websites.bridge.body}</p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <PillLink href="/services#tracks" variant="outline" icon={<ArrowUpLeft className="size-5" />}>
              למסלולי התפעול
            </PillLink>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="יצירת קשר" className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-signal px-6 py-12 text-ink md:flex-row md:items-center md:px-14 md:py-16">
          <p className="max-w-xl text-3xl leading-tight font-black tracking-tight md:text-4xl">
            רוצים אתר שעונה ללקוחות?{" "}
            <span className="font-serif font-normal">שיחה של 20 דקות, ואחריה הצעת מחיר סגורה.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <PillLink href={whatsappHref(websites.whatsappMessage)} icon={<WhatsAppIcon className="size-5" />}>
                לדבר על אתר בוואטסאפ
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
