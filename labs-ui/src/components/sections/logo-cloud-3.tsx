"use client"
import Image from "next/image"
const spektriLogo = "/brand/spektri-logomark-gradient.svg"

export function LogoCloud3() {
  const logos = Array.from({ length: 8 }).map((_, i) => ({ id: i }))
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center text-slate-300 opacity-80 text-sm uppercase tracking-widest">Luottavat meihin</div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-6 place-items-center opacity-90">
          {logos.map((l) => (
            <Image
              key={l.id}
              src={spektriLogo}
              alt="Spektri"
              className="h-8 w-auto opacity-90 hover:scale-110 hover:drop-shadow-2xl transition"
              height={32}
              placeholder="empty"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
