"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { INTEGRATIONS } from "@/content/integrations";

export function IntegrationsMarquee({ speed = 24 }: { speed?: number }) {
  const reduce = useReducedMotion();
  const duration = 60 / speed;
  const row = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section aria-label="Integraatiot" className="py-12">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden">
          <motion.div
            className="marquee gap-4 md:gap-6 items-center"
            style={{ animationDuration: `${duration}s` }}
            aria-hidden={reduce ? "false" : "true"}
          >
            {row.map((it, i) => (
              <Link
                key={`${it.name}-${i}`}
                href={it.href}
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="inline-flex items-center gap-3 sm:px-3 md:px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[var(--brand)] transition shadow-none hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
              >
                <Image src={it.logo} alt={it.name} width={20} height={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span className="text-sm text-white/90">{it.name}</span>
                {it.tag && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                    {it.tag}
                  </span>
                )}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
