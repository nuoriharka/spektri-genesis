"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function BorderBeam({ className = "" }: { className?: string }){
  const reduce = useReducedMotion();
  const duration = reduce ? 0 : 8;
  return (
    <div className={`pointer-events-none absolute inset-0 rounded-3xl ${className}`} aria-hidden>
      <motion.div
        className="absolute -inset-[1px] rounded-3xl"
        style={{
          background: "conic-gradient(from 0deg, rgba(109,106,255,0.35), rgba(0,0,0,0), rgba(10,200,120,0.35), rgba(0,0,0,0))"
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
      <div className="absolute inset-[1px] rounded-3xl bg-[#0B0C0E]" />
    </div>
  );
}
