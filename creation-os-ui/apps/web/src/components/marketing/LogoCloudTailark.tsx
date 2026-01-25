"use client";

import { CORE_LOGOS } from "@/config/brand-logos";

export default function LogoCloudTailark() {
  // Add Creation OS logo at the start
  const creationOsLogo = {
    slug: "creation-os",
    label: "Creation OS",
    href: "/",
    src: "/brand/creation-os-logomark-gradient.svg"
  };
  // Error fallback for logos
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.opacity = "0.3";
    e.currentTarget.style.filter = "grayscale(1)";
    e.currentTarget.alt = "Logo not found";
  };
  return (
    <section className="overflow-hidden py-16 bg-gradient-to-b from-[#181c2b] via-[#10121a] to-background">
      <div className="container mx-auto px-6">
        <p className="mb-8 text-center text-lg font-medium text-white/80 tracking-tight">
          Orkestroimme maailman parhaita työkaluja puolestasi
        </p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background" />
          <div className="flex animate-[marquee_30s_linear_infinite] gap-20 md:gap-24 whitespace-nowrap will-change-transform items-center py-4">
            {/* Creation OS logo at start, large and crisp */}
            <a
              href={creationOsLogo.href}
              className="inline-flex items-center justify-center opacity-95 hover:opacity-100 transition-transform hover:scale-110"
              style={{ marginRight: '4rem' }}
            >
              <img
                src={creationOsLogo.src}
                alt={creationOsLogo.label}
                className="h-14 w-14 object-contain drop-shadow-2xl transition-all duration-200 hover:scale-110 hover:drop-shadow-2xl"
                decoding="async"
                loading="lazy"
                onError={handleError}
              />
            </a>
            {/* Brand logos, large, crisp, soft shadow, scale on hover, error fallback, no text */}
            {[...CORE_LOGOS, ...CORE_LOGOS].map(({ slug, label, href }, i) => (
              <a
                key={`${slug}-${i}`}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center opacity-90 hover:opacity-100 transition-transform hover:scale-110"
              >
                <img
                  src={`/logos/${slug}.svg`}
                  alt={label}
                  className="h-14 w-14 object-contain drop-shadow-2xl transition-all duration-200"
                  decoding="async"
                  loading="lazy"
                  onError={handleError}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* marquee keyframes */}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
