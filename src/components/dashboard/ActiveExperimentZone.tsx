'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Commitment } from '@/lib/types'
import { getExperimentStaleness } from '@/lib/beliefState'

interface ActiveExperimentZoneProps {
  commitment: Commitment | null
}

export default function ActiveExperimentZone({ commitment }: ActiveExperimentZoneProps) {
  const [staleness, setStaleness] = useState<{
    isOverdue: boolean
    daysOverdue: number
    message: string
  } | null>(null)

  useEffect(() => {
    if (!commitment) return
    setStaleness(getExperimentStaleness(commitment.deadline))
    const interval = setInterval(() => {
      setStaleness(getExperimentStaleness(commitment.deadline))
    }, 60000)
    return () => clearInterval(interval)
  }, [commitment])

  if (!commitment) {
    return (
      <div
        className="card p-8 animate-fade-in"
        style={{
          background: 'var(--color-danger-subtle)',
          borderColor: 'var(--color-danger)',
          borderWidth: '2px',
        }}
      >
        <h2 className="stat-label mb-4" style={{ color: 'var(--color-danger)' }}>
          Experiment Status
        </h2>
        <div className="mb-6">
          <p
            className="text-3xl font-bold mb-3"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            You are idle.
          </p>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            No active test means no new information. Learning has stopped.
          </p>
        </div>
        <Link href="/orient" className="btn btn-primary btn-lg btn-shine">
          Start experiment
        </Link>
      </div>
    )
  }

  const canCheckIn = staleness && (staleness.isOverdue || staleness.daysOverdue >= -1)

  return (
    <div
      className="card p-8 animate-fade-in"
      style={{
        background: staleness?.isOverdue ? 'var(--color-danger-subtle)' : 'var(--color-surface-1)',
        borderColor: staleness?.isOverdue ? 'var(--color-danger)' : 'var(--color-border-subtle)',
        borderWidth: '2px',
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="stat-label mb-2">Active Experiment</h2>
          {staleness?.isOverdue && (
            <p className="text-sm font-bold uppercase" style={{ color: 'var(--color-danger)' }}>
              {staleness.daysOverdue} DAY{staleness.daysOverdue > 1 ? 'S' : ''} OVERDUE
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="stat-label mb-2">Testing</p>
        <p
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
        >
          {commitment.action}
        </p>
      </div>

      <div
        className="mb-6 p-4 rounded-lg"
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <p className="stat-label mb-2">Why This Test Matters</p>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          This experiment tests whether your current approach generates real market response. Failure to complete
          means you learn nothing and confidence cannot update.
        </p>
      </div>

      <div className="mb-6">
        <p className="stat-label mb-2">Success Criteria</p>
        <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          {commitment.completed_at
            ? 'Experiment completed.'
            : 'Complete action. Report actual results, not intentions.'}
        </p>
      </div>

      <div className="mb-6">
        <p className="stat-label mb-2">Deadline</p>
        <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
          {new Date(commitment.deadline).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      {staleness && (
        <div className="mb-6">
          <p
            className={`text-sm ${staleness.isOverdue ? 'font-bold' : ''}`}
            style={{ color: staleness.isOverdue ? 'var(--color-danger)' : 'var(--color-text-tertiary)' }}
          >
            {staleness.message}
          </p>
        </div>
      )}

      {canCheckIn && (
        <Link
          href="/check-in"
          className={staleness?.isOverdue ? 'btn btn-lg' : 'btn btn-primary btn-lg btn-shine'}
          style={staleness?.isOverdue ? {
            background: 'var(--color-danger)',
            color: 'white',
          } : undefined}
        >
          Submit results
        </Link>
      )}
    </div>
  )
}
