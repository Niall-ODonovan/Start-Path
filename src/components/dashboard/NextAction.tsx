interface NextActionProps {
  hasEvidence: boolean
  currentDirection: string | null
}

export default function NextAction({
  hasEvidence,
  currentDirection,
}: NextActionProps) {
  const getNextAction = () => {
    if (!hasEvidence) {
      return 'Start working on your commitment. Add observations as you go.'
    }
    return 'Keep moving forward. Add evidence as you progress.'
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-black">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
        Next action
      </h3>
      <p className="text-gray-900">{getNextAction()}</p>
    </div>
  )
}
