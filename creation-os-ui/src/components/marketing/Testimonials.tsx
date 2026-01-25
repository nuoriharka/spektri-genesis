"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const data = [
  { quote: "Creation OS nopeutti automaatioidemme rakentamista merkittävästi.", name: "M. Saarinen", role: "CTO, Acme Oy" },
  { quote: "Parasta on selkeys ja läpinäkyvyys – näemme kustannukset heti.", name: "A. Tuominen", role: "Ops Lead" },
  { quote: "Ensimmäinen agentti tuotantoon alle tunnissa.", name: "J. Lehtonen", role: "Founder" },
]

export default function Testimonials(){
  const [i, setI] = useState(0)
  const next = () => setI((i+1) % data.length)
  const prev = () => setI((i-1+data.length) % data.length)
  const t = data[i]
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Card className="bg-white/[0.04] border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/60">Asiakaspalautteet</div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={prev}>Edellinen</Button>
                <Button variant="outline" size="sm" onClick={next}>Seuraava</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <blockquote className="text-xl text-white">“{t.quote}”</blockquote>
            <div className="mt-3 text-sm text-white/70">— {t.name}, {t.role}</div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
