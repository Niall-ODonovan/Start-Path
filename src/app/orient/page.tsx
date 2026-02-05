'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { BUSINESS_PATHS } from '@/lib/businessPaths'

export default function OrientPage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [viewedPaths, setViewedPaths] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleViewPath = (pathId: string) => {
    setSelectedPath(pathId)
    setViewedPaths((prev) => new Set([...prev, pathId]))
  }

  const handleContinueToEvaluate = async () => {
    setLoading(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      await supabase
        .from('user_state')
        .update({ current_mode: 'evaluate' })
        .eq('user_id', user.id)

      router.push('/evaluate')
    } catch (error) {
      console.error('Error updating mode:', error)
      setLoading(false)
    }
  }

  const allPathsViewed = viewedPaths.size === BUSINESS_PATHS.length

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Step 1 of 3
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
          >
            Understand Your Options
          </h1>
          <p
            className="text-xl max-w-3xl leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Before committing to any path, you need to understand the real tradeoffs. Each path has
            different constraints, timelines, and failure modes.
          </p>

          {/* Progress indicator */}
          <div className="flex items-center gap-3 mt-8">
            <div className="progress-steps">
              {BUSINESS_PATHS.map((path, i) => (
                <div
                  key={path.id}
                  className={`progress-step ${
                    viewedPaths.has(path.id) ? 'progress-step-complete' : ''
                  }`}
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              {viewedPaths.size} of {BUSINESS_PATHS.length} reviewed
            </span>
          </div>
        </div>

        {/* Path Grid */}
        {!selectedPath ? (
          <div className="grid md:grid-cols-2 gap-6 stagger">
            {BUSINESS_PATHS.map((path, index) => (
              <button
                key={path.id}
                onClick={() => handleViewPath(path.id)}
                className={`card card-interactive card-glow glow-border text-left p-8 ${
                  viewedPaths.has(path.id) ? 'opacity-70' : ''
                }`}
                style={{
                  animationDelay: `${index * 75}ms`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
                  >
                    {path.name}
                  </h2>
                  {viewedPaths.has(path.id) && (
                    <span className="badge badge-success">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Read
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--color-text-secondary)' }}>{path.description}</p>

                {/* Hover hint */}
                <div
                  className="mt-4 flex items-center gap-2 text-sm transition-opacity"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* Path Detail View */}
            {BUSINESS_PATHS.filter((p) => p.id === selectedPath).map((path) => (
              <div key={path.id} className="max-w-4xl animate-fade-in">
                <button
                  onClick={() => setSelectedPath(null)}
                  className="btn btn-ghost mb-8"
                  style={{ paddingLeft: 0 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to all paths
                </button>

                <h1
                  className="text-4xl md:text-5xl font-bold mb-8"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
                >
                  {path.name}
                </h1>

                <div className="space-y-8">
                  {/* What it involves */}
                  <div className="card p-6">
                    <h3 className="stat-label mb-3">What This Actually Involves</h3>
                    <p
                      className="text-lg leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {path.whatItInvolves}
                    </p>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="stat-card">
                      <p className="stat-label">Time to First Signal</p>
                      <p className="stat-value text-2xl">{path.timeToFirstSignal}</p>
                    </div>
                    <div className="stat-card">
                      <p className="stat-label">Monthly Revenue</p>
                      <p className="stat-value text-2xl">{path.monthlyRevenue}</p>
                    </div>
                  </div>

                  {/* Failure mode */}
                  <div
                    className="card p-6"
                    style={{
                      background: 'var(--color-warning-subtle)',
                      borderColor: 'rgba(245, 158, 11, 0.2)'
                    }}
                  >
                    <h3 className="stat-label mb-3" style={{ color: 'var(--color-warning)' }}>
                      Common Failure Mode
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{path.commonFailureMode}</p>
                  </div>

                  {/* Bad fit */}
                  <div
                    className="card p-6"
                    style={{
                      background: 'var(--color-danger-subtle)',
                      borderColor: 'rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    <h3 className="stat-label mb-4" style={{ color: 'var(--color-danger)' }}>
                      This Path Is a Bad Fit For
                    </h3>
                    <ul className="space-y-3">
                      {path.badFitFor.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{ color: 'var(--color-danger)' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button onClick={() => setSelectedPath(null)} className="btn btn-secondary">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to all paths
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Continue Button */}
        {!selectedPath && allPathsViewed && (
          <div
            className="mt-12 pt-12 animate-fade-in"
            style={{ borderTop: '1px solid var(--color-border-subtle)' }}
          >
            <div
              className="card p-8 glow-border-always"
              style={{
                background: 'linear-gradient(135deg, var(--color-surface-1) 0%, var(--color-surface-2) 100%)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-success-subtle)' }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: 'var(--color-success)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  All paths reviewed
                </h3>
              </div>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                You&apos;ve reviewed all {BUSINESS_PATHS.length} paths. Next, we&apos;ll evaluate which
                paths fit your current constraints and situation.
              </p>
              <button
                onClick={handleContinueToEvaluate}
                disabled={loading}
                className="btn btn-primary btn-lg btn-shine"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <>
                    Continue to evaluation
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
