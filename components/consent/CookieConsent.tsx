"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, writeConsent } from "@/lib/consent";
import { EASE_OUT_EXPO } from "@/lib/motion";

const categories = [
  {
    key: "necessary",
    title: "הכרחיות",
    body: "נדרשות לתפקוד האתר ולשמירת הבחירות שלכם (כמו העדפות עוגיות ונגישות). לא ניתן לכבות אותן.",
    locked: true,
  },
  {
    key: "analytics",
    title: "סטטיסטיקה",
    body: "עוזרות לנו להבין, באופן מצטבר, איך משתמשים באתר — כדי לשפר אותו.",
    locked: false,
  },
  {
    key: "marketing",
    title: "שיווק",
    body: "מאפשרות למדוד קמפיינים ולהציג תוכן רלוונטי בפלטפורמות אחרות.",
    locked: false,
  },
] as const;

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choice, setChoice] = useState({ analytics: false, marketing: false });
  const titleId = useId();

  useEffect(() => {
    const existing = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in a cookie, readable only after mount
    if (!existing) setVisible(true);

    const reopen = () => {
      const current = readConsent();
      setChoice({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false });
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function save(next: { analytics: boolean; marketing: boolean }) {
    writeConsent(next);
    setVisible(false);
    setExpanded(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="region"
          aria-labelledby={titleId}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 }}
          className="fixed inset-x-3 bottom-3 z-[65] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-3xl overflow-y-auto rounded-[1.75rem] bg-ink p-5 text-paper shadow-[0_30px_80px_-20px_rgba(14,14,12,0.7)] md:bottom-5 md:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="hidden size-11 shrink-0 place-items-center rounded-full bg-signal text-ink sm:grid">
              <Cookie className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <h2 id={titleId} className="text-lg font-bold">
                עוגיות, בשקיפות
              </h2>
              <p className="mt-1.5 text-[15px] leading-relaxed text-paper/75">
                האתר משתמש בעוגיות הכרחיות כדי לפעול. עוגיות סטטיסטיקה ושיווק יופעלו רק אם תאשרו זאת —
                ותוכלו לשנות את הבחירה בכל עת דרך ״הגדרות עוגיות״ בתחתית העמוד.{" "}
                <Link
                  href="/cookies"
                  className="font-semibold text-paper underline decoration-signal decoration-2 underline-offset-4"
                >
                  למדיניות העוגיות
                </Link>
              </p>
            </div>
          </div>

          {expanded && (
            <fieldset className="mt-5 grid gap-2">
              <legend className="sr-only">בחירת סוגי עוגיות</legend>
              {categories.map((c) => {
                const checked = c.locked ? true : choice[c.key as "analytics" | "marketing"];
                return (
                  <label
                    key={c.key}
                    className={`flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 ${
                      c.locked ? "cursor-default" : "cursor-pointer hover:bg-white/[0.07]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={c.locked}
                      onChange={(e) =>
                        setChoice((prev) => ({ ...prev, [c.key]: e.target.checked }))
                      }
                      className="mt-1 size-5 shrink-0 accent-[#9b7bff]"
                    />
                    <span>
                      <span className="block font-semibold">
                        {c.title}
                        {c.locked && <span className="ms-2 text-xs font-normal text-paper/65">(תמיד פעילות)</span>}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-paper/70">{c.body}</span>
                    </span>
                  </label>
                );
              })}
            </fieldset>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {/* Accept and reject carry equal visual weight, by design. */}
            <button
              type="button"
              onClick={() => save({ analytics: true, marketing: true })}
              className="h-11 rounded-full bg-signal px-6 text-sm font-bold text-ink transition-transform active:scale-[0.97]"
            >
              אישור הכול
            </button>
            <button
              type="button"
              onClick={() => save({ analytics: false, marketing: false })}
              className="h-11 rounded-full bg-paper px-6 text-sm font-bold text-ink transition-transform active:scale-[0.97]"
            >
              הכרחיות בלבד
            </button>
            {expanded ? (
              <button
                type="button"
                onClick={() => save(choice)}
                className="h-11 rounded-full border border-paper/30 px-6 text-sm font-bold transition-colors hover:border-paper"
              >
                שמירת הבחירה שלי
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                aria-expanded={expanded}
                className="h-11 rounded-full px-4 text-sm font-semibold text-paper/80 underline underline-offset-4 hover:text-paper"
              >
                התאמה אישית
              </button>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      הגדרות עוגיות
    </button>
  );
}
