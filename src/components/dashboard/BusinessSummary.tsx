import type { ChapterOutput } from '@/lib/types'
import { synthesizeBusinessSummary } from '@/lib/businessSummary'

interface BusinessSummaryProps {
  pathId: string
  outputs: ChapterOutput[]
}

export default function BusinessSummary({ pathId, outputs }: BusinessSummaryProps) {
  const summary = synthesizeBusinessSummary(pathId, outputs)

  if (summary.sections.length === 0) {
    return null
  }

  return (
    <div className="card p-8">
      <h3 className="stat-label mb-6">Your business at a glance</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {summary.sections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg p-5"
            style={{ background: 'var(--color-surface-2)' }}
          >
            <h4 className="stat-label mb-4" style={{ fontSize: '0.7rem' }}>
              {section.title}
            </h4>
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.label}>
                  <span
                    className="text-xs block mb-0.5"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {item.label}
                  </span>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
