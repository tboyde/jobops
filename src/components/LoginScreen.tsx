import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <main className="min-h-screen bg-ink text-fg flex items-center justify-center p-6">
      <section className="w-full max-w-md">
        {/* Logo sits just above the card */}
        <div className="-mb-2 flex justify-center">
          {!logoFailed ? (
            <img
              src="/job-ops-logo.png"
              alt="JobOps"
              className="h-64 w-auto drop-shadow-[0_18px_40px_rgba(183,255,60,0.08)]"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <h1 className="font-display text-6xl font-black tracking-tight text-fg">
              Job<span className="text-neon">Ops</span>
            </h1>
          )}
        </div>

        {/* Card */}
        <div className="rounded-modal border border-edge bg-panel p-8 shadow-lift">
          <h2 className="font-display text-xl font-bold text-fg">Welcome back.</h2>
          <p className="mt-2 text-sm text-muted">
            Private access only. Connect Supabase Auth or your Kotlin backend to restrict login to your email.
          </p>

          <button
            onClick={onLogin}
            className="mt-8 w-full rounded-btn bg-neon px-4 py-3.5 font-semibold text-[#111] hover:bg-neon-hover transition-colors duration-200"
          >
            Enter Command Center
          </button>
        </div>

      </section>
    </main>
  );
}
