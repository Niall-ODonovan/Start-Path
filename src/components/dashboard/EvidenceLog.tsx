'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { Evidence } from '@/lib/types'

interface EvidenceLogProps {
  evidence: Evidence[]
}

export default function EvidenceLog({ evidence }: EvidenceLogProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [observation, setObservation] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!observation.trim()) return

    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      await supabase.from('evidence').insert({
        user_id: user.id,
        observation: observation.trim(),
      })

      setObservation('')
      setIsAdding(false)
      router.refresh()
    } catch (error) {
      console.error('Error adding evidence:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Evidence</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-sm px-4 py-2 border border-black rounded-lg hover:bg-gray-50"
          >
            Add observation
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 pb-6 border-b border-gray-200">
          <textarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="What did you observe? (Not what you think, but what actually happened)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              disabled={loading || !observation.trim()}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 text-sm"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false)
                setObservation('')
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {evidence && evidence.length > 0 ? (
        <div className="space-y-4">
          {evidence.map((item) => (
            <div key={item.id} className="border-l-2 border-gray-300 pl-4">
              <p className="text-gray-800">{item.observation}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-sm">
          No evidence collected yet. Add observations as you take action.
        </p>
      )}
    </div>
  )
}
