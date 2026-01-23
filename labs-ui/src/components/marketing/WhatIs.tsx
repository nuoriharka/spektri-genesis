import Container from "@/components/layout/Container";

export default function WhatIs(){
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Mikä on Spektri.Labs?</h2>
          <p className="mt-3 text-white/80">Tuotantovalmis agenttialusta: suunnittele tavoitteet, yhdistä työkalut, aja ja mittaa vaikutus – ilman turhaa kitkaa.</p>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            {t:"Agent builder", d:"Rakenna keskustellen. Näe vaiheet ja päätökset."},
            {t:"Integraatiot", d:"OAuth Googleen, Microsoftiin, CRM:iin ja verkkokauppoihin."},
            {t:"Ajot & ajastus", d:"Aja kertaluonteisesti tai ajasta toistuvaksi."},
            {t:"KPI:t & kustannukset", d:"Näe onnistumisaste, kustannus/ajo ja säästetty aika."},
          ].map(x=> (
            <li key={x.t} className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur">
              <div className="text-white font-medium">{x.t}</div>
              <p className="text-white/70">{x.d}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
