'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const accents = ['#12a3d8', '#ec4899', '#22c55e'];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle {theme === 'dark' ? 'light' : 'dark'}
      </Button>
      {accents.map((accent) => (
        <button
          key={accent}
          className="h-10 w-10 rounded-full border border-border"
          style={{ background: accent }}
          onClick={() => {
            document.documentElement.style.setProperty('--accent', accent);
          }}
          aria-label={`Set accent ${accent}`}
        />
      ))}
    </div>
  );
}
