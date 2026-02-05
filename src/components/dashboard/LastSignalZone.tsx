import type { CheckIn, Commitment } from '@/lib/types'

interface LastSignalZoneProps {
  lastCheckIn: (CheckIn & { commitment: Commitment }) | null
}

export default function LastSignalZone({ lastCheckIn }: LastSignalZoneProps) {
  if (!lastCheckIn) {
    return null
  }

  const resultColors = {
    weak: 'border-red-500 bg-red-950 bg-opacity-20 text-red-400',
    mixed: 'border-yellow-500 bg-yellow-950 bg-opacity-20 text-yellow-400',
    strong: 'border-green-500 bg-green-950 bg-opacity-20 text-green-400',
  }

  const resultLabels = {
    weak: 'BAD RESULT',
    mixed: 'UNCLEAR RESULT',
    strong: 'GOOD RESULT',
  }

  const adjustmentLabels = {
    double_down: 'DOUBLED DOWN',
    narrow: 'NARROWED FOCUS',
    pivot: 'PIVOTED',
    escalate: 'ESCALATED',
  }

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8">
      <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
        Last Experiment → What Changed
      </h2>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">What you tried</p>
        <p className="text-lg font-bold text-white">{lastCheckIn.commitment.action}</p>
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">What happened</p>
        <div className="space-y-2">
          <p className="text-sm text-gray-300">
            Completed: <span className="font-medium">{lastCheckIn.completed ? 'Yes' : 'No'}</span>
          </p>
          <p className="text-sm text-gray-300">Result: {lastCheckIn.outcome}</p>
          <p className="text-sm text-gray-300">Learning: {lastCheckIn.learned}</p>
        </div>
      </div>

      <div className={`border-2 rounded-lg p-4 mb-6 ${resultColors[lastCheckIn.signal_type]}`}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold uppercase tracking-wider">
            {resultLabels[lastCheckIn.signal_type]}
          </p>
        </div>
        <p className="text-sm text-gray-300">{lastCheckIn.signal_explanation}</p>
      </div>

      <div className="bg-black bg-opacity-40 rounded border border-gray-700 p-6">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">How you reacted</p>
          <p className="text-sm text-white">{adjustmentLabels[lastCheckIn.path_adjustment]}</p>
        </div>
        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Next experiment</p>
          <p className="text-sm text-gray-300">{lastCheckIn.next_action}</p>
        </div>
      </div>
    </div>
  )
}
