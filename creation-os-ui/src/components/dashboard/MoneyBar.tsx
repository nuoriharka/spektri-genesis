"use client";
import { useEffect, useRef, useState } from "react";

type KPI = { label: string; value: number; prefix?: string; suffix?: string };
export function MoneyBar({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {items.map((k) => (
        <div
          key={k.label}
          className="rounded-2xl bg-[var(--panel,#111316)]/90 backdrop-blur p-4 border border-white/5"
        >
          <div className="text-[13px] text-[var(--muted,#9BA3AF)]">{k.label}</div>
          <div className="text-2xl font-semibold text-[var(--fg,#E7E9EC)] mt-1">
            <NumberTicker value={k.value} prefix={k.prefix} suffix={k.suffix} />
          </div>
        </div>
      ))}
    </div>
  );
}

function NumberTicker({
  value,
  duration = 800,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setDisplay(value); fromRef.current = value; return }
    const start = performance.now();
    const from = fromRef.current;
    const delta = value - from;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const v = from + delta * eased;
      setDisplay(v);
      if (p < 1) raf = requestAnimationFrame(step);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span aria-live="polite">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
