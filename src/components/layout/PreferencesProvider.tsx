"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePreferences, type MotionLevel, type Radius, type Density } from "@/store/preferences";
import type { AccentId } from "@/config/site";

type ResolvedTheme = "light" | "dark";

const ResolvedThemeContext = createContext<ResolvedTheme>("light");

export function useResolvedTheme(): ResolvedTheme {
  return useContext(ResolvedThemeContext);
}

/**
 * Applies preference state to <html> data-attributes (theme, accent,
 * density, radius, motion). The inline script in app/layout.tsx performs the
 * same work pre-hydration to avoid a flash; this keeps them in sync and
 * reacts to system theme changes while in "system" mode.
 */
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const theme = usePreferences((s) => s.theme);
  const accent = usePreferences((s) => s.accent);
  const density = usePreferences((s) => s.density);
  const radius = usePreferences((s) => s.radius);
  const motion = usePreferences((s) => s.motion);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(media.matches);
    const handler = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const resolved: ResolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.theme = resolved;
    html.dataset.accent = accent as AccentId;
    html.dataset.density = density as Density;
    html.dataset.radius = radius as Radius;
    html.dataset.motion = motion as MotionLevel;
  }, [resolved, accent, density, radius, motion]);

  return (
    <ResolvedThemeContext.Provider value={resolved}>{children}</ResolvedThemeContext.Provider>
  );
}
