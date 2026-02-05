'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Commitment } from '@/lib/types'

interface ActiveCommitmentProps {
  commitment: Commitment | null
}

function getTimeRemaining(deadline: string) {
  const total = Date.parse(deadline) - Date.now()
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)

  return {
    total,
    days,
    hours,
  }
}

export default function ActiveCommitment({ commitment }: ActiveCommitmentProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    total: number
    days: number
    hours: number
  } | null>(null)

  useEffect(() => {
    if (!commitment) return

    const updateTimer = () => {
      setTimeRemaining(getTimeRemaining(commitment.deadline))
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000)

    return () => clearInterval(interval)
  }, [commitment])

  if (!commitment) {
    return null
  }

  const isPastDeadline = timeRemaining && timeRemaining.total < 0
  const isUrgent = timeRemaining && timeRemaining.total > 0 && timeRemaining.days === 0
  const canCheckIn = isPastDeadline || (timeRemaining && timeRemaining.days <= 1)

  return (
    <div
      className={`rounded-lg p-8 border-2 ${
        isPastDeadline
          ? 'bg-red-950 border-red-500 text-white'
          : isUrgent
          ? 'bg-yellow-50 border-yellow-500 text-black'
          : 'bg-white border-gray-300'
      }`}
    >
      <p className="text-sm uppercase tracking-wider text-gray-500 mb-3">Commitment</p>
      <p className="text-2xl font-bold mb-6">{commitment.action}</p>
      {timeRemaining && (
        <div className="text-center">
          {isPastDeadline ? (
            <div className="text-red-400 font-bold text-xl mb-6">DEADLINE PASSED</div>
          ) : (
            <div className="flex gap-6 justify-center mb-6">
              {timeRemaining.days > 0 && (
                <div>
                  <div className="text-4xl font-bold">{timeRemaining.days}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-500">
                    day{timeRemaining.days !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
              <div>
                <div className="text-4xl font-bold">{timeRemaining.hours}</div>
                <div className="text-sm uppercase tracking-wider text-gray-500">
                  hour{timeRemaining.hours !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
          {canCheckIn && (
            <Link
              href="/check-in"
              className="inline-block px-8 py-4 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              Check in
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
