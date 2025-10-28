import { TripForm } from '@/components/forms/trip-form';

export default function NewTripPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold">Create a trip</h1>
        <p className="text-sm text-muted-foreground">Set the scene for your next adventure.</p>
      </header>
      <TripForm />
    </main>
  );
}
