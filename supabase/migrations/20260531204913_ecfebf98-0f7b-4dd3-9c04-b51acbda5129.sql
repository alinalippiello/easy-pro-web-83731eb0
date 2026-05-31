INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Blog images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

CREATE POLICY "Blog images admin insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog' AND app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Blog images admin update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog' AND app_private.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Blog images admin delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog' AND app_private.has_role(auth.uid(), 'admin'::app_role));