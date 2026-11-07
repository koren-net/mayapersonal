import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/CookieConsent";
import { DecorativeWordmark, Wordmark, WhatsAppIcon } from "@/components/ui/primitives";
import { legalNav, mailHref, pagesNav, site, telHref, whatsappHref } from "@/lib/site";

const linkClass = "text-paper/80 transition-colors duration-300 hover:text-signal";

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] bg-ink text-paper md:rounded-t-[3.5rem]">
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="text-[2.75rem]">
              <Wordmark dotClassName="bg-signal" />
            </Link>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-paper/70">
              תשתיות תפעול, אוטומציות ומערכות לעסקים שמוכנים להפסיק לכבות שריפות — ולהתחיל לגדול.
            </p>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-signal py-2 ps-6 pe-2 font-semibold text-ink transition-transform duration-500 ease-out-expo active:scale-[0.97]"
            >
              שיחת היכרות בוואטסאפ
              <span className="sr-only"> (נפתח בחלון חדש)</span>
              <span className="grid size-10 place-items-center rounded-full bg-ink text-signal transition-transform duration-500 ease-out-expo group-hover:-rotate-12">
                <WhatsAppIcon className="size-5" />
              </span>
            </a>
          </div>

          <nav aria-label="עמודי האתר" className="md:col-span-2 md:col-start-6">
            <h2 className="font-mono text-xs tracking-widest text-paper/60">PAGES</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {pagesNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="מידע משפטי" className="md:col-span-3">
            <h2 className="font-mono text-xs tracking-widest text-paper/60">LEGAL</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className={`${linkClass} text-start`} />
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-mono text-xs tracking-widest text-paper/60">CONTACT</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  וואטסאפ
                </a>
              </li>
              <li>
                <a href={telHref} className={linkClass} dir="ltr">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailHref} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-white/10 py-7 text-sm text-paper/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.year} קורן.נט. כל הזכויות שמורות.
            {site.legal.businessId ? ` · ע.מ./ח.פ. ${site.legal.businessId}` : ""}
          </p>
          <div className="flex items-center gap-5">
            <p>{site.tagline}</p>
            <a
              href="#top"
              aria-label="חזרה לראש העמוד"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-signal hover:bg-signal hover:text-ink"
            >
              <ArrowUp className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none -mb-[2.8vw] text-center text-[20vw] leading-[0.8] select-none"
      >
        <DecorativeWordmark className="text-paper/[0.06]" dotClassName="bg-signal/80" />
      </div>
    </footer>
  );
}
