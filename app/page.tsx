'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PlayDemoButton } from '@/components/trip/play-demo-button';

const features = [
  {
    title: 'Build cinematic itineraries',
    description: 'Drag-and-drop activities, map beautiful routes, and share with your crew.',
  },
  {
    title: 'Stay in sync offline',
    description: 'Trailblazer works on flights and subways. Review your trip offline then sync.',
  },
  {
    title: 'Plan smarter with insights',
    description: 'Budgets, weather, packing, docs, and reminders are one tap away.',
  },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="relative overflow-hidden">
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <m.div
          style={{ y, opacity }}
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#1e3a8a,_transparent_65%)]"
          aria-hidden
        />
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-6 py-24 text-center">
          <m.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary"
          >
            Introducing Trailblazer
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-balance text-5xl font-bold tracking-tight sm:text-6xl"
          >
            Design unforgettable journeys with collaborative itineraries.
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl text-lg text-muted-foreground"
          >
            Plan, budget, and explore together. Trailblazer keeps your crew aligned with live maps, weather, expenses, packing, and more—online or off.
          </m.p>
          <m.div className="flex flex-wrap items-center justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Button asChild>
              <Link href="/app">Launch app</Link>
            </Button>
            <PlayDemoButton />
          </m.div>
        </div>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 pb-24">
        <h2 className="text-3xl font-semibold">Why travelers choose Trailblazer</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <m.div
              key={feature.title}
              className="rounded-2xl border border-border bg-card/80 p-6 backdrop-blur"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </m.div>
          ))}
        </div>
      </section>
    </main>
  );
}
