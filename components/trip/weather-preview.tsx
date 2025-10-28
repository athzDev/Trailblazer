import { Trip } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherForecast } from '@/lib/weather';
import { toStringArray } from '@/lib/utils';

export async function WeatherPreview({ trip }: { trip: Trip }) {
  const destination = toStringArray(trip.destination);
  const forecast = await getWeatherForecast(destination[0] ?? 'Paris');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather outlook</CardTitle>
        <CardDescription>Stay ahead of the forecast.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        {forecast.slice(0, 3).map((day) => (
          <div key={day.date} className="rounded-xl border border-border/30 bg-background/60 p-4">
            <p className="text-sm font-semibold">{new Date(day.date).toLocaleDateString()}</p>
            <p className="text-2xl font-bold">{Math.round(day.temperatureC)}°C</p>
            <p className="text-xs text-muted-foreground capitalize">{day.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
