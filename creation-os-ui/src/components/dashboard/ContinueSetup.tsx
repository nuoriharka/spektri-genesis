"use client";
import { useState } from "react";

const STEPS = [
  { id: "connect", label: "Yhdistä ensimmäinen integraatio" },
  { id: "run", label: "Aja esimerkkimalli (60 s)" },
  { id: "agent", label: "Luo ensimmäinen oma agentti" },
];

export default function ContinueSetup() {
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="rounded-2xl bg-[var(--panel,#111316)]/90 backdrop-blur p-4 border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-[var(--fg,#E7E9EC)]">Jatka aloitusta</h3>
        <span className="text-xs text-[var(--muted,#9BA3AF)]">
          {done.length}/{STEPS.length}
        </span>
      </div>
      <ul className="space-y-2">
        {STEPS.map((s) => {
          const checked = done.includes(s.id);
          return (
            <li
              key={s.id}
              className="flex items-center gap-3 rounded-xl px-3 py-2 bg-black/20 border border-white/5"
            >
              <button
                aria-label={checked ? "Valmis" : "Merkitse valmiiksi"}
                onClick={() =>
                  setDone((d) => (d.includes(s.id) ? d.filter((x) => x !== s.id) : [...d, s.id]))
                }
                className={`size-5 rounded-md border ${checked ? "bg-emerald-500/90 border-emerald-400" : "bg-transparent border-white/20"}`}
              />
              <span className="text-sm text-[var(--fg,#E7E9EC)]">{s.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
