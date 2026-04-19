-- Table témoignages
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  service TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  photo_url TEXT,
  savings TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published testimonials are viewable by everyone"
ON public.testimonials FOR SELECT
USING (published = true);

CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table simulations
CREATE TABLE public.simulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  postal_code TEXT,
  household_size INTEGER,
  income_category TEXT,
  work_types TEXT[],
  housing_type TEXT,
  estimated_aid INTEGER,
  inputs JSONB,
  result JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a simulation"
ON public.simulations FOR INSERT
WITH CHECK (true);

-- Pas de policy SELECT : données privées, pas lisibles publiquement

CREATE INDEX idx_testimonials_published ON public.testimonials(published, display_order);
CREATE INDEX idx_simulations_created_at ON public.simulations(created_at DESC);