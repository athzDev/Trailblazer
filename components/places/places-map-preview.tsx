import dynamic from 'next/dynamic';
import { Trip, Place } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MapPreview = dynamic(() => import('@/components/places/simple-map'), { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-2xl bg-muted" /> });

export function PlacesMapPreview({ trip }: { trip: Trip & { places: Place[] } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Places & routes</CardTitle>
      </CardHeader>
      <CardContent>
        <MapPreview places={trip.places} />
      </CardContent>
    </Card>
  );
}
