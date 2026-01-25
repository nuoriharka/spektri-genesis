"use client"
import SmartImage from "@/components/ui/SmartImage"
import { photos } from "@/content/photos"

export default function PoweredByStrip() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <SmartImage
          src={photos.hero.iconcloud.src}
          alt={photos.hero.iconcloud.alt}
          fill
          sizes="100vw"
          loading="lazy"
          placeholder="blur"
          className="object-cover"
        />
      </div>
      <div className="relative z-10 text-center text-sm text-white/80">Powered by your tools – no lock-in</div>
    </div>
  )
}
