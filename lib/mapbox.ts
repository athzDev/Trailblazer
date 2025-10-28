import type { FeatureCollection, Feature } from 'geojson';

export async function searchPlaces(query: string): Promise<FeatureCollection> {
  if (!process.env.MAPBOX_TOKEN) {
    return mockPlaces(query);
  }
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.MAPBOX_TOKEN}`
  );
  if (!response.ok) {
    return mockPlaces(query);
  }
  return (await response.json()) as FeatureCollection;
}

function mockPlaces(query: string): FeatureCollection {
  const items: Feature[] = [
    {
      type: 'Feature',
      properties: { name: `${query} Central Station` },
      geometry: {
        type: 'Point',
        coordinates: [2.3522, 48.8566],
      },
    },
    {
      type: 'Feature',
      properties: { name: `${query} Riverside Cafe` },
      geometry: {
        type: 'Point',
        coordinates: [2.295, 48.8738],
      },
    },
  ];
  return { type: 'FeatureCollection', features: items };
}

export type DirectionsResult = {
  duration: number;
  distance: number;
};

export async function getDirections(
  from: [number, number],
  to: [number, number]
): Promise<DirectionsResult> {
  if (!process.env.MAPBOX_TOKEN) {
    return mockDirections(from, to);
  }
  const response = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${from.join(',')};${to.join(',')}?overview=full&access_token=${process.env.MAPBOX_TOKEN}`
  );
  if (!response.ok) {
    return mockDirections(from, to);
  }
  const data = await response.json();
  const route = data.routes?.[0];
  return {
    duration: route?.duration ?? 900,
    distance: route?.distance ?? 1200,
  };
}

function mockDirections(from: [number, number], to: [number, number]): DirectionsResult {
  const distance = Math.hypot(to[0] - from[0], to[1] - from[1]) * 111_000;
  const duration = (distance / 5_000) * 3600;
  return { distance, duration };
}
