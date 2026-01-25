"use client";
import { useEffect, useRef, useState } from "react";
export default function VideoLoop({ src, label, className }:{
  src: string; label?: string; className?: string;
}) {
  const v = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const base = src.split("/").pop()!.replace(".mp4","");
  const poster = `/posters/${base}.jpg`;
  useEffect(() => {
    if (!v.current) return;
    v.current.muted = true; v.current.playsInline = true; v.current.autoplay = true; v.current.loop = true;
    const on = () => setReady(true);
    v.current.addEventListener("loadeddata", on, { once: true });
    return () => v.current?.removeEventListener("loadeddata", on);
  }, [src]);
  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ${className||""}`}>
      <img src={poster} alt={label||"poster"} className={`w-full ${ready?"opacity-0 absolute inset-0":""} transition-opacity duration-300`} />
      <video ref={v} poster={poster} className={`w-full ${ready?"opacity-100":"opacity-0"} transition-opacity duration-300`}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
