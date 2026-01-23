"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  { q: "Miten aloitan?", a: "Avaa Dashboard ja luo ensimmäinen agentti. Aloita valmiilla malleilla ja muokkaa tarpeisiisi." },
  { q: "Onko tämä tuotantokäyttöön?", a: "Kyllä. Next.js 14, saavutettava UI ja vakioidut komponentit varmistavat vakauden." },
  { q: "Voinko muokata brändiä?", a: "Kyllä. Värit ja gradientit ovat CSS‑muuttujia. Päivitä teemat ilman koodin rikkomista." },
  { q: "Missä data sijaitsee?", a: "Palvelut voidaan ajaa EU‑ympäristöissä. Käytä omia avaimia ja rajaa integraatiot yrityksesi tarpeisiin." },
]

export function FAQSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
  <h2 className="text-center text-2xl font-semibold md:text-3xl">Usein kysyttyä</h2>
        <div className="mx-auto mt-6 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
