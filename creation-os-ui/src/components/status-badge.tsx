"use client"

import { Badge } from "@/components/ui/badge"

export type Status = "active" | "paused" | "error"

const styles: Record<Status, string> = {
  active: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300",
  paused: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
  error: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300",
}

export function StatusBadge({ status = "active" as Status }: { status?: Status }) {
  return (
    <Badge className={styles[status]}> {
      status === "active" ? "Aktiivinen" : status === "paused" ? "Pysäytetty" : "Virhe"
    } </Badge>
  )
}
