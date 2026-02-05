'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { WeeklyCheckIn } from '@/lib/types'

function getMonday(date: Date): string {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().split('T')[0]
}

interface WeeklyCheckInFormProps {
  userId: string
}

export default function WeeklyCheckInForm({ userId }: WeeklyCheckInFormProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [existing, setExisting] = useState<WeeklyCheckIn | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [revenueThisWeek, setRevenueThisWeek] = useState('')
  const [expensesThisWeek, setExpensesThisWeek] = useState('')
  const [clientsOrUsers, setClientsOrUsers] = useState('')
  const [wins, setWins] = useState('')
  const [blockers, setBlockers] = useState('')
  const [nextWeekFocus, setNextWeekFocus] = useState('')

  const monday = getMonday(new Date())
  const supabase = createClient()

  useEffect(() => {
    async function fetchExisting() {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('weekly_check_ins')
        .select('*')
        .eq('user_id', userId)
        .eq('week_of', monday)
        .maybeSingle()

      if (fetchError) {
        setError(fetchError.message)
      } else if (data) {
        setExisting(data as WeeklyCheckIn)
      }
      setLoading(false)
    }

    fetchExisting()
  }, [userId, monday])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const payload = {
      user_id: userId,
      week_of: monday,
      revenue_this_week: revenueThisWeek ? parseFloat(revenueThisWeek) : null,
      expenses_this_week: expensesThisWeek ? parseFloat(expensesThisWeek) : null,
      clients_or_users: clientsOrUsers ? parseInt(clientsOrUsers, 10) : null,
      wins: wins || null,
      blockers: blockers || null,
      next_week_focus: nextWeekFocus || null,
    }

    const { data, error: insertError } = await supabase
      .from('weekly_check_ins')
      .insert(payload)
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
    } else if (data) {
      setExisting(data as WeeklyCheckIn)
    }

    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="card p-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }} />
          <p style={{ color: 'var(--color-text-tertiary)' }}>Loading check-in...</p>
        </div>
      </div>
    )
  }

  if (existing) {
    return (
      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: 'var(--color-success)' }}
          />
          <h3
            className="text-lg font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            This week&apos;s check-in is done
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {existing.revenue_this_week !== null && (
            <div className="stat-card">
              <p className="stat-label">Revenue</p>
              <p className="stat-value text-xl">
                ${existing.revenue_this_week.toLocaleString()}
              </p>
            </div>
          )}
          {existing.expenses_this_week !== null && (
            <div className="stat-card">
              <p className="stat-label">Expenses</p>
              <p className="stat-value text-xl">
                ${existing.expenses_this_week.toLocaleString()}
              </p>
            </div>
          )}
          {existing.clients_or_users !== null && (
            <div className="stat-card">
              <p className="stat-label">Clients / Users</p>
              <p className="stat-value text-xl">
                {existing.clients_or_users}
              </p>
            </div>
          )}
        </div>

        {existing.wins && (
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
              What went well
            </p>
            <p className="whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)' }}>
              {existing.wins}
            </p>
          </div>
        )}

        {existing.blockers && (
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
              Blockers
            </p>
            <p className="whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)' }}>
              {existing.blockers}
            </p>
          </div>
        )}

        {existing.next_week_focus && (
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
              Next week focus
            </p>
            <p className="whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)' }}>
              {existing.next_week_focus}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-6">
      <h3
        className="text-lg font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Weekly Check-In
      </h3>

      {error && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            background: 'var(--color-danger-subtle)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: 'var(--color-danger)',
          }}
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="revenue" className="label">
            Revenue this week ($)
          </label>
          <input
            id="revenue"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={revenueThisWeek}
            onChange={(e) => setRevenueThisWeek(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="expenses" className="label">
            Expenses this week ($)
          </label>
          <input
            id="expenses"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={expensesThisWeek}
            onChange={(e) => setExpensesThisWeek(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="clients" className="label">
            Clients / users this week
          </label>
          <input
            id="clients"
            type="number"
            step="1"
            placeholder="0"
            value={clientsOrUsers}
            onChange={(e) => setClientsOrUsers(e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="wins" className="label">
          What went well this week?
        </label>
        <textarea
          id="wins"
          rows={3}
          placeholder="Share your wins..."
          value={wins}
          onChange={(e) => setWins(e.target.value)}
          className="input"
          style={{ minHeight: '80px', resize: 'vertical' }}
        />
      </div>

      <div>
        <label htmlFor="blockers" className="label">
          What&apos;s getting in the way?
        </label>
        <textarea
          id="blockers"
          rows={3}
          placeholder="Anything blocking your progress..."
          value={blockers}
          onChange={(e) => setBlockers(e.target.value)}
          className="input"
          style={{ minHeight: '80px', resize: 'vertical' }}
        />
      </div>

      <div>
        <label htmlFor="nextWeekFocus" className="label">
          What are you focusing on next week?
        </label>
        <textarea
          id="nextWeekFocus"
          rows={3}
          placeholder="Your priorities for next week..."
          value={nextWeekFocus}
          onChange={(e) => setNextWeekFocus(e.target.value)}
          className="input"
          style={{ minHeight: '80px', resize: 'vertical' }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary btn-shine w-full"
        style={{ padding: '0.875rem 1.5rem' }}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Saving...
          </span>
        ) : (
          'Save check-in'
        )}
      </button>
    </form>
  )
}
