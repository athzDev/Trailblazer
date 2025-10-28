'use client';

import { Activity } from '@prisma/client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { m } from 'framer-motion';
import { toStringArray } from '@/lib/utils';

export function SortableActivityCard({ activity }: { activity: Activity }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: activity.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const tags = toStringArray(activity.tags);

  return (
    <m.div
      ref={setNodeRef}
      style={style}
      layout
      {...attributes}
      {...listeners}
      whileHover={{ scale: 1.02 }}
      className="cursor-grab rounded-2xl border border-border/40 bg-background/80 p-4 shadow-sm shadow-black/10 active:cursor-grabbing"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{activity.title}</p>
          {activity.start && (
            <p className="text-xs text-muted-foreground">
              {new Date(activity.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {activity.end
                ? ` – ${new Date(activity.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                : null}
            </p>
          )}
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">{tags[0] ?? 'Activity'}</span>
      </div>
      {isDragging && <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-primary" aria-hidden />}
    </m.div>
  );
}
