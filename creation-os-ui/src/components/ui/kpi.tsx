"use client"

export function Kpi({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
      {trend && <div className="text-xs text-emerald-600 dark:text-emerald-400">{trend}</div>}
    </div>
  )
}
