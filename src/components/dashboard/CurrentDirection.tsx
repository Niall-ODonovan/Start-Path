import Link from 'next/link'

interface CurrentDirectionProps {
  currentDirection: string | null
  hasDirection: boolean
}

export default function CurrentDirection({
  currentDirection,
  hasDirection,
}: CurrentDirectionProps) {
  if (!hasDirection) {
    return (
      <div
        className="card p-12 text-center animate-fade-in"
        style={{ background: 'var(--color-surface-1)' }}
      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
        >
          No direction chosen
        </h2>
        <p className="mb-8" style={{ color: 'var(--color-text-tertiary)' }}>
          Make your first decision.
        </p>
        <Link href="/orient" className="btn btn-primary btn-lg btn-shine">
          Begin
        </Link>
      </div>
    )
  }

  return (
    <div
      className="card glow-border-always p-12 text-center animate-fade-in"
      style={{
        background: 'linear-gradient(135deg, var(--color-surface-1) 0%, var(--color-surface-2) 100%)',
      }}
    >
      <p className="stat-label mb-3">Your path</p>
      <h1
        className="text-5xl font-bold"
        style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
      >
        {currentDirection}
      </h1>
    </div>
  )
}
