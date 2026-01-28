"use client";

export function TopAgents() {
  const items = [
    { name: "Content Creator", status: "active", lastRun: "2m ago" },
    { name: "Data Processor", status: "active", lastRun: "15m ago" },
    { name: "Email Assistant", status: "paused", lastRun: "1h ago" },
    { name: "Social Media", status: "active", lastRun: "2h ago" },
    { name: "QA Reporter", status: "active", lastRun: "3h ago" },
  ];
  return (
    <ul className="space-y-2">
      {items.map((a) => (
        <li key={a.name} className="flex items-center justify-between rounded-xl px-3 py-2 bg-black/20 border border-white/5">
          <div className="text-sm text-[var(--fg,#E7E9EC)]">{a.name}</div>
          <div className="text-xs text-[var(--muted,#9BA3AF)]">{a.lastRun}</div>
        </li>
      ))}
    </ul>
  );
}
