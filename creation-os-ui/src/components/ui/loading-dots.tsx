"use client"

export function LoadingDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-1 ${className}`} aria-label="Ladataan">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-80" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-60 [animation-delay:120ms]" />
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current opacity-40 [animation-delay:240ms]" />
    </span>
  )
}
