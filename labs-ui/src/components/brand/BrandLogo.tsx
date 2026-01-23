"use client";
import * as React from "react";
import Image from "next/image";

type Variant = "gradient" | "monoLight" | "monoDark";
type Lockup = "mark" | "horizontal" | "stacked";

const SRC_MAP: Record<Lockup, Record<Variant, string>> = {
  mark: {
    gradient: "/brand/spektri-logomark-gradient.svg",
    monoLight: "/brand/spektri-logomark-mono-light.svg",
    monoDark: "/brand/spektri-logomark-mono-dark.svg",
  },
  horizontal: {
    gradient: "/brand/spektri-logo-horizontal.svg",
    monoLight: "/brand/spektri-logo-horizontal.svg",
    monoDark: "/brand/spektri-logo-horizontal.svg",
  },
  stacked: {
    gradient: "/brand/spektri-logo-stacked.svg",
    monoLight: "/brand/spektri-logo-stacked.svg",
    monoDark: "/brand/spektri-logo-stacked.svg",
  },
};

export function BrandLogo({
  lockup = "horizontal",
  variant = "gradient",
  alt = "Spektri·Labs",
  width = 220,
  className,
}: {
  lockup?: Lockup; variant?: Variant; alt?: string; width?: number; className?: string;
}) {
  const src = SRC_MAP[lockup][variant];
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={Math.round(width * (lockup === "mark" ? 1 : lockup === "stacked" ? 1.3 : 0.28))}
      priority={false}
      className={className ?? ""}
    />
  );
}

export default BrandLogo;
