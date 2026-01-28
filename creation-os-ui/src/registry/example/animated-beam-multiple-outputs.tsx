"use client";
import * as React from "react";

// Simple animated beam network: one source node emits to three outputs with animated strokes
export default function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
  return (
    <div className={(className ?? "") + " relative"}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[
          // three bezier paths from center-left to three right targets
          "M120,150 C240,80 360,80 480,90",
          "M120,150 C260,150 340,150 480,150",
          "M120,150 C240,220 360,220 480,210",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="url(#beam)" strokeWidth="3" fill="none" filter="url(#glow)" className="[stroke-dasharray:8_10] animate-[dash_1.8s_linear_infinite]" />
          </g>
        ))}

        <style>{`@keyframes dash { to { stroke-dashoffset: -36; } }`}</style>
      </svg>

      {/* source node */}
      <div className="absolute left-[90px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-cyan-400/80 shadow-[0_0_20px_4px_rgba(34,211,238,0.6)]" />

      {/* target nodes */}
      <div className="absolute right-[80px] top-[90px] h-7 w-7 rounded-full bg-fuchsia-400/80 shadow-[0_0_20px_4px_rgba(244,114,182,0.5)]" />
      <div className="absolute right-[80px] top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-sky-400/80 shadow-[0_0_20px_4px_rgba(56,189,248,0.5)]" />
      <div className="absolute right-[80px] bottom-[80px] h-7 w-7 rounded-full bg-amber-400/80 shadow-[0_0_20px_4px_rgba(251,191,36,0.5)]" />
    </div>
  );
}
