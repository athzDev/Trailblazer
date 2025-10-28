import { featureFlags } from '@/lib/feature-flags';
import { wait } from '@/lib/utils';

export type WeatherForecast = {
  date: string;
  icon: string;
  temperatureC: number;
  description: string;
};

export async function getWeatherForecast(location: string): Promise<WeatherForecast[]> {
  if (!featureFlags.weather || !process.env.OPENWEATHER_KEY) {
    return mockForecast(location);
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHER_KEY}&units=metric`
    );
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    return data.list.slice(0, 7).map((entry: any) => ({
      date: entry.dt_txt,
      icon: entry.weather?.[0]?.icon ?? '01d',
      temperatureC: entry.main?.temp ?? 20,
      description: entry.weather?.[0]?.description ?? 'Clear',
    }));
  } catch (error) {
    console.warn('Weather fallback', error);
    return mockForecast(location);
  }
}

function mockForecast(location: string): WeatherForecast[] {
  void location;
  return Array.from({ length: 7 }).map((_, idx) => ({
    date: new Date(Date.now() + idx * 86_400_000).toISOString(),
    icon: '02d',
    temperatureC: 20 + Math.sin(idx) * 4,
    description: ['Sunny', 'Partly cloudy', 'Windy'][idx % 3],
  }));
}

export async function suggestPackingItems(destination: string) {
  await wait(150);
  const forecast = await getWeatherForecast(destination);
  const avgTemp = forecast.reduce((acc, day) => acc + day.temperatureC, 0) / forecast.length;
  const items = new Set<string>(['Passport', 'Travel adapter', 'Comfortable shoes']);
  if (avgTemp < 10) {
    items.add('Coat');
    items.add('Thermal socks');
  } else if (avgTemp > 24) {
    items.add('Sunblock');
    items.add('Lightweight clothing');
  }
  return Array.from(items);
}
