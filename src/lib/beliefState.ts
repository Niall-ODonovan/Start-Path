import type { CheckIn, Direction } from './types'

export interface CurrentFocus {
  question: string
  whyItMatters: string
  ifWorks: string
  ifFails: string
}

export function calculateBeliefState(
  direction: Direction,
  checkIns: CheckIn[]
): CurrentFocus {
  if (checkIns.length === 0) {
    return getInitialFocus(direction)
  }

  const recentResults = checkIns.slice(0, 5).map((ci) => ci.signal_type)
  const goodCount = recentResults.filter((s) => s === 'strong').length
  const badCount = recentResults.filter((s) => s === 'weak').length

  // Generate current focus based on recent results
  return generateCurrentFocus(direction, checkIns, goodCount, badCount)
}

function getInitialFocus(direction: Direction): CurrentFocus {
  const focuses: Record<Direction, CurrentFocus> = {
    'Client Services': {
      question: 'Will clients respond and hire me?',
      whyItMatters: 'Need to prove demand exists and you can close deals.',
      ifWorks: 'Charge more. Focus on better people to work with.',
      ifFails: 'Change how you describe what you do or help different types of people.',
    },
    'Productized Services': {
      question: 'Will people pay for the same-every-time version?',
      whyItMatters: 'Offering the exact same thing only works if people buy it as-is.',
      ifWorks: 'Write down your process. Think about getting help from others.',
      ifFails: 'Go back to doing different things for each person, or change what you include.',
    },
    'Audience → Monetization': {
      question: 'Are people watching or following?',
      whyItMatters: 'Need people paying attention before you can make money from it.',
      ifWorks: 'Do more of what is working. Post more often.',
      ifFails: 'Change what you post about, how you post it, or where you post.',
    },
    'Software / Digital Product': {
      question: 'Will people pay for this?',
      whyItMatters: 'Building something nobody wants to buy is the biggest mistake. Check first.',
      ifWorks: 'Build the simplest version. Give it to people who already said yes.',
      ifFails: 'Change what you are offering or find a different problem to solve.',
    },
    'Marketplace / Platform': {
      question: 'Can I get both sides to show up?',
      whyItMatters: 'Need people selling AND people buying. Getting started is the hard part.',
      ifWorks: 'Focus on whichever side is working better. Build from there.',
      ifFails: 'Try helping just one side, or try a different type of market.',
    },
  }

  return focuses[direction]
}

function generateCurrentFocus(
  direction: Direction,
  checkIns: CheckIn[],
  goodCount: number,
  badCount: number
): CurrentFocus {
  const latestCheckIn = checkIns[0]

  // If recent results are mostly bad
  if (badCount >= 2) {
    return {
      question: 'Should I keep going or try something different?',
      whyItMatters: 'Multiple bad results suggest core approach is not working.',
      ifWorks: 'New angle saves the direction. Continue experimenting.',
      ifFails: 'Abandon this direction. Try fundamentally different path.',
    }
  }

  // If recent results are mostly good
  if (goodCount >= 2) {
    return {
      question: 'Can I repeat this result?',
      whyItMatters: 'One-time wins mean nothing. Need to prove it is a pattern.',
      ifWorks: 'Do this same thing more. Look for ways to make it better.',
      ifFails: 'Was luck, not skill. Find out what actually matters.',
    }
  }

  // Based on latest path adjustment
  if (latestCheckIn.path_adjustment === 'double_down') {
    return {
      question: 'How much bigger can this get?',
      whyItMatters: 'Current approach works. Now testing if it can keep growing.',
      ifWorks: 'This is the main thing. Make it better and grow it.',
      ifFails: 'Hit a limit. Need a new way to grow.',
    }
  }

  if (latestCheckIn.path_adjustment === 'narrow') {
    return {
      question: 'Does focusing on one group work better?',
      whyItMatters: 'Trying to help everyone was not working. Testing if focusing on fewer people works better.',
      ifWorks: 'Keep focusing on just this group. Become known for helping them.',
      ifFails: 'This group is too small or the wrong group. Try more people or different people.',
    }
  }

  if (latestCheckIn.path_adjustment === 'pivot') {
    return {
      question: 'Does this new angle work better?',
      whyItMatters: 'Old approach failed. Testing if different approach works.',
      ifWorks: 'Found the right direction. Keep experimenting here.',
      ifFails: 'This direction may be dead. Consider bigger change.',
    }
  }

  // Default
  return getInitialFocus(direction)
}

export function getExperimentStaleness(deadline: string): {
  isOverdue: boolean
  daysOverdue: number
  message: string
} {
  const now = Date.now()
  const deadlineTime = Date.parse(deadline)
  const diff = now - deadlineTime

  const daysOverdue = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (daysOverdue > 3) {
    return {
      isOverdue: true,
      daysOverdue,
      message: `${daysOverdue} days overdue. Signal decaying. Either check in or kill this experiment.`,
    }
  }

  if (daysOverdue > 0) {
    return {
      isOverdue: true,
      daysOverdue,
      message: `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue. Check in now.`,
    }
  }

  return {
    isOverdue: false,
    daysOverdue: 0,
    message: 'Experiment active.',
  }
}

export function calculateNextLever(
  checkIns: CheckIn[],
  hasActiveExperiment: boolean
): {
  action: string
  reason: string
  uncertainty: string
} {
  if (!hasActiveExperiment) {
    return {
      action: 'Start next experiment',
      reason: 'You are idle. No active test means no new information.',
      uncertainty: 'Whether your current hypothesis holds under real market conditions.',
    }
  }

  if (checkIns.length === 0) {
    return {
      action: 'Complete first experiment',
      reason: 'All current beliefs are theoretical. First real data point is highest value.',
      uncertainty: 'Whether initial direction and action are even approximately correct.',
    }
  }

  const recentSignals = checkIns.slice(0, 3).map((ci) => ci.signal_type)

  if (recentSignals.filter((s) => s === 'weak').length >= 2) {
    return {
      action: 'Re-evaluate core hypothesis',
      reason: 'Multiple weak signals suggest fundamental misalignment, not execution issues.',
      uncertainty: 'Whether you are solving a real problem for a real market.',
    }
  }

  if (recentSignals.filter((s) => s === 'strong').length >= 2) {
    return {
      action: 'Test if this keeps working',
      reason: 'Early wins often do not last. Prove this will keep happening, not just once.',
      uncertainty: 'Whether good result was luck or something you can keep doing.',
    }
  }

  return {
    action: 'Run next experiment',
    reason: 'Current data is insufficient. Continue accumulating signal.',
    uncertainty: 'Whether recent results represent noise or trend.',
  }
}
