import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import { photos } from "@/content/photos";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/blur";
import VideoLoop from "@/components/ui/VideoLoop";
import VideoPlayer from "@/components/ui/VideoPlayer";

export const metadata: Metadata = {
  title: "Ominaisuudet",
  description: "Rakentaja, integraatiot ja seuranta – tuotantovalmista alusta.",
  openGraph: { images: ["/images/og/og-features.png"], title: "Ominaisuudet – Creation OS", description: "Rakentaja, integraatiot ja seuranta." },
  twitter: { card: "summary_large_image" }
};

function FeatureBlock({title,desc,src,alt,reverse}:{title:string;desc:string;src: any;alt:string;reverse?:boolean}){
  return (
  <div className={`grid items-center gap-6 md:grid-cols-2 ${reverse?"md:[&>div:first-child]:order-last":""}`}>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-3 text-white/80">{desc}</p>
      </div>
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" placeholder="blur" blurDataURL={BLUR_DATA_URL}/>
      </div>
    </div>
  );
}

export default function FeaturesPage(){
  return (
    <main className="py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-white">Ominaisuudet</h1>
          <p className="mt-3 text-white/80">Keskustelu on käyttöliittymä. Kaikki muu on nopeaa ja läpinäkyvää.</p>
        </div>
        <div className="mt-10 space-y-12">
          <FeatureBlock title="Agent builder – split-näkymä" desc="Chat vasemmalla, visualisointi oikealla." src={photos.how.split.src} alt={photos.how.split.alt}/>
          {/* Agenttifarmit™ */}
          <VideoLoop srcMp4="/videos/agent-swarm.mp4" label="Agent swarm" className="mt-6" />
          <FeatureBlock reverse title="Integraatiot ilman kitkaa" desc="OAuth Googleen, Microsoftiin, CRM:iin ja verkkokauppoihin." src={photos.features.integ.src} alt={photos.features.integ.alt}/>
          {/* Mission Control™ */}
          <VideoLoop srcMp4="/videos/ai-agent.mp4" label="Agent run" className="mt-6" />
          <FeatureBlock title="Suorituskyky & kustannukset" desc="Onnistumisprosentti, kustannus/ajo ja säästetty aika." src={photos.features.cost.src} alt={photos.features.cost.alt}/>
          {/* Ideasta Sovellukseksi™ */}
          <VideoPlayer srcMp4="/videos/dark-saas-duo.mp4" label="Idea to app" className="mt-6" />
        </div>
      </Container>
    </main>
  )
}
