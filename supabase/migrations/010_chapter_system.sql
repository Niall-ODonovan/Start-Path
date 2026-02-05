-- ==========================================
-- CHAPTER SYSTEM MIGRATION
-- Converts from experiment-based to chapter-based progression
-- ==========================================

-- 1. CREATE chapter_progress TABLE
-- Tracks which chapter each user is currently on
CREATE TABLE IF NOT EXISTS public.chapter_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  path_id TEXT NOT NULL, -- e.g., 'client_services', 'software_digital_product'
  current_chapter_id TEXT NOT NULL, -- e.g., 'software_ch1_idea_creation'
  current_chapter_sequence INTEGER NOT NULL, -- e.g., 1, 2, 3
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure one progress record per user
  UNIQUE(user_id)
);

-- 2. CREATE chapter_outputs TABLE
-- Stores user's outputs/answers for each chapter
CREATE TABLE IF NOT EXISTS public.chapter_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  chapter_id TEXT NOT NULL, -- e.g., 'software_ch1_idea_creation'
  outputs JSONB NOT NULL DEFAULT '{}', -- Stores all field outputs as JSON
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One output record per user per chapter
  UNIQUE(user_id, chapter_id)
);

-- 3. ADD current_chapter_id to user_state
ALTER TABLE public.user_state
ADD COLUMN IF NOT EXISTS current_chapter_id TEXT;

-- 4. CREATE indexes for performance
CREATE INDEX IF NOT EXISTS idx_chapter_progress_user_id ON public.chapter_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_chapter_outputs_user_id ON public.chapter_outputs(user_id);
CREATE INDEX IF NOT EXISTS idx_chapter_outputs_chapter_id ON public.chapter_outputs(chapter_id);

-- 5. ENABLE RLS on new tables
ALTER TABLE public.chapter_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_outputs ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES for chapter_progress
CREATE POLICY "Users can view own chapter progress"
  ON public.chapter_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chapter progress"
  ON public.chapter_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chapter progress"
  ON public.chapter_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- 7. RLS POLICIES for chapter_outputs
CREATE POLICY "Users can view own chapter outputs"
  ON public.chapter_outputs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chapter outputs"
  ON public.chapter_outputs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chapter outputs"
  ON public.chapter_outputs FOR UPDATE
  USING (auth.uid() = user_id);

-- 8. TRIGGER for updated_at on chapter_progress
CREATE TRIGGER set_chapter_progress_updated_at
  BEFORE UPDATE ON public.chapter_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 9. TRIGGER for updated_at on chapter_outputs
CREATE TRIGGER set_chapter_outputs_updated_at
  BEFORE UPDATE ON public.chapter_outputs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 10. FUNCTION to initialize chapter progress when user commits to a path
-- This replaces the old commitment creation flow
CREATE OR REPLACE FUNCTION public.initialize_chapter_progress(
  p_user_id UUID,
  p_path_id TEXT
)
RETURNS void AS $$
DECLARE
  first_chapter_id TEXT;
BEGIN
  -- Determine first chapter based on path
  CASE p_path_id
    WHEN 'client_services' THEN
      first_chapter_id := 'client_ch1_offer_creation';
    WHEN 'productized_services' THEN
      first_chapter_id := 'productized_ch1_standard_offer';
    WHEN 'audience_monetization' THEN
      first_chapter_id := 'audience_ch1_content_theme';
    WHEN 'software_digital_product' THEN
      first_chapter_id := 'software_ch1_idea_creation';
    WHEN 'marketplace' THEN
      first_chapter_id := 'marketplace_ch1_concept';
    ELSE
      RAISE EXCEPTION 'Unknown path_id: %', p_path_id;
  END CASE;

  -- Insert or update chapter progress
  INSERT INTO public.chapter_progress (
    user_id,
    path_id,
    current_chapter_id,
    current_chapter_sequence
  )
  VALUES (
    p_user_id,
    p_path_id,
    first_chapter_id,
    1
  )
  ON CONFLICT (user_id) DO UPDATE SET
    path_id = EXCLUDED.path_id,
    current_chapter_id = EXCLUDED.current_chapter_id,
    current_chapter_sequence = EXCLUDED.current_chapter_sequence,
    started_at = NOW(),
    updated_at = NOW();

  -- Update user_state
  UPDATE public.user_state
  SET
    current_mode = 'operate',
    current_chapter_id = first_chapter_id,
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. FUNCTION to complete a chapter and move to next
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
    -- Path completed
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

-- 12. MODIFY business_profile creation trigger
-- Remove the automatic creation on user signup
-- Business profile should be created AFTER path commitment

DROP TRIGGER IF EXISTS on_user_create_business_profile ON public.profiles;
DROP FUNCTION IF EXISTS public.create_business_profile();

-- New function to create business profile after commitment
CREATE OR REPLACE FUNCTION public.create_business_profile_after_commitment()
RETURNS TRIGGER AS $$
BEGIN
  -- Create business profile when user enters 'operate' mode
  IF NEW.current_mode = 'operate' AND OLD.current_mode != 'operate' THEN
    INSERT INTO public.business_profile (user_id, current_stage)
    VALUES (NEW.user_id, 'idea')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user_state changes
CREATE TRIGGER on_operate_mode_create_business_profile
  AFTER UPDATE ON public.user_state
  FOR EACH ROW
  WHEN (NEW.current_mode = 'operate')
  EXECUTE FUNCTION public.create_business_profile_after_commitment();

-- 13. ADD helper function to get current chapter details
CREATE OR REPLACE FUNCTION public.get_current_chapter(p_user_id UUID)
RETURNS TABLE (
  chapter_id TEXT,
  chapter_sequence INTEGER,
  path_id TEXT,
  outputs JSONB,
  completed BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cp.current_chapter_id as chapter_id,
    cp.current_chapter_sequence as chapter_sequence,
    cp.path_id,
    COALESCE(co.outputs, '{}'::jsonb) as outputs,
    COALESCE(co.completed, false) as completed
  FROM public.chapter_progress cp
  LEFT JOIN public.chapter_outputs co
    ON co.user_id = cp.user_id
    AND co.chapter_id = cp.current_chapter_id
  WHERE cp.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
