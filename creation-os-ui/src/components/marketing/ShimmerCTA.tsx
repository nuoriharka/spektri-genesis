"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShimmerCTA({ children, className, ...props }: any) {
  return (
    <Button
      {...props}
      className={cn(
        "relative overflow-hidden rounded-xl px-5 py-2 text-base font-semibold",
        "bg-[var(--brand)] text-white shadow-[0_8px_30px_rgb(109,106,255,0.35)]",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2.2s_infinite]",
        "before:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent)]",
        className
      )}
    >
      {children}
    </Button>
  );
}
