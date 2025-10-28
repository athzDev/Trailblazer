import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitcher } from '@/components/layout/theme-switcher';

export default function SettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-16">
      <header>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">Personalize your experience.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Switch between light, dark, and accent hues.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeSwitcher />
        </CardContent>
      </Card>
    </main>
  );
}
