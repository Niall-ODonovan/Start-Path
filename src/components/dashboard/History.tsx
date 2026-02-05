import type { CheckIn, Commitment } from '@/lib/types'

interface HistoryProps {
  checkIns: (CheckIn & { commitment: Commitment })[]
}

export default function History({ checkIns }: HistoryProps) {
  if (!checkIns || checkIns.length === 0) {
    return null
  }

  const signalColors = {
    strong: 'bg-green-950 border-green-500 text-green-400',
    mixed: 'bg-yellow-950 border-yellow-500 text-yellow-400',
    weak: 'bg-red-950 border-red-500 text-red-400',
  }

  const adjustmentLabels = {
    double_down: 'DOUBLED DOWN',
    narrow: 'NARROWED FOCUS',
    pivot: 'PIVOTED',
    escalate: 'ESCALATED',
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">History</h2>
      <div className="space-y-6">
        {checkIns.map((checkIn, index) => (
          <div key={checkIn.id} className="border-l-4 border-gray-700 pl-6 pb-6">
            <div className="text-sm text-gray-500 mb-2">
              {new Date(checkIn.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>

            <div className="text-white font-medium mb-3">{checkIn.commitment.action}</div>

            <div className="flex gap-3 mb-3">
              <span
                className={`px-3 py-1 rounded text-xs font-bold uppercase border ${
                  signalColors[checkIn.signal_type]
                }`}
              >
                {checkIn.signal_type} signal
              </span>
              <span className="px-3 py-1 rounded text-xs font-bold uppercase border border-gray-600 text-gray-400">
                {adjustmentLabels[checkIn.path_adjustment]}
              </span>
            </div>

            <div className="text-sm text-gray-400">{checkIn.signal_explanation}</div>

            {index < checkIns.length - 1 && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Led to</div>
                <div className="text-sm text-gray-300">{checkIn.next_action}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
