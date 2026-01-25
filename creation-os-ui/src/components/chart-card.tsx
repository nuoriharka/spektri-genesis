"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Point = { x: number; y: number }

type ChartCardProps = {
  title: string
  description?: string
  data: number[]
  labels?: string[]
  className?: string
  accentClassName?: string // e.g., 'stroke-creation-os-violet'
  variant?: 'brand' | 'cool'
}

export function ChartCard({ title, description, data, labels, className, accentClassName, variant = 'brand' }: ChartCardProps) {
  const width = 600
  const height = 160
  const padding = 16
  const gradientId = React.useId()

  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = Math.max(max - min, 1)

  const points: Point[] = data.map((v, i) => ({
    x: padding + (i * (width - padding * 2)) / Math.max(data.length - 1, 1),
    y: padding + (1 - (v - min) / range) * (height - padding * 2),
  }))

  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(" ")

  // area fill under line
  const areaPath = points.length
    ? `${path} L ${padding + (width - padding * 2)} ${height - padding} L ${padding} ${height - padding} Z`
    : ""

  // derive a fill color class from accentClassName when it encodes a stroke color
  const pointFillFromAccent = accentClassName?.includes("stroke-[")
    ? accentClassName.replace("stroke-[", "fill-[")
    : undefined

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-40"
            role="img"
            aria-label={description ? `${title} – ${description}` : title}
          >
            {/* grid */}
            <defs>
              {variant === 'brand' ? (
                <linearGradient id={`creationOsArea-${gradientId}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--creation-os-violet))" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(var(--quantum-blue))" stopOpacity="0.05" />
                </linearGradient>
              ) : (
                <linearGradient id={`creationOsArea-${gradientId}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.06" />
                </linearGradient>
              )}
            </defs>

            <rect x={0} y={0} width={width} height={height} fill="transparent" />

            {/* area */}
            {areaPath ? <path d={areaPath} fill={`url(#creationOsArea-${gradientId})`} /> : null}
            {/* line */}
            {path ? (
              <path
                d={path}
                className={cn("fill-none", accentClassName ?? "stroke-[hsl(var(--creation-os-violet))]")}
                strokeLinecap="round"
                strokeWidth={2}
              />
            ) : null}

            {/* points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={2}
                className={cn(pointFillFromAccent ?? "fill-[hsl(var(--creation-os-violet))]")}
              />
            ))}
          </svg>

          {/* labels (optional) */}
          {labels && labels.length === data.length ? (
            <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
              {labels.map((l, i) => (
                <span key={i} className="text-xs text-muted-foreground text-center">
                  {l}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
