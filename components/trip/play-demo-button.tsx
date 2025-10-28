'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function PlayDemoButton() {
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        router.push('/share/demo');
      }}
    >
      Play demo
    </Button>
  );
}
