import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { ItineraryBoard } from '@/components/itinerary/itinerary-board';

interface ItineraryPageProps {
  params: { id: string };
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: {
      days: {
        orderBy: { date: 'asc' },
        include: {
          activities: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  });

  if (!trip) return notFound();

  return (
    <main className="space-y-6">
      <ItineraryBoard trip={trip} />
    </main>
  );
}
