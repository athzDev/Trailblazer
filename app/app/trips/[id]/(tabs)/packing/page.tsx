import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { suggestPackingItems } from '@/lib/weather';
import { toStringArray } from '@/lib/utils';

export default async function PackingPage({ params }: { params: { id: string } }) {
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: { packingItems: true },
  });
  if (!trip) return notFound();

  const destination = toStringArray(trip.destination);
  const suggestions = await suggestPackingItems(destination[0] ?? 'Paris');

  return (
    <main className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Suggested packing</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <span key={item} className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
              {item}
            </span>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your list</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trip.packingItems.map((item) => (
            <label key={item.id} className="flex items-center gap-3 text-sm">
              <input type="checkbox" defaultChecked={item.checked} className="h-4 w-4 rounded border-border bg-background" />
              <span>{item.label}</span>
              {item.suggested && <span className="text-xs text-muted-foreground">Suggested</span>}
            </label>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
