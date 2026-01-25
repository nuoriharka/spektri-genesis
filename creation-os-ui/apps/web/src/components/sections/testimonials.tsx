"use client"

import { Quote } from "lucide-react"

const quotes = [
  {
    name: "Matti S.",
    role: "CTO, SaaS",
    text:
      "Otettiin käyttöön viikossa. shadcn/ui‑pohja on selkeä – kehitysnopeus kasvoi ja UI pysyi yhtenäisenä.",
  },
  {
    name: "Anna T.",
    role: "Operaatiojohtaja",
    text: "Agentit hoitavat toistot automaattisesti. Raportointi ja läpinäkyvyys paranivat huomattavasti.",
  },
  {
    name: "Joonas L.",
    role: "Founderi",
    text: "Pääsimme tuotantoon ilman kalliita integraatioita. Dokumentaatio ja mallit auttoivat.",
  },
]

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Mitä asiakkaat sanovat</h2>
          <p className="mt-2 text-slate-300">Kokemuksia tuotannosta.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 text-white">
              <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
              <div className="relative">
                <Quote className="h-6 w-6 text-cyan-300" />
                <p className="mt-3 text-slate-200">“{q.text}”</p>
                <div className="mt-4 text-sm text-slate-300">{q.name} · {q.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
