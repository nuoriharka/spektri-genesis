"use client"

import { Kbd } from "./kbd"
import { modKey } from "@/lib/keyboard"

export function Shortcut({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k, i) => (
        <Kbd key={i}>{k === "mod" ? modKey : k}</Kbd>
      ))}
    </span>
  )
}
