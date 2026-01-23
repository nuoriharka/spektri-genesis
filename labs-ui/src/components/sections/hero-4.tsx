"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight } from "lucide-react"

export function HeroSection4() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]">
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[hsl(var(--quantum-blue))]/25 blur-[140px]" />
      </div>
      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 py-24 md:grid-cols-2">
        <div>
          <Badge variant="secondary" className="mb-3">Uusi sukupolvi</Badge>
          <h1 className="text-balance bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
            Rakenna ja skaalaa älykkäitä työnkulkuja
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
            Nopea käyttöönotto ja yhtenäinen UI. shadcn/ui + Tailwind — puhdas, tyyliteltävä ja saavutettava.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="btn-spektri">Aloita <Sparkles className="ml-2 h-5 w-5" /></Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-white/20 text-white">Katso esittely <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video w-full rounded-2xl border border-white/10 bg-white/5 shadow-2xl" />
        </div>
      </div>
    </section>
  )
}
