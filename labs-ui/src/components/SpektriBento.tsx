"use client";
import { Share2Icon } from "lucide-react";
import {
  FileTextIcon,
  InputIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import AnimatedBeamMultipleOutputDemo from "@/registry/example/animated-beam-multiple-outputs";
import AnimatedListDemo from "@/registry/example/animated-list-demo";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";

// Simuloitu data Elävälle Dokumentille
const documents = [
  {
    name: "Markkinointisuunnitelma.md",
    body: "Q3-kampanja keskittyy uusiin asiakassegmentteihin ja sisältömarkkinointiin...",
  },
  {
    name: "Myyntiraportti_Q2.pdf",
    body: "Myynti kasvoi 15% edelliseen neljännekseen verrattuna, erityisesti Euroopan markkinoilla.",
  },
  {
    name: "UI_Prototyyppi_v2.fig",
    body: "Uusi dashboard-näkymä, joka korostaa käyttäjän tärkeimpiä metriikoita.",
  },
  {
    name: "Backend_API_spec.json",
    body: '{"openapi": "3.0.0", "info": {"title": "Spektri Agent API", "version": "1.0.0"}}',
  },
  {
    name: "Asiakaspalaute.xlsx",
    body: "Asiakkaat toivovat nopeampaa integraatiota HubSpotin kanssa.",
  },
];

const features = [
  {
    Icon: MixerHorizontalIcon,
    name: "Agenttifarmit™ - Digitaalinen Työvoimasi",
    description:
      "Rakenna erikoistuneiden agenttien tiimejä, jotka tekevät yhteistyötä monimutkaisissa prosesseissa.",
    href: "#",
    cta: "Lue lisää",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Meta-Orkestrointi",
    description:
      "Spektri valitsee ja yhdistää automaattisesti parhaat tekoälymallit ja työkalut jokaiseen tehtävään.",
    href: "#",
    cta: "Lue lisää",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-5 md:gap-6 opacity-90">
          <img src="/logos/openai.svg" alt="OpenAI" className="h-6 w-auto object-contain" />
          <img src="/logos/google.svg" alt="Google" className="h-6 w-auto object-contain" />
          <img src="/logos/anthropic.svg" alt="Anthropic" className="h-6 w-auto object-contain" />
          <img src="/logos/microsoft.svg" alt="Microsoft" className="h-6 w-auto object-contain" />
          <img src="/logos/github.svg" alt="GitHub" className="h-6 w-auto object-contain" />
          <img src="/logos/figma.svg" alt="Figma" className="h-6 w-auto object-contain" />
        </div>
      </div>
    ),
  },
  {
    Icon: InputIcon,
    name: "Ideasta Sovellukseksi™",
    description:
      "Muunna ideasi toimivaksi sovellukseksi keskustelemalla – agentit hoitavat suunnittelun ja koodauksen.",
    href: "#",
    cta: "Lue lisää",
    className: "col-span-3 lg:col-span-1",
    background: (
      <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90" />
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Mission Control & Elävät Dokumentit™",
    description:
      "Hallitse kaikkea yhdestä näkymästä ja anna strategiadokumenttien toteuttaa itse itsensä.",
    href: "#",
    cta: "Lue lisää",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {documents.map((doc, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-white/10 bg-white/5 hover:bg-white/10",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium text-white ">
                  {doc.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs text-white/80">{doc.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
];

export function SpektriBento() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}

export default SpektriBento;
