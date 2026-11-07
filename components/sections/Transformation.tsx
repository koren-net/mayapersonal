import { ChaosCard, FlowCard, TransformRows } from "@/components/sections/TransformationParts";
import { SectionLabel } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

export function Transformation() {
  return (
    <section id="pain" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel index="02">למי זה</SectionLabel>
          <h2 className="mt-8 text-[clamp(2.3rem,4.85vw,4.5rem)] leading-[0.95] font-black tracking-[-0.04em]">
            <MaskLines
              lines={[
                "הגעתם למומנטום.",
                <span key="2" className="font-serif font-normal tracking-[-0.02em]">
                  עכשיו הוא מנהל אתכם.
                </span>,
              ]}
            />
          </h2>
        </div>
        <Reveal className="lg:col-span-5" delay={0.15}>
          <p className="text-lg leading-relaxed text-ink/70">
            העסק עובד. יש לקוחות, יש ביקוש, יש צוות. אבל מאחורי הקלעים הכול עדיין נשען עליכם — על
            הזיכרון שלכם, על הטלפון שלכם, על השעות הקטנות של הלילה.{" "}
            <span className="font-semibold text-ink">
              זה לא כשל אישי. זה עסק שגדל מהר יותר מהתשתית שמחזיקה אותו.
            </span>
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-3 md:mt-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <ChaosCard />
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.1}>
          <FlowCard />
        </Reveal>
      </div>

      <TransformRows />
    </section>
  );
}
