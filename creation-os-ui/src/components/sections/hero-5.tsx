"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function HeroSection5() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="mx-auto max-w-4xl text-balance bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl">
          Suunniteltu ammattimaiseksi — ilman ylimääräistä
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
          Puhdas komponenttikirjasto, joka kasvaa kanssasi. Konsepti: yksinkertainen, tyylikäs ja vakaa.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="btn-creation-os">Kokeile nyt <Sparkles className="ml-2 h-5 w-5" /></Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
