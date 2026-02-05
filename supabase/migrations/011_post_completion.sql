-- ==========================================
-- POST-COMPLETION SYSTEM
-- Adds tables for tracking business progress after completing all 6 chapters
-- ==========================================

-- 1. PATH COMPLETION TABLE
-- Persists the fact that a user finished all 6 chapters
CREATE TABLE IF NOT EXISTS public.path_completion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. WEEKLY CHECK-INS TABLE
CREATE TABLE IF NOT EXISTS public.weekly_check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_of DATE NOT NULL,
  revenue_this_week NUMERIC(12,2),
  expenses_this_week NUMERIC(12,2),
  clients_or_users INTEGER,
  wins TEXT,
  blockers TEXT,
  next_week_focus TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, week_of)
);

-- 3. MILESTONES TABLE
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  milestone_key TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, milestone_key)
);

-- 4. FINANCIAL ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.financial_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  type TEXT NOT NULL CHECK (type IN ('revenue', 'expense')),
  amount NUMERIC(12,2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_path_completion_user_id ON public.path_completion(user_id);
CREATE INDEX IF NOT EXISTS idx_weekly_check_ins_user_id ON public.weekly_check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_weekly_check_ins_week ON public.weekly_check_ins(user_id, week_of DESC);
CREATE INDEX IF NOT EXISTS idx_milestones_user_id ON public.milestones(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_entries_user_id ON public.financial_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_entries_date ON public.financial_entries(user_id, entry_date DESC);

-- 6. ENABLE RLS
ALTER TABLE public.path_completion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_entries ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES

-- path_completion
CREATE POLICY "Users can view own path completion"
  ON public.path_completion FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own path completion"
  ON public.path_completion FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- weekly_check_ins
CREATE POLICY "Users can view own check-ins"
  ON public.weekly_check_ins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check-ins"
  ON public.weekly_check_ins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own check-ins"
  ON public.weekly_check_ins FOR UPDATE
  USING (auth.uid() = user_id);

-- milestones
CREATE POLICY "Users can view own milestones"
  ON public.milestones FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own milestones"
  ON public.milestones FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own milestones"
  ON public.milestones FOR DELETE
  USING (auth.uid() = user_id);

-- financial_entries
CREATE POLICY "Users can view own financial entries"
  ON public.financial_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own financial entries"
  ON public.financial_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own financial entries"
  ON public.financial_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own financial entries"
  ON public.financial_entries FOR DELETE
  USING (auth.uid() = user_id);

-- 8. TRIGGERS for updated_at
CREATE TRIGGER handle_weekly_check_ins_updated_at
  BEFORE UPDATE ON public.weekly_check_ins
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_financial_entries_updated_at
  BEFORE UPDATE ON public.financial_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 9. UPDATE complete_chapter() to persist path completion
CREATE OR REPLACE FUNCTION public.complete_chapter(
  p_user_id UUID,
  p_chapter_id TEXT,
  p_outputs JSONB
)
RETURNS TEXT AS $$
DECLARE
  current_progress RECORD;
  next_chapter_id TEXT;
  next_sequence INTEGER;
BEGIN
  -- Get current progress
  SELECT * INTO current_progress
  FROM public.chapter_progress
  WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No chapter progress found for user';
  END IF;

  -- Verify they're completing the correct chapter
  IF current_progress.current_chapter_id != p_chapter_id THEN
    RAISE EXCEPTION 'Cannot complete chapter %. User is currently on chapter %',
      p_chapter_id, current_progress.current_chapter_id;
  END IF;

  -- Save chapter outputs
  INSERT INTO public.chapter_outputs (
    user_id,
    chapter_id,
    outputs,
    completed,
    completed_at
  )
  VALUES (
    p_user_id,
    p_chapter_id,
    p_outputs,
    true,
    NOW()
  )
  ON CONFLICT (user_id, chapter_id) DO UPDATE SET
    outputs = EXCLUDED.outputs,
    completed = true,
    completed_at = NOW(),
    updated_at = NOW();

  -- Calculate next chapter
  next_sequence := current_progress.current_chapter_sequence + 1;

  -- Check if this is the last chapter (sequence 6)
  IF next_sequence > 6 THEN
    -- Persist path completion
    INSERT INTO public.path_completion (user_id, path_id, completed_at)
    VALUES (p_user_id, current_progress.path_id, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
      path_id = EXCLUDED.path_id,
      completed_at = EXCLUDED.completed_at;

    RETURN 'PATH_COMPLETED';
  END IF;

  -- Generate next chapter ID based on path and sequence
  CASE current_progress.path_id
    WHEN 'client_services' THEN
      next_chapter_id := 'client_ch' || next_sequence || '_';
      CASE next_sequence
        WHEN 2 THEN next_chapter_id := next_chapter_id || 'ideal_client';
        WHEN 3 THEN next_chapter_id := next_chapter_id || 'proof_positioning';
        WHEN 4 THEN next_chapter_id := next_chapter_id || 'outreach';
        WHEN 5 THEN next_chapter_id := next_chapter_id || 'delivery_system';
        WHEN 6 THEN next_chapter_id := next_chapter_id || 'scale_or_specialise';
      END CASE;

    WHEN 'productized_services' THEN
      next_chapter_id := 'productized_ch' || next_sequence || '_';
      CASE next_sequence
        WHEN 2 THEN next_chapter_id := next_chapter_id || 'process';
        WHEN 3 THEN next_chapter_id := next_chapter_id || 'first_sales';
        WHEN 4 THEN next_chapter_id := next_chapter_id || 'boundaries';
        WHEN 5 THEN next_chapter_id := next_chapter_id || 'volume';
        WHEN 6 THEN next_chapter_id := next_chapter_id || 'next_step';
      END CASE;

    WHEN 'audience_monetization' THEN
      next_chapter_id := 'audience_ch' || next_sequence || '_';
      CASE next_sequence
        WHEN 2 THEN next_chapter_id := next_chapter_id || 'platform_choice';
        WHEN 3 THEN next_chapter_id := next_chapter_id || 'first_30';
        WHEN 4 THEN next_chapter_id := next_chapter_id || 'growth_pattern';
        WHEN 5 THEN next_chapter_id := next_chapter_id || 'monetization_signal';
        WHEN 6 THEN next_chapter_id := next_chapter_id || 'first_monetization';
      END CASE;

    WHEN 'software_digital_product' THEN
      next_chapter_id := 'software_ch' || next_sequence || '_';
      CASE next_sequence
        WHEN 2 THEN next_chapter_id := next_chapter_id || 'idea_shaping';
        WHEN 3 THEN next_chapter_id := next_chapter_id || 'idea_validation';
        WHEN 4 THEN next_chapter_id := next_chapter_id || 'first_version';
        WHEN 5 THEN next_chapter_id := next_chapter_id || 'first_users';
        WHEN 6 THEN next_chapter_id := next_chapter_id || 'direction_decision';
      END CASE;

    WHEN 'marketplace' THEN
      next_chapter_id := 'marketplace_ch' || next_sequence || '_';
      CASE next_sequence
        WHEN 2 THEN next_chapter_id := next_chapter_id || 'which_side_first';
        WHEN 3 THEN next_chapter_id := next_chapter_id || 'first_side';
        WHEN 4 THEN next_chapter_id := next_chapter_id || 'second_side';
        WHEN 5 THEN next_chapter_id := next_chapter_id || 'liquidity';
        WHEN 6 THEN next_chapter_id := next_chapter_id || 'growth_decision';
      END CASE;
  END CASE;

  -- Update chapter progress
  UPDATE public.chapter_progress
  SET
    current_chapter_id = next_chapter_id,
    current_chapter_sequence = next_sequence,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Update user_state
  UPDATE public.user_state
  SET
    current_chapter_id = next_chapter_id,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  RETURN next_chapter_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
