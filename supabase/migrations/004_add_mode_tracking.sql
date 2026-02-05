-- Add mode tracking to user_state
ALTER TABLE public.user_state
ADD COLUMN current_mode TEXT NOT NULL DEFAULT 'orient'
CHECK (current_mode IN ('orient', 'evaluate', 'commit', 'operate'));

-- Add column to track if user has completed evaluation
ALTER TABLE public.user_state
ADD COLUMN evaluation_data JSONB;

-- Add index for faster lookups
CREATE INDEX idx_user_state_mode ON public.user_state(current_mode);

COMMENT ON COLUMN public.user_state.current_mode IS 'Current phase: orient (reviewing paths), evaluate (assessing fit), commit (choosing experiment), operate (executing experiment)';
COMMENT ON COLUMN public.user_state.evaluation_data IS 'Stores evaluation results (patience, rejectionTolerance, buildVsSell, leverage scores)';
