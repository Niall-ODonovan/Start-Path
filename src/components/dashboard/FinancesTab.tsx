'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FinancialEntry } from '@/lib/types'

interface FinancesTabProps {
  userId: string
  initialEntries: FinancialEntry[]
}

const CATEGORIES = [
  'Client Payment',
  'Product Sale',
  'Commission',
  'Software/Tools',
  'Marketing',
  'Supplies',
  'Other',
]

function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getMonthKey(dateStr: string): string {
  return dateStr.slice(0, 7)
}

function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function getTodayString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function FinancesTab({ userId, initialEntries }: FinancesTabProps) {
  const supabase = createClient()

  const [entries, setEntries] = useState<FinancialEntry[]>(initialEntries)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [entryDate, setEntryDate] = useState(getTodayString())
  const [entryType, setEntryType] = useState<'revenue' | 'expense'>('revenue')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])

  const availableMonths = useMemo(() => {
    const monthSet = new Set<string>()
    entries.forEach((e) => monthSet.add(getMonthKey(e.entry_date)))
    monthSet.add(getTodayString().slice(0, 7))
    return Array.from(monthSet).sort().reverse()
  }, [entries])

  const [selectedMonth, setSelectedMonth] = useState(() => getTodayString().slice(0, 7))

  const totalRevenue = useMemo(
    () => entries.filter((e) => e.type === 'revenue').reduce((sum, e) => sum + e.amount, 0),
    [entries]
  )

  const totalExpenses = useMemo(
    () => entries.filter((e) => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0),
    [entries]
  )

  const netProfit = totalRevenue - totalExpenses

  const filteredEntries = useMemo(() => {
    return entries
      .filter((e) => getMonthKey(e.entry_date) === selectedMonth)
      .sort((a, b) => b.entry_date.localeCompare(a.entry_date))
  }, [entries, selectedMonth])

  function resetForm() {
    setEntryDate(getTodayString())
    setEntryType('revenue')
    setAmount('')
    setDescription('')
    setCategory(CATEGORIES[0])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) return
    if (!description.trim()) return

    setSubmitting(true)

    const { data, error } = await supabase
      .from('financial_entries')
      .insert({
        user_id: userId,
        entry_date: entryDate,
        type: entryType,
        amount: parsedAmount,
        description: description.trim(),
        category,
      })
      .select()
      .single()

    setSubmitting(false)

    if (error) {
      console.error('Failed to add entry:', error)
      return
    }

    if (data) {
      setEntries((prev) => [data as FinancialEntry, ...prev])
      resetForm()
      setShowForm(false)
    }
  }

  async function handleDelete(entryId: string) {
    const { error } = await supabase
      .from('financial_entries')
      .delete()
      .eq('id', entryId)

    if (error) {
      console.error('Failed to delete entry:', error)
      return
    }

    setEntries((prev) => prev.filter((e) => e.id !== entryId))
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="stat-label">Total Revenue</p>
          <p className="stat-value text-2xl" style={{ color: 'var(--color-success)' }}>
            {formatAmount(totalRevenue)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Expenses</p>
          <p className="stat-value text-2xl" style={{ color: 'var(--color-danger)' }}>
            {formatAmount(totalExpenses)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Net Profit</p>
          <p
            className="stat-value text-2xl"
            style={{ color: netProfit < 0 ? 'var(--color-danger)' : 'var(--color-text-primary)' }}
          >
            {formatAmount(netProfit)}
          </p>
        </div>
      </div>

      {/* Add Entry Section */}
      <div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className={showForm ? 'btn btn-secondary' : 'btn btn-primary'}
        >
          {showForm ? 'Cancel' : '+ Add Entry'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 card p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Date</label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEntryType('revenue')}
                    className="flex-1 px-4 py-3 rounded-lg font-medium transition-all"
                    style={{
                      background: entryType === 'revenue' ? 'var(--color-success)' : 'var(--color-surface-2)',
                      color: entryType === 'revenue' ? 'white' : 'var(--color-text-secondary)',
                      border: `1px solid ${entryType === 'revenue' ? 'var(--color-success)' : 'var(--color-border-subtle)'}`,
                    }}
                  >
                    Revenue
                  </button>
                  <button
                    type="button"
                    onClick={() => setEntryType('expense')}
                    className="flex-1 px-4 py-3 rounded-lg font-medium transition-all"
                    style={{
                      background: entryType === 'expense' ? 'var(--color-danger)' : 'var(--color-surface-2)',
                      color: entryType === 'expense' ? 'white' : 'var(--color-text-secondary)',
                      border: `1px solid ${entryType === 'expense' ? 'var(--color-danger)' : 'var(--color-border-subtle)'}`,
                    }}
                  >
                    Expense
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Amount</label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-lg"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="input"
                    style={{ paddingLeft: '1.75rem' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this for?"
                className="input"
                required
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
                  Adding...
                </span>
              ) : (
                'Add Entry'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {/* Month Filter */}
        <div className="flex gap-2 flex-wrap">
          {availableMonths.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: selectedMonth === month ? 'var(--color-accent)' : 'var(--color-surface-1)',
                color: selectedMonth === month ? 'white' : 'var(--color-text-secondary)',
                border: `1px solid ${selectedMonth === month ? 'var(--color-accent)' : 'var(--color-border-subtle)'}`,
              }}
            >
              {getMonthLabel(month)}
            </button>
          ))}
        </div>

        {/* Entries Table */}
        {filteredEntries.length === 0 ? (
          <div className="card p-8 text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'var(--color-surface-2)' }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              No entries yet. Add your first revenue or expense above.
            </p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div
              className="grid grid-cols-[120px_100px_1fr_140px_120px_48px] gap-2 px-4 py-3 text-sm font-medium"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-tertiary)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <span>Date</span>
              <span>Type</span>
              <span>Description</span>
              <span>Category</span>
              <span className="text-right">Amount</span>
              <span></span>
            </div>

            {filteredEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="grid grid-cols-[120px_100px_1fr_140px_120px_48px] gap-2 px-4 py-3 items-center text-sm transition-colors"
                style={{
                  borderBottom: index < filteredEntries.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                }}
              >
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {formatDate(entry.entry_date)}
                </span>
                <span>
                  <span
                    className="inline-block px-2 py-1 rounded text-xs font-medium"
                    style={{
                      background: entry.type === 'revenue' ? 'var(--color-success-subtle)' : 'var(--color-danger-subtle)',
                      color: entry.type === 'revenue' ? 'var(--color-success)' : 'var(--color-danger)',
                    }}
                  >
                    {entry.type === 'revenue' ? 'Revenue' : 'Expense'}
                  </span>
                </span>
                <span className="truncate" style={{ color: 'var(--color-text-primary)' }}>
                  {entry.description}
                </span>
                <span className="truncate" style={{ color: 'var(--color-text-tertiary)' }}>
                  {entry.category || '-'}
                </span>
                <span
                  className="text-right font-medium"
                  style={{ color: entry.type === 'revenue' ? 'var(--color-success)' : 'var(--color-danger)' }}
                >
                  {entry.type === 'expense' ? '-' : ''}
                  {formatAmount(entry.amount)}
                </span>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                  title="Delete entry"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
