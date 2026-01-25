"use client"

import { Info } from "lucide-react"

export function InlineHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Info className="h-4 w-4 opacity-70" />
      <span>{children}</span>
    </p>
  )
}
