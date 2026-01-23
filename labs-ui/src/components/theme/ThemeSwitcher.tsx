"use client";
import { useThemeMode } from "./ThemeProvider";
export default function ThemeSwitcher() {
  const { theme, toggle, setTheme } = useThemeMode();
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={toggle}
        className="rounded-full border border-[var(--ring)] px-3 py-1 text-xs"
      >
        Teema: {theme === "tech" ? "Tech" : "Designer"}
      </button>
      <button onClick={() => setTheme("tech")} className="text-xs opacity-70 hover:opacity-100">Tech</button>
      <button onClick={() => setTheme("designer")} className="text-xs opacity-70 hover:opacity-100">Designer</button>
    </div>
  );
}
