"use client";
import * as React from "react";
import Image from "next/image";

type Variant = "gradient" | "monoLight" | "monoDark";
type Lockup = "mark" | "horizontal" | "stacked";

const SRC_MAP: Record<Lockup, Record<Variant, string>> = {
  mark: {
    gradient: "/brand/creation-os-logomark-gradient.svg",
    monoLight: "/brand/creation-os-logomark-mono-light.svg",
    monoDark: "/brand/creation-os-logomark-mono-dark.svg",
  },
  horizontal: {
    gradient: "/brand/creation-os-logo-horizontal.svg",
    monoLight: "/brand/creation-os-logo-horizontal.svg",
    monoDark: "/brand/creation-os-logo-horizontal.svg",
  },
  stacked: {
    gradient: "/brand/creation-os-logo-stacked.svg",
    monoLight: "/brand/creation-os-logo-stacked.svg",
    monoDark: "/brand/creation-os-logo-stacked.svg",
  },
};

export function BrandLogo({
  lockup = "horizontal",
  variant = "gradient",
  alt = "Creation OS UI",
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
