import Link from 'next/link';
import Image from 'next/image';
import { Trip } from '@prisma/client';
import { m } from 'framer-motion';
import { cn, toStringArray } from '@/lib/utils';

export function TripCard({ trip }: { trip: Trip }) {
  const destination = toStringArray(trip.destination);
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card shadow-lg"
    >
      <Link href={`/app/trips/${trip.id}/overview`} className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {trip.coverUrl ? (
            <Image src={trip.coverUrl} alt={trip.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">{destination[0] ?? 'Trip'}</span>
            </div>
          )}
          <div className="absolute bottom-4 left-4 flex flex-col text-white">
            <span className="text-sm uppercase tracking-wide">{destination.join(', ')}</span>
            <span className="text-2xl font-semibold">{trip.title}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <p className="text-sm text-muted-foreground">{trip.start.toLocaleDateString()} → {trip.end.toLocaleDateString()}</p>
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
            <span>{trip.travelers ?? 1} travelers</span>
            <span className={cn('rounded-full bg-primary/10 px-3 py-1 text-primary', { 'text-emerald-400': !trip.budgetCents })}>
              {trip.budgetCents ? `${trip.currency} ${(trip.budgetCents / 100).toLocaleString()}` : 'Flexible budget'}
            </span>
          </div>
        </div>
      </Link>
    </m.div>
  );
}
