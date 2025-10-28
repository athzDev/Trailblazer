'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { slug: 'overview', label: 'Overview' },
  { slug: 'itinerary', label: 'Itinerary' },
  { slug: 'places', label: 'Places' },
  { slug: 'expenses', label: 'Expenses' },
  { slug: 'packing', label: 'Packing' },
  { slug: 'docs', label: 'Docs' },
];

export function TripTabs({ tripId }: { tripId: string }) {
  const segments = useSelectedLayoutSegments();
  const current = segments[segments.length - 1] ?? 'overview';
  return (
    <nav className="mb-6 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <Link
          key={tab.slug}
          href={`/app/trips/${tripId}/${tab.slug}`}
          className={cn(
            'rounded-full border border-border/40 px-4 py-1.5 text-sm transition hover:border-primary hover:text-primary',
            {
              'border-primary bg-primary/10 text-primary': current === tab.slug,
            }
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
