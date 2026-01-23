"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold md:text-3xl">Ota yhteyttä</h3>
              <p className="mt-2 text-slate-300">
                Kysyttävää tai haluatko demoesittelyn? Lähetä viesti – palaamme nopeasti.
              </p>
              <div className="mt-4 text-sm text-slate-300">Sähköposti: <a className="underline" href="mailto:hello@spektri.labs">hello@spektri.labs</a></div>
            </div>
            <div className="flex items-center md:justify-end">
              <Link href="mailto:hello@spektri.labs">
                <Button size="lg" className="btn-spektri px-7 py-4">Lähetä viesti</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
