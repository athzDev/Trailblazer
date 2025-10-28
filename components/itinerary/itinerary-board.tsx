'use client';

import { Day, Trip, Activity } from '@prisma/client';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState, useTransition } from 'react';
import { ActivityColumn } from '@/components/itinerary/activity-column';
import { toast } from 'sonner';

interface ItineraryBoardProps {
  trip: Trip & { days: (Day & { activities: Activity[] })[] };
}

export function ItineraryBoard({ trip }: ItineraryBoardProps) {
  const [days, setDays] = useState(trip.days);
  const sensors = useSensors(useSensor(PointerSensor));
  const [isPending, startTransition] = useTransition();

  function handleDragEnd(event: DragEndEvent, day: Day & { activities: Activity[] }) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = day.activities.findIndex((a) => a.id === active.id);
    const toIndex = day.activities.findIndex((a) => a.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;

    setDays((prev) =>
      prev.map((d) =>
        d.id === day.id
          ? {
              ...d,
              activities: arrayMove(d.activities, fromIndex, toIndex).map((activity, index) => ({
                ...activity,
                order: index,
              })),
            }
          : d
      )
    );

    startTransition(async () => {
      try {
        await fetch(`/api/itinerary/${trip.id}/reorder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dayId: day.id,
            fromIndex,
            toIndex,
          }),
        });
        toast.success('Activity reordered');
      } catch (error) {
        console.error(error);
        toast.error('Failed to reorder');
      }
    });
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-6">
      {days.map((day) => (
        <div key={day.id} className="min-w-[320px] flex-1">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-muted-foreground">{new Date(day.date).toLocaleDateString()}</p>
              <h2 className="text-lg font-semibold">Day {trip.days.findIndex((d) => d.id === day.id) + 1}</h2>
            </div>
          </div>
          <DndContext
            id={day.id}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, day)}
          >
            <SortableContext items={day.activities.map((activity) => activity.id)} strategy={verticalListSortingStrategy}>
              <ActivityColumn day={day} isPending={isPending} />
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
}
