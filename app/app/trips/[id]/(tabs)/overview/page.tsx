import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { TripHero } from '@/components/trip/trip-hero';
import { BudgetSummary } from '@/components/budget/budget-summary';
import { PlacesMapPreview } from '@/components/places/places-map-preview';
import { WeatherPreview } from '@/components/trip/weather-preview';
import { toStringArray } from '@/lib/utils';

interface OverviewPageProps {
  params: { id: string };
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: {
      days: {
        include: {
          activities: {
            orderBy: { order: 'asc' },
          },
        },
      },
      expenses: true,
      places: true,
    },
  });

  if (!trip) return notFound();

  const destination = toStringArray(trip.destination);

  return (
    <main className="space-y-10">
      <TripHero
        trip={{
          title: trip.title,
          destination,
          coverUrl: trip.coverUrl,
          start: trip.start.toISOString(),
          end: trip.end.toISOString(),
          travelers: trip.travelers,
          daysCount: trip.days.length,
          currency: trip.currency,
        }}
      />
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <WeatherPreview trip={trip} />
          <PlacesMapPreview trip={trip} />
        </div>
        <BudgetSummary trip={trip} />
      </div>
    </main>
  );
}
