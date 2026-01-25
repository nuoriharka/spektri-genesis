
"use client";

import { InfiniteSlider } from "./InfiniteSlider";
import { ProgressiveBlur } from "./ProgressiveBlur";

const LOGOS = [
  { slug: "openai", label: "OpenAI", href: "https://openai.com" },
  { slug: "anthropic", label: "Anthropic", href: "https://www.anthropic.com" },
  { slug: "google", label: "Google", href: "https://www.google.com" },
  { slug: "microsoft", label: "Microsoft", href: "https://www.microsoft.com" },
  { slug: "github", label: "GitHub", href: "https://github.com" },
  { slug: "stripe", label: "Stripe", href: "https://stripe.com" },
  { slug: "vercel", label: "Vercel", href: "https://vercel.com" },
  { slug: "supabase", label: "Supabase", href: "https://supabase.com" },
];

export default function LogoCloud() {
  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm text-[color:var(--muted)]">Orkestroimme maailman parhaita työkaluja puolestasi</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={80}>
              {LOGOS.map(({ slug, label, href }, i) => (
                <div className="flex" key={slug+label+i}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 opacity-90 hover:opacity-100 transition-transform hover:scale-110"
                  >
                    <img
                      src={`/logos/${slug}.svg`}
                      alt={`${label} logo`}
                      className="mx-auto h-7 w-fit dark:invert drop-shadow-xl transition-all duration-200 hover:scale-110 hover:drop-shadow-2xl"
                      height={28}
                      style={{ imageRendering: 'auto' }}
                    />
                    <span className="text-xs md:text-sm text-[color:var(--fg)] font-medium tracking-wide drop-shadow-lg">
                      {label}
                    </span>
                  </a>
                </div>
              ))}
            </InfiniteSlider>
            {/* Fade gradients and progressive blur for luxury effect */}
            <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20 pointer-events-none" />
            <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20 pointer-events-none" />
            <ProgressiveBlur className="absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={1} />
            <ProgressiveBlur className="absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
