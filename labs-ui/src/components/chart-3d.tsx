"use client"
import React, { useId, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Chart3DProps = {
  title?: string
  description?: string
  data: number[]
  labels?: string[]
  height?: number
  className?: string
}

export function Chart3D({ title, description, data, labels, height = 240, className }: Chart3DProps) {
  const gid = useId().replace(/:/g, "")
  const gradientId = `grad_${gid}`
  const shadowId = `shadow_${gid}`

  const rows = useMemo(() => {
    return data.map((v, i) => ({ x: labels?.[i] ?? String(i + 1), y: v }))
  }, [data, labels])

  return (
    <div className={className}>
      {title ? (
        <div className="mb-2">
          <div className="text-sm text-muted-foreground">{description}</div>
          <div className="text-base font-medium">{title}</div>
        </div>
      ) : null}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--quantum-blue))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--quantum-blue))" stopOpacity={0} />
              </linearGradient>
              <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,0.25)" />
              </filter>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
            <XAxis dataKey="x" tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                background: "rgba(2,6,23,0.9)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                color: "white",
                backdropFilter: "blur(8px)",
              }}
              labelStyle={{ color: "#cbd5e1" }}
              cursor={{ stroke: "rgba(148,163,184,0.25)", strokeDasharray: 4 }}
            />
            <Area
              type="monotone"
              dataKey="y"
              stroke="hsl(var(--quantum-blue))"
              strokeWidth={2.4}
              filter={`url(#${shadowId})`}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              dot={{ r: 0 }}
              activeDot={{ r: 4, fill: "hsl(var(--quantum-blue))", stroke: "white", strokeWidth: 1 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
