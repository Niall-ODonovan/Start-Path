import Link from 'next/link'

interface NextLeverZoneProps {
  lever: {
    action: string
    reason: string
    uncertainty: string
  }
  hasActiveExperiment: boolean
}

export default function NextLeverZone({ lever, hasActiveExperiment }: NextLeverZoneProps) {
  return (
    <div className="bg-gray-900 border-2 border-white rounded-lg p-8">
      <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">Next Lever</h2>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Highest-Leverage Decision</p>
        <p className="text-2xl font-bold text-white">{lever.action}</p>
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Why This Matters Most</p>
        <p className="text-sm text-gray-300">{lever.reason}</p>
      </div>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">Uncertainty This Resolves</p>
        <p className="text-sm text-gray-400">{lever.uncertainty}</p>
      </div>

      {!hasActiveExperiment && (
        <Link
          href="/commit"
          className="inline-block px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition-all"
        >
          Run next experiment
        </Link>
      )}
    </div>
  )
}
