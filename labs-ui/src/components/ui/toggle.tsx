"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export function Toggle({ pressed, onPressedChange, children, className }: {
  pressed?: boolean
  onPressedChange?: (v: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  const [internal, setInternal] = React.useState(!!pressed)
  const isControlled = pressed !== undefined
  const val = isControlled ? pressed : internal
  return (
    <button
      type="button"
      aria-pressed={val}
      onClick={() => {
        const next = !val
        if (!isControlled) setInternal(next)
        onPressedChange?.(next)
      }}
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-1.5 text-sm",
        val ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
        className,
      )}
    >
      {children}
    </button>
  )
}
