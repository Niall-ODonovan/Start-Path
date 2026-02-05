-- Create check_ins table
CREATE TABLE IF NOT EXISTS public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  commitment_id UUID NOT NULL REFERENCES public.commitments(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL,
  outcome TEXT NOT NULL,
  learned TEXT NOT NULL,
  signal_type TEXT NOT NULL CHECK (signal_type IN ('weak', 'mixed', 'strong')),
  signal_explanation TEXT NOT NULL,
  path_adjustment TEXT NOT NULL CHECK (path_adjustment IN ('double_down', 'narrow', 'pivot', 'escalate')),
  next_action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for check_ins
CREATE POLICY "Users can view own check-ins"
  ON public.check_ins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check-ins"
  ON public.check_ins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_check_ins_user_id ON public.check_ins(user_id);
CREATE INDEX idx_check_ins_commitment_id ON public.check_ins(commitment_id);
CREATE INDEX idx_check_ins_created_at ON public.check_ins(user_id, created_at DESC);
