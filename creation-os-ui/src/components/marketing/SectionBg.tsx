import React from "react";

export default function SectionBg({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand)]/20 via-transparent to-[var(--brand-2)]/20 blur-3xl" />
      </div>
      {children}
    </div>
  );
}
