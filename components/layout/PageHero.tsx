import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/primitives";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

/** Editorial header used at the top of every inner page. */
export function PageHero({
  label,
  title,
  serif,
  intro,
  children,
}: {
  label: string;
  title: string;
  serif?: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id="top" className="relative mx-auto max-w-7xl px-5 pt-36 pb-14 md:px-8 md:pt-48 md:pb-20">
      <SectionLabel index="00">{label}</SectionLabel>
      <h1 className="mt-8 max-w-5xl text-[clamp(2.5rem,5.85vw,5.25rem)] leading-[0.95] font-black tracking-[-0.045em] text-balance">
        <MaskLines
          lines={[
            title,
            ...(serif
              ? [
                  <span key="serif" className="font-serif font-normal tracking-[-0.025em]">
                    {serif}
                  </span>,
                ]
              : []),
          ]}
        />
      </h1>
      {intro && (
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl md:leading-relaxed">
            {intro}
          </p>
        </Reveal>
      )}
      {children}
    </section>
  );
}
