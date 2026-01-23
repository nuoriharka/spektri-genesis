"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function Announcement({
  message,
  href,
  className,
}: {
  message: string
  href?: string
  className?: string
}) {
  const [hidden, setHidden] = useState(false)
  if (hidden) return null
  return (
    <div className={cn("rounded-md border bg-muted/40 px-3 py-1.5 text-xs", className)}>
      {href ? (
        <a href={href} className="underline-offset-2 hover:underline">
          {message}
        </a>
      ) : (
        message
      )}
      <button className="float-right" onClick={() => setHidden(true)} aria-label="Sulje" title="Sulje">
        ×
      </button>
    </div>
  )
}
