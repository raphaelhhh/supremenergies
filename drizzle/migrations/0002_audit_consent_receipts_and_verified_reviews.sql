CREATE TABLE public.consent_receipts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 notice_version text NOT NULL,
 analytics boolean NOT NULL,
 advertising boolean NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.consent_receipts TO service_role;
ALTER TABLE public.consent_receipts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service stores consent receipts" ON public.consent_receipts FOR ALL TO service_role USING (true) WITH CHECK (true);
COMMENT ON TABLE public.consent_receipts IS 'Purpose choices and notice version only; no IP, visitor identifier, or join to leads. Manual retention review required.';
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS verification_source text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS publication_authorized boolean NOT NULL DEFAULT false;
DROP POLICY IF EXISTS "Published testimonials are viewable by everyone" ON public.testimonials;
CREATE POLICY "Published testimonials are viewable by everyone" ON public.testimonials FOR SELECT TO anon, authenticated USING (published = true AND publication_authorized = true AND verification_source IS NOT NULL);
GRANT SELECT ON public.blog_posts, public.testimonials TO anon, authenticated;
GRANT SELECT ON public.leads, public.simulations, public.user_roles TO authenticated;
GRANT INSERT ON public.simulations TO anon, authenticated;
GRANT ALL ON public.leads, public.simulations, public.testimonials, public.blog_posts, public.user_roles, public.site_audience_daily, public.audience_sync_settings TO service_role;