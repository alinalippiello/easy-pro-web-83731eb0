-- Extend overrides
ALTER TABLE public.strati_overrides
  ADD COLUMN IF NOT EXISTS hidden boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS cover_url text;

-- Custom tiles (admin-added images)
CREATE TABLE IF NOT EXISTS public.strati_custom_tiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cover_url text NOT NULL,
  alt text NOT NULL DEFAULT '',
  position integer,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.strati_custom_tiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read custom tiles"
  ON public.strati_custom_tiles FOR SELECT
  USING (true);

CREATE POLICY "admin insert custom tiles"
  ON public.strati_custom_tiles FOR INSERT TO authenticated
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin update custom tiles"
  ON public.strati_custom_tiles FOR UPDATE TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin delete custom tiles"
  ON public.strati_custom_tiles FOR DELETE TO authenticated
  USING (app_private.has_role(auth.uid(), 'admin'::app_role));

GRANT SELECT ON public.strati_custom_tiles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.strati_custom_tiles TO authenticated;

CREATE TRIGGER strati_custom_tiles_touch
  BEFORE UPDATE ON public.strati_custom_tiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage bucket for tile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('strati', 'strati', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read strati bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'strati');

CREATE POLICY "admin upload strati bucket"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'strati' AND app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin update strati bucket"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'strati' AND app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin delete strati bucket"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'strati' AND app_private.has_role(auth.uid(), 'admin'::app_role));