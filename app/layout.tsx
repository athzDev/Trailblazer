import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AppProviders } from '@/components/providers/app-providers';
import { MotionRoot } from '@/components/providers/motion-root';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trailblazer – Adventure ready itineraries',
  description:
    'Trailblazer helps you craft cinematic travel plans with collaborative itineraries, budgets, maps, and offline access.',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background text-foreground min-h-screen', inter.className)}>
        <ThemeProvider>
          <AppProviders>
            <MotionRoot>
              {children}
              <Toaster richColors position="top-right" />
            </MotionRoot>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
