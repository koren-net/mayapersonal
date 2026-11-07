"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft, Check, Gauge, Infinity as InfinityIcon, MessageCircle, Plus, Rocket, Wrench } from "lucide-react";
import { useState } from "react";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel, WhatsAppIcon } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { retainer, tracks } from "@/lib/content";
import { websites } from "@/lib/pages";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { whatsappHref } from "@/lib/site";

const perkIcons = {
  wrench: Wrench,
  gauge: Gauge,
  message: MessageCircle,
  rocket: Rocket,
} as const;

export function Tracks() {
  const [open, setOpen] = useState<string | null>(tracks[0].id);

  return (
    <section id="tracks" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel index="04">מסלולים</SectionLabel>
          <h2 className="mt-8 text-[clamp(2.3rem,4.85vw,4.5rem)] leading-[0.95] font-black tracking-[-0.04em]">
            <MaskLines
              lines={[
                "שלוש דרכים לצאת מהבלגן.",
                <span key="2" className="font-serif font-normal tracking-[-0.02em]">
                  ואחת להישאר בצמיחה.
                </span>,
              ]}
            />
          </h2>
        </div>
        <Reveal className="lg:col-span-5" delay={0.15}>
          <p className="text-lg leading-relaxed text-ink/70">
            לא חבילות מדף. כל מסלול מתחיל באבחון ונבנה סביב מה שהעסק שלכם צריך עכשיו — ומה שהוא
            יצטרך בעוד שנה. המחיר נקבע אחרי שמבינים את ההיקף, ונסגר מראש.
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 border-b border-ink/15 md:mt-24">
        {tracks.map((t) => {
          const isOpen = open === t.id;
          return (
            <li key={t.id} className="border-t border-ink/15">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`track-${t.id}`}
                onClick={() => setOpen(isOpen ? null : t.id)}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-7 text-start md:grid-cols-[5rem_1fr_1fr_auto] md:gap-8 md:py-10"
              >
                <span className="font-mono text-sm text-ink/65">{t.index}</span>
                <span>
                  <span className="block text-[clamp(2rem,4.7vw,3.9rem)] leading-none font-black tracking-[-0.04em] transition-transform duration-500 ease-out-expo group-hover:-translate-x-2">
                    {t.name}
                  </span>
                  <span className="mt-2 block text-base text-ink/65 md:hidden">{t.tagline}</span>
                </span>
                <span className="hidden font-serif text-2xl text-ink/70 md:block">{t.tagline}</span>
                <span
                  className={`grid size-12 place-items-center rounded-full border transition-all duration-500 ease-out-expo md:size-14 ${
                    isOpen
                      ? "rotate-45 border-ink bg-ink text-signal"
                      : "border-ink/20 group-hover:border-signal group-hover:bg-signal"
                  }`}
                >
                  <Plus className="size-5" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`track-${t.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-10 pb-12 md:grid-cols-12 md:ps-[7rem] md:pb-16">
                      <div className="md:col-span-6">
                        <p className="text-xs font-semibold text-ink/65">מה משתנה בעסק</p>
                        <p className="mt-3 font-serif text-3xl leading-tight md:text-[2.1rem]">{t.outcome}</p>
                        <p className="mt-6 max-w-md leading-relaxed text-ink/65">
                          <span className="font-semibold text-ink">למי: </span>
                          {t.fit}
                        </p>                      </div>
                      <div className="md:col-span-6">
                        <p className="text-xs font-semibold text-ink/65">מה בונים</p>
                        <ul className="mt-4 flex flex-col gap-2">
                          {t.builds.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-3 rounded-full bg-paper-2 py-2.5 ps-2.5 pe-5 text-[15px] font-medium"
                            >
                              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-signal">
                                <Check className="size-3.5" strokeWidth={3} />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <PillLink
                            href={whatsappHref(`היי, אשמח לשמוע עוד על מסלול ${t.name} של קורן.נט.`)}
                            icon={<WhatsAppIcon className="size-5" />}
                          >
                            לדבר על מסלול {t.name}
                          </PillLink>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Retainer */}
      <Reveal className="mt-20 md:mt-28">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink p-7 text-paper md:rounded-[3rem] md:p-14">
          <div
            aria-hidden
            className="absolute -top-28 -left-28 -z-10 size-56 animate-blob bg-signal motion-reduce:animate-none md:-top-28 md:-left-28 md:size-[22rem]"
          />
          <div
            aria-hidden
            dir="ltr"
            className="absolute top-6 left-6 hidden size-40 md:block lg:top-10 lg:left-10"
          >
            <svg viewBox="0 0 200 200" className="size-full animate-spin-slow motion-reduce:animate-none">
              <defs>
                <path id="retainer-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-ink font-mono text-[14px] font-medium tracking-[0.15em]">
                <textPath href="#retainer-circle">GROWTH PARTNERSHIP · ONGOING · MAYAKOREN.NET ·</textPath>
              </text>
            </svg>
            <InfinityIcon className="absolute inset-0 m-auto size-10 text-ink" strokeWidth={2.2} />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            <div className="pt-16 md:max-w-[58%] md:pt-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold text-paper/80">
                <span className="size-2 rounded-full bg-signal" />
                {retainer.label}
              </p>
              <h3 className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">{retainer.name}</h3>
              <p className="mt-4 font-serif text-2xl text-signal md:text-3xl">{retainer.tagline}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/65">{retainer.body}</p>
              <div className="mt-10">
                <PillLink
                  href={whatsappHref("היי, אשמח לשמוע על שותפות הצמיחה של קורן.נט.")}
                  variant="signal"
                  icon={<WhatsAppIcon className="size-5" />}
                >
                  לדבר על שותפות צמיחה
                </PillLink>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {retainer.perks.map((p) => {
                const Icon = perkIcons[p.icon];
                return (
                  <li
                    key={p.label}
                    className="flex flex-col gap-8 rounded-[1.4rem] border border-white/[0.08] bg-ink-2 p-5 transition-colors duration-500 hover:bg-ink-3"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-signal text-ink">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="text-[15px] leading-snug font-semibold">{p.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Websites & landing pages */}
      <Reveal className="mt-4">
        <div className="grid gap-10 rounded-[2.5rem] border border-ink/10 p-7 md:rounded-[3rem] md:p-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-ink/[0.06] px-3 py-1 text-xs font-semibold text-ink/75">
              <span aria-hidden className="size-2 rounded-full bg-signal" />
              {websites.name}
            </p>
            <h3 className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
              {websites.title} <span className="font-serif font-normal">{websites.serif}</span>
            </h3>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{websites.short}</p>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-5">
            <ul className="border-b border-ink/15">
              {websites.offers.map((o) => (
                <li key={o.id} className="flex items-baseline justify-between gap-4 border-t border-ink/15 py-3">
                  <span className="text-lg font-bold">{o.name}</span>
                  <span className="text-sm text-ink/70">
                    {websites.pricePrefix}
                    <span className="text-xl font-black text-ink">{o.price}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="-mt-5 text-sm text-ink/70">{websites.vatNote}</p>
            <div>
              <PillLink href={websites.href} icon={<ArrowUpLeft className="size-5" />}>
                כל הפרטים על אתרים
              </PillLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
