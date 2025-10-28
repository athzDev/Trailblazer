import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherForecast } from '@/lib/weather';
import { differenceInDays } from 'date-fns';
import { toStringArray } from '@/lib/utils';

export async function DashboardOverview() {
  const session = await auth();
  const userId = session?.user?.id;
  const trips = await prisma.trip.findMany({
    where: userId ? { ownerId: userId } : {},
    orderBy: { start: 'asc' },
    take: 4,
    include: {
      days: true,
      expenses: true,
    },
  });

  const nextTrip = trips[0];
  const nextTripDestination = nextTrip ? toStringArray(nextTrip.destination) : [];
  const weather = nextTripDestination.length > 0 ? await getWeatherForecast(nextTripDestination[0]) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upcoming trips</CardTitle>
          <CardDescription>Pick up where you left off.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {trips.length === 0 && <p className="text-sm text-muted-foreground">No trips yet. Start your first adventure!</p>}
          {trips.map((trip) => {
            const destination = toStringArray(trip.destination);
            return (
              <div key={trip.id} className="rounded-xl border border-border/40 bg-background/40 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{trip.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {destination.join(', ')} · {trip.start.toLocaleDateString()} → {trip.end.toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {differenceInDays(trip.start, new Date()) > 0
                      ? `${differenceInDays(trip.start, new Date())} days`
                      : 'In progress'}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Weather preview</CardTitle>
          <CardDescription>Pack smart with a 7-day outlook.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {weather.slice(0, 4).map((day) => (
            <div key={day.date} className="rounded-xl border border-border/30 bg-secondary/30 p-4">
              <p className="text-sm font-medium">{new Date(day.date).toLocaleDateString()}</p>
              <p className="text-lg font-semibold">{Math.round(day.temperatureC)}°C</p>
              <p className="text-xs text-muted-foreground capitalize">{day.description}</p>
            </div>
          ))}
          {weather.length === 0 && <p className="text-sm text-muted-foreground">Connect a weather provider to unlock forecasts.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
