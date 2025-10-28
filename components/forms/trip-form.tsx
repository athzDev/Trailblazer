'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTripSchema, type CreateTripInput } from '@/lib/validations/trip';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function TripForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripInput>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      destination: ['Paris'],
      currency: 'USD',
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: CreateTripInput) => {
    const payload: CreateTripInput = {
      ...values,
      destination: values.destination.filter((item) => item && item.length > 0),
    };

    startTransition(async () => {
      try {
        const res = await fetch('/api/trips', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          toast.error('Failed to create trip');
          return;
        }
        const trip = await res.json();
        toast.success('Trip created');
        router.push(`/app/trips/${trip.id}/overview`);
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm">Title</label>
        <input
          {...register('title')}
          className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>
      <div>
        <label className="block text-sm">Destination</label>
        <input
          {...register('destination.0')}
          className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.destination && <p className="text-xs text-destructive">{errors.destination.message}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Start date
          <input
            type="date"
            {...register('start')}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block text-sm">
          End date
          <input
            type="date"
            {...register('end')}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          Travelers
          <input
            type="number"
            {...register('travelers')}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block text-sm">
          Budget (cents)
          <input
            type="number"
            {...register('budgetCents')}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block text-sm">
          Currency
          <input
            {...register('currency')}
            className="mt-1 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating…' : 'Create trip'}
      </Button>
    </form>
  );
}
