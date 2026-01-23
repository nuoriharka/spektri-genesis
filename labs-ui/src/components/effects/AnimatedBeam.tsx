"use client";
import { motion } from "framer-motion";

export default function AnimatedBeam({ className = "" }: { className?: string }){
  return (
    <div className={"pointer-events-none absolute inset-0 -z-10 "+className} aria-hidden>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
        className="absolute left-0 top-1/2 h-1 w-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--brand)]/0 via-[var(--brand)]/60 to-transparent blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3.5 }}
        className="absolute right-0 top-1/3 h-1 w-1/2 bg-gradient-to-l from-[var(--brand-2)]/0 via-[var(--brand-2)]/60 to-transparent blur-sm"
      />
    </div>
  );
}
