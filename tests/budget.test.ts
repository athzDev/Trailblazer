import { describe, expect, it } from 'vitest';
import { sumExpenses, remainingBudget, averagePerDay } from '@/lib/budget';

const expenses = [
  { id: '1', tripId: 't', title: 'Hotel', amountCents: 20000, currency: 'USD', category: 'lodging', date: new Date() },
  { id: '2', tripId: 't', title: 'Food', amountCents: 5000, currency: 'USD', category: 'food', date: new Date() },
] as any;

describe('budget utils', () => {
  it('sums expenses', () => {
    expect(sumExpenses(expenses)).toBe(25000);
  });

  it('calculates remaining budget', () => {
    expect(remainingBudget(40000, expenses)).toBe(15000);
  });

  it('handles missing budget', () => {
    expect(remainingBudget(null, expenses)).toBeNull();
  });

  it('calculates per day average', () => {
    expect(averagePerDay(40000, 4)).toBe(10000);
  });
});
