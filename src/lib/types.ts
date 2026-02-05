export interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserState {
  id: string;
  user_id: string;
  current_direction: string | null;
  eliminated_directions: string[];
  current_mode: 'orient' | 'evaluate' | 'commit' | 'operate';
  current_chapter_id: string | null; // NEW: tracks current chapter
  evaluation_data: {
    patience: number;
    rejectionTolerance: number;
    buildVsSell: number;
    leverage: number;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Commitment {
  id: string;
  user_id: string;
  action: string;
  deadline: string;
  is_active: boolean;
  created_at: string;
  completed_at: string | null;
}

export interface Evidence {
  id: string;
  user_id: string;
  observation: string;
  type: string;
  created_at: string;
}

export interface SessionOutcome {
  id: string;
  user_id: string;
  what_changed: string;
  created_at: string;
}

export interface CheckIn {
  id: string;
  user_id: string;
  commitment_id: string;
  completed: boolean;
  outcome: string;
  learned: string;
  signal_type: 'weak' | 'mixed' | 'strong';
  signal_explanation: string;
  path_adjustment: 'double_down' | 'narrow' | 'pivot' | 'escalate';
  next_action: string;
  created_at: string;
}

export interface InsightRecord {
  id: string;
  user_id: string;
  insight_id: string;
  insight_type: 'direction_choice' | 'action_choice' | 'signal_interpretation' | 'confidence_update';
  context: string;
  content: string;
  trigger_event: string;
  created_at: string;
}

export type Direction =
  | 'E-commerce'
  | 'Service'
  | 'Content'
  | 'Client Services'
  | 'Productized Services'
  | 'Audience → Monetization'
  | 'Digital Products'
  | 'SaaS'
  | 'Marketplace';

export interface BusinessProfile {
  id: string;
  user_id: string;
  // BUSINESS BASICS
  business_name: string | null;
  business_type: string | null;
  current_stage: 'idea' | 'testing' | 'early_traction';
  // TARGET MARKET
  target_customer: string | null;
  where_to_reach_them: string | null;
  current_alternative: string | null;
  // PROBLEM & OFFER
  problem_to_solve: string | null;
  what_offering: string | null;
  quit_criteria: string | null;
  // CONSTRAINTS
  time_per_week: string | null;
  money_available: string | null;
  existing_skills: string[];
  missing_skills: string[];
  // SUCCESS (FOR NOW)
  success_in_30_days: string | null;
  failure_signal: string | null;
  created_at: string;
  updated_at: string;
}

// ==========================================
// CHAPTER SYSTEM TYPES
// ==========================================

export interface ChapterProgress {
  id: string;
  user_id: string;
  path_id: string;
  current_chapter_id: string;
  current_chapter_sequence: number;
  started_at: string;
  updated_at: string;
}

export interface ChapterOutput {
  id: string;
  user_id: string;
  chapter_id: string;
  outputs: Record<string, any>;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

// ==========================================
// POST-COMPLETION TYPES
// ==========================================

export interface PathCompletion {
  id: string;
  user_id: string;
  path_id: string;
  completed_at: string;
}

export interface WeeklyCheckIn {
  id: string;
  user_id: string;
  week_of: string;
  revenue_this_week: number | null;
  expenses_this_week: number | null;
  clients_or_users: number | null;
  wins: string | null;
  blockers: string | null;
  next_week_focus: string | null;
  created_at: string;
  updated_at: string;
}

export interface MilestoneRecord {
  id: string;
  user_id: string;
  milestone_key: string;
  completed_at: string;
}

export interface FinancialEntry {
  id: string;
  user_id: string;
  entry_date: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  category: string | null;
  created_at: string;
  updated_at: string;
}
