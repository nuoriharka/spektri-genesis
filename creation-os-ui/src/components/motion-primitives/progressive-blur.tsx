
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveBlurProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  intensity?: number;
}

export function ProgressiveBlur({
  children,
  className,
  direction = 'bottom',
  intensity = 20,
}: ProgressiveBlurProps) {
  const gradientDirection = {
    top: 'to bottom',
    bottom: 'to top',
    left: 'to right',
    right: 'to left',
  };

  const maskImage = `linear-gradient(${gradientDirection[direction]}, transparent 0%, black ${intensity}%, black ${100 - intensity}%, transparent 100%)`;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
      }}
    >
      {children}
    </div>
  );
}
