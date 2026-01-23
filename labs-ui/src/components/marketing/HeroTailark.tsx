
"use client";

import Link from "next/link";
import BorderBeam from "@/components/magicui/BorderBeam";

export default function HeroTailark() {
  return (
    <section className="relative overflow-hidden">
      {/* Layered gradients and animated glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(109,106,255,.22)_0%,rgba(34,211,238,0)_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[conic-gradient(from_180deg_at_60%_40%,rgba(109,106,255,.10),rgba(34,211,238,.08),transparent_60%)] animate-spin-slow" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/60 to-transparent" />
      <div className="container mx-auto grid gap-10 px-6 py-20 md:grid-cols-2 md:py-28 relative z-10">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/70 drop-shadow">Agentit · Orkestrointi · No-code</p>
          <h1 className="mb-4 text-[clamp(2.2rem,6vw,3.5rem)] font-extrabold leading-tight tracking-[-0.03em] text-white/95 drop-shadow-xl">
            Sinulla on idea. <span className="text-brand-2">Me annamme sille armeijan.</span>
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/85 drop-shadow">
            Muuta tavoitteesi tuloksiksi keskustelemalla. Ensimmäinen digitaalinen työntekijäsi
            on valmiina alle 60 sekunnissa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-[var(--brand,#6D6AFF)] px-6 py-3 text-base font-semibold text-white ring-2 ring-brand/30 shadow-lg hover:brightness-110 hover:scale-105 transition-transform duration-150"
            >
              Aloita ilmaiseksi
            </Link>
            <Link
              href="/demo"
              className="rounded-xl bg-white/10 px-6 py-3 text-base font-semibold text-white ring-2 ring-white/20 shadow hover:bg-white/15 hover:scale-105 transition-transform duration-150"
            >
              Katso 60 sekunnin demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/70">Ei luottokorttia, ei sitoumuksia.</p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,.35)]">
            <picture>
              <source srcSet="/images/app/dashboard.webp" type="image/webp" />
              <img
                src="/images/app/dashboard.png"
                alt="Spektri.Labs dashboard"
                className="w-full h-72 md:h-96 object-contain scale-105 transition-transform duration-500 hover:scale-110 z-10 relative rounded-2xl shadow-xl"
                style={{ filter: "drop-shadow(0 4px 32px rgba(34,211,238,0.10))" }}
                decoding="async"
                loading="lazy"
              />
            </picture>
            <BorderBeam />
            {/* Reduce overlay opacity for better visibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            {/* Animated glow */}
            <div className="pointer-events-none absolute -inset-4 z-10 rounded-2xl border-2 border-brand/30 blur-xl opacity-30 animate-pulse" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-spin-slow { animation: spin 18s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
