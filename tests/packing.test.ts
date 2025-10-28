import { describe, expect, it, vi } from 'vitest';
import * as weather from '@/lib/weather';

vi.spyOn(weather, 'getWeatherForecast').mockResolvedValue([
  { date: '2023-01-01', icon: '01d', temperatureC: 5, description: 'Cold' },
  { date: '2023-01-02', icon: '01d', temperatureC: 6, description: 'Cold' },
] as any);

describe('suggestPackingItems', () => {
  it('adds warm items for cold weather', async () => {
    const items = await weather.suggestPackingItems('Oslo');
    expect(items).toContain('Coat');
    expect(items).toContain('Thermal socks');
  });
});
