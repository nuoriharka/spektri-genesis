// server component: static content, no client-only APIs

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PanelLeft, Bot, Users, type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BorderBeam from "@/components/magicui/BorderBeam";
import komentokeskus from "../../public/photos/komentokeskus.png";
import metaAgentti from "../../public/photos/meta-agentti.png";
import agenttifarmit from "../../public/photos/agenttifarmit.png";

/**
 * SECTION 2 — FEATURES (Tailark-inspired)  
 * Headline: "Yksi Alusta, Rajaton Potentiaali"
 * Items: Komentokeskus, Meta‑Agentti, Agenttifarmit
 *
 * Assets required under /public:
 *  - /photos/komentokeskus.png  (Komentokeskus)
 *  - /photos/meta-agentti.png (Meta‑Agentti)
 *  - /photos/agenttifarmit.png       (Agenttifarmit)
 */

const FEATURES = [
  {
    key: "command",
    kicker: "Komentokeskus",
    title: "Operoi koko ekosysteemiä yhdestä näkymästä",
    desc:
      "Valvo agentteja, työnkulkuja ja integraatioita keskitetystä ohjaamosta. Live‑telemetria, hälytykset ja ihmisen hyväksyntä yhdellä klikkauksella.",
    img: komentokeskus as StaticImageData,
    href: "/#mission-control",
    icon: PanelLeft,
    chips: ["Realtime", "Audit Trail", "Roolit & oikeudet"],
  },
  {
    key: "meta",
    kicker: "Meta‑Agentti",
    title: "Orkestroi agenttitiimit automaattisesti",
    desc:
      "Meta‑agentti laatii suunnitelman, jakaa tehtävät erikoisagenteille ja optimoi suorituksen jatkuvasti. Tuloksena vähemmän kitkaa, enemmän toimitusta.",
    img: metaAgentti as StaticImageData,
    href: "/#metaorkestroija",
    icon: Bot,
    chips: ["Planner", "Critic", "Self‑Improve"],
  },
  {
    key: "farm",
    kicker: "Agenttifarmit",
    title: "Skaalaa suorituskykyä vailla ylärajaa",
    desc:
      "Käynnistä kymmeniä tai satoja agenteja hetkessä. Eristetyt sandboxit, välimuistit ja kustannusrajat tekevät skaalaamisesta hallittua.",
    img: agenttifarmit as StaticImageData,
    href: "/#agenttifarmit",
    icon: Users,
    chips: ["Autoscale", "Sandbox", "Budjettikatot"],
  },
] as const;

type Feature = {
  kicker: string;
  title: string;
  desc: string;
  img: StaticImageData;
  href: string;
  icon: LucideIcon;
  chips: readonly string[];
};

function FeatureRow({
  kicker,
  title,
  desc,
  img,
  href,
  icon: Icon,
  chips,
  reverse,
}: Feature & { reverse?: boolean }) {
  const isMeta = kicker.toLowerCase().includes('meta');
  return (
    <div
      className={`grid items-center gap-10 md:gap-14 lg:gap-20 ${reverse ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1fr_1.1fr]"}`}
    >
      {/* Copy (AAAA+ style) */}
      <Card className={`${reverse ? "md:order-2" : ""} flex flex-col`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="chip text-fuchsia-300 font-semibold bg-zinc-900/40 border border-fuchsia-500/30 px-3 py-1 rounded-full shadow-sm text-xs">
                {c}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link prefetch={false} href={href} className="btn-primary micro-cta focus-ring px-6 py-3 font-bold bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 shadow-lg shadow-fuchsia-900/20 border-0 hover:scale-105 focus:ring-2 focus:ring-fuchsia-400 transition-transform rounded-full text-sm inline-flex items-center gap-2">
            Tutustu <ArrowRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>

      {/* Visual (AAAA+ style) */}
      <div className={`relative ${reverse ? "md:order-1" : ""}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl hy-img hy-overlay shadow-2xl shadow-indigo-900/10 border border-zinc-800">
          <Image
            src={img}
            alt={kicker}
            fill
            placeholder="blur"
            className={`object-cover ${isMeta ? 'object-top' : ''} transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none`}
            quality={90}
            priority={kicker === 'Komentokeskus'}
            sizes="(min-width:1024px) 50vw, 100vw"
          />
          {/* overlay is provided by .hy-overlay */}
          <div className="absolute bottom-3 right-3 rounded-full bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md">
            {kicker}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection2() {
  return (
    <section id="ominaisuudet" className="relative mx-auto max-w-6xl px-4 md:max-w-7xl md:px-6 py-20 md:py-24 text-white scroll-mt-24 section-halo">
      {/* AAAA+ gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-900 via-indigo-900/40 to-cyan-900/30 opacity-80" />
      {/* Header */}
      <div className="mb-10 md:mb-12 flex flex-col items-start gap-2">
        <span className="text-xs uppercase tracking-wider text-zinc-400">Section 2 · Features</span>
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
          Yksi Alusta, <span className="text-zinc-300">Rajaton Potentiaali</span>
        </h2>
        <p className="max-w-2xl text-zinc-300 leading-7 md:leading-8">
          Kolme keihäänkärkeä, jotka tekevät Spektristä tappavan nopean: keskitetty ohjaus, itseään parantava meta–agentti ja rajattomasti skaalautuvat agenttifarmit.
        </p>
      </div>

      {/* MOTR: Framer Motion entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-14 md:space-y-16"
      >
        {FEATURES.map((f, idx) => {
          const { key: featureKey, ...rest } = f;
          return (
            <FeatureRow key={featureKey ?? idx} {...(rest as Feature)} reverse={idx === 1} />
          );
        })}
      </motion.div>
    </section>
  );
}
