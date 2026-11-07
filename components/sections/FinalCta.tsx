import { Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel, WhatsAppIcon } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { mailHref, whatsappHref } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="contact" className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-signal px-6 py-20 text-ink md:rounded-[3.5rem] md:px-14 md:py-28">
        {/* Organic cut-outs */}
        <div aria-hidden className="absolute -bottom-20 left-[18%] size-40 rounded-full bg-paper md:size-56" />
        <div aria-hidden className="absolute -top-16 left-[-4rem] size-36 rounded-full bg-paper md:size-44" />
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute top-28 left-[12%] hidden size-28 animate-spin-slow text-ink motion-reduce:animate-none lg:block"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="47" y="6" width="6" height="40" rx="3" fill="currentColor" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>

        <div className="mx-auto max-w-7xl">
          <SectionLabel index="06" tone="accent">
            הצעד הראשון
          </SectionLabel>
          <h2 className="mt-8 text-[clamp(3rem,9.75vw,9.4rem)] leading-[0.88] font-black tracking-[-0.05em]">
            <MaskLines
              lines={[
                "בואו נדבר",
                <span key="2" className="font-serif font-normal tracking-[-0.03em]">
                  על מה שתקוע.
                </span>,
              ]}
            />
          </h2>

          <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="max-w-lg text-lg leading-relaxed text-ink/85 md:text-xl md:leading-relaxed">
                שיחת היכרות של 20 דקות — בלי מצגות ובלי התחייבות. מספרים לנו איפה העסק נתקע, ויוצאים
                עם תמונה ברורה של הצעד הראשון. גם אם בסוף לא נעבוד יחד.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3 md:col-span-6 md:justify-end" delay={0.1}>
              <Magnetic>
                <PillLink href={whatsappHref()} size="lg" icon={<WhatsAppIcon className="size-6" />}>
                  שלחו הודעה בוואטסאפ
                </PillLink>
              </Magnetic>
              <PillLink href={mailHref} variant="outline" size="lg" icon={<Mail className="size-5" />}>
                או במייל
              </PillLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
