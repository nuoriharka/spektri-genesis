"use client";
import React from "react";
import { motion } from "framer-motion";

export function AIBranch() {
  const steps = [
    { id: 1, title: "Prompt", desc: "Kuvaa tavoitteesi" },
    { id: 2, title: "Haarat", desc: "Luo vaihtoehtoisia polkuja" },
    { id: 3, title: "Valinta", desc: "Valitse paras toteutus" },
  ];
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold text-white">AI Branch demo</h1>
      <p className="text-white/70">Havainnollistaa haarautuvan suunnittelun.</p>
      <div className="relative mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-black/30 p-4"
          >
            <div className="text-sm text-white/60">Vaihe {s.id}</div>
            <div className="text-white font-semibold">{s.title}</div>
            <p className="text-white/70">{s.desc}</p>
          </motion.div>
        ))}
        {/* connecting lines */}
        <motion.div className="hidden md:block absolute left-1/3 top-1/2 h-0.5 w-1/3 bg-gradient-to-r from-[var(--brand)]/0 via-[var(--brand)]/60 to-[var(--brand)]/0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      </div>
    </div>
  );
}
