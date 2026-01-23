import { useState } from 'react'
import Image from 'next/image'

export const LazyImage = ({ src, alt, ...props }: { src: string, alt: string, [key: string]: any }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}
