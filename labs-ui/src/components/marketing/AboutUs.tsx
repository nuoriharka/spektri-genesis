import Container from "@/components/layout/Container";

export default function AboutUs(){
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Keitä me olemme</h2>
          <p className="mt-3 text-white/80">Tuomme agenttialustat arkeen – turvallisesti, selkeästi ja tuotantotasolla. Pieni tiimi, suuret vaikutukset.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {t:"Kokemus", d:"Rakentaneet SaaS-tuotteita ja data-alustoja vuosia."},
            {t:"Avoimuus", d:"Läpinäkyvä kustannus ja audit trail alusta lähtien."},
            {t:"Yhteistyö", d:"Teemme yhdessä asiakkaiden kanssa – ei yksin pimeässä."},
          ].map(x=> (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur">
              <div className="text-white font-medium">{x.t}</div>
              <p className="text-white/70">{x.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
