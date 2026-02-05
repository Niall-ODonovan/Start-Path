import type { CheckIn, Commitment } from '@/lib/types'

interface StrategyTrajectoryZoneProps {
  checkIns: (CheckIn & { commitment: Commitment })[]
}

export default function StrategyTrajectoryZone({ checkIns }: StrategyTrajectoryZoneProps) {
  if (checkIns.length === 0) {
    return null
  }

  const resultColors = {
    weak: 'bg-red-500',
    mixed: 'bg-yellow-500',
    strong: 'bg-green-500',
  }

  const resultLabels = {
    weak: 'bad',
    mixed: 'unclear',
    strong: 'good',
  }

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8">
      <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Experiment History</h2>

      <div className="space-y-6">
        {checkIns.map((checkIn, index) => (
          <div key={checkIn.id} className="relative">
            {index < checkIns.length - 1 && (
              <div className="absolute left-2 top-10 bottom-0 w-0.5 bg-gray-700" />
            )}
            <div className="flex gap-4">
              <div className="flex-shrink-0 pt-1">
                <div className={`w-4 h-4 rounded-full ${resultColors[checkIn.signal_type]}`} />
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      {new Date(checkIn.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      checkIn.signal_type === 'strong'
                        ? 'bg-green-950 text-green-400'
                        : checkIn.signal_type === 'weak'
                        ? 'bg-red-950 text-red-400'
                        : 'bg-yellow-950 text-yellow-400'
                    }`}
                  >
                    {resultLabels[checkIn.signal_type]}
                  </span>
                </div>
                <p className="text-sm font-medium text-white mb-2">
                  {checkIn.commitment.action.substring(0, 60)}
                  {checkIn.commitment.action.length > 60 ? '...' : ''}
                </p>
                <p className="text-xs text-gray-400 mb-2">{checkIn.signal_explanation}</p>
                {index < checkIns.length - 1 && (
                  <div className="mt-3 pt-3 border-t border-gray-800">
                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-1">Led to</p>
                    <p className="text-xs text-gray-400">{checkIn.next_action.substring(0, 80)}...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Progress</p>
        <p className="text-sm text-gray-300">{checkIns.length} experiments completed</p>
      </div>
    </div>
  )
}
