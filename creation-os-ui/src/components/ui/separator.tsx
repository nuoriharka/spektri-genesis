import * as React from "react"

export function Separator({ orientation = "horizontal", className = "" }: { orientation?: "horizontal" | "vertical"; className?: string }) {
  const base = "bg-border"
  const size = orientation === "vertical" ? "h-full w-px" : "h-px w-full"
  return <div role="separator" aria-orientation={orientation} className={`${base} ${size} ${className}`} />
}
