"use client";
import { useEffect, useState } from "react";
type Tokens = {
  bg: string; fg: string; panel: string; muted: string; brand: string; radius: number;
  font: "tech" | "designer";
};
function getComputedStyleSafe(v: string) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
}
const defaults: Tokens = {
  bg: getComputedStyleSafe("--bg") || "#0B0C0E",
  fg: getComputedStyleSafe("--fg") || "#E7E9EC",
  panel: getComputedStyleSafe("--panel") || "#111316",
  muted: getComputedStyleSafe("--muted") || "#9BA3AF",
  brand: getComputedStyleSafe("--brand") || "#6D6AFF",
  radius: 16,
  font: "tech",
};
export default function ThemeBuilderPage() {
  const [tokens, setTokens] = useState<Tokens>(defaults);
  useEffect(() => {
    const saved = localStorage.getItem("creation_os_theme_tokens");
    if (saved) setTokens(JSON.parse(saved));
  }, []);
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--bg", tokens.bg);
    r.style.setProperty("--fg", tokens.fg);
    r.style.setProperty("--panel", tokens.panel);
    r.style.setProperty("--muted", tokens.muted);
    r.style.setProperty("--brand", tokens.brand);
    r.style.setProperty("--radius", `${tokens.radius}px`);
    r.setAttribute("data-theme", tokens.font === "tech" ? "tech" : "designer");
    localStorage.setItem("creation_os_theme_tokens", JSON.stringify(tokens));
  }, [tokens]);
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="[font-family:var(--font-display-active)] text-3xl font-semibold mb-6">Theme Builder</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {(["bg","fg","panel","muted","brand"] as (keyof Tokens)[]).map((k) => (
            <div key={k.toString()}>
              <label className="block text-sm mb-1 uppercase tracking-wider">{k}</label>
              <input
                type="color"
                value={tokens[k] as string}
                onChange={(e) => setTokens({ ...tokens, [k]: e.target.value })}
                className="h-10 w-20 cursor-pointer rounded border border-white/10 bg-transparent"
              />
              <input
                type="text"
                value={tokens[k] as string}
                onChange={(e) => setTokens({ ...tokens, [k]: e.target.value })}
                className="ml-3 w-40 rounded border border-white/10 bg-transparent px-2 py-1 text-sm"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm mb-1 uppercase tracking-wider">radius</label>
            <input
              type="range" min={0} max={24} value={tokens.radius}
              onChange={(e) => setTokens({ ...tokens, radius: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm mb-1 uppercase tracking-wider">Font set</label>
            <select
              value={tokens.font}
              onChange={(e) => setTokens({ ...tokens, font: e.target.value as Tokens["font"] })}
              className="rounded border border-white/10 bg-transparent px-2 py-1 text-sm"
            >
              <option value="tech">Tech</option>
              <option value="designer">Designer</option>
            </select>
          </div>
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = "creation-os-theme.json"; a.click();
              URL.revokeObjectURL(url);
            }}
            className="mt-4 rounded bg-[var(--brand)] px-4 py-2 text-sm text-white"
          >
            Export JSON
          </button>
        </div>
        <div className="rounded-[var(--radius)] border border-white/10 bg-[var(--panel)] p-6">
          <h2 className="[font-family:var(--font-display-active)] text-2xl mb-2">Live Preview</h2>
          <p className="text-[color:var(--muted)] mb-4">Otsikot käyttävät display-fonttia, leipäteksti sansia.</p>
          <button className="rounded-[var(--radius)] bg-[var(--brand)] px-4 py-2 text-sm text-white">CTA-nappi</button>
        </div>
      </div>
    </div>
  );
}
