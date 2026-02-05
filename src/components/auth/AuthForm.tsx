'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        })
        if (error) throw error

        // Check if email confirmation is required
        if (data?.user && !data.session) {
          setSuccess('Account created! Please check your email to confirm your account.')
        } else {
          // Email confirmation disabled, user is logged in immediately
          router.push('/dashboard')
          router.refresh()
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="input"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            background: 'var(--color-danger-subtle)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: 'var(--color-danger)'
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="p-4 rounded-lg text-sm"
          style={{
            background: 'var(--color-success-subtle)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: 'var(--color-success)'
          }}
        >
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary btn-shine w-full"
        style={{ padding: '0.875rem 1.5rem' }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
          </span>
        ) : (
          mode === 'signup' ? 'Create account' : 'Sign in'
        )}
      </button>

      <p className="text-center text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="font-medium transition-colors hover:text-white"
              style={{ color: 'var(--color-accent)' }}
            >
              Sign in
            </a>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <a
              href="/auth/signup"
              className="font-medium transition-colors hover:text-white"
              style={{ color: 'var(--color-accent)' }}
            >
              Create one
            </a>
          </>
        )}
      </p>
    </form>
  )
}
