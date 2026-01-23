"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BRANDS } from "@/content/logos";

export function LogoCloudMarquee({ speed = 30 }: { speed?: number }) {
  const reduce = useReducedMotion();
  const duration = 60 / speed;
  const row = [...BRANDS, ...BRANDS];

  return (
    <section aria-label="Luotettu kumppaneiden toimesta" className="py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden">
          <motion.div
            className="marquee gap-6 md:gap-10 items-center"
            style={{ animationDuration: `${duration}s` }}
            aria-hidden={reduce ? "false" : "true"}
          >
            {row.map((b, i) => (
              <Link
                key={`${b.name}-${i}`}
                href={b.href}
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="inline-flex items-center gap-3 sm:px-4 md:px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition focus-visible:ring-2 focus-visible:ring-[var(--brand)] shadow-none hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
              >
                <Image src={b.logo} alt={b.name} width={24} height={24} className="sm:w-5 sm:h-5 md:w-7 md:h-7" />
                <span className="text-sm text-white/80">{b.name}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
