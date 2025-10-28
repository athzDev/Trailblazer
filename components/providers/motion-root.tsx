'use client';

import { LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const variants = {
  hidden: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="min-h-screen"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
