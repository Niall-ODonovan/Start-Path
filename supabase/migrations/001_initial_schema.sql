-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_state table
CREATE TABLE IF NOT EXISTS public.user_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  current_direction TEXT,
  eliminated_directions TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create commitments table
CREATE TABLE IF NOT EXISTS public.commitments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  deadline TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create evidence table
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  observation TEXT NOT NULL,
  type TEXT DEFAULT 'observation',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create session_outcomes table
CREATE TABLE IF NOT EXISTS public.session_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  what_changed TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_outcomes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create RLS policies for user_state
CREATE POLICY "Users can view own state"
  ON public.user_state FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own state"
  ON public.user_state FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own state"
  ON public.user_state FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for commitments
CREATE POLICY "Users can view own commitments"
  ON public.commitments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own commitments"
  ON public.commitments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own commitments"
  ON public.commitments FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policies for evidence
CREATE POLICY "Users can view own evidence"
  ON public.evidence FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own evidence"
  ON public.evidence FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for session_outcomes
CREATE POLICY "Users can view own session outcomes"
  ON public.session_outcomes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own session outcomes"
  ON public.session_outcomes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.user_state
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);

  INSERT INTO public.user_state (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better query performance
CREATE INDEX idx_user_state_user_id ON public.user_state(user_id);
CREATE INDEX idx_commitments_user_id ON public.commitments(user_id);
CREATE INDEX idx_commitments_is_active ON public.commitments(user_id, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_evidence_user_id ON public.evidence(user_id);
CREATE INDEX idx_evidence_created_at ON public.evidence(user_id, created_at DESC);
CREATE INDEX idx_session_outcomes_user_id ON public.session_outcomes(user_id);
CREATE INDEX idx_session_outcomes_created_at ON public.session_outcomes(user_id, created_at DESC);
