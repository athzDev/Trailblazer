'use client';

import { useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof schema>;

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: '/app',
      });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Signed in');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <label className="block text-sm">
        Email
        <input
          {...register('email')}
          type="email"
          className="mt-1 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
      </label>
      <label className="block text-sm">
        Password
        <input
          {...register('password')}
          type="password"
          className="mt-1 w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.password && <span className="text-xs text-destructive">{errors.password.message}</span>}
      </label>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() =>
          signIn('google', {
            callbackUrl: '/app',
          })
        }
      >
        Continue with Google
      </Button>
    </form>
  );
}
