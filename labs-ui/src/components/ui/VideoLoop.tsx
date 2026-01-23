"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function VideoLoop({ srcMp4, poster, className, rounded = true, shadow = true, label }:{
  srcMp4:string; poster?:string; className?:string; rounded?:boolean; shadow?:boolean; label?:string;
}){
  const vref = useRef<HTMLVideoElement>(null);
  const [ready,setReady]=useState(false);
  const [reduce, setReduce] = useState(false);
  const base = srcMp4.replace(/^.*\//,"").replace(".mp4","");
  const posterSrc = poster || `/posters/${base}.jpg`;

  useEffect(()=>{
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = (val:boolean)=> setReduce(val);
    if (mq) {
      apply(mq.matches);
      const h = (e:MediaQueryListEvent)=> apply(e.matches);
      mq.addEventListener?.("change", h);
      return ()=> mq.removeEventListener?.("change", h);
    }
  },[]);

  useEffect(()=>{
    const v = vref.current;
    if(!v) return;
    const onReady = ()=> setReady(true);
    v.addEventListener("loadeddata", onReady, { once:true });
    v.muted = true; v.playsInline = true; v.autoplay = true; v.loop = true;
    return ()=> v.removeEventListener("loadeddata", onReady);
  },[srcMp4]);

  if (reduce) {
    return (
      <img
        src={posterSrc}
        alt={label || "Video poster"}
        className={cn("w-full h-auto", rounded && "rounded-2xl", shadow && "shadow-2xl", className)}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", rounded && "rounded-2xl", shadow && "shadow-2xl", className)}>
      <img
        src={posterSrc}
        alt={label || "Video poster"}
        className={cn("w-full h-auto transition-opacity duration-300", ready && "opacity-0 absolute inset-0 pointer-events-none")}
        aria-hidden={ready}
      />
      <video
        ref={vref}
        aria-label={label || "Spektri demo video"}
        className={cn("w-full h-auto transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
        preload="metadata"
        poster={posterSrc}
        muted
        playsInline
        autoPlay
        loop
      >
        <source src={srcMp4} type="video/mp4" />
      </video>
    </div>
  );
}
