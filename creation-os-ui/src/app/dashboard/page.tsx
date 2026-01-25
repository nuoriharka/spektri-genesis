"use client"

import * as React from "react"
import RetroGrid from "@/components/visual/RetroGrid";
import { MoneyBar } from "@/components/dashboard/MoneyBar";
import ContinueSetup from "@/components/dashboard/ContinueSetup";
import { DashboardLayout } from "@/components/dashboard-layout";
import { TopAgents } from "@/components/agents/TopAgents";
import { RunsTable } from "@/components/runs/RunsTable";

export const dynamic = "force-static";

export default function DashboardPage() {
  const [kpi, setKpi] = React.useState({ mrr: 0, runs7d: 0, successRate: 0, costPerRun: 0, savedHours: 0 })
  React.useEffect(() => {
    fetch('/api/kpi').then(r=>r.json()).then(setKpi).catch(()=>{})
  }, [])
  return (
  <DashboardLayout>
      <main className="relative px-6 py-8 md:px-8 md:py-10">
        <RetroGrid />

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[var(--fg,#E7E9EC)]">Komentokeskus</h1>
          <p className="text-sm text-[var(--muted,#9BA3AF)]">Yhdestä paikasta KPI:t, ajot ja nopeimmat seuraavat askeleet.</p>
        </header>

        <section className="space-y-6">
          <MoneyBar
            items={[
              { label: "MRR", value: kpi.mrr, prefix: "€" },
              { label: "Runs (7d)", value: kpi.runs7d },
              { label: "Success %", value: kpi.successRate, suffix: "%" },
              { label: "Cost/Run", value: kpi.costPerRun, prefix: "€" },
              { label: "Saved h", value: kpi.savedHours },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ContinueSetup />
            <div className="rounded-2xl bg-[var(--panel,#111316)]/90 backdrop-blur p-4 border border-white/5 min-h-40">
              <h3 className="text-sm font-medium text-[var(--fg,#E7E9EC)] mb-2">Viimeisimmät ajot</h3>
              <div className="overflow-auto"><RunsTable /></div>
            </div>
            <div className="rounded-2xl bg-[var(--panel,#111316)]/90 backdrop-blur p-4 border border-white/5 min-h-40">
              <h3 className="text-sm font-medium text-[var(--fg,#E7E9EC)] mb-2">Agentit</h3>
              <TopAgents />
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  )
}
