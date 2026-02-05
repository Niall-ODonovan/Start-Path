-- Create business_profile table
CREATE TABLE IF NOT EXISTS public.business_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,

  -- BUSINESS BASICS
  business_name TEXT,
  business_type TEXT, -- The path they chose (Client Services, SaaS, etc.)
  current_stage TEXT CHECK (current_stage IN ('idea', 'testing', 'early_traction')),

  -- TARGET MARKET
  target_customer TEXT, -- Who this is for (specific group)
  where_to_reach_them TEXT, -- Where these people can be reached
  current_alternative TEXT, -- What they currently do instead

  -- PROBLEM & OFFER
  problem_to_solve TEXT,
  what_offering TEXT,
  quit_criteria TEXT, -- What outcome would show this is not worth continuing

  -- CONSTRAINTS
  time_per_week TEXT,
  money_available TEXT,
  existing_skills TEXT[],
  missing_skills TEXT[],

  -- SUCCESS (FOR NOW)
  success_in_30_days TEXT, -- What "working" would look like
  failure_signal TEXT, -- What would clearly mean it's not working

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business_profile ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own business profile"
  ON public.business_profile FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own business profile"
  ON public.business_profile FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own business profile"
  ON public.business_profile FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.business_profile
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create business profile on user signup
CREATE OR REPLACE FUNCTION public.create_business_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.business_profile (user_id, current_stage)
  VALUES (NEW.id, 'idea');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_create_business_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_business_profile();

-- Index for faster lookups
CREATE INDEX idx_business_profile_user_id ON public.business_profile(user_id);
