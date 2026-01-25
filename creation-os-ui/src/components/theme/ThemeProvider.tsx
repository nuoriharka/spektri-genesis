"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
type Theme = "tech" | "designer";
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void; };
const ThemeCtx = createContext<Ctx | null>(null);
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const sp = useSearchParams();
  const queryTheme = (sp.get("theme") as Theme) || null;
  const [theme, setTheme] = useState<Theme>("tech");
  useEffect(() => {
    const stored = (localStorage.getItem("creation_os_theme") as Theme) || "tech";
    setTheme(queryTheme ?? stored);
  }, [queryTheme]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("creation_os_theme", theme);
  }, [theme]);
  const value = useMemo<Ctx>(() => ({
    theme,
    setTheme,
    toggle: () => setTheme(t => (t === "tech" ? "designer" : "tech")),
  }), [theme]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
export const useThemeMode = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider");
  return ctx;
};
