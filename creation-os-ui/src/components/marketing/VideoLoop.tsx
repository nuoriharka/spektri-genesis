"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function VideoLoop({ src, label, className }:{
  src: string; label?: string; className?: string;
}) {
  const v = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const base = src.split("/").pop()!.replace(".mp4","");
  const poster = `/posters/${base}.jpg`;
  useEffect(() => {
    const node = v.current;
    if (!node) return;
    node.muted = true;
    node.playsInline = true;
    node.autoplay = true;
    node.loop = true;
    const on = () => setReady(true);
    node.addEventListener("loadeddata", on, { once: true });
    return () => node.removeEventListener("loadeddata", on);
  }, [src]);
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className||""}`}>
      <Image
        src={poster}
        alt={label || "Video poster"}
        fill
        sizes="100vw"
        className={`object-cover ${ready?"opacity-0 absolute inset-0":""} transition-opacity duration-300`}
        priority
      />
      <video ref={v} poster={poster} className={`w-full ${ready?"opacity-100":"opacity-0"} transition-opacity duration-300`}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
