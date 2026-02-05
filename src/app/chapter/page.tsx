'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getChapter, type Chapter } from '@/lib/chapters'

interface CurrentChapterData {
  chapter_id: string
  chapter_sequence: number
  path_id: string
  outputs: Record<string, any>
  completed: boolean
}

export default function ChapterPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentChapterData, setCurrentChapterData] = useState<CurrentChapterData | null>(null)
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [outputs, setOutputs] = useState<Record<string, any>>({})
  const [walkthroughOpen, setWalkthroughOpen] = useState(true)
  const [openFieldGuides, setOpenFieldGuides] = useState<Record<string, boolean>>({})
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadCurrentChapter()
  }, [])

  const loadCurrentChapter = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      // Call the database function to get current chapter
      const { data, error } = await supabase.rpc('get_current_chapter', {
        p_user_id: user.id,
      })

      if (error) {
        console.error('Error loading chapter:', error)
        router.push('/dashboard')
        return
      }

      if (!data || (Array.isArray(data) && data.length === 0)) {
        console.error('No chapter data found')
        router.push('/dashboard')
        return
      }

      const chapterData = data[0] as CurrentChapterData
      setCurrentChapterData(chapterData)

      // Get chapter definition
      const chapterDef = getChapter(chapterData.chapter_id)
      if (!chapterDef) {
        console.error('Chapter definition not found:', chapterData.chapter_id)
        router.push('/dashboard')
        return
      }

      setChapter(chapterDef)

      // Initialize outputs with existing data or empty values
      const initialOutputs: Record<string, any> = {}
      chapterDef.requiredOutputs.forEach((field) => {
        initialOutputs[field.fieldName] = chapterData.outputs[field.fieldName] || ''
      })
      setOutputs(initialOutputs)
    } catch (error) {
      console.error('Error:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateOutput = (key: string, value: any) => {
    setOutputs((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFieldGuide = (fieldName: string) => {
    setOpenFieldGuides((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }))
  }

  const handleComplete = async () => {
    if (!currentChapterData || !chapter) return

    // Validate all required fields are filled
    const missingFields = chapter.requiredOutputs.filter(
      (field) => !outputs[field.fieldName] || outputs[field.fieldName].trim() === ''
    )

    if (missingFields.length > 0) {
      setError('Please fill in all fields before completing this chapter.')
      return
    }

    setError(null)

    setSaving(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      // Call complete_chapter function
      const { data, error } = await supabase.rpc('complete_chapter', {
        p_user_id: user.id,
        p_chapter_id: currentChapterData.chapter_id,
        p_outputs: outputs,
      })

      if (error) {
        console.error('Error completing chapter:', error)
        setError('Error completing chapter. Please try again.')
        return
      }

      // Check if path is completed
      if (data === 'PATH_COMPLETED') {
        router.push('/dashboard?path_completed=true')
      } else {
        // Move to next chapter
        router.push('/dashboard?chapter_completed=true')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error completing chapter. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-5 h-5" style={{ color: 'var(--color-accent)' }} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p style={{ color: 'var(--color-text-tertiary)' }}>Loading chapter...</p>
        </div>
      </div>
    )
  }

  if (!chapter || !currentChapterData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--color-text-tertiary)' }}>Chapter not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          {/* Back to dashboard */}
          <button
            onClick={() => router.push('/dashboard')}
            className="btn btn-ghost mb-6"
            style={{ paddingLeft: 0 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </button>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="flex-1 h-1.5 rounded-full transition-all"
                style={{
                  background:
                    num < currentChapterData.chapter_sequence
                      ? 'var(--color-success)'
                      : num === currentChapterData.chapter_sequence
                        ? 'var(--color-accent)'
                        : 'var(--color-surface-3)',
                  boxShadow:
                    num === currentChapterData.chapter_sequence
                      ? 'var(--shadow-glow-sm)'
                      : 'none'
                }}
              />
            ))}
          </div>

          <p
            className="text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: 'var(--color-accent)' }}
          >
            Chapter {currentChapterData.chapter_sequence} of 6
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            {chapter.title}
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            {chapter.description}
          </p>

          {/* What this achieves */}
          <div className="card p-6">
            <h2 className="stat-label mb-3">What this chapter achieves</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>{chapter.whatThisAchieves}</p>
          </div>
        </div>

        {/* HOW-TO Walkthrough */}
        {chapter.howTo && (
          <div
            className="mb-8 rounded-xl overflow-hidden animate-fade-in"
            style={{
              background: 'var(--color-warning-subtle)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              animationDelay: '100ms'
            }}
          >
            <button
              onClick={() => setWalkthroughOpen(!walkthroughOpen)}
              className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                >
                  <svg className="w-4 h-4" style={{ color: 'var(--color-warning)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="font-medium" style={{ color: 'var(--color-warning)' }}>
                  How to do this
                </span>
              </div>
              <svg
                className="w-5 h-5 transition-transform"
                style={{
                  color: 'var(--color-warning)',
                  transform: walkthroughOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {walkthroughOpen && (
              <div className="px-6 pb-6 space-y-6">
                {/* Intro */}
                <p style={{ color: 'var(--color-text-secondary)' }}>{chapter.howTo.intro}</p>

                {/* Steps */}
                <div className="space-y-5">
                  {chapter.howTo.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium"
                        style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-warning)' }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
                          {step.title}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                          {step.body}
                        </p>
                        {step.tip && (
                          <div
                            className="mt-3 pl-4"
                            style={{ borderLeft: '2px solid rgba(245, 158, 11, 0.3)' }}
                          >
                            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                              {step.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Common mistakes */}
                {chapter.howTo.commonMistakes && chapter.howTo.commonMistakes.length > 0 && (
                  <div
                    className="pt-5"
                    style={{ borderTop: '1px solid rgba(245, 158, 11, 0.2)' }}
                  >
                    <h3 className="stat-label mb-3" style={{ color: 'var(--color-warning)' }}>
                      Common mistakes
                    </h3>
                    <ul className="space-y-2">
                      {chapter.howTo.commonMistakes.map((mistake, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-warning)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Completion criteria */}
        <div
          className="mb-12 rounded-xl p-6 animate-fade-in"
          style={{
            background: 'var(--color-success-subtle)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            animationDelay: '150ms'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(16, 185, 129, 0.2)' }}
            >
              <svg className="w-4 h-4" style={{ color: 'var(--color-success)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-medium" style={{ color: 'var(--color-success)' }}>Done when</h2>
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }}>{chapter.completionCriteria}</p>
        </div>

        {/* Output fields */}
        <div className="space-y-8 mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          {chapter.requiredOutputs.map((field, index) => (
            <div key={field.fieldName} className="card p-6">
              <label
                className="block text-lg font-semibold mb-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {field.label}
              </label>
              {field.helpText && (
                <p className="text-sm mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
                  {field.helpText}
                </p>
              )}

              {/* Per-field guidance toggle */}
              {field.howToFill && (
                <div className="mb-4">
                  <button
                    onClick={() => toggleFieldGuide(field.fieldName)}
                    className="flex items-center gap-2 text-sm font-medium transition-colors"
                    style={{ color: 'var(--color-warning)' }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    {openFieldGuides[field.fieldName] ? 'Hide guidance' : 'Show me how'}
                  </button>

                  {openFieldGuides[field.fieldName] && (
                    <div
                      className="mt-3 p-4 rounded-lg space-y-3"
                      style={{
                        background: 'var(--color-warning-subtle)',
                        border: '1px solid rgba(245, 158, 11, 0.2)'
                      }}
                    >
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {field.howToFill.guidanceText}
                      </p>
                      {field.howToFill.exampleThought && (
                        <div
                          className="pl-4"
                          style={{ borderLeft: '2px solid rgba(245, 158, 11, 0.3)' }}
                        >
                          <p className="text-sm italic" style={{ color: 'var(--color-text-tertiary)' }}>
                            {field.howToFill.exampleThought}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {field.type === 'textarea' ? (
                <textarea
                  value={outputs[field.fieldName] || ''}
                  onChange={(e) => handleUpdateOutput(field.fieldName, e.target.value)}
                  placeholder={field.placeholder}
                  rows={5}
                  className="input textarea"
                />
              ) : field.type === 'text' ? (
                <input
                  type="text"
                  value={outputs[field.fieldName] || ''}
                  onChange={(e) => handleUpdateOutput(field.fieldName, e.target.value)}
                  placeholder={field.placeholder}
                  className="input"
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg animate-fade-in"
            style={{
              background: 'var(--color-danger-subtle)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-danger)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p style={{ color: 'var(--color-danger)' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div
          className="pt-8 flex flex-col sm:flex-row gap-4 animate-fade-in"
          style={{ borderTop: '1px solid var(--color-border-subtle)', animationDelay: '250ms' }}
        >
          <button
            onClick={handleComplete}
            disabled={saving}
            className="btn btn-primary btn-lg btn-shine flex-1 sm:flex-none"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Completing...
              </span>
            ) : (
              <>
                Complete chapter
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn btn-secondary btn-lg flex-1 sm:flex-none"
          >
            Save and come back later
          </button>
        </div>
      </div>
    </div>
  )
}
