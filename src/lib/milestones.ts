export interface MilestoneDefinition {
  key: string
  pathId: string
  sequence: number
  title: string
  description: string
  category: 'traction' | 'revenue' | 'systems' | 'growth'
}

const CLIENT_SERVICES_MILESTONES: MilestoneDefinition[] = [
  { key: 'cs_first_outreach', pathId: 'client_services', sequence: 1, title: 'First outreach sent', description: 'You reached out to a potential client for the first time', category: 'traction' },
  { key: 'cs_first_inquiry', pathId: 'client_services', sequence: 2, title: 'First inquiry received', description: 'Someone responded showing interest in your service', category: 'traction' },
  { key: 'cs_first_client', pathId: 'client_services', sequence: 3, title: 'First paid client', description: 'You signed your first paying client', category: 'revenue' },
  { key: 'cs_first_delivery', pathId: 'client_services', sequence: 4, title: 'First project delivered', description: 'You completed and delivered work to a client', category: 'traction' },
  { key: 'cs_documented_process', pathId: 'client_services', sequence: 5, title: 'Documented your process', description: 'You wrote down your step-by-step delivery process', category: 'systems' },
  { key: 'cs_first_500', pathId: 'client_services', sequence: 6, title: 'First $500 earned', description: 'Your total earnings reached $500', category: 'revenue' },
  { key: 'cs_repeat_client', pathId: 'client_services', sequence: 7, title: 'First repeat client or referral', description: 'A client came back or referred someone to you', category: 'growth' },
  { key: 'cs_first_1k_month', pathId: 'client_services', sequence: 8, title: 'First $1,000 month', description: 'You earned $1,000 or more in a single month', category: 'revenue' },
  { key: 'cs_five_clients', pathId: 'client_services', sequence: 9, title: '5 total clients served', description: 'You have delivered work to 5 different clients', category: 'growth' },
  { key: 'cs_raised_prices', pathId: 'client_services', sequence: 10, title: 'Raised your prices', description: 'You increased your rates based on demand or experience', category: 'growth' },
]

const SOFTWARE_MILESTONES: MilestoneDefinition[] = [
  { key: 'sw_prototype', pathId: 'software_digital_product', sequence: 1, title: 'First prototype built', description: 'You built something people can actually try', category: 'traction' },
  { key: 'sw_first_user', pathId: 'software_digital_product', sequence: 2, title: 'First user tried it', description: 'Someone outside your circle used your product', category: 'traction' },
  { key: 'sw_return_user', pathId: 'software_digital_product', sequence: 3, title: 'First user returned voluntarily', description: 'Someone came back without you asking them to', category: 'traction' },
  { key: 'sw_first_payment', pathId: 'software_digital_product', sequence: 4, title: 'First paying customer', description: 'Someone paid money for your product', category: 'revenue' },
  { key: 'sw_first_100', pathId: 'software_digital_product', sequence: 5, title: 'First $100 in revenue', description: 'Your total revenue reached $100', category: 'revenue' },
  { key: 'sw_ten_users', pathId: 'software_digital_product', sequence: 6, title: '10 total users', description: 'You have 10 people using your product', category: 'growth' },
  { key: 'sw_feature_request', pathId: 'software_digital_product', sequence: 7, title: 'First feature request implemented', description: 'You built something a user asked for', category: 'systems' },
  { key: 'sw_payment_system', pathId: 'software_digital_product', sequence: 8, title: 'Set up payment system', description: 'You have a way to collect payments automatically', category: 'systems' },
  { key: 'sw_first_500', pathId: 'software_digital_product', sequence: 9, title: 'First $500 in total revenue', description: 'Your cumulative revenue reached $500', category: 'revenue' },
  { key: 'sw_organic_user', pathId: 'software_digital_product', sequence: 10, title: 'Acquired a user without direct outreach', description: 'Someone found and signed up without you reaching out', category: 'growth' },
]

const PRODUCTIZED_MILESTONES: MilestoneDefinition[] = [
  { key: 'ps_package_defined', pathId: 'productized_services', sequence: 1, title: 'Package defined and priced', description: 'You have a fixed-scope offering with a clear price', category: 'systems' },
  { key: 'ps_process_documented', pathId: 'productized_services', sequence: 2, title: 'Process documented', description: 'You wrote down your step-by-step delivery process', category: 'systems' },
  { key: 'ps_first_sale', pathId: 'productized_services', sequence: 3, title: 'First package sold', description: 'Someone bought your productized service', category: 'revenue' },
  { key: 'ps_no_scope_creep', pathId: 'productized_services', sequence: 4, title: 'Delivered without scope creep', description: 'You delivered exactly what was included, nothing extra', category: 'systems' },
  { key: 'ps_said_no', pathId: 'productized_services', sequence: 5, title: 'Said no to a custom request', description: 'You turned down work that did not fit your package', category: 'systems' },
  { key: 'ps_first_1k_month', pathId: 'productized_services', sequence: 6, title: 'First $1,000 month', description: 'You earned $1,000 or more in a single month', category: 'revenue' },
  { key: 'ps_five_delivered', pathId: 'productized_services', sequence: 7, title: '5 packages delivered', description: 'You have delivered your package 5 times', category: 'growth' },
  { key: 'ps_reduced_time', pathId: 'productized_services', sequence: 8, title: 'Reduced delivery time', description: 'Your process got faster through repetition', category: 'systems' },
  { key: 'ps_ten_delivered', pathId: 'productized_services', sequence: 9, title: '10 packages delivered', description: 'You have delivered your package 10 times', category: 'growth' },
  { key: 'ps_hired_or_automated', pathId: 'productized_services', sequence: 10, title: 'Hired help or automated a step', description: 'You delegated or automated part of your process', category: 'growth' },
]

const AUDIENCE_MILESTONES: MilestoneDefinition[] = [
  { key: 'au_first_10_posts', pathId: 'audience_monetization', sequence: 1, title: 'First 10 posts published', description: 'You published 10 pieces of content', category: 'traction' },
  { key: 'au_100_followers', pathId: 'audience_monetization', sequence: 2, title: '100 followers', description: 'You reached 100 followers on your platform', category: 'growth' },
  { key: 'au_viral_post', pathId: 'audience_monetization', sequence: 3, title: 'First viral post', description: 'One of your posts got 10x your normal views', category: 'traction' },
  { key: 'au_500_followers', pathId: 'audience_monetization', sequence: 4, title: '500 followers', description: 'You reached 500 followers', category: 'growth' },
  { key: 'au_first_dm', pathId: 'audience_monetization', sequence: 5, title: 'First DM asking for advice', description: 'Someone reached out because of your content', category: 'traction' },
  { key: 'au_1000_followers', pathId: 'audience_monetization', sequence: 6, title: '1,000 followers', description: 'You reached 1,000 followers', category: 'growth' },
  { key: 'au_tested_monetization', pathId: 'audience_monetization', sequence: 7, title: 'Tested a monetization idea', description: 'You tried selling something to your audience', category: 'revenue' },
  { key: 'au_first_sale', pathId: 'audience_monetization', sequence: 8, title: 'First sale from audience', description: 'Someone from your audience paid you for something', category: 'revenue' },
  { key: 'au_first_100', pathId: 'audience_monetization', sequence: 9, title: 'First $100 from audience', description: 'Your audience earnings reached $100', category: 'revenue' },
  { key: 'au_first_500', pathId: 'audience_monetization', sequence: 10, title: 'First $500 from audience', description: 'Your audience earnings reached $500', category: 'revenue' },
]

const MARKETPLACE_MILESTONES: MilestoneDefinition[] = [
  { key: 'mp_first_supply', pathId: 'marketplace', sequence: 1, title: 'First person on supply side', description: 'You recruited your first supplier or provider', category: 'traction' },
  { key: 'mp_five_supply', pathId: 'marketplace', sequence: 2, title: '5 people on supply side', description: 'You have 5 suppliers or providers', category: 'growth' },
  { key: 'mp_first_demand', pathId: 'marketplace', sequence: 3, title: 'First person on demand side', description: 'You brought in your first buyer or customer', category: 'traction' },
  { key: 'mp_first_transaction', pathId: 'marketplace', sequence: 4, title: 'First transaction facilitated', description: 'Your first successful match between supply and demand', category: 'traction' },
  { key: 'mp_repeat_transaction', pathId: 'marketplace', sequence: 5, title: 'First repeat transaction', description: 'Someone transacted through your marketplace again', category: 'traction' },
  { key: 'mp_no_manual', pathId: 'marketplace', sequence: 6, title: 'Transaction without manual help', description: 'A transaction happened without you manually coordinating', category: 'systems' },
  { key: 'mp_ten_each_side', pathId: 'marketplace', sequence: 7, title: '10+ people on each side', description: 'Both sides have at least 10 participants', category: 'growth' },
  { key: 'mp_first_revenue', pathId: 'marketplace', sequence: 8, title: 'First revenue earned', description: 'You earned your first commission or fee', category: 'revenue' },
  { key: 'mp_organic_signup', pathId: 'marketplace', sequence: 9, title: 'Organic signup from unknown person', description: 'Someone you did not reach out to joined your marketplace', category: 'growth' },
  { key: 'mp_five_in_week', pathId: 'marketplace', sequence: 10, title: '5 transactions in one week', description: 'Your marketplace had 5 transactions in a single week', category: 'growth' },
]

export const ALL_MILESTONES: MilestoneDefinition[] = [
  ...CLIENT_SERVICES_MILESTONES,
  ...SOFTWARE_MILESTONES,
  ...PRODUCTIZED_MILESTONES,
  ...AUDIENCE_MILESTONES,
  ...MARKETPLACE_MILESTONES,
]

export function getMilestonesForPath(pathId: string): MilestoneDefinition[] {
  return ALL_MILESTONES.filter((m) => m.pathId === pathId).sort((a, b) => a.sequence - b.sequence)
}
