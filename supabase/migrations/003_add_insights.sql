-- Create insights table to track which insights were shown to users
CREATE TABLE IF NOT EXISTS public.insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  insight_id TEXT NOT NULL,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('direction_choice', 'action_choice', 'signal_interpretation', 'confidence_update')),
  context TEXT NOT NULL,
  content TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own insights"
  ON public.insights FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insights"
  ON public.insights FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_insights_user_id ON public.insights(user_id);
CREATE INDEX idx_insights_created_at ON public.insights(user_id, created_at DESC);
CREATE INDEX idx_insights_type ON public.insights(user_id, insight_type);
