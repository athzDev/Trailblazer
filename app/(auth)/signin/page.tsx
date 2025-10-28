import { SignInForm } from '@/components/forms/sign-in-form';

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      <div className="w-full max-w-md rounded-3xl border border-border/40 bg-card/80 p-10 shadow-2xl shadow-black/30 backdrop-blur">
        <h1 className="text-2xl font-semibold">Sign in to Trailblazer</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your journeys sync across devices.</p>
        <SignInForm />
      </div>
    </main>
  );
}
