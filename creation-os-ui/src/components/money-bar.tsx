"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type MoneyBarItem = {
  label: string
  value: string
  delta?: string
  intent?: "good" | "bad" | "neutral"
}

function useNumberTicker(to: number, duration = 1200) {
  const [val, setVal] = React.useState(0)
  React.useEffect(() => {
    let raf = 0
    const start = performance.now()
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setVal(Math.floor(p * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return val
}

function TickedValue({ value }: { value: string }) {
  // Attempt to animate integer part if numeric
  const m = value.match(/^(\D*)([\d,\.]+)(.*)$/)
  if (!m) return <>{value}</>
  const [, prefix, numStr, suffix] = m
  const plain = Number(numStr.replace(/[^0-9.]/g, ""))
  const hasNumber = !Number.isNaN(plain)
  const animated = useNumberTicker(hasNumber ? Math.round(plain) : 0)
  return (
    <>
      {prefix}
      {hasNumber ? animated.toLocaleString("fi-FI") : numStr}
      {suffix}
    </>
  )
}

export function MoneyBar({ items, className }: { items: MoneyBarItem[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3", className)}>
      {items.map((it) => (
        <div key={it.label} className="rounded-xl border bg-card p-4 flex items-center justify-between card-premium">
          <div>
            <p className="text-xs text-muted-foreground">{it.label}</p>
            <p className="text-lg font-semibold"><TickedValue value={it.value} /></p>
          </div>
          {it.delta ? (
            <span className={cn(
              "text-xs font-medium",
              it.intent === "good" ? "text-green-600" : it.intent === "bad" ? "text-red-600" : "text-muted-foreground"
            )}>
              {it.delta}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
