import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { TripTabs } from '@/components/trip/trip-tabs';

export default function TripLayout({ children, params }: { children: ReactNode; params: { id: string } }) {
  if (!params.id) return notFound();
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <TripTabs tripId={params.id} />
      <div>{children}</div>
    </main>
  );
}
