"use client"

import { useEffect, useRef, useState } from "react"

type Stat = { label: string; value: number; suffix?: string }

const DEFAULTS: Stat[] = [
  { label: "Aktiiviset agentit", value: 12 },
  { label: "Tehtävät / vrk", value: 1942 },
  { label: "Kesk. tarkkuus", value: 98.3, suffix: "%" },
]

function useCountUp(target: number, durationMs = 1200) {
  const [n, setN] = useState(0)
  const raf = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const step = (t: number) => {
      if (startRef.current == null) startRef.current = t
      const elapsed = t - startRef.current
      const p = Math.min(1, elapsed / durationMs)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setN(Math.round(target * eased))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, durationMs])

  return n
}

export function AnimatedStats({ stats = DEFAULTS }: { stats?: Stat[] }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.3 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const values = stats.map((s) => useCountUp(visible ? s.value : 0))

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-white">
              <div className="text-3xl font-semibold tabular-nums">
                {values[i]}
                {s.suffix ?? ""}
              </div>
              <div className="mt-1 text-sm text-slate-300">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
