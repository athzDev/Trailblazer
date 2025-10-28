import { z } from 'zod';

export const activitySchema = z.object({
  title: z.string().min(1),
  start: z.string().datetime().nullable().optional(),
  end: z.string().datetime().nullable().optional(),
  placeId: z.string().optional(),
  costCents: z.coerce.number().min(0).optional(),
  notes: z.string().max(1_000).optional(),
  tags: z.array(z.string()).default([]),
});

export type ActivityInput = z.infer<typeof activitySchema>;
