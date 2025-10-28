import { featureFlags } from '@/lib/feature-flags';

export type FxRate = {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
};

const mockRates: FxRate = {
  base: 'USD',
  rates: {
    EUR: 0.92,
    JPY: 148.25,
    GBP: 0.8,
  },
  timestamp: Date.now(),
};

export async function getRates(base = 'USD'): Promise<FxRate> {
  if (!featureFlags.fx || !process.env.FX_API_KEY) {
    return mockRates;
  }
  try {
    const res = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.FX_API_KEY}&base=${base}`
    );
    if (!res.ok) throw new Error('Failed to fetch rates');
    const data = await res.json();
    return {
      base: data.base,
      rates: data.rates,
      timestamp: data.timestamp * 1000,
    };
  } catch (error) {
    console.warn('FX fallback', error);
    return mockRates;
  }
}
