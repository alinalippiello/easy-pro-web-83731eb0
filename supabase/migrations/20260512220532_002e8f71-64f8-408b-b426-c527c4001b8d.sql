CREATE SCHEMA IF NOT EXISTS app_private;

CREATE OR REPLACE FUNCTION app_private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

REVOKE ALL ON SCHEMA app_private FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION app_private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "admin insert concepts" ON public.strati_concepts;
DROP POLICY IF EXISTS "admin update concepts" ON public.strati_concepts;
DROP POLICY IF EXISTS "admin delete concepts" ON public.strati_concepts;

CREATE POLICY "admin insert concepts"
ON public.strati_concepts
FOR INSERT
TO authenticated
WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin update concepts"
ON public.strati_concepts
FOR UPDATE
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin delete concepts"
ON public.strati_concepts
FOR DELETE
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admin insert overrides" ON public.strati_overrides;
DROP POLICY IF EXISTS "admin update overrides" ON public.strati_overrides;
DROP POLICY IF EXISTS "admin delete overrides" ON public.strati_overrides;

CREATE POLICY "admin insert overrides"
ON public.strati_overrides
FOR INSERT
TO authenticated
WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin update overrides"
ON public.strati_overrides
FOR UPDATE
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'))
WITH CHECK (app_private.has_role(auth.uid(), 'admin'));

CREATE POLICY "admin delete overrides"
ON public.strati_overrides
FOR DELETE
TO authenticated
USING (app_private.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;