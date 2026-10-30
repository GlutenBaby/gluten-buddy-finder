-- Admin helpers are SECURITY DEFINER, so whoever can execute them bypasses RLS.
-- Postgres grants EXECUTE to PUBLIC by default, which left them callable with
-- the public anon key. Mission Control calls them with the service role only.

REVOKE EXECUTE ON FUNCTION public.product_health_metrics() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_junk_products() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_duplicate_products() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.backfill_product_categories() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.preview_category_rule(TEXT, public.product_category) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.apply_category_rule(TEXT, public.product_category) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.apply_category_rule(TEXT, public.product_category, UUID[]) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.add_product_category(TEXT) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.product_health_metrics() TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_junk_products() TO service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_duplicate_products() TO service_role;
GRANT EXECUTE ON FUNCTION public.backfill_product_categories() TO service_role;
GRANT EXECUTE ON FUNCTION public.preview_category_rule(TEXT, public.product_category) TO service_role;
GRANT EXECUTE ON FUNCTION public.apply_category_rule(TEXT, public.product_category) TO service_role;
GRANT EXECUTE ON FUNCTION public.apply_category_rule(TEXT, public.product_category, UUID[]) TO service_role;
GRANT EXECUTE ON FUNCTION public.add_product_category(TEXT) TO service_role;

-- Sfoglia reads the category pills as a guest, so this one stays public.
GRANT EXECUTE ON FUNCTION public.list_product_categories() TO anon, authenticated;
