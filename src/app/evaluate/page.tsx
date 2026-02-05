'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { rankPathsByFit } from '@/lib/businessPaths'

type Question = {
  id: string
  text: string
  dimension: 'patience' | 'rejectionTolerance' | 'buildVsSell' | 'leverage'
  options: Array<{ label: string; value: number }>
}

const QUESTIONS: Question[] = [
  {
    id: 'revenue_timeline',
    text: 'How soon do you need revenue?',
    dimension: 'patience',
    options: [
      { label: 'Within 30 days. Bills are due.', value: -1 },
      { label: 'Within 3 months. I have some savings.', value: -0.5 },
      { label: 'Within 6-12 months. I can wait.', value: 0.5 },
      { label: '12+ months is fine. I can wait a long time.', value: 1 },
    ],
  },
  {
    id: 'feedback_preference',
    text: 'How do you prefer to learn if something is working?',
    dimension: 'patience',
    options: [
      { label: 'I need to know within days or I lose focus.', value: -1 },
      { label: 'A few weeks is tolerable.', value: -0.3 },
      { label: 'I can wait months if the upside is worth it.', value: 0.7 },
      { label: 'I can commit to 6-12 months before seeing results.', value: 1 },
    ],
  },
  {
    id: 'rejection_handling',
    text: 'How do you handle rejection and hearing "no"?',
    dimension: 'rejectionTolerance',
    options: [
      { label: 'I take it personally and lose momentum.', value: -1 },
      { label: 'I can handle some, but it drains me.', value: -0.3 },
      { label: 'I treat it as data, not personal.', value: 0.6 },
      { label: 'I thrive on it. More nos = closer to yes.', value: 1 },
    ],
  },
  {
    id: 'sales_comfort',
    text: 'How comfortable are you with direct sales and client conversations?',
    dimension: 'rejectionTolerance',
    options: [
      { label: 'I avoid it at all costs.', value: -1 },
      { label: 'I can do it, but I dread it.', value: -0.4 },
      { label: 'Neutral. It is part of the job.', value: 0.5 },
      { label: 'I enjoy it. I like talking to people.', value: 1 },
    ],
  },
  {
    id: 'work_preference',
    text: 'What kind of work gives you energy?',
    dimension: 'buildVsSell',
    options: [
      { label: 'Talking to people, closing deals, managing relationships.', value: -1 },
      { label: 'A mix, but I lean toward people work.', value: -0.4 },
      { label: 'A mix, but I lean toward building things.', value: 0.4 },
      { label: 'Building, creating, solving technical problems alone.', value: 1 },
    ],
  },
  {
    id: 'scaling_model',
    text: 'How important is it that your work scales non-linearly?',
    dimension: 'leverage',
    options: [
      { label: 'Not important. I am fine trading time for money.', value: -1 },
      { label: 'Somewhat important, but cash flow is priority.', value: -0.3 },
      { label: 'Important. I want leverage eventually.', value: 0.6 },
      { label: 'Critical. I will not build anything that does not scale.', value: 1 },
    ],
  },
]

export default function EvaluatePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAnswer = (value: number) => {
    const question = QUESTIONS[currentQuestion]
    setAnswers((prev) => ({ ...prev, [question.id]: value }))

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (showResults) {
    // Calculate average scores per dimension
    const patience =
      QUESTIONS.filter((q) => q.dimension === 'patience')
        .map((q) => answers[q.id])
        .reduce((a, b) => a + b, 0) / 2

    const rejectionTolerance =
      QUESTIONS.filter((q) => q.dimension === 'rejectionTolerance')
        .map((q) => answers[q.id])
        .reduce((a, b) => a + b, 0) / 2

    const buildVsSell = answers['work_preference'] || 0
    const leverage = answers['scaling_model'] || 0

    const rankedPaths = rankPathsByFit({
      patience,
      rejectionTolerance,
      buildVsSell,
      leverage,
    })

    const viablePaths = rankedPaths.filter((rp) => rp.fitScore > 0.4)
    const poorFitPaths = rankedPaths.filter((rp) => rp.fitScore <= 0.4)

    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="animate-fade-in mb-12">
            <p
              className="text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: 'var(--color-success)' }}
            >
              Evaluation Complete
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
            >
              Your Results
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Based on your answers, here&apos;s how each path fits your constraints.
            </p>
          </div>

          {/* Viable Paths */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-success-subtle)' }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ color: 'var(--color-success)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Viable Paths ({viablePaths.length})
              </h2>
            </div>
            <p className="mb-8" style={{ color: 'var(--color-text-tertiary)' }}>
              Based on your constraints, these paths are workable starting points.
            </p>
            <div className="space-y-4 stagger">
              {viablePaths.map((rp, index) => (
                <div
                  key={rp.path.id}
                  className="card card-glow glow-border p-6"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-xl font-bold"
                      style={{ color: 'var(--color-text-primary)' }}
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
                      <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                        {Math.round(rp.fitScore * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    {rp.path.description}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                    {rp.fitReason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Poor Fit Paths */}
          {poorFitPaths.length > 0 && (
            <div className="mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-danger-subtle)' }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Poor Fit Right Now ({poorFitPaths.length})
                </h2>
              </div>
              <p className="mb-8" style={{ color: 'var(--color-text-tertiary)' }}>
                These paths misalign with your current constraints. Not impossible, but harder.
              </p>
              <div className="space-y-3">
                {poorFitPaths.map((rp) => (
                  <div
                    key={rp.path.id}
                    className="card p-4"
                    style={{
                      background: 'var(--color-danger-subtle)',
                      borderColor: 'rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold" style={{ color: 'var(--color-danger)' }}>
                        {rp.path.name}
                      </h3>
                      <span className="text-xs" style={{ color: 'var(--color-danger)' }}>
                        {Math.round(rp.fitScore * 100)}% fit
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                      {rp.fitReason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Step */}
          <div
            className="pt-12 animate-fade-in"
            style={{
              borderTop: '1px solid var(--color-border-subtle)',
              animationDelay: '300ms'
            }}
          >
            <div
              className="card p-8 glow-border-always"
              style={{
                background: 'linear-gradient(135deg, var(--color-surface-1) 0%, var(--color-surface-2) 100%)'
              }}
            >
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Ready to choose?
              </h3>
              <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                Next: Choose ONE viable path to test for 14-30 days. This is an experiment, not a life sentence.
              </p>
              <button
                onClick={async () => {
                  setLoading(true)
                  try {
                    const {
                      data: { user },
                    } = await supabase.auth.getUser()

                    if (!user) {
                      router.push('/auth/login')
                      return
                    }

                    const evaluationData = {
                      patience,
                      rejectionTolerance,
                      buildVsSell,
                      leverage,
                    }

                    // Store in database
                    await supabase
                      .from('user_state')
                      .update({
                        current_mode: 'commit',
                        evaluation_data: evaluationData,
                      })
                      .eq('user_id', user.id)

                    router.push('/commit')
                  } catch (error) {
                    console.error('Error saving evaluation:', error)
                    setLoading(false)
                  }
                }}
                disabled={loading}
                className="btn btn-primary btn-lg btn-shine"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    Continue to commitment
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Question Flow
  const question = QUESTIONS[currentQuestion]

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full animate-fade-in">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: 'var(--color-accent)' }}
            >
              Step 2 of 3
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </p>
          </div>
          <div className="progress-bar h-1">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-12 leading-tight"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
        >
          {question.text}
        </h1>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="card card-interactive card-glow glow-border w-full text-left p-5 group"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium transition-colors"
                  style={{
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-text-tertiary)'
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <p
                  className="text-lg transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {option.label}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Back button */}
        {currentQuestion > 0 && (
          <button onClick={handleBack} className="btn btn-ghost" style={{ paddingLeft: 0 }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous question
          </button>
        )}
      </div>
    </div>
  )
}
