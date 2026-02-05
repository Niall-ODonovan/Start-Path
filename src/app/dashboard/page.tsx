import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
import { getChapter, getChaptersForPath } from '@/lib/chapters'
import { BUSINESS_PATHS } from '@/lib/businessPaths'
import { getMilestonesForPath } from '@/lib/milestones'
import PostCompletionDashboard from '@/components/dashboard/PostCompletionDashboard'
import type {
  UserState,
  BusinessProfile,
  ChapterProgress,
  ChapterOutput,
  PathCompletion,
  WeeklyCheckIn,
  FinancialEntry,
  MilestoneRecord,
} from '@/lib/types'

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user state
  const { data: userState } = await supabase
    .from('user_state')
    .select('*')
    .eq('user_id', user.id)
    .single<UserState>()

  // Fetch business profile
  const { data: businessProfile } = await supabase
    .from('business_profile')
    .select('*')
    .eq('user_id', user.id)
    .single<BusinessProfile>()

  // Check current mode and redirect if not in operate mode
  if (userState?.current_mode === 'orient') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-fade-in">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-accent-subtle)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            First, see all your options.
          </h1>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Look at the different ways you can make money. Understand what each one actually involves.
          </p>
          <Link href="/orient" className="btn btn-primary btn-lg btn-shine">
            See options
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  if (userState?.current_mode === 'evaluate') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-fade-in">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-accent-subtle)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            Figure out what fits you.
          </h1>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Answer some questions to see which options match your situation.
          </p>
          <Link href="/evaluate" className="btn btn-primary btn-lg btn-shine">
            Answer questions
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  if (userState?.current_mode === 'commit') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-fade-in">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-accent-subtle)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            Pick one to try.
          </h1>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Choose a path and work through 6 chapters. See what happens.
          </p>
          <Link href="/commit" className="btn btn-primary btn-lg btn-shine">
            Choose one
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  // Fetch chapter progress
  const { data: chapterProgress } = await supabase
    .from('chapter_progress')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle<ChapterProgress>()

  // If no chapter progress, redirect to journey
  if (!chapterProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl text-center animate-fade-in">
          <div
            className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'var(--color-surface-2)' }}
          >
            <svg className="w-8 h-8" style={{ color: 'var(--color-text-tertiary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
          >
            Nothing active yet.
          </h1>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            You need to pick a path to start.
          </p>
          <Link href="/orient" className="btn btn-primary btn-lg btn-shine">
            Start
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  // Fetch all chapter outputs for this user
  const { data: allOutputs } = await supabase
    .from('chapter_outputs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  const completedChapters = (allOutputs || []).filter((o: ChapterOutput) => o.completed)

  // Check for path completion
  const { data: pathCompletion } = await supabase
    .from('path_completion')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle<PathCompletion>()

  const pathInfo = BUSINESS_PATHS.find((p) => p.id === chapterProgress.path_id)
  const pathName = pathInfo?.name || chapterProgress.path_id

  // POST-COMPLETION DASHBOARD
  if (pathCompletion) {
    const validTabs = ['overview', 'checkin', 'finances', 'milestones', 'export'] as const
    const activeTab = validTabs.includes(params.tab as typeof validTabs[number])
      ? (params.tab as typeof validTabs[number])
      : 'overview'

    // Fetch post-completion data in parallel
    const [checkInsResult, financialResult, milestonesResult] = await Promise.all([
      supabase
        .from('weekly_check_ins')
        .select('*')
        .eq('user_id', user.id)
        .order('week_of', { ascending: false }),
      supabase
        .from('financial_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('entry_date', { ascending: false }),
      supabase
        .from('milestones')
        .select('*')
        .eq('user_id', user.id),
    ])

    const milestoneDefinitions = getMilestonesForPath(chapterProgress.path_id)

    return (
      <PostCompletionDashboard
        userId={user.id}
        pathId={chapterProgress.path_id}
        pathName={pathName}
        pathCompletion={pathCompletion}
        outputs={(allOutputs || []) as ChapterOutput[]}
        checkIns={(checkInsResult.data || []) as WeeklyCheckIn[]}
        financialEntries={(financialResult.data || []) as FinancialEntry[]}
        milestones={milestoneDefinitions}
        completedMilestones={(milestonesResult.data || []) as MilestoneRecord[]}
        activeTab={activeTab}
      />
    )
  }

  // IN-PROGRESS DASHBOARD
  const currentChapter = getChapter(chapterProgress.current_chapter_id)
  const pathChapters = getChaptersForPath(chapterProgress.path_id)

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between animate-fade-in">
          <div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Dashboard
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              {pathName}
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Current Chapter - Hero Section */}
        <div
          className="mb-8 rounded-2xl p-10 glow-border-always depth animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, var(--color-surface-1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            animationDelay: '100ms'
          }}
        >
          <div className="mb-6">
            <p
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-accent)' }}
            >
              Chapter {chapterProgress.current_chapter_sequence} of 6
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
            >
              {currentChapter?.title || 'Current Chapter'}
            </h2>
            {currentChapter && (
              <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                {currentChapter.description}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="flex-1 h-2 rounded-full transition-all"
                  style={{
                    background:
                      num < chapterProgress.current_chapter_sequence
                        ? 'var(--color-success)'
                        : num === chapterProgress.current_chapter_sequence
                          ? 'var(--color-accent)'
                          : 'var(--color-surface-3)',
                    boxShadow:
                      num === chapterProgress.current_chapter_sequence
                        ? 'var(--shadow-glow-sm)'
                        : 'none'
                  }}
                />
              ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              {completedChapters.length} of 6 chapters completed
            </p>
          </div>

          <Link href="/chapter" className="btn btn-primary btn-lg btn-shine">
            Continue this chapter
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Business Profile */}
        {businessProfile && businessProfile.business_name && (
          <div
            className="mb-8 card p-8 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {businessProfile.business_name}
                </h2>
                <p style={{ color: 'var(--color-text-tertiary)' }}>
                  {businessProfile.business_type || 'Path not chosen yet'}
                </p>
              </div>
            </div>

            {businessProfile.problem_to_solve && businessProfile.what_offering && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div
                  className="rounded-xl p-5"
                  style={{ background: 'var(--color-surface-2)' }}
                >
                  <p className="stat-label mb-3">Who and what problem</p>
                  <p className="mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-text-primary)' }}>For:</span>{' '}
                    {businessProfile.target_customer || 'Not defined'}
                  </p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-text-primary)' }}>Problem:</span>{' '}
                    {businessProfile.problem_to_solve}
                  </p>
                </div>
                <div
                  className="rounded-xl p-5"
                  style={{ background: 'var(--color-surface-2)' }}
                >
                  <p className="stat-label mb-3">What you are offering</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {businessProfile.what_offering}
                  </p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {businessProfile.time_per_week && (
                <div>
                  <p className="stat-label mb-1">Time available</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {businessProfile.time_per_week}
                  </p>
                </div>
              )}
              {businessProfile.money_available && (
                <div>
                  <p className="stat-label mb-1">Budget</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {businessProfile.money_available}
                  </p>
                </div>
              )}
              {businessProfile.success_in_30_days && (
                <div>
                  <p className="stat-label mb-1">30-day success</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {businessProfile.success_in_30_days}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Chapter List */}
        <div
          className="card p-8 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <h3
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Path Chapters
          </h3>
          <div className="space-y-3">
            {pathChapters.map((chapter, index) => {
              const isCompleted = completedChapters.some((o) => o.chapter_id === chapter.id)
              const isCurrent = chapter.id === chapterProgress.current_chapter_id
              const isLocked = index + 1 > chapterProgress.current_chapter_sequence

              return (
                <div
                  key={chapter.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'glow-border active'
                      : ''
                  }`}
                  style={{
                    background: isCurrent
                      ? 'rgba(59, 130, 246, 0.1)'
                      : isCompleted
                        ? 'var(--color-success-subtle)'
                        : 'var(--color-surface-2)',
                    borderColor: isCurrent
                      ? 'var(--color-accent)'
                      : isCompleted
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'var(--color-border-subtle)',
                    opacity: isLocked ? 0.5 : 1
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          Chapter {chapter.sequence}
                        </span>
                        {isCompleted && (
                          <span className="badge badge-success">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                          </span>
                        )}
                        {isCurrent && (
                          <span className="badge badge-accent">Current</span>
                        )}
                        {isLocked && (
                          <span className="badge">Locked</span>
                        )}
                      </div>
                      <h4
                        className="text-lg font-semibold mb-1"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {chapter.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                        {chapter.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
