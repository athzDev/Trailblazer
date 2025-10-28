import { Expense } from '@prisma/client';

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amountCents, 0);
}

export function remainingBudget(
  budgetCents: number | null | undefined,
  expenses: Expense[]
): number | null {
  if (!budgetCents) return null;
  return budgetCents - sumExpenses(expenses);
}

export function averagePerDay(budgetCents: number | null | undefined, days: number): number | null {
  if (!budgetCents || days <= 0) return null;
  return Math.round(budgetCents / days);
}
