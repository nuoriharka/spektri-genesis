"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const bullets = [
  "Ilmainen 14 päivän kokeilu",
  "Ei korttia rekisteröinnissä",
  "Skaalaa tiimin mukana",
]

export function PricingTeaser() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold md:text-3xl">Hinnoittelu ilman yllätyksiä</h3>
              <p className="mt-2 text-slate-300">Aloita maksutta, maksa vasta käytöstä. Läpinäkyvät paketit ja yritysratkaisut.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center md:justify-end">
              <Link href="/dashboard">
                <Button size="lg" className="btn-spektri px-7 py-4">Käynnistä kokeilu</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
