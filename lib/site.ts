/**
 * Global site settings — contact details, legal identity and navigation.
 */
export const site = {
  /** The brand is written only in Hebrew. Never "Koren.net" in Latin: koren.net is someone else's domain. */
  name: "קורן.נט",
  url: "https://mayakoren.net",
  /** Domain as shown to readers, e.g. "mayakoren.net". */
  domain: "mayakoren.net",
  tagline: "תשתיות תפעול, אוטומציות ומערכות לעסקים בצמיחה",
  description:
    "קורן.נט בונה לעסקים בצמיחה תשתית תפעולית שעובדת: תהליכים ברורים, אוטומציות חכמות ומערכות שמדברות זו עם זו — כדי שהעסק ירוץ ויגדל בלי שתצטרכו להחזיק אותו בידיים.",

  whatsappNumber: "972504400150",
  whatsappDefaultMessage:
    "היי, הגעתי מהאתר של קורן.נט ואשמח לשיחת היכרות על העסק שלי.",
  phone: "+972504400150",
  phoneDisplay: "050-440-0150",
  email: "office@mayakoren.net",
  year: 2026,

  /**
   * Legal identity of the site operator. Fill these in to complete the legal
   * pages — each field is shown only when it has a value.
   */
  legal: {
    entityName: "", // e.g. "מאיה קורן" / registered company name
    businessId: "", // ע.מ. / ח.פ.
    address: "",
    accessibilityCoordinator: "", // name of the person handling accessibility requests
  },

  /** Date the legal pages were last reviewed. Update on every legal revision. */
  legalUpdated: { iso: "2026-11-07", display: "7 בנובמבר 2026" },
} as const;

export const nav = [
  { href: "/services", label: "שירותים" },
  { href: "/services/websites", label: "אתרים" },
  { href: "/#method", label: "השיטה" },
  { href: "/about", label: "אודות" },
  { href: "/#faq", label: "שאלות" },
  { href: "/contact", label: "יצירת קשר" },
] as const;

export const pagesNav = [
  { href: "/", label: "עמוד הבית" },
  { href: "/services", label: "שירותים ומוצרים" },
  { href: "/services/websites", label: "אתרים ודפי נחיתה" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "יצירת קשר" },
] as const;

export const legalNav = [
  { href: "/accessibility", label: "הצהרת נגישות" },
  { href: "/privacy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תקנון ותנאי שימוש" },
  { href: "/cookies", label: "מדיניות עוגיות" },
] as const;

export function whatsappHref(message: string = site.whatsappDefaultMessage) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const mailHref = `mailto:${site.email}`;
export const telHref = `tel:${site.phone}`;
