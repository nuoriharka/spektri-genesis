"use client"

import * as React from "react"

function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ")
}

function RetroGridBase({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cx(
        "pointer-events-none absolute inset-0 -z-10 opacity-20",
        "bg-[radial-gradient(circle_at_1px_1px,rgba(109,106,255,.3)_1px,transparent_1px)] [background-size:22px_22px]",
        "before:absolute before:inset-0 before:bg-[radial-gradient(600px_300px_at_10%_20%,rgba(34,211,238,.10),transparent),radial-gradient(600px_300px_at_90%_60%,rgba(109,106,255,.10),transparent)]",
        className
      )}
    />
  )
}

function RetroGridDefault({ className = "" }: { className?: string }) {
  return <RetroGridBase className={className} />
}

export default RetroGridDefault
export const RetroGrid = RetroGridBase
