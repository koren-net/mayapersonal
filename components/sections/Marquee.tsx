import { capabilities } from "@/lib/content";

/**
 * Decorative back band — no third-party tool names. The brand name is written
 * only in Hebrew; in Latin we show the real domain (koren.net is someone else's).
 */
const bandWords = ["MAYAKOREN.NET","OPERATIONS", "AUTOMATION", "SYSTEMS", "WEBSITES", "LANDING PAGES", "CRM"];

function Track({
  items,
  className,
  separatorClass,
}: {
  items: string[];
  className: string;
  separatorClass: string;
}) {
  const copy = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className={`flex items-center whitespace-nowrap ${className}`}>
          <span className={i % 3 === 1 ? "font-serif font-normal" : ""}>{item}</span>
          <span aria-hidden className={`mx-6 inline-block size-2.5 rounded-full md:mx-10 md:size-3 ${separatorClass}`} />
        </li>
      ))}
    </ul>
  );
  return (
    <>
      {copy(false)}
      {copy(true)}
    </>
  );
}

export function Marquee() {
  return (
    <section aria-label="מה אנחנו בונים" className="relative overflow-hidden py-16 md:py-24">
      {/* Back band */}
      <div aria-hidden className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-signal py-3 md:py-4">
        <div className="flex w-max animate-marquee-reverse motion-reduce:animate-none">
          <Track
            items={[...bandWords, ...bandWords]}
            className="font-mono text-sm font-medium tracking-wide text-ink uppercase md:text-base"
            separatorClass="bg-ink/80"
          />
        </div>
      </div>
      {/* Front band */}
      <div className="relative -mx-[5%] -rotate-[1.5deg] bg-ink py-5 text-paper shadow-[0_30px_60px_-30px_rgba(14,14,12,0.6)] md:py-7">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          <Track
            items={capabilities}
            className="text-3xl font-black tracking-tight md:text-5xl"
            separatorClass="bg-signal"
          />
        </div>
      </div>
    </section>
  );
}
