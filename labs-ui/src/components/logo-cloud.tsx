import { logos } from '@/data/logos'
import Image from 'next/image'
import { InfiniteSlider } from '@/components/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'

export default function LogoCloud() {
    // Dedupe logos by alt text; avoid client-only branching to prevent hydration mismatch
    const uniqueLogos = Array.from(new Map(logos.map(l => [l.alt, l])).values());
    return (
        <section className="bg-background overflow-hidden py-16 section-halo" aria-label="Kumppanilogot">
            <div className="group relative m-auto max-w-6xl px-4 md:max-w-7xl md:px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Powering the best teams</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            reducedSpeed={0}
                            gap={112}
                            className="[animation-play-state:running] group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
                            aria-label="Kumppanilogot"
                        >
                            {uniqueLogos.map(({ src, alt }) => (
                                <div className="flex" key={src}>
                                    <Image
                                        className="mx-auto h-5 w-auto dark:invert"
                                        src={src}
                                        alt={alt}
                                        width={140}
                                        height={20}
                                        sizes="(min-width: 1024px) 140px, 120px"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </InfiniteSlider>
                        <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
                    </div>
                </div>
            </div>
        </section>
    )
}
