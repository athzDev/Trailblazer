import { Activity } from '@prisma/client';

export function reorderActivities(
  activities: Activity[],
  fromIndex: number,
  toIndex: number
): Activity[] {
  if (fromIndex === toIndex) return activities;
  if (fromIndex < 0 || toIndex < 0) return activities;
  if (fromIndex >= activities.length || toIndex >= activities.length) return activities;
  const updated = [...activities];
  const [moved] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, moved);
  return updated.map((activity, index) => ({ ...activity, order: index }));
}
