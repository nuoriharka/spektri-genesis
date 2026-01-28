"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  type LegendProps,
  type TooltipProps,
} from "recharts"

type Datum = { label: string; value: number }

type ChartArea3DProps = {
  data: Datum[]
  className?: string
  height?: number
  accent?: "cyan" | "violet"
}

export function ChartArea3D({
  data,
  className,
  height = 180,
  accent = "cyan",
}: ChartArea3DProps) {
  const gradId = React.useId()
  const isCyan = accent === "cyan"

  // CSS variable driven colors to match the dark hero
  const stroke = isCyan ? "hsl(var(--quantum-blue))" : "hsl(var(--creation-os-violet))"
  const dot = isCyan ? "#67e8f9" /* cyan-300 */ : "#c4b5fd" /* violet-300 */

  const min = Math.min(...data.map((d) => d.value))
  const max = Math.max(...data.map((d) => d.value))
  const padding = Math.max(1, Math.round((max - min) * 0.12))

  return (
    <div className={cn("w-full h-44", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 8, left: 0, right: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`area-${gradId}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={dot} stopOpacity={0.35} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0.06} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "rgba(226,232,240,0.7)", fontSize: 11 }}
            dy={4}
          />
          <YAxis hide domain={[min - padding, max + padding]} />
          <Tooltip content={<Area3DTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />

          <Area
            type="monotone"
            dataKey="value"
            stroke={dot}
            strokeWidth={2}
            fill={`url(#area-${gradId})`}
            activeDot={{ r: 5, fill: dot }}
            dot={{ r: 2, fill: dot, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function Area3DTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const p = payload[0]
  return (
    <div className="rounded-md border border-white/10 bg-slate-900/80 px-2 py-1 text-xs text-white shadow-xl backdrop-blur">
      <div className="opacity-80">{p.payload.label}</div>
      <div className="font-semibold">{p.value}</div>
    </div>
  )
}

// --- shadcn-style chart helpers and re-exports ---
export type ChartConfig = {
  [k: string]: { label?: React.ReactNode; color?: string }
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ReactNode
}) {
  // Inline CSS vars for keys used in config
  const styleVars = Object.fromEntries(
    Object.entries(config)
      .filter(([, v]) => !!v.color)
      .map(([key, v]) => [`--color-${key}`, v.color as string])
  ) as React.CSSProperties

  return (
    <div className={cn("flex w-full", className)} style={styleVars} {...props}>
      <ResponsiveContainer>{children as any}</ResponsiveContainer>
    </div>
  )
}

export const ChartTooltip = Tooltip as any

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  className,
}: TooltipProps<number, string> & React.ComponentProps<"div">) {
  if (!active || !payload?.length) return null
  const fmtLabel = labelFormatter ? labelFormatter(label as any, payload as any) : label
  return (
    <div className={cn("rounded-md border border-white/10 bg-slate-900/80 px-2 py-1 text-xs text-white shadow-xl backdrop-blur", className)}>
      {fmtLabel ? <div className="opacity-80">{fmtLabel as any}</div> : null}
      <div className="mt-0.5 grid gap-0.5">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <span className="text-slate-300">{p.name}</span>
            <span className="font-semibold tabular-nums">{p.value as any}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const ChartLegend = Legend as any

export function ChartLegendContent({ payload, className, verticalAlign }: LegendProps & { className?: string }) {
  if (!payload?.length) return null
  return (
    <div className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}>
      {payload.map((item, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: (item as any).color }} />
          <span className="text-xs text-slate-300">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export { Area, AreaChart, CartesianGrid, XAxis }
 
