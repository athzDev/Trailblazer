import Link from 'next/link';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { TripCard } from '@/components/trip/trip-card';

export default async function TripsPage() {
  const session = await auth();
  const trips = await prisma.trip.findMany({
    where: session?.user?.id ? { ownerId: session.user.id } : {},
    orderBy: { start: 'desc' },
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Your trips</h1>
          <p className="text-sm text-muted-foreground">Crafted adventures ready to explore.</p>
        </div>
        <Button asChild>
          <Link href="/app/trips/new">Create trip</Link>
        </Button>
      </div>
      {trips.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/40 p-12 text-center text-muted-foreground">
          <p>No trips yet. Start planning your next escape.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </main>
  );
}
