import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SharePage({ params }: { params: { slug: string } }) {
  const trip = await prisma.trip.findFirst({
    where:
      params.slug === 'demo'
        ? { title: 'Paris Getaway' }
        : {
            id: params.slug,
          },
    include: {
      days: {
        include: { activities: { orderBy: { order: 'asc' } } },
      },
    },
  });
  if (!trip) return notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold">{trip.title}</h1>
        <p className="text-sm text-muted-foreground">Shared itinerary snapshot</p>
      </header>
      {trip.days.map((day, idx) => (
        <Card key={day.id}>
          <CardHeader>
            <CardTitle>
              Day {idx + 1} – {new Date(day.date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {day.activities.map((activity) => (
              <div key={activity.id} className="rounded-xl border border-border/30 bg-background/60 px-3 py-2 text-sm">
                <p className="font-medium">{activity.title}</p>
                {activity.start && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(activity.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
