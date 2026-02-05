import type { Direction } from './types'

export interface Insight {
  id: string
  type: 'direction_choice' | 'action_choice' | 'signal_interpretation' | 'confidence_update'
  context: string
  content: string
  trigger: string
}

// Direction Choice Insights
export const DIRECTION_INSIGHTS: Record<Direction, Insight> = {
  'E-commerce': {
    id: 'dir_ecommerce',
    type: 'direction_choice',
    context: 'E-commerce',
    trigger: 'Before choosing E-commerce path',
    content:
      'E-commerce feels concrete because you can point at revenue immediately. The trap: most first products fail because founders optimize the product before proving the channel. You will waste weeks on inventory, design, and features that do not matter if you cannot acquire customers profitably. Choose this only if you can commit to ruthlessly testing acquisition first.',
  },
  Service: {
    id: 'dir_service',
    type: 'direction_choice',
    context: 'Service',
    trigger: 'Before choosing Service path',
    content:
      'Service businesses feel safer because revenue is immediate and predictable. The constraint: your time becomes the product, and most founders underestimate how quickly this caps growth. By month 6, you will either automate, hire, or plateau. This path is best as a bridge, not a destination. Choose this if you need cash flow now and have a plan to productize later.',
  },
  Content: {
    id: 'dir_content',
    type: 'direction_choice',
    context: 'Content',
    trigger: 'Before choosing Content path',
    content:
      'Content paths look appealing because leverage feels infinite. Reality: 90% of people quit before the algorithm rewards consistency. Monetization lags audience by 6-12 months minimum, and most creators never find product-market fit. Choose this only if you can withstand long periods of no tangible feedback and are optimizing for long-term optionality over near-term revenue.',
  },
}

// Action Choice Insights
export const ACTION_INSIGHTS: Record<
  Direction,
  { smallStep: Insight; mediumStep: Insight; largeStep: Insight }
> = {
  'E-commerce': {
    smallStep: {
      id: 'action_ecom_list',
      type: 'action_choice',
      context: 'E-commerce - List one product',
      trigger: 'Before committing to listing a product',
      content:
        'Listing one product is the minimum test, but it tells you almost nothing about real demand. What matters is traffic quality and conversion, not the product itself. Most beginners optimize creative and copy before proving they can drive traffic at all. This action is only valuable if you are testing a distribution hypothesis, not a product hypothesis.',
    },
    mediumStep: {
      id: 'action_ecom_customers',
      type: 'action_choice',
      context: 'E-commerce - Talk to customers',
      trigger: 'Before committing to customer conversations',
      content:
        'Talking to potential customers feels productive, but most founders confuse interest with intent. People lie in conversations—they say yes to be polite, then ghost when you ask for money. The only signal that matters is whether they buy without you asking twice. Use this action to test willingness to pay, not to validate product ideas.',
    },
    largeStep: {
      id: 'action_ecom_research',
      type: 'action_choice',
      context: 'E-commerce - Research competitors',
      trigger: 'Before committing to competitor research',
      content:
        'Researching competitors is useful for understanding market structure, but dangerous if it becomes procrastination. Most beginners study competitors to delay launching. The best competitor research happens after you have your own data—when you know what questions to ask. If you choose this, set a hard time limit and focus only on pricing and acquisition channels.',
    },
  },
  Service: {
    smallStep: {
      id: 'action_service_post',
      type: 'action_choice',
      context: 'Service - Post offer publicly',
      trigger: 'Before committing to posting publicly',
      content:
        'Posting your offer publicly is the fastest way to test if your positioning resonates, but most beginners make the offer too vague or too cheap. If you get no response, you learn nothing. If you get interest but no conversions, your offer is unclear. Price at the high end of reasonable—serious buyers will negotiate down, but low prices attract tire-kickers who waste your time.',
    },
    mediumStep: {
      id: 'action_service_outreach',
      type: 'action_choice',
      context: 'Service - Reach out to clients',
      trigger: 'Before committing to outreach',
      content:
        'Outreach works, but only if your offer is sharp and your targeting is narrow. Most founders fail because they pitch too broadly or wait for referrals. The pattern: 50 cold messages gets 5 replies, 1 call, 0 conversions if your offer is generic. Expect 90% no-response rate, and optimize for learning what objections actually are—not for closing deals immediately.',
    },
    largeStep: {
      id: 'action_service_portfolio',
      type: 'action_choice',
      context: 'Service - Build portfolio piece',
      trigger: 'Before committing to portfolio work',
      content:
        'Building a case study or portfolio piece signals credibility, but most beginners overinvest in polish before proving the market cares. The trap: spending weeks on a perfect case study for a service nobody wants. Only do this if you already have proof that your offer converts in conversation. Otherwise, ugly proof of work beats beautiful hypotheticals.',
    },
  },
  Content: {
    smallStep: {
      id: 'action_content_publish',
      type: 'action_choice',
      context: 'Content - Publish one piece',
      trigger: 'Before committing to publishing content',
      content:
        'Publishing one piece of content is necessary but not sufficient. The algorithm needs volume and consistency before it rewards you. One viral post is noise, not signal. Most creators misinterpret early wins as validation and burn out chasing the next hit. Use this action to test content-market fit, not to build an audience. Judge success by repeat engagement, not one-time spikes.',
    },
    mediumStep: {
      id: 'action_content_research',
      type: 'action_choice',
      context: 'Content - Research successful creators',
      trigger: 'Before committing to creator research',
      content:
        'Studying successful creators is valuable for understanding format and pacing, but dangerous if you copy their topics. What worked for them in 2022 is saturated now. The insight: successful creators found white space early, then optimized format. You need to find your own white space first. Use this to study structure and distribution, not content ideas.',
    },
    largeStep: {
      id: 'action_content_daily',
      type: 'action_choice',
      context: 'Content - Post daily for 7 days',
      trigger: 'Before committing to daily posting',
      content:
        'Posting daily for a week tests consistency, but most beginners mistake activity for progress. The pattern: day 1-3 feels productive, day 4-7 feels pointless because engagement is flat. This is normal—algorithms need weeks of data before they trust you. The real test is whether you can sustain this for 90 days, not 7. Use this week to build the system, not the audience.',
    },
  },
}

// Signal Interpretation Insights
export function getSignalInsight(
  signalType: 'weak' | 'mixed' | 'strong',
  direction: Direction,
  completed: boolean
): Insight {
  if (signalType === 'strong') {
    return {
      id: `signal_strong_${direction.toLowerCase()}`,
      type: 'signal_interpretation',
      context: `Strong signal in ${direction}`,
      trigger: 'After receiving strong signal',
      content:
        'Strong signal means the market is responding, but most founders overindex on single wins. One sale, one client, or one viral post is an outlier until proven repeatable. The next action should test whether this result was luck or a pattern. Increase volume before increasing investment. Expect regression to the mean—your next result will likely be weaker.',
    }
  }

  if (signalType === 'mixed') {
    return {
      id: `signal_mixed_${direction.toLowerCase()}`,
      type: 'signal_interpretation',
      context: `Mixed signal in ${direction}`,
      trigger: 'After receiving mixed signal',
      content:
        'Mixed signal means your effort created activity but not clear results. Most founders interpret this as "almost there" and double down on the same approach. The pattern: mixed signals stay mixed for months if the core offer is unclear. Your next action should narrow, not amplify. Test a smaller, sharper version before scaling what does not yet work.',
    }
  }

  // weak signal
  if (!completed) {
    return {
      id: `signal_weak_incomplete_${direction.toLowerCase()}`,
      type: 'signal_interpretation',
      context: `Weak signal (incomplete) in ${direction}`,
      trigger: 'After not completing action',
      content:
        'Not completing the action tells you more than you think. Most founders blame external factors, but the pattern is internal: if the action felt too hard, your belief in the path is weak. This is useful information. The next action should either increase stakes (escalate) to force commitment, or pivot entirely. Weak belief compounds into weak execution.',
    }
  }

  return {
    id: `signal_weak_completed_${direction.toLowerCase()}`,
    type: 'signal_interpretation',
    context: `Weak signal (completed) in ${direction}`,
    trigger: 'After completing action with weak results',
    content:
      'You showed up, but the market did not respond. Most founders misinterpret this as bad execution when it is often bad product-market fit. The pattern: if three consecutive experiments yield weak signal, the offer is wrong, not the effort. Your next action should either test a fundamentally different angle (pivot) or increase commitment to force signal (escalate). Marginal tweaks will not save a broken hypothesis.',
  }
}

// Confidence Update Insights
export function getConfidenceInsight(
  checkInCount: number,
  recentSignals: Array<'weak' | 'mixed' | 'strong'>
): Insight | null {
  if (checkInCount < 2) return null

  const strongCount = recentSignals.filter((s) => s === 'strong').length
  const weakCount = recentSignals.filter((s) => s === 'weak').length

  // Overconfidence check
  if (strongCount >= 2 && checkInCount < 5) {
    return {
      id: 'confidence_overconfident',
      type: 'confidence_update',
      context: 'Multiple strong signals early',
      trigger: 'After 2+ strong signals in first 5 check-ins',
      content:
        'Multiple strong signals this early suggests you may be in a local maximum. Most founders mistake early wins for sustainable patterns and scale prematurely. The base rate: 70% of "strong starts" plateau by month 3 when novelty wears off. Your confidence should increase slowly. Test durability before increasing investment.',
    }
  }

  // Underconfidence check
  if (weakCount >= 3 && checkInCount >= 3) {
    return {
      id: 'confidence_underconfident',
      type: 'confidence_update',
      context: 'Multiple weak signals',
      trigger: 'After 3+ weak signals',
      content:
        'Three consecutive weak signals is not noise—it is data. Most founders stay in denial and keep tweaking variables instead of questioning the core hypothesis. The pattern: if the market does not respond after three real attempts, the offer is fundamentally misaligned. This is not a failure, it is information. Pivot now, before sunk cost makes it harder.',
    }
  }

  // Mixed signals pattern
  const mixedCount = recentSignals.filter((s) => s === 'mixed').length
  if (mixedCount >= 2) {
    return {
      id: 'confidence_mixed_pattern',
      type: 'confidence_update',
      context: 'Repeated mixed signals',
      trigger: 'After 2+ mixed signals',
      content:
        'Repeated mixed signals suggest your execution is fine but your positioning is unclear. Most founders in this state keep "optimizing" but never achieve clarity. The insight: mixed signals do not resolve themselves with more effort. You need a forcing function—either narrow your target dramatically or escalate commitment to force real yes/no decisions. Lukewarm markets stay lukewarm.',
    }
  }

  return null
}

// Get insight for a specific decision point
export function getInsightForContext(
  context: 'direction' | 'action',
  direction?: Direction,
  actionIndex?: number
): Insight | null {
  if (context === 'direction' && direction) {
    return DIRECTION_INSIGHTS[direction]
  }

  if (context === 'action' && direction && actionIndex !== undefined) {
    const steps = ['smallStep', 'mediumStep', 'largeStep'] as const
    return ACTION_INSIGHTS[direction][steps[actionIndex]] || null
  }

  return null
}
