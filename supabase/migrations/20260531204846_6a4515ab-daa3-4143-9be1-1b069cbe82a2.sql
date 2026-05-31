CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'riflessione',
  status TEXT NOT NULL DEFAULT 'draft',
  cover_url TEXT,
  title_it TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  title_es TEXT NOT NULL DEFAULT '',
  excerpt_it TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  excerpt_es TEXT NOT NULL DEFAULT '',
  content_it TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  content_es TEXT NOT NULL DEFAULT '',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT blog_posts_status_check CHECK (status IN ('draft','published'))
);

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read published posts"
ON public.blog_posts FOR SELECT
USING (status = 'published' OR app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin insert posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin update posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "admin delete posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER blog_posts_touch_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX blog_posts_status_published_at_idx ON public.blog_posts (status, published_at DESC);