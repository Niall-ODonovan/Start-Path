export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {/* Decorative glow orbs */}
      <div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="text-center max-w-2xl animate-fade-in">
        {/* Overline */}
        <p className="text-xs font-medium tracking-widest uppercase mb-6" style={{ color: 'var(--color-text-tertiary)' }}>
          For young entrepreneurs
        </p>

        {/* Hero headline */}
        <h1
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          style={{
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em'
          }}
        >
          Start your path.
          <br />
          <span className="text-gradient">Build something real.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Stop planning. Start doing. A guided journey to launch your first business — with real decisions and real progress.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/auth/signup"
            className="btn btn-primary btn-lg btn-shine group"
            style={{ minWidth: '180px' }}
          >
            <span className="relative z-10">Get Started</span>
            <svg
              className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/auth/login"
            className="btn btn-secondary btn-lg"
            style={{ minWidth: '180px' }}
          >
            Sign in
          </a>
        </div>

        {/* Trust indicator */}
        <p
          className="mt-12 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Free to start. No credit card required.
        </p>
      </div>
    </div>
  );
}
