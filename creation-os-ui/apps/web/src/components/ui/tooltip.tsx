"use client"
import * as React from "react"

// Lightweight tooltip without external deps. Shows on hover/focus and hides on Blur/Leave.
export function Tooltip({ content, children }: { content: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={
          "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white shadow transition-opacity duration-150 " +
          (open ? "opacity-100" : "opacity-0")
        }
        style={{ bottom: "calc(100% + 6px)" }}
      >
        {content}
      </span>
    </span>
  )
}
