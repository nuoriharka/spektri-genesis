"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const items = [
  { q: "Onko ilmainen taso saatavilla?", a: "Kyllä. Basic on maksuton ilman aikarajaa." },
  { q: "Miten ajojen hinnoittelu toimii?", a: "Pro sisältää 10k ajoa/kk. Ylitykset laskutetaan edullisesti käytön mukaan." },
  { q: "Voinko vaihtaa suunnitelmaa?", a: "Kyllä, voit päivittää tai alentaa milloin tahansa. Muutokset astuvat voimaan heti." },
  { q: "Sopiiko yrityskäyttöön?", a: "Business tarjoaa SLA:n ja dedikoidun tuen. Ota yhteyttä, jos tarvitset lisäehtoja." },
  { q: "Onko kredit-kortti pakollinen?", a: "Ei. Voit aloittaa ilman maksutietoja ja lisätä ne myöhemmin." },
]

export default function FAQ(){
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">UKK</h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{it.q}</AccordionTrigger>
              <AccordionContent>{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
