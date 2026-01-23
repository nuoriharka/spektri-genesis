"use client";
import React from "react";

export default function VideoDemo(){
  const ref = React.useRef<HTMLVideoElement>(null);
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
      <video ref={ref} className="w-full rounded-xl" controls preload="none" poster="/images/landing/hero-desktop.webp">
        <source src="/videos/demo-60s.mp4" type="video/mp4" />
        Selaimesi ei tue videota.
      </video>
    </div>
  );
}
