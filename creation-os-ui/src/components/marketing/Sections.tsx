import Image, { StaticImageData } from "next/image";
import Container from "@/components/layout/Container";
import SkeletonBlock from "@/components/ui/SkeletonBlock";
import win from "@/content/win.fi.json";
import { photos } from "@/content/photos";
import PoweredByStrip from "@/components/common/PoweredByStrip";
import { BLUR_DATA_URL } from "@/lib/blur";

export function Pillars(){
  const items = [
    { t:"Keskustelu on UI", d:"Kerro luonnollisella kielellä – agentti suunnittelee ja tekee." },
    { t:"Nolla kitkaa", d:"Aloita malleilla. Ensimmäinen onnistuminen alle 60 sekunnissa." },
    { t:"Taikuutta yksityiskohdissa", d:"Hienovaraiset animaatiot ja tuotantotason läpinäkyvyys." },
  ];
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((x)=>(
            <div key={x.t} className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{x.t}</h3>
              <p className="mt-2 text-white/70">{x.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TrustBar(){
  return (
    <section className="py-8">
      <Container>
        <PoweredByStrip />
      </Container>
    </section>
  )
}

function FeatureRow({reverse,title,desc,src,alt}:{reverse?:boolean;title:string;desc:string;src:StaticImageData|string;alt:string;}){
  return (
    <div className={`grid items-center gap-6 md:grid-cols-2 ${reverse?"md:[&>div:first-child]:order-last":""}`}>
      <div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-3 text-white/80">{desc}</p>
      </div>
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <SkeletonBlock className="absolute inset-0" />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
    </div>
  );
}

export function Features(){
  return (
    <section id="features" className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Rakenna, aja, skaalaa</h2>
          <p className="mt-3 text-white/80">Keskustelu on käyttöliittymä. Kaikki muu on nopeaa ja läpinäkyvää.</p>
        </div>
        <div className="mt-10 space-y-12">
          <FeatureRow title="Agent builder – split-näkymä" desc="Chat vasemmalla, visualisointi oikealla." src={photos.how.split.src} alt={photos.how.split.alt}/>
          <FeatureRow reverse title="Mallikirjasto – aloita 60 sekunnissa" desc="Valitse malli ja aja yhdellä klikkauksella." src={photos.features.temps.src} alt={photos.features.temps.alt}/>
          <FeatureRow title="Integraatiot ilman kitkaa" desc="OAuth Googleen, Microsoftiin, CRM:iin ja verkkokauppoihin." src={photos.features.integ.src} alt={photos.features.integ.alt}/>
          <FeatureRow reverse title="Suorituskyky & kustannukset" desc="Onnistumisprosentti, kustannus/ajo ja säästetty aika." src={photos.features.cost.src} alt={photos.features.cost.alt}/>
        </div>
      </Container>
    </section>
  );
}

export function HowItWorks(){
  const steps=[
    { n:1,t:"Valitse malli", d:"Aloita pohjasta tai kerro tavoitteesi." },
    { n:2,t:"Yhdistä työkalut", d:"OAuth-integraatiot yhdellä klikkauksella." },
    { n:3,t:"Aja ja ajasta", d:"Katso tulokset ja ajasta toistuvaksi." },
  ];
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s)=>(
            <div key={s.n} className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur">
              <div className="text-sm text-white/60">Vaihe {s.n}</div>
              <h3 className="mt-1 text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-10 aspect-[7/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <Image src={photos.how.overall.src} alt={photos.how.overall.alt} fill sizes="100vw" className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL}/>
        </div>
      </Container>
    </section>
  );
}

export function FinalCTA(){
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[var(--brand)]/20 to-[var(--brand2)]/20 p-0">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-10 text-center md:text-left flex flex-col justify-center">
              <h3 className="text-3xl font-semibold text-white">{win.final_cta.title}</h3>
              <p className="mt-3 text-white/80">{win.final_cta.desc}</p>
              <a href="/dashboard" className="inline-flex justify-center md:justify-start items-center rounded-2xl px-6 py-3 bg-[var(--brand)] hover:brightness-110 text-white font-medium transition mt-6 w-full md:w-auto">{win.final_cta.action}</a>
            </div>
            <div className="relative aspect-[3/2] md:aspect-auto min-h-[260px]">
              <Image src={photos.hero.cta.src} alt={photos.hero.cta.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
