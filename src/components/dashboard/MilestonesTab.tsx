'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MilestoneRecord } from '@/lib/types'
import { getMilestonesForPath, MilestoneDefinition } from '@/lib/milestones'

interface MilestonesTabProps {
  userId: string
  pathId: string
  initialCompleted: MilestoneRecord[]
}

const CATEGORY_CONFIG: Record<
  MilestoneDefinition['category'],
  { label: string; color: string; bgColor: string }
> = {
  traction: { label: 'Traction', color: 'var(--color-accent)', bgColor: 'var(--color-accent-subtle)' },
  revenue: { label: 'Revenue', color: 'var(--color-success)', bgColor: 'var(--color-success-subtle)' },
  systems: { label: 'Systems', color: 'var(--color-warning)', bgColor: 'rgba(245, 158, 11, 0.1)' },
  growth: { label: 'Growth', color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.1)' },
}

const CATEGORY_ORDER: MilestoneDefinition['category'][] = ['traction', 'revenue', 'systems', 'growth']

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function MilestonesTab({ userId, pathId, initialCompleted }: MilestonesTabProps) {
  const supabase = createClient()
  const milestones = useMemo(() => getMilestonesForPath(pathId), [pathId])
  const [completed, setCompleted] = useState<MilestoneRecord[]>(initialCompleted)
  const [loadingKey, setLoadingKey] = useState<string | null>(null)
  const [undoKey, setUndoKey] = useState<string | null>(null)

  const completedKeys = useMemo(() => new Set(completed.map((r) => r.milestone_key)), [completed])
  const completedCount = completedKeys.size
  const totalCount = milestones.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const grouped = useMemo(() => {
    const groups: Record<string, MilestoneDefinition[]> = {}
    for (const m of milestones) {
      if (!groups[m.category]) groups[m.category] = []
      groups[m.category].push(m)
    }
    for (const cat of Object.keys(groups)) {
      groups[cat].sort((a, b) => a.sequence - b.sequence)
    }
    return groups
  }, [milestones])

  async function handleMarkComplete(milestoneKey: string) {
    setLoadingKey(milestoneKey)
    try {
      const { data, error } = await supabase
        .from('milestones')
        .insert({ user_id: userId, milestone_key: milestoneKey })
        .select()
        .single()
      if (error) throw error
      setCompleted((prev) => [...prev, data as MilestoneRecord])
    } catch (err) {
      console.error('Failed to mark milestone complete:', err)
    } finally {
      setLoadingKey(null)
    }
  }

  async function handleUndo(milestoneKey: string) {
    const record = completed.find((r) => r.milestone_key === milestoneKey)
    if (!record) return
    setLoadingKey(milestoneKey)
    try {
      const { error } = await supabase.from('milestones').delete().eq('id', record.id)
      if (error) throw error
      setCompleted((prev) => prev.filter((r) => r.milestone_key !== milestoneKey))
      setUndoKey(null)
    } catch (err) {
      console.error('Failed to undo milestone:', err)
    } finally {
      setLoadingKey(null)
    }
  }

  function getCompletionRecord(milestoneKey: string): MilestoneRecord | undefined {
    return completed.find((r) => r.milestone_key === milestoneKey)
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {completedCount} of {totalCount} milestones reached
          </p>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
            {Math.round(progressPercent)}%
          </p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category]
        if (!items || items.length === 0) return null
        const config = CATEGORY_CONFIG[category]
        const categoryCompleted = items.filter((m) => completedKeys.has(m.key)).length

        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-3">
              <h3 className="stat-label" style={{ marginBottom: 0 }}>{config.label}</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: config.bgColor, color: config.color }}
              >
                {categoryCompleted}/{items.length}
              </span>
            </div>

            <div className="space-y-2">
              {items.map((milestone) => {
                const record = getCompletionRecord(milestone.key)
                const isCompleted = !!record
                const isLoading = loadingKey === milestone.key
                const showUndo = undoKey === milestone.key

                return (
                  <div
                    key={milestone.key}
                    className="card p-4"
                    style={{ borderLeft: `3px solid ${isCompleted ? 'var(--color-success)' : 'var(--color-border-subtle)'}` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {isCompleted ? (
                          <button
                            onClick={() => setUndoKey(showUndo ? null : milestone.key)}
                            className="mt-0.5 flex-shrink-0 transition-colors"
                            style={{ color: 'var(--color-success)' }}
                          >
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </button>
                        ) : (
                          <div className="mt-0.5 flex-shrink-0">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-muted)' }}>
                              <circle cx="12" cy="12" r="9" />
                            </svg>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{milestone.title}</p>
                          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{milestone.description}</p>
                          {isCompleted && record && (
                            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Completed {formatDate(record.completed_at)}</p>
                          )}
                          {showUndo && (
                            <button
                              onClick={() => handleUndo(milestone.key)}
                              disabled={isLoading}
                              className="mt-2 text-xs transition-colors disabled:opacity-50"
                              style={{ color: 'var(--color-danger)' }}
                            >
                              {isLoading ? 'Removing...' : 'Undo completion'}
                            </button>
                          )}
                        </div>
                      </div>

                      {!isCompleted && (
                        <button
                          onClick={() => handleMarkComplete(milestone.key)}
                          disabled={isLoading}
                          className="btn btn-secondary btn-sm flex-shrink-0"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Saving...
                            </span>
                          ) : (
                            'Mark complete'
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      {milestones.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--color-surface-2)' }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--color-text-muted)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p style={{ color: 'var(--color-text-tertiary)' }}>No milestones defined for this path.</p>
        </div>
      )}
    </div>
  )
}
