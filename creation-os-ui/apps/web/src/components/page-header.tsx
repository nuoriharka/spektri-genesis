"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

type PageHeaderProps = {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode // right-side actions
  showBreadcrumb?: boolean
}

export function PageHeader({ title, description, className, children, showBreadcrumb = true }: PageHeaderProps) {
  const pathname = usePathname()

  const crumbs = React.useMemo(() => {
    if (!showBreadcrumb) return [] as { label: string; href?: string }[]
    if (!pathname) return []
    // Only show on app pages (e.g., /dashboard/*)
    if (!pathname.startsWith("/dashboard")) return []
    const parts = pathname.split("/").filter(Boolean)
    const labels: Record<string, string> = {
      dashboard: "Dashboard",
      agents: "Agentit",
      runs: "Ajot",
      templates: "Pohjat",
      integrations: "Integraatiot",
      workflows: "Työnkulut",
      settings: "Asetukset",
      activity: "Aktiviteetti",
      data: "Data",
      documents: "Dokumentit",
      knowledge: "Tieto",
      billing: "Laskutus",
      team: "Tiimi",
    }
    const acc: { label: string; href?: string }[] = []
    let href = ""
    for (let i = 0; i < parts.length; i++) {
      href += "/" + parts[i]
      const raw = parts[i]
      const isId = i > 1 && /^(\d+|[a-f0-9-]{6,})$/i.test(raw)
      const label = labels[raw] ?? (isId ? "Yksityiskohdat" : raw.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
      acc.push({ label, href: i < parts.length - 1 ? href : undefined })
    }
    return acc
  }, [pathname, showBreadcrumb])

  return (
    <div className={cn("space-y-1", className)}>
      {crumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center gap-1">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1
              return (
                <li key={i} className="flex items-center gap-1">
                  {c.href && !last ? (
                    <Link href={c.href} className="hover:text-foreground transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground/80">{c.label}</span>
                  )}
                  {!last ? <span className="mx-1 text-muted-foreground">/</span> : null}
                </li>
              )
            })}
          </ol>
        </nav>
      )}
      <div className={cn("flex items-center justify-between")}>
        <div>
          <h1 className="font-bold tracking-tight text-foreground">{title}</h1>
          {description ? <p className="text-muted-foreground">{description}</p> : null}
        </div>
        {children ? <div className="flex items-center gap-2">{children}</div> : null}
      </div>
    </div>
  )
}
