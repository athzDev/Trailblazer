import { z } from 'zod';

const optionalPositiveInt = z
  .union([z.coerce.number().int().min(1), z.literal('')])
  .optional()
  .transform((value) => {
    if (value === '' || value === undefined) return undefined;
    return value;
  });

const optionalCurrencyCents = z
  .union([z.coerce.number().min(0), z.literal('')])
  .optional()
  .transform((value) => {
    if (value === '' || value === undefined) return undefined;
    return value;
  });

export const createTripSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  destination: z.array(z.string()).min(1, 'Destination required'),
  start: z.coerce.date(),
  end: z.coerce.date(),
  travelers: optionalPositiveInt,
  budgetCents: optionalCurrencyCents,
  currency: z.string().min(3).max(3).default('USD'),
  notes: z.string().optional(),
  coverUrl: z.string().url().optional(),
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
