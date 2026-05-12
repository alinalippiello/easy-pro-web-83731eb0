ALTER TABLE public.strati_overrides
  ADD COLUMN IF NOT EXISTS position integer,
  ADD COLUMN IF NOT EXISTS image_scale numeric NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS image_pos_x numeric NOT NULL DEFAULT 50,
  ADD COLUMN IF NOT EXISTS image_pos_y numeric NOT NULL DEFAULT 50;

ALTER TABLE public.strati_concepts
  ADD COLUMN IF NOT EXISTS position integer;

CREATE INDEX IF NOT EXISTS strati_overrides_position_idx ON public.strati_overrides(position);
CREATE INDEX IF NOT EXISTS strati_concepts_position_idx ON public.strati_concepts(position);