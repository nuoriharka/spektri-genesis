import * as React from "react";

interface ProgressiveBlurProps {
  className?: string;
  direction?: "left" | "right";
  blurIntensity?: number;
}

export function ProgressiveBlur({ className = "", direction = "left", blurIntensity = 1 }: ProgressiveBlurProps) {
  // Simulate progressive blur with a gradient overlay
  const gradient = direction === "left"
    ? `linear-gradient(to right, rgba(255,255,255,${blurIntensity * 0.7}) 0%, transparent 100%)`
    : `linear-gradient(to left, rgba(255,255,255,${blurIntensity * 0.7}) 0%, transparent 100%)`;
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        [direction]: 0,
        width: "5rem",
        pointerEvents: "none",
        background: gradient,
        zIndex: 10,
      }}
    />
  );
}
