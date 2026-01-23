import * as React from "react";

interface InfiniteSliderProps {
  speed?: number;
  speedOnHover?: number;
  gap?: number;
  children: React.ReactNode;
}

export function InfiniteSlider({ speed = 40, speedOnHover = 20, gap = 112, children }: InfiniteSliderProps) {
  // Simple infinite marquee effect using CSS animation
  // For smoothness, duplicate children and animate horizontally
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = React.useState(false);

  // Animation duration based on speed
  const duration = isHover ? speedOnHover : speed;

  return (
    <div
      ref={sliderRef}
      className="overflow-hidden w-full relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
    >
      <div
        className="flex"
        style={{
          gap: `${gap}px`,
          animation: `marquee ${duration}s linear infinite`,
          minWidth: 'max-content',
        }}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
