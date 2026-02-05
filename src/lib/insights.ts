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
  'Client Services': {
    id: 'dir_client_services',
    type: 'direction_choice',
    context: 'Client Services',
    trigger: 'Before choosing Client Services path',
    content:
      'Client services feel safer because revenue is immediate and predictable. The constraint: your time becomes the product, and most founders underestimate how quickly this caps growth. By month 6, you will either automate, hire, or plateau. This path is best as a bridge, not a destination. Choose this if you need cash flow now and have a plan to productize later.',
  },
  'Productized Services': {
    id: 'dir_productized_services',
    type: 'direction_choice',
    context: 'Productized Services',
    trigger: 'Before choosing Productized Services path',
    content:
      'Productized services offer leverage without the chaos of custom work. The trap: most founders productize too early before understanding what clients actually want. You need at least 10 similar client projects before you know what to standardize. Choose this only if you have already delivered the same result repeatedly and know exactly what works.',
  },
  'Audience → Monetization': {
    id: 'dir_audience',
    type: 'direction_choice',
    context: 'Audience → Monetization',
    trigger: 'Before choosing Audience path',
    content:
      'Audience paths look appealing because leverage feels infinite. Reality: 90% of people quit before the algorithm rewards consistency. Monetization lags audience by 6-12 months minimum, and most creators never find product-market fit. Choose this only if you can withstand long periods of no tangible feedback and are optimizing for long-term optionality over near-term revenue.',
  },
  'Software / Digital Product': {
    id: 'dir_software',
    type: 'direction_choice',
    context: 'Software / Digital Product',
    trigger: 'Before choosing Software path',
    content:
      'Software feels concrete because you can point at a product. The trap: most first products fail because founders build before validating demand. You will waste months on features that do not matter if you cannot acquire customers profitably. Choose this only if you can commit to ruthlessly testing demand before building.',
  },
  'Marketplace / Platform': {
    id: 'dir_marketplace',
    type: 'direction_choice',
    context: 'Marketplace / Platform',
    trigger: 'Before choosing Marketplace path',
    content:
      'Marketplaces have the highest potential but the hardest start. The chicken-and-egg problem is real: you need supply to attract demand and demand to attract supply. Most marketplace founders fail because they try to grow both sides simultaneously. Choose this only if you have a clear strategy to manually bootstrap one side first.',
  },
}

// Action Choice Insights
export const ACTION_INSIGHTS: Record<
  Direction,
  { smallStep: Insight; mediumStep: Insight; largeStep: Insight }
> = {
  'Client Services': {
    smallStep: {
      id: 'action_client_post',
      type: 'action_choice',
      context: 'Client Services - Post offer publicly',
      trigger: 'Before committing to posting publicly',
      content:
        'Posting your offer publicly is the fastest way to test if your positioning resonates, but most beginners make the offer too vague or too cheap. If you get no response, you learn nothing. If you get interest but no conversions, your offer is unclear. Price at the high end of reasonable—serious buyers will negotiate down, but low prices attract tire-kickers who waste your time.',
    },
    mediumStep: {
      id: 'action_client_outreach',
      type: 'action_choice',
      context: 'Client Services - Reach out to clients',
      trigger: 'Before committing to outreach',
      content:
        'Outreach works, but only if your offer is sharp and your targeting is narrow. Most founders fail because they pitch too broadly or wait for referrals. The pattern: 50 cold messages gets 5 replies, 1 call, 0 conversions if your offer is generic. Expect 90% no-response rate, and optimize for learning what objections actually are—not for closing deals immediately.',
    },
    largeStep: {
      id: 'action_client_portfolio',
      type: 'action_choice',
      context: 'Client Services - Build portfolio piece',
      trigger: 'Before committing to portfolio work',
      content:
        'Building a case study or portfolio piece signals credibility, but most beginners overinvest in polish before proving the market cares. The trap: spending weeks on a perfect case study for a service nobody wants. Only do this if you already have proof that your offer converts in conversation. Otherwise, ugly proof of work beats beautiful hypotheticals.',
    },
  },
  'Productized Services': {
    smallStep: {
      id: 'action_productized_define',
      type: 'action_choice',
      context: 'Productized Services - Define your package',
      trigger: 'Before committing to defining package',
      content:
        'Defining a clear package is essential but most beginners include too much. The trap: offering everything to seem valuable, then burning out on delivery. Start with the smallest possible scope that solves a real problem. You can always add more later. Test whether people will pay for the minimal version before expanding.',
    },
    mediumStep: {
      id: 'action_productized_promote',
      type: 'action_choice',
      context: 'Productized Services - Promote to past clients',
      trigger: 'Before committing to promotion',
      content:
        'Past clients are your warmest leads but most founders feel awkward selling to them. The insight: if your service helped them before, offering a productized version is a favor, not a pitch. Lead with the specific result they will get. If they say no, ask why—their objections will tell you exactly how to improve the offer.',
    },
    largeStep: {
      id: 'action_productized_automate',
      type: 'action_choice',
      context: 'Productized Services - Automate delivery',
      trigger: 'Before committing to automation',
      content:
        'Automating delivery feels efficient but most founders automate too early. The trap: building systems for a service nobody wants. You need at least 5 manual deliveries before you know what to automate. Automation should remove your bottlenecks, not hide that the offer does not convert.',
    },
  },
  'Audience → Monetization': {
    smallStep: {
      id: 'action_audience_publish',
      type: 'action_choice',
      context: 'Audience - Publish one piece',
      trigger: 'Before committing to publishing content',
      content:
        'Publishing one piece of content is necessary but not sufficient. The algorithm needs volume and consistency before it rewards you. One viral post is noise, not signal. Most creators misinterpret early wins as validation and burn out chasing the next hit. Use this action to test content-market fit, not to build an audience. Judge success by repeat engagement, not one-time spikes.',
    },
    mediumStep: {
      id: 'action_audience_research',
      type: 'action_choice',
      context: 'Audience - Research successful creators',
      trigger: 'Before committing to creator research',
      content:
        'Studying successful creators is valuable for understanding format and pacing, but dangerous if you copy their topics. What worked for them in 2022 is saturated now. The insight: successful creators found white space early, then optimized format. You need to find your own white space first. Use this to study structure and distribution, not content ideas.',
    },
    largeStep: {
      id: 'action_audience_daily',
      type: 'action_choice',
      context: 'Audience - Post daily for 7 days',
      trigger: 'Before committing to daily posting',
      content:
        'Posting daily for a week tests consistency, but most beginners mistake activity for progress. The pattern: day 1-3 feels productive, day 4-7 feels pointless because engagement is flat. This is normal—algorithms need weeks of data before they trust you. The real test is whether you can sustain this for 90 days, not 7. Use this week to build the system, not the audience.',
    },
  },
  'Software / Digital Product': {
    smallStep: {
      id: 'action_software_validate',
      type: 'action_choice',
      context: 'Software - Validate demand',
      trigger: 'Before committing to validation',
      content:
        'Validating demand before building is the most important step most founders skip. The trap: asking people if they would use something instead of asking them to pay. Collect pre-orders or deposits. If nobody will pay before the product exists, they probably will not pay after either.',
    },
    mediumStep: {
      id: 'action_software_mvp',
      type: 'action_choice',
      context: 'Software - Build MVP',
      trigger: 'Before committing to MVP',
      content:
        'Building an MVP feels like progress but most founders build too much. The minimum viable product should embarrass you. If it does not, you built too much. Ship the smallest thing that solves the core problem. Everything else is assumptions until users prove you right.',
    },
    largeStep: {
      id: 'action_software_iterate',
      type: 'action_choice',
      context: 'Software - Iterate based on feedback',
      trigger: 'Before committing to iteration',
      content:
        'Iterating based on feedback sounds obvious but most founders optimize the wrong things. The trap: listening to power users who want features instead of new users who cannot figure out the basics. Focus on reducing friction for first-time users before adding features for existing ones.',
    },
  },
  'Marketplace / Platform': {
    smallStep: {
      id: 'action_marketplace_supply',
      type: 'action_choice',
      context: 'Marketplace - Recruit supply manually',
      trigger: 'Before committing to supply recruitment',
      content:
        'Recruiting supply manually is unglamorous but necessary. The trap: trying to automate recruitment before you understand what suppliers actually want. Talk to 20 potential suppliers. Learn their objections. Most marketplaces fail because they offer the wrong value proposition to the supply side.',
    },
    mediumStep: {
      id: 'action_marketplace_demand',
      type: 'action_choice',
      context: 'Marketplace - Find initial demand',
      trigger: 'Before committing to demand generation',
      content:
        'Finding initial demand requires creativity because you have limited supply. The insight: your first buyers need to tolerate imperfection. Find people with urgent needs who will accept a worse experience in exchange for solving their problem. They will tell you exactly what needs to improve.',
    },
    largeStep: {
      id: 'action_marketplace_match',
      type: 'action_choice',
      context: 'Marketplace - Facilitate first matches',
      trigger: 'Before committing to manual matching',
      content:
        'Facilitating matches manually teaches you what the algorithm should eventually do. The trap: building matching logic before you understand what makes a good match. Do it manually for your first 50 matches. Write down why each one worked or did not. That is your product spec.',
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
