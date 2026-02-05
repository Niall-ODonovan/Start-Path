import type { ChapterOutput, WeeklyCheckIn, FinancialEntry, MilestoneRecord } from '@/lib/types'
import type { MilestoneDefinition } from '@/lib/milestones'
import BusinessSummary from './BusinessSummary'

interface OverviewTabProps {
  pathId: string
  pathName: string
  completedAt: string
  outputs: ChapterOutput[]
  latestCheckIn: WeeklyCheckIn | null
  hasCheckInThisWeek: boolean
  financialEntries: FinancialEntry[]
  milestones: MilestoneDefinition[]
  completedMilestones: MilestoneRecord[]
}

export default function OverviewTab({
  pathId,
  pathName,
  completedAt,
  outputs,
  latestCheckIn,
  hasCheckInThisWeek,
  financialEntries,
  milestones,
  completedMilestones,
}: OverviewTabProps) {
  const totalRevenue = financialEntries
    .filter((e) => e.type === 'revenue')
    .reduce((sum, e) => sum + Number(e.amount), 0)
  const totalExpenses = financialEntries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + Number(e.amount), 0)
  const net = totalRevenue - totalExpenses
  const completedDate = new Date(completedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const milestonesCompleted = completedMilestones.length
  const milestonesTotal = milestones.length
  const milestonePercent = milestonesTotal > 0 ? (milestonesCompleted / milestonesTotal) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Path completion banner */}
      <div
        className="card p-8 glow-border-always"
        style={{
          background: 'linear-gradient(135deg, var(--color-success-subtle) 0%, var(--color-surface-1) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
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
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            {pathName} completed
          </h2>
        </div>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Path completed on {completedDate}. Your business is underway.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="stat-label">Revenue</p>
          <p className="stat-value text-2xl" style={{ color: 'var(--color-success)' }}>
            ${totalRevenue.toFixed(0)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Expenses</p>
          <p className="stat-value text-2xl" style={{ color: 'var(--color-danger)' }}>
            ${totalExpenses.toFixed(0)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Net</p>
          <p
            className="stat-value text-2xl"
            style={{ color: net >= 0 ? 'var(--color-text-primary)' : 'var(--color-danger)' }}
          >
            ${net.toFixed(0)}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Milestones</p>
          <p className="stat-value text-2xl">
            {milestonesCompleted}
            <span
              className="text-sm font-normal ml-1"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              / {milestonesTotal}
            </span>
          </p>
        </div>
      </div>

      {/* Weekly check-in prompt */}
      {!hasCheckInThisWeek && (
        <a
          href="/dashboard?tab=checkin"
          className="block card card-interactive p-6"
          style={{
            background: 'var(--color-warning-subtle)',
            borderColor: 'rgba(245, 158, 11, 0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(245, 158, 11, 0.15)' }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--color-warning)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--color-warning)' }}>
                Time for your weekly check-in
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Log your progress, wins, and blockers for this week.
              </p>
            </div>
            <svg
              className="w-5 h-5 ml-auto flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      )}

      {/* Latest check-in summary */}
      {latestCheckIn && (
        <div className="card p-6">
          <h3 className="stat-label mb-4">
            Latest check-in &mdash; Week of{' '}
            {new Date(latestCheckIn.week_of + 'T00:00:00').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </h3>
          <div className="space-y-4">
            {latestCheckIn.wins && (
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Wins
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {latestCheckIn.wins}
                </p>
              </div>
            )}
            {latestCheckIn.blockers && (
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Blockers
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {latestCheckIn.blockers}
                </p>
              </div>
            )}
            {latestCheckIn.next_week_focus && (
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Next focus
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {latestCheckIn.next_week_focus}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Business summary */}
      <BusinessSummary pathId={pathId} outputs={outputs} />

      {/* Milestone progress */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="stat-label">Milestone progress</h3>
          <a
            href="/dashboard?tab=milestones"
            className="text-sm transition-colors"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            View all
          </a>
        </div>
        <div className="progress-bar mb-3">
          <div
            className="progress-fill"
            style={{ width: `${milestonePercent}%` }}
          />
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          {milestonesCompleted} of {milestonesTotal} milestones reached
        </p>
      </div>
    </div>
  )
}
