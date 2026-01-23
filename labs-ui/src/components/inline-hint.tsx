"use client"

import { cn } from "@/lib/utils"
import { Lightbulb } from "lucide-react"

export function InlineHint({ children, action, className }: { children: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between rounded-lg border bg-muted/30 p-3", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span>{children}</span>
      </div>
      {action ? <div className="ml-3">{action}</div> : null}
    </div>
  )
}
