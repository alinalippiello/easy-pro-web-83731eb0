GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON public.user_roles TO authenticated;

GRANT SELECT ON public.strati_concepts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.strati_concepts TO authenticated;

GRANT SELECT ON public.strati_overrides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.strati_overrides TO authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;