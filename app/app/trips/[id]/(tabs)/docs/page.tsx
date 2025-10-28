import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocsPage() {
  return (
    <main className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Documents vault</CardTitle>
          <CardDescription>Upload confirmations, tickets, and more. (Stubbed for demo)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-dashed border-border/40 p-12 text-center text-sm text-muted-foreground">
            Uploads require configuration. Add an UPLOAD provider to enable this feature.
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
