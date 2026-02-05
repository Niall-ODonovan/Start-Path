export interface BusinessPath {
  id: string
  name: string
  description: string
  whatItInvolves: string
  timeToFirstSignal: string
  monthlyRevenue: string
  commonFailureMode: string
  badFitFor: string[]
  evaluationWeight: {
    patience: number // -1 to 1: -1 needs fast feedback, 1 needs patience
    rejectionTolerance: number // -1 to 1: -1 low rejection, 1 high rejection
    buildVsSell: number // -1 to 1: -1 selling, 1 building
    leverage: number // -1 to 1: -1 linear scaling, 1 high leverage
  }
}

export const BUSINESS_PATHS: BusinessPath[] = [
  {
    id: 'client_services',
    name: 'Client Services',
    description: 'Selling your time and expertise directly to clients.',
    whatItInvolves:
      'Finding people who need help, figuring out what they want, doing the work, keeping them happy. You are what they are paying for. You get paid quickly but can only earn as much as the hours you work. Most people do not realize how much time goes to talking with them vs doing the actual work.',
    timeToFirstSignal: '1-4 weeks. You know quickly if anyone will pay.',
    monthlyRevenue:
      '$3k-$15k/month solo. Limited by your hours. Most freelancers plateau at $8-12k/month before burnout or needing help.',
    commonFailureMode:
      'You end up like a well-paid employee with no freedom. You never get your time back because you cannot say no to people.',
    badFitFor: [
      'People who hate figuring out unclear problems',
      'Anyone who dislikes working closely with each person',
      'People who want to build something that grows without more hours, not just get paid now',
    ],
    evaluationWeight: {
      patience: -0.8,
      rejectionTolerance: 0.6,
      buildVsSell: -0.9,
      leverage: -0.8,
    },
  },
  {
    id: 'productized_services',
    name: 'Productized Services',
    description: 'You do the same thing for everyone at the same price.',
    whatItInvolves:
      'Deciding exactly what you will do every time, telling people about it, doing it the same way each time. Mix of service work and product. You are selling a specific result, not hours. Takes more work up front to explain what you do than just helping people however they ask.',
    timeToFirstSignal: '2-6 weeks. Must prove people will buy the same-every-time version.',
    monthlyRevenue:
      '$5k-$25k/month with a small team. Scales better than custom services but still requires delivery. Most stay at $10-15k/month.',
    commonFailureMode:
      'Cannot make it the same enough to grow, or make it too the-same and nobody wants it. Most end up just being service businesses with fancy names.',
    badFitFor: [
      'People who want money without working',
      'Anyone who cannot say no when people ask for different things',
      'People who are not good at following their own process',
    ],
    evaluationWeight: {
      patience: -0.3,
      rejectionTolerance: 0.5,
      buildVsSell: -0.4,
      leverage: -0.2,
    },
  },
  {
    id: 'audience_monetization',
    name: 'Audience → Monetization',
    description: 'Get people following you first, make money from it later.',
    whatItInvolves:
      'Creating content regularly, getting platforms to show your stuff, building a group of people who pay attention. Making money happens 6-18 months after people start following. Most people do not realize how much you need to post before platforms start showing your content to more people.',
    timeToFirstSignal: '3-6 months minimum. Early likes and comments do not mean anything yet.',
    monthlyRevenue:
      '$0-$5k/month for most creators. With 10k+ engaged followers, $2k-$10k/month is realistic. Most make under $1k/month.',
    commonFailureMode:
      'Giving up before things start growing, or building followers who like watching but will not pay you (entertainment people vs people who buy things).',
    badFitFor: [
      'People who need money in 3 months',
      'Anyone who hates talking about themselves',
      'People who cannot wait a long time for results',
    ],
    evaluationWeight: {
      patience: 0.9,
      rejectionTolerance: 0.4,
      buildVsSell: 0.6,
      leverage: 0.8,
    },
  },
  {
    id: 'software_digital_product',
    name: 'Software / Digital Product',
    description: 'Build something once (software, course, tool) and sell it repeatedly.',
    whatItInvolves:
      'Making the thing, finding people who need it, getting them to pay. Takes time up front but each new customer does not cost you more work. Most people fail at finding customers, not building the thing. You either need to know how to code, or have people already following you, or money for ads.',
    timeToFirstSignal: '3-8 weeks if you already have an audience. 3-6 months if starting from zero.',
    monthlyRevenue:
      '$1k-$20k/month for indie products. Most stay under $5k/month. A solid niche product can hit $10-15k/month with good distribution.',
    commonFailureMode:
      'Building for months then launching to nobody. Or building something nobody will pay for. Or getting early users but they stop using it or paying. Most people spend too long building and not enough time talking to people who might pay.',
    badFitFor: [
      'People who cannot code and do not have someone who can or money to pay for it',
      'People without an audience and no money for ads',
      'Anyone who needs money in under 6 months',
      'People who cannot wait to see if it is working',
    ],
    evaluationWeight: {
      patience: 0.7,
      rejectionTolerance: 0.5,
      buildVsSell: 0.6,
      leverage: 0.9,
    },
  },
  {
    id: 'marketplace',
    name: 'Marketplace / Platform',
    description: 'Connect people buying and people selling. Take a percentage.',
    whatItInvolves:
      'Solving the chicken-and-egg problem (need buyers for sellers to want to join, need sellers for buyers to want to join). Most people do not realize how hard it is to get both sides started. Getting enough activity is the main challenge. If it works, it grows on its own.',
    timeToFirstSignal: '3-6 months to prove one side will show up. 12+ months to prove both sides keep using it.',
    monthlyRevenue:
      '$0-$5k/month for the first 1-2 years. Most marketplaces fail before generating meaningful revenue. Successful niche marketplaces can reach $10-30k/month.',
    commonFailureMode:
      'Cannot get started. One side shows up, the other does not. Or: making a marketplace for something people can just do directly (no reason to use your thing).',
    badFitFor: [
      'People working alone (need a team to handle both buyer and seller sides)',
      'People without money saved or who cannot wait',
      'Anyone who cannot work on getting buyers AND sellers at the same time',
    ],
    evaluationWeight: {
      patience: 1.0,
      rejectionTolerance: 0.8,
      buildVsSell: 0.7,
      leverage: 1.0,
    },
  },
]

export function rankPathsByFit(
  userEvaluation: {
    patience: number // -1 to 1
    rejectionTolerance: number
    buildVsSell: number
    leverage: number
  }
): Array<{ path: BusinessPath; fitScore: number; fitReason: string }> {
  const scored = BUSINESS_PATHS.map((path) => {
    // Calculate fit as inverse of distance between user values and path requirements
    const patienceDiff = Math.abs(userEvaluation.patience - path.evaluationWeight.patience)
    const rejectionDiff = Math.abs(
      userEvaluation.rejectionTolerance - path.evaluationWeight.rejectionTolerance
    )
    const buildSellDiff = Math.abs(userEvaluation.buildVsSell - path.evaluationWeight.buildVsSell)
    const leverageDiff = Math.abs(userEvaluation.leverage - path.evaluationWeight.leverage)

    const totalDiff = patienceDiff + rejectionDiff + buildSellDiff + leverageDiff
    const fitScore = Math.max(0, 4 - totalDiff) / 4 // Normalize to 0-1

    // Generate fit reason
    let fitReason = ''
    if (fitScore > 0.7) {
      fitReason = 'Strong fit. Your constraints align well with this path.'
    } else if (fitScore > 0.4) {
      fitReason = 'Viable option. Some misalignment but workable.'
    } else {
      fitReason = 'Poor fit right now. Core constraints misaligned.'
    }

    return { path, fitScore, fitReason }
  })

  return scored.sort((a, b) => b.fitScore - a.fitScore)
}
