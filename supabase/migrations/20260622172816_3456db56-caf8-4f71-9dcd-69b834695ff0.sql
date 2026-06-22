-- Add SEO columns to blog_posts
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS target_keyword text;

-- Index for fast category filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category) WHERE published = true;

-- Backfill categories based on title heuristics
UPDATE public.blog_posts SET category = 'pompe-a-chaleur'
  WHERE category IS NULL
    AND (lower(title) LIKE '%pompe à chaleur%' OR lower(title) LIKE '%pac %' OR lower(title) LIKE '% pac' OR lower(title) LIKE '%pac air%' OR lower(title) LIKE '%géothermie%' OR lower(title) LIKE '%chauffage%');

UPDATE public.blog_posts SET category = 'isolation'
  WHERE category IS NULL
    AND (lower(title) LIKE '%isolation%' OR lower(title) LIKE '%isoler%' OR lower(title) LIKE '%combles%' OR lower(title) LIKE '%ite %' OR lower(title) LIKE '% ite' OR lower(title) LIKE '%vmc%' OR lower(title) LIKE '%fenêtre%' OR lower(title) LIKE '%menuiserie%');

UPDATE public.blog_posts SET category = 'panneaux-solaires'
  WHERE category IS NULL
    AND (lower(title) LIKE '%solaire%' OR lower(title) LIKE '%photovoltaïque%' OR lower(title) LIKE '%panneau%' OR lower(title) LIKE '%autoconsommation%');

UPDATE public.blog_posts SET category = 'aides-financieres'
  WHERE category IS NULL
    AND (lower(title) LIKE '%maprimerénov%' OR lower(title) LIKE '%maprimerenov%' OR lower(title) LIKE '%aide%' OR lower(title) LIKE '%prime%' OR lower(title) LIKE '%cee%' OR lower(title) LIKE '%éco-ptz%' OR lower(title) LIKE '%eco-ptz%' OR lower(title) LIKE '%tva%' OR lower(title) LIKE '%subvention%');

UPDATE public.blog_posts SET category = 'renovation-globale'
  WHERE category IS NULL
    AND (lower(title) LIKE '%rénovation globale%' OR lower(title) LIKE '%renovation globale%' OR lower(title) LIKE '%parcours accompagné%' OR lower(title) LIKE '%bouquet%' OR lower(title) LIKE '%dpe%' OR lower(title) LIKE '%passoire%');

-- Anything else → conseils pratiques
UPDATE public.blog_posts SET category = 'conseils-pratiques' WHERE category IS NULL;