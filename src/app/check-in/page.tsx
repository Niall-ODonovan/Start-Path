'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Commitment, Direction } from '@/lib/types'

type Step = 'loading' | 'completed' | 'outcome' | 'learned' | 'processing' | 'result'

const OUTCOME_OPTIONS = {
  'E-commerce': [
    'Got my first sale',
    'Had conversations, no sales yet',
    'Built something, no traction',
    'Struggled to start',
  ],
  Service: [
    'Landed a client',
    'Got interest, no commitments',
    'Put myself out there, no response',
    'Struggled to start',
  ],
  Content: [
    'Content performed well',
    'Published, small response',
    'Published, no engagement',
    'Struggled to create',
  ],
}

const LEARNED_OPTIONS = [
  'This works. I need to do more.',
  'I see potential. Need to refine approach.',
  'This is harder than expected.',
  'Wrong approach. Need to try something else.',
]

function classifySignal(
  completed: boolean,
  outcome: string,
  learned: string
): { type: 'weak' | 'mixed' | 'strong'; explanation: string } {
  // Strong signal: completed + positive outcome + wants to do more
  if (
    completed &&
    (outcome.includes('first sale') ||
      outcome.includes('Landed a client') ||
      outcome.includes('performed well')) &&
    learned.includes('This works')
  ) {
    return {
      type: 'strong',
      explanation: 'Clear traction. The market is responding.',
    }
  }

  // Mixed signal: completed but unclear results, or partial success
  if (
    completed &&
    (outcome.includes('no sales yet') ||
      outcome.includes('no commitments') ||
      outcome.includes('small response'))
  ) {
    return {
      type: 'mixed',
      explanation: 'Activity happened, but results are unclear.',
    }
  }

  if (
    completed &&
    (outcome.includes('no traction') ||
      outcome.includes('no response') ||
      outcome.includes('no engagement'))
  ) {
    return {
      type: 'mixed',
      explanation: 'You showed up, but the approach needs work.',
    }
  }

  // Weak signal: not completed or struggled
  return {
    type: 'weak',
    explanation: 'No meaningful signal generated yet.',
  }
}

function determinePathAdjustment(
  signalType: 'weak' | 'mixed' | 'strong',
  currentDirection: Direction,
  currentAction: string
): { adjustment: 'double_down' | 'narrow' | 'pivot' | 'escalate'; nextAction: string } {
  const ACTION_PROGRESSIONS = {
    'E-commerce': {
      double_down: 'List 10 more products and optimize based on what sold',
      narrow: 'Focus only on the product category that got interest',
      pivot: 'Try a different sales channel or product type',
      escalate: 'Commit to $1000 in revenue this month',
    },
    Service: {
      double_down: 'Reach out to 20 more potential clients with your offer',
      narrow: 'Target only the specific niche that responded',
      pivot: 'Change your service offering based on feedback',
      escalate: 'Commit to landing 3 paying clients this month',
    },
    Content: {
      double_down: 'Publish 10 more pieces in the same format',
      narrow: 'Focus only on the topic that got engagement',
      pivot: 'Try a completely different content format or platform',
      escalate: 'Commit to building 1000 followers this month',
    },
  }

  if (signalType === 'strong') {
    return {
      adjustment: 'double_down',
      nextAction: ACTION_PROGRESSIONS[currentDirection].double_down,
    }
  }

  if (signalType === 'mixed') {
    return {
      adjustment: 'narrow',
      nextAction: ACTION_PROGRESSIONS[currentDirection].narrow,
    }
  }

  // Weak signal: alternate between pivot and escalate
  const shouldPivot = Math.random() > 0.5
  return {
    adjustment: shouldPivot ? 'pivot' : 'escalate',
    nextAction: shouldPivot
      ? ACTION_PROGRESSIONS[currentDirection].pivot
      : ACTION_PROGRESSIONS[currentDirection].escalate,
  }
}

export default function CheckInPage() {
  const [step, setStep] = useState<Step>('loading')
  const [commitment, setCommitment] = useState<Commitment | null>(null)
  const [direction, setDirection] = useState<Direction | null>(null)
  const [completed, setCompleted] = useState<boolean | null>(null)
  const [outcome, setOutcome] = useState('')
  const [learned, setLearned] = useState('')
  const [signal, setSignal] = useState<{ type: 'weak' | 'mixed' | 'strong'; explanation: string } | null>(null)
  const [adjustment, setAdjustment] = useState<{ adjustment: string; nextAction: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadCommitment() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      // Get active commitment
      const { data: commitmentData } = await supabase
        .from('commitments')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle<Commitment>()

      if (!commitmentData) {
        router.push('/dashboard')
        return
      }

      // Get direction
      const { data: userState } = await supabase
        .from('user_state')
        .select('current_direction')
        .eq('user_id', user.id)
        .single()

      setCommitment(commitmentData)
      setDirection(userState?.current_direction as Direction)
      setStep('completed')
    }

    loadCommitment()
  }, [router, supabase])

  const handleCompleted = (value: boolean) => {
    setCompleted(value)
    setStep('outcome')
  }

  const handleOutcome = (value: string) => {
    setOutcome(value)
    setStep('learned')
  }

  const handleLearned = (value: string) => {
    setLearned(value)
    setStep('processing')

    // Calculate signal and adjustment
    const signalResult = classifySignal(completed!, value, learned)
    const adjustmentResult = determinePathAdjustment(signalResult.type, direction!, commitment!.action)

    setSignal(signalResult)
    setAdjustment(adjustmentResult)

    // Save to database
    saveCheckIn(signalResult, adjustmentResult)

    setTimeout(() => setStep('result'), 2000)
  }

  const saveCheckIn = async (
    signalResult: { type: 'weak' | 'mixed' | 'strong'; explanation: string },
    adjustmentResult: { adjustment: string; nextAction: string }
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || !commitment) return

    // Save check-in
    await supabase.from('check_ins').insert({
      user_id: user.id,
      commitment_id: commitment.id,
      completed: completed!,
      outcome,
      learned,
      signal_type: signalResult.type,
      signal_explanation: signalResult.explanation,
      path_adjustment: adjustmentResult.adjustment,
      next_action: adjustmentResult.nextAction,
    })

    // Mark commitment as complete
    await supabase
      .from('commitments')
      .update({ is_active: false, completed_at: new Date().toISOString() })
      .eq('id', commitment.id)

    // Create new commitment
    const deadline = new Date()
    deadline.setDate(deadline.getDate() + 7)
    await supabase.from('commitments').insert({
      user_id: user.id,
      action: adjustmentResult.nextAction,
      deadline: deadline.toISOString(),
      is_active: true,
    })
  }

  const handleContinue = () => {
    router.push('/dashboard')
    router.refresh()
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (step === 'completed') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold mb-4">Check in</h1>
          <p className="text-gray-400 mb-12">
            Your commitment: <span className="text-white font-medium">{commitment?.action}</span>
          </p>
          <p className="text-2xl mb-12">Did you complete it?</p>
          <div className="space-y-4">
            <button
              onClick={() => handleCompleted(true)}
              className="w-full p-6 border-2 border-gray-700 rounded-lg hover:border-white hover:bg-gray-900 transition-all text-xl font-bold"
            >
              Yes
            </button>
            <button
              onClick={() => handleCompleted(false)}
              className="w-full p-6 border-2 border-gray-700 rounded-lg hover:border-white hover:bg-gray-900 transition-all text-xl font-bold"
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'outcome' && direction) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold mb-4">What happened?</h1>
          <p className="text-gray-400 mb-12">Pick the closest match</p>
          <div className="space-y-4">
            {OUTCOME_OPTIONS[direction].map((option) => (
              <button
                key={option}
                onClick={() => handleOutcome(option)}
                className="w-full text-left p-6 border-2 border-gray-700 rounded-lg hover:border-white hover:bg-gray-900 transition-all text-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === 'learned') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl font-bold mb-4">What did you learn?</h1>
          <p className="text-gray-400 mb-12">Be honest</p>
          <div className="space-y-4">
            {LEARNED_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleLearned(option)}
                className="w-full text-left p-6 border-2 border-gray-700 rounded-lg hover:border-white hover:bg-gray-900 transition-all text-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-fadeIn">
          <h1 className="text-5xl font-bold mb-6">Analyzing...</h1>
          <p className="text-xl text-gray-300">Reading the signal</p>
        </div>
      </div>
    )
  }

  if (step === 'result' && signal && adjustment) {
    const signalColors = {
      strong: 'text-green-400 border-green-500',
      mixed: 'text-yellow-400 border-yellow-500',
      weak: 'text-red-400 border-red-500',
    }

    const adjustmentLabels = {
      double_down: 'DOUBLE DOWN',
      narrow: 'NARROW FOCUS',
      pivot: 'PIVOT',
      escalate: 'ESCALATE',
    }

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className={`mb-8 p-6 border-2 rounded-lg ${signalColors[signal.type]}`}>
            <p className="text-sm uppercase tracking-wider mb-2">Signal</p>
            <p className="text-3xl font-bold mb-3 uppercase">{signal.type}</p>
            <p className="text-lg">{signal.explanation}</p>
          </div>

          <div className="mb-8 p-6 border-2 border-white rounded-lg">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Path adjustment</p>
            <p className="text-2xl font-bold mb-4">{adjustmentLabels[adjustment.adjustment as keyof typeof adjustmentLabels]}</p>
            <p className="text-gray-300">New action: {adjustment.nextAction}</p>
          </div>

          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-white text-black rounded-lg text-lg font-bold hover:bg-gray-100 transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  return null
}
