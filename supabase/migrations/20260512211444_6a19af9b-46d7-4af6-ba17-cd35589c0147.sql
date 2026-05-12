ALTER TABLE public.strati_overrides
  ADD COLUMN IF NOT EXISTS col_span integer,
  ADD COLUMN IF NOT EXISTS row_span integer;