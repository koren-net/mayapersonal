import { ArrowDownLeft, Check } from "lucide-react";
import { HeroDashboard } from "@/components/sections/HeroDashboard";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillLink } from "@/components/ui/PillLink";
import { WhatsAppIcon } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { whatsappHref } from "@/lib/site";

const promises = ["20 דקות", "בלי מצגות", "בלי התחייבות"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Organic signal blob — sits behind the dashboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[58%] -left-[30vw] -z-10 aspect-square w-[95vw] animate-blob bg-signal motion-reduce:animate-none lg:top-[16%] lg:-left-[8vw] lg:w-[44vw] lg:max-w-[620px]"
      />

      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-paper/60 py-1.5 ps-2 pe-4 text-[14px] font-medium text-ink/70 backdrop-blur">
              <span className="relative grid size-5 place-items-center rounded-full bg-ink">
                <span className="absolute size-2 animate-ping rounded-full bg-signal/70 motion-reduce:animate-none" />
                <span className="size-2 rounded-full bg-signal" />
              </span>
              אתרים · תשתיות תפעול · אוטומציות לעסקים בצמיחה
            </p>
          </Reveal>

          <h1 className="mt-8 text-[clamp(2.75rem,6.4vw,6rem)] leading-[0.92] font-black tracking-[-0.045em] whitespace-nowrap">
            <MaskLines
              delay={0.1}
              lines={[
                "עסק שרץ",
                <span key="2" className="block ps-[0.45em] md:ps-[0.8em]">
                  גם כשאתם
                </span>,
                <span key="3" className="font-serif font-normal tracking-[-0.025em]">
                  לא בחדר
                  <span
                    aria-hidden
                    className="ms-[0.04em] inline-block size-[0.17em] rounded-full bg-signal ring-[0.045em] ring-ink"
                  />
                </span>,
              ]}
            />
          </h1>

          <Reveal delay={0.35}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl md:leading-relaxed">
              קורן.נט בונה לעסקים בצמיחה את התשתית התפעולית שחסרה להם: תהליכים ברורים, אוטומציות
              חכמות ומערכות שמדברות זו עם זו. כדי שתפסיקו להיות צוואר הבקבוק של העסק שלכם —{" "}
              <span className="font-semibold text-ink">ותתחילו להוביל אותו.</span>
            </p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <PillLink href={whatsappHref()} icon={<WhatsAppIcon className="size-5" />}>
                  שיחת היכרות בוואטסאפ
                </PillLink>
              </Magnetic>
              <PillLink href="#method" variant="outline" icon={<ArrowDownLeft className="size-5" />}>
                איך זה עובד
              </PillLink>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/65">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check className="size-3.5" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-28">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}
