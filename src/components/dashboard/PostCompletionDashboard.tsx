import type {
  ChapterOutput,
  WeeklyCheckIn,
  FinancialEntry,
  MilestoneRecord,
  PathCompletion,
} from '@/lib/types'
import type { MilestoneDefinition } from '@/lib/milestones'
import LogoutButton from '@/components/LogoutButton'
import OverviewTab from './OverviewTab'
import WeeklyCheckInForm from './WeeklyCheckInForm'
import CheckInHistory from './CheckInHistory'
import FinancesTab from './FinancesTab'
import MilestonesTab from './MilestonesTab'
import ExportTab from './ExportTab'

type Tab = 'overview' | 'checkin' | 'finances' | 'milestones' | 'export'

interface PostCompletionDashboardProps {
  userId: string
  pathId: string
  pathName: string
  pathCompletion: PathCompletion
  outputs: ChapterOutput[]
  checkIns: WeeklyCheckIn[]
  financialEntries: FinancialEntry[]
  milestones: MilestoneDefinition[]
  completedMilestones: MilestoneRecord[]
  activeTab: Tab
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'checkin', label: 'Check-in' },
  { key: 'finances', label: 'Finances' },
  { key: 'milestones', label: 'Milestones' },
  { key: 'export', label: 'Export' },
]

function getMonday(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

export default function PostCompletionDashboard({
  userId,
  pathId,
  pathName,
  pathCompletion,
  outputs,
  checkIns,
  financialEntries,
  milestones,
  completedMilestones,
  activeTab,
}: PostCompletionDashboardProps) {
  const monday = getMonday()
  const hasCheckInThisWeek = checkIns.some((c) => c.week_of === monday)
  const latestCheckIn = checkIns.length > 0 ? checkIns[0] : null

  const totalRevenue = financialEntries
    .filter((e) => e.type === 'revenue')
    .reduce((sum, e) => sum + Number(e.amount), 0)
  const totalExpenses = financialEntries
    .filter((e) => e.type === 'expense')
    .reduce((sum, e) => sum + Number(e.amount), 0)

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
              {pathName}
            </h1>
            <div className="flex items-center gap-2">
              <span className="badge badge-success">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Path completed
              </span>
            </div>
          </div>
          <LogoutButton />
        </div>

        {/* Tab navigation */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="tabs">
            {TABS.map((tab) => (
              <a
                key={tab.key}
                href={`/dashboard?tab=${tab.key}`}
                className={`tab ${activeTab === tab.key ? 'tab-active' : ''}`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
          {activeTab === 'overview' && (
            <OverviewTab
              pathId={pathId}
              pathName={pathName}
              completedAt={pathCompletion.completed_at}
              outputs={outputs}
              latestCheckIn={latestCheckIn}
              hasCheckInThisWeek={hasCheckInThisWeek}
              financialEntries={financialEntries}
              milestones={milestones}
              completedMilestones={completedMilestones}
            />
          )}

          {activeTab === 'checkin' && (
            <div className="space-y-8">
              <WeeklyCheckInForm userId={userId} />
              <CheckInHistory checkIns={checkIns} />
            </div>
          )}

          {activeTab === 'finances' && (
            <FinancesTab userId={userId} initialEntries={financialEntries} />
          )}

          {activeTab === 'milestones' && (
            <MilestonesTab
              userId={userId}
              pathId={pathId}
              initialCompleted={completedMilestones}
            />
          )}

          {activeTab === 'export' && (
            <ExportTab
              pathId={pathId}
              pathName={pathName}
              completedAt={pathCompletion.completed_at}
              outputs={outputs}
              milestones={milestones}
              completedMilestones={completedMilestones}
              totalRevenue={totalRevenue}
              totalExpenses={totalExpenses}
            />
          )}
        </div>
      </div>
    </div>
  )
}
