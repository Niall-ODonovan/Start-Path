export type { Chapter } from './types'

import { SOFTWARE_CHAPTERS } from './software'
import { CLIENT_SERVICES_CHAPTERS } from './clientServices'
import { PRODUCTIZED_SERVICES_CHAPTERS } from './productizedServices'
import { AUDIENCE_CHAPTERS } from './audience'
import { MARKETPLACE_CHAPTERS } from './marketplace'

export {
  SOFTWARE_CHAPTERS,
  CLIENT_SERVICES_CHAPTERS,
  PRODUCTIZED_SERVICES_CHAPTERS,
  AUDIENCE_CHAPTERS,
  MARKETPLACE_CHAPTERS,
}

export const ALL_CHAPTERS = [
  ...SOFTWARE_CHAPTERS,
  ...CLIENT_SERVICES_CHAPTERS,
  ...PRODUCTIZED_SERVICES_CHAPTERS,
  ...AUDIENCE_CHAPTERS,
  ...MARKETPLACE_CHAPTERS,
]

// Helper function to get chapters for a specific path
export function getChaptersForPath(pathId: string) {
  return ALL_CHAPTERS.filter((ch) => ch.pathId === pathId).sort((a, b) => a.sequence - b.sequence)
}

// Helper function to get a specific chapter
export function getChapter(chapterId: string) {
  return ALL_CHAPTERS.find((ch) => ch.id === chapterId)
}

// Helper function to get next chapter
export function getNextChapter(currentChapterId: string) {
  const current = getChapter(currentChapterId)
  if (!current) return undefined

  const pathChapters = getChaptersForPath(current.pathId)
  const nextSequence = current.sequence + 1
  return pathChapters.find((ch) => ch.sequence === nextSequence)
}

// Map path names to path IDs
export const PATH_NAME_TO_ID: Record<string, string> = {
  'Client Services': 'client_services',
  'Productized Services': 'productized_services',
  'Audience → Monetization': 'audience_monetization',
  'Software / Digital Product': 'software_digital_product',
  'SaaS / Software': 'software_digital_product',
  'Digital Products': 'software_digital_product',
  'Marketplace / Platform': 'marketplace',
}
