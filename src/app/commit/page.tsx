'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { BusinessPath } from '@/lib/businessPaths'
import { BUSINESS_PATHS, rankPathsByFit } from '@/lib/businessPaths'

type Step =
  | 'loading'
  | 'choose_path'
  | 'confirm_path'
  | 'committing'

type EvaluationResults = {
  patience: number
  rejectionTolerance: number
  buildVsSell: number
  leverage: number
  rankedPaths: Array<{
    path: BusinessPath
    fitScore: number
    fitReason: string
  }>
}


export default function CommitPage() {
  const [step, setStep] = useState<Step>('loading')
  const [evaluationResults, setEvaluationResults] = useState<EvaluationResults | null>(null)
  const [selectedPath, setSelectedPath] = useState<BusinessPath | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadEvaluationResults = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: userState } = await supabase
        .from('user_state')
        .select('evaluation_data')
        .eq('user_id', user.id)
        .single()

      if (!userState?.evaluation_data) {
        router.push('/evaluate')
        return
      }

      // Reconstruct evaluation results from database
      const rankedPaths = rankPathsByFit(userState.evaluation_data)
      const results: EvaluationResults = {
        ...userState.evaluation_data,
        rankedPaths,
      }

      setEvaluationResults(results)
      setStep('choose_path')
    }

    loadEvaluationResults()
  }, [router, supabase])

  const viablePaths = evaluationResults?.rankedPaths.filter((rp) => rp.fitScore > 0.4) || []

  const handleChoosePath = (path: BusinessPath) => {
    setSelectedPath(path)
    setStep('confirm_path')
  }

  const handleConfirmPath = async () => {
    if (!selectedPath) return

    setStep('committing')

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      // Call the database function to initialize chapter progress
      const { error: initError } = await supabase.rpc('initialize_chapter_progress', {
        p_user_id: user.id,
        p_path_id: selectedPath.id,
      })

      if (initError) {
        console.error('Error initializing chapter progress:', initError)
        return
      }

      // Record this as a session outcome
      await supabase.from('session_outcomes').insert({
        user_id: user.id,
        what_changed: `Started ${selectedPath.name} path. Beginning with Chapter 1.`,
      })

      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 2500)
    } catch (error) {
      console.error('Error starting path:', error)
    }
  }


  if (step === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-accent)' }}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p style={{ color: 'var(--color-text-tertiary)' }}>Loading your results...</p>
        </div>
      </div>
    )
  }

  if (step === 'choose_path') {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="animate-fade-in mb-12">
            <p
              className="text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-accent)' }}
            >
              Step 3 of 3
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
            >
              Choose your path
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Based on your evaluation, these paths fit best. Each path has 6 chapters to work through.
            </p>
          </div>

          {/* Path cards */}
          <div className="space-y-4 stagger">
            {viablePaths.map((rp, index) => (
              <button
                key={rp.path.id}
                onClick={() => handleChoosePath(rp.path)}
                className="card card-interactive card-glow glow-border w-full text-left p-6"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
                  >
                    {rp.path.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar w-16 h-2">
                      <div
                        className="progress-fill"
                        style={{ width: `${rp.fitScore * 100}%` }}
                      />
                    </div>
                    <span className="badge badge-success">
                      {Math.round(rp.fitScore * 100)}% fit
                    </span>
                  </div>
                </div>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  {rp.path.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>Time to signal: </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{rp.path.timeToFirstSignal}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                  {rp.fitReason}
                </p>

                {/* Select indicator */}
                <div
                  className="mt-4 flex items-center gap-2 text-sm"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <span>Select this path</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === 'confirm_path' && selectedPath) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full animate-fade-in">
          {/* Back button */}
          <button
            onClick={() => setStep('choose_path')}
            className="btn btn-ghost mb-8"
            style={{ paddingLeft: 0 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all paths
          </button>

          {/* Header */}
          <div className="mb-8">
            <p
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Confirm your choice
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
            >
              {selectedPath.name}
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>{selectedPath.description}</p>
          </div>

          <div className="space-y-6">
            {/* What it involves */}
            <div className="card p-6">
              <h2 className="stat-label mb-3">What this actually involves</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{selectedPath.whatItInvolves}</p>
            </div>

            {/* Time and upside */}
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card">
                <p className="stat-label">Time to signal</p>
                <p className="stat-value text-xl">{selectedPath.timeToFirstSignal}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">Monthly Revenue</p>
                <p className="stat-value text-xl">{selectedPath.monthlyRevenue}</p>
              </div>
            </div>

            {/* Common failure mode */}
            <div
              className="card p-6"
              style={{
                background: 'var(--color-warning-subtle)',
                borderColor: 'rgba(245, 158, 11, 0.2)'
              }}
            >
              <h2 className="stat-label mb-3" style={{ color: 'var(--color-warning)' }}>
                Common failure mode
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>{selectedPath.commonFailureMode}</p>
            </div>

            {/* Bad fit */}
            <div
              className="card p-6"
              style={{
                background: 'var(--color-danger-subtle)',
                borderColor: 'rgba(239, 68, 68, 0.2)'
              }}
            >
              <h2 className="stat-label mb-3" style={{ color: 'var(--color-danger)' }}>
                This is a bad fit for
              </h2>
              <ul className="space-y-2">
                {selectedPath.badFitFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: 'var(--color-danger)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleConfirmPath}
            className="btn btn-primary btn-lg btn-shine w-full mt-10 animate-glow-pulse"
          >
            Start this path
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="text-center mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            This is an experiment, not a life sentence. You can always pivot.
          </p>
        </div>
      </div>
    )
  }

  if (step === 'committing') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-scale-in">
          {/* Success icon */}
          <div
            className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center ambient-glow"
            style={{ background: 'var(--color-accent)' }}
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
          >
            Path started.
          </h1>
          <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="text-gradient font-semibold">{selectedPath?.name}</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}> • Chapter 1 of 6</span>
          </p>

          {/* Loading indicator */}
          <div className="mt-12 flex items-center justify-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-sm">Setting up your journey...</span>
          </div>
        </div>
      </div>
    )
  }

  return null
}
