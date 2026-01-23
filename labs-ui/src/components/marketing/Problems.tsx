"use client";
import Container from "@/components/layout/Container";
import { track } from "@/lib/analytics";

export default function Problems(){
  const items = [
    {t:"Ylityöllistetty tiimi", d:"Manuaalinen työ vie fokuksen asiakkaista ja kasvusta."},
    {t:"Integraatioviidakko", d:"Satoja työkaluja, nolla orkestrointia – ja lasku kasvaa."},
    {t:"Hitaat kokeilut", d:"Ideasta toteutukseen menee viikkoja – momentum katoaa."},
    {t:"Kustannuskaaos", d:"Ei näkyvyyttä yksikkökustannuksiin tai vaikutukseen."},
    {t:"Silos", d:"Data ja tiimit eivät virtaa – paras työ jää tekemättä."},
  ];
  return (
    <section className="py-12 md:py-16" onMouseEnter={() => track('problems_view') }>
      <Container>
        <p className="text-white/80 max-w-3xl">Digitaalinen työ on täynnä manuaalia ja kustannuskaaosta. Tässä viisi syytä, miksi Spektri on erilainen.</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((x)=> (
            <li key={x.t} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div>
                <div className="font-semibold text-white">{x.t}</div>
                <p className="text-white/70">{x.d}</p>
              </div>
              <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-300 px-3 py-1 text-xs ring-1 ring-emerald-400/25">Ratkaistu.</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
