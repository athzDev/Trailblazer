import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { DashboardOverview } from '@/components/trip/dashboard-overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AppHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back, traveler</h1>
          <p className="text-muted-foreground">Craft your next getaway with tailored insights.</p>
        </div>
        <Button asChild>
          <Link href="/app/trips/new">Start a trip</Link>
        </Button>
      </header>
      <Suspense fallback={<Card className="animate-pulse">Loading dashboard…</Card>}>
        <DashboardOverview />
      </Suspense>
      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link href="/app/trips">View trips</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/settings">Customize theme</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
