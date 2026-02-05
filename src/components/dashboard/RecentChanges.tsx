import type { SessionOutcome } from '@/lib/types'

interface RecentChangesProps {
  outcome: SessionOutcome | null
}

export default function RecentChanges({ outcome }: RecentChangesProps) {
  if (!outcome) {
    return null
  }

  const isRecent =
    Date.now() - new Date(outcome.created_at).getTime() < 7 * 24 * 60 * 60 * 1000 // Within last 7 days

  if (!isRecent) {
    return null
  }

  return (
    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
      <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-2">
        Recent change
      </h3>
      <p className="text-blue-900">{outcome.what_changed}</p>
      <p className="text-xs text-blue-700 mt-2">
        {new Date(outcome.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
