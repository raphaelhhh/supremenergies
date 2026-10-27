CREATE TABLE public.site_audience_daily (
 day date NOT NULL,
 page_path text NOT NULL,
 event text NOT NULL CHECK (event IN ('page_view','navigation_click','quote_click','phone_click','email_click','review_click','form_submit')),
 total bigint NOT NULL DEFAULT 0,
 PRIMARY KEY (day, page_path, event)
);
GRANT ALL ON public.site_audience_daily TO service_role;
ALTER TABLE public.site_audience_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service can manage anonymous totals" ON public.site_audience_daily FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE TABLE public.audience_sync_settings (
 id boolean PRIMARY KEY DEFAULT true CHECK (id),
 token uuid NOT NULL DEFAULT gen_random_uuid()
);
GRANT ALL ON public.audience_sync_settings TO service_role;
ALTER TABLE public.audience_sync_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service can read sync settings" ON public.audience_sync_settings FOR SELECT TO service_role USING (true);
CREATE OR REPLACE FUNCTION public.increment_site_audience(p_events jsonb) RETURNS void LANGUAGE sql SET search_path = public AS $$
 INSERT INTO public.site_audience_daily(day,page_path,event,total)
 SELECT (now() AT TIME ZONE 'Europe/Paris')::date, item->>'page_path', item->>'event', count(*)
 FROM jsonb_array_elements(p_events) item GROUP BY item->>'page_path', item->>'event'
 ON CONFLICT (day,page_path,event) DO UPDATE SET total = site_audience_daily.total + EXCLUDED.total;
$$;
REVOKE ALL ON FUNCTION public.increment_site_audience(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_site_audience(jsonb) TO service_role;