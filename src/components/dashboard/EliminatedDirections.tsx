interface EliminatedDirectionsProps {
  eliminatedDirections: string[]
}

export default function EliminatedDirections({
  eliminatedDirections,
}: EliminatedDirectionsProps) {
  if (!eliminatedDirections || eliminatedDirections.length === 0) {
    return null
  }

  return (
    <div className="bg-red-950 bg-opacity-20 rounded-lg p-6 border-2 border-red-900">
      <h3 className="text-sm font-bold uppercase tracking-wide text-red-400 mb-4">
        Eliminated
      </h3>
      <div className="flex flex-wrap gap-3">
        {eliminatedDirections.map((direction) => (
          <span
            key={direction}
            className="px-4 py-2 bg-red-950 border border-red-800 rounded text-lg text-red-400 line-through font-medium"
          >
            {direction}
          </span>
        ))}
      </div>
    </div>
  )
}
