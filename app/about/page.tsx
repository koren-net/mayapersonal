import { ArrowUpLeft } from "lucide-react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Magnetic } from "@/components/ui/Magnetic";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel, WhatsAppIcon } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { aboutStory, principles, workingStyle } from "@/lib/pages";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "אודות",
  description:
    "קורן.נט הוא סטודיו בוטיק לתשתיות תפעול, מערכות ואוטומציות לעסקים בצמיחה. הגישה, העקרונות ואיך זה מרגיש לעבוד איתנו.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        label="אודות"
        title="אנחנו בונים את"
        serif="מה שמחזיק עסקים."
        intro="קורן.נט הוא סטודיו בוטיק לתשתיות תפעול, מערכות ואוטומציות. אנחנו עובדים עם עסקים שצמחו מהר — ועכשיו צריכים שהעבודה תרוץ בלי שבעלי העסק יחזיקו כל דבר בעצמם."
      />

      {/* Story */}
      <section aria-labelledby="story-title" className="mx-auto max-w-7xl px-5 pb-24 md:px-8 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01">למה קורן.נט</SectionLabel>
            <h2 id="story-title" className="mt-6 text-[clamp(1.9rem,3.1vw,2.75rem)] leading-[1] font-black tracking-[-0.04em]">
              הצמיחה היא לא הבעיה. <span className="font-serif font-normal">התשתית היא.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
            {aboutStory.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={`text-xl leading-relaxed md:text-2xl md:leading-relaxed ${i === 0 ? "font-semibold" : "text-ink/80"}`}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="px-3 md:px-5">
        <div className="rounded-[2.5rem] bg-ink px-6 py-20 text-paper md:rounded-[3.5rem] md:px-14 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionLabel index="02" tone="paper">
              העקרונות
            </SectionLabel>
            <h2 id="principles-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
              חמישה דברים <span className="font-serif font-normal text-signal">שלא מתפשרים עליהם.</span>
            </h2>
            <ol className="mt-16 border-t border-white/10">
              {principles.map((p, i) => (
                <li key={p.title} className="grid gap-3 border-b border-white/10 py-8 md:grid-cols-12 md:gap-8 md:py-10">
                  <span className="font-mono text-sm text-signal md:col-span-1">0{i + 1}</span>
                  <h3 className="text-3xl font-bold tracking-tight md:col-span-4 md:text-4xl">{p.title}</h3>
                  <p className="text-lg leading-relaxed text-paper/75 md:col-span-6 md:col-start-7">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Working style */}
      <section aria-labelledby="style-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionLabel index="03">איך זה מרגיש</SectionLabel>
        <h2 id="style-title" className="mt-6 max-w-3xl text-[clamp(2rem,3.9vw,3.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
          לעבוד איתנו, <span className="font-serif font-normal">בפועל.</span>
        </h2>
        <ul className="mt-14 grid gap-3 md:grid-cols-3">
          {workingStyle.map((w) => (
            <li key={w.title} className="rounded-[2rem] bg-paper-2 p-8">
              <span aria-hidden className="block size-3 rounded-full bg-signal ring-2 ring-ink" />
              <h3 className="mt-10 text-2xl font-bold tracking-tight">{w.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-ink/75">{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section aria-label="יצירת קשר" className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2.5rem] bg-signal px-6 py-12 md:flex-row md:items-center md:px-14 md:py-16">
          <p className="max-w-xl text-3xl leading-tight font-black tracking-tight md:text-4xl">
            נשמע כמו מה שהעסק שלכם צריך? <span className="font-serif font-normal">בואו נכיר.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <PillLink href={whatsappHref()} icon={<WhatsAppIcon className="size-5" />}>
                שיחת היכרות בוואטסאפ
              </PillLink>
            </Magnetic>
            <PillLink href="/services" variant="outline" icon={<ArrowUpLeft className="size-5" />}>
              לשירותים
            </PillLink>
          </div>
        </div>
      </section>
    </main>
  );
}
