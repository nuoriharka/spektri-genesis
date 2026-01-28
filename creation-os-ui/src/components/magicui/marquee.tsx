"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  pauseOnHover = false,
  className,
}: {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "marquee",
          pauseOnHover ? "[animation-play-state:running]_hover:[animation-play-state:paused]" : "",
          "[animation-duration:var(--duration,30s)]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export default Marquee;
