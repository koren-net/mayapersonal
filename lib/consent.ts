/**
 * Cookie consent storage.
 *
 * Follows the Israeli Privacy Protection Authority's position (Feb 2026) on
 * consent: non-essential cookies stay off until the visitor actively opts in,
 * rejecting is as easy as accepting, and the choice can be changed anytime.
 *
 * To add an analytics/marketing tool later, register it in lib/tracking.ts —
 * it will load only for visitors who consented to its category.
 */
export type ConsentCategory = "analytics" | "marketing";

export type Consent = {
  v: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  date: string; // ISO timestamp of the choice
};

export const CONSENT_COOKIE = "koren_consent";
/** Bump to re-ask everyone (e.g. when new tracking categories are added). */
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 365;

/** Fired on window after the visitor saves a choice. */
export const CONSENT_CHANGE_EVENT = "koren:consent-change";
/** Fire on window to reopen the preferences panel (footer link, cookie page). */
export const OPEN_CONSENT_EVENT = "koren:open-consent";

export function readConsent(): Consent | null {
  try {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    if (!match) return null;
    const parsed = JSON.parse(decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1))) as Consent;
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: { analytics: boolean; marketing: boolean }): Consent {
  const consent: Consent = {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    date: new Date().toISOString(),
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${
    CONSENT_MAX_AGE_DAYS * 86400
  }; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
  return consent;
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
