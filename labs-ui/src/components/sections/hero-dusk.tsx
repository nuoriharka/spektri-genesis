"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, ShieldCheck, Lock, Cpu } from "lucide-react"
const heroSrc = "/images/landing/hero-desktop.webp"

export function HeroDusk() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Atmospheric glows */}
  <div className="pointer-events-none absolute -top-32 -left-40 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--quantum-blue))]/30 blur-[100px]" />
  <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--spektri-violet))]/30 blur-[100px]" />
      {/* Subtle gradient beam */}
      <div className="pointer-events-none absolute inset-x-0 top-20 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

  <div className="container relative z-10 mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-cyan-400" /> Rakennettu shadcn/ui‑komponenteilla
        </div>
        <h1 className="mx-auto mt-6 max-w-5xl bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
          Automatisoi työnkulut. Rakenna valvottuja agentteja – ilman kitkaa.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 md:text-xl">
          Suunniteltu nopeaan tuotantokäyttöön: selkeä arkkitehtuuri, saavutettava UI ja skaalautuva pohja Next.js 14:lle.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="btn-spektri text-base md:text-lg px-7 md:px-8 py-4">
              <Sparkles className="mr-2 h-5 w-5" /> Aloita ilmaiseksi
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="text-base md:text-lg px-7 md:px-8 py-4 border-white/20 text-white">
              Katso esittely <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge className="text-sm bg-white/5 text-slate-300 border-white/10"><Cpu className="mr-1 h-3 w-3" /> Agenttialusta</Badge>
          <Badge className="text-sm bg-white/5 text-slate-300 border-white/10"><Lock className="mr-1 h-3 w-3" /> EU‑tietosuoja</Badge>
          <Badge className="text-sm bg-white/5 text-slate-300 border-white/10">API & webhooks</Badge>
          <Badge className="text-sm bg-white/5 text-slate-300 border-white/10">Saavutettava UI</Badge>
        </div>

        {/* Product screenshot */}
    <div className="mx-auto mt-10 max-w-5xl">
          <div className="relative">
      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
              <Image src={heroSrc} alt="Spektri.Labs – tumma hero, abstrakti verkko ja brändisäteet" className="w-full h-auto object-cover" width={1600} height={900} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
