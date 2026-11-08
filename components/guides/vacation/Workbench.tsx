"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Lock, RotateCcw } from "lucide-react";
import { useId, useState, useSyncExternalStore } from "react";
import { WhatsAppIcon } from "@/components/ui/primitives";
import {
  addDays,
  awayMessage,
  bookingSteps,
  DAY_LETTERS,
  dayAndDate,
  dayName,
  defaultVacationEnd,
  type Details,
  type Lines,
  linesToText,
  missingCount,
  nextWorkday,
  parseIsoDate,
  quickReplies,
  toIsoDate,
} from "@/lib/guides/vacation";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { CopyButton, MissingNote, SegLines, StepHeader } from "./parts";

/* Today's date exists only in the browser; the prerendered page shows placeholders. */
const noSubscribe = () => () => {};
const useTodayIso = () =>
  useSyncExternalStore(
    noSubscribe,
    () => toIsoDate(new Date()),
    () => null,
  );

const inputClass =
  "h-12 w-full rounded-xl border border-ink/20 bg-paper px-4 text-base text-ink placeholder:text-ink/45 transition-colors focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

/**
 * The interactive part of the guide: the reader fills in their details once,
 * and the three automations below update live, ready to copy.
 * Nothing is stored or sent — state lives only in this component.
 */
export function Workbench() {
  const todayIso = useTodayIso();
  // null = the example date (computed from today); "" = the reader cleared it.
  const [endIso, setEndIso] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [hasBackup, setHasBackup] = useState(true);
  const [backupName, setBackupName] = useState("");
  const [backupPhone, setBackupPhone] = useState("");
  const [price, setPrice] = useState("");

  const today = todayIso ? parseIsoDate(todayIso) : null;
  const end = endIso === null ? (today ? defaultVacationEnd(today) : null) : parseIsoDate(endIso);
  const details: Details = { end, link, hasBackup, backupName, backupPhone, price };

  const ids = { end: useId(), endHint: useId(), link: useId(), linkHint: useId(), name: useId(), phone: useId() };

  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-6">
      {/* Details */}
      <aside id="details" aria-labelledby="details-title" className="lg:sticky lg:top-32 lg:col-span-4">
        <div className="rounded-[2rem] border border-ink/10 bg-paper-2 p-6 md:p-7">
          <p className="text-xs font-semibold text-ink/65">לפני הכול · 30 שניות</p>
          <h3 id="details-title" className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            הפרטים <span className="font-serif font-normal">שלכם.</span>
          </h3>
          <p className="mt-2 leading-relaxed text-ink/75">ממלאים פעם אחת, וכל הנוסחים בעמוד מתעדכנים לבד.</p>

          <div className="mt-6 flex flex-col gap-5">
            <div>
              <label htmlFor={ids.end} className="text-sm font-bold">
                היום האחרון של החופש
              </label>
              <input
                id={ids.end}
                type="date"
                aria-describedby={ids.endHint}
                min={todayIso ?? undefined}
                value={endIso ?? (end ? toIsoDate(end) : "")}
                onChange={(e) => setEndIso(e.target.value)}
                className={`${inputClass} mt-2`}
              />
              <p id={ids.endHint} className="mt-2 text-sm text-ink/70">
                {end ? (
                  <>
                    חוזרים לענות ב<b className="text-ink">{dayAndDate(nextWorkday(end))}</b>. חישבנו לבד, בלי שישי
                    ושבת.
                  </>
                ) : (
                  "בוחרים תאריך, והיום שבו חוזרים לענות מחושב לבד."
                )}
              </p>
            </div>

            <div>
              <label htmlFor={ids.link} className="text-sm font-bold">
                קישור לקביעת שיחה
              </label>
              <input
                id={ids.link}
                type="url"
                dir="ltr"
                inputMode="url"
                autoComplete="off"
                aria-describedby={ids.linkHint}
                placeholder="https://"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className={`${inputClass} mt-2 text-start`}
              />
              <p id={ids.linkHint} className="mt-2 text-sm text-ink/70">
                אין עדיין? יוצרים אותו{" "}
                <a href="#booking" className="font-semibold underline decoration-signal decoration-2 underline-offset-4">
                  בשלב 03
                </a>
                .
              </p>
            </div>

            <fieldset>
              <legend className="sr-only">איש קשר לדברים דחופים</legend>
              <label className="flex cursor-pointer items-center gap-3 text-sm font-bold">
                <input
                  type="checkbox"
                  checked={hasBackup}
                  onChange={(e) => setHasBackup(e.target.checked)}
                  className="size-5 shrink-0 accent-ink"
                />
                יש מי שזמין לדברים דחופים
              </label>
              {hasBackup && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor={ids.name} className="sr-only">
                      שם
                    </label>
                    <input
                      id={ids.name}
                      type="text"
                      autoComplete="off"
                      placeholder="שם"
                      value={backupName}
                      onChange={(e) => setBackupName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor={ids.phone} className="sr-only">
                      טלפון
                    </label>
                    <input
                      id={ids.phone}
                      type="tel"
                      dir="ltr"
                      inputMode="tel"
                      autoComplete="off"
                      placeholder="טלפון"
                      value={backupPhone}
                      onChange={(e) => setBackupPhone(e.target.value)}
                      className={`${inputClass} text-end`}
                    />
                  </div>
                </div>
              )}
            </fieldset>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-ink/70">
            <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
            הכול נשאר אצלכם בדפדפן. שום דבר לא נשמר ולא נשלח אלינו.
          </p>
        </div>
      </aside>

      {/* The three automations */}
      <div className="flex min-w-0 flex-col gap-4 lg:col-span-8 lg:gap-6">
        <AwayCard details={details} />
        <QuickCard details={details} price={price} setPrice={setPrice} />
        <BookingCard end={end} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · Away message                                                   */
/* ------------------------------------------------------------------ */

function ChatPreview({ incoming, lines, from }: { incoming: string; lines: Lines; from: string }) {
  return (
    <div className="mt-7 rounded-[1.5rem] bg-ink-3 p-4 md:p-5">
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <span aria-hidden className="grid size-9 place-items-center rounded-full bg-paper/10 text-sm font-bold">
          {from.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-bold">{from}</p>
          <p className="text-xs text-paper/60">תצוגה מקדימה</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2.5">
        <p className="max-w-[80%] self-start rounded-2xl rounded-ss-md bg-paper/10 px-4 py-2.5">{incoming}</p>
        <div className="max-w-[94%] self-end rounded-2xl rounded-se-md bg-signal px-4 py-3 leading-relaxed text-ink">
          <SegLines lines={lines} />
          <p className="mt-2 text-end text-xs font-semibold text-ink">נשלח אוטומטית ✓✓</p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-4 py-3">
      <dt className="text-xs font-semibold text-paper/60">{label}</dt>
      <dd className="mt-1 leading-snug font-bold">{value}</dd>
    </div>
  );
}

function AwayCard({ details }: { details: Details }) {
  const lines = awayMessage(details);
  return (
    <article
      id="away"
      aria-labelledby="away-title"
      className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-6 text-paper md:p-10"
    >
      <div aria-hidden className="absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-signal/20 blur-3xl" />
      <StepHeader index="01" where="וואטסאפ ביזנס" minutes="5 דקות" tone="ink" />
      <h3 id="away-title" className="mt-5 text-4xl font-black tracking-[-0.03em] md:text-5xl">
        הודעת היעדרות <span className="font-serif font-normal text-signal">עם תאריכים</span>
      </h3>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-paper/75">
        כל מי שכותב יודע שקיבלתם, ומתי תחזרו. ואתם לא עונים מהחוף.
      </p>
      <dl className="mt-7 grid gap-2 sm:grid-cols-2">
        <Info label="איפה" value="הגדרות ← כלים עסקיים ← הודעת היעדרות" />
        <Info label="תזמון" value="״תזמון מותאם אישית״, ובוחרים את ימי החופש" />
      </dl>
      <ChatPreview from="לקוח חדש" incoming="היי, אפשר פרטים?" lines={lines} />
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <CopyButton text={linesToText(lines)} label="העתקת הנוסח" />
        <MissingNote count={missingCount(lines)} />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Quick replies                                                  */
/* ------------------------------------------------------------------ */

function QuickCard({ details, price, setPrice }: { details: Details; price: string; setPrice: (v: string) => void }) {
  const [active, setActive] = useState(0);
  const replies = quickReplies(details);
  const current = replies[active];
  const pickId = useId();
  const priceId = useId();

  const shareText = [
    "3 תשובות מהירות לזמן החופש:",
    ...replies.map((r) => `\n/${r.key}\n${linesToText(r.lines)}`),
    "\nהמדריך המלא: mayakoren.net/guides/vacation",
  ].join("\n");

  return (
    <article
      id="quick"
      aria-labelledby="quick-title"
      className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-6 text-paper md:p-10"
    >
      <div aria-hidden className="absolute -right-28 -bottom-28 -z-10 size-72 rounded-full bg-signal/20 blur-3xl" />
      <StepHeader index="02" where="וואטסאפ ביזנס" minutes="10 דקות" tone="ink" />
      <h3 id="quick-title" className="mt-5 text-4xl font-black tracking-[-0.03em] md:text-5xl">
        תשובות <span className="font-serif font-normal text-signal">מהירות</span>
      </h3>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-paper/75">
        למי שמחליף אתכם, או לכם, ב-10 שניות ביום. מקלידים ״/״ ובוחרים.
      </p>

      <div className="mt-7 rounded-[1.5rem] bg-ink-3 p-4 md:p-5">
        <p id={pickId} className="text-sm text-paper/70">
          בחרו קיצור, וראו מה נשלח:
        </p>
        <div role="group" aria-labelledby={pickId} className="mt-3 flex flex-wrap gap-2">
          {replies.map((r, i) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-base font-bold transition-colors duration-300 ${
                i === active ? "bg-signal text-ink" : "bg-paper/[0.08] text-paper hover:bg-paper/15"
              }`}
            >
              /{r.key}
            </button>
          ))}
        </div>

        <div aria-hidden className="mt-4 flex items-center gap-1 rounded-full bg-paper/[0.06] px-5 py-3 font-bold">
          <span className="text-signal-soft">/{current.key}</span>
          <span className="h-5 w-0.5 animate-pulse bg-signal motion-reduce:animate-none" />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="mt-3 ms-auto max-w-[94%] rounded-2xl rounded-se-md bg-signal px-4 py-3 leading-relaxed text-ink"
          >
            <SegLines lines={current.lines} />
          </motion.div>
        </AnimatePresence>

        {current.key === "מחירון" && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label htmlFor={priceId} className="text-sm font-bold">
              המחיר ההתחלתי שלכם
            </label>
            <input
              id={priceId}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="1500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-11 w-32 rounded-xl border border-white/20 bg-paper/[0.06] px-3 text-paper placeholder:text-paper/40 focus:border-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <CopyButton text={linesToText(current.lines)} label={`העתקת ״/${current.key}״`} />
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-paper/30 py-2 ps-5 pe-6 text-base leading-snug font-bold transition-colors duration-300 hover:border-signal hover:text-signal"
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          שליחת 3 התשובות למי שמחליף אתכם
          <span className="sr-only"> (וואטסאפ, נפתח בחלון חדש)</span>
        </a>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-paper/70">
        <b className="text-paper">איפה:</b> הגדרות ← כלים עסקיים ← תשובות מהירות. ואותן תשובות עובדות גם אחרי החופש.
      </p>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Booking link                                                   */
/* ------------------------------------------------------------------ */

const SLOTS = ["09:00", "09:30", "11:00", "16:30"];

function bookingDays(end: Date) {
  const first = nextWorkday(end);
  const open = [first, nextWorkday(first), nextWorkday(nextWorkday(first))];
  return [
    { date: addDays(end, -1), off: true },
    { date: end, off: true },
    ...open.map((date) => ({ date, off: false })),
  ];
}

function BookingDemo({ end }: { end: Date | null }) {
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const daysId = useId();
  const slotsId = useId();

  const days = end ? bookingDays(end) : null;
  // A picked day stays valid only while it's still one of the open days.
  const picked = days?.find((d) => !d.off && toIsoDate(d.date) === day)?.date ?? null;
  const ready = picked !== null && time !== null;

  function reset() {
    setBooked(false);
    setDay(null);
    setTime(null);
  }

  return (
    <div className="rounded-[1.75rem] bg-ink p-5 text-paper shadow-[0_40px_80px_-40px_rgba(14,14,12,0.6)] md:p-6">
      <p className="text-xl font-black">שיחה קצרה · 20 דק׳</p>
      <p className="mt-1 text-sm text-paper/60">בחרו זמן שנוח לכם</p>

      <AnimatePresence mode="wait" initial={false}>
        {booked && picked ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            className="mt-5 rounded-2xl bg-signal p-5 text-ink"
          >
            <CalendarCheck className="size-7" aria-hidden />
            <p className="mt-3 text-xl font-black">נקבע!</p>
            <p className="mt-1 leading-relaxed">
              {dayAndDate(picked)}, <span dir="ltr">{time}</span>. השיחה מחכה לכם ביומן, והטלפון שלכם עדיין בתיק.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4"
            >
              <RotateCcw className="size-4" aria-hidden />
              לנסות שוב
            </button>
          </motion.div>
        ) : (
          <motion.div key="pick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p id={daysId} className="sr-only">
              יום
            </p>
            <div role="group" aria-labelledby={daysId} className="mt-5 grid grid-cols-5 gap-1.5">
              {days
                ? days.map(({ date, off }) => {
                    const iso = toIsoDate(date);
                    const sel = iso === day && !off;
                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={off}
                        aria-pressed={off ? undefined : sel}
                        aria-label={`${dayName(date)} ${date.getDate()}.${date.getMonth() + 1}${off ? ", בחופש" : ""}`}
                        onClick={() => setDay(iso)}
                        className={`rounded-xl py-2 text-center text-xs font-semibold transition-colors duration-300 ${
                          off
                            ? "cursor-not-allowed bg-paper/[0.05] text-paper/50 line-through"
                            : sel
                              ? "bg-signal text-ink"
                              : "bg-paper/[0.08] hover:bg-paper/15"
                        }`}
                      >
                        {DAY_LETTERS[date.getDay()]}
                        <span className="block font-mono text-lg">{date.getDate()}</span>
                      </button>
                    );
                  })
                : Array.from({ length: 5 }, (_, i) => (
                    <span key={i} aria-hidden className="h-[3.6rem] rounded-xl bg-paper/[0.06]" />
                  ))}
            </div>
            <p id={slotsId} className="sr-only">
              שעה
            </p>
            <div role="group" aria-labelledby={slotsId} className="mt-2 grid grid-cols-2 gap-1.5">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  dir="ltr"
                  aria-pressed={time === s}
                  onClick={() => setTime(s)}
                  className={`rounded-xl border-2 py-2.5 font-mono text-base font-semibold transition-colors duration-300 ${
                    time === s ? "border-signal bg-signal text-ink" : "border-paper/15 hover:border-paper/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!ready}
              onClick={() => setBooked(true)}
              className="mt-3 h-12 w-full rounded-full bg-paper text-base font-black text-ink transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-paper/[0.12] disabled:font-semibold disabled:text-paper/85"
            >
              {ready ? "קביעה" : "בחרו יום ושעה"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <span role="status" className="sr-only">
        {booked && picked ? `נקבע: ${dayAndDate(picked)} בשעה ${time}` : ""}
      </span>
    </div>
  );
}

function BookingCard({ end }: { end: Date | null }) {
  return (
    <article id="booking" aria-labelledby="booking-title" className="rounded-[2rem] border border-ink/10 bg-paper p-6 md:p-10">
      <StepHeader index="03" where="יומן Google" minutes="10 דקות" tone="paper" />
      <h3 id="booking-title" className="mt-5 text-4xl font-black tracking-[-0.03em] md:text-5xl">
        קישור אחד <span className="mark-signal font-serif font-normal">במקום 6 הודעות</span>
      </h3>
      <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink/75">
        הלקוחות קובעים לבד שיחה לאחרי החופש. אתם חוזרים ליומן מסודר.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <ol className="flex flex-col gap-3">
            {bookingSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-paper"
                >
                  {i + 1}
                </span>
                <span className="pt-1 leading-snug font-semibold">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-2xl bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink/75">
            <b className="text-ink">בחינם, גם בחשבון Google רגיל.</b> שמות התפריטים יכולים להשתנות מעט בין גרסאות.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold">ככה זה נראה אצל הלקוח שלכם. נסו לקבוע:</p>
          <BookingDemo end={end} />
        </div>
      </div>
    </article>
  );
}
