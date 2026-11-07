import { ArrowUpLeft } from "lucide-react";
import { PillLink } from "@/components/ui/PillLink";
import { SectionLabel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { websites } from "@/lib/pages";

/** Home: the websites & landing pages offer, placed right after the pain section. */
export function WebsitesTeaser() {
  return (
    <section id="websites" aria-labelledby="home-websites-title" className="px-3 pb-20 md:px-5 md:pb-32">
      <Reveal>
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-signal p-7 text-ink md:rounded-[3rem] md:p-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03" tone="accent">
              {websites.name}
            </SectionLabel>
            <h2 id="home-websites-title" className="mt-6 text-5xl font-black tracking-[-0.04em] md:text-7xl">
              {websites.title} <span className="font-serif font-normal">{websites.serif}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85">{websites.short}</p>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div>
              <ul className="border-b border-ink/20">
                {websites.offers.map((o) => (
                  <li key={o.id} className="flex items-baseline justify-between gap-4 border-t border-ink/20 py-3">
                    <span className="text-lg font-bold">{o.name}</span>
                    <span className="text-sm text-ink/85">
                      {websites.pricePrefix}
                      <span className="text-xl font-black text-ink">{o.price}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink/85">{websites.vatNote}</p>
            </div>
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
