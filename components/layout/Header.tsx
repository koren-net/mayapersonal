"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark, WhatsAppIcon } from "@/components/ui/primitives";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/motion";
import { mailHref, nav, site, telHref, whatsappHref } from "@/lib/site";

const homeSections = nav.filter((n) => n.href.startsWith("/#")).map((n) => n.href.slice(2));

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 480);
  });

  // On the home page, highlight the anchor section currently in view.
  useEffect(() => {
    if (pathname !== "/") return;
    const els = ["top", ...homeSections, "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setSection(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock scroll, close on Escape, and move focus into the mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/" && section === href.slice(2);
    return pathname === href;
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-140%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
      >
        <nav
          aria-label="ניווט ראשי"
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border py-2 ps-5 pe-2 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-500 ${
            scrolled || open
              ? "border-ink/10 bg-paper/80 shadow-[0_12px_40px_-20px_rgba(14,14,12,0.45)]"
              : "border-ink/[0.07] bg-paper/55"
          }`}
        >
          <Link href="/" className="text-[1.875rem] lg:text-[2.125rem]" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-base font-medium transition-colors duration-300 ${
                      active ? "text-ink" : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink/[0.07]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2.5 rounded-full bg-ink py-1.5 ps-5 pe-1.5 text-sm font-semibold text-paper transition-colors duration-300 hover:bg-ink-3 lg:inline-flex"
            >
              דברו איתנו
              <span className="sr-only"> (וואטסאפ, נפתח בחלון חדש)</span>
              <span className="grid size-8 place-items-center rounded-full bg-signal text-ink transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-12">
                <WhatsAppIcon className="size-4" />
              </span>
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="שליחת הודעה בוואטסאפ (נפתח בחלון חדש)"
              className="grid size-[2.75rem] place-items-center rounded-full bg-signal text-ink lg:hidden"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <button
              type="button"
              aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="grid size-[2.75rem] place-items-center rounded-full bg-ink text-paper lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 12% 4%)" }}
            animate={{ clipPath: "circle(150% at 12% 4%)" }}
            exit={{ clipPath: "circle(0% at 12% 4%)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-6 pt-28 pb-10 text-paper lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 py-1 text-[2.1rem] leading-tight font-black tracking-tight"
                    >
                      <span className="font-mono text-xs font-normal text-signal">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-col gap-4"
            >
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-full bg-signal py-2 ps-6 pe-2 text-lg font-semibold text-ink"
              >
                שיחת היכרות בוואטסאפ
                <span className="grid size-12 place-items-center rounded-full bg-ink text-signal">
                  <ArrowUpLeft className="size-5" aria-hidden />
                </span>
              </a>
              <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-paper/75">
                <a href={telHref} dir="ltr">
                  {site.phoneDisplay}
                </a>
                <a href={mailHref}>{site.email}</a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
