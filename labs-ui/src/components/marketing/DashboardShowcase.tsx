"use client";
import Image from "next/image";
import { getBlur } from "@/lib/images";

type Props = { src: string; alt: string; caption?: string; badge?: string };

function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** Glass “browser frame” + retro-grid + soft glow + light 3D tilt (prefers-reduced-motion respected) */
export default function DashboardShowcase({ src, alt, caption, badge }: Props) {
  return (
    <section className="relative py-10 md:py-16">
      {/* ambient glow + retro grid */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px]",
          "before:absolute before:inset-0 before:content-['']",
          "before:bg-[radial-gradient(600px_300px_at_10%_20%,rgba(34,211,238,0.12),transparent),radial-gradient(600px_300px_at_90%_60%,rgba(109,106,255,0.12),transparent)]"
        )}
      />
      <div className="mx-auto max-w-7xl px-6">
        {(badge || caption) && (
          <div className="mb-3 flex items-center gap-3">
            {badge && (
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
                {badge}
              </span>
            )}
            {caption && <p className="text-sm text-white/70">{caption}</p>}
          </div>
        )}

        <div className="group perspective-[1600px]">
          <div
            className={cx(
              "relative mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur",
              "shadow-[0_20px_80px_rgba(0,0,0,0.45)] transition-transform duration-500 will-change-transform",
              "group-hover:[transform:rotateX(2deg)_rotateY(-2deg)_translateZ(0)]",
              "motion-reduce:transition-none motion-reduce:group-hover:transform-none"
            )}
          >
            <div aria-hidden className="absolute -inset-1 -z-10 rounded-[28px] bg-gradient-to-r from-[#6D6AFF]/20 to-[#22D3EE]/20 blur-2xl" />
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <div className="ml-3 flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/50">
                spektri.labs / dashboard
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-b-3xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={getBlur(src)}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/50">Kuvakaappaus: Spektri.Labs Komentokeskus</p>
      </div>
    </section>
  );
}
