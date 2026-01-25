"use client";
import { useEffect, useRef } from "react";

const logos = [
  { src: "/logos/openai.svg", name: "OpenAI" },
  { src: "/logos/google.svg", name: "Google" },
  { src: "/logos/anthropic.svg", name: "Anthropic" },
  { src: "/logos/microsoft.svg", name: "Microsoft" },
  { src: "/logos/github.svg", name: "GitHub" },
  { src: "/logos/vercel.svg", name: "Vercel" },
  { src: "/logos/stripe.svg", name: "Stripe" },
  { src: "/logos/supabase.svg", name: "Supabase" },
];

export default function LogoCloud() {
  const track = useRef<HTMLDivElement>(null);

  // yksinkertainen loputon marquee (Tailark-henkinen)
  useEffect(() => {
    if (!track.current) return;
    const el = track.current;
    el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: 25000,
      iterations: Infinity,
      easing: "linear",
    });
  }, []);

  return (
    <section className="overflow-hidden py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Orkestroimme maailman parhaita työkaluja puolestasi
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background" />

          <div ref={track} className="flex w-[200%] gap-16">
            {[...logos, ...logos].map((l, i) => (
              <div key={i} className="flex min-w-48 items-center justify-center gap-3 opacity-70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={`${l.name} logo`} src={l.src} className="h-6 w-auto dark:invert" />
                <span className="text-sm">{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
