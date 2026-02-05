import { WeeklyCheckIn } from '@/lib/types'

interface CheckInHistoryProps {
  checkIns: WeeklyCheckIn[]
}

function formatWeekOf(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return 'Week of ' + date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function CheckInHistory({ checkIns }: CheckInHistoryProps) {
  if (!checkIns || checkIns.length === 0) {
    return (
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <p style={{ color: 'var(--color-text-tertiary)' }}>
          No check-ins yet. Start your first one above.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="stat-label">Check-in history</h3>
      {checkIns.map((checkIn) => (
        <div key={checkIn.id} className="card p-6 space-y-4">
          <h4
            className="font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {formatWeekOf(checkIn.week_of)}
          </h4>

          {(checkIn.revenue_this_week !== null ||
            checkIn.expenses_this_week !== null ||
            checkIn.clients_or_users !== null) && (
            <div className="flex flex-wrap gap-3">
              {checkIn.revenue_this_week !== null && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Revenue</span>
                  <span className="font-medium" style={{ color: 'var(--color-success)' }}>
                    ${checkIn.revenue_this_week.toLocaleString()}
                  </span>
                </span>
              )}
              {checkIn.expenses_this_week !== null && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Expenses</span>
                  <span className="font-medium" style={{ color: 'var(--color-danger)' }}>
                    ${checkIn.expenses_this_week.toLocaleString()}
                  </span>
                </span>
              )}
              {checkIn.clients_or_users !== null && (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  <span style={{ color: 'var(--color-text-tertiary)' }}>Clients/Users</span>
                  <span className="font-medium" style={{ color: 'var(--color-accent)' }}>
                    {checkIn.clients_or_users}
                  </span>
                </span>
              )}
            </div>
          )}

          {checkIn.wins && (
            <div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                What went well
              </p>
              <p
                className="whitespace-pre-wrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {checkIn.wins}
              </p>
            </div>
          )}

          {checkIn.blockers && (
            <div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                Blockers
              </p>
              <p
                className="whitespace-pre-wrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {checkIn.blockers}
              </p>
            </div>
          )}

          {checkIn.next_week_focus && (
            <div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                Next week focus
              </p>
              <p
                className="whitespace-pre-wrap"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {checkIn.next_week_focus}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
