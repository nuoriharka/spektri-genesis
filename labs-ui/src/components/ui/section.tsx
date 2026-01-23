"use client"

export function Section({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
        {actions}
      </div>
      <div className="rounded-lg border p-4">{children}</div>
    </section>
  )
}
