"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { applyA11y, defaultA11y, loadA11y, saveA11y, type A11ySettings } from "@/lib/a11y";

type A11yContextValue = {
  settings: A11ySettings;
  update: (patch: Partial<A11ySettings>) => void;
  reset: () => void;
};

const A11yContext = createContext<A11yContextValue>({
  settings: defaultA11y,
  update: () => {},
  reset: () => {},
});

export function useA11y() {
  return useContext(A11yContext);
}

/**
 * True when motion should be avoided: OS "reduce motion" or the site's
 * "stop animations" toggle. Auto-advancing / auto-updating content must
 * stay still when this is true (WCAG 2.2.2 Pause, Stop, Hide).
 */
export function useStillness() {
  const reduce = useReducedMotion();
  const { settings } = useA11y();
  return Boolean(reduce) || settings.stopMotion;
}

export function Providers({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(defaultA11y);

  // Sync from storage after hydration. The init script applies preferences before
  // first paint, but React resets <html className> while hydrating — so re-apply.
  useEffect(() => {
    const stored = loadA11y();
    applyA11y(stored);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage after hydration
    setSettings(stored);
  }, []);

  const update = useCallback((patch: Partial<A11ySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      applyA11y(next);
      saveA11y(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    applyA11y(defaultA11y);
    saveA11y(defaultA11y);
    setSettings(defaultA11y);
  }, []);

  const value = useMemo(() => ({ settings, update, reset }), [settings, update, reset]);

  return (
    <A11yContext.Provider value={value}>
      <MotionConfig reducedMotion={settings.stopMotion ? "always" : "user"}>{children}</MotionConfig>
    </A11yContext.Provider>
  );
}
