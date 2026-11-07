import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/consent/CookieConsent";
import { LegalDocument, type LegalSection } from "@/components/legal/LegalDocument";
import { A11Y_STORAGE_KEY } from "@/lib/a11y";
import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS } from "@/lib/consent";
import { mailHref, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות עוגיות",
  description: "אילו עוגיות ואחסון מקומי משמשים באתר קורן.נט, לאיזו מטרה, לכמה זמן — ואיך משנים את ההסכמה.",
  alternates: { canonical: "/cookies" },
};

const sections: LegalSection[] = [
  {
    id: "what",
    title: "מה הן עוגיות",
    body: (
      <p>
        עוגיות (Cookies) הן קובצי טקסט קטנים שאתר שומר בדפדפן שלכם. ״אחסון מקומי״ (Local Storage) הוא מנגנון
        דומה שמאפשר לאתר לזכור הגדרות במכשיר שלכם. שניהם משמשים, בין היתר, כדי שהאתר יפעל כראוי ויזכור את
        הבחירות שלכם.
      </p>
    ),
  },
  {
    id: "approach",
    title: "הגישה שלנו",
    body: (
      <>
        <p>
          אנחנו משתמשים במינימום הנדרש. עוגיות ואחסון <strong>הכרחיים</strong> פועלים תמיד, כי בלעדיהם האתר לא
          יוכל לזכור את הבחירות שלכם. עוגיות <strong>סטטיסטיקה</strong> ו<strong>שיווק</strong> יופעלו רק אם תאשרו
          זאת באופן אקטיבי — ובאותה קלות תוכלו לסרב או לחזור בכם בכל עת.
        </p>
        <p>
          גישה זו תואמת את חוק הגנת הפרטיות ואת עמדת הרשות להגנת הפרטיות בנושא הסכמה, המעדיפה הסכמה מפורשת
          (opt-in) לשימושים שאינם הכרחיים.
        </p>
      </>
    ),
  },
  {
    id: "list",
    title: "העוגיות והאחסון שבשימוש",
    body: (
      <>
        <div className="overflow-x-auto">
          <table>
            <caption className="sr-only">רשימת העוגיות ורכיבי האחסון באתר</caption>
            <thead>
              <tr>
                <th scope="col">שם</th>
                <th scope="col">סוג</th>
                <th scope="col">קטגוריה</th>
                <th scope="col">מטרה</th>
                <th scope="col">תוקף</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td dir="ltr" className="font-mono text-sm">{CONSENT_COOKIE}</td>
                <td>עוגייה (צד ראשון)</td>
                <td>הכרחית</td>
                <td>שמירת הבחירה שלכם לגבי עוגיות, כדי שלא נשאל שוב בכל ביקור.</td>
                <td>{CONSENT_MAX_AGE_DAYS / 30 >= 12 ? "12 חודשים" : `${CONSENT_MAX_AGE_DAYS} ימים`}</td>
              </tr>
              <tr>
                <td dir="ltr" className="font-mono text-sm">{A11Y_STORAGE_KEY}</td>
                <td>אחסון מקומי (צד ראשון)</td>
                <td>הכרחי</td>
                <td>שמירת הגדרות הנגישות שבחרתם בתפריט הנגישות.</td>
                <td>עד למחיקה או לאיפוס ההגדרות</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="note">
          <strong>נכון להיום, האתר אינו משתמש בעוגיות סטטיסטיקה או שיווק, ואינו מפעיל כלי מעקב של צד שלישי.</strong>{" "}
          אם נוסיף כלים כאלה, הם יופעלו רק לאחר הסכמתכם, הטבלה תעודכן, ונבקש את הסכמתכם מחדש.
        </p>
      </>
    ),
  },
  {
    id: "manage",
    title: "ניהול ההסכמה",
    body: (
      <>
        <p>אפשר לשנות את הבחירה שלכם בכל רגע:</p>
        <p>
          <CookieSettingsButton className="inline-flex h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper transition-transform active:scale-[0.97]" />
        </p>
        <p>
          בנוסף, אפשר למחוק או לחסום עוגיות דרך הגדרות הדפדפן. שימו לב: חסימת עוגיות הכרחיות עלולה לגרום לכך
          שהאתר לא יזכור את הבחירות שלכם.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "שירותי צד שלישי",
    body: (
      <p>
        לחיצה על קישור ל-WhatsApp או לשירות חיצוני אחר מעבירה אתכם לשירות שאינו בשליטתנו, והוא עשוי להשתמש
        בעוגיות משלו בהתאם למדיניות שלו. מומלץ לעיין במדיניות הפרטיות של אותו שירות.
      </p>
    ),
  },
  {
    id: "contact",
    title: "שאלות ועדכונים",
    body: (
      <p>
        מדיניות זו מתעדכנת עם כל שינוי בשימוש בעוגיות. תאריך העדכון האחרון מופיע בראש העמוד. לשאלות:{" "}
        <a href={mailHref}>{site.email}</a>. מידע נוסף על השימוש במידע אישי — ב
        <Link href="/privacy">מדיניות הפרטיות</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalDocument
      label="מדיניות עוגיות"
      title="מדיניות עוגיות"
      intro="אילו עוגיות פועלות באתר, למה הן שם, ואיך שולטים בהן. התשובה הקצרה: רק ההכרחיות, אלא אם תבחרו אחרת."
      sections={sections}
    />
  );
}
