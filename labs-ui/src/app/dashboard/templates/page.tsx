"use client"

import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { PageHeader } from "@/components/page-header"
import { TemplateCard, Template } from "@/components/template-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMemo, useState } from "react"

const templates: Template[] = [
  { id: "content-writer", name: "Content Writer", description: "Kirjoita blogeja ja postauksia", category: "Marketing" },
  { id: "support-bot", name: "Support Bot", description: "Vastaa tukipyyntöihin", category: "Support" },
  { id: "data-summarizer", name: "Data Summarizer", description: "Tiivistää dokumentteja", category: "Data" },
]

export default function TemplatesPage() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")
  const filtered = useMemo(() => {
    return templates.filter(t => {
      const qok = !q || [t.name, t.description, t.category].join(" ").toLowerCase().includes(q.toLowerCase())
      const cok = cat === "all" || t.category === cat
      return qok && cok
    })
  }, [q, cat])
  return (
    <DashboardLayout>
      <div className="page-wrap">
        <PageHeader title="Pohjat" description="Aloita nopeasti valmiilla malleilla">
          <Link href="/dashboard/agents/new">
            <Button variant="primary">Luo agentti</Button>
          </Link>
        </PageHeader>
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Hae pohjia…" value={q} onChange={(e)=>setQ(e.target.value)} className="max-w-sm" />
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Kategoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Kaikki</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Data">Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
