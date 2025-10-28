'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Place } from '@prisma/client';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';

interface SimpleMapProps {
  places: Place[];
}

export default function SimpleMap({ places }: SimpleMapProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    if (!mapboxgl.accessToken) {
      return;
    }
    const map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [places[0]?.lon ?? 2.3522, places[0]?.lat ?? 48.8566],
      zoom: 11,
    });
    places.forEach((place) => {
      const marker = document.createElement('div');
      marker.className = 'h-3 w-3 rounded-full bg-accent shadow-lg shadow-accent/50';
      new mapboxgl.Marker(marker).setLngLat([place.lon, place.lat]).addTo(map);
    });
    return () => {
      map.remove();
    };
  }, [places]);

  if (!mapboxgl.accessToken) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border/40 text-sm text-muted-foreground">
        Map preview unavailable. Add a Mapbox token to enable maps.
      </div>
    );
  }

  return <div ref={container} className="h-64 w-full rounded-2xl" />;
}
