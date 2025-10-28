'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { format } from 'date-fns';

export interface TripHeroData {
  title: string;
  destination: string[];
  coverUrl?: string | null;
  start: string;
  end: string;
  travelers?: number | null;
  daysCount: number;
  currency: string;
}

export function TripHero({ trip }: { trip: TripHeroData }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-10">
      <div className="absolute inset-0 -z-10">
        {trip.coverUrl && (
          <Image
            src={trip.coverUrl}
            alt={trip.title}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <m.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-wide text-primary">
            {trip.destination.join(' · ')}
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold"
          >
            {trip.title}
          </m.h1>
          <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm text-muted-foreground">
            {format(new Date(trip.start), 'PPP')} → {format(new Date(trip.end), 'PPP')} · {trip.travelers ?? 1} traveler(s)
          </m.p>
        </div>
        <m.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="flex gap-6 text-sm text-muted-foreground">
          <span>{trip.daysCount} day plan</span>
          <span>{trip.currency}</span>
        </m.div>
      </div>
    </section>
  );
}
