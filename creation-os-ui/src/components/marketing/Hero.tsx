"use client";
import Image from "next/image";
import VideoLoop from "./VideoLoop";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { useEffect, useRef } from "react";
import { ShimmerCTA } from "./ShimmerCTA";

export default function Hero(){
  const shimmerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (shimmerRef.current) {
      shimmerRef.current.animate([
        { backgroundPosition: "0% 50%" },
        { backgroundPosition: "100% 50%" }
      ], {
        duration: 4000,
        iterations: Infinity
      });
    }
  }, []);
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 grid gap-12 md:grid-cols-2 items-center">
      {/* Animated gradient shimmer background */}
      <div ref={shimmerRef} className="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-60 pointer-events-none"
        style={{
          background: "linear-gradient(120deg, var(--brand) 0%, var(--brand-2) 60%, transparent 100%)",
          backgroundSize: "200% 200%",
          filter: "blur(32px) brightness(1.1)"
        }}
      />
      <div className="flex flex-col justify-center animate-float">
        <Image
          src="/brand/creation-os-logomark-gradient.svg"
          alt="Creation OS logo"
          width={48}
          height={48}
          className="h-12 w-auto mb-6 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
        />
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight [font-family:var(--font-display-active)] drop-shadow-xl transition-all duration-500 data-[theme=designer]:tracking-[0.08em] data-[theme=designer]:uppercase">
            Sinulla on idea.<br/>
            <span className="text-brand-2">Me annamme sille armeijan.</span>
          </h1>
          <ThemeSwitcher />
        </div>
        <p className="mt-4 text-lg text-white/80 max-w-xl drop-shadow">
          Muuta tavoitteesi tuloksiksi keskustelemalla. Ensimmäinen digitaalinen työntekijäsi on valmiina alle 60 sekunnissa.
        </p>
        <div className="mt-10 flex gap-4">
          <ShimmerCTA> Aloita ilmaiseksi </ShimmerCTA>
          <a href="#demo" className="px-6 py-3 rounded-xl border border-white/15 bg-white/10 text-white/90 shadow-lg hover:bg-white/20 transition-all duration-200">Katso 60 sekunnin demo</a>
        </div>
        <p className="mt-5 text-xs text-white/60">Ei luottokorttia, ei sitoumuksia.</p>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-white/10 bg-white/[0.02] shadow-[0_20px_60px_rgba(0,0,0,.35)] data-[theme=designer]:border-[#E5E5E5] data-[theme=designer]:bg-white data-[theme=designer]:shadow-none animate-float">
          <VideoLoop src="/videos/hero-video.mp4" label="Keskustelusta luomukseksi" />
          {/* Border beam effect */}
          <div className="pointer-events-none absolute inset-0 rounded-[var(--radius)] border-2 border-brand/30 blur-xl opacity-30 animate-pulse" />
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
