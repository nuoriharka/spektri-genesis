"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type BentoCardProps = {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ComponentType<any>;
  name: string;
  description?: string;
  href?: string;
  cta?: string;
  className?: string;
  background?: React.ReactNode;
};

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-3 gap-4 md:gap-6", className)}>
      {children}
    </div>
  );
}

export function BentoCard({ Icon, name, description, href, cta, className, background }: BentoCardProps) {
  const Wrapper = href ? "a" : ("div" as const);
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={cn(
        "group relative col-span-3 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition",
        "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
        "dark:border-white/10 dark:bg-white/5",
        className,
      )}
    >
      {background}
      <div className="relative z-10 flex items-start gap-3">
        {Icon ? <Icon className="mt-0.5 h-5 w-5 text-white/80" /> : null}
        <div>
          <h3 className="text-base font-semibold text-white">{name}</h3>
          {description ? (
            <p className="mt-1 text-sm text-white/70">{description}</p>
          ) : null}
          {cta ? (
            <span className="mt-3 inline-flex text-sm font-medium text-white/80 underline decoration-dotted underline-offset-4">
              {cta}
            </span>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}

export default BentoGrid;
