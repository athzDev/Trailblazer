import { Trip, Expense } from '@prisma/client';
import { sumExpenses, remainingBudget, averagePerDay } from '@/lib/budget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BudgetSummaryProps {
  trip: Trip & { expenses: Expense[] };
}

export function BudgetSummary({ trip }: BudgetSummaryProps) {
  const total = sumExpenses(trip.expenses);
  const remaining = remainingBudget(trip.budgetCents, trip.expenses);
  const perDay = averagePerDay(trip.budgetCents, Math.max(1, trip.expenses.length));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Budget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl bg-primary/10 p-4">
          <p className="text-xs uppercase tracking-wide text-primary">Total spent</p>
          <p className="mt-2 text-2xl font-semibold">
            {trip.currency} {(total / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="grid gap-3">
          <BudgetRow label="Budget" value={trip.budgetCents ? `${trip.currency} ${(trip.budgetCents / 100).toLocaleString()}` : 'Flexible'} />
          <BudgetRow label="Remaining" value={remaining != null ? `${trip.currency} ${(remaining / 100).toLocaleString()}` : '—'} />
          <BudgetRow label="Per day" value={perDay != null ? `${trip.currency} ${(perDay / 100).toLocaleString()}` : '—'} />
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/30 bg-background/40 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
