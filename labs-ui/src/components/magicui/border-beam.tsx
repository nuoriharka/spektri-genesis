import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
}

export function BorderBeam({ className, size = 200, duration = 15 }: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-2xl",
        "[background:linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent)] [animation:border-beam_var(--duration)_infinite_linear]",
        className
      )}
      style={{
        "--size": `${size}px`,
        "--duration": `${duration}s`,
      } as React.CSSProperties}
    />
  );
}
