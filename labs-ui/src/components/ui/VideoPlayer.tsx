"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function VideoPlayer({ srcMp4, poster, className, label }:{ srcMp4:string; poster?:string; className?:string; label?:string }){
  const ref = useRef<HTMLVideoElement>(null);
  const base = srcMp4.replace(/^.*\//,"").replace(".mp4","");
  const posterSrc = poster || `/posters/${base}.jpg`;
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-black ring-1 ring-white/10", className)}>
      <video
        ref={ref}
        aria-label={label || "Video player"}
        className="w-full h-auto"
        controls
        playsInline
        preload="metadata"
        poster={posterSrc}
      >
        <source src={srcMp4} type="video/mp4" />
      </video>
    </div>
  );
}
