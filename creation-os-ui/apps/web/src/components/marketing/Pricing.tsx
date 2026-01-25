import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const plans = [
  { name: "Basic", price: 0, desc: "Aloita ilmaiseksi", cta: "/signup?plan=basic", features: ["1 agentti", "100 ajoa/kk", "Sähköpostituki"] },
  { name: "Pro", price: 49, desc: "Kasvaville tiimeille", cta: "/signup?plan=pro", featured: true, features: ["10 agenttia", "10k ajoa/kk", "Priorisoitu tuki"] },
  { name: "Business", price: 199, desc: "Produktion käyttöön", cta: "/signup?plan=business", features: ["Rajoittamaton", "SLA", "Oma tuki"] },
]

export default function Pricing(){
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Hinnoittelu</h2>
          <p className="mt-2 text-white/70">Selkeä ja reilu. Valitse tarpeisiisi sopiva taso.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map(p => (
            <Card key={p.name} className={`border-white/15 bg-white/[0.04] ${p.featured?"ring-2 ring-[var(--brand)]": ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{p.name}</CardTitle>
                  {p.featured && <Badge variant="secondary">Suosituin</Badge>}
                </div>
                <CardDescription className="text-white/70">{p.desc}</CardDescription>
                <div className="mt-2 text-3xl font-semibold text-white">{p.price === 0 ? "€0" : `€${p.price}`} <span className="text-sm text-white/70">/ kk</span></div>
              </CardHeader>
              <CardContent>
                <Separator className="my-4" />
                <ul className="space-y-2 text-sm text-white/80">
                  {p.features.map(f => (<li key={f}>• {f}</li>))}
                </ul>
                <Link href={p.cta} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[var(--brand)] px-4 py-2 text-white hover:brightness-110 transition">
                  Valitse {p.name}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
