CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  postal_code TEXT,
  source TEXT NOT NULL DEFAULT 'lead_magnet',
  page_path TEXT,
  message TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a valid lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 5 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (first_name IS NULL OR length(first_name) <= 80)
  AND (postal_code IS NULL OR length(postal_code) <= 16)
  AND (source IS NULL OR length(source) <= 64)
  AND (page_path IS NULL OR length(page_path) <= 255)
  AND (message IS NULL OR length(message) <= 2000)
);

CREATE POLICY "No public read of leads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (false);

CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_source ON public.leads (source);