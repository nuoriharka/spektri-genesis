"use client"

type LogItem = { id: string | number; level: "info" | "warn" | "error"; message: string; time: string }

const levelColor: Record<LogItem["level"], string> = {
  info: "text-blue-600",
  warn: "text-yellow-600",
  error: "text-red-600",
}

export function LogsList({ items }: { items: LogItem[] }) {
  if (!items?.length) {
    return <p className="text-sm text-muted-foreground">Ei lokitietoja.</p>
  }
  return (
    <div className="space-y-2">
      {items.map((l) => (
        <div key={l.id} className="text-sm flex items-start justify-between rounded-md border p-3 bg-card">
          <div className="flex-1 min-w-0">
            <p className={levelColor[l.level]}>{l.message}</p>
          </div>
          <span className="text-muted-foreground ml-3 whitespace-nowrap">{l.time}</span>
        </div>
      ))}
    </div>
  )
}
