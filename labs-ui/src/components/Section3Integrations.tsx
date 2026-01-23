"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Plug,
  Link2,
  Workflow,
  Cpu,
  MessageSquare,
  BookText,
  Table,
  CreditCard,
  ShoppingBag,
  Users,
  Database,
  Box,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import BorderBeam from "@/components/magicui/BorderBeam";
import matrixImg from "../../public/photos/all integrations, matrix.png";
import integrations1 from "../../public/photos/integrations1.png";
import connections from "../../public/photos/connections.png";
import nocode from "../../public/photos/nocodesoftware.png";
import aiSoftware from "../../public/photos/ai-software.png";
import { motion } from "framer-motion";

/**
 * SECTION 3 — INTEGRATIONS (Tailark integrations-5 inspired)
 * Headline: "Yhdistä kaikki työkalusi. Vapauta data."
 * Copy: "Spektri kytkee integraatiot, datavirrat ja agentit yhdeksi arkkitehtuuriksi.\n        Rakennat ilman kitkaa – koodilla tai ilman."
 */

const MATRIX_IMG = matrixImg as StaticImageData;

const PROVIDERS = [
  { key: "slack", name: "Slack", icon: MessageSquare },
  { key: "notion", name: "Notion", icon: BookText },
  { key: "sheets", name: "Google Sheets", icon: Table },
  { key: "stripe", name: "Stripe", icon: CreditCard },
  { key: "shopify", name: "Shopify", icon: ShoppingBag },
  { key: "hubspot", name: "HubSpot", icon: Users },
  { key: "postgres", name: "Postgres", icon: Database },
  { key: "s3", name: "S3", icon: Box },
] as const;

function ProviderBadge({ name, Icon }: { name: string; Icon: any }) {
  return (
    <div className="group relative flex items-center gap-2 rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-700 hover:bg-black/60">
      <Icon className="h-4 w-4 text-zinc-400" />
      <span>{name}</span>
      <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}

function Step({
  title,
  desc,
  Icon,
}: {
  title: string;
  desc: string;
  Icon: any;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl hy-card p-4">
      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400">
        <Icon className="h-4 w-4" /> {title}
      </div>
      <p className="text-sm text-zinc-300">{desc}</p>
    </div>
  );
}

export default function Section3Integrations() {
  const [mode, setMode] = useState<"nocode" | "api">("nocode");

  return (
    <section id="ratkaisut" className="relative mx-auto max-w-6xl px-4 md:max-w-7xl md:px-6 py-20 md:py-24 text-white type-modular baseline scroll-mt-24 section-halo">
      {/* AAAA+ gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-900 via-indigo-900/40 to-fuchsia-900/30 opacity-80" />
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
          Yhdistä kaikki työkalusi. <span className="text-zinc-300">Vapauta data.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-300 leading-7 md:leading-8">
          Spektri kytkee integraatiot, datavirrat ja agentit yhdeksi arkkitehtuuriksi.
          Rakennat ilman kitkaa – koodilla tai ilman.
        </p>

        {/* Cinematic banner (Matrix image) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mt-6 h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-2xl hy-img hy-overlay shadow-none"
        >
          <Image src={MATRIX_IMG} alt="Integrations Matrix" fill className="object-cover opacity-95" quality={90} placeholder="blur" priority sizes="100vw" />
          <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
            Integrations Grid
          </div>
        </motion.div>
      </div>

      {/* Layout: left pipeline / right brand wall */}
      <div className="grid items-start gap-8 lg:grid-cols-12">
        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4 lg:col-span-5"
        >
          <Step
            title="Integrations"
            desc="Plug & play liittimet: Zapier, n8n, Webhooks, GraphQL/REST."
            Icon={Plug}
          />
          <Step
            title="Connections"
            desc="Turvallinen OAuth, API‑avaimet ja RBAC. Reititä ja synkkaa dataa luotettavasti."
            Icon={Link2}
          />
          <Step
            title="No‑Code"
            desc="Visuaalinen virtaeditori: laukaise → muunna → rikasta → orkestroi."
            Icon={Workflow}
          />
          <Step
            title="AI Software"
            desc="Deploy agentteja ja mikropalveluja yhdellä klikkauksella – CI/CD valmiina."
            Icon={Cpu}
          />

          {/* Mode toggle */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setMode("nocode")}
              className={`focus-ring rounded-full px-4 py-2 text-sm transition ${
                mode === "nocode"
                  ? "bg-white text-black"
                  : "border border-white/20 bg-white/10 hover:bg-white/20"
              }`}
            >
              No‑Code
            </button>
            <button
              onClick={() => setMode("api")}
              className={`focus-ring rounded-full px-4 py-2 text-sm transition ${
                mode === "api"
                  ? "bg-white text-black"
                  : "border border-white/20 bg-white/10 hover:bg-white/20"
              }`}
            >
              API
            </button>
          </div>

          {/* Helper notes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-300"
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-black/40 px-3 py-1"><ShieldCheck className="h-4 w-4"/> SOC2‑ready</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-700/70 bg-black/40 px-3 py-1"><Sparkles className="h-4 w-4"/> LLM‑agnostinen</span>
          </motion.div>

          {/* CTAs */}
          <div className="mt-6 flex gap-3">
            <Link prefetch={false} href="/#integrations" className="btn-primary micro-cta focus-ring">Katso integraatiot</Link>
            <Link prefetch={false} href="/docs" className="btn-secondary micro-cta focus-ring">Dokumentaatio</Link>
          </div>
        </motion.div>

        {/* Brand wall + Preview collage */}
        <div className="lg:col-span-7">
          {/* Brand wall — one row, scrollable on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-label="Powered by"
            className="grid grid-flow-col auto-cols-max items-center gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROVIDERS.map((p) => (
              <ProviderBadge key={p.key} name={p.name} Icon={p.icon} />
            ))}
          </motion.div>

          {/* Collage */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mt-6 grid grid-cols-2 gap-4"
          >
            {([
              { img: integrations1 as StaticImageData, label: "Integrations" },
              { img: connections as StaticImageData, label: "Connections" },
              { img: nocode as StaticImageData, label: "No‑Code" },
              { img: aiSoftware as StaticImageData, label: "AI Software" },
            ] as { img: StaticImageData; label: string }[]).map(({ img, label }) => (
              <div key={label} className="group relative aspect-[4/3] overflow-hidden rounded-2xl hy-img hy-overlay shadow-none">
                <Image src={img} alt={label} fill placeholder="blur" sizes="(min-width:1024px) 50vw, 100vw" className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none" quality={85} />
                <div className="absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
