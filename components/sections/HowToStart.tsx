import { ArrowUpLeft } from "lucide-react";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel, WhatsAppIcon } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { diagnostic } from "@/lib/pages";
import { whatsappHref } from "@/lib/site";

/**
 * Home: a compact "how it starts" strip. Replaces the 5-step Process section
 * (kept in components/sections/Process.tsx). Keeps id="method" for the nav link.
 */
export function HowToStart() {
  return (
    <section id="method" aria-labelledby="how-to-start-title" className="px-3 md:px-5">
      <div className="rounded-[2.5rem] bg-ink px-6 py-16 text-paper md:rounded-[3.5rem] md:px-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="04" tone="paper">
            {diagnostic.name}
          </SectionLabel>
          <h2
            id="how-to-start-title"
            className="mt-6 max-w-4xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]"
          >
            מתחילים בשיחה של 20 דקות.{" "}
            <span className="font-serif font-normal text-signal">בלי מצגות ובלי התחייבות.</span>
          </h2>

          <Reveal>
            <ol className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {diagnostic.steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-3 rounded-2xl border border-white/10 px-5 py-4">
                  <span className="mt-1 font-mono text-xs text-signal">0{i + 1}</span>
                  <span>
                    <span className="block text-lg font-bold">{step.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-paper/70">{step.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink
              href={whatsappHref("היי, אשמח לתאם שיחת היכרות עם קורן.נט.")}
              variant="signal"
              icon={<WhatsAppIcon className="size-5" />}
            >
              לתאם שיחת היכרות
            </PillLink>
            <PillLink href={`/services#${diagnostic.id}`} variant="outline-light" icon={<ArrowUpLeft className="size-5" />}>
              כל הפרטים
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
