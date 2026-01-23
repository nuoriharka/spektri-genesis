"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export type RunRow = {
  id: string
  agent: string
  status: "queued" | "running" | "success" | "error"
  started: string
  durationSec?: number
  cost?: string
}

const mock: RunRow[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `run_${1000 + i}`,
  agent: ["Writer", "Processor", "Assistant"][i % 3],
  status: i % 5 === 0 ? "queued" : i % 3 === 0 ? "running" : i % 7 === 0 ? "error" : "success",
  started: new Date(Date.now() - i * 3600_000).toLocaleString("fi-FI"),
  durationSec: i % 3 === 0 ? undefined : 10 + i,
  cost: `€${(Math.random() * 0.2 + 0.01).toFixed(2)}`,
}))

export function RunsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Agent</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aloitettu</TableHead>
          <TableHead>Kesto</TableHead>
          <TableHead>Kustannus</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mock.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-mono text-xs">{r.id}</TableCell>
            <TableCell>{r.agent}</TableCell>
            <TableCell>
              <Badge variant={r.status === 'success' ? 'default' : r.status === 'error' ? 'destructive' : 'secondary'} className="capitalize">
                {r.status}
              </Badge>
            </TableCell>
            <TableCell>{r.started}</TableCell>
            <TableCell className="min-w-[160px]">
              {r.status === 'running' ? (
                <Progress value={60} />
              ) : (
                <span>{r.durationSec ? `${r.durationSec}s` : '-'}</span>
              )}
            </TableCell>
            <TableCell>{r.cost ?? '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
