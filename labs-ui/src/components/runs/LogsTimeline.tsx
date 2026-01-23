"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"

export type LogItem = {
  time: string
  type: "info" | "warn" | "error"
  message: string
}

export function LogsTimeline({ items }: { items: LogItem[] }) {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({})
  return (
    <div className="relative pl-4">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />
      <ul className="space-y-3">
        {items.map((it, idx) => {
          const long = it.message.length > 120
          const open = expanded[idx]
          const color = it.type === 'error' ? 'destructive' : it.type === 'warn' ? 'secondary' : 'default'
          return (
            <li key={idx} className="relative">
              <div className="absolute -left-1 top-1.5 h-2 w-2 rounded-full bg-ring" />
              <div className="flex items-start justify-between">
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={color} className="capitalize">{it.type}</Badge>
                    <span className="text-xs text-muted-foreground">{it.time}</span>
                  </div>
                  <p className="text-sm">
                    {long && !open ? it.message.slice(0, 120) + "…" : it.message}
                  </p>
                  {long && (
                    <button className="text-xs underline" onClick={()=> setExpanded((e)=> ({ ...e, [idx]: !open }))}>
                      {open ? "Näytä vähemmän" : "Näytä lisää"}
                    </button>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
