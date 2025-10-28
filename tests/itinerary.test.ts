import { describe, expect, it } from 'vitest';
import { reorderActivities } from '@/lib/itinerary';

const activities = [
  { id: 'a', order: 0 },
  { id: 'b', order: 1 },
  { id: 'c', order: 2 },
] as any;

describe('reorderActivities', () => {
  it('reorders with new order indexes', () => {
    const result = reorderActivities(activities, 0, 2);
    expect(result.map((a) => a.id)).toEqual(['b', 'c', 'a']);
    expect(result.map((a) => a.order)).toEqual([0, 1, 2]);
  });

  it('returns original when indexes invalid', () => {
    expect(reorderActivities(activities, -1, 2)).toEqual(activities);
  });
});
