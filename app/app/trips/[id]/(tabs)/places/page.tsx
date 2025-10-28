import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { PlacesMapPreview } from '@/components/places/places-map-preview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function PlacesPage({ params }: { params: { id: string } }) {
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: { places: true },
  });
  if (!trip) return notFound();

  return (
    <main className="space-y-6">
      <PlacesMapPreview trip={trip} />
      <Card>
        <CardHeader>
          <CardTitle>Saved places</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trip.places.map((place) => (
            <div key={place.id} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-3 py-2 text-sm">
              <div>
                <p className="font-medium">{place.name}</p>
                <p className="text-xs text-muted-foreground">{place.category ?? 'Spot'}</p>
              </div>
              <span className="text-xs text-muted-foreground">{place.lat.toFixed(2)}, {place.lon.toFixed(2)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
