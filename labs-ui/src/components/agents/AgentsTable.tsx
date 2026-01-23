"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type AgentRow = {
  id: string
  name: string
  status: "active" | "paused" | "error"
  type?: string
}

const mock: AgentRow[] = Array.from({ length: 37 }).map((_, i) => ({
  id: String(i + 1),
  name: `Agent ${i + 1}`,
  status: i % 7 === 0 ? "error" : i % 3 === 0 ? "paused" : "active",
  type: ["Writer", "Worker", "Processor"][i % 3],
}))

export function AgentsTable() {
  const [q, setQ] = React.useState("")
  const [status, setStatus] = React.useState<string>("all")
  const [page, setPage] = React.useState(1)
  const pageSize = 10

  const filtered = React.useMemo(() => {
    let rows = mock
    if (q.trim()) rows = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))
    if (status !== "all") rows = rows.filter((r) => r.status === status)
    return rows
  }, [q, status])

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  React.useEffect(() => { if (page > pages) setPage(1) }, [pages, page])

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Input placeholder="Hae nimellä" value={q} onChange={(e)=> setQ(e.target.value)} className="max-w-xs" />
        <Select value={status} onValueChange={(v)=> setStatus(v)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Kaikki</SelectItem>
            <SelectItem value="active">Aktiivinen</SelectItem>
            <SelectItem value="paused">Pysäytetty</SelectItem>
            <SelectItem value="error">Virhe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nimi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tyyppi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {current.map((r)=> (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-xs">{r.id}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>
                <Badge variant={r.status === 'active' ? 'default' : r.status === 'paused' ? 'secondary' : 'destructive'} className="capitalize">{r.status}</Badge>
              </TableCell>
              <TableCell>{r.type}</TableCell>
            </TableRow>
          ))}
          {current.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">Ei tuloksia</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between text-sm">
        <div>
          Sivu {page} / {pages} · {total} tulosta
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled={page<=1} onClick={()=> setPage((p)=> Math.max(1, p-1))}>Edellinen</Button>
          <Button size="sm" variant="outline" disabled={page>=pages} onClick={()=> setPage((p)=> Math.min(pages, p+1))}>Seuraava</Button>
        </div>
      </div>
    </div>
  )
}
