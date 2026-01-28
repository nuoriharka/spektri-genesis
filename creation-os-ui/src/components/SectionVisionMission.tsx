// server component: no client-only APIs used

import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  BadgeCheck,
  Rocket,
  Sparkles,
  Users,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import BorderBeam from "@/components/magicui/BorderBeam";

const WHY_ITEMS = [
  {
    icon: Globe,
    title: "Avoin ekosysteemi",
    desc: "Ei vendor lock-in. Oma data, omat säännöt, täysi kontrolli infrastruktuuriin.",
  },
  {
    icon: Zap,
    title: "Nopeus etusijalla",
    desc: "Ideasta MVP:hen 60 sekunnissa. Agentit hoitavat raskauttamisen, sinä keskityt visioon.",
  },
  {
    icon: Shield,
    title: "Turvallisuus sisäänrakennettuna",
    desc: "SOC2, GDPR, ja zero-trust arkkitehtuuri. Enterprise-ready päivä yhdestä.",
  },
  {
    icon: Heart,
    title: "Yhteisöllisyys",
    desc: "Jaa agenttejasi, löydä inspiraatiota ja luo yhdessä – ansainta seuraa mukana.",
  },
  {
    icon: Users,
    title: "Luojat keskiössä",
    desc: "Ansaintamallit, attribuutio ja yhteisöllisyys on suunniteltu tekijöiden näkökulmasta.",
  },
  {
    icon: TrendingUp,
    title: "Tuotevetoinen kasvu",
    desc: "Alusta leviää orgaanisesti käyttäjien kautta – eksponentiaalinen skaala sisäänrakennettuna.",
  },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs uppercase tracking-wider text-zinc-400">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

export default function SectionVisionMission() {
  return (
    <section id="vision-mission" className="relative mx-auto max-w-6xl px-4 md:max-w-7xl md:px-6 py-20 md:py-24 text-white type-modular baseline scroll-mt-24 section-halo">
      {/* AAAA+ gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-fuchsia-900/40 to-cyan-900/30 opacity-80" />
      <BorderBeam className="pointer-events-none" />

      {/* MOTR: Framer Motion entrance animation for header/cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="mb-10 flex flex-col items-start gap-3">
          <Kicker>Creation OS · Manifesti</Kicker>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-balance">
            Demokratisoitu tekoäly – <span className="text-zinc-300">luovaa ja sosiaalista</span>
          </h2>
          <p className="max-w-3xl text-zinc-300 leading-7 md:leading-8">
            Rakennamme maailmaa, jossa tekoäly on demokraattista, luovaa ja sosiaalista – voimistaen jokaista ihmistä muuttamaan ideat toimiviksi sovelluksiksi ilman koodaustaitoja.
          </p>
        </div>

        {/* Two cards: Vision & Mission (AAAA+ style) */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl hy-card p-8 bg-gradient-to-br from-indigo-950/80 via-fuchsia-900/40 to-cyan-900/30 shadow-2xl shadow-indigo-900/20 border border-zinc-800">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-fuchsia-400 font-bold">
              <Target className="h-4 w-4 text-fuchsia-400" /> Visio
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">Demokraattinen, luova ja sosiaalinen tekoäly</h3>
            <p className="mt-3 text-zinc-300 text-base leading-relaxed">
              Voimistaen jokaista muuttamaan ideat sovelluksiksi – ilman koodia.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl hy-card p-8 bg-gradient-to-br from-cyan-950/80 via-indigo-900/40 to-fuchsia-900/30 shadow-2xl shadow-cyan-900/20 border border-zinc-800">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-400 font-bold">
              <BadgeCheck className="h-4 w-4 text-cyan-400" /> Missio
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">Modulaarinen ekosysteemi luojataloudelle</h3>
            <p className="mt-3 text-zinc-300 text-base leading-relaxed">
              Teemme agenttien löytämisestä, remixaamisesta ja jakamisesta vaivatonta – arvo palautuu tekijöille.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Why Creation OS (AAAA+ style) */}
      <div className="mt-16">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-indigo-400 font-bold">
          <Rocket className="h-4 w-4 text-indigo-400" /> Miksi Creation OS?
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-2xl hy-card p-6 bg-gradient-to-br from-zinc-950/80 via-indigo-900/20 to-fuchsia-900/10 border border-zinc-800 shadow-xl shadow-indigo-900/10">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-fuchsia-300">
                <Icon className="h-4 w-4 text-fuchsia-300" /> {title}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{desc}</p>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <figure className="mt-12 rounded-2xl hy-card p-6">
        <blockquote className="text-lg font-medium text-zinc-200">
          &ldquo;Rakennamme seuraavaa sukupolvea muovaavaa alustaa – ei koodilla, vaan kollektiivisella älyllä.&rdquo;
        </blockquote>
        <figcaption className="mt-2 text-sm text-zinc-400">Creation OS</figcaption>
      </figure>

      {/* CTA Row */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="/dashboard" className="btn-primary micro-cta focus-ring">
          Tutustu alustan ytimeen <ArrowRight className="h-4 w-4" />
        </a>
        <a href="/integrations" className="btn-secondary micro-cta focus-ring">
          Näe integraatiot
        </a>
      </div>
    </section>
  );
}
