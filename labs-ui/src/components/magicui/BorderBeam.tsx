"use client";
import * as React from "react";

export default function BorderBeam({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={
        "absolute inset-0 z-20 pointer-events-none rounded-2xl border-2 border-transparent " +
        className
      }
      style={{
        boxShadow:
          "0 0 0 2px rgba(109,106,255,0.25), 0 0 32px 8px rgba(34,211,238,0.12)",
        animation: "borderBeam 2.5s linear infinite"
      }}
    >
      <style>{`
        @keyframes borderBeam {
          0% { box-shadow: 0 0 0 2px rgba(109,106,255,0.25), 0 0 32px 8px rgba(34,211,238,0.12); }
          50% { box-shadow: 0 0 0 4px rgba(109,106,255,0.35), 0 0 48px 16px rgba(34,211,238,0.18); }
          100% { box-shadow: 0 0 0 2px rgba(109,106,255,0.25), 0 0 32px 8px rgba(34,211,238,0.12); }
        }
      `}</style>
    </span>
  );
}
