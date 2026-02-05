import type { ChapterOutput } from '@/lib/types'

export interface BusinessSummarySection {
  label: string
  value: string
}

export interface BusinessSummaryData {
  sections: {
    title: string
    items: BusinessSummarySection[]
  }[]
}

function getOutputValue(
  outputs: ChapterOutput[],
  chapterIdSubstring: string,
  fieldName: string
): string {
  const chapter = outputs.find((o) => o.chapter_id.includes(chapterIdSubstring))
  return chapter?.outputs?.[fieldName] || ''
}

function synthesizeClientServices(outputs: ChapterOutput[]): BusinessSummaryData {
  return {
    sections: [
      {
        title: 'What you do',
        items: [
          { label: 'Service', value: getOutputValue(outputs, 'ch1_', 'service_offering') },
          { label: 'What clients get', value: getOutputValue(outputs, 'ch1_', 'what_they_get') },
          { label: 'Pricing', value: getOutputValue(outputs, 'ch4_', 'pricing') },
        ].filter((i) => i.value),
      },
      {
        title: 'Who it is for',
        items: [
          { label: 'Target client', value: getOutputValue(outputs, 'ch1_', 'target_client') },
          { label: 'Ideal client', value: getOutputValue(outputs, 'ch2_', 'ideal_client_description') },
          { label: 'Where to find them', value: getOutputValue(outputs, 'ch2_', 'where_to_find') },
        ].filter((i) => i.value),
      },
      {
        title: 'How you stand out',
        items: [
          { label: 'Proof', value: getOutputValue(outputs, 'ch3_', 'proof') },
          { label: 'Why you', value: getOutputValue(outputs, 'ch3_', 'why_you') },
        ].filter((i) => i.value),
      },
      {
        title: 'Traction so far',
        items: [
          { label: 'Who you contacted', value: getOutputValue(outputs, 'ch4_', 'who_contacted') },
          { label: 'Responses', value: getOutputValue(outputs, 'ch4_', 'responses') },
        ].filter((i) => i.value),
      },
      {
        title: 'Delivery system',
        items: [
          { label: 'Process steps', value: getOutputValue(outputs, 'ch5_', 'process_steps') },
          { label: 'Timeline', value: getOutputValue(outputs, 'ch5_', 'how_long') },
        ].filter((i) => i.value),
      },
      {
        title: 'Direction',
        items: [
          { label: 'Decision', value: getOutputValue(outputs, 'ch6_', 'decision') },
          { label: 'Reason', value: getOutputValue(outputs, 'ch6_', 'reason') },
        ].filter((i) => i.value),
      },
    ].filter((s) => s.items.length > 0),
  }
}

function synthesizeSoftware(outputs: ChapterOutput[]): BusinessSummaryData {
  return {
    sections: [
      {
        title: 'What you are building',
        items: [
          { label: 'Product idea', value: getOutputValue(outputs, 'ch1_', 'product_idea') },
          { label: 'Core feature', value: getOutputValue(outputs, 'ch2_', 'core_feature') },
          { label: 'Not building', value: getOutputValue(outputs, 'ch2_', 'not_building') },
        ].filter((i) => i.value),
      },
      {
        title: 'Who it is for',
        items: [
          { label: 'Target user', value: getOutputValue(outputs, 'ch1_', 'target_user') },
          { label: 'Problem', value: getOutputValue(outputs, 'ch1_', 'problem') },
        ].filter((i) => i.value),
      },
      {
        title: 'Validation',
        items: [
          { label: 'Who you talked to', value: getOutputValue(outputs, 'ch3_', 'who_talked_to') },
          { label: 'What they said', value: getOutputValue(outputs, 'ch3_', 'what_they_said') },
          { label: 'Decision', value: getOutputValue(outputs, 'ch3_', 'decision') },
        ].filter((i) => i.value),
      },
      {
        title: 'First version',
        items: [
          { label: 'What you built', value: getOutputValue(outputs, 'ch4_', 'what_built') },
          { label: 'Where to access', value: getOutputValue(outputs, 'ch4_', 'where_access') },
        ].filter((i) => i.value),
      },
      {
        title: 'First users',
        items: [
          { label: 'How many users', value: getOutputValue(outputs, 'ch5_', 'how_many_users') },
          { label: 'Did they use it', value: getOutputValue(outputs, 'ch5_', 'did_they_use_it') },
          { label: 'Feedback', value: getOutputValue(outputs, 'ch5_', 'feedback') },
        ].filter((i) => i.value),
      },
      {
        title: 'Direction',
        items: [
          { label: 'Decision', value: getOutputValue(outputs, 'ch6_', 'decision') },
          { label: 'Reason', value: getOutputValue(outputs, 'ch6_', 'reason') },
        ].filter((i) => i.value),
      },
    ].filter((s) => s.items.length > 0),
  }
}

function synthesizeProductized(outputs: ChapterOutput[]): BusinessSummaryData {
  return {
    sections: [
      {
        title: 'Your package',
        items: [
          { label: 'Offer name', value: getOutputValue(outputs, 'ch1_', 'offer_name') },
          { label: 'What is included', value: getOutputValue(outputs, 'ch1_', 'what_included') },
          { label: 'What is not included', value: getOutputValue(outputs, 'ch1_', 'what_not_included') },
          { label: 'Price', value: getOutputValue(outputs, 'ch1_', 'price') },
        ].filter((i) => i.value),
      },
      {
        title: 'Process',
        items: [
          { label: 'Process', value: getOutputValue(outputs, 'ch2_', 'process') },
        ].filter((i) => i.value),
      },
      {
        title: 'Sales traction',
        items: [
          { label: 'How many sold', value: getOutputValue(outputs, 'ch3_', 'how_many_sold') },
          { label: 'Custom requests', value: getOutputValue(outputs, 'ch3_', 'custom_requests') },
        ].filter((i) => i.value),
      },
      {
        title: 'Boundaries',
        items: [
          { label: 'Request example', value: getOutputValue(outputs, 'ch4_', 'request') },
          { label: 'How handled', value: getOutputValue(outputs, 'ch4_', 'how_handled') },
        ].filter((i) => i.value),
      },
      {
        title: 'Volume',
        items: [
          { label: 'Total delivered', value: getOutputValue(outputs, 'ch5_', 'total_delivered') },
          { label: 'Bottlenecks', value: getOutputValue(outputs, 'ch5_', 'bottlenecks') },
        ].filter((i) => i.value),
      },
      {
        title: 'Direction',
        items: [
          { label: 'Choice', value: getOutputValue(outputs, 'ch6_', 'choice') },
        ].filter((i) => i.value),
      },
    ].filter((s) => s.items.length > 0),
  }
}

function synthesizeAudience(outputs: ChapterOutput[]): BusinessSummaryData {
  return {
    sections: [
      {
        title: 'Content focus',
        items: [
          { label: 'Topic', value: getOutputValue(outputs, 'ch1_', 'topic') },
          { label: 'Who cares', value: getOutputValue(outputs, 'ch1_', 'who_cares') },
        ].filter((i) => i.value),
      },
      {
        title: 'Platform',
        items: [
          { label: 'Platform', value: getOutputValue(outputs, 'ch2_', 'platform') },
          { label: 'Why this platform', value: getOutputValue(outputs, 'ch2_', 'why_this_platform') },
        ].filter((i) => i.value),
      },
      {
        title: 'Content traction',
        items: [
          { label: 'Posts count', value: getOutputValue(outputs, 'ch3_', 'posts_count') },
          { label: 'What worked', value: getOutputValue(outputs, 'ch3_', 'what_worked') },
        ].filter((i) => i.value),
      },
      {
        title: 'Growth',
        items: [
          { label: 'Growth content', value: getOutputValue(outputs, 'ch4_', 'growth_content') },
          { label: 'Follower count', value: getOutputValue(outputs, 'ch4_', 'follower_count') },
        ].filter((i) => i.value),
      },
      {
        title: 'Monetization signals',
        items: [
          { label: 'What tested', value: getOutputValue(outputs, 'ch5_', 'what_tested') },
          { label: 'Response', value: getOutputValue(outputs, 'ch5_', 'response') },
        ].filter((i) => i.value),
      },
      {
        title: 'First monetization',
        items: [
          { label: 'What sold', value: getOutputValue(outputs, 'ch6_', 'what_sold') },
          { label: 'Revenue', value: getOutputValue(outputs, 'ch6_', 'revenue') },
        ].filter((i) => i.value),
      },
    ].filter((s) => s.items.length > 0),
  }
}

function synthesizeMarketplace(outputs: ChapterOutput[]): BusinessSummaryData {
  return {
    sections: [
      {
        title: 'Marketplace concept',
        items: [
          { label: 'Connecting who', value: getOutputValue(outputs, 'ch1_', 'connecting_who') },
          { label: 'Transaction', value: getOutputValue(outputs, 'ch1_', 'transaction') },
          { label: 'Why marketplace', value: getOutputValue(outputs, 'ch1_', 'why_marketplace') },
        ].filter((i) => i.value),
      },
      {
        title: 'Strategy',
        items: [
          { label: 'Which side first', value: getOutputValue(outputs, 'ch2_', 'which_side') },
          { label: 'Why this side', value: getOutputValue(outputs, 'ch2_', 'why_this_side') },
        ].filter((i) => i.value),
      },
      {
        title: 'Supply side',
        items: [
          { label: 'How many', value: getOutputValue(outputs, 'ch3_', 'how_many') },
          { label: 'How recruited', value: getOutputValue(outputs, 'ch3_', 'how_recruited') },
        ].filter((i) => i.value),
      },
      {
        title: 'Demand side',
        items: [
          { label: 'How many', value: getOutputValue(outputs, 'ch4_', 'how_many_second') },
          { label: 'Transactions', value: getOutputValue(outputs, 'ch4_', 'transactions') },
        ].filter((i) => i.value),
      },
      {
        title: 'Liquidity',
        items: [
          { label: 'Repeat transactions', value: getOutputValue(outputs, 'ch5_', 'repeat_transactions') },
          { label: 'Manual intervention', value: getOutputValue(outputs, 'ch5_', 'manual_intervention') },
        ].filter((i) => i.value),
      },
      {
        title: 'Direction',
        items: [
          { label: 'Strategy', value: getOutputValue(outputs, 'ch6_', 'strategy') },
        ].filter((i) => i.value),
      },
    ].filter((s) => s.items.length > 0),
  }
}

export function synthesizeBusinessSummary(
  pathId: string,
  outputs: ChapterOutput[]
): BusinessSummaryData {
  const completedOutputs = outputs.filter((o) => o.completed)

  switch (pathId) {
    case 'client_services':
      return synthesizeClientServices(completedOutputs)
    case 'software_digital_product':
      return synthesizeSoftware(completedOutputs)
    case 'productized_services':
      return synthesizeProductized(completedOutputs)
    case 'audience_monetization':
      return synthesizeAudience(completedOutputs)
    case 'marketplace':
      return synthesizeMarketplace(completedOutputs)
    default:
      return { sections: [] }
  }
}
