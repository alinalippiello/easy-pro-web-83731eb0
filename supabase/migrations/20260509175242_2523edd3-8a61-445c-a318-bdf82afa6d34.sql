
CREATE TABLE public.strati_concepts (
  key text PRIMARY KEY,
  title text NOT NULL,
  phrase text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.strati_overrides (
  tile_id text PRIMARY KEY,
  description text NOT NULL DEFAULT '',
  concept_key text REFERENCES public.strati_concepts(key) ON DELETE SET NULL ON UPDATE CASCADE,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.strati_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strati_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read concepts" ON public.strati_concepts FOR SELECT USING (true);
CREATE POLICY "public insert concepts" ON public.strati_concepts FOR INSERT WITH CHECK (true);
CREATE POLICY "public update concepts" ON public.strati_concepts FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete concepts" ON public.strati_concepts FOR DELETE USING (true);

CREATE POLICY "public read overrides" ON public.strati_overrides FOR SELECT USING (true);
CREATE POLICY "public insert overrides" ON public.strati_overrides FOR INSERT WITH CHECK (true);
CREATE POLICY "public update overrides" ON public.strati_overrides FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "public delete overrides" ON public.strati_overrides FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER strati_concepts_touch BEFORE UPDATE ON public.strati_concepts
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER strati_overrides_touch BEFORE UPDATE ON public.strati_overrides
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.strati_concepts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.strati_overrides;
ALTER TABLE public.strati_concepts REPLICA IDENTITY FULL;
ALTER TABLE public.strati_overrides REPLICA IDENTITY FULL;
