"use client"

export function Dl({ items }: { items: { term: string; detail: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
      {items.map((i) => (
        <div key={i.term} className="contents">
          <dt className="text-muted-foreground">{i.term}</dt>
          <dd className="font-medium">{i.detail}</dd>
        </div>
      ))}
    </dl>
  )
}
