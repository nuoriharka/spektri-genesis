"use client"

import { Bot, FileText, Mail, ShoppingCart } from "lucide-react"

const cases = [
  { icon: Bot, title: "Tuki & prosessit", desc: "Itsepalvelu, tiketit ja sisäinen automaatio agenttien avulla." },
  { icon: FileText, title: "Sisällöntuotanto", desc: "Artikkelit, kuvaukset ja päivitykset – valvotusti ja yhtenäisesti." },
  { icon: Mail, title: "Liidien rikastus", desc: "Kerää, rikasta ja pisteytä liidit. Vie CRM:ään automaattisesti." },
  { icon: ShoppingCart, title: "Kaupan automaatio", desc: "Kampanjat, varastot ja palautukset integroituvat automaattisesti." },
]

export function UseCases() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Käyttötapaukset</h2>
          <p className="mt-2 text-slate-300">Nopeuta tiimin arkea eri toiminnoissa.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cases.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 text-white">
              <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-cyan-500/20 blur-2xl" />
              <div className="relative flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-sm text-slate-300">{desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
