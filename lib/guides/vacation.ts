/**
 * Free guide: "3 automations for a real vacation" (approved by Maya, 2026-11-08).
 * Interactive version of the PDF / video guide, served at /guides/vacation.
 * The copy follows the approved guide. Readers type their own details into the
 * page; nothing is stored or sent anywhere.
 */

export const vacationGuide = {
  href: "/guides/vacation",
  metaTitle: "3 אוטומציות שמאפשרות לצאת לחופש אמיתי",
  metaDescription:
    "מדריך חינמי ואינטראקטיבי: הודעת היעדרות עם תאריכים, תשובות מהירות וקישור שבו הלקוחות קובעים שיחה לבד. בלי לקנות שום מערכת, כ-30 דקות הגדרה.",
  lead: "בלי לקנות שום מערכת. כ-30 דקות הגדרה, והטלפון נשאר בתיק.",
  whatsappMessage: "היי מאיה, הגעתי מהמדריך (חופש)",
  /** The same guide as an 8-page PDF, in public/guides/. */
  pdfHref: "/guides/vacation-guide.pdf",
  pdfSize: "1.1MB",
  instagram: { handle: "mayakoren.studio", href: "https://www.instagram.com/mayakoren.studio/" },
} as const;

/** The three things that pull you back to the phone, each solved by one automation. */
export const inbox = [
  {
    from: "לקוח חדש",
    time: "עכשיו",
    message: "היי, אפשר פרטים? מחכה לתשובה 🙏",
    fix: "01",
    reply: "קיבל מיד הודעת היעדרות עם התאריכים",
  },
  {
    from: "לקוחה",
    time: "לפני 2 דק׳",
    message: "כמה זה עולה בערך?",
    fix: "02",
    reply: "מי שמחליף אתכם ענה ב״/מחירון״, בשתי שניות",
  },
  {
    from: "ספק",
    time: "לפני 6 דק׳",
    message: "מתי אפשר לקבוע פגישה?",
    fix: "03",
    reply: "קיבל קישור, וקבע לבד שיחה לאחרי החופש",
  },
] as const;

export const automations = [
  { id: "away", index: "01", name: "הודעת היעדרות", minutes: "5 דק׳" },
  { id: "quick", index: "02", name: "תשובות מהירות", minutes: "10 דק׳" },
  { id: "booking", index: "03", name: "קישור לקביעת שיחה", minutes: "10 דק׳" },
] as const;

export const bookingSteps = [
  "נכנסים ליומן Google מהמחשב",
  "יצירה ← לוח זמנים לקביעת פגישות",
  "אורך שיחה ושעות פנויות, מהיום שאחרי החופש",
  "שמירה ← שיתוף ← מעתיקים קישור",
  "מדביקים בהודעת ההיעדרות ובתשובה ״/זמינות״",
] as const;

export const checklist = [
  { text: "מפעילים הודעת היעדרות עם התאריכים" },
  { text: "מדביקים בה את הקישור לקביעת שיחה" },
  { text: "שולחים למי שמחליף אתכם את התשובות המהירות" },
  { text: "חוסמים ביומן את ימי החופש", note: "כדי שאף אחד לא יקבע שיחה באמצע" },
  { text: "ומכבים את ההתראות של וואטסאפ ביזנס", note: "ברצינות." },
] as const;

export const systemFlow = [
  { time: "יום ג׳, 14:12", text: "לקוח כותב לכם באמצע החופש" },
  { time: "14:12", text: "מקבל תשובה תוך שניות" },
  { time: "14:15", text: "קובע לבד שיחה ביומן" },
  { time: "כשחוזרים", text: "ואתם רואים אותה כשאתם חוזרים" },
] as const;

/* ------------------------------------------------------------------ */
/* Dates (local time, Israeli work week: Sunday–Thursday)              */
/* ------------------------------------------------------------------ */

const DAY_NAMES = ["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", "שבת"];
export const DAY_LETTERS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

export function parseIsoDate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toIsoDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

const isWorkday = (d: Date) => d.getDay() <= 4;

/** First working day after the given date. */
export function nextWorkday(after: Date): Date {
  let d = addDays(after, 1);
  while (!isWorkday(d)) d = addDays(d, 1);
  return d;
}

/** A sensible example: a vacation that ends on the Thursday at least 5 days from today. */
export function defaultVacationEnd(today: Date): Date {
  let d = addDays(today, 5);
  while (d.getDay() !== 4) d = addDays(d, 1);
  return d;
}

export const dayName = (d: Date) => DAY_NAMES[d.getDay()];
export const shortDate = (d: Date) => `${d.getDate()}.${d.getMonth() + 1}`;
export const dayAndDate = (d: Date) => `${dayName(d)}, ${shortDate(d)}`;

/* ------------------------------------------------------------------ */
/* Message templates                                                   */
/* ------------------------------------------------------------------ */

/** Plain text, or a slot that comes from the reader's details (or is still missing). */
export type Seg = string | { value: string; filled: boolean };
export type Lines = Seg[][];

export type Details = {
  end: Date | null;
  link: string;
  hasBackup: boolean;
  backupName: string;
  backupPhone: string;
  price: string;
};

const slot = (value: string, placeholder: string): Seg =>
  value.trim() ? { value: value.trim(), filled: true } : { value: placeholder, filled: false };

const dateSlot = (d: Date | null, format: (d: Date) => string): Seg =>
  d ? { value: format(d), filled: true } : { value: "[תאריך]", filled: false };

function priceText(raw: string): string {
  const v = raw.trim().replace(/[₪,\s]/g, "");
  return /^\d+$/.test(v) ? `₪${Number(v).toLocaleString("en-US")}` : raw.trim();
}

export function awayMessage(d: Details): Lines {
  const back = d.end ? nextWorkday(d.end) : null;
  const lines: Lines = [
    ["היי, תודה שכתבתם! 🌴 אנחנו בחופשה עד ", dateSlot(d.end, dayAndDate), ", וחוזרים לענות ב", dateSlot(back, dayName), " בבוקר."],
    ["רוצים לקבוע שיחה? בחרו זמן שנוח לכם כאן: ", slot(d.link, "[הקישור שלכם]")],
  ];
  if (d.hasBackup) {
    lines.push(["ממש דחוף? אפשר להשיג את ", slot(d.backupName, "[שם]"), " בטלפון ", slot(d.backupPhone, "[טלפון]"), "."]);
  }
  return lines;
}

export function quickReplies(d: Details): { key: string; lines: Lines }[] {
  const back = d.end ? nextWorkday(d.end) : null;
  return [
    {
      key: "קיבלתי",
      lines: [["קיבלתי, תודה! אני בחופשה עד ", dateSlot(d.end, shortDate), ", ואחזור אליכם ב", dateSlot(back, dayName), " בבוקר."]],
    },
    {
      key: "זמינות",
      lines: [["אפשר לקבוע שיחה קצרה כאן, בזמן שנוח לכם: ", slot(d.link, "[הקישור שלכם]")]],
    },
    {
      key: "מחירון",
      lines: [
        [
          "המחירים מתחילים ב-",
          slot(priceText(d.price), "[המחיר שלכם]"),
          ". ספרו לי בשתי שורות מה צריך, ואחזור עם הצעה מדויקת.",
        ],
      ],
    },
  ];
}

export const linesToText = (lines: Lines) =>
  lines.map((line) => line.map((s) => (typeof s === "string" ? s : s.value)).join("")).join("\n");

export const missingCount = (lines: Lines) =>
  lines.flat().filter((s) => typeof s !== "string" && !s.filled).length;
