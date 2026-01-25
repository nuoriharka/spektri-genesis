"use client"

import { CheckCircle2, Bot, Workflow, Rocket } from "lucide-react"
import Image from "next/image"

const steps = [
  { icon: Bot, title: "1. Luo agentti", desc: "Valitse pohja ja määritä tavoitteet. Ydinasetukset muutamassa minuutissa." },
  { icon: Workflow, title: "2. Rakenna työnkulku", desc: "Vedä ja pudota vaiheet. Lisää ehdot, toistot ja integraatiot." },
  { icon: Rocket, title: "3. Julkaise", desc: "Aja ajastettuna tai API:n kautta. Seuraa metriikoita ja paranna iteratiivisesti." },
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Miten se toimii</h2>
          <p className="mt-2 text-slate-300">Kolme askelta tuotantoon sopivaan automaatioon.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 text-white">
              <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" />
              <div className="relative flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-purple-300" />
                </div>
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-sm text-slate-300">{desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-300">
          <CheckCircle2 className="h-4 w-4 text-cyan-300" /> Ei lukittuja osia – kaikki on omistettavissa ja laajennettavissa.
        </div>
        <div className="mt-10 overflow-hidden rounded-xl border border-white/10">
          <div className="relative aspect-[7/4]">
            <Image src="/images/sections/how-it-works.webp" alt="Miten Creation OSin työnkulku toimii – yleisnäkymä" fill className="object-cover" sizes="(min-width: 1024px) 896px, 100vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
