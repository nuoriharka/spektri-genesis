
'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfiniteSliderProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function InfiniteSlider({
  children,
  direction = 'left',
  speed = 50,
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState(20);

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const viewportWidth = containerRef.current.offsetWidth;
      const newDuration = (scrollWidth / speed) * (viewportWidth / scrollWidth);
      setDuration(newDuration);
    }
  }, [speed]);

  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div
        ref={containerRef}
        className="flex"
        animate={{
          x: direction === 'left' ? '-50%' : '50%',
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{ display: 'flex' }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
