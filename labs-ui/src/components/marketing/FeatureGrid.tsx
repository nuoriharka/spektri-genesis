import Image from "next/image";
import Container from "@/components/layout/Container";
import { photos } from "@/content/photos";
import { BLUR_DATA_URL } from "@/lib/blur";

export default function FeatureGrid(){
  const items=[
    { t:"Kustannus & vaikutus", d:"Seuraa kustannusta/ajoa, onnistumisprosenttia ja säästettyä aikaa.", img: photos.features.cost },
    { t:"Integraatiot", d:"OAuth Googleen, Microsoftiin, CRM:iin ja verkkokauppoihin.", img: photos.features.integ },
    { t:"Mallikirjasto", d:"Aloita 60 sekunnissa valmiilla malleilla.", img: photos.features.temps },
  ];
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(x=> (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
                <Image src={x.img.src} alt={x.img.alt} fill className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL} sizes="(min-width:768px) 33vw, 100vw"/>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{x.t}</h3>
              <p className="text-white/70">{x.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
