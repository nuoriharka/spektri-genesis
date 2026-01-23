import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TemplateCard({ title, desc, categories }: { title: string; desc: string; categories: readonly string[] }){
  return (
    <Card className="bg-white/[0.04] border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-base">{title}</CardTitle>
        <CardDescription className="text-white/70">{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (<Badge key={c} variant="secondary">{c}</Badge>))}
        </div>
  <Link href={`/dashboard?template=${encodeURIComponent(title)}`} className="mt-4 inline-flex items-center rounded-xl bg-[var(--brand)] px-3 py-2 text-sm text-white hover:brightness-110 transition">Aja nyt</Link>
      </CardContent>
    </Card>
  )
}
