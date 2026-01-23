"use client"

import Image from "next/image"

const features = [
  { src: "/images/sections/features-1-builder.webp", alt: "Agent builder – Rakenna agentteja ja työnkulkuja", title: "Rakentaja", desc: "Rakenna agentit ja työnkulut rinnakkain" },
  { src: "/images/sections/features-2-templates.webp", alt: "Mallipohjat – käynnistä valmiilla pohjilla", title: "Mallipohjat", desc: "Käynnistä valmiilla pohjilla" },
  { src: "/images/sections/features-3-integrations.webp", alt: "Integraatiot – yhdistä suosittuihin palveluihin", title: "Integraatiot", desc: "Yhdistä suosittuihin palveluihin" },
  { src: "/images/sections/features-4-performance.webp", alt: "Suorituskyky – nopea ja skaalautuva", title: "Suorituskyky", desc: "Nopea, vakaa ja skaalautuva" },
]

export function FeaturesPro() {
  return (
    <section id="features" className="py-16 bg-gradient-to-b from-transparent to-slate-950/40">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Keskeiset hyödyt</h2>
          <p className="mt-2 text-slate-300">Yhtenäinen visuaalinen tyyli ja aitoja UI‑kuvia.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <figure key={f.title} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-white">
              <div className="relative aspect-[3/2]">
                <Image src={f.src} alt={f.alt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
              </div>
              <figcaption className="p-4 border-t border-white/10">
                <div className="font-medium">{f.title}</div>
                <div className="text-sm text-slate-300">{f.desc}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
