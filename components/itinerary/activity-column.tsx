'use client';

import { Day, Activity } from '@prisma/client';
import { useMemo } from 'react';
import { SortableActivityCard } from '@/components/itinerary/sortable-activity-card';
import { Button } from '@/components/ui/button';

export function ActivityColumn({ day, isPending }: { day: Day & { activities: Activity[] }; isPending: boolean }) {
  const sorted = useMemo(() => [...day.activities].sort((a, b) => a.order - b.order), [day.activities]);

  return (
    <div className="space-y-3">
      {sorted.map((activity) => (
        <SortableActivityCard key={activity.id} activity={activity} />
      ))}
      <Button variant="ghost" className="w-full justify-center text-muted-foreground" disabled={isPending}>
        + Add activity
      </Button>
    </div>
  );
}
