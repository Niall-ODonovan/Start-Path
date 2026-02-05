import AuthForm from '@/components/auth/AuthForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <a
            href="/"
            className="inline-block text-xs font-medium tracking-widest uppercase mb-6 transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Startpath
          </a>
          <h1
            className="text-3xl font-bold mb-3"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.025em' }}
          >
            Start your journey
          </h1>
          <p style={{ color: 'var(--color-text-tertiary)' }}>
            Create an account to begin
          </p>
        </div>

        {/* Auth form card */}
        <div
          className="card p-8 glow-border"
          style={{ borderRadius: 'var(--radius-xl)' }}
        >
          <AuthForm mode="signup" />
        </div>
      </div>
    </div>
  )
}
