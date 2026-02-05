import type { CurrentFocus } from '@/lib/beliefState'

interface BeliefStateZoneProps {
  currentFocus: CurrentFocus
}

export default function BeliefStateZone({ currentFocus }: BeliefStateZoneProps) {
  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-8">
      <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Current Focus</h2>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">
          What you're trying to find out
        </p>
        <p className="text-xl font-bold text-white">{currentFocus.question}</p>
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Why this matters</p>
        <p className="text-sm text-gray-300">{currentFocus.whyItMatters}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
          What changes depending on result
        </p>
        <div className="space-y-3">
          <div className="bg-green-950 bg-opacity-20 border border-green-900 rounded p-3">
            <p className="text-xs uppercase tracking-wider text-green-400 mb-1">If this works</p>
            <p className="text-sm text-gray-300">{currentFocus.ifWorks}</p>
          </div>
          <div className="bg-red-950 bg-opacity-20 border border-red-900 rounded p-3">
            <p className="text-xs uppercase tracking-wider text-red-400 mb-1">
              If this doesn't work
            </p>
            <p className="text-sm text-gray-300">{currentFocus.ifFails}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
