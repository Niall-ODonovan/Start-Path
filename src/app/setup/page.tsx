'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { BusinessProfile } from '@/lib/types'

type Step =
  | 'name'
  | 'who_for'
  | 'problem'
  | 'solution'
  | 'where_find'
  | 'time_money'
  | 'skills'
  | 'success'
  | 'complete'

const STEPS: Step[] = [
  'name',
  'who_for',
  'problem',
  'solution',
  'where_find',
  'time_money',
  'skills',
  'success',
]

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<Step>('name')
  const [profile, setProfile] = useState<Partial<BusinessProfile>>({
    existing_skills: [],
    missing_skills: [],
  })
  const [showHelp, setShowHelp] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data } = await supabase
        .from('business_profile')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveAndContinue = async () => {
    setSaving(true)
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      await supabase
        .from('business_profile')
        .update({
          business_name: profile.business_name,
          business_type: profile.business_type,
          target_customer: profile.target_customer,
          where_to_reach_them: profile.where_to_reach_them,
          current_alternative: profile.current_alternative,
          problem_to_solve: profile.problem_to_solve,
          what_offering: profile.what_offering,
          quit_criteria: profile.quit_criteria,
          time_per_week: profile.time_per_week,
          money_available: profile.money_available,
          existing_skills: profile.existing_skills || [],
          missing_skills: profile.missing_skills || [],
          success_in_30_days: profile.success_in_30_days,
          failure_signal: profile.failure_signal,
        })
        .eq('user_id', user.id)

      const currentIndex = STEPS.indexOf(currentStep)
      if (currentIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentIndex + 1])
      } else {
        setCurrentStep('complete')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setSaving(false)
    }
  }

  const goBack = () => {
    const currentIndex = STEPS.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1])
    }
  }

  const getHelpContent = () => {
    const helpContent: Record<Step, { title: string; tips: string[] }> = {
      name: {
        title: 'Picking a name',
        tips: [
          'Does not need to be perfect - you can change it later',
          'Just pick something you can call it when talking to people',
          'Examples: "Dog walking service", "My cleaning business", "Tutoring for high school math"',
        ],
      },
      who_for: {
        title: 'Who is this for?',
        tips: [
          'Be specific - "parents" is too broad, "parents with toddlers who work from home" is better',
          'Think about the last person you talked to who had this problem',
          'If you cannot name a specific person, you might not know who this is for yet',
        ],
      },
      problem: {
        title: 'What problem does this solve?',
        tips: [
          'Describe it like you would explain it to a friend',
          'What frustrates these people? What do they complain about?',
          'If they do not have this problem, they will not pay for your solution',
        ],
      },
      solution: {
        title: 'What are you offering?',
        tips: [
          'Describe what you will actually do or give them',
          'Be concrete - "I will walk their dog 3 times per week" not "I provide pet care solutions"',
          'What will they have at the end that they do not have now?',
        ],
      },
      where_find: {
        title: 'Where can you find these people?',
        tips: [
          'Where do they already hang out online?',
          'Facebook groups? Local community pages? Specific websites?',
          'Where do they go when they have this problem?',
        ],
      },
      time_money: {
        title: 'Time and money available',
        tips: [
          'Be honest - this affects what you can actually do',
          'If you have 5 hours per week, do not plan something that needs 40',
          'If you have no money, pick something that does not need paid advertising',
        ],
      },
      skills: {
        title: 'What you can and cannot do',
        tips: [
          'List things you already know how to do that might be useful',
          'List things you will need to learn but do not know yet',
          'You do not need every skill to start - just know what you are missing',
        ],
      },
      success: {
        title: 'What success looks like',
        tips: [
          'Pick something you can count in 30 days',
          'Be specific - "3 people paying me" not "some interest"',
          'Also decide what would mean it is NOT working and you should stop',
        ],
      },
      complete: { title: '', tips: [] },
    }

    return helpContent[currentStep]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
          />
          <p style={{ color: 'var(--color-text-tertiary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-scale-in">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center ambient-glow"
            style={{ background: 'var(--color-success-subtle)' }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: 'var(--color-success)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1
            className="text-5xl font-bold mb-6"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
          >
            Profile complete
          </h1>
          <p
            className="text-xl mb-12"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            You can now see what you are building and start running experiments.
          </p>
          <button onClick={() => router.push('/dashboard')} className="btn btn-primary btn-lg btn-shine">
            Go to dashboard
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  const stepIndex = STEPS.indexOf(currentStep)
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              Step {stepIndex + 1} of {STEPS.length}
            </p>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-sm transition-colors"
              style={{ color: showHelp ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
            >
              {showHelp ? 'Hide help' : 'Need help?'}
            </button>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Help Panel */}
        {showHelp && (
          <div
            className="mb-8 card p-6 animate-fade-in"
            style={{
              background: 'var(--color-accent-subtle)',
              borderColor: 'rgba(59, 130, 246, 0.2)',
            }}
          >
            <h3
              className="text-lg font-bold mb-3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {getHelpContent().title}
            </h3>
            <ul className="space-y-2">
              {getHelpContent().tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: 'var(--color-accent)' }} className="mt-1">
                    •
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step Content */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '50ms' }}>
          {currentStep === 'name' && (
            <div>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
              >
                What do you call this?
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Pick a working name. You can change it later.
              </p>
              <input
                type="text"
                value={profile.business_name || ''}
                onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
                placeholder="e.g., Dog walking service"
                className="input text-xl"
                style={{ padding: '1rem' }}
                autoFocus
              />
            </div>
          )}

          {currentStep === 'who_for' && (
            <div>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
              >
                Who is this for?
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Be specific. Who exactly has this problem?
              </p>
              <textarea
                value={profile.target_customer || ''}
                onChange={(e) => setProfile({ ...profile, target_customer: e.target.value })}
                placeholder="e.g., Busy parents who need help with household chores"
                rows={4}
                className="input"
                style={{ minHeight: '120px', resize: 'vertical' }}
                autoFocus
              />
            </div>
          )}

          {currentStep === 'problem' && (
            <div>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
              >
                What problem does this solve?
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                What frustrates them? What do they complain about?
              </p>
              <textarea
                value={profile.problem_to_solve || ''}
                onChange={(e) => setProfile({ ...profile, problem_to_solve: e.target.value })}
                placeholder="e.g., They are too busy with work to walk their dog regularly"
                rows={4}
                className="input"
                style={{ minHeight: '120px', resize: 'vertical' }}
                autoFocus
              />
            </div>
          )}

          {currentStep === 'solution' && (
            <div>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
              >
                What are you offering?
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                What will you actually do or give them?
              </p>
              <textarea
                value={profile.what_offering || ''}
                onChange={(e) => setProfile({ ...profile, what_offering: e.target.value })}
                placeholder="e.g., I will walk their dog 3 times per week for a monthly fee"
                rows={4}
                className="input"
                style={{ minHeight: '120px', resize: 'vertical' }}
                autoFocus
              />
            </div>
          )}

          {currentStep === 'where_find' && (
            <div>
              <h1
                className="text-4xl font-bold mb-4"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
              >
                Where can you find these people?
              </h1>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                Where do they hang out online?
              </p>
              <textarea
                value={profile.where_to_reach_them || ''}
                onChange={(e) => setProfile({ ...profile, where_to_reach_them: e.target.value })}
                placeholder="e.g., Local parent Facebook groups, neighborhood forums, school pickup"
                rows={4}
                className="input"
                style={{ minHeight: '120px', resize: 'vertical' }}
                autoFocus
              />
            </div>
          )}

          {currentStep === 'time_money' && (
            <div className="space-y-8">
              <div>
                <h1
                  className="text-4xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
                >
                  How much time do you have?
                </h1>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Hours per week you can actually work on this
                </p>
                <input
                  type="text"
                  value={profile.time_per_week || ''}
                  onChange={(e) => setProfile({ ...profile, time_per_week: e.target.value })}
                  placeholder="e.g., 10-15 hours per week"
                  className="input"
                  autoFocus
                />
              </div>

              <div>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
                >
                  How much money can you spend?
                </h2>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Monthly budget for tools, ads, etc.
                </p>
                <input
                  type="text"
                  value={profile.money_available || ''}
                  onChange={(e) => setProfile({ ...profile, money_available: e.target.value })}
                  placeholder="e.g., $500/month or $0 (bootstrapping)"
                  className="input"
                />
              </div>
            </div>
          )}

          {currentStep === 'skills' && (
            <div className="space-y-8">
              <div>
                <h1
                  className="text-4xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
                >
                  What can you already do?
                </h1>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Skills you have (comma separated)
                </p>
                <input
                  type="text"
                  value={profile.existing_skills?.join(', ') || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      existing_skills: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="e.g., Writing, design, coding"
                  className="input"
                  autoFocus
                />
              </div>

              <div>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
                >
                  What do you need to learn?
                </h2>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Skills you will need but do not have (comma separated)
                </p>
                <input
                  type="text"
                  value={profile.missing_skills?.join(', ') || ''}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      missing_skills: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="e.g., Marketing, video editing, sales"
                  className="input"
                />
              </div>
            </div>
          )}

          {currentStep === 'success' && (
            <div className="space-y-8">
              <div>
                <h1
                  className="text-4xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}
                >
                  What would success look like?
                </h1>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  In 30 days, what would show this is working?
                </p>
                <textarea
                  value={profile.success_in_30_days || ''}
                  onChange={(e) => setProfile({ ...profile, success_in_30_days: e.target.value })}
                  placeholder="e.g., 3 people paying me to walk their dogs regularly"
                  rows={3}
                  className="input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  autoFocus
                />
              </div>

              <div>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
                >
                  What would mean it is NOT working?
                </h2>
                <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  What result would make you stop?
                </p>
                <textarea
                  value={profile.failure_signal || ''}
                  onChange={(e) => setProfile({ ...profile, failure_signal: e.target.value })}
                  placeholder="e.g., Asked 50+ people, nobody wants to pay for it"
                  rows={3}
                  className="input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {stepIndex > 0 && (
            <button onClick={goBack} className="btn btn-secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <button
            onClick={saveAndContinue}
            disabled={saving}
            className="flex-1 btn btn-primary btn-lg btn-shine"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : stepIndex === STEPS.length - 1 ? (
              <>
                Complete setup
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : (
              <>
                Continue
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
