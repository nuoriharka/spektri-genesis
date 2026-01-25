"use client"

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground shadow-inner">
      {children}
    </kbd>
  )
}
