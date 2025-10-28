import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sumExpenses } from '@/lib/budget';

export default async function ExpensesPage({ params }: { params: { id: string } }) {
  const trip = await prisma.trip.findUnique({
    where: { id: params.id },
    include: { expenses: true },
  });
  if (!trip) return notFound();

  const total = sumExpenses(trip.expenses);

  return (
    <main className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-primary/10 p-4">
            <p className="text-xs uppercase text-primary">Total spent</p>
            <p className="text-2xl font-semibold">{trip.currency} {(total / 100).toLocaleString()}</p>
          </div>
          <div className="grid gap-3">
            {trip.expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-3 py-2 text-sm">
                <div>
                  <p className="font-medium">{expense.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()} · {expense.category}</p>
                </div>
                <span>{trip.currency} {(expense.amountCents / 100).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
